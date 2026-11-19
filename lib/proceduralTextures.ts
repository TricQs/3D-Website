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
  for (let i = 0; i < 900; i++) {
    const x = ((i * 7919) % w);
    const y = ((i * 104729) % h);
    ctx.fillRect(x, y, 1.5, 1.5);
  }
  ctx.restore();
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

  // Subtle inner frame tint
  ctx.fillStyle = bg;
  ctx.fillRect(x, y, w, h);

  // Swiss background technical grid
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
      // Soft ambient circle behind vending machine
      ctx.fillStyle = accent;
      ctx.globalAlpha = 0.16;
      ctx.beginPath();
      ctx.arc(cx + 30, cy - 10, 210, 0, Math.PI * 2);
      ctx.fill();
      ctx.globalAlpha = 1;

      // Retro Japanese Vending Machine Cabinet
      const vmW = 250;
      const vmH = 370;
      const vmX = cx - vmW / 2;
      const vmY = cy - vmH / 2 + 8;

      // 3D Isometric Side Depth
      ctx.fillStyle = ink;
      ctx.beginPath();
      ctx.moveTo(vmX + vmW, vmY);
      ctx.lineTo(vmX + vmW + 28, vmY - 18);
      ctx.lineTo(vmX + vmW + 28, vmY + vmH - 18);
      ctx.lineTo(vmX + vmW, vmY + vmH);
      ctx.closePath();
      ctx.fill();

      // Top Isometric Roof
      ctx.fillStyle = accent;
      ctx.beginPath();
      ctx.moveTo(vmX, vmY);
      ctx.lineTo(vmX + 28, vmY - 18);
      ctx.lineTo(vmX + vmW + 28, vmY - 18);
      ctx.lineTo(vmX + vmW, vmY);
      ctx.closePath();
      ctx.fill();

      // Front Cabinet Body
      ctx.fillStyle = "#FAF8F5";
      ctx.strokeStyle = ink;
      ctx.lineWidth = 3.5;
      ctx.fillRect(vmX, vmY, vmW, vmH);
      ctx.strokeRect(vmX, vmY, vmW, vmH);

      // Display Window
      ctx.fillStyle = bg;
      ctx.fillRect(vmX + 20, vmY + 22, vmW - 40, 175);
      ctx.strokeRect(vmX + 20, vmY + 22, vmW - 40, 175);

      // 3 Rows of Miniature Cans/Bottles inside Window
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

      // Red Accent Banner Strip & Selection Buttons
      ctx.fillStyle = accent;
      ctx.fillRect(vmX + 20, vmY + 210, vmW - 40, 34);
      ctx.fillStyle = "#FFFFFF";
      ctx.font = "700 14px 'IBM Plex Mono', monospace";
      ctx.fillText("COLD / HOT  •  自動販売機", vmX + 32, vmY + 232);

      // Coin slot & dispenser flap
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
      // Large Vermilion Sun Disc
      ctx.fillStyle = accent;
      ctx.beginPath();
      ctx.arc(cx, cy - 18, 155, 0, Math.PI * 2);
      ctx.fill();

      // Torii Gate Minimalist Silhouette
      ctx.fillStyle = ink;
      // Top Kasagi beam (curved slightly via polygon)
      ctx.fillRect(cx - 175, cy - 120, 350, 22);
      ctx.fillRect(cx - 145, cy - 72, 290, 16);
      // Two vertical pillars
      ctx.fillRect(cx - 105, cy - 100, 24, 245);
      ctx.fillRect(cx + 81, cy - 100, 24, 245);
      // Center tablet
      ctx.fillRect(cx - 18, cy - 98, 36, 38);

      // Horizontal mist waves at base
      ctx.strokeStyle = bg;
      ctx.lineWidth = 4;
      for (let i = 0; i < 4; i++) {
        const wy = cy + 80 + i * 16;
        ctx.beginPath();
        ctx.moveTo(cx - 180, wy);
        ctx.lineTo(cx + 180, wy);
        ctx.stroke();
      }
      break;
    }

    case "comet-sky": {
      // Concentric Topographic Orbital Rings
      ctx.strokeStyle = ink;
      for (let r = 45; r <= 220; r += 35) {
        ctx.lineWidth = r === 150 ? 2.5 : 1.2;
        ctx.beginPath();
        ctx.arc(cx, cy, r, 0, Math.PI * 2);
        ctx.stroke();
      }

      // Twin Split Comet Arcs
      ctx.strokeStyle = accent;
      ctx.lineWidth = 5;
      ctx.beginPath();
      ctx.moveTo(x + 60, y + h - 70);
      ctx.quadraticCurveTo(cx - 40, cy - 120, x + w - 65, y + 75);
      ctx.stroke();

      ctx.strokeStyle = ink;
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(x + 85, y + h - 50);
      ctx.quadraticCurveTo(cx + 30, cy - 60, x + w - 55, y + 115);
      ctx.stroke();

      // Comet Nucleus
      ctx.fillStyle = accent;
      ctx.beginPath();
      ctx.arc(cx + 58, cy - 52, 16, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = ink;
      ctx.beginPath();
      ctx.arc(cx - 48, cy + 34, 11, 0, Math.PI * 2);
      ctx.fill();
      break;
    }

    case "arcade-cabinet": {
      // UFO Catcher / Arcade Monitor Frame
      const boxW = 320;
      const boxH = 320;
      const bx = cx - boxW / 2;
      const by = cy - boxH / 2;

      ctx.strokeStyle = ink;
      ctx.lineWidth = 4;
      ctx.strokeRect(bx, by, boxW, boxH);

      // Top Crane Rail & Mechanical Claw
      ctx.fillStyle = accent;
      ctx.fillRect(bx, by, boxW, 38);
      ctx.strokeStyle = ink;
      ctx.lineWidth = 3.5;
      ctx.beginPath();
      ctx.moveTo(cx, by + 38);
      ctx.lineTo(cx, cy - 18);
      ctx.stroke();

      // Prongs of the arcade claw
      ctx.beginPath();
      ctx.arc(cx, cy + 16, 44, Math.PI * 0.85, Math.PI * 0.15, true);
      ctx.stroke();

      // Target capsule prize below claw
      ctx.fillStyle = accent;
      ctx.beginPath();
      ctx.arc(cx, cy + 88, 36, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = ink;
      ctx.stroke();

      // Arcade Joystick & Buttons at bottom
      ctx.fillStyle = ink;
      ctx.fillRect(bx + 24, by + boxH - 54, boxW - 48, 34);
      for (let b = 0; b < 4; b++) {
        ctx.fillStyle = b % 2 === 0 ? accent : bg;
        ctx.beginPath();
        ctx.arc(bx + boxW - 120 + b * 24, by + boxH - 37, 7, 0, Math.PI * 2);
        ctx.fill();
      }
      break;
    }

    case "magic-circle": {
      // Bauhaus Alchemical Astrolabe Compass
      ctx.strokeStyle = ink;
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.arc(cx, cy, 195, 0, Math.PI * 2);
      ctx.stroke();

      ctx.strokeStyle = accent;
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      ctx.arc(cx, cy, 148, 0, Math.PI * 2);
      ctx.stroke();

      // Degree ticks around outer ring
      ctx.strokeStyle = ink;
      ctx.lineWidth = 1.8;
      for (let deg = 0; deg < 360; deg += 10) {
        const rad = (deg * Math.PI) / 180;
        const r1 = deg % 30 === 0 ? 172 : 182;
        const r2 = 195;
        ctx.beginPath();
        ctx.moveTo(cx + Math.cos(rad) * r1, cy + Math.sin(rad) * r1);
        ctx.lineTo(cx + Math.cos(rad) * r2, cy + Math.sin(rad) * r2);
        ctx.stroke();
      }

      // Inscribed dual triangles (Hexagram)
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
      // Minimalist Railway Crossing & Signal Lights
      ctx.strokeStyle = ink;
      ctx.lineWidth = 6;
      // Vertical post
      ctx.beginPath();
      ctx.moveTo(cx - 90, y + 60);
      ctx.lineTo(cx - 90, y + h - 40);
      ctx.stroke();

      // Diagonal yellow/coral barrier pole
      ctx.strokeStyle = accent;
      ctx.lineWidth = 10;
      ctx.beginPath();
      ctx.moveTo(cx - 130, cy + 45);
      ctx.lineTo(cx + 195, cy - 85);
      ctx.stroke();

      // Crossbuck X sign
      ctx.strokeStyle = ink;
      ctx.lineWidth = 7;
      ctx.beginPath();
      ctx.moveTo(cx - 135, cy - 135);
      ctx.lineTo(cx - 45, cy - 55);
      ctx.moveTo(cx - 45, cy - 135);
      ctx.lineTo(cx - 135, cy - 55);
      ctx.stroke();

      // Geometric Sakura Blossom Petals Drifting
      ctx.fillStyle = accent;
      const petals = [
        [cx + 40, cy - 110, 16],
        [cx + 120, cy - 30, 22],
        [cx + 15, cy + 45, 18],
        [cx + 145, cy + 95, 14],
        [cx - 25, cy + 125, 20]
      ];
      for (const [px, py, pr] of petals) {
        ctx.beginPath();
        ctx.ellipse(px, py, pr, pr * 0.62, Math.PI / 5, 0, Math.PI * 2);
        ctx.fill();
      }
      break;
    }

    case "cassette-synth": {
      // Analog Reel-to-Reel / Cassette Transport Deck
      const deckW = 460;
      const deckH = 270;
      const dx = cx - deckW / 2;
      const dy = cy - deckH / 2;

      ctx.fillStyle = ink;
      ctx.fillRect(dx, dy, deckW, deckH);

      // Inner label cutout
      ctx.fillStyle = accent;
      ctx.fillRect(dx + 26, dy + 26, deckW - 52, 68);

      // Dual Tape Reels
      for (const offset of [-115, 115]) {
        const rx = cx + offset;
        const ry = cy + 32;
        ctx.fillStyle = bg;
        ctx.beginPath();
        ctx.arc(rx, ry, 58, 0, Math.PI * 2);
        ctx.fill();

        ctx.strokeStyle = ink;
        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.arc(rx, ry, 24, 0, Math.PI * 2);
        ctx.stroke();

        for (let s = 0; s < 3; s++) {
          const a = (s * 120 * Math.PI) / 180;
          ctx.beginPath();
          ctx.moveTo(rx + Math.cos(a) * 24, ry + Math.sin(a) * 24);
          ctx.lineTo(rx + Math.cos(a) * 52, ry + Math.sin(a) * 52);
          ctx.stroke();
        }
      }
      break;
    }

    case "ocean-tiger": {
      // Horizon Sun Disc
      ctx.fillStyle = accent;
      ctx.beginPath();
      ctx.arc(cx, cy - 30, 125, 0, Math.PI * 2);
      ctx.fill();

      // Layered Modernist Ocean Wave Striations
      for (let row = 0; row < 6; row++) {
        const wy = cy + 15 + row * 32;
        ctx.fillStyle = row % 2 === 0 ? ink : bg;
        ctx.fillRect(x + 60, wy, w - 120, 18);
      }

      // Diving depth ruler along right edge
      ctx.strokeStyle = ink;
      ctx.lineWidth = 2;
      for (let ty = y + 40; ty < y + h - 40; ty += 18) {
        ctx.beginPath();
        ctx.moveTo(x + w - 90, ty);
        ctx.lineTo(x + w - 60, ty);
        ctx.stroke();
      }
      break;
    }

    case "school-desk": {
      // Sunlit Architectural Window Mullion Grid & Diagonal Light Projection
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

      // Window Frame
      ctx.strokeStyle = ink;
      ctx.lineWidth = 4;
      ctx.strokeRect(cx - 150, cy - 150, 240, 240);
      ctx.beginPath();
      ctx.moveTo(cx - 30, cy - 150);
      ctx.lineTo(cx - 30, cy + 90);
      ctx.moveTo(cx - 150, cy - 30);
      ctx.lineTo(cx + 90, cy - 30);
      ctx.stroke();

      // Minimalist Paper Airplane Vector
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
      // Dual Interlocking Opposite Spheres (10/10 Polar Opposites motif)
      ctx.fillStyle = ink;
      ctx.beginPath();
      ctx.arc(cx - 68, cy, 130, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = accent;
      ctx.beginPath();
      ctx.arc(cx + 68, cy, 130, 0, Math.PI * 2);
      ctx.fill();

      // Overlap lens intersection in background color
      ctx.save();
      ctx.beginPath();
      ctx.arc(cx - 68, cy, 130, 0, Math.PI * 2);
      ctx.clip();
      ctx.fillStyle = bg;
      ctx.beginPath();
      ctx.arc(cx + 68, cy, 130, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      // Outer orbit ring
      ctx.strokeStyle = ink;
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      ctx.arc(cx, cy, 210, 0, Math.PI * 2);
      ctx.stroke();
      break;
    }
  }

  // Swiss Registration Crosshairs at 4 corners of illustration frame
  ctx.strokeStyle = ink;
  ctx.lineWidth = 2;
  const corners = [
    [x + 18, y + 18],
    [x + w - 18, y + 18],
    [x + 18, y + h - 18],
    [x + w - 18, y + h - 18]
  ];
  for (const [qx, qy] of corners) {
    ctx.beginPath();
    ctx.moveTo(qx - 8, qy);
    ctx.lineTo(qx + 8, qy);
    ctx.moveTo(qx, qy - 8);
    ctx.lineTo(qx, qy + 8);
    ctx.stroke();
  }

  // Outer Frame Border
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

  // Base archival spine color
  ctx.fillStyle = release.spineColor;
  ctx.fillRect(0, 0, 256, 1024);

  drawPaperGrain(ctx, 256, 1024, 0.04);

  // Subtle physical bookbind crease highlights on left and right edges
  const grad = ctx.createLinearGradient(0, 0, 256, 0);
  grad.addColorStop(0, "rgba(0,0,0,0.24)");
  grad.addColorStop(0.08, "rgba(255,255,255,0.12)");
  grad.addColorStop(0.92, "rgba(255,255,255,0.06)");
  grad.addColorStop(1, "rgba(0,0,0,0.28)");
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 256, 1024);

  ctx.fillStyle = release.spineTextColor;
  ctx.strokeStyle = release.spineTextColor;

  // Top Catalog Code Box
  ctx.lineWidth = 2;
  ctx.strokeRect(28, 36, 200, 56);
  ctx.font = "700 22px 'IBM Plex Mono', monospace";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(release.catalogCode, 128, 64);

  // Coral status indicator dot for 10/10 Masterpiece or On-Going
  if (release.rating >= 9.0 || release.isOngoing) {
    ctx.fillStyle = "#E05A3A";
    ctx.beginPath();
    ctx.arc(128, 122, 10, 0, Math.PI * 2);
    ctx.fill();
  }

  // Vertical Spine Title & Artist (Rotated 90 deg clockwise)
  ctx.save();
  ctx.translate(128, 515);
  ctx.rotate(Math.PI / 2);

  ctx.fillStyle = release.spineTextColor;
  ctx.font = "700 34px 'Inter', 'Helvetica Neue', sans-serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "bottom";
  ctx.fillText(release.shortTitle.toUpperCase(), 0, -4);

  ctx.globalAlpha = 0.75;
  ctx.font = "500 20px 'IBM Plex Mono', monospace";
  ctx.textBaseline = "top";
  ctx.fillText(`${release.songArtist.toUpperCase()}  •  ${release.releaseYear}`, 0, 8);
  ctx.restore();

  // Bottom Personal Rating Stamp on Spine
  ctx.fillStyle = release.spineTextColor;
  ctx.globalAlpha = 0.2;
  ctx.fillRect(28, 895, 200, 2);
  ctx.globalAlpha = 1;

  ctx.font = "700 26px 'IBM Plex Mono', monospace";
  ctx.textAlign = "center";
  ctx.fillText(`★ ${release.rating.toFixed(1)}`, 128, 945);

  const tex = configureTexture(new THREE.CanvasTexture(canvas));
  spineTextureCache.set(release.id, tex);
  return tex;
}

/**
 * Generates the Square Front Cover Texture (1024 x 1024)
 * Supports optional official anime poster overlay while defaulting to 100% procedural Swiss canvas art
 */
export function getFrontCoverTexture(
  release: AnimeRelease,
  externalPosterImg?: HTMLImageElement | null
): THREE.CanvasTexture {
  const cacheKey = `${release.id}_${externalPosterImg ? "img" : "proc"}`;
  const cached = frontTextureCache.get(cacheKey);
  if (cached) return cached;

  const canvas = document.createElement("canvas");
  canvas.width = 1024;
  canvas.height = 1024;
  const ctx = canvas.getContext("2d")!;

  const bg = release.coverBgColor;
  const ink = release.coverInkColor;
  const accent = release.accentColor;

  // Base cover stock
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, 1024, 1024);
  drawPaperGrain(ctx, 1024, 1024, 0.035);

  // Outer editorial border hairline
  ctx.strokeStyle = ink;
  ctx.lineWidth = 3;
  ctx.strokeRect(36, 36, 952, 952);

  // Top Header Strip (Swiss Archival Metadata)
  ctx.fillStyle = ink;
  ctx.font = "700 22px 'IBM Plex Mono', monospace";
  ctx.textAlign = "left";
  ctx.fillText(`DISC ARCHIVE  —  ${release.catalogCode}`, 68, 86);

  ctx.font = "500 19px 'IBM Plex Mono', monospace";
  ctx.globalAlpha = 0.72;
  ctx.fillText(`${release.category.toUpperCase()}  •  ${release.studio.toUpperCase()}  •  ${release.releaseYear}`, 68, 118);
  ctx.globalAlpha = 1;

  // Top-Right Personal Score Pill
  const scoreBadgeText = release.isOngoing
    ? `EP ${release.currentEpisode}/${release.totalEpisodes} • ★ ${release.rating.toFixed(1)}`
    : release.rating >= 10
    ? `👑 10.0 / 10`
    : `SCORE ★ ${release.rating.toFixed(1)} / 10`;

  ctx.fillStyle = accent;
  ctx.fillRect(670, 62, 286, 56);
  ctx.fillStyle = "#FFFFFF";
  ctx.font = "700 22px 'IBM Plex Mono', monospace";
  ctx.textAlign = "center";
  ctx.fillText(scoreBadgeText, 813, 97);

  // Top Divider Rule
  ctx.fillStyle = ink;
  ctx.fillRect(68, 144, 888, 2.5);

  // Central Artwork Zone (68, 170, 888, 535)
  if (externalPosterImg) {
    // Draw procedural background first, then frame the official key visual cleanly on the right/center
    drawProceduralIllustration(ctx, release, 68, 170, 888, 535);
    ctx.save();
    ctx.beginPath();
    ctx.rect(520, 194, 412, 487);
    ctx.clip();
    const scale = Math.max(412 / externalPosterImg.width, 487 / externalPosterImg.height);
    const dw = externalPosterImg.width * scale;
    const dh = externalPosterImg.height * scale;
    ctx.drawImage(externalPosterImg, 520 + (412 - dw) / 2, 194 + (487 - dh) / 2, dw, dh);
    ctx.strokeStyle = ink;
    ctx.lineWidth = 4;
    ctx.strokeRect(520, 194, 412, 487);
    ctx.restore();
  } else {
    drawProceduralIllustration(ctx, release, 68, 170, 888, 535);
  }

  // Bottom Swiss Editorial Typography Block
  ctx.fillStyle = ink;
  ctx.fillRect(68, 732, 888, 2.5);

  // Coral dot + Genre & Musical Tempo Spec
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

  // Main Neo-Grotesque Release Title
  ctx.font = "800 58px 'Inter', 'Helvetica Neue', sans-serif";
  const displayTitle =
    release.titleEnglish.length > 26 ? release.shortTitle : release.titleEnglish;
  ctx.fillText(displayTitle, 68, 848);

  // Romaji & Theme Song Artist Line
  ctx.globalAlpha = 0.78;
  ctx.font = "500 24px 'Inter', 'Helvetica Neue', sans-serif";
  ctx.fillText(`${release.titleRomaji}`, 68, 892);

  ctx.globalAlpha = 1;
  ctx.font = "600 21px 'IBM Plex Mono', monospace";
  ctx.fillStyle = accent;
  ctx.fillText(`♪ ${release.songTitle.toUpperCase()} — ${release.songArtist.toUpperCase()}`, 68, 942);

  // Physical edge bevel shading
  const edgeGrad = ctx.createLinearGradient(0, 0, 1024, 1024);
  edgeGrad.addColorStop(0, "rgba(255,255,255,0.08)");
  edgeGrad.addColorStop(1, "rgba(0,0,0,0.12)");
  ctx.fillStyle = edgeGrad;
  ctx.fillRect(0, 0, 1024, 1024);

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
  ctx.fillText(`${release.catalogCode}  //  ARCHIVE DOSSIER & TRACKLIST`, 84, 118);

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
 * With realistic micro-grooves, anisotropic optical sheen, and color-matched center label
 */
export function getVinylDiscTexture(release: AnimeRelease): THREE.CanvasTexture {
  const cached = discTextureCache.get(release.id);
  if (cached) return cached;

  const canvas = document.createElement("canvas");
  canvas.width = 1024;
  canvas.height = 1024;
  const ctx = canvas.getContext("2d")!;

  const cx = 512;
  const cy = 512;

  // Base deep vinyl carbon black
  ctx.fillStyle = "#141413";
  ctx.beginPath();
  ctx.arc(cx, cy, 504, 0, Math.PI * 2);
  ctx.fill();

  // Diagonal anisotropic vinyl groove reflection sheen
  ctx.save();
  ctx.translate(cx, cy);
  for (let a = 0; a < 2; a++) {
    const angle = a * Math.PI;
    const grad = ctx.createConicGradient(angle, 0, 0);
    grad.addColorStop(0, "rgba(255,255,255,0.0)");
    grad.addColorStop(0.12, "rgba(255,255,255,0.13)");
    grad.addColorStop(0.24, "rgba(255,255,255,0.0)");
    grad.addColorStop(0.5, "rgba(255,255,255,0.0)");
    grad.addColorStop(0.62, "rgba(255,255,255,0.13)");
    grad.addColorStop(0.74, "rgba(255,255,255,0.0)");
    grad.addColorStop(1, "rgba(255,255,255,0.0)");
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(0, 0, 496, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.restore();

  // Concentric Vinyl Micro-Grooves
  for (let r = 205; r < 490; r += 3.5) {
    ctx.strokeStyle = r % 35 < 4 ? "rgba(255,255,255,0.14)" : "rgba(255,255,255,0.045)";
    ctx.lineWidth = 1.2;
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.stroke();
  }

  // Color-Matched Center Label (r = 192)
  ctx.fillStyle = release.coverBgColor;
  ctx.beginPath();
  ctx.arc(cx, cy, 192, 0, Math.PI * 2);
  ctx.fill();

  // Upper half accent band on center label
  ctx.save();
  ctx.beginPath();
  ctx.arc(cx, cy, 192, Math.PI, Math.PI * 2);
  ctx.closePath();
  ctx.fillStyle = release.accentColor;
  ctx.fill();
  ctx.restore();

  // Outer Label Ring Border
  ctx.strokeStyle = release.coverInkColor;
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.arc(cx, cy, 184, 0, Math.PI * 2);
  ctx.stroke();

  // Catalog Code & Score on Center Label
  ctx.fillStyle = "#FFFFFF";
  ctx.font = "700 24px 'IBM Plex Mono', monospace";
  ctx.textAlign = "center";
  ctx.fillText(release.catalogCode, cx, cy - 115);

  ctx.font = "700 19px 'IBM Plex Mono', monospace";
  ctx.fillText(`★ ${release.rating.toFixed(1)} / 10`, cx, cy - 84);

  // Lower half label title & artist
  ctx.fillStyle = release.coverInkColor;
  ctx.font = "800 22px 'Inter', sans-serif";
  ctx.fillText(release.shortTitle.slice(0, 14), cx, cy + 102);

  ctx.font = "600 16px 'IBM Plex Mono', monospace";
  ctx.fillText(`${release.releaseYear} • ${release.bpm} BPM`, cx, cy + 132);

  // Metallic spindle collar around center hole (r = 56..68)
  ctx.strokeStyle = "#B8B9B4";
  ctx.lineWidth = 8;
  ctx.beginPath();
  ctx.arc(cx, cy, 62, 0, Math.PI * 2);
  ctx.stroke();

  const tex = configureTexture(new THREE.CanvasTexture(canvas));
  discTextureCache.set(release.id, tex);
  return tex;
}
