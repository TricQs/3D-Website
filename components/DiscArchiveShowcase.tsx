"use client";

import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import dynamic from "next/dynamic";
import {
  ALL_ANIME_RELEASES,
  AnimeRelease,
  ArchiveTrack,
  CURRENTLY_WATCHING_RELEASES,
  WATCHED_ANIME_RELEASES
} from "@/lib/animeArchiveData";
import { drawProceduralIllustration } from "@/lib/proceduralTextures";
import {
  generateWaveformBars,
  playDiveTransitionSound,
  playMechanicalStepSound,
  resolveAnimeExternalMedia,
  ResolvedExternalMedia,
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
type DetailMediaMode = "cover" | "key-visual" | "trailer";

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
 * High-DPI 2D Procedural Sleeve Preview Canvas inside the Release Detail View
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

    // Header metadata
    ctx.fillStyle = release.coverInkColor;
    ctx.font = "700 14px 'IBM Plex Mono', monospace";
    ctx.fillText(`DISC ARCHIVE  —  ${release.catalogCode}`, 42, 54);
    ctx.font = "500 12px 'IBM Plex Mono', monospace";
    ctx.fillText(`${release.category.toUpperCase()} • ${release.studio.toUpperCase()} • ${release.releaseYear}`, 42, 74);

    // Score stamp
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

    // Draw procedural Swiss illustration
    drawProceduralIllustration(ctx, release, 42, 96, w - 84, 355);

    // Bottom Swiss typography
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
      className="w-full aspect-square shadow-xl border border-[#181818]/15"
    />
  );
}

export default function DiscArchiveShowcase() {
  const [category, setCategory] = useState<CategoryFilter>("all");
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [diveState, setDiveState] = useState<"shelf" | "diving-in" | "detail" | "diving-out">("shelf");
  const [activeModal, setActiveModal] = useState<ActiveModal>("none");
  const [radioActive, setRadioActive] = useState<boolean>(false);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [useOfficialPosters, setUseOfficialPosters] = useState<boolean>(false);

  // Release Detail View & Audio Synth state
  const [playingTrackNum, setPlayingTrackNum] = useState<string | null>(null);
  const [trackProgress, setTrackProgress] = useState<number>(0);
  const [liveWaveLevels, setLiveWaveLevels] = useState<number[]>([]);
  const [detailMediaMode, setDetailMediaMode] = useState<DetailMediaMode>("cover");

  // External enriched media cache (Jikan MAL poster, YouTube trailer, iTunes 30s OST, AnimeThemes OP)
  const [externalMediaMap, setExternalMediaMap] = useState<Record<string, ResolvedExternalMedia>>({});
  const [loadedPosterImages, setLoadedPosterImages] = useState<Record<string, HTMLImageElement>>({});

  // Releases Drawer Search / Filter / Sort state
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [genreFilter, setGenreFilter] = useState<string>("All");
  const [sortBy, setSortBy] = useState<"catalog" | "rating-desc" | "year-desc" | "title-asc">("catalog");

  const timelineRef = useRef<HTMLDivElement>(null);
  const isScrubbingTimelineRef = useRef<boolean>(false);
  const wheelCooldownRef = useRef<boolean>(false);

  // Filtered releases on the 3D shelf
  const releases = useMemo(() => {
    if (category === "Movie") {
      return WATCHED_ANIME_RELEASES.filter((r) => r.category === "Movie");
    }
    if (category === "TV Series") {
      return WATCHED_ANIME_RELEASES.filter((r) => r.category === "TV Series");
    }
    if (category === "watching") {
      return CURRENTLY_WATCHING_RELEASES;
    }
    return WATCHED_ANIME_RELEASES;
  }, [category]);

  const safeIndex = Math.max(0, Math.min(releases.length - 1, activeIndex));
  const activeRelease = releases[safeIndex] || releases[0];
  const activeExternalMedia = externalMediaMap[activeRelease?.id] || {};

  // Select a release index with tactile platter step sound
  const selectReleaseIndex = useCallback(
    (nextIndex: number) => {
      if (releases.length === 0) return;
      const clamped = Math.max(0, Math.min(releases.length - 1, nextIndex));
      if (clamped !== activeIndex) {
        setActiveIndex(clamped);
        playMechanicalStepSound(soundEnabled);
      }
    },
    [activeIndex, releases.length, soundEnabled]
  );

  // Resolve external media for active release in background (zero blocking)
  useEffect(() => {
    if (!activeRelease) return;
    let cancelled = false;
    resolveAnimeExternalMedia(activeRelease).then((media) => {
      if (cancelled) return;
      setExternalMediaMap((prev) => ({ ...prev, [activeRelease.id]: media }));
      if (media.posterUrl && !loadedPosterImages[activeRelease.id]) {
        const img = new Image();
        img.crossOrigin = "anonymous";
        img.onload = () => {
          setLoadedPosterImages((prev) => ({ ...prev, [activeRelease.id]: img }));
        };
        img.src = media.posterUrl;
      }
    });
    return () => {
      cancelled = true;
    };
  }, [activeRelease, loadedPosterImages]);

  // Radio mode auto-play when switching releases
  useEffect(() => {
    if (!radioActive || !activeRelease || !soundEnabled) return;
    const firstTrack = activeRelease.tracks[0];
    setPlayingTrackNum(firstTrack.number);
    startTrackSynthPreview(firstTrack, {
      useRealOstUrl: externalMediaMap[activeRelease.id]?.songPreviewUrl,
      onProgress: (p, levels) => {
        setTrackProgress(p);
        setLiveWaveLevels(levels);
      },
      onEnded: () => {
        setPlayingTrackNum(null);
      }
    });
  }, [radioActive, activeRelease, soundEnabled, externalMediaMap]);

  // Trigger Signature Camera Dive through the center spindle hole
  const handleTriggerDive = useCallback(() => {
    if (diveState !== "shelf") return;
    playDiveTransitionSound(true, soundEnabled);
    setDetailMediaMode("cover");
    setDiveState("diving-in");
  }, [diveState, soundEnabled]);

  const handleDiveInComplete = useCallback(() => {
    setDiveState("detail");
    // Auto-start subtle Web Audio synth preview on entering Release Detail View if sound is enabled
    if (soundEnabled && activeRelease) {
      const tr = activeRelease.tracks[0];
      setPlayingTrackNum(tr.number);
      startTrackSynthPreview(tr, {
        useRealOstUrl: externalMediaMap[activeRelease.id]?.songPreviewUrl,
        onProgress: (p, levels) => {
          setTrackProgress(p);
          setLiveWaveLevels(levels);
        },
        onEnded: () => setPlayingTrackNum(null)
      });
    }
  }, [activeRelease, externalMediaMap, soundEnabled]);

  // Reverse Camera Dive back to the 3D shelf
  const handleBackToShelf = useCallback(() => {
    if (diveState !== "detail") return;
    if (!radioActive) {
      stopAllTrackPreviews();
      setPlayingTrackNum(null);
    }
    playDiveTransitionSound(false, soundEnabled);
    setDiveState("diving-out");
  }, [diveState, radioActive, soundEnabled]);

  const handleDiveOutComplete = useCallback(() => {
    setDiveState("shelf");
  }, []);

  // Mouse Wheel & Arrow Key navigation on the 3D shelf
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

  // Scrubbing the Bottom Interactive Year Waveform Timeline
  const scrubTimelineAtClientX = useCallback(
    (clientX: number) => {
      const bar = timelineRef.current;
      if (!bar || releases.length === 0) return;
      const rect = bar.getBoundingClientRect();
      const ratio = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
      const minYear = RULER_YEARS[0];
      const maxYear = RULER_YEARS[RULER_YEARS.length - 1];
      const targetYear = minYear + ratio * (maxYear - minYear);

      // Find the release in the active list closest to targetYear
      let bestIdx = 0;
      let bestDist = Infinity;
      releases.forEach((rel, idx) => {
        const dist = Math.abs(rel.releaseYear - targetYear) + Math.abs(idx - safeIndex) * 0.01;
        if (dist < bestDist) {
          bestDist = dist;
          bestIdx = idx;
        }
      });
      selectReleaseIndex(bestIdx);
    },
    [releases, safeIndex, selectReleaseIndex]
  );

  // Position of the coral needle along the 2006..2026 timeline ruler (0..100%)
  const activeNeedlePercent = useMemo(() => {
    if (!activeRelease) return 50;
    const minY = RULER_YEARS[0];
    const maxY = RULER_YEARS[RULER_YEARS.length - 1];
    const pct = ((activeRelease.releaseYear - minY) / (maxY - minY)) * 100;
    return Math.max(1.5, Math.min(98.5, pct));
  }, [activeRelease]);

  // Dense vertical waveform ticks for the bottom timeline ruler (128 ticks)
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
      const heightPx = isMajorYear ? 24 : Math.round(7 + wave * 17);
      return { index: i, ratio, approxYear, hasRelease, isMajorYear, heightPx };
    });
  }, [releases]);

  // Play or pause a specific track in the Release Detail View
  const handleToggleTrackPlay = (track: ArchiveTrack) => {
    if (playingTrackNum === track.number) {
      stopAllTrackPreviews();
      setPlayingTrackNum(null);
      return;
    }
    setPlayingTrackNum(track.number);
    setTrackProgress(0);
    startTrackSynthPreview(track, {
      useRealOstUrl: track.number === "01" ? activeExternalMedia.songPreviewUrl : undefined,
      onProgress: (p, levels) => {
        setTrackProgress(p);
        setLiveWaveLevels(levels);
      },
      onEnded: () => {
        setPlayingTrackNum(null);
      }
    });
  };

  // All genres for the Releases drawer filter
  const allGenres = useMemo(() => {
    const set = new Set<string>();
    ALL_ANIME_RELEASES.forEach((r) => r.genres.forEach((g) => set.add(g)));
    return ["All", ...Array.from(set).sort()];
  }, []);

  // Filtered & sorted list inside the `Releases` Index Drawer
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
      return Number(a.id) - Number(b.id);
    });
  }, [genreFilter, searchQuery, sortBy]);

  // Sub-score breakdown metrics for the Anime Rating Dossier
  const ratingBreakdown = useMemo(() => {
    if (!activeRelease) return [];
    const base = activeRelease.rating;
    const seed = activeRelease.catalogCode.charCodeAt(4) || 7;
    const clampScore = (v: number) => Math.min(10, Math.max(6.5, Math.round(v * 10) / 10));
    return [
      { label: "NARRATIVE & PACING", score: base >= 10 ? 10.0 : clampScore(base + ((seed % 3) - 1) * 0.2) },
      { label: "CHARACTER CHEMISTRY", score: base >= 10 ? 10.0 : clampScore(base + 0.2) },
      { label: "DIRECTION & VISUAL ART", score: base >= 10 ? 10.0 : clampScore(base + ((seed % 2) * 0.1)) },
      { label: "OST & THEME DIRECTION", score: base >= 10 ? 10.0 : clampScore(base + 0.3) },
      { label: "PERSONAL VERDICT", score: base }
    ];
  }, [activeRelease]);

  const handleCategorySwitch = (nextCat: CategoryFilter, targetIndex = 0) => {
    setCategory(nextCat);
    setActiveIndex(targetIndex);
    playMechanicalStepSound(soundEnabled);
    if (diveState === "detail") {
      setDiveState("shelf");
    }
  };

  return (
    <div
      className="relative w-screen h-screen overflow-hidden select-none text-[#181818] font-sans"
      style={{
        background: "radial-gradient(circle at 50% 38%, #EAEAE8 0%, #E2E2DF 58%, #D2D2CF 100%)"
      }}
    >
      {/* Subtle Studio Paper / Analog Grain Overlay */}
      <div
        className="pointer-events-none fixed inset-0 z-10 opacity-[0.035]"
        style={{
          backgroundImage:
            " radial-gradient(#181818 0.75px, transparent 0.75px), radial-gradient(#181818 0.75px, #EAEAE8 0.75px)",
          backgroundSize: "24px 24px",
          backgroundPosition: "0 0, 12px 12px"
        }}
      />

      {/* ====================================================================
          1. TOP NAVIGATION BAR (MINIMALIST SWISS EDITORIAL HUD)
          ==================================================================== */}
      <header className="fixed top-0 left-0 right-0 z-30 flex items-center justify-between px-5 md:px-9 h-16 border-b border-[#181818]/10 bg-[#EAEAE8]/80 backdrop-blur-md">
        {/* Top-Left: DISC ARCHIVE + Quick Category Filter Pills */}
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

          {/* Compact Filter Tabs */}
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
                onClick={() => handleCategorySwitch(tab.id, 0)}
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

        {/* Top-Center: Coral dot (●) + ON THE PLATTER — CATALOG & ACTIVE TITLE */}
        <div className="hidden md:flex items-center gap-2.5 font-mono text-[11px] lg:text-xs tracking-[0.14em] uppercase">
          <span
            className="inline-block w-2 h-2 rounded-full bg-[#E05A3A] animate-pulse"
            aria-hidden="true"
          />
          <span className="text-[#6E6E6A]">ON THE PLATTER</span>
          <span className="text-[#6E6E6A]">—</span>
          <span className="font-semibold text-[#181818]">
            {activeRelease?.catalogCode} {activeRelease?.shortTitle}
          </span>
          <span className="px-1.5 py-0.5 text-[10px] bg-[#181818]/8 text-[#181818] font-semibold">
            {activeRelease?.rating >= 10
              ? "👑 10.0"
              : `★ ${activeRelease?.rating.toFixed(1)}`}
          </span>
        </div>

        {/* Top-Right: Navigation Links (Releases, Artists, Radio) */}
        <nav className="flex items-center gap-5 md:gap-7 text-xs md:text-[13px] font-medium tracking-tight">
          <button
            type="button"
            onClick={() => setUseOfficialPosters((v) => !v)}
            title="Toggle between Procedural Swiss Illustrations and Official MyAnimeList Key Visuals on 3D Sleeves"
            className="hidden sm:inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-wider px-2.5 py-1 border border-[#181818]/20 text-[#6E6E6A] hover:text-[#181818] hover:border-[#181818] transition-colors"
          >
            <span>SLEEVE:</span>
            <strong className="text-[#181818]">{useOfficialPosters ? "MAL VISUAL" : "SWISS CANVAS"}</strong>
          </button>

          <button
            type="button"
            onClick={() => setActiveModal(activeModal === "releases" ? "none" : "releases")}
            className={`relative py-1 transition-colors ${
              activeModal === "releases"
                ? "text-[#E05A3A] font-semibold"
                : "text-[#181818] hover:text-[#E05A3A]"
            }`}
          >
            Releases
            {activeModal === "releases" && (
              <span className="absolute -bottom-1 left-0 right-0 h-[1.5px] bg-[#E05A3A]" />
            )}
          </button>

          <button
            type="button"
            onClick={() => setActiveModal(activeModal === "artists" ? "none" : "artists")}
            className={`relative py-1 transition-colors ${
              activeModal === "artists"
                ? "text-[#E05A3A] font-semibold"
                : "text-[#181818] hover:text-[#E05A3A]"
            }`}
          >
            Artists
            {activeModal === "artists" && (
              <span className="absolute -bottom-1 left-0 right-0 h-[1.5px] bg-[#E05A3A]" />
            )}
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
              radioActive
                ? "text-[#E05A3A] font-semibold"
                : "text-[#181818] hover:text-[#E05A3A]"
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
          2. CORE 3D REACT THREE FIBER SCENE (PLATTER + 17-CASE ACCORDION SHELF)
          ==================================================================== */}
      <main
        className={`relative w-full h-full transition-opacity duration-500 ${
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
          useOfficialPosters={useOfficialPosters}
          loadedPosterImages={loadedPosterImages}
        />

        {/* Subtle Top-Left & Top-Right Editorial Counter & Active Score Readout on Stage */}
        <div className="pointer-events-none fixed top-20 left-5 md:left-9 z-20 hidden sm:flex flex-col gap-1 font-mono text-[11px] uppercase tracking-widest text-[#6E6E6A]">
          <div>
            SHELF SLOT <span className="text-[#181818] font-semibold">{String(safeIndex + 1).padStart(2, "0")}</span> /{" "}
            {String(releases.length).padStart(2, "0")}
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
            <div className="text-[#E05A3A] font-semibold">
              ● WATCHING EPISODE {activeRelease.currentEpisode} OF {activeRelease.totalEpisodes}
            </div>
          )}
        </div>

        {/* Radio Mode Live Status Pill (Top-Right below nav) */}
        {radioActive && (
          <div className="fixed top-20 right-5 md:right-9 z-20 flex items-center gap-3 px-3.5 py-2 bg-[#181818] text-[#EAEAE8] font-mono text-[11px] uppercase tracking-wider shadow-lg">
            <span className="w-2 h-2 rounded-full bg-[#E05A3A] animate-pulse" />
            <span>
              RADIO: ♪ {activeRelease?.songTitle} — {activeRelease?.songArtist}
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
            3. CENTER-BOTTOM RELEASE CAPTION & FLANKING 40PX CIRCULAR CONTROLS
            ==================================================================== */}
        <section
          aria-label="Active Release Caption and Shelf Controls"
          className="pointer-events-none fixed bottom-24 md:bottom-28 left-0 right-0 z-20 flex items-center justify-center px-4"
        >
          <div className="pointer-events-auto flex items-center justify-between w-full max-w-2xl gap-4 md:gap-8">
            {/* Left 40px Circular Thin-Outlined Button (←) */}
            <button
              type="button"
              onClick={() => selectReleaseIndex(safeIndex - 1)}
              disabled={safeIndex <= 0}
              aria-label="Previous Release"
              className="w-10 h-10 rounded-full border border-[#181818]/35 flex items-center justify-center text-[#181818] hover:border-[#181818] hover:bg-[#181818] hover:text-[#EAEAE8] disabled:opacity-25 disabled:pointer-events-none transition-all shrink-0"
            >
              <span className="text-base leading-none">←</span>
            </button>

            {/* Center Caption Stack */}
            <div
              onClick={handleTriggerDive}
              className="flex flex-col items-center text-center cursor-pointer group"
              title="Click to dive through the disc spindle hole into full rating & soundtrack dossier"
            >
              {/* Coral dot + Catalog Code — Genre — Personal Rating */}
              <div className="flex items-center gap-2 font-mono text-[11px] md:text-xs tracking-[0.16em] uppercase text-[#181818]">
                <span className="inline-block w-2 h-2 rounded-full bg-[#E05A3A]" />
                <span>
                  {activeRelease?.catalogCode} — {activeRelease?.genres.slice(0, 2).join(" / ").toUpperCase()}
                </span>
                <span className="text-[#E05A3A] font-semibold">
                  ★ {activeRelease?.rating.toFixed(1)}
                </span>
              </div>

              {/* Large Centered Neo-Grotesque Title */}
              <h1 className="mt-1 text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight text-[#181818] group-hover:text-[#E05A3A] transition-colors line-clamp-1">
                {activeRelease?.titleEnglish}
              </h1>

              {/* Subtitle: Romaji / Song Artist, Release Year */}
              <p className="mt-0.5 text-xs sm:text-sm text-[#6E6E6A] font-normal">
                {activeRelease?.titleRomaji} • ♪ {activeRelease?.songArtist}, {activeRelease?.releaseYear}
              </p>

              {/* Micro Interactive Prompt */}
              <span className="mt-1.5 font-mono text-[10px] uppercase tracking-[0.18em] text-[#6E6E6A] group-hover:text-[#181818] transition-colors">
                [ CLICK SLEEVE OR DISC TO DIVE IN ↗ ]
              </span>
            </div>

            {/* Right 40px Circular Thin-Outlined Button (→) */}
            <button
              type="button"
              onClick={() => selectReleaseIndex(safeIndex + 1)}
              disabled={safeIndex >= releases.length - 1}
              aria-label="Next Release"
              className="w-10 h-10 rounded-full border border-[#181818]/35 flex items-center justify-center text-[#181818] hover:border-[#181818] hover:bg-[#181818] hover:text-[#EAEAE8] disabled:opacity-25 disabled:pointer-events-none transition-all shrink-0"
            >
              <span className="text-base leading-none">→</span>
            </button>
          </div>
        </section>

        {/* ====================================================================
            4. BOTTOM INTERACTIVE YEAR WAVEFORM TIMELINE SCRUBBER
            ==================================================================== */}
        <footer className="fixed bottom-0 left-0 right-0 z-20 h-20 px-4 md:px-10 pb-3 pt-2 bg-gradient-to-t from-[#D2D2CF]/90 via-[#EAEAE8]/75 to-transparent backdrop-blur-[2px] flex flex-col justify-end">
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
            {/* Coral Needle Indicator Aligned to Active Release's Year */}
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

            {/* Dense Vertical Waveform Tick Marks of Varying Heights */}
            <div className="w-full flex items-end justify-between h-7 px-1 border-b border-[#181818]/20">
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
                        ? "bg-[#181818]/65"
                        : "bg-[#6E6E6A]/35"
                    }`}
                  />
                );
              })}
            </div>

            {/* Timeline Year Labels Row */}
            <div className="w-full flex items-center justify-between pt-1.5 font-mono text-[10px] md:text-[11px] tracking-wider uppercase text-[#6E6E6A]">
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
                        ? "text-[#181818] font-medium hover:text-[#E05A3A]"
                        : "text-[#6E6E6A]/60 hover:text-[#181818]"
                    }`}
                  >
                    {formatRulerYear(yr)}
                    {hasAnimeInYear && !isCurrentYear && (
                      <span className="block mx-auto mt-0.5 w-1 h-1 rounded-full bg-[#181818]/40" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </footer>
      </main>

      {/* ====================================================================
          5. RELEASE DETAIL VIEW (CROSSFADED AFTER SPINDLE-HOLE CAMERA DIVE)
          ==================================================================== */}
      {diveState === "detail" && activeRelease && (
        <section
          aria-label="Anime Release Detail and Soundtrack Dossier"
          className="fixed inset-0 z-40 pt-16 overflow-y-auto bg-[#EAEAE8]/95 backdrop-blur-md animate-fadeIn"
        >
          <div className="max-w-6xl mx-auto px-5 md:px-10 py-8 md:py-12">
            {/* Top Action Bar with "← Back to Shelf" Button (Reverses Camera Dive) */}
            <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-[#181818]/15">
              <button
                type="button"
                onClick={handleBackToShelf}
                className="inline-flex items-center gap-2.5 px-4 py-2 border border-[#181818] bg-[#181818] text-[#EAEAE8] hover:bg-[#E05A3A] hover:border-[#E05A3A] font-mono text-xs uppercase tracking-[0.15em] transition-colors"
              >
                <span>←</span>
                <span>Back to Shelf</span>
              </button>

              <div className="flex items-center gap-3 font-mono text-xs uppercase tracking-widest">
                <span className="px-2.5 py-1 border border-[#181818]/25 text-[#181818] font-semibold">
                  {activeRelease.catalogCode}
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

              {/* Prev / Next Release Quick Switcher inside Detail View */}
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

            {/* Main Two-Column Swiss Editorial Dossier Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 pt-8">
              {/* LEFT COLUMN (5 Cols): Sleeve Artwork / Official Key Visual / Trailer + Score Breakdown */}
              <div className="lg:col-span-5 flex flex-col gap-6">
                {/* Media Switcher Tabs */}
                <div className="flex items-center border-b border-[#181818]/15 font-mono text-[11px] uppercase tracking-wider">
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
                    className={`px-3.5 py-2 border-b-2 transition-colors ${
                      detailMediaMode === "trailer"
                        ? "border-[#E05A3A] text-[#181818] font-bold"
                        : "border-transparent text-[#6E6E6A] hover:text-[#181818]"
                    }`}
                  >
                    OP / Trailer Video
                  </button>
                </div>

                {/* Artwork / Video Frame */}
                <div className="relative w-full aspect-square bg-[#181818] overflow-hidden border border-[#181818]/20 shadow-lg">
                  {detailMediaMode === "cover" && (
                    <DetailProceduralCoverCanvas release={activeRelease} />
                  )}

                  {detailMediaMode === "key-visual" && (
                    <div className="w-full h-full flex items-center justify-center bg-[#181818] relative">
                      {activeExternalMedia.posterUrl ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={activeExternalMedia.posterUrl}
                          alt={activeRelease.titleEnglish}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <DetailProceduralCoverCanvas release={activeRelease} />
                      )}
                      <div className="absolute bottom-3 left-3 right-3 px-3 py-1.5 bg-[#181818]/85 text-[#EAEAE8] font-mono text-[10px] uppercase tracking-wider flex justify-between">
                        <span>{activeRelease.titleRomaji}</span>
                        <span>{activeRelease.studio}</span>
                      </div>
                    </div>
                  )}

                  {detailMediaMode === "trailer" && (
                    <div className="w-full h-full bg-[#181818] flex items-center justify-center">
                      {activeExternalMedia.opVideoUrl ? (
                        <video
                          src={activeExternalMedia.opVideoUrl}
                          controls
                          autoPlay
                          loop
                          className="w-full h-full object-contain"
                        />
                      ) : activeExternalMedia.youtubeId ? (
                        <iframe
                          title={`${activeRelease.titleEnglish} Trailer`}
                          src={`https://www.youtube.com/embed/${activeExternalMedia.youtubeId}?autoplay=1&rel=0`}
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                          className="w-full h-full border-0"
                        />
                      ) : (
                        <div className="p-6 text-center font-mono text-xs text-[#EAEAE8]/80">
                          <p className="mb-2 text-[#E05A3A] uppercase">● PROCEDURAL SYNTH MODE ACTIVE</p>
                          <p>Use the Web Audio Synth Tracklist on the right to audition the score.</p>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Anime Personal Rating Breakdown Card */}
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
                          <span className="text-[#6E6E6A]">{item.label}</span>
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

              {/* RIGHT COLUMN (7 Cols): Title, Editorial Synopsis, Playable Web Audio Synth Tracklist & Credits */}
              <div className="lg:col-span-7 flex flex-col justify-between gap-8">
                <div>
                  {/* Genre & Tempo Spec Header */}
                  <div className="flex flex-wrap items-center gap-2 font-mono text-xs uppercase tracking-[0.16em] text-[#E05A3A]">
                    <span>●</span>
                    <span>{activeRelease.genres.join(" / ")}</span>
                    <span className="text-[#6E6E6A]">—</span>
                    <span className="text-[#181818]">
                      {activeRelease.releaseYear} • {activeRelease.bpm} BPM • {activeRelease.keySignature}
                    </span>
                  </div>

                  {/* Large Editorial Release Title */}
                  <h1 className="mt-2 text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#181818]">
                    {activeRelease.titleEnglish}
                  </h1>
                  <p className="mt-1 text-base md:text-lg text-[#6E6E6A]">
                    {activeRelease.titleRomaji} — <span className="text-[#181818] font-medium">♪ {activeRelease.songTitle}</span> ({activeRelease.songArtist})
                  </p>

                  {/* Editorial Synopsis & Archivist Quotes */}
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

                  {/* PLAYABLE TRACKLIST WITH WEB AUDIO SYNTH PREVIEW BARS */}
                  <div className="mt-8">
                    <div className="flex items-center justify-between pb-2.5 border-b border-[#181818]">
                      <span className="font-mono text-xs font-bold uppercase tracking-[0.16em]">
                        SOUNDTRACK &amp; SYNTH PREVIEW BARS
                      </span>
                      <span className="font-mono text-[11px] uppercase text-[#6E6E6A]">
                        CLICK ANY TRACK FOR WEB AUDIO SYNTHESIS
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
                              isPlaying ? "bg-[#181818]/[0.05]" : "hover:bg-[#181818]/[0.025]"
                            }`}
                          >
                            <div className="flex items-center gap-3.5 min-w-0">
                              <button
                                type="button"
                                aria-label={isPlaying ? "Stop Track" : "Play Track"}
                                className={`w-8 h-8 rounded-full border flex items-center justify-center font-mono text-xs shrink-0 transition-colors ${
                                  isPlaying
                                    ? "border-[#E05A3A] bg-[#E05A3A] text-white"
                                    : "border-[#181818]/35 text-[#181818] hover:border-[#181818]"
                                }`}
                              >
                                {isPlaying ? "■" : "▶"}
                              </button>

                              <span className="font-mono text-xs text-[#6E6E6A] w-6 shrink-0">
                                {track.number}
                              </span>

                              <div className="min-w-0">
                                <div className="font-medium text-sm text-[#181818] truncate">
                                  {track.title}
                                </div>
                                <div className="font-mono text-[11px] text-[#6E6E6A] truncate">
                                  {track.role} • {track.bpm} BPM
                                </div>
                              </div>
                            </div>

                            {/* Interactive Web Audio Synth Waveform Preview Bar */}
                            <div className="flex items-center gap-3 self-end sm:self-center shrink-0">
                              <div className="flex items-end gap-[2px] h-7 w-40 sm:w-48 px-1.5 py-1 bg-[#181818]/[0.04] border border-[#181818]/10">
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
                                          ? "bg-[#181818]/45"
                                          : "bg-[#6E6E6A]/45"
                                      }`}
                                    />
                                  );
                                })}
                              </div>

                              <span className="font-mono text-xs text-[#6E6E6A] w-11 text-right">
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
          className="fixed inset-0 z-50 pt-16 bg-[#EAEAE8]/95 backdrop-blur-md overflow-y-auto"
        >
          <div className="max-w-6xl mx-auto px-5 md:px-10 py-8">
            <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-[#181818]/15">
              <div>
                <div className="font-mono text-xs uppercase tracking-[0.18em] text-[#E05A3A]">
                  ● COMPLETE DISC ARCHIVE &amp; ANIME WATCHLIST
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
                      className="p-5 border border-[#181818]/20 bg-[#EAEAE8] hover:border-[#E05A3A] cursor-pointer transition-all group"
                    >
                      <div className="flex items-center justify-between font-mono text-xs">
                        <span className="text-[#E05A3A] font-bold">
                          ● {cw.catalogCode} — ON-GOING
                        </span>
                        <span className="font-semibold text-[#181818]">
                          Episode {cw.currentEpisode} / {cw.totalEpisodes} ({pct}%)
                        </span>
                      </div>
                      <h3 className="mt-1.5 text-xl font-bold text-[#181818] group-hover:text-[#E05A3A] transition-colors">
                        {cw.titleEnglish}
                      </h3>
                      <p className="text-xs text-[#6E6E6A]">{cw.titleRomaji}</p>
                      <div className="mt-3 w-full h-1.5 bg-[#181818]/10 overflow-hidden">
                        <div className="h-full bg-[#E05A3A]" style={{ width: `${pct}%` }} />
                      </div>
                      <div className="mt-3 flex items-center justify-between font-mono text-[11px] text-[#6E6E6A]">
                        <span>♪ {cw.songTitle} — {cw.songArtist}</span>
                        <span className="text-[#181818] font-bold">★ {cw.rating.toFixed(1)} / 10</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Search, Genre Filter & Rating Sort Controls */}
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
                  setSortBy(e.target.value as "catalog" | "rating-desc" | "year-desc" | "title-asc")
                }
                className="px-3.5 py-2 bg-white/70 border border-[#181818]/25 font-mono text-xs text-[#181818]"
              >
                <option value="catalog">Sort: Catalog Order (ANM-001 → 026)</option>
                <option value="rating-desc">Sort: Highest Rated (10.0 → 7.0)</option>
                <option value="year-desc">Sort: Newest Release Year</option>
                <option value="title-asc">Sort: Title (A → Z)</option>
              </select>
            </div>

            {/* Complete 26 Watched Anime Archive Table */}
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
                    className="py-3.5 px-3 flex flex-wrap sm:flex-nowrap items-center justify-between gap-4 hover:bg-[#181818]/[0.04] cursor-pointer transition-colors group"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <span
                        className="w-3 h-7 shrink-0 border border-[#181818]/20"
                        style={{ backgroundColor: rel.spineColor }}
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
                      <span className="hidden sm:inline text-[#6E6E6A]">
                        {rel.category} • {rel.releaseYear}
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
          className="fixed inset-0 z-50 pt-16 bg-[#EAEAE8]/95 backdrop-blur-md overflow-y-auto"
        >
          <div className="max-w-6xl mx-auto px-5 md:px-10 py-8">
            <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-[#181818]/15">
              <div>
                <div className="font-mono text-xs uppercase tracking-[0.18em] text-[#E05A3A]">
                  ● ANIME SOUNDTRACK ARTISTS &amp; STUDIOS
                </div>
                <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-[#181818]">
                  Opening Themes, Composers &amp; Studios
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
                    className="p-4 border border-[#181818]/20 bg-[#EAEAE8] hover:border-[#E05A3A] cursor-pointer transition-all flex flex-col justify-between gap-3 group"
                  >
                    <div>
                      <div className="flex items-center justify-between font-mono text-[11px] text-[#6E6E6A]">
                        <span>{rel.catalogCode} • {rel.studio}</span>
                        <span className="text-[#E05A3A] font-bold">{rel.bpm} BPM</span>
                      </div>
                      <div className="mt-1.5 text-lg font-bold text-[#181818] group-hover:text-[#E05A3A] transition-colors">
                        {rel.songArtist}
                      </div>
                      <div className="font-mono text-xs text-[#181818]">
                        ♪ “{rel.songTitle}”
                      </div>
                    </div>

                    <div className="pt-2.5 border-t border-[#181818]/10 flex items-center justify-between font-mono text-[11px] text-[#6E6E6A]">
                      <span className="truncate">{rel.shortTitle} ({rel.releaseYear})</span>
                      <span className="text-[#181818] font-bold shrink-0">★ {rel.rating.toFixed(1)}</span>
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
