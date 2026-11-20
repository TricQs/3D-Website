"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, ThreeEvent, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import gsap from "gsap";
import { AnimeRelease } from "@/lib/animeArchiveData";
import {
  getBackCoverTexture,
  getFrontCoverTexture,
  getSpineTexture,
  getVinylDiscTexture
} from "@/lib/proceduralTextures";

interface TurntableSceneProps {
  releases: AnimeRelease[];
  activeIndex: number;
  categoryWaveKey: number;
  onSelectIndex: (index: number) => void;
  onTriggerDive: () => void;
  diveState: "shelf" | "diving-in" | "detail" | "diving-out";
  onDiveInComplete: () => void;
  onDiveOutComplete: () => void;
  onDiveVeilChange?: (opacity: number) => void;
  loadedPosterImages: Record<string, HTMLImageElement>;
  loadedBannerImages: Record<string, HTMLImageElement>;
  activeOpVideoUrl?: string | null;
}

/**
 * ZERO-CLIPPING Accordion Spine-to-Cover 3D Kinematics:
 * - Active center sleeve (d = 0): W = 1.90, H = 1.90, T = 0.20, centered at x = -0.34, z = +0.50
 * - Floating Vinyl Disc: radius = 0.72, parked at x = +0.88 (hover +1.04), z = +0.76 (hover +0.82)
 * - Left spine stack (d <= -1): starts at x = -1.72
 * - Right spine stack (d >= +1): starts at x = +2.14
 */
function computeAccordionTransform(d: number) {
  const absD = Math.abs(d);
  const centerWeight = Math.exp(-(d * d) / 0.14);

  const spinePitch = 0.255;
  const leftStackAnchor = -1.72;
  const rightStackAnchor = 2.14;
  const centerAnchor = -0.34;

  let x = 0;
  if (d <= -1) {
    x = leftStackAnchor + (d + 1) * spinePitch;
  } else if (d >= 1) {
    x = rightStackAnchor + (d - 1) * spinePitch;
  } else if (d < 0) {
    const t = d + 1;
    const smooth = t * t * (3 - 2 * t);
    x = leftStackAnchor + (centerAnchor - leftStackAnchor) * smooth;
  } else {
    const t = d;
    const smooth = t * t * (3 - 2 * t);
    x = centerAnchor + (rightAnchorOrDefault(rightStackAnchor) - centerAnchor) * smooth;
  }

  const spineBaseAngle = Math.PI / 2;
  const radialFan = -d * 0.022;
  const rotY = (1 - centerWeight) * (spineBaseAngle + radialFan);

  const platterCurveZ = -0.042 * (x * x);
  const z = platterCurveZ + 0.5 * centerWeight - 0.14 * (1 - centerWeight);

  // Raised cleanly above sleek thin turntable pedestal (y_top = -0.10 -> center y = 0.85)
  // Leaving pure uncluttered studio floor beneath for floating typography!
  const y = 0.85 + 0.05 * centerWeight;

  const visibleWindow = 8.5;
  const scale = absD > visibleWindow ? Math.max(0.001, 1 - (absD - visibleWindow) * 1.4) : 1;

  return { x, y, z, rotY, centerWeight, scale, isVisible: absD < 9.2 };
}

function rightAnchorOrDefault(val: number) {
  return val;
}

function createHollowDiscGeometry(
  innerRadius: number,
  outerRadius: number,
  segments = 96
): THREE.RingGeometry {
  const geom = new THREE.RingGeometry(innerRadius, outerRadius, segments, 2);
  const pos = geom.attributes.position;
  const uvs = geom.attributes.uv;
  for (let i = 0; i < pos.count; i++) {
    const vx = pos.getX(i);
    const vy = pos.getY(i);
    uvs.setXY(i, vx / (outerRadius * 2) + 0.5, vy / (outerRadius * 2) + 0.5);
  }
  uvs.needsUpdate = true;
  return geom;
}

/**
 * Ultra-Clean Minimalist Brushed Silver Studio Turntable Pedestal
 * (No clunky dark strobe blocks — razor-clean architectural profile that lets
 *  the floating bottom release title breathe cleanly over the #EAEAE8 studio backdrop!)
 */
function CleanStudioPlatterPedestal({ scrollRef }: { scrollRef: React.MutableRefObject<number> }) {
  const platterGroupRef = useRef<THREE.Group>(null);

  useFrame(() => {
    if (!platterGroupRef.current) return;
    platterGroupRef.current.rotation.y =
      -scrollRef.current * 0.036 + performance.now() * 0.000025;
  });

  return (
    <group position={[0, -0.22, -9.95]}>
      <group ref={platterGroupRef}>
        {/* Sleek Ultra-Thin Machined Brushed-Silver Platter Edge (#C2C3BE) */}
        <mesh receiveShadow position={[0, 0.02, 0]}>
          <cylinderGeometry args={[11.15, 11.28, 0.12, 128]} />
          <meshStandardMaterial color="#C2C3BE" metalness={0.55} roughness={0.34} />
        </mesh>

        {/* Precision Subtle Hairline Accent Groove */}
        <mesh receiveShadow position={[0, -0.055, 0]}>
          <cylinderGeometry args={[11.24, 11.12, 0.035, 128]} />
          <meshStandardMaterial color="#9FA09B" metalness={0.62} roughness={0.28} />
        </mesh>

        {/* Clean Matte Light-Silver Studio Surface Mat */}
        <mesh receiveShadow position={[0, 0.09, 0]}>
          <cylinderGeometry args={[11.06, 11.12, 0.03, 128]} />
          <meshStandardMaterial color="#D6D7D2" metalness={0.18} roughness={0.78} />
        </mesh>

        {/* Delicate Concentric Architectural Hairline Rings */}
        {[9.55, 10.15, 10.68].map((r, idx) => (
          <mesh key={idx} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.107, 0]}>
            <ringGeometry args={[r - 0.01, r, 128]} />
            <meshBasicMaterial color="#A8A9A3" transparent opacity={0.45} />
          </mesh>
        ))}
      </group>
    </group>
  );
}

/**
 * Individual Physical Digipak Sleeve Mesh in the 3D Accordion Shelf
 * - Side/Back & Spine faces feature collector artwork + Obi strip + barcode
 * - Hovering ANY inactive sleeve lifts it smoothly, slides it slightly forward,
 *   and tilts/peeks gently toward the cursor ("ngangkat dikit, kayak nengok ke cursor")!
 * - Category switch plays a kinetic wave stagger entrance!
 */
function DigipakSleeveMesh({
  release,
  index,
  scrollRef,
  activeIndex,
  hoveredIndex,
  onHoverIndex,
  onSelect,
  posterImg,
  waveProgressRef,
  pointerRef
}: {
  release: AnimeRelease;
  index: number;
  scrollRef: React.MutableRefObject<number>;
  activeIndex: number;
  hoveredIndex: number | null;
  onHoverIndex: (idx: number | null) => void;
  onSelect: (index: number) => void;
  posterImg?: HTMLImageElement;
  waveProgressRef: React.MutableRefObject<number>;
  pointerRef: React.MutableRefObject<{ x: number; y: number }>;
}) {
  const groupRef = useRef<THREE.Group>(null);

  const spineTex = useMemo(() => getSpineTexture(release, posterImg), [release, posterImg]);
  const frontTex = useMemo(() => getFrontCoverTexture(release, posterImg), [release, posterImg]);
  const backTex = useMemo(() => getBackCoverTexture(release, posterImg), [release, posterImg]);

  const materials = useMemo(() => {
    const spineMat = new THREE.MeshStandardMaterial({
      map: spineTex,
      roughness: 0.38,
      metalness: 0.08
    });
    const frontMat = new THREE.MeshStandardMaterial({
      map: frontTex,
      roughness: 0.32,
      metalness: 0.06
    });
    const backMat = new THREE.MeshStandardMaterial({
      map: backTex,
      roughness: 0.4,
      metalness: 0.08
    });
    const edgeMat = new THREE.MeshStandardMaterial({
      color: release.spineColor,
      roughness: 0.48,
      metalness: 0.08
    });

    return [spineMat, spineMat, edgeMat, edgeMat, frontMat, backMat];
  }, [spineTex, frontTex, backTex, release.spineColor]);

  useFrame((_, delta) => {
    if (!groupRef.current) return;
    const d = index - scrollRef.current;
    const { x, y, z, rotY, centerWeight, scale, isVisible } = computeAccordionTransform(d);

    groupRef.current.visible = isVisible;
    if (!isVisible) return;

    const isCenter = index === activeIndex;
    const isThisHovered = hoveredIndex === index;

    // Kinetic Wave Switch offset (staggered smoothly outward from center when switching ALL/SERIES/FILMS/ON-GOING)
    const waveRaw = waveProgressRef.current;
    const staggerDelay = Math.min(0.45, Math.abs(d) * 0.055);
    const localWave = Math.max(0, Math.min(1, (waveRaw - staggerDelay) / (1 - staggerDelay)));
    // Smooth back-out overshoot curve for tactile shelf snap-in
    const inv = 1 - localWave;
    const waveEase = 1 - inv * inv * inv;
    const waveYOffset = (1 - waveEase) * -0.82;
    const waveScaleMult = 0.72 + 0.28 * waveEase;
    const waveRotExtra = (1 - waveEase) * (d >= 0 ? 0.35 : -0.35);

    // Interactive Hover Peek ("ngangkat dikit & kayak nengok ke cursor")
    let hoverLiftY = 0;
    let hoverPullZ = 0;
    let hoverRotY = 0;
    let hoverRotX = 0;

    if (isThisHovered) {
      if (isCenter) {
        // Active center sleeve follows live mouse coordinates with smooth 3D parallax
        hoverLiftY = 0.055;
        hoverPullZ = 0.04;
        hoverRotY = pointerRef.current.x * 0.14;
        hoverRotX = -pointerRef.current.y * 0.09;
      } else {
        // Inactive side spine sleeve lifts cleanly straight up on Y-axis only (no turning/peeking)
        hoverLiftY = 0.24;
        hoverPullZ = 0;
        hoverRotY = 0;
        hoverRotX = 0;
      }
    }

    const damp = Math.min(1, delta * 13);
    groupRef.current.position.x = THREE.MathUtils.lerp(groupRef.current.position.x, x, damp);
    groupRef.current.position.y = THREE.MathUtils.lerp(
      groupRef.current.position.y,
      y + hoverLiftY + waveYOffset,
      damp
    );
    groupRef.current.position.z = THREE.MathUtils.lerp(
      groupRef.current.position.z,
      z + hoverPullZ,
      damp
    );

    groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, hoverRotX, damp);
    groupRef.current.rotation.y = THREE.MathUtils.lerp(
      groupRef.current.rotation.y,
      rotY + hoverRotY + waveRotExtra,
      damp
    );
    groupRef.current.scale.setScalar(
      THREE.MathUtils.lerp(
        groupRef.current.scale.x,
        scale * (1 + centerWeight * 0.02) * waveScaleMult,
        damp
      )
    );
  });

  const handleClick = (e: ThreeEvent<MouseEvent>) => {
    e.stopPropagation();
    onSelect(index);
  };

  const handlePointerOver = (e: ThreeEvent<PointerEvent>) => {
    e.stopPropagation();
    document.body.style.cursor = "pointer";
    onHoverIndex(index);
  };

  const handlePointerOut = (e: ThreeEvent<PointerEvent>) => {
    e.stopPropagation();
    document.body.style.cursor = "grab";
    if (hoveredIndex === index) {
      onHoverIndex(null);
    }
  };

  return (
    <group ref={groupRef}>
      <mesh
        material={materials}
        castShadow
        receiveShadow
        onClick={handleClick}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
      >
        {/* Physical Digipak Sleeve: W 1.90, H 1.90, Spine Thickness 0.20 */}
        <boxGeometry args={[1.9, 1.9, 0.2]} />
      </mesh>
    </group>
  );
}

/**
 * Floating 3D Black Vinyl Disc with:
 * - Preserved deep black vinyl micro-grooves & anime center label (`z = 0`)
 * - Layered 20%-opacity OP/Trailer motion visual right IN FRONT OF the black vinyl (`z = +0.005`),
 *   rotating in 100% sync with the spinning black disc!
 *   (Streams real AnimeThemes .webm OP video when available, with an instant live animated
 *    Ken Burns HD wallpaper/key-visual motion canvas fallback so 100% of anime display glowing
 *    rotating OP/trailer imagery on the vinyl!)
 */
function FloatingVinylDisc({
  activeRelease,
  posterImg,
  bannerImg,
  activeOpVideoUrl,
  scrollRef,
  activeIndex,
  isHoveredCenter,
  onHoverCenter,
  onTriggerDive,
  diveGroupRef,
  spinBoostRef,
  diveState
}: {
  activeRelease: AnimeRelease;
  posterImg?: HTMLImageElement;
  bannerImg?: HTMLImageElement;
  activeOpVideoUrl?: string | null;
  scrollRef: React.MutableRefObject<number>;
  activeIndex: number;
  isHoveredCenter: boolean;
  onHoverCenter: (hovered: boolean) => void;
  onTriggerDive: () => void;
  diveGroupRef: React.RefObject<THREE.Group>;
  spinBoostRef: React.MutableRefObject<number>;
  diveState: "shelf" | "diving-in" | "detail" | "diving-out";
}) {
  const spinGroupRef = useRef<THREE.Group>(null);
  const discMatRef = useRef<THREE.MeshStandardMaterial>(null);
  const overlayMatRef = useRef<THREE.MeshBasicMaterial>(null);
  const [videoTexture, setVideoTexture] = useState<THREE.VideoTexture | null>(null);

  const outerRadius = 0.72;
  const innerRadius = 0.095;
  const discGeometry = useMemo(
    () => createHollowDiscGeometry(innerRadius, outerRadius, 96),
    [innerRadius, outerRadius]
  );
  // 20%-opacity OP/Trailer overlay ring sits cleanly over the black vinyl grooves (r = 0.196..0.714)
  const opOverlayGeometry = useMemo(() => createHollowDiscGeometry(0.196, 0.714, 96), []);

  const discTexture = useMemo(
    () => getVinylDiscTexture(activeRelease, posterImg),
    [activeRelease, posterImg]
  );

  // Live Animated HD Cinema Reel Canvas Texture (instant 60fps fallback for the 20%-opacity vinyl OP layer!)
  const { reelCtx, reelTexture } = useMemo(() => {
    const c = document.createElement("canvas");
    c.width = 512;
    c.height = 512;
    const ctx = c.getContext("2d")!;
    const tex = new THREE.CanvasTexture(c);
    tex.colorSpace = THREE.SRGBColorSpace;
    return { reelCtx: ctx, reelTexture: tex };
  }, []);

  // Load real creditless OP .webm video into THREE.VideoTexture when resolved by /api/op-video
  useEffect(() => {
    if (!activeOpVideoUrl) {
      setVideoTexture(null);
      return;
    }

    const video = document.createElement("video");
    video.crossOrigin = "anonymous";
    video.src = activeOpVideoUrl;
    video.muted = true;
    video.loop = true;
    video.playsInline = true;
    video.preload = "auto";

    let disposed = false;
    const onCanPlay = () => {
      if (disposed) return;
      video
        .play()
        .then(() => {
          if (disposed) return;
          const vTex = new THREE.VideoTexture(video);
          vTex.colorSpace = THREE.SRGBColorSpace;
          vTex.minFilter = THREE.LinearFilter;
          vTex.magFilter = THREE.LinearFilter;
          setVideoTexture(vTex);
        })
        .catch(() => {
          setVideoTexture(null);
        });
    };

    const onError = () => {
      if (!disposed) setVideoTexture(null);
    };

    video.addEventListener("canplay", onCanPlay);
    video.addEventListener("error", onError);
    video.load();

    return () => {
      disposed = true;
      video.removeEventListener("canplay", onCanPlay);
      video.removeEventListener("error", onError);
      video.pause();
      video.src = "";
      setVideoTexture((prev) => {
        prev?.dispose();
        return null;
      });
    };
  }, [activeOpVideoUrl]);

  useFrame((state, delta) => {
    // Rotate BOTH the black vinyl disc AND the layered 20% OP video/motion overlay in perfect sync!
    if (spinGroupRef.current) {
      const baseSpeed = isHoveredCenter ? 3.1 : 1.15;
      const totalSpeed = baseSpeed + spinBoostRef.current;
      spinGroupRef.current.rotation.z -= delta * totalSpeed;
    }

    // Animate the live HD anime cinema reel canvas when no .webm VideoTexture is active
    if (!videoTexture && (bannerImg || posterImg)) {
      const t = state.clock.elapsedTime;
      const img = bannerImg || posterImg!;
      const iw = img.naturalWidth || img.width;
      const ih = img.naturalHeight || img.height;
      if (iw && ih) {
        reelCtx.clearRect(0, 0, 512, 512);
        const zoom = 1.12 + Math.sin(t * 0.45) * 0.08;
        const scale = Math.max(512 / iw, 512 / ih) * zoom;
        const dw = iw * scale;
        const dh = ih * scale;
        const panX = Math.sin(t * 0.35) * ((dw - 512) * 0.42);
        const panY = Math.cos(t * 0.28) * ((dh - 512) * 0.25);
        reelCtx.drawImage(img, (512 - dw) / 2 + panX, (512 - dh) / 2 + panY, dw, dh);
        reelTexture.needsUpdate = true;
      }
    }

    if (diveGroupRef.current && diveGroupRef.current.userData.isDiving !== true) {
      const settleDiff = Math.abs(activeIndex - scrollRef.current);
      const visibilityFactor = Math.max(0, 1 - settleDiff * 2.2);

      const targetX = isHoveredCenter ? 1.04 : 0.88;
      const targetY = 0.88 + Math.sin(performance.now() * 0.0024) * 0.022;
      const targetZ = isHoveredCenter ? 0.82 : 0.76;
      const targetRotY = isHoveredCenter ? -0.14 : -0.05;

      const damp = Math.min(1, delta * 12);
      diveGroupRef.current.position.x = THREE.MathUtils.lerp(
        diveGroupRef.current.position.x,
        targetX,
        damp
      );
      diveGroupRef.current.position.y = THREE.MathUtils.lerp(
        diveGroupRef.current.position.y,
        targetY,
        damp
      );
      diveGroupRef.current.position.z = THREE.MathUtils.lerp(
        diveGroupRef.current.position.z,
        targetZ,
        damp
      );
      diveGroupRef.current.rotation.y = THREE.MathUtils.lerp(
        diveGroupRef.current.rotation.y,
        targetRotY,
        damp
      );

      const targetScale = 0.94 * (0.25 + 0.75 * visibilityFactor);
      diveGroupRef.current.scale.setScalar(
        THREE.MathUtils.lerp(diveGroupRef.current.scale.x, targetScale, damp)
      );

      if (discMatRef.current) {
        discMatRef.current.opacity = THREE.MathUtils.lerp(
          discMatRef.current.opacity,
          visibilityFactor,
          damp
        );
      }
      if (overlayMatRef.current) {
        // Exact 20% opacity layered smoothly in front of the black vinyl grooves!
        const targetOverlayOpacity = diveState === "shelf" ? 0.2 * visibilityFactor : 0;
        overlayMatRef.current.opacity = THREE.MathUtils.lerp(
          overlayMatRef.current.opacity,
          targetOverlayOpacity,
          damp
        );
      }
      diveGroupRef.current.visible = visibilityFactor > 0.02;
    } else if (diveGroupRef.current && discMatRef.current) {
      diveGroupRef.current.visible = true;
      discMatRef.current.opacity = 1;
      if (overlayMatRef.current) {
        overlayMatRef.current.opacity = THREE.MathUtils.lerp(
          overlayMatRef.current.opacity,
          0,
          Math.min(1, delta * 10)
        );
      }
    }
  });

  const activeOverlayMap = videoTexture || (bannerImg || posterImg ? reelTexture : null);

  return (
    <group ref={diveGroupRef} position={[0.88, 0.88, 0.76]}>
      {/* Unified Spinning Vinyl Assembly */}
      <group ref={spinGroupRef}>
        {/* LAYER 1: Complete Obsidian Black Vinyl Disc (NEVER removed!) */}
        <mesh
          geometry={discGeometry}
          castShadow
          onClick={(e) => {
            e.stopPropagation();
            onTriggerDive();
          }}
          onPointerOver={(e) => {
            e.stopPropagation();
            document.body.style.cursor = "pointer";
            onHoverCenter(true);
          }}
          onPointerOut={() => {
            document.body.style.cursor = "grab";
            onHoverCenter(false);
          }}
        >
          <meshStandardMaterial
            ref={discMatRef}
            map={discTexture}
            roughness={0.22}
            metalness={0.38}
            transparent
            opacity={1}
            side={THREE.DoubleSide}
          />
        </mesh>

        {/* LAYER 2: 20% Opacity Spinning OP / Trailer Projection Layered IN FRONT of the Black Vinyl */}
        {activeOverlayMap && (
          <mesh geometry={opOverlayGeometry} position={[0, 0, 0.005]}>
            <meshBasicMaterial
              ref={overlayMatRef}
              map={activeOverlayMap}
              transparent
              opacity={0.2}
              depthWrite={false}
              toneMapped={false}
              side={THREE.FrontSide}
            />
          </mesh>
        )}
      </group>

      {/* Sleek 3D Machined Anodized Vinyl Outer Rim Edge */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[outerRadius, outerRadius, 0.026, 96, 1, true]} />
        <meshStandardMaterial color="#1D1D1C" metalness={0.62} roughness={0.28} side={THREE.DoubleSide} />
      </mesh>

      {/* Precision Inner Metallic Spindle Collar around Hollow Center Hole */}
      <mesh position={[0, 0, 0.006]}>
        <ringGeometry args={[innerRadius - 0.002, innerRadius + 0.022, 64]} />
        <meshStandardMaterial color="#D8D8D4" metalness={0.88} roughness={0.18} side={THREE.DoubleSide} />
      </mesh>
    </group>
  );
}

/**
 * Main Internal 3D Stage Controller inside R3F <Canvas>
 */
function ArchiveStageInner({
  releases,
  activeIndex,
  categoryWaveKey,
  onSelectIndex,
  onTriggerDive,
  diveState,
  onDiveInComplete,
  onDiveOutComplete,
  onDiveVeilChange,
  loadedPosterImages,
  loadedBannerImages,
  activeOpVideoUrl
}: TurntableSceneProps) {
  const { camera, size } = useThree();
  const scrollRef = useRef<number>(activeIndex);
  const velocityRef = useRef<number>(0);
  const sleevesGroupRef = useRef<THREE.Group>(null);
  const diveDiscGroupRef = useRef<THREE.Group>(null);
  const spinBoostRef = useRef<number>(0);
  const waveProgressRef = useRef<number>(1);
  const pointerRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [isHoveredDisc, setIsHoveredDisc] = useState(false);

  const baseCameraZ = useMemo(() => {
    if (size.width < 640) return 9.1;
    if (size.width < 1024) return 7.75;
    return 6.85;
  }, [size.width]);

  // Track live pointer coordinates across the stage for subtle cursor-peek tilt
  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      pointerRef.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointerRef.current.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  // Trigger Kinetic Shelf Wave Unfold Animation whenever category switches (ALL / SERIES / FILMS / ON-GOING)
  useEffect(() => {
    if (categoryWaveKey === 0) return;
    scrollRef.current = activeIndex;
    velocityRef.current = 0;
    waveProgressRef.current = 0;
    const tween = gsap.to(waveProgressRef, {
      current: 1,
      duration: 0.78,
      ease: "power3.out"
    });
    return () => {
      tween.kill();
    };
  }, [categoryWaveKey, activeIndex]);

  useEffect(() => {
    if (diveState === "shelf") {
      const persp = camera as THREE.PerspectiveCamera;
      persp.fov = 33;
      persp.updateProjectionMatrix();
      camera.position.set(0, 0.88, baseCameraZ);
      camera.lookAt(0, 0.42, 0);
    }
  }, [baseCameraZ, camera, diveState]);

  useFrame((_, delta) => {
    const dt = Math.min(0.05, delta);
    const stiffness = 120;
    const damping = 18.5;
    const displacement = activeIndex - scrollRef.current;
    const springForce = displacement * stiffness - velocityRef.current * damping;
    velocityRef.current += springForce * dt;
    scrollRef.current += velocityRef.current * dt;
  });

  // Cinema-Grade Multi-Stage GSAP Dive-In & Reverse Dive-Out Choreography
  useEffect(() => {
    const discGroup = diveDiscGroupRef.current;
    const shelfGroup = sleevesGroupRef.current;
    const persp = camera as THREE.PerspectiveCamera;
    if (!discGroup || !shelfGroup) return;

    const animState = { fov: persp.fov, veil: 0, lookY: 0.42 };
    const syncCamera = () => {
      persp.fov = animState.fov;
      persp.updateProjectionMatrix();
      persp.lookAt(0, animState.lookY, 0);
      onDiveVeilChange?.(animState.veil);
    };

    if (diveState === "diving-in") {
      discGroup.userData.isDiving = true;
      animState.fov = persp.fov;
      animState.veil = 0;
      animState.lookY = 0.42;

      const tl = gsap.timeline({
        onUpdate: syncCamera,
        onComplete: () => {
          onDiveVeilChange?.(0);
          onDiveInComplete();
        }
      });

      tl.to(shelfGroup.position, { z: -1.5, y: -0.24, duration: 0.48, ease: "power3.inOut" }, 0);
      tl.to(discGroup.position, { x: 0, y: 0.88, z: 2.28, duration: 0.46, ease: "expo.out" }, 0);
      tl.to(discGroup.rotation, { x: 0, y: 0, z: 0, duration: 0.44, ease: "power3.out" }, 0);
      tl.to(discGroup.scale, { x: 2.15, y: 2.15, z: 2.15, duration: 0.48, ease: "expo.out" }, 0);
      tl.to(spinBoostRef, { current: 6.4, duration: 0.55, ease: "power2.in" }, 0);

      tl.to(animState, { lookY: 0.88, duration: 0.36, ease: "power2.out" }, 0);
      tl.to(camera.position, { x: 0, y: 0.88, z: baseCameraZ + 0.32, duration: 0.3, ease: "power2.out" }, 0);

      tl.to(camera.position, { x: 0, y: 0.88, z: 2.04, duration: 0.62, ease: "power4.in" }, 0.34);
      tl.to(animState, { fov: 54, duration: 0.34, ease: "power2.in" }, 0.34);
      tl.to(animState, { fov: 26, duration: 0.28, ease: "power3.out" }, 0.68);
      tl.to(animState, { veil: 1, duration: 0.24, ease: "power2.in" }, 0.74);

      return () => {
        tl.kill();
      };
    }

    if (diveState === "diving-out") {
      discGroup.userData.isDiving = true;
      discGroup.position.set(0, 0.88, 2.28);
      discGroup.rotation.set(0, 0, 0);
      discGroup.scale.setScalar(2.15);
      shelfGroup.position.set(0, -0.24, -1.5);
      camera.position.set(0, 0.88, 2.04);

      animState.fov = 26;
      animState.veil = 1;
      animState.lookY = 0.88;
      syncCamera();

      const tl = gsap.timeline({
        onUpdate: syncCamera,
        onComplete: () => {
          discGroup.userData.isDiving = false;
          spinBoostRef.current = 0;
          onDiveVeilChange?.(0);
          onDiveOutComplete();
        }
      });

      tl.to(animState, { veil: 0, duration: 0.24, ease: "power2.out" }, 0);
      tl.to(camera.position, { x: 0, y: 0.88, z: baseCameraZ, duration: 0.72, ease: "expo.out" }, 0.04);
      tl.to(animState, { fov: 46, duration: 0.24, ease: "power2.out" }, 0.04);
      tl.to(animState, { fov: 33, duration: 0.48, ease: "power3.out" }, 0.28);
      tl.to(animState, { lookY: 0.42, duration: 0.65, ease: "power3.out" }, 0.14);

      tl.to(spinBoostRef, { current: 0, duration: 0.68, ease: "power3.out" }, 0.08);
      tl.to(discGroup.position, { x: 0.88, y: 0.88, z: 0.76, duration: 0.62, ease: "expo.inOut" }, 0.16);
      tl.to(discGroup.scale, { x: 0.94, y: 0.94, z: 0.94, duration: 0.62, ease: "expo.inOut" }, 0.16);
      tl.to(shelfGroup.position, { z: 0, y: 0, duration: 0.65, ease: "expo.out" }, 0.14);

      return () => {
        tl.kill();
      };
    }
  }, [diveState, camera, baseCameraZ, onDiveInComplete, onDiveOutComplete, onDiveVeilChange]);

  const activeRelease = releases[activeIndex] || releases[0];
  const isHoveredCenter = hoveredIndex === activeIndex || isHoveredDisc;

  const handleSleeveClick = (clickedIdx: number) => {
    if (diveState !== "shelf") return;
    if (clickedIdx === activeIndex) {
      onTriggerDive();
    } else {
      onSelectIndex(clickedIdx);
    }
  };

  return (
    <>
      <ambientLight intensity={1.42} color="#FAF9F5" />
      <directionalLight
        position={[4.5, 9.5, 7.5]}
        intensity={1.36}
        color="#FFFDF9"
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-near={1}
        shadow-camera-far={26}
        shadow-camera-left={-7.5}
        shadow-camera-right={7.5}
        shadow-camera-top={5}
        shadow-camera-bottom={-5}
        shadow-bias={-0.0004}
      />
      <directionalLight position={[-6, 4.5, 4]} intensity={0.58} color="#EAEAE6" />
      <pointLight position={[0, 2.4, 3.8]} intensity={0.35} color="#FFFFFF" />

      {/* Clean Minimalist Brushed Silver Studio Turntable Pedestal */}
      <CleanStudioPlatterPedestal scrollRef={scrollRef} />

      {/* Accordion Spine-to-Cover 3D Shelf */}
      <group ref={sleevesGroupRef}>
        {releases.map((release, idx) => (
          <DigipakSleeveMesh
            key={release.id}
            release={release}
            index={idx}
            scrollRef={scrollRef}
            activeIndex={activeIndex}
            hoveredIndex={hoveredIndex}
            onHoverIndex={setHoveredIndex}
            onSelect={handleSleeveClick}
            posterImg={loadedPosterImages[release.id]}
            waveProgressRef={waveProgressRef}
            pointerRef={pointerRef}
          />
        ))}
      </group>

      {/* Non-Clipping Floating Black Vinyl Disc + 20% Layered Spinning OP/Trailer Projection */}
      {activeRelease && (
        <FloatingVinylDisc
          activeRelease={activeRelease}
          posterImg={loadedPosterImages[activeRelease.id]}
          bannerImg={loadedBannerImages[activeRelease.id]}
          activeOpVideoUrl={activeOpVideoUrl}
          scrollRef={scrollRef}
          activeIndex={activeIndex}
          isHoveredCenter={isHoveredCenter}
          onHoverCenter={setIsHoveredDisc}
          onTriggerDive={onTriggerDive}
          diveGroupRef={diveDiscGroupRef}
          spinBoostRef={spinBoostRef}
          diveState={diveState}
        />
      )}
    </>
  );
}

export default function TurntableScene(props: TurntableSceneProps) {
  const dragStateRef = useRef<{
    isDragging: boolean;
    startX: number;
    startIndex: number;
  }>({
    isDragging: false,
    startX: 0,
    startIndex: 0
  });

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (props.diveState !== "shelf") return;
    dragStateRef.current = {
      isDragging: true,
      startX: e.clientX,
      startIndex: props.activeIndex
    };
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!dragStateRef.current.isDragging || props.diveState !== "shelf") return;
    const dx = e.clientX - dragStateRef.current.startX;
    const stepOffset = Math.round(-dx / 64);
    const nextIdx = Math.max(
      0,
      Math.min(props.releases.length - 1, dragStateRef.current.startIndex + stepOffset)
    );
    if (nextIdx !== props.activeIndex) {
      props.onSelectIndex(nextIdx);
    }
  };

  const handlePointerUp = () => {
    dragStateRef.current.isDragging = false;
  };

  return (
    <div
      className="relative w-full h-full select-none cursor-grab active:cursor-grabbing"
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
    >
      <Canvas
        shadows
        dpr={[1, 2]}
        camera={{ position: [0, 0.88, 6.85], fov: 33, near: 0.04, far: 48 }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      >
        <ArchiveStageInner {...props} />
      </Canvas>
    </div>
  );
}
