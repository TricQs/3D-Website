import { AnimeRelease, ArchiveTrack } from "./animeArchiveData";

export interface ResolvedExternalMedia {
  posterUrl?: string;
  bannerUrl?: string;
  youtubeId?: string;
  opVideoUrl?: string;
  songPreviewUrl?: string;
}

const CACHE_KEY = "disc_archive_anime_media_v1";

let sharedAudioCtx: AudioContext | null = null;
let activeSynthInterval: ReturnType<typeof setInterval> | null = null;
let activeProgressInterval: ReturnType<typeof setInterval> | null = null;
let htmlAudioPlayer: HTMLAudioElement | null = null;

function getAudioContext(): AudioContext | null {
  if (typeof window === "undefined") return null;
  if (!sharedAudioCtx) {
    const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
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

    gain.gain.setValueAtTime(0.055, now);
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
    const filter = ctx.createBiquadFilter();
    const gain = ctx.createGain();

    osc.type = "sawtooth";
    filter.type = "lowpass";
    filter.frequency.setValueAtTime(divingIn ? 240 : 1100, now);
    filter.frequency.exponentialRampToValueAtTime(divingIn ? 1400 : 180, now + 0.55);

    osc.frequency.setValueAtTime(divingIn ? 95 : 260, now);
    osc.frequency.exponentialRampToValueAtTime(divingIn ? 290 : 88, now + 0.55);

    gain.gain.setValueAtTime(0.001, now);
    gain.gain.linearRampToValueAtTime(0.045, now + 0.12);
    gain.gain.exponentialRampToValueAtTime(0.0008, now + 0.58);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.6);
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
 * Plays a multi-voice Web Audio API analog synth sequence for a given track
 * (and optionally plays the real 30-second iTunes OST preview if available for Track 01)
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
  const totalDurationMs = 24000; // 24s preview cycle

  // If real OST preview URL is provided and user clicked Track 01, try playing it with Web Audio synth fallback
  if (options.useRealOstUrl && typeof window !== "undefined") {
    try {
      if (!htmlAudioPlayer) {
        htmlAudioPlayer = new Audio();
        htmlAudioPlayer.crossOrigin = "anonymous";
      }
      htmlAudioPlayer.src = options.useRealOstUrl;
      htmlAudioPlayer.volume = 0.72;
      htmlAudioPlayer.play().catch(() => {
        runProceduralSynthLoop(ctx, track);
      });
    } catch {
      runProceduralSynthLoop(ctx, track);
    }
  } else {
    runProceduralSynthLoop(ctx, track);
  }

  activeProgressInterval = setInterval(() => {
    const elapsed = performance.now() - startTime;
    const progress = Math.min(1, elapsed / totalDurationMs);
    const t = elapsed * 0.006;
    const levels = Array.from({ length: 28 }, (_, i) => {
      const wave =
        Math.sin(t + i * 0.45 + track.waveformSeed) * 0.35 +
        Math.cos(t * 1.7 - i * 0.3) * 0.25 +
        0.45;
      return Math.max(0.12, Math.min(1, wave));
    });

    options.onProgress?.(progress, levels);

    if (progress >= 1) {
      stopAllTrackPreviews();
      options.onEnded?.();
    }
  }, 60);
}

function runProceduralSynthLoop(ctx: AudioContext | null, track: ArchiveTrack) {
  if (!ctx) return;

  const stepMs = Math.max(180, Math.round((60 / track.bpm) * 500)); // Eighth-note arpeggio pulse
  let step = 0;

  const triggerStep = () => {
    try {
      const now = ctx.currentTime;
      const notes = track.notes;
      const freq = notes[step % notes.length];
      const bassFreq = notes[0] * 0.5;

      // Lead Warm Rhodes / Poly Synth Voice
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

/**
 * Generates deterministic bar heights for the track waveform scrubbers
 */
export function generateWaveformBars(seed: number, count = 48): number[] {
  return Array.from({ length: count }, (_, i) => {
    const v1 = Math.abs(Math.sin(seed * 1.7 + i * 0.43));
    const v2 = Math.abs(Math.cos(seed * 0.9 - i * 0.29));
    return Math.max(0.18, Math.min(1, v1 * 0.6 + v2 * 0.4));
  });
}

function readLocalMediaCache(): Record<string, ResolvedExternalMedia> {
  if (typeof window === "undefined") return {};
  try {
    const raw = localStorage.getItem(CACHE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function writeLocalMediaCache(key: string, data: Partial<ResolvedExternalMedia>) {
  if (typeof window === "undefined") return;
  try {
    const all = readLocalMediaCache();
    all[key] = { ...(all[key] || {}), ...data };
    localStorage.setItem(CACHE_KEY, JSON.stringify(all));
  } catch {
    // Ignore storage quota
  }
}

export async function resolveAnimeExternalMedia(release: AnimeRelease): Promise<ResolvedExternalMedia> {
  const key = release.jikanQuery || release.titleRomaji;
  const cached = readLocalMediaCache()[key] || {};

  // 1. Jikan v4 (Official MyAnimeList Poster & YouTube Trailer)
  if (!cached.posterUrl || !cached.youtubeId) {
    try {
      const res = await fetch(`https://api.jikan.moe/v4/anime?q=${encodeURIComponent(key)}&limit=1`);
      if (res.ok) {
        const json = await res.json();
        const found = json?.data?.[0];
        if (found) {
          const posterUrl = found.images?.jpg?.large_image_url || found.images?.jpg?.image_url;
          const youtubeId = found.trailer?.youtube_id;
          const bannerUrl = found.trailer?.images?.maximum_image_url || posterUrl;
          if (posterUrl) cached.posterUrl = posterUrl;
          if (youtubeId) cached.youtubeId = youtubeId;
          if (bannerUrl) cached.bannerUrl = bannerUrl;
          writeLocalMediaCache(key, cached);
        }
      }
    } catch {
      // Offline / rate-limit fallback remains 100% procedural
    }
  }

  // 2. iTunes 30-second AAC Theme Song Preview
  if (!cached.songPreviewUrl) {
    try {
      const term = release.songSearchQuery || `${release.songTitle} ${release.songArtist}`;
      const res = await fetch(
        `https://itunes.apple.com/search?term=${encodeURIComponent(term)}&media=music&entity=song&limit=1`
      );
      if (res.ok) {
        const json = await res.json();
        const previewUrl = json?.results?.[0]?.previewUrl;
        if (previewUrl) {
          cached.songPreviewUrl = previewUrl;
          writeLocalMediaCache(key, cached);
        }
      }
    } catch {
      // Ignore
    }
  }

  // 3. AnimeThemes.moe HD OP Video
  if (!cached.opVideoUrl) {
    try {
      const cleanName = release.titleRomaji.replace(/\(.*?\)/g, "").trim();
      const res = await fetch(
        `https://api.animethemes.moe/anime?filter[name]=${encodeURIComponent(
          cleanName
        )}&include=animethemes.animethemeentries.videos&page[size]=1`
      );
      if (res.ok) {
        const json = await res.json();
        const themes = json?.anime?.[0]?.animethemes || [];
        const op = themes.find((t: { type?: string }) => t.type === "OP") || themes[0];
        const link = op?.animethemeentries?.[0]?.videos?.[0]?.link;
        if (link) {
          cached.opVideoUrl = link;
          writeLocalMediaCache(key, cached);
        }
      }
    } catch {
      // Ignore
    }
  }

  return cached;
}
