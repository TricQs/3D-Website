import { AnimeRelease, ArchiveTrack } from "./animeArchiveData";

export interface ResolvedExternalMedia {
  posterUrl?: string;
  bannerUrl?: string;
  youtubeId?: string;
  songPreviewUrl?: string;
}

let sharedAudioCtx: AudioContext | null = null;
let activeSynthInterval: ReturnType<typeof setInterval> | null = null;
let activeProgressInterval: ReturnType<typeof setInterval> | null = null;
let htmlAudioPlayer: HTMLAudioElement | null = null;

function getAudioContext(): AudioContext | null {
  if (typeof window === "undefined") return null;
  if (!sharedAudioCtx) {
    const AudioCtx =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (AudioCtx) {
      sharedAudioCtx = new AudioCtx();
    }
  }
  if (sharedAudioCtx && sharedAudioCtx.state === "suspended") {
    sharedAudioCtx.resume().catch(() => {});
  }
  return sharedAudioCtx;
}

export function playMechanicalStepSound(enabled = true) {
  if (!enabled) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = "triangle";
    osc.frequency.setValueAtTime(195, now);
    osc.frequency.exponentialRampToValueAtTime(52, now + 0.028);

    gain.gain.setValueAtTime(0.05, now);
    gain.gain.exponentialRampToValueAtTime(0.0008, now + 0.03);

    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.032);
  } catch {
    // Ignore audio context restrictions prior to gesture
  }
}

export function playDiveTransitionSound(divingIn = true, enabled = true) {
  if (!enabled) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const sub = ctx.createOscillator();
    const filter = ctx.createBiquadFilter();
    const gain = ctx.createGain();

    osc.type = "sawtooth";
    sub.type = "sine";

    filter.type = "lowpass";
    filter.frequency.setValueAtTime(divingIn ? 220 : 1400, now);
    filter.frequency.exponentialRampToValueAtTime(divingIn ? 1850 : 180, now + 0.65);

    osc.frequency.setValueAtTime(divingIn ? 88 : 280, now);
    osc.frequency.exponentialRampToValueAtTime(divingIn ? 280 : 82, now + 0.65);
    sub.frequency.setValueAtTime(divingIn ? 55 : 140, now);
    sub.frequency.exponentialRampToValueAtTime(divingIn ? 140 : 48, now + 0.65);

    gain.gain.setValueAtTime(0.001, now);
    gain.gain.linearRampToValueAtTime(0.045, now + 0.14);
    gain.gain.exponentialRampToValueAtTime(0.0008, now + 0.72);

    osc.connect(filter);
    sub.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    sub.start(now);
    osc.stop(now + 0.74);
    sub.stop(now + 0.74);
  } catch {
    // Ignore
  }
}

export function stopAllTrackPreviews() {
  if (activeSynthInterval) {
    clearInterval(activeSynthInterval);
    activeSynthInterval = null;
  }
  if (activeProgressInterval) {
    clearInterval(activeProgressInterval);
    activeProgressInterval = null;
  }
  if (htmlAudioPlayer) {
    htmlAudioPlayer.pause();
    htmlAudioPlayer.currentTime = 0;
  }
}

/**
 * Plays the REAL official anime theme song (when `useRealOstUrl` is passed for Track 01)
 * OR a rich multi-voice Web Audio API polyphonic synth sequence for score tracks,
 * with synchronized real-time progress and waveform bar visualization.
 */
export function startTrackSynthPreview(
  track: ArchiveTrack,
  options: {
    useRealOstUrl?: string;
    onProgress?: (progress0to1: number, levels: number[]) => void;
    onEnded?: () => void;
  } = {}
) {
  stopAllTrackPreviews();

  const ctx = getAudioContext();
  const startTime = performance.now();
  const synthDurationMs = 24000;
  let playingRealAudio = false;

  if (options.useRealOstUrl && typeof window !== "undefined") {
    try {
      if (!htmlAudioPlayer) {
        htmlAudioPlayer = new Audio();
        htmlAudioPlayer.crossOrigin = "anonymous";
      }
      htmlAudioPlayer.src = options.useRealOstUrl;
      htmlAudioPlayer.volume = 0.78;
      playingRealAudio = true;

      htmlAudioPlayer.onended = () => {
        stopAllTrackPreviews();
        options.onEnded?.();
      };

      htmlAudioPlayer.play().catch(() => {
        playingRealAudio = false;
        runProceduralSynthLoop(ctx, track);
      });
    } catch {
      playingRealAudio = false;
      runProceduralSynthLoop(ctx, track);
    }
  } else {
    runProceduralSynthLoop(ctx, track);
  }

  activeProgressInterval = setInterval(() => {
    const elapsed = performance.now() - startTime;
    let progress = Math.min(1, elapsed / synthDurationMs);

    if (playingRealAudio && htmlAudioPlayer && htmlAudioPlayer.duration > 0) {
      progress = Math.min(1, htmlAudioPlayer.currentTime / htmlAudioPlayer.duration);
    }

    const t = elapsed * 0.0075;
    const levels = Array.from({ length: 28 }, (_, i) => {
      const wave =
        Math.sin(t + i * 0.45 + track.waveformSeed) * 0.36 +
        Math.cos(t * 1.8 - i * 0.31) * 0.28 +
        0.46;
      return Math.max(0.14, Math.min(1, wave));
    });

    options.onProgress?.(progress, levels);

    if (!playingRealAudio && progress >= 1) {
      stopAllTrackPreviews();
      options.onEnded?.();
    }
  }, 60);
}

function runProceduralSynthLoop(ctx: AudioContext | null, track: ArchiveTrack) {
  if (!ctx) return;

  const stepMs = Math.max(180, Math.round((60 / track.bpm) * 500));
  let step = 0;

  const triggerStep = () => {
    try {
      const now = ctx.currentTime;
      const notes = track.notes;
      const freq = notes[step % notes.length];
      const bassFreq = notes[0] * 0.5;

      const osc = ctx.createOscillator();
      const subOsc = ctx.createOscillator();
      const filter = ctx.createBiquadFilter();
      const gain = ctx.createGain();

      osc.type = step % 4 === 0 ? "triangle" : "sine";
      subOsc.type = "sine";

      osc.frequency.setValueAtTime(freq, now);
      subOsc.frequency.setValueAtTime(step % 4 === 0 ? bassFreq : freq * 0.5, now);

      filter.type = "lowpass";
      filter.frequency.setValueAtTime(1350 + (step % 3) * 320, now);

      gain.gain.setValueAtTime(0.0008, now);
      gain.gain.linearRampToValueAtTime(0.032, now + 0.025);
      gain.gain.exponentialRampToValueAtTime(0.0006, now + stepMs * 0.0014);

      osc.connect(filter);
      subOsc.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      subOsc.start(now);
      osc.stop(now + stepMs * 0.0015);
      subOsc.stop(now + stepMs * 0.0015);

      step++;
    } catch {
      // Ignore
    }
  };

  triggerStep();
  activeSynthInterval = setInterval(triggerStep, stepMs);
}

export function generateWaveformBars(seed: number, count = 48): number[] {
  return Array.from({ length: count }, (_, i) => {
    const v1 = Math.abs(Math.sin(seed * 1.7 + i * 0.43));
    const v2 = Math.abs(Math.cos(seed * 0.9 - i * 0.29));
    return Math.max(0.18, Math.min(1, v1 * 0.6 + v2 * 0.4));
  });
}

/**
 * Returns the pre-verified official AniList cover/banner, YouTube trailer/OP ID,
 * and Apple Music/iTunes official vocal OP preview directly from the release dataset.
 */
export async function resolveAnimeExternalMedia(
  release: AnimeRelease
): Promise<ResolvedExternalMedia> {
  return {
    posterUrl: release.coverUrl,
    bannerUrl: release.bannerUrl || release.coverUrl,
    youtubeId: release.youtubeId,
    songPreviewUrl: release.songPreviewUrl
  };
}
