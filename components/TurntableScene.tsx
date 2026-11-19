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
  onSelectIndex: (index: number) => void;
  onTriggerDive: () => void;
  diveState: "shelf" | "diving-in" | "detail" | "diving-out";
  onDiveInComplete: () => void;
  onDiveOutComplete: () => void;
  onDiveVeilChange?: (opacity: number) => void;
  useOfficialPosters: boolean;
  loadedPosterImages: Record<string, HTMLImageElement>;
}

/**
 * ZERO-CLIPPING Accordion Spine-to-Cover 3D Kinematics:
 * - Active center sleeve (d = 0): W = 1.90, H = 1.90, T = 0.20, centered at x = -0.34, z = +0.50
 *   -> X span: [-1.29, +0.61], Z front face: +0.60
 * - Floating Vinyl Disc: outerRadius = 0.72, parked at x = +0.88 (hover +1.04), z = +0.76 (hover +0.82)
 *   -> Always +0.16 units IN FRONT OF active cover (zero overlap with sleeve!)
 *   -> Rightmost edge at rest: +1.60, at hover: +1.76
 * - Left spine stack (d <= -1): starts at x = -1.72 (inner face -1.62 -> 0.33 gap from cover!)
 * - Right spine stack (d >= +1): starts at x = +2.14 (inner face +2.04 -> 0.28..0.44 gap from disc!)
 * Result: 100% mathematically guaranteed ZERO clipping from every angle and hover state.
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
    x = centerAnchor + (rightStackAnchor - centerAnchor) * smooth;
  }

  // Side stacks rotated 90 deg sideways (+PI/2) so their -X spine faces the camera cleanly
  const spineBaseAngle = Math.PI / 2;
  const radialFan = -d * 0.022;
  const rotY = (1 - centerWeight) * (spineBaseAngle + radialFan);

  // Follow the gentle curve of the silver turntable platter arc
  const platterCurveZ = -0.042 * (x * x);
  const z = platterCurveZ + 0.5 * centerWeight - 0.14 * (1 - centerWeight);

  // Sleeves sit flush above the platter top (y = -0.26 -> center y = 0.69)
  const y = 0.69 + 0.05 * centerWeight;

  // Keep a clean balanced 17-case physical shelf formation (8 left + 1 center + 8 right)
  const visibleWindow = 8.5;
  const scale = absD > visibleWindow ? Math.max(0.001, 1 - (absD - visibleWindow) * 1.4) : 1;

  return { x, y, z, rotY, centerWeight, scale, isVisible: absD < 9.2 };
}

function createHollowDiscGeometry(innerRadius: number, outerRadius: number, segments = 96): THREE.RingGeometry {
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
 * Curved Perforated Brushed Silver-Steel Turntable Platter Rim
 * Framed neatly below the 17 sleeves so the perforated strobe bevel shines clearly
 * while leaving crisp bright studio floor space beneath for the Release Caption!
 */
function PerforatedTurntablePlatter({ scrollRef }: { scrollRef: React.MutableRefObject<number> }) {
  const platterGroupRef = useRef<THREE.Group>(null);

  const strobeSlots = useMemo(() => {
    const count = 148;
    const radius = 11.42;
    const items: { pos: [number, number, number]; rotY: number }[] = [];
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2;
      items.push({
        pos: [Math.sin(angle) * radius, -0.03, Math.cos(angle) * radius],
        rotY: angle
      });
    }
    return items;
  }, []);

  useFrame(() => {
    if (!platterGroupRef.current) return;
    platterGroupRef.current.rotation.y =
      -scrollRef.current * 0.038 + performance.now() * 0.00003;
  });

  return (
    <group position={[0, -0.49, -9.85]}>
      <group ref={platterGroupRef}>
        {/* Outer Brushed Silver-Steel Beveled Rim (#B8B9B4) */}
        <mesh receiveShadow position={[0, -0.04, 0]}>
          <cylinderGeometry args={[11.12, 11.66, 0.42, 128]} />
          <meshStandardMaterial color="#B8B9B4" metalness={0.58} roughness={0.32} />
        </mesh>

        {/* Precision Lower Machined Chamfer Lip */}
        <mesh receiveShadow position={[0, -0.29, 0]}>
          <cylinderGeometry args={[11.66, 11.48, 0.1, 128]} />
          <meshStandardMaterial color="#979892" metalness={0.65} roughness={0.28} />
        </mesh>

        {/* 148 Repeating Rectangular Perforated Strobe Slots along Front Bevel */}
        {strobeSlots.map((slot, idx) => (
          <group key={idx} position={slot.pos} rotation={[0, slot.rotY, 0]}>
            <mesh rotation={[-0.56, 0, 0]}>
              <boxGeometry args={[0.23, 0.18, 0.06]} />
              <meshStandardMaterial color="#181818" metalness={0.18} roughness={0.85} />
            </mesh>
          </group>
        ))}

        {/* Top Machined Aluminum Trim Ring */}
        <mesh receiveShadow position={[0, 0.18, 0]}>
          <cylinderGeometry args={[11.06, 11.12, 0.04, 128]} />
          <meshStandardMaterial color="#D6D7D2" metalness={0.62} roughness={0.24} />
        </mesh>

        {/* Warm Matte Anodized Light-Silver Platter Surface (high contrast & studio-clean!) */}
        <mesh receiveShadow position={[0, 0.21, 0]}>
          <cylinderGeometry args={[10.92, 11.0, 0.04, 128]} />
          <meshStandardMaterial color="#CECFCA" metalness={0.22} roughness={0.72} />
        </mesh>

        {/* Concentric Hairline Turn-Table Rings */}
        {[9.4, 10.0, 10.55].map((r, idx) => (
          <mesh key={idx} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.232, 0]}>
            <ringGeometry args={[r - 0.014, r, 128]} />
            <meshBasicMaterial color="#9A9B95" transparent opacity={0.5} />
          </mesh>
        ))}
      </group>
    </group>
  );
}

/**
 * Individual Physical Digipak Sleeve Mesh in the 3D Accordion Shelf
 */
function DigipakSleeveMesh({
  release,
  index,
  scrollRef,
  activeIndex,
  isHoveredCenter,
  onHoverCenter,
  onSelect,
  useOfficialPosters,
  posterImg
}: {
  release: AnimeRelease;
  index: number;
  scrollRef: React.MutableRefObject<number>;
  activeIndex: number;
  isHoveredCenter: boolean;
  onHoverCenter: (hovered: boolean) => void;
  onSelect: (index: number) => void;
  useOfficialPosters: boolean;
  posterImg?: HTMLImageElement;
}) {
  const groupRef = useRef<THREE.Group>(null);

  const spineTex = useMemo(() => getSpineTexture(release), [release]);
  const frontTex = useMemo(
    () => getFrontCoverTexture(release, useOfficialPosters ? posterImg : null),
    [release, useOfficialPosters, posterImg]
  );
  const backTex = useMemo(() => getBackCoverTexture(release), [release]);

  const materials = useMemo(() => {
    const spineMat = new THREE.MeshStandardMaterial({
      map: spineTex,
      roughness: 0.42,
      metalness: 0.04
    });
    const frontMat = new THREE.MeshStandardMaterial({
      map: frontTex,
      roughness: 0.34,
      metalness: 0.05
    });
    const backMat = new THREE.MeshStandardMaterial({
      map: backTex,
      roughness: 0.44,
      metalness: 0.04
    });
    const edgeMat = new THREE.MeshStandardMaterial({
      color: release.spineColor,
      roughness: 0.55,
      metalness: 0.04
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
    const targetTiltX = isCenter && isHoveredCenter ? -0.05 : 0;
    const targetTiltY = rotY + (isCenter && isHoveredCenter ? -0.07 : 0);
    const targetLift = y + (isCenter && isHoveredCenter ? 0.04 : 0);

    const damp = Math.min(1, delta * 14);
    groupRef.current.position.x = THREE.MathUtils.lerp(groupRef.current.position.x, x, damp);
    groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, targetLift, damp);
    groupRef.current.position.z = THREE.MathUtils.lerp(groupRef.current.position.z, z, damp);

    groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, targetTiltX, damp);
    groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetTiltY, damp);
    groupRef.current.scale.setScalar(
      THREE.MathUtils.lerp(groupRef.current.scale.x, scale * (1 + centerWeight * 0.02), damp)
    );
  });

  const handleClick = (e: ThreeEvent<MouseEvent>) => {
    e.stopPropagation();
    onSelect(index);
  };

  const handlePointerOver = (e: ThreeEvent<PointerEvent>) => {
    e.stopPropagation();
    document.body.style.cursor = "pointer";
    if (index === activeIndex) {
      onHoverCenter(true);
    }
  };

  const handlePointerOut = () => {
    document.body.style.cursor = "grab";
    if (index === activeIndex) {
      onHoverCenter(false);
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
 * Floating 3D Mini Vinyl / CD Disc with Hollow Center Spindle Hole
 * Floats CLEANLY in front of the right edge of the active cover (z = +0.76 > cover front +0.60)
 * and cleanly to the left of the right spine stack (rightmost edge +1.76 < stack +2.04) -> ZERO CLIPPING!
 */
function FloatingVinylDisc({
  activeRelease,
  posterImg,
  useOfficialPosters,
  scrollRef,
  activeIndex,
  isHoveredCenter,
  onHoverCenter,
  onTriggerDive,
  diveGroupRef,
  spinBoostRef
}: {
  activeRelease: AnimeRelease;
  posterImg?: HTMLImageElement;
  useOfficialPosters: boolean;
  scrollRef: React.MutableRefObject<number>;
  activeIndex: number;
  isHoveredCenter: boolean;
  onHoverCenter: (hovered: boolean) => void;
  onTriggerDive: () => void;
  diveGroupRef: React.RefObject<THREE.Group>;
  spinBoostRef: React.MutableRefObject<number>;
}) {
  const spinMeshRef = useRef<THREE.Mesh>(null);
  const discMatRef = useRef<THREE.MeshStandardMaterial>(null);

  const outerRadius = 0.72;
  const innerRadius = 0.095;
  const discGeometry = useMemo(
    () => createHollowDiscGeometry(innerRadius, outerRadius, 96),
    [innerRadius, outerRadius]
  );
  const discTexture = useMemo(
    () => getVinylDiscTexture(activeRelease, useOfficialPosters ? posterImg : null),
    [activeRelease, useOfficialPosters, posterImg]
  );

  useFrame((_, delta) => {
    if (spinMeshRef.current) {
      const baseSpeed = isHoveredCenter ? 3.2 : 1.15;
      const totalSpeed = baseSpeed + spinBoostRef.current;
      spinMeshRef.current.rotation.z -= delta * totalSpeed;
    }

    if (diveGroupRef.current && diveGroupRef.current.userData.isDiving !== true) {
      // Smoothly tuck in & fade during scrubbing so disc NEVER collides with rotating sleeves
      const settleDiff = Math.abs(activeIndex - scrollRef.current);
      const visibilityFactor = Math.max(0, 1 - settleDiff * 2.2);

      const targetX = isHoveredCenter ? 1.04 : 0.88;
      const targetY = 0.72 + Math.sin(performance.now() * 0.0024) * 0.022;
      const targetZ = isHoveredCenter ? 0.82 : 0.76; // Cleanly IN FRONT of active cover front face (+0.60)
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
      diveGroupRef.current.visible = visibilityFactor > 0.02;
    } else if (diveGroupRef.current && discMatRef.current) {
      diveGroupRef.current.visible = true;
      discMatRef.current.opacity = 1;
    }
  });

  return (
    <group ref={diveGroupRef} position={[0.88, 0.72, 0.76]}>
      {/* Main Vinyl Face with True Hollow Center Spindle Hole */}
      <mesh
        ref={spinMeshRef}
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

      {/* Subtle 3D Outer Rim Edge Ring */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[outerRadius, outerRadius, 0.022, 96, 1, true]} />
        <meshStandardMaterial color="#1B1B1A" metalness={0.5} roughness={0.35} side={THREE.DoubleSide} />
      </mesh>

      {/* Precision Inner Metallic Spindle Collar around the Hollow Hole */}
      <mesh>
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
  onSelectIndex,
  onTriggerDive,
  diveState,
  onDiveInComplete,
  onDiveOutComplete,
  onDiveVeilChange,
  useOfficialPosters,
  loadedPosterImages
}: TurntableSceneProps) {
  const { camera, size } = useThree();
  const scrollRef = useRef<number>(activeIndex);
  const velocityRef = useRef<number>(0);
  const sleevesGroupRef = useRef<THREE.Group>(null);
  const diveDiscGroupRef = useRef<THREE.Group>(null);
  const spinBoostRef = useRef<number>(0);
  const [isHoveredCenter, setIsHoveredCenter] = useState(false);

  const baseCameraZ = useMemo(() => {
    if (size.width < 640) return 9.1;
    if (size.width < 1024) return 7.75;
    return 6.85;
  }, [size.width]);

  useEffect(() => {
    if (diveState === "shelf") {
      const persp = camera as THREE.PerspectiveCamera;
      persp.fov = 33;
      persp.updateProjectionMatrix();
      camera.position.set(0, 0.72, baseCameraZ);
      camera.lookAt(0, 0.24, 0);
    }
  }, [baseCameraZ, camera, diveState]);

  // Smooth spring physics driving scrollRef toward activeIndex
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

    const animState = {
      fov: persp.fov,
      veil: 0,
      lookY: 0.24
    };

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
      animState.lookY = 0.24;

      const tl = gsap.timeline({
        onUpdate: syncCamera,
        onComplete: () => {
          onDiveVeilChange?.(0);
          onDiveInComplete();
        }
      });

      // Stage 1 (0.00s - 0.44s): Shelf gently recedes; vinyl disc sweeps to center, scales up & locks parallel
      tl.to(
        shelfGroup.position,
        { z: -1.45, y: -0.22, duration: 0.48, ease: "power3.inOut" },
        0
      );
      tl.to(
        discGroup.position,
        { x: 0, y: 0.72, z: 2.28, duration: 0.46, ease: "expo.out" },
        0
      );
      tl.to(
        discGroup.rotation,
        { x: 0, y: 0, z: 0, duration: 0.44, ease: "power3.out" },
        0
      );
      tl.to(
        discGroup.scale,
        { x: 2.15, y: 2.15, z: 2.15, duration: 0.48, ease: "expo.out" },
        0
      );
      tl.to(spinBoostRef, { current: 6.2, duration: 0.55, ease: "power2.in" }, 0);

      // Subtle camera anticipation pullback & target lock onto hollow center spindle hole (y = 0.72)
      tl.to(animState, { lookY: 0.72, duration: 0.36, ease: "power2.out" }, 0);
      tl.to(
        camera.position,
        { x: 0, y: 0.72, z: baseCameraZ + 0.32, duration: 0.3, ease: "power2.out" },
        0
      );

      // Stage 2 (0.34s - 0.96s): Dynamic FOV warp + acceleration straight THROUGH the hollow spindle hole!
      tl.to(
        camera.position,
        { x: 0, y: 0.72, z: 2.04, duration: 0.62, ease: "power4.in" },
        0.34
      );
      tl.to(animState, { fov: 54, duration: 0.34, ease: "power2.in" }, 0.34);
      tl.to(animState, { fov: 26, duration: 0.28, ease: "power3.out" }, 0.68);

      // Stage 3 (0.74s - 0.96s): Seamless studio veil crossfade as spindle hole fills screen
      tl.to(animState, { veil: 1, duration: 0.24, ease: "power2.in" }, 0.74);

      return () => {
        tl.kill();
      };
    }

    if (diveState === "diving-out") {
      discGroup.userData.isDiving = true;
      discGroup.position.set(0, 0.72, 2.28);
      discGroup.rotation.set(0, 0, 0);
      discGroup.scale.setScalar(2.15);
      shelfGroup.position.set(0, -0.22, -1.45);
      camera.position.set(0, 0.72, 2.04);

      animState.fov = 26;
      animState.veil = 1;
      animState.lookY = 0.72;
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

      // Lift studio veil immediately as we pull back out through the spinning spindle hole
      tl.to(animState, { veil: 0, duration: 0.24, ease: "power2.out" }, 0);
      tl.to(
        camera.position,
        { x: 0, y: 0.72, z: baseCameraZ, duration: 0.72, ease: "expo.out" },
        0.04
      );
      tl.to(animState, { fov: 46, duration: 0.24, ease: "power2.out" }, 0.04);
      tl.to(animState, { fov: 33, duration: 0.48, ease: "power3.out" }, 0.28);
      tl.to(animState, { lookY: 0.24, duration: 0.65, ease: "power3.out" }, 0.14);

      // Glide disc cleanly back into parked right-edge slot & bring shelf smoothly back forward
      tl.to(spinBoostRef, { current: 0, duration: 0.68, ease: "power3.out" }, 0.08);
      tl.to(
        discGroup.position,
        { x: 0.88, y: 0.72, z: 0.76, duration: 0.62, ease: "expo.inOut" },
        0.16
      );
      tl.to(
        discGroup.scale,
        { x: 0.94, y: 0.94, z: 0.94, duration: 0.62, ease: "expo.inOut" },
        0.16
      );
      tl.to(
        shelfGroup.position,
        { z: 0, y: 0, duration: 0.65, ease: "expo.out" },
        0.14
      );

      return () => {
        tl.kill();
      };
    }
  }, [diveState, camera, baseCameraZ, onDiveInComplete, onDiveOutComplete, onDiveVeilChange]);

  const activeRelease = releases[activeIndex] || releases[0];

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
      {/* Soft Gallery Studio Lighting */}
      <ambientLight intensity={1.4} color="#FAF9F5" />
      <directionalLight
        position={[4.5, 9.5, 7.5]}
        intensity={1.38}
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

      {/* Curved Perforated Brushed-Silver Turntable Platter Rim */}
      <PerforatedTurntablePlatter scrollRef={scrollRef} />

      {/* Accordion Spine-to-Cover 3D Shelf */}
      <group ref={sleevesGroupRef}>
        {releases.map((release, idx) => (
          <DigipakSleeveMesh
            key={release.id}
            release={release}
            index={idx}
            scrollRef={scrollRef}
            activeIndex={activeIndex}
            isHoveredCenter={isHoveredCenter}
            onHoverCenter={setIsHoveredCenter}
            onSelect={handleSleeveClick}
            useOfficialPosters={useOfficialPosters}
            posterImg={loadedPosterImages[release.id]}
          />
        ))}
      </group>

      {/* Non-Clipping Floating Mini Vinyl / CD Disc Overlapping Right Edge */}
      {activeRelease && (
        <FloatingVinylDisc
          activeRelease={activeRelease}
          posterImg={loadedPosterImages[activeRelease.id]}
          useOfficialPosters={useOfficialPosters}
          scrollRef={scrollRef}
          activeIndex={activeIndex}
          isHoveredCenter={isHoveredCenter}
          onHoverCenter={setIsHoveredCenter}
          onTriggerDive={onTriggerDive}
          diveGroupRef={diveDiscGroupRef}
          spinBoostRef={spinBoostRef}
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
        camera={{ position: [0, 0.72, 6.85], fov: 33, near: 0.04, far: 48 }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      >
        <ArchiveStageInner {...props} />
      </Canvas>
    </div>
  );
}
