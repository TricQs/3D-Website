import { AnimeRelease, ArchiveTrack } from "./animeArchiveData";

export interface ResolvedExternalMedia {
  posterUrl?: string;
  bannerUrl?: string;
  youtubeId?: string;
  songPreviewUrl?: string;
}

export interface TrackProgressPayload {
  progress: number;
  currentTimeSec: number;
  durationSec: number;
  levels: number[];
}

let sharedAudioCtx: AudioContext | null = null;
let activeSynthInterval: ReturnType<typeof setInterval> | null = null;
let activeProgressInterval: ReturnType<typeof setInterval> | null = null;
let htmlAudioPlayer: HTMLAudioElement | null = null;
let fadeFrameId: number | null = null;
let currentSynthDurationSec = 24;
let currentSynthElapsedSec = 0;
let currentSynthLastTick = 0;
let isPlayingRealAudio = false;
let currentTargetVolume = 0.74;

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

export function formatTimeMMSS(seconds: number): string {
  const safe = Math.max(0, Math.floor(Number.isFinite(seconds) ? seconds : 0));
  const m = Math.floor(safe / 60);
  const s = safe % 60;
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

function animateAudioVolume(
  audio: HTMLAudioElement,
  from: number,
  to: number,
  durationMs: number,
  onDone?: () => void
) {
  if (fadeFrameId !== null && typeof cancelAnimationFrame !== "undefined") {
    cancelAnimationFrame(fadeFrameId);
    fadeFrameId = null;
  }
  const start = performance.now();
  const clamp = (v: number) => Math.max(0, Math.min(1, v));
  audio.volume = clamp(from);

  const step = (now: number) => {
    const t = Math.min(1, (now - start) / Math.max(1, durationMs));
    const eased = t * t * (3 - 2 * t);
    audio.volume = clamp(from + (to - from) * eased);
    if (t < 1) {
      fadeFrameId = requestAnimationFrame(step);
    } else {
      fadeFrameId = null;
      onDone?.();
    }
  };
  fadeFrameId = requestAnimationFrame(step);
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
    gain.gain.setValueAtTime(0.045, now);
    gain.gain.exponentialRampToValueAtTime(0.0008, now + 0.03);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.032);
  } catch {}
}

export function playBounceSwapSound(enabled = true) {
  if (!enabled) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "sine";
    osc.frequency.setValueAtTime(140, now);
    osc.frequency.exponentialRampToValueAtTime(340, now + 0.14);
    osc.frequency.exponentialRampToValueAtTime(180, now + 0.34);
    gain.gain.setValueAtTime(0.001, now);
    gain.gain.linearRampToValueAtTime(0.055, now + 0.06);
    gain.gain.exponentialRampToValueAtTime(0.0008, now + 0.36);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.38);
  } catch {}
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
    gain.gain.linearRampToValueAtTime(0.042, now + 0.14);
    gain.gain.exponentialRampToValueAtTime(0.0008, now + 0.72);

    osc.connect(filter);
    sub.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now);
    sub.start(now);
    osc.stop(now + 0.74);
    sub.stop(now + 0.74);
  } catch {}
}

export function stopAllTrackPreviews(fadeOutMs = 0) {
  if (activeSynthInterval) {
    clearInterval(activeSynthInterval);
    activeSynthInterval = null;
  }
  if (activeProgressInterval) {
    clearInterval(activeProgressInterval);
    activeProgressInterval = null;
  }
  if (htmlAudioPlayer) {
    const audio = htmlAudioPlayer;
    if (fadeOutMs > 0 && !audio.paused && audio.volume > 0.01) {
      animateAudioVolume(audio, audio.volume, 0, fadeOutMs, () => {
        audio.pause();
      });
    } else {
      if (fadeFrameId !== null && typeof cancelAnimationFrame !== "undefined") {
        cancelAnimationFrame(fadeFrameId);
        fadeFrameId = null;
      }
      audio.pause();
      audio.currentTime = 0;
    }
  }
  isPlayingRealAudio = false;
}

/**
 * Seeks the currently playing Official Theme Song or Synth track directly to ratio (0..1)
 */
export function seekTrackPreview(ratio0to1: number): { currentTimeSec: number; durationSec: number } {
  const clamped = Math.max(0, Math.min(0.995, ratio0to1));
  if (isPlayingRealAudio && htmlAudioPlayer && htmlAudioPlayer.duration > 0) {
    const target = clamped * htmlAudioPlayer.duration;
    htmlAudioPlayer.currentTime = target;
    return { currentTimeSec: target, durationSec: htmlAudioPlayer.duration };
  }
  currentSynthElapsedSec = clamped * currentSynthDurationSec;
  currentSynthLastTick = performance.now();
  return { currentTimeSec: currentSynthElapsedSec, durationSec: currentSynthDurationSec };
}

/**
 * Starts Official Theme Song (with smooth fade-out of previous track & fade-in of new track!)
 * or procedural multi-voice Web Audio synth preview with real-time timestamp & seek support.
 */
export function startTrackSynthPreview(
  track: ArchiveTrack,
  options: {
    useRealOstUrl?: string;
    fadeInMs?: number;
    fadeOutPrevMs?: number;
    startRatio?: number;
    loop?: boolean;
    onProgress?: (payload: TrackProgressPayload) => void;
    onEnded?: () => void;
    onPlayBlocked?: () => void;
  } = {}
) {
  const fadeInMs = options.fadeInMs ?? 520;
  const fadeOutPrevMs = options.fadeOutPrevMs ?? 240;
  const startRatio = Math.max(0, Math.min(0.98, options.startRatio ?? 0));

  if (activeSynthInterval) {
    clearInterval(activeSynthInterval);
    activeSynthInterval = null;
  }
  if (activeProgressInterval) {
    clearInterval(activeProgressInterval);
    activeProgressInterval = null;
  }

  const ctx = getAudioContext();
  currentSynthDurationSec = 30;
  currentSynthElapsedSec = startRatio * currentSynthDurationSec;
  currentSynthLastTick = performance.now();

  const launchNextAudio = () => {
    if (options.useRealOstUrl && typeof window !== "undefined") {
      try {
        if (!htmlAudioPlayer) {
          htmlAudioPlayer = new Audio();
          htmlAudioPlayer.crossOrigin = "anonymous";
        }
        const audio = htmlAudioPlayer;
        audio.loop = Boolean(options.loop);
        audio.src = options.useRealOstUrl;
        audio.volume = 0;
        isPlayingRealAudio = true;

        audio.onloadedmetadata = () => {
          if (startRatio > 0 && audio.duration > 0) {
            audio.currentTime = startRatio * audio.duration;
          }
        };

        audio.onended = () => {
          if (!audio.loop) {
            stopAllTrackPreviews();
            options.onEnded?.();
          }
        };

        audio
          .play()
          .then(() => {
            animateAudioVolume(audio, 0, currentTargetVolume, fadeInMs);
          })
          .catch(() => {
            isPlayingRealAudio = false;
            options.onPlayBlocked?.();
          });
      } catch {
        isPlayingRealAudio = false;
        runProceduralSynthLoop(ctx, track);
      }
    } else {
      isPlayingRealAudio = false;
      runProceduralSynthLoop(ctx, track);
    }

    activeProgressInterval = setInterval(() => {
      const now = performance.now();
      let currentTimeSec = currentSynthElapsedSec;
      let durationSec = currentSynthDurationSec;

      if (isPlayingRealAudio && htmlAudioPlayer && htmlAudioPlayer.duration > 0) {
        currentTimeSec = htmlAudioPlayer.currentTime;
        durationSec = htmlAudioPlayer.duration;
      } else {
        const dtSec = (now - currentSynthLastTick) / 1000;
        currentSynthLastTick = now;
        currentSynthElapsedSec += dtSec;
        currentTimeSec = currentSynthElapsedSec;
      }

      const progress = Math.min(1, currentTimeSec / Math.max(1, durationSec));
      const t = now * 0.0075;
      const levels = Array.from({ length: 28 }, (_, i) => {
        const wave =
          Math.sin(t + i * 0.45 + track.waveformSeed) * 0.36 +
          Math.cos(t * 1.8 - i * 0.31) * 0.28 +
          0.46;
        return Math.max(0.14, Math.min(1, wave));
      });

      options.onProgress?.({ progress, currentTimeSec, durationSec, levels });

      if (!isPlayingRealAudio && progress >= 1) {
        if (options.loop) {
          currentSynthElapsedSec = 0;
        } else {
          stopAllTrackPreviews();
          options.onEnded?.();
        }
      }
    }, 60);
  };

  // Smooth fade-out of previous track before fading in the new track (DJ-style crossfade)
  if (
    htmlAudioPlayer &&
    !htmlAudioPlayer.paused &&
    htmlAudioPlayer.volume > 0.02 &&
    fadeOutPrevMs > 0
  ) {
    const prevAudio = htmlAudioPlayer;
    animateAudioVolume(prevAudio, prevAudio.volume, 0, fadeOutPrevMs, () => {
      prevAudio.pause();
      launchNextAudio();
    });
  } else {
    if (htmlAudioPlayer) {
      htmlAudioPlayer.pause();
    }
    launchNextAudio();
  }
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
    } catch {}
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
