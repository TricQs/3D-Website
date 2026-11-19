import * as THREE from "three";
import { AnimeRelease } from "./animeArchiveData";

const spineTextureCache = new Map<string, THREE.CanvasTexture>();
const frontTextureCache = new Map<string, THREE.CanvasTexture>();
const backTextureCache = new Map<string, THREE.CanvasTexture>();
const discTextureCache = new Map<string, THREE.CanvasTexture>();

function configureTexture(tex: THREE.CanvasTexture): THREE.CanvasTexture {
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 8;
  tex.needsUpdate = true;
  return tex;
}

function drawPaperGrain(ctx: CanvasRenderingContext2D, w: number, h: number, alpha = 0.03) {
  ctx.save();
  ctx.fillStyle = `rgba(24, 24, 24, ${alpha})`;
  for (let i = 0; i < 850; i++) {
    ctx.fillRect((i * 7919) % w, (i * 104729) % h, 1.5, 1.5);
  }
  ctx.restore();
}

function drawCoverImage(
  ctx: CanvasRenderingContext2D,
  img: HTMLImageElement,
  dx: number,
  dy: number,
  dw: number,
  dh: number,
  focusY = 0.25
) {
  const iw = img.naturalWidth || img.width;
  const ih = img.naturalHeight || img.height;
  if (!iw || !ih) return;

  const scale = Math.max(dw / iw, dh / ih);
  const sw = dw / scale;
  const sh = dh / scale;
  const sx = (iw - sw) / 2;
  const sy = Math.max(0, Math.min(ih - sh, (ih - sh) * focusY));
  ctx.drawImage(img, sx, sy, sw, sh, dx, dy, dw, dh);
}

/**
 * Collector-Grade Vertical 3D Spine Texture (256 x 1024)
 * Features crisp catalog foil box, release year, miniature official anime portrait inset,
 * vertical bold neo-grotesque title, artist, and personal score badge.
 */
export function getSpineTexture(
  release: AnimeRelease,
  externalPosterImg?: HTMLImageElement | null
): THREE.CanvasTexture {
  const cacheKey = `${release.id}_${externalPosterImg ? "sp_img_v3" : "sp_proc_v3"}`;
  const cached = spineTextureCache.get(cacheKey);
  if (cached) return cached;

  const canvas = document.createElement("canvas");
  canvas.width = 256;
  canvas.height = 1024;
  const ctx = canvas.getContext("2d")!;

  // Base archival cloth color
  ctx.fillStyle = release.spineColor;
  ctx.fillRect(0, 0, 256, 1024);
  drawPaperGrain(ctx, 256, 1024, 0.045);

  // Sculpted 3D physical bookbind shading along spine edges
  const grad = ctx.createLinearGradient(0, 0, 256, 0);
  grad.addColorStop(0, "rgba(0,0,0,0.30)");
  grad.addColorStop(0.09, "rgba(255,255,255,0.16)");
  grad.addColorStop(0.22, "rgba(255,255,255,0.03)");
  grad.addColorStop(0.84, "rgba(0,0,0,0.04)");
  grad.addColorStop(0.94, "rgba(255,255,255,0.08)");
  grad.addColorStop(1, "rgba(0,0,0,0.34)");
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 256, 1024);

  // Subtle top & bottom foil accent bars
  ctx.fillStyle = release.rating >= 9.0 ? "#E05A3A" : release.spineTextColor;
  ctx.globalAlpha = release.rating >= 9.0 ? 0.95 : 0.28;
  ctx.fillRect(0, 0, 256, 14);
  ctx.fillRect(0, 1010, 256, 14);
  ctx.globalAlpha = 1;

  // Top Catalog Code Box
  ctx.fillStyle = release.spineTextColor;
  ctx.strokeStyle = release.spineTextColor;
  ctx.lineWidth = 2;
  ctx.strokeRect(30, 38, 196, 52);
  ctx.font = "700 22px 'IBM Plex Mono', monospace";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(release.catalogCode, 128, 65);

  // Release Year Stamp
  ctx.font = "700 19px 'IBM Plex Mono', monospace";
  ctx.globalAlpha = 0.85;
  ctx.fillText(String(release.releaseYear), 128, 118);
  ctx.globalAlpha = 1;

  // Miniature Official Anime Artwork Medallion Inset on Upper Spine
  if (externalPosterImg) {
    ctx.save();
    ctx.beginPath();
    ctx.rect(34, 146, 188, 134);
    ctx.clip();
    drawCoverImage(ctx, externalPosterImg, 34, 146, 188, 134, 0.22);
    ctx.restore();
    ctx.strokeStyle = release.spineTextColor;
    ctx.globalAlpha = 0.45;
    ctx.lineWidth = 2;
    ctx.strokeRect(34, 146, 188, 134);
    ctx.globalAlpha = 1;
  } else {
    ctx.fillStyle = "#E05A3A";
    ctx.beginPath();
    ctx.arc(128, 178, 9, 0, Math.PI * 2);
    ctx.fill();
  }

  // Vertical Spine Title & Artist (Centered cleanly below artwork inset)
  ctx.save();
  ctx.translate(128, 590);
  ctx.rotate(Math.PI / 2);

  ctx.fillStyle = release.spineTextColor;
  ctx.font = "800 32px 'Inter', 'Helvetica Neue', sans-serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "bottom";
  ctx.fillText(release.shortTitle.toUpperCase(), 0, -4);

  ctx.globalAlpha = 0.78;
  ctx.font = "500 18px 'IBM Plex Mono', monospace";
  ctx.textBaseline = "top";
  ctx.fillText(`${release.songArtist.toUpperCase()}  •  ${release.studio.toUpperCase()}`, 0, 8);
  ctx.restore();

  // Bottom Personal Rating Seal on Spine
  ctx.fillStyle = release.spineTextColor;
  ctx.globalAlpha = 0.22;
  ctx.fillRect(32, 888, 192, 2);
  ctx.globalAlpha = 1;

  if (release.rating >= 10) {
    ctx.fillStyle = "#E05A3A";
    ctx.fillRect(36, 912, 184, 54);
    ctx.fillStyle = "#FFFFFF";
    ctx.font = "700 25px 'IBM Plex Mono', monospace";
    ctx.textAlign = "center";
    ctx.fillText("👑 10.0", 128, 941);
  } else {
    ctx.fillStyle = release.spineTextColor;
    ctx.font = "700 26px 'IBM Plex Mono', monospace";
    ctx.textAlign = "center";
    ctx.fillText(`★ ${release.rating.toFixed(1)}`, 128, 942);
  }

  const tex = configureTexture(new THREE.CanvasTexture(canvas));
  spineTextureCache.set(cacheKey, tex);
  return tex;
}

/**
 * Luxury Full-Bleed Official Anime Collector's Digipak Front Cover (1024 x 1024)
 */
export function getFrontCoverTexture(
  release: AnimeRelease,
  externalPosterImg?: HTMLImageElement | null
): THREE.CanvasTexture {
  const cacheKey = `${release.id}_${externalPosterImg ? "front_art_v3" : "front_load_v3"}`;
  const cached = frontTextureCache.get(cacheKey);
  if (cached) return cached;

  const canvas = document.createElement("canvas");
  canvas.width = 1024;
  canvas.height = 1024;
  const ctx = canvas.getContext("2d")!;

  ctx.fillStyle = "#161615";
  ctx.fillRect(0, 0, 1024, 1024);

  if (externalPosterImg) {
    drawCoverImage(ctx, externalPosterImg, 0, 0, 1024, 1024, 0.22);
  } else {
    // Rich dark studio gradient placeholder while official image streams in
    const bgGrad = ctx.createLinearGradient(0, 0, 1024, 1024);
    bgGrad.addColorStop(0, release.spineColor);
    bgGrad.addColorStop(1, "#141413");
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, 1024, 1024);
  }

  // Editorial top & bottom scrims for razor-sharp typography over any anime art
  const topGrad = ctx.createLinearGradient(0, 0, 0, 210);
  topGrad.addColorStop(0, "rgba(16, 16, 15, 0.84)");
  topGrad.addColorStop(1, "rgba(16, 16, 15, 0.0)");
  ctx.fillStyle = topGrad;
  ctx.fillRect(0, 0, 1024, 210);

  const botGrad = ctx.createLinearGradient(0, 610, 0, 1024);
  botGrad.addColorStop(0, "rgba(14, 14, 13, 0.0)");
  botGrad.addColorStop(0.46, "rgba(14, 14, 13, 0.78)");
  botGrad.addColorStop(1, "rgba(14, 14, 13, 0.96)");
  ctx.fillStyle = botGrad;
  ctx.fillRect(0, 610, 1024, 414);

  // Subtle Inner Margin Framing
  ctx.strokeStyle = "rgba(255, 255, 255, 0.30)";
  ctx.lineWidth = 2.5;
  ctx.strokeRect(28, 28, 968, 968);

  // Top-Left Metadata
  ctx.fillStyle = "#FAF9F6";
  ctx.font = "700 22px 'IBM Plex Mono', monospace";
  ctx.textAlign = "left";
  ctx.fillText(`DISC ARCHIVE  —  ${release.catalogCode}`, 56, 76);

  ctx.fillStyle = "rgba(250, 249, 246, 0.80)";
  ctx.font = "500 18px 'IBM Plex Mono', monospace";
  ctx.fillText(
    `${release.releaseYear}  •  ${release.category.toUpperCase()}  •  ${release.studio.toUpperCase()}`,
    56,
    108
  );

  // Top-Right Score Stamp
  const scoreBadgeText = release.isOngoing
    ? `EP ${release.currentEpisode}/${release.totalEpisodes} • ★ ${release.rating.toFixed(1)}`
    : release.rating >= 10
    ? "👑 10.0 / 10"
    : `★ ${release.rating.toFixed(1)} / 10`;

  ctx.fillStyle = "#E05A3A";
  ctx.fillRect(710, 48, 258, 54);
  ctx.fillStyle = "#FFFFFF";
  ctx.font = "700 23px 'IBM Plex Mono', monospace";
  ctx.textAlign = "center";
  ctx.fillText(scoreBadgeText, 839, 83);
  ctx.textAlign = "left";

  // Bottom Title Block
  ctx.fillStyle = "#E05A3A";
  ctx.beginPath();
  ctx.arc(66, 804, 8, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = "rgba(250, 249, 246, 0.92)";
  ctx.font = "600 19px 'IBM Plex Mono', monospace";
  ctx.fillText(
    `${release.genres.join(" / ").toUpperCase()}  •  ${release.bpm} BPM  •  ${release.ageRating}`,
    88,
    811
  );

  ctx.fillStyle = "#FFFFFF";
  ctx.font = "800 54px 'Inter', 'Helvetica Neue', sans-serif";
  const displayTitle = release.titleEnglish.length > 26 ? release.shortTitle : release.titleEnglish;
  ctx.fillText(displayTitle, 56, 882);

  ctx.fillStyle = "rgba(234, 234, 232, 0.84)";
  ctx.font = "500 22px 'Inter', 'Helvetica Neue', sans-serif";
  ctx.fillText(release.titleRomaji, 56, 922);

  ctx.fillStyle = "#F5A894";
  ctx.font = "600 20px 'IBM Plex Mono', monospace";
  ctx.fillText(`♪ ${release.songTitle.toUpperCase()} — ${release.songArtist.toUpperCase()}`, 56, 966);

  const tex = configureTexture(new THREE.CanvasTexture(canvas));
  frontTextureCache.set(cacheKey, tex);
  return tex;
}

/**
 * Upgraded Collector's Edition Back / Side Face Texture (1024 x 1024)
 * Visible along the angled side face of sleeves in the left & right stacks!
 * Features darkened atmospheric anime key visual, Japanese Obi accent strip,
 * crisp Swiss tracklist, studio seal, and archival barcode.
 */
export function getBackCoverTexture(
  release: AnimeRelease,
  externalPosterImg?: HTMLImageElement | null
): THREE.CanvasTexture {
  const cacheKey = `${release.id}_${externalPosterImg ? "back_art_v3" : "back_dark_v3"}`;
  const cached = backTextureCache.get(cacheKey);
  if (cached) return cached;

  const canvas = document.createElement("canvas");
  canvas.width = 1024;
  canvas.height = 1024;
  const ctx = canvas.getContext("2d")!;

  // Rich matte obsidian/charcoal collector packaging base
  ctx.fillStyle = "#181817";
  ctx.fillRect(0, 0, 1024, 1024);

  if (externalPosterImg) {
    ctx.save();
    ctx.globalAlpha = 0.28;
    drawCoverImage(ctx, externalPosterImg, 0, 0, 1024, 1024, 0.25);
    ctx.restore();
  }

  // Deep atmospheric vignette over artwork
  const vign = ctx.createLinearGradient(0, 0, 1024, 1024);
  vign.addColorStop(0, "rgba(20, 20, 19, 0.78)");
  vign.addColorStop(1, "rgba(14, 14, 13, 0.94)");
  ctx.fillStyle = vign;
  ctx.fillRect(0, 0, 1024, 1024);

  // Left Japanese Collector Obi Strip Accent Band
  ctx.fillStyle = release.spineColor;
  ctx.fillRect(0, 0, 88, 1024);
  ctx.fillStyle = "#E05A3A";
  ctx.fillRect(88, 0, 6, 1024);

  // Vertical Japanese/Swiss Obi Code
  ctx.save();
  ctx.translate(44, 512);
  ctx.rotate(-Math.PI / 2);
  ctx.fillStyle = release.spineTextColor;
  ctx.font = "700 22px 'IBM Plex Mono', monospace";
  ctx.textAlign = "center";
  ctx.fillText(
    `${release.catalogCode}  •  LIMITED ANIME RATING ARCHIVE EDITION  •  ${release.releaseYear}`,
    0,
    7
  );
  ctx.restore();

  // Inner Hairline Frame
  ctx.strokeStyle = "rgba(255, 255, 255, 0.22)";
  ctx.lineWidth = 2;
  ctx.strokeRect(126, 48, 850, 928);

  // Header
  ctx.fillStyle = "#FAF9F6";
  ctx.textAlign = "left";
  ctx.font = "800 42px 'Inter', sans-serif";
  ctx.fillText(release.shortTitle.toUpperCase(), 164, 128);

  ctx.fillStyle = "#E05A3A";
  ctx.font = "700 22px 'IBM Plex Mono', monospace";
  ctx.fillText(
    `${release.catalogCode}  //  ${release.studio.toUpperCase()}  •  ${release.releaseYear}  •  ★ ${release.rating.toFixed(1)}`,
    164,
    172
  );

  ctx.fillStyle = "rgba(255,255,255,0.22)";
  ctx.fillRect(164, 202, 774, 2);

  // Tracklist Listing
  release.tracks.forEach((tr, i) => {
    const ty = 274 + i * 102;
    ctx.fillStyle = "#E05A3A";
    ctx.font = "700 22px 'IBM Plex Mono', monospace";
    ctx.fillText(tr.number, 164, ty);

    ctx.fillStyle = "#FAF9F6";
    ctx.font = "600 24px 'Inter', sans-serif";
    ctx.fillText(tr.title.slice(0, 38), 216, ty);

    ctx.fillStyle = "rgba(234,234,232,0.62)";
    ctx.font = "500 18px 'IBM Plex Mono', monospace";
    ctx.fillText(`${tr.role.slice(0, 42)}  •  ${tr.bpm} BPM  •  ${tr.duration}`, 216, ty + 32);
  });

  // Bottom Archival Barcode & Spec Footer
  ctx.fillStyle = "rgba(255,255,255,0.22)";
  ctx.fillRect(164, 790, 774, 2);

  ctx.fillStyle = "#FAF9F6";
  ctx.font = "700 26px 'IBM Plex Mono', monospace";
  ctx.fillText(`VERDICT: ★ ${release.rating.toFixed(1)} / 10`, 164, 854);
  ctx.fillStyle = "rgba(234,234,232,0.65)";
  ctx.font = "500 18px 'IBM Plex Mono', monospace";
  ctx.fillText(`${release.genres.join(" / ").toUpperCase()}  •  ${release.ageRating}`, 164, 892);
  ctx.fillText(`STEREO 33⅓ RPM  •  DISC ARCHIVE PRESSING`, 164, 926);

  // Crisp Precision Barcode on Bottom-Right
  ctx.fillStyle = "#FAF9F6";
  ctx.fillRect(736, 822, 198, 106);
  ctx.fillStyle = "#141413";
  let bx = 750;
  for (let b = 0; b < 34; b++) {
    const bw = ((b * 7 + release.releaseYear) % 3) + 1.5;
    if (b % 2 === 0) ctx.fillRect(bx, 834, bw, 68);
    bx += bw + 2.2;
    if (bx > 920) break;
  }
  ctx.font = "700 13px 'IBM Plex Mono', monospace";
  ctx.textAlign = "center";
  ctx.fillText(`4 988001 ${release.releaseYear}0`, 835, 918);

  const tex = configureTexture(new THREE.CanvasTexture(canvas));
  backTextureCache.set(cacheKey, tex);
  return tex;
}

/**
 * Generates the Floating Black Vinyl / CD Disc Base Texture (1024 x 1024)
 * Keeps rich black micro-grooves + glossy anisotropic sheen + circular anime center label.
 */
export function getVinylDiscTexture(
  release: AnimeRelease,
  externalPosterImg?: HTMLImageElement | null
): THREE.CanvasTexture {
  const cacheKey = `${release.id}_${externalPosterImg ? "vinyl_img_v3" : "vinyl_proc_v3"}`;
  const cached = discTextureCache.get(cacheKey);
  if (cached) return cached;

  const canvas = document.createElement("canvas");
  canvas.width = 1024;
  canvas.height = 1024;
  const ctx = canvas.getContext("2d")!;

  const cx = 512;
  const cy = 512;

  // Deep obsidian black vinyl pressing (NEVER removed; OP video layers cleanly on top at 20% opacity!)
  ctx.fillStyle = "#111110";
  ctx.beginPath();
  ctx.arc(cx, cy, 508, 0, Math.PI * 2);
  ctx.fill();

  // Glossy diagonal anisotropic groove reflection
  ctx.save();
  ctx.translate(cx, cy);
  const grad = ctx.createConicGradient(0.45, 0, 0);
  grad.addColorStop(0, "rgba(255,255,255,0)");
  grad.addColorStop(0.11, "rgba(255,255,255,0.18)");
  grad.addColorStop(0.22, "rgba(255,255,255,0)");
  grad.addColorStop(0.5, "rgba(255,255,255,0)");
  grad.addColorStop(0.61, "rgba(255,255,255,0.18)");
  grad.addColorStop(0.72, "rgba(255,255,255,0)");
  grad.addColorStop(1, "rgba(255,255,255,0)");
  ctx.fillStyle = grad;
  ctx.beginPath();
  ctx.arc(0, 0, 498, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();

  // Concentric vinyl micro-grooves
  for (let r = 210; r < 494; r += 3.4) {
    ctx.strokeStyle = r % 34 < 4 ? "rgba(255,255,255,0.16)" : "rgba(255,255,255,0.048)";
    ctx.lineWidth = 1.2;
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.stroke();
  }

  // Color-matched & artwork-embedded center label (r = 198)
  ctx.save();
  ctx.beginPath();
  ctx.arc(cx, cy, 198, 0, Math.PI * 2);
  ctx.clip();

  if (externalPosterImg) {
    drawCoverImage(ctx, externalPosterImg, cx - 198, cy - 198, 396, 396, 0.24);
    ctx.fillStyle = "rgba(16, 16, 15, 0.44)";
    ctx.fillRect(cx - 198, cy - 198, 396, 396);
  } else {
    ctx.fillStyle = release.spineColor;
    ctx.fillRect(cx - 198, cy - 198, 396, 396);
    ctx.fillStyle = "#E05A3A";
    ctx.fillRect(cx - 198, cy - 198, 396, 198);
  }
  ctx.restore();

  ctx.strokeStyle = "#E05A3A";
  ctx.lineWidth = 5;
  ctx.beginPath();
  ctx.arc(cx, cy, 194, 0, Math.PI * 2);
  ctx.stroke();

  ctx.fillStyle = "#FFFFFF";
  ctx.font = "700 24px 'IBM Plex Mono', monospace";
  ctx.textAlign = "center";
  ctx.fillText(release.catalogCode, cx, cy - 116);

  ctx.font = "700 20px 'IBM Plex Mono', monospace";
  ctx.fillText(`★ ${release.rating.toFixed(1)} / 10`, cx, cy - 86);

  ctx.font = "800 22px 'Inter', sans-serif";
  ctx.fillText(release.shortTitle.slice(0, 15), cx, cy + 108);

  ctx.font = "600 16px 'IBM Plex Mono', monospace";
  ctx.fillText(`${release.releaseYear} • ${release.bpm} BPM`, cx, cy + 138);

  const tex = configureTexture(new THREE.CanvasTexture(canvas));
  discTextureCache.set(cacheKey, tex);
  return tex;
}
