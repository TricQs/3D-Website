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

function drawPaperGrain(ctx: CanvasRenderingContext2D, w: number, h: number, alpha = 0.028) {
  ctx.save();
  ctx.fillStyle = `rgba(24, 24, 24, ${alpha})`;
  for (let i = 0; i < 850; i++) {
    const x = (i * 7919) % w;
    const y = (i * 104729) % h;
    ctx.fillRect(x, y, 1.5, 1.5);
  }
  ctx.restore();
}

/**
 * Draws an image with CSS `object-fit: cover` behavior and slight top focus (0.28)
 * so anime character faces are framed cleanly without cropping heads.
 */
function drawCoverImage(
  ctx: CanvasRenderingContext2D,
  img: HTMLImageElement,
  dx: number,
  dy: number,
  dw: number,
  dh: number,
  focusY = 0.28
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
 * Draws the 10 distinct Swiss-editorial procedural vector illustrations
 */
export function drawProceduralIllustration(
  ctx: CanvasRenderingContext2D,
  release: AnimeRelease,
  x: number,
  y: number,
  w: number,
  h: number
) {
  ctx.save();
  ctx.beginPath();
  ctx.rect(x, y, w, h);
  ctx.clip();

  const ink = release.coverInkColor;
  const accent = release.accentColor;
  const bg = release.coverBgColor;

  ctx.fillStyle = bg;
  ctx.fillRect(x, y, w, h);

  ctx.strokeStyle = ink;
  ctx.globalAlpha = 0.1;
  ctx.lineWidth = 1;
  const step = 46;
  for (let gx = x; gx <= x + w; gx += step) {
    ctx.beginPath();
    ctx.moveTo(gx, y);
    ctx.lineTo(gx, y + h);
    ctx.stroke();
  }
  for (let gy = y; gy <= y + h; gy += step) {
    ctx.beginPath();
    ctx.moveTo(x, gy);
    ctx.lineTo(x + w, gy);
    ctx.stroke();
  }
  ctx.globalAlpha = 1;

  const cx = x + w / 2;
  const cy = y + h / 2;

  switch (release.illustrationType) {
    case "vending-machine": {
      ctx.fillStyle = accent;
      ctx.globalAlpha = 0.16;
      ctx.beginPath();
      ctx.arc(cx + 30, cy - 10, 210, 0, Math.PI * 2);
      ctx.fill();
      ctx.globalAlpha = 1;

      const vmW = 250;
      const vmH = 370;
      const vmX = cx - vmW / 2;
      const vmY = cy - vmH / 2 + 8;

      ctx.fillStyle = ink;
      ctx.beginPath();
      ctx.moveTo(vmX + vmW, vmY);
      ctx.lineTo(vmX + vmW + 28, vmY - 18);
      ctx.lineTo(vmX + vmW + 28, vmY + vmH - 18);
      ctx.lineTo(vmX + vmW, vmY + vmH);
      ctx.closePath();
      ctx.fill();

      ctx.fillStyle = accent;
      ctx.beginPath();
      ctx.moveTo(vmX, vmY);
      ctx.lineTo(vmX + 28, vmY - 18);
      ctx.lineTo(vmX + vmW + 28, vmY - 18);
      ctx.lineTo(vmX + vmW, vmY);
      ctx.closePath();
      ctx.fill();

      ctx.fillStyle = "#FAF8F5";
      ctx.strokeStyle = ink;
      ctx.lineWidth = 3.5;
      ctx.fillRect(vmX, vmY, vmW, vmH);
      ctx.strokeRect(vmX, vmY, vmW, vmH);

      ctx.fillStyle = bg;
      ctx.fillRect(vmX + 20, vmY + 22, vmW - 40, 175);
      ctx.strokeRect(vmX + 20, vmY + 22, vmW - 40, 175);

      for (let row = 0; row < 3; row++) {
        const shelfY = vmY + 72 + row * 56;
        ctx.strokeStyle = ink;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(vmX + 22, shelfY);
        ctx.lineTo(vmX + vmW - 22, shelfY);
        ctx.stroke();

        for (let col = 0; col < 5; col++) {
          const canX = vmX + 34 + col * 38;
          const canY = shelfY - 38;
          ctx.fillStyle = (row + col) % 2 === 0 ? accent : ink;
          ctx.fillRect(canX, canY, 22, 34);
          ctx.fillStyle = "#FFFFFF";
          ctx.fillRect(canX + 3, canY + 8, 16, 10);
        }
      }

      ctx.fillStyle = accent;
      ctx.fillRect(vmX + 20, vmY + 210, vmW - 40, 34);
      ctx.fillStyle = "#FFFFFF";
      ctx.font = "700 14px 'IBM Plex Mono', monospace";
      ctx.fillText("COLD / HOT  •  自動販売機", vmX + 32, vmY + 232);

      ctx.fillStyle = ink;
      ctx.fillRect(vmX + 20, vmY + 285, vmW - 95, 58);
      ctx.strokeStyle = ink;
      ctx.strokeRect(vmX + vmW - 62, vmY + 258, 42, 85);
      ctx.fillStyle = accent;
      ctx.beginPath();
      ctx.arc(vmX + vmW - 41, vmY + 280, 9, 0, Math.PI * 2);
      ctx.fill();
      break;
    }

    case "torii-shrine": {
      ctx.fillStyle = accent;
      ctx.beginPath();
      ctx.arc(cx, cy - 18, 155, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = ink;
      ctx.fillRect(cx - 175, cy - 120, 350, 22);
      ctx.fillRect(cx - 145, cy - 72, 290, 16);
      ctx.fillRect(cx - 105, cy - 100, 24, 245);
      ctx.fillRect(cx + 81, cy - 100, 24, 245);
      ctx.fillRect(cx - 18, cy - 98, 36, 38);
      break;
    }

    case "comet-sky": {
      ctx.strokeStyle = ink;
      for (let r = 45; r <= 220; r += 35) {
        ctx.lineWidth = r === 150 ? 2.5 : 1.2;
        ctx.beginPath();
        ctx.arc(cx, cy, r, 0, Math.PI * 2);
        ctx.stroke();
      }
      ctx.strokeStyle = accent;
      ctx.lineWidth = 5;
      ctx.beginPath();
      ctx.moveTo(x + 60, y + h - 70);
      ctx.quadraticCurveTo(cx - 40, cy - 120, x + w - 65, y + 75);
      ctx.stroke();
      ctx.fillStyle = accent;
      ctx.beginPath();
      ctx.arc(cx + 58, cy - 52, 16, 0, Math.PI * 2);
      ctx.fill();
      break;
    }

    case "arcade-cabinet": {
      const boxW = 320;
      const boxH = 320;
      const bx = cx - boxW / 2;
      const by = cy - boxH / 2;
      ctx.strokeStyle = ink;
      ctx.lineWidth = 4;
      ctx.strokeRect(bx, by, boxW, boxH);
      ctx.fillStyle = accent;
      ctx.fillRect(bx, by, boxW, 38);
      ctx.beginPath();
      ctx.moveTo(cx, by + 38);
      ctx.lineTo(cx, cy - 18);
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(cx, cy + 16, 44, Math.PI * 0.85, Math.PI * 0.15, true);
      ctx.stroke();
      ctx.fillStyle = accent;
      ctx.beginPath();
      ctx.arc(cx, cy + 88, 36, 0, Math.PI * 2);
      ctx.fill();
      break;
    }

    case "magic-circle": {
      ctx.strokeStyle = ink;
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.arc(cx, cy, 195, 0, Math.PI * 2);
      ctx.stroke();
      for (let t = 0; t < 2; t++) {
        ctx.strokeStyle = t === 0 ? ink : accent;
        ctx.lineWidth = 2.8;
        ctx.beginPath();
        for (let i = 0; i < 3; i++) {
          const angle = (i * 120 + t * 60 - 90) * (Math.PI / 180);
          const px = cx + Math.cos(angle) * 146;
          const py = cy + Math.sin(angle) * 146;
          if (i === 0) ctx.moveTo(px, py);
          else ctx.lineTo(px, py);
        }
        ctx.closePath();
        ctx.stroke();
      }
      ctx.fillStyle = accent;
      ctx.beginPath();
      ctx.arc(cx, cy, 26, 0, Math.PI * 2);
      ctx.fill();
      break;
    }

    case "sakura-crossing": {
      ctx.strokeStyle = ink;
      ctx.lineWidth = 6;
      ctx.beginPath();
      ctx.moveTo(cx - 90, y + 60);
      ctx.lineTo(cx - 90, y + h - 40);
      ctx.stroke();
      ctx.strokeStyle = accent;
      ctx.lineWidth = 10;
      ctx.beginPath();
      ctx.moveTo(cx - 130, cy + 45);
      ctx.lineTo(cx + 195, cy - 85);
      ctx.stroke();
      ctx.fillStyle = accent;
      const petals = [
        [cx + 40, cy - 110, 16],
        [cx + 120, cy - 30, 22],
        [cx + 15, cy + 45, 18],
        [cx + 145, cy + 95, 14]
      ];
      for (const [px, py, pr] of petals) {
        ctx.beginPath();
        ctx.ellipse(px, py, pr, pr * 0.62, Math.PI / 5, 0, Math.PI * 2);
        ctx.fill();
      }
      break;
    }

    case "cassette-synth": {
      const deckW = 460;
      const deckH = 270;
      const dx = cx - deckW / 2;
      const dy = cy - deckH / 2;
      ctx.fillStyle = ink;
      ctx.fillRect(dx, dy, deckW, deckH);
      ctx.fillStyle = accent;
      ctx.fillRect(dx + 26, dy + 26, deckW - 52, 68);
      for (const offset of [-115, 115]) {
        ctx.fillStyle = bg;
        ctx.beginPath();
        ctx.arc(cx + offset, cy + 32, 58, 0, Math.PI * 2);
        ctx.fill();
      }
      break;
    }

    case "ocean-tiger": {
      ctx.fillStyle = accent;
      ctx.beginPath();
      ctx.arc(cx, cy - 30, 125, 0, Math.PI * 2);
      ctx.fill();
      for (let row = 0; row < 6; row++) {
        ctx.fillStyle = row % 2 === 0 ? ink : bg;
        ctx.fillRect(x + 60, cy + 15 + row * 32, w - 120, 18);
      }
      break;
    }

    case "school-desk": {
      ctx.fillStyle = accent;
      ctx.globalAlpha = 0.22;
      ctx.beginPath();
      ctx.moveTo(cx - 150, cy - 150);
      ctx.lineTo(cx + 90, cy - 150);
      ctx.lineTo(cx + 210, cy + 170);
      ctx.lineTo(cx - 30, cy + 170);
      ctx.closePath();
      ctx.fill();
      ctx.globalAlpha = 1;
      ctx.strokeStyle = ink;
      ctx.lineWidth = 4;
      ctx.strokeRect(cx - 150, cy - 150, 240, 240);
      ctx.fillStyle = accent;
      ctx.beginPath();
      ctx.moveTo(cx + 145, cy - 65);
      ctx.lineTo(cx - 15, cy - 10);
      ctx.lineTo(cx + 35, cy + 28);
      ctx.closePath();
      ctx.fill();
      break;
    }

    case "polar-wave":
    default: {
      ctx.fillStyle = ink;
      ctx.beginPath();
      ctx.arc(cx - 68, cy, 130, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = accent;
      ctx.beginPath();
      ctx.arc(cx + 68, cy, 130, 0, Math.PI * 2);
      ctx.fill();
      break;
    }
  }

  ctx.strokeStyle = ink;
  ctx.lineWidth = 2.5;
  ctx.strokeRect(x, y, w, h);
  ctx.restore();
}

/**
 * Generates the vertical 3D Spine Texture (256 x 1024)
 */
export function getSpineTexture(release: AnimeRelease): THREE.CanvasTexture {
  const cached = spineTextureCache.get(release.id);
  if (cached) return cached;

  const canvas = document.createElement("canvas");
  canvas.width = 256;
  canvas.height = 1024;
  const ctx = canvas.getContext("2d")!;

  ctx.fillStyle = release.spineColor;
  ctx.fillRect(0, 0, 256, 1024);
  drawPaperGrain(ctx, 256, 1024, 0.04);

  const grad = ctx.createLinearGradient(0, 0, 256, 0);
  grad.addColorStop(0, "rgba(0,0,0,0.24)");
  grad.addColorStop(0.08, "rgba(255,255,255,0.12)");
  grad.addColorStop(0.92, "rgba(255,255,255,0.06)");
  grad.addColorStop(1, "rgba(0,0,0,0.28)");
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 256, 1024);

  ctx.fillStyle = release.spineTextColor;
  ctx.strokeStyle = release.spineTextColor;
  ctx.lineWidth = 2;
  ctx.strokeRect(28, 36, 200, 56);
  ctx.font = "700 22px 'IBM Plex Mono', monospace";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(release.catalogCode, 128, 64);

  // Release Year Stamp below catalog code on spine
  ctx.font = "700 20px 'IBM Plex Mono', monospace";
  ctx.globalAlpha = 0.85;
  ctx.fillText(String(release.releaseYear), 128, 122);
  ctx.globalAlpha = 1;

  if (release.rating >= 9.0 || release.isOngoing) {
    ctx.fillStyle = "#E05A3A";
    ctx.beginPath();
    ctx.arc(128, 160, 9, 0, Math.PI * 2);
    ctx.fill();
  }

  ctx.save();
  ctx.translate(128, 535);
  ctx.rotate(Math.PI / 2);

  ctx.fillStyle = release.spineTextColor;
  ctx.font = "700 34px 'Inter', 'Helvetica Neue', sans-serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "bottom";
  ctx.fillText(release.shortTitle.toUpperCase(), 0, -4);

  ctx.globalAlpha = 0.78;
  ctx.font = "500 20px 'IBM Plex Mono', monospace";
  ctx.textBaseline = "top";
  ctx.fillText(`${release.songArtist.toUpperCase()}  •  ${release.releaseYear}`, 0, 8);
  ctx.restore();

  ctx.fillStyle = release.spineTextColor;
  ctx.globalAlpha = 0.2;
  ctx.fillRect(28, 895, 200, 2);
  ctx.globalAlpha = 1;

  ctx.font = "700 26px 'IBM Plex Mono', monospace";
  ctx.textAlign = "center";
  ctx.fillText(release.rating >= 10 ? "★ 10.0" : `★ ${release.rating.toFixed(1)}`, 128, 945);

  const tex = configureTexture(new THREE.CanvasTexture(canvas));
  spineTextureCache.set(release.id, tex);
  return tex;
}

/**
 * Generates the Square Front Cover Texture (1024 x 1024)
 * Displays FULL-BLEED OFFICIAL ANIME ARTWORK framed in luxury Swiss archival typography by default,
 * with instant procedural vector fallback while loading or when toggled to Swiss Minimal mode.
 */
export function getFrontCoverTexture(
  release: AnimeRelease,
  externalPosterImg?: HTMLImageElement | null
): THREE.CanvasTexture {
  const cacheKey = `${release.id}_${externalPosterImg ? "animeArt_v2" : "swissProc_v2"}`;
  const cached = frontTextureCache.get(cacheKey);
  if (cached) return cached;

  const canvas = document.createElement("canvas");
  canvas.width = 1024;
  canvas.height = 1024;
  const ctx = canvas.getContext("2d")!;

  const bg = release.coverBgColor;
  const ink = release.coverInkColor;
  const accent = release.accentColor;

  if (externalPosterImg) {
    // LUXURY FULL-BLEED ANIME COLLECTOR'S EDITION SLEEVE
    ctx.fillStyle = "#161615";
    ctx.fillRect(0, 0, 1024, 1024);

    // Draw official anime wallpaper/key visual full-bleed across the entire sleeve
    drawCoverImage(ctx, externalPosterImg, 0, 0, 1024, 1024, 0.24);

    // Subtle top & bottom editorial gradient scrims for crisp Swiss legibility
    const topGrad = ctx.createLinearGradient(0, 0, 0, 200);
    topGrad.addColorStop(0, "rgba(18, 18, 17, 0.82)");
    topGrad.addColorStop(1, "rgba(18, 18, 17, 0.0)");
    ctx.fillStyle = topGrad;
    ctx.fillRect(0, 0, 1024, 200);

    const botGrad = ctx.createLinearGradient(0, 620, 0, 1024);
    botGrad.addColorStop(0, "rgba(16, 16, 15, 0.0)");
    botGrad.addColorStop(0.45, "rgba(16, 16, 15, 0.78)");
    botGrad.addColorStop(1, "rgba(16, 16, 15, 0.96)");
    ctx.fillStyle = botGrad;
    ctx.fillRect(0, 620, 1024, 404);

    // Swiss Hairline Inner Margin Frame
    ctx.strokeStyle = "rgba(255, 255, 255, 0.32)";
    ctx.lineWidth = 2.5;
    ctx.strokeRect(28, 28, 968, 968);

    // Top-Left Catalog & Release Year Badge
    ctx.fillStyle = "#FAF9F6";
    ctx.font = "700 22px 'IBM Plex Mono', monospace";
    ctx.textAlign = "left";
    ctx.fillText(`DISC ARCHIVE  —  ${release.catalogCode}`, 56, 76);

    ctx.fillStyle = "rgba(250, 249, 246, 0.78)";
    ctx.font = "500 18px 'IBM Plex Mono', monospace";
    ctx.fillText(`${release.releaseYear}  •  ${release.category.toUpperCase()}  •  ${release.studio.toUpperCase()}`, 56, 108);

    // Top-Right Personal Score Badge (High-Contrast Coral)
    const scoreBadgeText = release.isOngoing
      ? `EP ${release.currentEpisode}/${release.totalEpisodes} • ★ ${release.rating.toFixed(1)}`
      : release.rating >= 10
      ? "👑 10.0 / 10"
      : `★ ${release.rating.toFixed(1)} / 10`;

    ctx.fillStyle = "#E05A3A";
    ctx.fillRect(712, 48, 256, 54);
    ctx.fillStyle = "#FFFFFF";
    ctx.font = "700 23px 'IBM Plex Mono', monospace";
    ctx.textAlign = "center";
    ctx.fillText(scoreBadgeText, 840, 83);
    ctx.textAlign = "left";

    // Bottom Typography Overlay
    ctx.fillStyle = "#E05A3A";
    ctx.beginPath();
    ctx.arc(66, 804, 8, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = "rgba(250, 249, 246, 0.9)";
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

    ctx.fillStyle = "rgba(234, 234, 232, 0.82)";
    ctx.font = "500 22px 'Inter', 'Helvetica Neue', sans-serif";
    ctx.fillText(release.titleRomaji, 56, 922);

    ctx.fillStyle = "#F5A894";
    ctx.font = "600 20px 'IBM Plex Mono', monospace";
    ctx.fillText(`♪ ${release.songTitle.toUpperCase()} — ${release.songArtist.toUpperCase()}`, 56, 966);
  } else {
    // SWISS MINIMAL PROCEDURAL CANVAS FALLBACK
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, 1024, 1024);
    drawPaperGrain(ctx, 1024, 1024, 0.035);

    ctx.strokeStyle = ink;
    ctx.lineWidth = 3;
    ctx.strokeRect(36, 36, 952, 952);

    ctx.fillStyle = ink;
    ctx.font = "700 22px 'IBM Plex Mono', monospace";
    ctx.textAlign = "left";
    ctx.fillText(`DISC ARCHIVE  —  ${release.catalogCode}`, 68, 86);

    ctx.font = "500 19px 'IBM Plex Mono', monospace";
    ctx.globalAlpha = 0.72;
    ctx.fillText(
      `${release.releaseYear}  •  ${release.category.toUpperCase()}  •  ${release.studio.toUpperCase()}`,
      68,
      118
    );
    ctx.globalAlpha = 1;

    const scoreBadgeText = release.isOngoing
      ? `EP ${release.currentEpisode}/${release.totalEpisodes} • ★ ${release.rating.toFixed(1)}`
      : release.rating >= 10
      ? "👑 10.0 / 10"
      : `SCORE ★ ${release.rating.toFixed(1)} / 10`;

    ctx.fillStyle = accent;
    ctx.fillRect(670, 62, 286, 56);
    ctx.fillStyle = "#FFFFFF";
    ctx.font = "700 22px 'IBM Plex Mono', monospace";
    ctx.textAlign = "center";
    ctx.fillText(scoreBadgeText, 813, 97);

    ctx.fillStyle = ink;
    ctx.fillRect(68, 144, 888, 2.5);

    drawProceduralIllustration(ctx, release, 68, 170, 888, 535);

    ctx.fillStyle = ink;
    ctx.fillRect(68, 732, 888, 2.5);

    ctx.fillStyle = "#E05A3A";
    ctx.beginPath();
    ctx.arc(80, 768, 9, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = ink;
    ctx.font = "700 20px 'IBM Plex Mono', monospace";
    ctx.textAlign = "left";
    ctx.fillText(
      `${release.genres.join(" / ").toUpperCase()}   —   ${release.bpm} BPM   —   ${release.ageRating}`,
      102,
      775
    );

    ctx.font = "800 58px 'Inter', 'Helvetica Neue', sans-serif";
    const displayTitle = release.titleEnglish.length > 26 ? release.shortTitle : release.titleEnglish;
    ctx.fillText(displayTitle, 68, 848);

    ctx.globalAlpha = 0.78;
    ctx.font = "500 24px 'Inter', 'Helvetica Neue', sans-serif";
    ctx.fillText(release.titleRomaji, 68, 892);

    ctx.globalAlpha = 1;
    ctx.font = "600 21px 'IBM Plex Mono', monospace";
    ctx.fillStyle = accent;
    ctx.fillText(`♪ ${release.songTitle.toUpperCase()} — ${release.songArtist.toUpperCase()}`, 68, 942);
  }

  const tex = configureTexture(new THREE.CanvasTexture(canvas));
  frontTextureCache.set(cacheKey, tex);
  return tex;
}

/**
 * Generates the Back Cover Texture (1024 x 1024)
 */
export function getBackCoverTexture(release: AnimeRelease): THREE.CanvasTexture {
  const cached = backTextureCache.get(release.id);
  if (cached) return cached;

  const canvas = document.createElement("canvas");
  canvas.width = 1024;
  canvas.height = 1024;
  const ctx = canvas.getContext("2d")!;

  ctx.fillStyle = release.coverBgColor;
  ctx.fillRect(0, 0, 1024, 1024);

  ctx.strokeStyle = release.coverInkColor;
  ctx.lineWidth = 3;
  ctx.strokeRect(48, 48, 928, 928);

  ctx.fillStyle = release.coverInkColor;
  ctx.font = "700 28px 'IBM Plex Mono', monospace";
  ctx.fillText(`${release.catalogCode}  //  ${release.releaseYear} ARCHIVE TRACKLIST`, 84, 118);

  ctx.fillRect(84, 146, 856, 3);

  release.tracks.forEach((tr, i) => {
    const ty = 220 + i * 95;
    ctx.font = "700 24px 'IBM Plex Mono', monospace";
    ctx.fillText(`${tr.number}.  ${tr.title.toUpperCase()}`, 84, ty);
    ctx.font = "500 20px 'IBM Plex Mono', monospace";
    ctx.fillText(`${tr.role}  •  ${tr.bpm} BPM  •  ${tr.duration}`, 84, ty + 34);
  });

  ctx.fillRect(84, 720, 856, 2);
  ctx.font = "700 34px 'IBM Plex Mono', monospace";
  ctx.fillText(`PERSONAL VERDICT: ★ ${release.rating.toFixed(1)} / 10`, 84, 790);

  const tex = configureTexture(new THREE.CanvasTexture(canvas));
  backTextureCache.set(release.id, tex);
  return tex;
}

/**
 * Generates the Floating Mini Vinyl / CD Disc Texture (1024 x 1024)
 * Embeds a circular artwork medallion inside the center label when anime artwork is loaded
 */
export function getVinylDiscTexture(
  release: AnimeRelease,
  externalPosterImg?: HTMLImageElement | null
): THREE.CanvasTexture {
  const cacheKey = `${release.id}_${externalPosterImg ? "img" : "proc"}`;
  const cached = discTextureCache.get(cacheKey);
  if (cached) return cached;

  const canvas = document.createElement("canvas");
  canvas.width = 1024;
  canvas.height = 1024;
  const ctx = canvas.getContext("2d")!;

  const cx = 512;
  const cy = 512;

  // Deep obsidian vinyl pressing
  ctx.fillStyle = "#131312";
  ctx.beginPath();
  ctx.arc(cx, cy, 508, 0, Math.PI * 2);
  ctx.fill();

  // Anisotropic vinyl optical highlight wedges
  ctx.save();
  ctx.translate(cx, cy);
  const grad = ctx.createConicGradient(0.4, 0, 0);
  grad.addColorStop(0, "rgba(255,255,255,0)");
  grad.addColorStop(0.1, "rgba(255,255,255,0.16)");
  grad.addColorStop(0.2, "rgba(255,255,255,0)");
  grad.addColorStop(0.5, "rgba(255,255,255,0)");
  grad.addColorStop(0.6, "rgba(255,255,255,0.16)");
  grad.addColorStop(0.7, "rgba(255,255,255,0)");
  grad.addColorStop(1, "rgba(255,255,255,0)");
  ctx.fillStyle = grad;
  ctx.beginPath();
  ctx.arc(0, 0, 498, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();

  // Fine vinyl micro-grooves
  for (let r = 212; r < 494; r += 3.5) {
    ctx.strokeStyle = r % 35 < 4 ? "rgba(255,255,255,0.15)" : "rgba(255,255,255,0.045)";
    ctx.lineWidth = 1.2;
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.stroke();
  }

  // Center label (r = 198)
  ctx.save();
  ctx.beginPath();
  ctx.arc(cx, cy, 198, 0, Math.PI * 2);
  ctx.clip();

  if (externalPosterImg) {
    drawCoverImage(ctx, externalPosterImg, cx - 198, cy - 198, 396, 396, 0.25);
    ctx.fillStyle = "rgba(18, 18, 17, 0.42)";
    ctx.fillRect(cx - 198, cy - 198, 396, 396);
  } else {
    ctx.fillStyle = release.coverBgColor;
    ctx.fillRect(cx - 198, cy - 198, 396, 396);
    ctx.fillStyle = release.accentColor;
    ctx.fillRect(cx - 198, cy - 198, 396, 198);
  }
  ctx.restore();

  ctx.strokeStyle = "#E05A3A";
  ctx.lineWidth = 5;
  ctx.beginPath();
  ctx.arc(cx, cy, 194, 0, Math.PI * 2);
  ctx.stroke();

  // Crisp White Typography on Center Label
  ctx.fillStyle = "#FFFFFF";
  ctx.font = "700 24px 'IBM Plex Mono', monospace";
  ctx.textAlign = "center";
  ctx.fillText(release.catalogCode, cx, cy - 116);

  ctx.font = "700 20px 'IBM Plex Mono', monospace";
  ctx.fillText(`★ ${release.rating.toFixed(1)} / 10`, cx, cy - 86);

  ctx.fillStyle = externalPosterImg ? "#FFFFFF" : release.coverInkColor;
  ctx.font = "800 22px 'Inter', sans-serif";
  ctx.fillText(release.shortTitle.slice(0, 15), cx, cy + 108);

  ctx.font = "600 16px 'IBM Plex Mono', monospace";
  ctx.fillText(`${release.releaseYear} • ${release.bpm} BPM`, cx, cy + 138);

  const tex = configureTexture(new THREE.CanvasTexture(canvas));
  discTextureCache.set(cacheKey, tex);
  return tex;
}
