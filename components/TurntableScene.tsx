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
  useOfficialPosters: boolean;
  loadedPosterImages: Record<string, HTMLImageElement>;
}

/**
 * Computes the continuous Accordion Spine-to-Cover 3D position and rotation
 * for sleeve at relative offset `d = index - scrollPos`.
 */
function computeAccordionTransform(d: number) {
  const absD = Math.abs(d);
  // Gaussian bell weight: 1.0 at d=0 (center face-forward sleeve), ~0 for |d| >= 1 (side spine stacks)
  const centerWeight = Math.exp(-(d * d) / 0.14);

  const spinePitch = 0.285;
  const leftStackAnchor = -1.72;
  const rightStackAnchor = 1.92; // Parted wider on right to frame the protruding floating mini vinyl disc
  const centerAnchor = -0.16;

  let x = 0;
  if (d <= -1) {
    x = leftStackAnchor + (d + 1) * spinePitch;
  } else if (d >= 1) {
    x = rightStackAnchor + (d - 1) * spinePitch;
  } else if (d < 0) {
    // Smooth cubic ease from leftStackAnchor (-1.72) at d=-1 to centerAnchor (-0.16) at d=0
    const t = d + 1; // 0..1
    const smooth = t * t * (3 - 2 * t);
    x = leftStackAnchor + (centerAnchor - leftStackAnchor) * smooth;
  } else {
    // Smooth cubic ease from centerAnchor (-0.16) at d=0 to rightStackAnchor (+1.92) at d=+1
    const t = d; // 0..1
    const smooth = t * t * (3 - 2 * t);
    x = centerAnchor + (rightStackAnchor - centerAnchor) * smooth;
  }

  // Rotation around Y:
  // d = 0 -> 0 rad (front cover faces camera)
  // |d| >= 1 -> +PI/2 rad (90 deg sideways so -X spine face points toward camera) + subtle radial curve
  const spineBaseAngle = Math.PI / 2;
  const radialFan = -d * 0.026;
  const rotY = (1 - centerWeight) * (spineBaseAngle + radialFan);

  // Follow the gentle curve of the turntable platter arc in Z
  const platterCurveZ = -0.048 * (x * x);
  const activeStepForwardZ = 0.42 * centerWeight;
  const z = platterCurveZ + activeStepForwardZ;

  // Slight vertical lift for the active face-forward sleeve
  const y = 0.42 + 0.05 * centerWeight;

  // Visibility falloff so the shelf maintains a crisp 17-case physical stack on the platter arc
  // (8 left spines + 1 center active cover + 8 right spines = 17 physical sleeves)
  const visibleWindow = 8.6;
  const scale = absD > visibleWindow ? Math.max(0.001, 1 - (absD - visibleWindow) * 1.4) : 1;

  return { x, y, z, rotY, centerWeight, scale, isVisible: absD < 9.3 };
}

/**
 * Creates a circular ring geometry with planar UV mapping (0..1 across diameter)
 * so our 1024x1024 procedural vinyl disc texture maps accurately with a true hollow center spindle hole.
 */
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
 * Curved Perforated Brushed-Metal Turntable Platter Rim
 */
function PerforatedTurntablePlatter({ scrollRef }: { scrollRef: React.MutableRefObject<number> }) {
  const platterGroupRef = useRef<THREE.Group>(null);

  // Generate 136 repeating rectangular strobe slot transforms around the front bevel of the platter rim
  const strobeSlots = useMemo(() => {
    const count = 136;
    const radius = 10.74;
    const items: { pos: [number, number, number]; rotY: number }[] = [];
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2;
      const x = Math.sin(angle) * radius;
      const z = Math.cos(angle) * radius;
      items.push({
        pos: [x, -0.02, z],
        rotY: angle
      });
    }
    return items;
  }, []);

  useFrame((_, delta) => {
    if (!platterGroupRef.current) return;
    // Subtle continuous platter strobe drift + mechanical response to shelf scrubbing
    platterGroupRef.current.rotation.y =
      -scrollRef.current * 0.045 + performance.now() * 0.000035;
  });

  return (
    <group position={[0, -0.96, -8.35]}>
      <group ref={platterGroupRef}>
        {/* Outer Brushed Silver-Steel Beveled Platter Rim (#B8B9B4) */}
        <mesh receiveShadow castShadow position={[0, -0.06, 0]}>
          <cylinderGeometry args={[10.42, 11.02, 0.46, 128]} />
          <meshStandardMaterial
            color="#B8B9B4"
            metalness={0.62}
            roughness={0.34}
          />
        </mesh>

        {/* Lower Machined Aluminum Lip */}
        <mesh receiveShadow position={[0, -0.34, 0]}>
          <cylinderGeometry args={[11.02, 10.88, 0.14, 128]} />
          <meshStandardMaterial
            color="#9E9F9A"
            metalness={0.7}
            roughness={0.28}
          />
        </mesh>

        {/* Repeating Rectangular Perforated Strobe Slots along the Front Bevel */}
        {strobeSlots.map((slot, idx) => (
          <group key={idx} position={slot.pos} rotation={[0, slot.rotY, 0]}>
            <mesh rotation={[-0.52, 0, 0]}>
              <boxGeometry args={[0.25, 0.21, 0.07]} />
              <meshStandardMaterial
                color="#181818"
                metalness={0.2}
                roughness={0.85}
              />
            </mesh>
          </group>
        ))}

        {/* Precision Metallic Inner Lip Ring */}
        <mesh receiveShadow position={[0, 0.18, 0]}>
          <cylinderGeometry args={[10.36, 10.42, 0.05, 128]} />
          <meshStandardMaterial
            color="#D0D1CC"
            metalness={0.75}
            roughness={0.22}
          />
        </mesh>

        {/* Dark Charcoal Rubber / Felt Platter Mat Surface */}
        <mesh receiveShadow position={[0, 0.21, 0]}>
          <cylinderGeometry args={[10.22, 10.28, 0.05, 128]} />
          <meshStandardMaterial
            color="#232321"
            metalness={0.08}
            roughness={0.88}
          />
        </mesh>

        {/* Subtle Concentric Turntable Mat Groove Rings */}
        {[8.8, 9.4, 9.95].map((r, idx) => (
          <mesh key={idx} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.238, 0]}>
            <ringGeometry args={[r - 0.015, r, 128]} />
            <meshBasicMaterial color="#3A3A37" transparent opacity={0.55} />
          </mesh>
        ))}
      </group>
    </group>
  );
}

/**
 * Individual Physical Digipak / Jewel Case Sleeve in the 3D Accordion Shelf
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
  const meshRef = useRef<THREE.Mesh>(null);

  const spineTex = useMemo(() => getSpineTexture(release), [release]);
  const frontTex = useMemo(
    () => getFrontCoverTexture(release, useOfficialPosters ? posterImg : null),
    [release, useOfficialPosters, posterImg]
  );
  const backTex = useMemo(() => getBackCoverTexture(release), [release]);

  // 6-face BoxGeometry materials: [+X right, -X spine, +Y top, -Y bottom, +Z front cover, -Z back cover]
  const materials = useMemo(() => {
    const spineMat = new THREE.MeshStandardMaterial({
      map: spineTex,
      roughness: 0.42,
      metalness: 0.04
    });
    const frontMat = new THREE.MeshStandardMaterial({
      map: frontTex,
      roughness: 0.36,
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
    const targetTiltX = isCenter && isHoveredCenter ? -0.055 : 0;
    const targetTiltY = rotY + (isCenter && isHoveredCenter ? -0.08 : 0);
    const targetLift = y + (isCenter && isHoveredCenter ? 0.045 : 0);

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
        ref={meshRef}
        material={materials}
        castShadow
        receiveShadow
        onClick={handleClick}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
      >
        {/* Physical Digipak Sleeve: Width 2.32, Height 2.32, Spine Thickness 0.235 */}
        <boxGeometry args={[2.32, 2.32, 0.235]} />
      </mesh>
    </group>
  );
}

/**
 * Floating Mini Vinyl / CD Disc overlapping the right edge of the active center sleeve,
 * with a true hollow center spindle hole for the GSAP camera dive transition.
 */
function FloatingVinylDisc({
  activeRelease,
  scrollRef,
  activeIndex,
  isHoveredCenter,
  onHoverCenter,
  onTriggerDive,
  diveGroupRef
}: {
  activeRelease: AnimeRelease;
  scrollRef: React.MutableRefObject<number>;
  activeIndex: number;
  isHoveredCenter: boolean;
  onHoverCenter: (hovered: boolean) => void;
  onTriggerDive: () => void;
  diveGroupRef: React.RefObject<THREE.Group>;
}) {
  const spinMeshRef = useRef<THREE.Mesh>(null);
  const discGeometry = useMemo(() => createHollowDiscGeometry(0.088, 0.96, 96), []);
  const discTexture = useMemo(() => getVinylDiscTexture(activeRelease), [activeRelease]);

  useFrame((_, delta) => {
    if (spinMeshRef.current) {
      // Hovering the active sleeve/disc increases spin speed
      const spinSpeed = isHoveredCenter ? 3.2 : 1.15;
      spinMeshRef.current.rotation.z -= delta * spinSpeed;
    }

    if (diveGroupRef.current && diveGroupRef.current.userData.isDiving !== true) {
      // Follow the active sleeve settle state
      const settleDiff = Math.abs(activeIndex - scrollRef.current);
      const visibilityFactor = Math.max(0, 1 - settleDiff * 1.35);

      // Base position overlapping the right edge of the face-forward active sleeve
      const targetX = isHoveredCenter ? 1.16 : 0.98;
      const targetY = 0.45 + Math.sin(performance.now() * 0.0024) * 0.025;
      const targetZ = 0.34;
      const targetRotY = isHoveredCenter ? -0.14 : -0.06;

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

      const targetScale = 0.88 * (0.4 + 0.6 * visibilityFactor);
      diveGroupRef.current.scale.setScalar(
        THREE.MathUtils.lerp(diveGroupRef.current.scale.x, targetScale, damp)
      );
    }
  });

  return (
    <group ref={diveGroupRef} position={[0.98, 0.45, 0.34]}>
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
          map={discTexture}
          roughness={0.24}
          metalness={0.35}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Precision Inner Metallic Spindle Rim around the hollow center hole (r = 0.088) */}
      <mesh>
        <ringGeometry args={[0.086, 0.106, 64]} />
        <meshStandardMaterial
          color="#D2D2CF"
          metalness={0.85}
          roughness={0.2}
          side={THREE.DoubleSide}
        />
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
  useOfficialPosters,
  loadedPosterImages
}: TurntableSceneProps) {
  const { camera, size } = useThree();
  const scrollRef = useRef<number>(activeIndex);
  const velocityRef = useRef<number>(0);
  const diveDiscGroupRef = useRef<THREE.Group>(null);
  const [isHoveredCenter, setIsHoveredCenter] = useState(false);

  // Responsive camera FOV / Z distance for mobile and desktop viewports
  const baseCameraZ = useMemo(() => {
    if (size.width < 640) return 8.2;
    if (size.width < 1024) return 7.1;
    return 6.35;
  }, [size.width]);

  useEffect(() => {
    if (diveState === "shelf") {
      camera.position.set(0, 0.58, baseCameraZ);
      camera.lookAt(0, 0.36, 0);
    }
  }, [baseCameraZ, camera, diveState]);

  // Smooth spring physics driving scrollRef toward activeIndex
  useFrame((_, delta) => {
    const dt = Math.min(0.05, delta);
    const stiffness = 115;
    const damping = 18;
    const displacement = activeIndex - scrollRef.current;
    const springForce = displacement * stiffness - velocityRef.current * damping;
    velocityRef.current += springForce * dt;
    scrollRef.current += velocityRef.current * dt;
  });

  // Signature Multi-Stage GSAP Spindle-Hole Camera Dive Timeline
  useEffect(() => {
    const discGroup = diveDiscGroupRef.current;
    if (!discGroup) return;

    if (diveState === "diving-in") {
      discGroup.userData.isDiving = true;

      const tl = gsap.timeline({
        onComplete: () => {
          onDiveInComplete();
        }
      });

      // Stage 1: Floating disc centers itself, scales up, and aligns parallel to the camera
      tl.to(
        discGroup.position,
        {
          x: 0,
          y: 0.48,
          z: 1.65,
          duration: 0.46,
          ease: "power3.out"
        },
        0
      );
      tl.to(
        discGroup.rotation,
        {
          x: 0,
          y: 0,
          z: 0,
          duration: 0.42,
          ease: "power2.out"
        },
        0
      );
      tl.to(
        discGroup.scale,
        {
          x: 1.75,
          y: 1.75,
          z: 1.75,
          duration: 0.48,
          ease: "power3.out"
        },
        0
      );

      // Stage 2: Camera aligns with center spindle hole (0, 0.48) and dives straight through z = 1.65
      tl.to(
        camera.position,
        {
          x: 0,
          y: 0.48,
          z: 1.48,
          duration: 0.58,
          ease: "power3.in"
        },
        0.38
      );

      return () => {
        tl.kill();
      };
    }

    if (diveState === "diving-out") {
      discGroup.userData.isDiving = true;
      discGroup.position.set(0, 0.48, 1.65);
      discGroup.scale.setScalar(1.75);
      camera.position.set(0, 0.48, 1.48);

      const tl = gsap.timeline({
        onComplete: () => {
          discGroup.userData.isDiving = false;
          onDiveOutComplete();
        }
      });

      // Reverse camera dive back out through the spindle hole
      tl.to(
        camera.position,
        {
          x: 0,
          y: 0.58,
          z: baseCameraZ,
          duration: 0.62,
          ease: "power3.out"
        },
        0
      );

      tl.to(
        discGroup.position,
        {
          x: 0.98,
          y: 0.45,
          z: 0.34,
          duration: 0.58,
          ease: "power3.inOut"
        },
        0.22
      );

      tl.to(
        discGroup.scale,
        {
          x: 0.88,
          y: 0.88,
          z: 0.88,
          duration: 0.58,
          ease: "power3.inOut"
        },
        0.22
      );

      return () => {
        tl.kill();
      };
    }
  }, [diveState, camera, baseCameraZ, onDiveInComplete, onDiveOutComplete]);

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
      <ambientLight intensity={1.35} color="#FAF9F5" />
      <directionalLight
        position={[4.5, 8.5, 6.5]}
        intensity={1.45}
        color="#FFFDF9"
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-near={1}
        shadow-camera-far={25}
        shadow-camera-left={-7}
        shadow-camera-right={7}
        shadow-camera-top={5}
        shadow-camera-bottom={-5}
        shadow-bias={-0.0005}
      />
      <directionalLight position={[-6, 4, 3]} intensity={0.55} color="#E6E7E2" />
      <pointLight position={[0, 2.2, 3.2]} intensity={0.4} color="#FFFFFF" />

      {/* Curved Perforated Brushed-Metal Turntable Platter Rim */}
      <PerforatedTurntablePlatter scrollRef={scrollRef} />

      {/* Subtle Soft Contact Shadow Strip on the Platter Surface */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.715, -0.1]}>
        <planeGeometry args={[9.5, 3.4]} />
        <meshBasicMaterial color="#141413" transparent opacity={0.18} />
      </mesh>

      {/* Accordion Spine-to-Cover 3D Shelf */}
      <group>
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

      {/* Floating Mini Vinyl / CD Disc Overlapping Right Edge of Active Center Sleeve */}
      {activeRelease && (
        <FloatingVinylDisc
          activeRelease={activeRelease}
          scrollRef={scrollRef}
          activeIndex={activeIndex}
          isHoveredCenter={isHoveredCenter}
          onHoverCenter={setIsHoveredCenter}
          onTriggerDive={onTriggerDive}
          diveGroupRef={diveDiscGroupRef}
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
    const stepOffset = Math.round(-dx / 68);
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
        camera={{ position: [0, 0.58, 6.35], fov: 34, near: 0.04, far: 45 }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      >
        <ArchiveStageInner {...props} />
      </Canvas>
    </div>
  );
}
