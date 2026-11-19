"use client";

import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import dynamic from "next/dynamic";
import gsap from "gsap";
import {
  ALL_ANIME_RELEASES,
  AnimeRelease,
  ArchiveTrack,
  CURRENTLY_WATCHING_RELEASES,
  getCorsSafeArtworkUrl,
  WATCHED_ANIME_RELEASES
} from "@/lib/animeArchiveData";
import { drawProceduralIllustration } from "@/lib/proceduralTextures";
import {
  generateWaveformBars,
  playDiveTransitionSound,
  playMechanicalStepSound,
  startTrackSynthPreview,
  stopAllTrackPreviews
} from "@/lib/webAudioEngine";

const TurntableScene = dynamic(() => import("./TurntableScene"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center font-mono text-xs uppercase tracking-widest text-[#6E6E6A]">
      INITIALIZING TURNTABLE PLATTER &amp; 3D ARCHIVE...
    </div>
  )
});

type CategoryFilter = "all" | "TV Series" | "Movie" | "watching";
type ActiveModal = "none" | "releases" | "artists";
type DetailMediaMode = "key-visual" | "trailer" | "cover";

const RULER_YEARS = [
  2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022,
  2023, 2024, 2025, 2026
];

function formatRulerYear(yr: number): string {
  if (yr === 2006 || yr === 2011 || yr === 2016 || yr === 2020 || yr === 2026) {
    return String(yr);
  }
  return `'${String(yr).slice(2)}`;
}

/**
 * High-DPI 2D Swiss Minimal Sleeve Preview Canvas inside Release Detail View
 */
function DetailProceduralCoverCanvas({ release }: { release: AnimeRelease }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const w = 640;
    const h = 640;
    ctx.fillStyle = release.coverBgColor;
    ctx.fillRect(0, 0, w, h);

    ctx.strokeStyle = release.coverInkColor;
    ctx.lineWidth = 2;
    ctx.strokeRect(22, 22, w - 44, h - 44);

    ctx.fillStyle = release.coverInkColor;
    ctx.font = "700 14px 'IBM Plex Mono', monospace";
    ctx.fillText(`DISC ARCHIVE  —  ${release.catalogCode}`, 42, 54);
    ctx.font = "500 12px 'IBM Plex Mono', monospace";
    ctx.fillText(
      `${release.releaseYear} • ${release.category.toUpperCase()} • ${release.studio.toUpperCase()}`,
      42,
      74
    );

    ctx.fillStyle = release.accentColor;
    ctx.fillRect(w - 190, 38, 148, 36);
    ctx.fillStyle = "#FFFFFF";
    ctx.font = "700 13px 'IBM Plex Mono', monospace";
    ctx.textAlign = "center";
    ctx.fillText(
      release.rating >= 10 ? "👑 10.0 / 10" : `★ ${release.rating.toFixed(1)} / 10`,
      w - 116,
      61
    );
    ctx.textAlign = "left";

    drawProceduralIllustration(ctx, release, 42, 96, w - 84, 355);

    ctx.fillStyle = "#E05A3A";
    ctx.beginPath();
    ctx.arc(50, 480, 5.5, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = release.coverInkColor;
    ctx.font = "700 13px 'IBM Plex Mono', monospace";
    ctx.fillText(
      `${release.genres.join(" / ").toUpperCase()}  —  ${release.bpm} BPM  —  ${release.ageRating}`,
      66,
      484
    );

    ctx.font = "800 32px 'Inter', sans-serif";
    const title = release.titleEnglish.length > 28 ? release.shortTitle : release.titleEnglish;
    ctx.fillText(title, 42, 530);

    ctx.globalAlpha = 0.75;
    ctx.font = "500 15px 'Inter', sans-serif";
    ctx.fillText(release.titleRomaji, 42, 558);

    ctx.globalAlpha = 1;
    ctx.fillStyle = release.accentColor;
    ctx.font = "600 13px 'IBM Plex Mono', monospace";
    ctx.fillText(`♪ ${release.songTitle.toUpperCase()} — ${release.songArtist.toUpperCase()}`, 42, 590);
  }, [release]);

  return (
    <canvas
      ref={canvasRef}
      width={640}
      height={640}
      className="w-full h-full object-cover"
    />
  );
}

export default function DiscArchiveShowcase() {
  const [category, setCategory] = useState<CategoryFilter>("all");
  // Start near the chronological center (2016 Your Name.) so both left & right spine stacks frame the platter symmetrically!
  const [activeIndex, setActiveIndex] = useState<number>(6);
  const [diveState, setDiveState] = useState<"shelf" | "diving-in" | "detail" | "diving-out">("shelf");
  const [diveVeilOpacity, setDiveVeilOpacity] = useState<number>(0);
  const [activeModal, setActiveModal] = useState<ActiveModal>("none");
  const [radioActive, setRadioActive] = useState<boolean>(false);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  // Default to Official Anime Artwork on the 3D sleeves!
  const [useOfficialPosters, setUseOfficialPosters] = useState<boolean>(true);

  // Release Detail View & Audio Synth state
  const [playingTrackNum, setPlayingTrackNum] = useState<string | null>(null);
  const [trackProgress, setTrackProgress] = useState<number>(0);
  const [liveWaveLevels, setLiveWaveLevels] = useState<number[]>([]);
  const [detailMediaMode, setDetailMediaMode] = useState<DetailMediaMode>("key-visual");

  // Loaded CORS-safe official anime artwork images for WebGL 3D <canvas> textures
  const [loadedPosterImages, setLoadedPosterImages] = useState<Record<string, HTMLImageElement>>({});

  // Releases Drawer Search / Filter / Sort state
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [genreFilter, setGenreFilter] = useState<string>("All");
  const [sortBy, setSortBy] = useState<"year-asc" | "rating-desc" | "year-desc" | "title-asc">("year-asc");

  const timelineRef = useRef<HTMLDivElement>(null);
  const detailContainerRef = useRef<HTMLDivElement>(null);
  const isScrubbingTimelineRef = useRef<boolean>(false);
  const wheelCooldownRef = useRef<boolean>(false);
  const loadingIdsRef = useRef<Set<string>>(new Set());

  // Chronologically sorted (oldest left -> newest right) filtered shelf list
  const releases = useMemo(() => {
    let list: AnimeRelease[];
    if (category === "Movie") {
      list = WATCHED_ANIME_RELEASES.filter((r) => r.category === "Movie");
    } else if (category === "TV Series") {
      list = WATCHED_ANIME_RELEASES.filter((r) => r.category === "TV Series");
    } else if (category === "watching") {
      list = CURRENTLY_WATCHING_RELEASES;
    } else {
      list = WATCHED_ANIME_RELEASES;
    }
    // Guarantee strict chronological left-to-right sorting by releaseYear
    return [...list].sort((a, b) => {
      if (a.releaseYear !== b.releaseYear) return a.releaseYear - b.releaseYear;
      return a.catalogCode.localeCompare(b.catalogCode);
    });
  }, [category]);

  const safeIndex = Math.max(0, Math.min(releases.length - 1, activeIndex));
  const activeRelease = releases[safeIndex] || releases[0];

  // Preload official anime artwork images cleanly via same-origin /api/image-proxy (with wsrv.nl fallback)
  const loadCorsSafeImage = useCallback((rel: AnimeRelease) => {
    if (!rel.coverUrl || loadingIdsRef.current.has(rel.id)) return;
    loadingIdsRef.current.add(rel.id);

    const primaryUrl = getCorsSafeArtworkUrl(rel.coverUrl);
    const fallbackUrl = `https://wsrv.nl/?url=${encodeURIComponent(rel.coverUrl)}&w=900&output=webp`;

    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      setLoadedPosterImages((prev) => ({ ...prev, [rel.id]: img }));
    };
    img.onerror = () => {
      if (img.src !== fallbackUrl) {
        img.src = fallbackUrl;
      }
    };
    img.src = primaryUrl;
  }, []);

  // Load active & neighboring sleeves immediately, then hydrate the entire 28-anime shelf smoothly
  useEffect(() => {
    if (!releases.length) return;
    const priorityOrder: AnimeRelease[] = [];
    for (let offset = 0; offset < releases.length; offset++) {
      const right = releases[safeIndex + offset];
      const left = offset > 0 ? releases[safeIndex - offset] : undefined;
      if (right) priorityOrder.push(right);
      if (left) priorityOrder.push(left);
    }
    priorityOrder.slice(0, 12).forEach(loadCorsSafeImage);

    const timer = setTimeout(() => {
      ALL_ANIME_RELEASES.forEach(loadCorsSafeImage);
    }, 350);
    return () => clearTimeout(timer);
  }, [releases, safeIndex, loadCorsSafeImage]);

  const selectReleaseIndex = useCallback(
    (nextIndex: number) => {
      if (releases.length === 0) return;
      const clamped = Math.max(0, Math.min(releases.length - 1, nextIndex));
      if (clamped !== activeIndex) {
        setActiveIndex(clamped);
        playMechanicalStepSound(soundEnabled);
        if (diveState === "detail") {
          stopAllTrackPreviews();
          setPlayingTrackNum(null);
        }
      }
    },
    [activeIndex, diveState, releases.length, soundEnabled]
  );

  // Radio mode auto-play official OP audio when switching releases
  useEffect(() => {
    if (!radioActive || !activeRelease || !soundEnabled) return;
    const firstTrack = activeRelease.tracks[0];
    setPlayingTrackNum(firstTrack.number);
    startTrackSynthPreview(firstTrack, {
      useRealOstUrl: activeRelease.songPreviewUrl,
      onProgress: (p, levels) => {
        setTrackProgress(p);
        setLiveWaveLevels(levels);
      },
      onEnded: () => {
        setPlayingTrackNum(null);
      }
    });
  }, [radioActive, activeRelease, soundEnabled]);

  // Trigger Signature GSAP Spindle-Hole Camera Dive
  const handleTriggerDive = useCallback(() => {
    if (diveState !== "shelf") return;
    playDiveTransitionSound(true, soundEnabled);
    setDetailMediaMode("key-visual");
    setDiveState("diving-in");
  }, [diveState, soundEnabled]);

  const handleDiveInComplete = useCallback(() => {
    setDiveState("detail");
    // Auto-start Official Theme Song preview when entering Release Detail View if sound enabled
    if (soundEnabled && activeRelease) {
      const tr = activeRelease.tracks[0];
      setPlayingTrackNum(tr.number);
      startTrackSynthPreview(tr, {
        useRealOstUrl: activeRelease.songPreviewUrl,
        onProgress: (p, levels) => {
          setTrackProgress(p);
          setLiveWaveLevels(levels);
        },
        onEnded: () => setPlayingTrackNum(null)
      });
    }
  }, [activeRelease, soundEnabled]);

  // Choreographed GSAP entrance animation for the Release Detail View content
  useEffect(() => {
    if (diveState === "detail" && detailContainerRef.current) {
      const elements = detailContainerRef.current.querySelectorAll(".detail-stagger");
      gsap.fromTo(
        elements,
        { opacity: 0, y: 24, scale: 0.985 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.55,
          stagger: 0.06,
          ease: "expo.out",
          clearProps: "transform"
        }
      );
    }
  }, [diveState, activeRelease?.id]);

  // Reverse GSAP Camera Dive back out through the spinning spindle hole
  const handleBackToShelf = useCallback(() => {
    if (diveState !== "detail") return;
    if (!radioActive) {
      stopAllTrackPreviews();
      setPlayingTrackNum(null);
    }
    playDiveTransitionSound(false, soundEnabled);

    if (detailContainerRef.current) {
      gsap.to(detailContainerRef.current, {
        opacity: 0,
        scale: 0.96,
        duration: 0.22,
        ease: "power2.in",
        onComplete: () => {
          setDiveState("diving-out");
        }
      });
    } else {
      setDiveState("diving-out");
    }
  }, [diveState, radioActive, soundEnabled]);

  const handleDiveOutComplete = useCallback(() => {
    setDiveState("shelf");
  }, []);

  // Mouse Wheel & Keyboard navigation
  useEffect(() => {
    const onWheel = (e: WheelEvent) => {
      if (diveState !== "shelf" || activeModal !== "none") return;
      if (Math.abs(e.deltaY) < 8 && Math.abs(e.deltaX) < 8) return;
      if (wheelCooldownRef.current) return;
      wheelCooldownRef.current = true;
      const dir = (e.deltaY || e.deltaX) > 0 ? 1 : -1;
      selectReleaseIndex(safeIndex + dir);
      setTimeout(() => {
        wheelCooldownRef.current = false;
      }, 130);
    };

    const onKeyDown = (e: KeyboardEvent) => {
      if (activeModal !== "none") {
        if (e.key === "Escape") setActiveModal("none");
        return;
      }
      if (diveState === "detail") {
        if (e.key === "Escape") handleBackToShelf();
        return;
      }
      if (diveState === "shelf") {
        if (e.key === "ArrowRight" || e.key === "ArrowDown") {
          e.preventDefault();
          selectReleaseIndex(safeIndex + 1);
        } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
          e.preventDefault();
          selectReleaseIndex(safeIndex - 1);
        } else if (e.key === "Enter") {
          e.preventDefault();
          handleTriggerDive();
        }
      }
    };

    window.addEventListener("wheel", onWheel, { passive: true });
    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [activeModal, diveState, handleBackToShelf, handleTriggerDive, safeIndex, selectReleaseIndex]);

  // Compute monotonic timeline position (0..100%) for every chronologically sorted release
  const releaseTimelinePositions = useMemo(() => {
    const minY = RULER_YEARS[0];
    const maxY = RULER_YEARS[RULER_YEARS.length - 1];
    const span = maxY - minY;

    // Group indices by year so multiple releases in 2024/2025 spread cleanly left-to-right within their year
    const countsByYear: Record<number, number> = {};
    releases.forEach((r) => {
      countsByYear[r.releaseYear] = (countsByYear[r.releaseYear] || 0) + 1;
    });
    const seenByYear: Record<number, number> = {};

    return releases.map((r) => {
      const totalInYr = countsByYear[r.releaseYear] || 1;
      const posInYr = seenByYear[r.releaseYear] || 0;
      seenByYear[r.releaseYear] = posInYr + 1;
      const subOffset = totalInYr > 1 ? ((posInYr / (totalInYr - 1)) - 0.5) * 0.65 : 0;
      const exactYear = Math.max(minY, Math.min(maxY, r.releaseYear + subOffset));
      return Math.max(1.5, Math.min(98.5, ((exactYear - minY) / span) * 100));
    });
  }, [releases]);

  const activeNeedlePercent = releaseTimelinePositions[safeIndex] ?? 50;

  // Scrubbing the Bottom Interactive Year Waveform Timeline monotonically across all releases
  const scrubTimelineAtClientX = useCallback(
    (clientX: number) => {
      const bar = timelineRef.current;
      if (!bar || releases.length === 0) return;
      const rect = bar.getBoundingClientRect();
      const targetPct = Math.max(0, Math.min(100, ((clientX - rect.left) / rect.width) * 100));

      let bestIdx = 0;
      let bestDist = Infinity;
      releaseTimelinePositions.forEach((pct, idx) => {
        const dist = Math.abs(pct - targetPct);
        if (dist < bestDist) {
          bestDist = dist;
          bestIdx = idx;
        }
      });
      selectReleaseIndex(bestIdx);
    },
    [releaseTimelinePositions, releases.length, selectReleaseIndex]
  );

  // Dense vertical waveform ticks for the bottom timeline ruler
  const timelineWaveformTicks = useMemo(() => {
    const count = 128;
    const minY = RULER_YEARS[0];
    const maxY = RULER_YEARS[RULER_YEARS.length - 1];
    const releaseYearsSet = new Set(releases.map((r) => r.releaseYear));

    return Array.from({ length: count }, (_, i) => {
      const ratio = i / (count - 1);
      const approxYear = Math.round(minY + ratio * (maxY - minY));
      const hasRelease = releaseYearsSet.has(approxYear);
      const isMajorYear = i % 6 === 0;
      const wave =
        Math.abs(Math.sin(i * 0.55) * 0.52 + Math.cos(i * 0.23) * 0.38) *
        (hasRelease ? 1.0 : 0.65);
      const heightPx = isMajorYear ? 22 : Math.round(7 + wave * 15);
      return { index: i, ratio, approxYear, hasRelease, isMajorYear, heightPx };
    });
  }, [releases]);

  const handleToggleTrackPlay = (track: ArchiveTrack) => {
    if (playingTrackNum === track.number) {
      stopAllTrackPreviews();
      setPlayingTrackNum(null);
      return;
    }
    setPlayingTrackNum(track.number);
    setTrackProgress(0);
    startTrackSynthPreview(track, {
      useRealOstUrl: track.number === "01" ? activeRelease.songPreviewUrl : undefined,
      onProgress: (p, levels) => {
        setTrackProgress(p);
        setLiveWaveLevels(levels);
      },
      onEnded: () => {
        setPlayingTrackNum(null);
      }
    });
  };

  const allGenres = useMemo(() => {
    const set = new Set<string>();
    ALL_ANIME_RELEASES.forEach((r) => r.genres.forEach((g) => set.add(g)));
    return ["All", ...Array.from(set).sort()];
  }, []);

  const filteredCatalogList = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    return WATCHED_ANIME_RELEASES.filter((r) => {
      if (genreFilter !== "All" && !r.genres.includes(genreFilter)) return false;
      if (q) {
        const hit =
          r.titleRomaji.toLowerCase().includes(q) ||
          r.titleEnglish.toLowerCase().includes(q) ||
          r.shortTitle.toLowerCase().includes(q) ||
          r.songArtist.toLowerCase().includes(q) ||
          r.catalogCode.toLowerCase().includes(q) ||
          r.genres.some((g) => g.toLowerCase().includes(q));
        if (!hit) return false;
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === "rating-desc") return b.rating - a.rating;
      if (sortBy === "year-desc") return b.releaseYear - a.releaseYear;
      if (sortBy === "title-asc") return a.titleEnglish.localeCompare(b.titleEnglish);
      return a.releaseYear - b.releaseYear || a.catalogCode.localeCompare(b.catalogCode);
    });
  }, [genreFilter, searchQuery, sortBy]);

  const ratingBreakdown = useMemo(() => {
    if (!activeRelease) return [];
    const base = activeRelease.rating;
    const seed = activeRelease.catalogCode.charCodeAt(4) || 7;
    const clampScore = (v: number) => Math.min(10, Math.max(6.5, Math.round(v * 10) / 10));
    return [
      { label: "NARRATIVE & PACING", score: base >= 10 ? 10.0 : clampScore(base + ((seed % 3) - 1) * 0.2) },
      { label: "CHARACTER CHEMISTRY", score: base >= 10 ? 10.0 : clampScore(base + 0.2) },
      { label: "DIRECTION & VISUAL ART", score: base >= 10 ? 10.0 : clampScore(base + (seed % 2) * 0.1) },
      { label: "OST & THEME DIRECTION", score: base >= 10 ? 10.0 : clampScore(base + 0.3) },
      { label: "PERSONAL VERDICT", score: base }
    ];
  }, [activeRelease]);

  const handleCategorySwitch = (nextCat: CategoryFilter, targetIndex?: number) => {
    setCategory(nextCat);
    const defaultStart = nextCat === "all" ? 6 : 0;
    setActiveIndex(targetIndex !== undefined ? targetIndex : defaultStart);
    playMechanicalStepSound(soundEnabled);
    if (diveState === "detail") {
      setDiveState("shelf");
    }
  };

  return (
    <div
      className="relative w-screen h-screen overflow-hidden select-none text-[#181818] font-sans"
      style={{
        background: "radial-gradient(circle at 50% 35%, #EAEAE8 0%, #E3E3E0 56%, #D2D2CF 100%)"
      }}
    >
      {/* Subtle Studio Paper Grain Overlay */}
      <div
        className="pointer-events-none fixed inset-0 z-10 opacity-[0.03]"
        style={{
          backgroundImage:
            "radial-gradient(#181818 0.75px, transparent 0.75px), radial-gradient(#181818 0.75px, #EAEAE8 0.75px)",
          backgroundSize: "24px 24px",
          backgroundPosition: "0 0, 12px 12px"
        }}
      />

      {/* Smooth Cinema Aperture Transition Veil during Spindle-Hole Dive */}
      <div
        className="pointer-events-none fixed inset-0 z-35 bg-[#EAEAE8]"
        style={{ opacity: diveVeilOpacity, zIndex: 35 }}
      />

      {/* ====================================================================
          1. TOP NAVIGATION BAR (MINIMALIST SWISS EDITORIAL HUD)
          ==================================================================== */}
      <header className="fixed top-0 left-0 right-0 z-30 flex items-center justify-between px-5 md:px-9 h-16 border-b border-[#181818]/10 bg-[#EAEAE8]/85 backdrop-blur-md">
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={() => {
              setActiveModal("none");
              if (diveState === "detail") handleBackToShelf();
            }}
            className="font-mono text-xs md:text-[13px] font-semibold tracking-[0.18em] uppercase text-[#181818] hover:text-[#E05A3A] transition-colors flex items-center gap-2"
          >
            <span>DISC ARCHIVE</span>
            <span className="text-[10px] text-[#6E6E6A] font-normal hidden sm:inline">
              / ANIME RATING
            </span>
          </button>

          <div className="hidden lg:flex items-center gap-1 pl-3 border-l border-[#181818]/15 font-mono text-[11px]">
            {(
              [
                { id: "all", label: "ALL (26)" },
                { id: "TV Series", label: "SERIES (22)" },
                { id: "Movie", label: "FILMS (4)" },
                { id: "watching", label: "ON-GOING (2)" }
              ] as { id: CategoryFilter; label: string }[]
            ).map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => handleCategorySwitch(tab.id)}
                className={`px-2.5 py-1 uppercase tracking-wider transition-all ${
                  category === tab.id
                    ? "bg-[#181818] text-[#EAEAE8] font-semibold"
                    : "text-[#6E6E6A] hover:text-[#181818]"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Top-Center: Coral dot (●) + ON THE PLATTER — CHRONOLOGICAL YEAR & ACTIVE RELEASE */}
        <div className="hidden md:flex items-center gap-2.5 font-mono text-[11px] lg:text-xs tracking-[0.14em] uppercase">
          <span className="inline-block w-2 h-2 rounded-full bg-[#E05A3A] animate-pulse" aria-hidden="true" />
          <span className="text-[#6E6E6A]">ON THE PLATTER</span>
          <span className="text-[#6E6E6A]">—</span>
          <span className="font-semibold text-[#181818]">
            {activeRelease?.catalogCode} {activeRelease?.shortTitle} ({activeRelease?.releaseYear})
          </span>
          <span className="px-1.5 py-0.5 text-[10px] bg-[#181818]/10 text-[#181818] font-semibold">
            {activeRelease?.rating >= 10 ? "👑 10.0" : `★ ${activeRelease?.rating.toFixed(1)}`}
          </span>
        </div>

        {/* Top-Right: Art Toggle + Releases / Artists / Radio */}
        <nav className="flex items-center gap-5 md:gap-7 text-xs md:text-[13px] font-medium tracking-tight">
          <button
            type="button"
            onClick={() => setUseOfficialPosters((v) => !v)}
            title="Switch between Official Anime Wallpaper Covers and Swiss Minimal Vector Covers"
            className="hidden sm:inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-wider px-2.5 py-1 border border-[#181818]/20 text-[#6E6E6A] hover:text-[#181818] hover:border-[#181818] transition-colors"
          >
            <span>COVER:</span>
            <strong className="text-[#181818]">{useOfficialPosters ? "ANIME ART" : "SWISS MINIMAL"}</strong>
          </button>

          <button
            type="button"
            onClick={() => setActiveModal(activeModal === "releases" ? "none" : "releases")}
            className={`relative py-1 transition-colors ${
              activeModal === "releases" ? "text-[#E05A3A] font-semibold" : "text-[#181818] hover:text-[#E05A3A]"
            }`}
          >
            Releases
          </button>

          <button
            type="button"
            onClick={() => setActiveModal(activeModal === "artists" ? "none" : "artists")}
            className={`relative py-1 transition-colors ${
              activeModal === "artists" ? "text-[#E05A3A] font-semibold" : "text-[#181818] hover:text-[#E05A3A]"
            }`}
          >
            Artists
          </button>

          <button
            type="button"
            onClick={() => {
              const next = !radioActive;
              setRadioActive(next);
              if (!next) {
                stopAllTrackPreviews();
                setPlayingTrackNum(null);
              }
            }}
            className={`inline-flex items-center gap-1.5 py-1 transition-colors ${
              radioActive ? "text-[#E05A3A] font-semibold" : "text-[#181818] hover:text-[#E05A3A]"
            }`}
          >
            <span
              className={`w-1.5 h-1.5 rounded-full ${
                radioActive ? "bg-[#E05A3A] animate-ping" : "bg-[#6E6E6A]"
              }`}
            />
            <span>Radio</span>
          </button>
        </nav>
      </header>

      {/* ====================================================================
          2. CORE 3D REACT THREE FIBER SCENE (ZERO-CLIPPING PLATTER & SHELF)
          ==================================================================== */}
      <main
        className={`relative w-full h-full transition-opacity duration-300 ${
          diveState === "detail" ? "opacity-0 pointer-events-none" : "opacity-100"
        }`}
      >
        <TurntableScene
          releases={releases}
          activeIndex={safeIndex}
          onSelectIndex={selectReleaseIndex}
          onTriggerDive={handleTriggerDive}
          diveState={diveState}
          onDiveInComplete={handleDiveInComplete}
          onDiveOutComplete={handleDiveOutComplete}
          onDiveVeilChange={setDiveVeilOpacity}
          useOfficialPosters={useOfficialPosters}
          loadedPosterImages={loadedPosterImages}
        />

        {/* Top-Left Chronological Shelf Counter & Score Readout */}
        <div
          className={`pointer-events-none fixed top-20 left-5 md:left-9 z-20 hidden sm:flex flex-col gap-1 font-mono text-[11px] uppercase tracking-widest text-[#52524E] transition-opacity duration-300 ${
            diveState === "shelf" ? "opacity-100" : "opacity-0"
          }`}
        >
          <div>
            CHRONOLOGICAL SLOT{" "}
            <span className="text-[#181818] font-bold">{String(safeIndex + 1).padStart(2, "0")}</span> /{" "}
            {String(releases.length).padStart(2, "0")} ({activeRelease?.releaseYear})
          </div>
          <div className="flex items-center gap-2">
            <span>PERSONAL SCORE:</span>
            <span className="text-[#181818] font-bold">
              {activeRelease?.rating >= 10
                ? "👑 10.0 / 10 (MASTERPIECE)"
                : `★ ${activeRelease?.rating.toFixed(1)} / 10`}
            </span>
          </div>
          {activeRelease?.isOngoing && (
            <div className="text-[#E05A3A] font-bold">
              ● WATCHING EPISODE {activeRelease.currentEpisode} OF {activeRelease.totalEpisodes}
            </div>
          )}
        </div>

        {/* Radio Mode Live Status Pill */}
        {radioActive && (
          <div className="fixed top-20 right-5 md:right-9 z-20 flex items-center gap-3 px-3.5 py-2 bg-[#181818] text-[#EAEAE8] font-mono text-[11px] uppercase tracking-wider shadow-lg">
            <span className="w-2 h-2 rounded-full bg-[#E05A3A] animate-pulse" />
            <span>
              OFFICIAL OST: ♪ {activeRelease?.songTitle} — {activeRelease?.songArtist}
            </span>
            <button
              type="button"
              onClick={() => setSoundEnabled((s) => !s)}
              className="px-2 py-0.5 bg-[#EAEAE8]/15 hover:bg-[#E05A3A] text-[10px] transition-colors"
            >
              {soundEnabled ? "MUTE" : "UNMUTE"}
            </button>
          </div>
        )}

        {/* ====================================================================
            3. CENTER-BOTTOM RELEASE CAPTION (HIGH-CONTRAST READABLE AT REST!)
            ==================================================================== */}
        <section
          aria-label="Active Release Caption and Shelf Controls"
          className={`pointer-events-none fixed bottom-[86px] md:bottom-[92px] left-0 right-0 z-20 flex items-center justify-center px-4 transition-all duration-300 ${
            diveState === "shelf" ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <div className="pointer-events-auto flex items-center justify-between w-full max-w-2xl gap-3 md:gap-6">
            {/* Left 40px Circular Button (←) */}
            <button
              type="button"
              onClick={() => selectReleaseIndex(safeIndex - 1)}
              disabled={safeIndex <= 0}
              aria-label="Previous Release"
              className="w-10 h-10 rounded-full border border-[#181818]/45 bg-[#EAEAE8]/90 backdrop-blur-sm flex items-center justify-center text-[#181818] hover:border-[#181818] hover:bg-[#181818] hover:text-[#EAEAE8] disabled:opacity-25 disabled:pointer-events-none transition-all shrink-0 shadow-sm"
            >
              <span className="text-base leading-none">←</span>
            </button>

            {/* High-Contrast Frosted Editorial Caption Plaque (100% Legible Without Hover!) */}
            <div
              onClick={handleTriggerDive}
              className="flex flex-col items-center text-center cursor-pointer group px-5 py-2.5 rounded-sm bg-[#EAEAE8]/90 backdrop-blur-md border border-[#181818]/12 shadow-[0_6px_24px_rgba(24,24,24,0.08)] hover:border-[#E05A3A]/55 transition-all max-w-xl"
              title="Click to dive through the disc spindle hole into full anime dossier, official OST & trailer"
            >
              <div className="flex items-center gap-2 font-mono text-[11px] md:text-xs tracking-[0.15em] uppercase text-[#181818] font-medium">
                <span className="inline-block w-2 h-2 rounded-full bg-[#E05A3A]" />
                <span>
                  {activeRelease?.catalogCode} — {activeRelease?.genres.slice(0, 2).join(" / ").toUpperCase()}
                </span>
                <span className="text-[#E05A3A] font-bold">
                  ★ {activeRelease?.rating.toFixed(1)}
                </span>
              </div>

              {/* Crisp Jet-Charcoal Title (#111111) at rest -> Coral (#E05A3A) on hover */}
              <h1 className="mt-0.5 text-xl sm:text-2xl md:text-[30px] font-bold tracking-tight text-[#111111] group-hover:text-[#E05A3A] transition-colors line-clamp-1 leading-tight">
                {activeRelease?.titleEnglish}
              </h1>

              {/* Crisp Dark-Slate Subtitle (#464642) */}
              <p className="mt-0.5 text-xs sm:text-[13px] text-[#464642] font-medium line-clamp-1">
                {activeRelease?.titleRomaji} • ♪ {activeRelease?.songArtist}, {activeRelease?.releaseYear}
              </p>

              <span className="mt-1 font-mono text-[10px] uppercase tracking-[0.18em] text-[#575752] group-hover:text-[#E05A3A] font-semibold transition-colors">
                [ CLICK COVER OR DISC FOR TRAILER &amp; OFFICIAL OST ↗ ]
              </span>
            </div>

            {/* Right 40px Circular Button (→) */}
            <button
              type="button"
              onClick={() => selectReleaseIndex(safeIndex + 1)}
              disabled={safeIndex >= releases.length - 1}
              aria-label="Next Release"
              className="w-10 h-10 rounded-full border border-[#181818]/45 bg-[#EAEAE8]/90 backdrop-blur-sm flex items-center justify-center text-[#181818] hover:border-[#181818] hover:bg-[#181818] hover:text-[#EAEAE8] disabled:opacity-25 disabled:pointer-events-none transition-all shrink-0 shadow-sm"
            >
              <span className="text-base leading-none">→</span>
            </button>
          </div>
        </section>

        {/* ====================================================================
            4. BOTTOM INTERACTIVE CHRONOLOGICAL YEAR WAVEFORM TIMELINE SCRUBBER
            ==================================================================== */}
        <footer
          className={`fixed bottom-0 left-0 right-0 z-20 h-[78px] px-4 md:px-10 pb-2.5 pt-1.5 bg-gradient-to-t from-[#D2D2CF]/95 via-[#EAEAE8]/85 to-transparent backdrop-blur-[2px] flex flex-col justify-end transition-opacity duration-300 ${
            diveState === "shelf" ? "opacity-100" : "opacity-0"
          }`}
        >
          <div
            ref={timelineRef}
            onPointerDown={(e) => {
              isScrubbingTimelineRef.current = true;
              scrubTimelineAtClientX(e.clientX);
            }}
            onPointerMove={(e) => {
              if (!isScrubbingTimelineRef.current) return;
              scrubTimelineAtClientX(e.clientX);
            }}
            onPointerUp={() => {
              isScrubbingTimelineRef.current = false;
            }}
            onPointerLeave={() => {
              isScrubbingTimelineRef.current = false;
            }}
            className="relative w-full h-14 cursor-ew-resize flex flex-col justify-end select-none"
          >
            {/* Coral Needle Indicator Aligned Monotonically to Active Release Year */}
            <div
              className="pointer-events-none absolute top-0 bottom-4 z-20 transition-all duration-300 ease-out"
              style={{ left: `${activeNeedlePercent}%` }}
            >
              <div className="relative -translate-x-1/2 flex flex-col items-center">
                <div className="px-1.5 py-0.5 bg-[#E05A3A] text-[#FAF9F6] font-mono text-[10px] font-bold tracking-wider shadow-sm">
                  {activeRelease?.releaseYear}
                </div>
                <div className="w-[2px] h-8 bg-[#E05A3A]" />
              </div>
            </div>

            {/* Dense Vertical Waveform Tick Marks */}
            <div className="w-full flex items-end justify-between h-6 px-1 border-b border-[#181818]/25">
              {timelineWaveformTicks.map((tick) => {
                const isNearActiveYear = tick.approxYear === activeRelease?.releaseYear;
                return (
                  <div
                    key={tick.index}
                    style={{ height: `${tick.heightPx}px` }}
                    className={`w-[1.5px] transition-colors duration-200 ${
                      isNearActiveYear
                        ? "bg-[#E05A3A]"
                        : tick.hasRelease
                        ? "bg-[#181818]/70"
                        : "bg-[#6E6E6A]/35"
                    }`}
                  />
                );
              })}
            </div>

            {/* Chronological Year Labels Row (2006 -> 2026) */}
            <div className="w-full flex items-center justify-between pt-1 font-mono text-[10px] md:text-[11px] tracking-wider uppercase text-[#5A5A56]">
              {RULER_YEARS.map((yr) => {
                const isCurrentYear = activeRelease?.releaseYear === yr;
                const hasAnimeInYear = releases.some((r) => r.releaseYear === yr);
                return (
                  <button
                    key={yr}
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      const idx = releases.findIndex((r) => r.releaseYear === yr);
                      if (idx >= 0) selectReleaseIndex(idx);
                    }}
                    className={`relative px-0.5 transition-colors ${
                      isCurrentYear
                        ? "text-[#E05A3A] font-bold"
                        : hasAnimeInYear
                        ? "text-[#181818] font-semibold hover:text-[#E05A3A]"
                        : "text-[#6E6E6A]/55 hover:text-[#181818]"
                    }`}
                  >
                    {formatRulerYear(yr)}
                  </button>
                );
              })}
            </div>
          </div>
        </footer>
      </main>

      {/* ====================================================================
          5. RELEASE DETAIL VIEW (CHOREOGRAPHED GSAP ENTRANCE AFTER SPINDLE DIVE)
          ==================================================================== */}
      {diveState === "detail" && activeRelease && (
        <section
          aria-label="Anime Release Detail and Soundtrack Dossier"
          className="fixed inset-0 z-40 pt-16 overflow-y-auto bg-[#EAEAE8]/97 backdrop-blur-md"
        >
          <div ref={detailContainerRef} className="max-w-6xl mx-auto px-5 md:px-10 py-8 md:py-10">
            {/* Top Action Bar with "← Back to Shelf" Reverse Dive Button */}
            <div className="detail-stagger flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-[#181818]/15">
              <button
                type="button"
                onClick={handleBackToShelf}
                className="inline-flex items-center gap-2.5 px-4 py-2 border border-[#181818] bg-[#181818] text-[#EAEAE8] hover:bg-[#E05A3A] hover:border-[#E05A3A] font-mono text-xs uppercase tracking-[0.15em] transition-colors shadow-sm"
              >
                <span>←</span>
                <span>Back to Shelf</span>
              </button>

              <div className="flex items-center gap-3 font-mono text-xs uppercase tracking-widest">
                <span className="px-2.5 py-1 border border-[#181818]/25 text-[#181818] font-semibold">
                  {activeRelease.catalogCode} • {activeRelease.releaseYear}
                </span>
                <span className="px-2.5 py-1 bg-[#E05A3A] text-white font-bold">
                  {activeRelease.rating >= 10
                    ? "👑 10.0 / 10 MASTERPIECE"
                    : `PERSONAL RATING: ★ ${activeRelease.rating.toFixed(1)} / 10`}
                </span>
                {activeRelease.isOngoing && (
                  <span className="px-2.5 py-1 bg-[#181818] text-[#EAEAE8]">
                    EP {activeRelease.currentEpisode} / {activeRelease.totalEpisodes}
                  </span>
                )}
              </div>

              <div className="flex items-center gap-2 font-mono text-xs">
                <button
                  type="button"
                  onClick={() => selectReleaseIndex(safeIndex - 1)}
                  disabled={safeIndex <= 0}
                  className="px-3 py-1.5 border border-[#181818]/25 hover:border-[#181818] disabled:opacity-30"
                >
                  ← PREV
                </button>
                <button
                  type="button"
                  onClick={() => selectReleaseIndex(safeIndex + 1)}
                  disabled={safeIndex >= releases.length - 1}
                  className="px-3 py-1.5 border border-[#181818]/25 hover:border-[#181818] disabled:opacity-30"
                >
                  NEXT →
                </button>
              </div>
            </div>

            {/* Two-Column Swiss Editorial Dossier */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 pt-8">
              {/* LEFT COLUMN (5 Cols): Official Anime Art / Playable Trailer-OP Video / Swiss Sleeve + Score Audit */}
              <div className="detail-stagger lg:col-span-5 flex flex-col gap-6">
                <div className="flex items-center border-b border-[#181818]/15 font-mono text-[11px] uppercase tracking-wider">
                  <button
                    type="button"
                    onClick={() => setDetailMediaMode("key-visual")}
                    className={`px-3.5 py-2 border-b-2 transition-colors ${
                      detailMediaMode === "key-visual"
                        ? "border-[#E05A3A] text-[#181818] font-bold"
                        : "border-transparent text-[#6E6E6A] hover:text-[#181818]"
                    }`}
                  >
                    Official Key Visual
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      stopAllTrackPreviews();
                      setPlayingTrackNum(null);
                      setDetailMediaMode("trailer");
                    }}
                    className={`px-3.5 py-2 border-b-2 transition-colors flex items-center gap-1.5 ${
                      detailMediaMode === "trailer"
                        ? "border-[#E05A3A] text-[#E05A3A] font-bold"
                        : "border-transparent text-[#181818] hover:text-[#E05A3A]"
                    }`}
                  >
                    <span>▶</span>
                    <span>Play Trailer / OP</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setDetailMediaMode("cover")}
                    className={`px-3.5 py-2 border-b-2 transition-colors ${
                      detailMediaMode === "cover"
                        ? "border-[#E05A3A] text-[#181818] font-bold"
                        : "border-transparent text-[#6E6E6A] hover:text-[#181818]"
                    }`}
                  >
                    Swiss Sleeve
                  </button>
                </div>

                {/* Artwork / Playable YouTube Trailer & OP Cinema Frame */}
                <div
                  className={`relative w-full ${
                    detailMediaMode === "trailer" ? "aspect-video" : "aspect-square"
                  } bg-[#141413] overflow-hidden border border-[#181818]/20 shadow-xl transition-all duration-300`}
                >
                  {detailMediaMode === "key-visual" && (
                    <div className="w-full h-full relative group">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={activeRelease.coverUrl}
                        alt={activeRelease.titleEnglish}
                        className="w-full h-full object-cover object-top"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          stopAllTrackPreviews();
                          setPlayingTrackNum(null);
                          setDetailMediaMode("trailer");
                        }}
                        className="absolute inset-0 bg-[#181818]/0 group-hover:bg-[#181818]/45 flex items-center justify-center transition-all"
                      >
                        <span className="opacity-0 group-hover:opacity-100 transition-opacity px-5 py-2.5 bg-[#E05A3A] text-white font-mono text-xs font-bold uppercase tracking-widest shadow-lg">
                          ▶ PLAY OFFICIAL TRAILER / OP
                        </span>
                      </button>
                      <div className="absolute bottom-3 left-3 right-3 px-3 py-1.5 bg-[#181818]/85 text-[#EAEAE8] font-mono text-[10px] uppercase tracking-wider flex justify-between">
                        <span className="truncate">{activeRelease.titleRomaji}</span>
                        <span className="shrink-0 ml-2">{activeRelease.studio}</span>
                      </div>
                    </div>
                  )}

                  {detailMediaMode === "trailer" && (
                    <div className="w-full h-full bg-[#111110] flex flex-col">
                      <iframe
                        key={activeRelease.youtubeId}
                        title={`${activeRelease.titleEnglish} Official Trailer / OP`}
                        src={`https://www.youtube-nocookie.com/embed/${activeRelease.youtubeId}?autoplay=1&rel=0&modestbranding=1&playsinline=1`}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        referrerPolicy="strict-origin-when-cross-origin"
                        allowFullScreen
                        className="w-full h-full border-0"
                      />
                    </div>
                  )}

                  {detailMediaMode === "cover" && (
                    <DetailProceduralCoverCanvas release={activeRelease} />
                  )}
                </div>

                {detailMediaMode === "trailer" && (
                  <div className="flex items-center justify-between font-mono text-[11px] text-[#6E6E6A] -mt-3">
                    <span>OFFICIAL PV / OPENING STREAM</span>
                    <a
                      href={`https://www.youtube.com/watch?v=${activeRelease.youtubeId}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#181818] hover:text-[#E05A3A] font-semibold underline underline-offset-4"
                    >
                      OPEN ON YOUTUBE ↗
                    </a>
                  </div>
                )}

                {/* Anime Personal Rating Audit */}
                <div className="p-5 border border-[#181818]/15 bg-[#EAEAE8]/60">
                  <div className="flex items-center justify-between pb-3 mb-4 border-b border-[#181818]/15">
                    <span className="font-mono text-xs uppercase tracking-widest text-[#6E6E6A]">
                      ANIME RATING AUDIT
                    </span>
                    <span className="font-mono text-sm font-bold text-[#181818]">
                      ★ {activeRelease.rating.toFixed(1)} / 10
                    </span>
                  </div>

                  <div className="space-y-3">
                    {ratingBreakdown.map((item) => (
                      <div key={item.label} className="space-y-1">
                        <div className="flex justify-between font-mono text-[11px]">
                          <span className="text-[#575752]">{item.label}</span>
                          <span className="font-semibold text-[#181818]">{item.score.toFixed(1)}</span>
                        </div>
                        <div className="w-full h-1.5 bg-[#181818]/10 overflow-hidden">
                          <div
                            className="h-full bg-[#E05A3A] transition-all duration-500"
                            style={{ width: `${(item.score / 10) * 100}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* RIGHT COLUMN (7 Cols): Official Wallpaper Strip, Title, Synopsis, Official OST & Synth Tracklist */}
              <div className="detail-stagger lg:col-span-7 flex flex-col justify-between gap-7">
                <div>
                  {/* Wide Official Anime Wallpaper Header Banner */}
                  {activeRelease.bannerUrl && (
                    <div className="mb-5 w-full h-28 sm:h-36 overflow-hidden border border-[#181818]/15 relative">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={activeRelease.bannerUrl}
                        alt={`${activeRelease.titleEnglish} Wallpaper`}
                        className="w-full h-full object-cover object-center"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#181818]/65 via-transparent to-transparent" />
                      <div className="absolute bottom-2.5 left-3.5 font-mono text-[10px] uppercase tracking-[0.2em] text-white/95">
                        ● {activeRelease.catalogCode} — {activeRelease.studio} ({activeRelease.releaseYear})
                      </div>
                    </div>
                  )}

                  <div className="flex flex-wrap items-center gap-2 font-mono text-xs uppercase tracking-[0.16em] text-[#E05A3A]">
                    <span>●</span>
                    <span>{activeRelease.genres.join(" / ")}</span>
                    <span className="text-[#6E6E6A]">—</span>
                    <span className="text-[#181818]">
                      {activeRelease.releaseYear} • {activeRelease.bpm} BPM • {activeRelease.keySignature}
                    </span>
                  </div>

                  <h1 className="mt-2 text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#181818]">
                    {activeRelease.titleEnglish}
                  </h1>
                  <p className="mt-1 text-base md:text-lg text-[#555551]">
                    {activeRelease.titleRomaji} —{" "}
                    <span className="text-[#181818] font-semibold">♪ {activeRelease.songTitle}</span> (
                    {activeRelease.songArtist})
                  </p>

                  <p className="mt-5 text-sm md:text-base leading-relaxed text-[#181818]/90">
                    {activeRelease.synopsis}
                  </p>

                  <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <blockquote className="p-3.5 border-l-2 border-[#E05A3A] bg-[#181818]/[0.03] font-mono text-[11px] uppercase tracking-wider text-[#181818]">
                      “{activeRelease.quote1}”
                    </blockquote>
                    <blockquote className="p-3.5 border-l-2 border-[#181818] bg-[#181818]/[0.03] font-mono text-[11px] uppercase tracking-wider text-[#181818]">
                      “{activeRelease.quote2}”
                    </blockquote>
                  </div>

                  {/* PLAYABLE OFFICIAL THEME SONG + WEB AUDIO SYNTH PREVIEW TRACKLIST */}
                  <div className="mt-8">
                    <div className="flex items-center justify-between pb-2.5 border-b border-[#181818]">
                      <span className="font-mono text-xs font-bold uppercase tracking-[0.16em]">
                        OFFICIAL THEME SONG &amp; SYNTH PREVIEW BARS
                      </span>
                      <span className="font-mono text-[11px] uppercase text-[#E05A3A] font-semibold">
                        TRACK 01 = OFFICIAL VOCAL AUDIO
                      </span>
                    </div>

                    <div className="divide-y divide-[#181818]/12">
                      {activeRelease.tracks.map((track) => {
                        const isPlaying = playingTrackNum === track.number;
                        const bars = generateWaveformBars(track.waveformSeed, 44);

                        return (
                          <div
                            key={track.number}
                            onClick={() => handleToggleTrackPlay(track)}
                            className={`py-3.5 px-2 flex flex-col sm:flex-row sm:items-center justify-between gap-3 cursor-pointer transition-colors ${
                              isPlaying ? "bg-[#181818]/[0.06]" : "hover:bg-[#181818]/[0.03]"
                            }`}
                          >
                            <div className="flex items-center gap-3.5 min-w-0">
                              <button
                                type="button"
                                aria-label={isPlaying ? "Stop Track" : "Play Track"}
                                className={`w-8 h-8 rounded-full border flex items-center justify-center font-mono text-xs shrink-0 transition-colors ${
                                  isPlaying
                                    ? "border-[#E05A3A] bg-[#E05A3A] text-white"
                                    : "border-[#181818]/40 text-[#181818] hover:border-[#181818]"
                                }`}
                              >
                                {isPlaying ? "■" : "▶"}
                              </button>

                              <span className="font-mono text-xs text-[#6E6E6A] w-6 shrink-0">
                                {track.number}
                              </span>

                              <div className="min-w-0">
                                <div className="font-semibold text-sm text-[#181818] truncate flex items-center gap-2">
                                  <span className="truncate">{track.title}</span>
                                  {track.isOfficialOst && (
                                    <span className="px-1.5 py-0.5 text-[9px] font-mono uppercase bg-[#E05A3A] text-white shrink-0">
                                      OFFICIAL
                                    </span>
                                  )}
                                </div>
                                <div className="font-mono text-[11px] text-[#575752] truncate">
                                  {track.role} • {track.bpm} BPM
                                </div>
                              </div>
                            </div>

                            {/* Interactive Waveform Preview Bar */}
                            <div className="flex items-center gap-3 self-end sm:self-center shrink-0">
                              <div className="flex items-end gap-[2px] h-7 w-40 sm:w-48 px-1.5 py-1 bg-[#181818]/[0.04] border border-[#181818]/12">
                                {bars.map((barH, bIdx) => {
                                  const ratio = bIdx / bars.length;
                                  const activeBar = isPlaying && ratio <= trackProgress;
                                  const dynamicH = isPlaying
                                    ? liveWaveLevels[bIdx % liveWaveLevels.length] || barH
                                    : barH;
                                  return (
                                    <span
                                      key={bIdx}
                                      style={{ height: `${Math.round(dynamicH * 100)}%` }}
                                      className={`flex-1 transition-all duration-75 ${
                                        activeBar
                                          ? "bg-[#E05A3A]"
                                          : isPlaying
                                          ? "bg-[#181818]/50"
                                          : "bg-[#6E6E6A]/45"
                                      }`}
                                    />
                                  );
                                })}
                              </div>

                              <span className="font-mono text-xs text-[#575752] w-11 text-right">
                                {track.duration}
                              </span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Archival Credits & Specifications Table */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-5 border-t border-[#181818]/15 font-mono text-xs">
                  <div>
                    <div className="text-[10px] text-[#6E6E6A] uppercase">CATALOG / FORMAT</div>
                    <div className="mt-0.5 font-semibold text-[#181818]">
                      {activeRelease.catalogCode} • {activeRelease.category}
                    </div>
                  </div>
                  <div>
                    <div className="text-[10px] text-[#6E6E6A] uppercase">ANIMATION STUDIO</div>
                    <div className="mt-0.5 font-semibold text-[#181818]">{activeRelease.studio}</div>
                  </div>
                  <div>
                    <div className="text-[10px] text-[#6E6E6A] uppercase">RELEASE / AGE RATING</div>
                    <div className="mt-0.5 font-semibold text-[#181818]">
                      {activeRelease.releaseYear} • {activeRelease.ageRating}
                    </div>
                  </div>
                  <div>
                    <div className="text-[10px] text-[#6E6E6A] uppercase">PERSONAL ARCHIVE SCORE</div>
                    <div className="mt-0.5 font-bold text-[#E05A3A]">
                      ★ {activeRelease.rating.toFixed(1)} / 10
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ====================================================================
          6. "RELEASES" FULL ARCHIVE INDEX & CURRENTLY WATCHING DRAWER
          ==================================================================== */}
      {activeModal === "releases" && (
        <aside
          aria-label="Complete Anime Rating Releases Index"
          className="fixed inset-0 z-50 pt-16 bg-[#EAEAE8]/96 backdrop-blur-md overflow-y-auto"
        >
          <div className="max-w-6xl mx-auto px-5 md:px-10 py-8">
            <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-[#181818]/15">
              <div>
                <div className="font-mono text-xs uppercase tracking-[0.18em] text-[#E05A3A]">
                  ● COMPLETE DISC ARCHIVE &amp; ANIME WATCHLIST (SORTED 2006 → 2026)
                </div>
                <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-[#181818]">
                  26 Watched Releases &amp; 2 On-Going Series
                </h2>
              </div>

              <button
                type="button"
                onClick={() => setActiveModal("none")}
                className="px-4 py-2 border border-[#181818] bg-[#181818] text-[#EAEAE8] hover:bg-[#E05A3A] hover:border-[#E05A3A] font-mono text-xs uppercase tracking-widest transition-colors"
              >
                Close Index ✕
              </button>
            </div>

            {/* Currently Watching (On-Going Personal Progress) Section */}
            <div className="mt-6">
              <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.16em] text-[#181818] mb-3">
                <span className="w-2 h-2 rounded-full bg-[#E05A3A] animate-pulse" />
                <span>CURRENTLY WATCHING (ON-GOING PERSONAL PROGRESS)</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {CURRENTLY_WATCHING_RELEASES.map((cw, idx) => {
                  const pct = Math.min(
                    100,
                    Math.round(((cw.currentEpisode || 1) / (cw.totalEpisodes || 12)) * 100)
                  );
                  return (
                    <div
                      key={cw.id}
                      onClick={() => {
                        setActiveModal("none");
                        handleCategorySwitch("watching", idx);
                      }}
                      className="p-4 border border-[#181818]/20 bg-[#EAEAE8] hover:border-[#E05A3A] cursor-pointer transition-all group flex gap-4"
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={cw.coverUrl}
                        alt={cw.titleEnglish}
                        className="w-16 h-24 object-cover border border-[#181818]/20 shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between font-mono text-[11px]">
                          <span className="text-[#E05A3A] font-bold">● {cw.catalogCode} — ON-GOING</span>
                          <span className="font-semibold text-[#181818]">
                            Ep {cw.currentEpisode}/{cw.totalEpisodes} ({pct}%)
                          </span>
                        </div>
                        <h3 className="mt-1 text-lg font-bold text-[#181818] group-hover:text-[#E05A3A] truncate">
                          {cw.titleEnglish}
                        </h3>
                        <p className="text-xs text-[#6E6E6A] truncate">{cw.titleRomaji}</p>
                        <div className="mt-2.5 w-full h-1.5 bg-[#181818]/10 overflow-hidden">
                          <div className="h-full bg-[#E05A3A]" style={{ width: `${pct}%` }} />
                        </div>
                        <div className="mt-2 flex items-center justify-between font-mono text-[11px] text-[#6E6E6A]">
                          <span className="truncate">♪ {cw.songTitle} — {cw.songArtist}</span>
                          <span className="text-[#181818] font-bold shrink-0 ml-2">★ {cw.rating.toFixed(1)}</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Search, Genre Filter & Sort Controls */}
            <div className="mt-8 flex flex-wrap items-center gap-3 pb-4 border-b border-[#181818]">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search title, Romaji, catalog code, or artist..."
                className="flex-1 min-w-[220px] px-3.5 py-2 bg-white/70 border border-[#181818]/25 font-mono text-xs text-[#181818] placeholder:text-[#6E6E6A] focus:outline-none focus:border-[#181818]"
              />
              <select
                value={genreFilter}
                onChange={(e) => setGenreFilter(e.target.value)}
                className="px-3.5 py-2 bg-white/70 border border-[#181818]/25 font-mono text-xs text-[#181818]"
              >
                {allGenres.map((g) => (
                  <option key={g} value={g}>
                    {g === "All" ? "All Genres" : g}
                  </option>
                ))}
              </select>
              <select
                value={sortBy}
                onChange={(e) =>
                  setSortBy(e.target.value as "year-asc" | "rating-desc" | "year-desc" | "title-asc")
                }
                className="px-3.5 py-2 bg-white/70 border border-[#181818]/25 font-mono text-xs text-[#181818]"
              >
                <option value="year-asc">Sort: Chronological (2006 → 2026)</option>
                <option value="rating-desc">Sort: Highest Rated (10.0 → 7.0)</option>
                <option value="year-desc">Sort: Newest Release Year</option>
                <option value="title-asc">Sort: Title (A → Z)</option>
              </select>
            </div>

            {/* Complete 26 Watched Anime Archive Table with Thumbnails */}
            <div className="divide-y divide-[#181818]/12 font-mono text-xs">
              {filteredCatalogList.map((rel) => {
                const watchedIdx = WATCHED_ANIME_RELEASES.findIndex((x) => x.id === rel.id);
                return (
                  <div
                    key={rel.id}
                    onClick={() => {
                      setActiveModal("none");
                      handleCategorySwitch("all", watchedIdx >= 0 ? watchedIdx : 0);
                    }}
                    className="py-3 px-3 flex flex-wrap sm:flex-nowrap items-center justify-between gap-4 hover:bg-[#181818]/[0.04] cursor-pointer transition-colors group"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={rel.coverUrl}
                        alt={rel.shortTitle}
                        className="w-8 h-11 object-cover border border-[#181818]/20 shrink-0"
                      />
                      <span className="text-[#6E6E6A] w-16 shrink-0">{rel.catalogCode}</span>
                      <div className="min-w-0 font-sans">
                        <div className="font-semibold text-sm text-[#181818] group-hover:text-[#E05A3A] truncate">
                          {rel.titleEnglish}
                        </div>
                        <div className="text-xs text-[#6E6E6A] truncate">{rel.titleRomaji}</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-5 shrink-0">
                      <span className="hidden md:inline text-[#6E6E6A]">
                        {rel.genres.slice(0, 2).join(" / ")}
                      </span>
                      <span className="hidden sm:inline text-[#181818] font-medium">
                        {rel.releaseYear} • {rel.category}
                      </span>
                      <span
                        className={`px-2.5 py-1 font-bold ${
                          rel.rating >= 10
                            ? "bg-[#E05A3A] text-white"
                            : "bg-[#181818]/10 text-[#181818]"
                        }`}
                      >
                        {rel.rating >= 10 ? "👑 10.0 / 10" : `★ ${rel.rating.toFixed(1)}`}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Personal FYI Note & Warm Closing Footer */}
            <div className="mt-10 p-6 border border-[#181818]/20 bg-[#D2D2CF]/40 space-y-2 text-sm text-[#181818]">
              <p>
                <strong>💡 FYI / Archivist Note:</strong> Honestly, there are still so many other anime I&apos;ve
                watched that have slipped my mind! Whenever I remember their titles, I&apos;ll definitely add them to
                this archive—and I might even rewatch some of these series and movies just for the nostalgia!
              </p>
              <p className="text-[#6E6E6A]">
                ✨ Thank you for visiting my personal Anime Rating Disc Archive! Hope you found your next great watch
                here.
              </p>
            </div>
          </div>
        </aside>
      )}

      {/* ====================================================================
          7. "ARTISTS" OST & ANIME THEME SONG DIRECTORY DRAWER
          ==================================================================== */}
      {activeModal === "artists" && (
        <aside
          aria-label="Anime OST Artists and Theme Song Directory"
          className="fixed inset-0 z-50 pt-16 bg-[#EAEAE8]/96 backdrop-blur-md overflow-y-auto"
        >
          <div className="max-w-6xl mx-auto px-5 md:px-10 py-8">
            <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-[#181818]/15">
              <div>
                <div className="font-mono text-xs uppercase tracking-[0.18em] text-[#E05A3A]">
                  ● ANIME SOUNDTRACK ARTISTS &amp; STUDIOS
                </div>
                <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-[#181818]">
                  Official Opening Themes, Composers &amp; Studios
                </h2>
              </div>

              <button
                type="button"
                onClick={() => setActiveModal("none")}
                className="px-4 py-2 border border-[#181818] bg-[#181818] text-[#EAEAE8] hover:bg-[#E05A3A] hover:border-[#E05A3A] font-mono text-xs uppercase tracking-widest transition-colors"
              >
                Close Artists ✕
              </button>
            </div>

            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {ALL_ANIME_RELEASES.map((rel) => {
                const isOngoing = Boolean(rel.isOngoing);
                const targetCat: CategoryFilter = isOngoing ? "watching" : "all";
                const idxInCat = isOngoing
                  ? CURRENTLY_WATCHING_RELEASES.findIndex((x) => x.id === rel.id)
                  : WATCHED_ANIME_RELEASES.findIndex((x) => x.id === rel.id);

                return (
                  <div
                    key={rel.id}
                    onClick={() => {
                      setActiveModal("none");
                      handleCategorySwitch(targetCat, Math.max(0, idxInCat));
                    }}
                    className="p-4 border border-[#181818]/20 bg-[#EAEAE8] hover:border-[#E05A3A] cursor-pointer transition-all flex gap-3.5 group"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={rel.coverUrl}
                      alt={rel.shortTitle}
                      className="w-12 h-16 object-cover border border-[#181818]/20 shrink-0"
                    />
                    <div className="flex-1 min-w-0 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between font-mono text-[10px] text-[#6E6E6A]">
                          <span className="truncate">{rel.catalogCode} • {rel.studio}</span>
                          <span className="text-[#E05A3A] font-bold shrink-0 ml-1">{rel.bpm} BPM</span>
                        </div>
                        <div className="mt-1 text-base font-bold text-[#181818] group-hover:text-[#E05A3A] truncate">
                          {rel.songArtist}
                        </div>
                        <div className="font-mono text-xs text-[#181818] truncate">♪ “{rel.songTitle}”</div>
                      </div>

                      <div className="pt-2 mt-2 border-t border-[#181818]/10 flex items-center justify-between font-mono text-[10px] text-[#6E6E6A]">
                        <span className="truncate">{rel.shortTitle} ({rel.releaseYear})</span>
                        <span className="text-[#181818] font-bold shrink-0">★ {rel.rating.toFixed(1)}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </aside>
      )}
    </div>
  );
}
