"use client";

/**
 * Real WebGL centerpiece for the hero — two extruded, glass-like chevrons
 * (the brand's "crossing arrows" motif, in true 3D) with a soft particle
 * field behind them. Kept deliberately cheap: two low-poly extruded meshes
 * + drei's GPU-driven <Sparkles>, no per-particle JS math, so it stays
 * smooth on mid-range hardware while still being genuinely three-dimensional.
 */

import { Suspense, useMemo, useRef } from "react";
import dynamic from "next/dynamic";
import { Canvas, useFrame } from "@react-three/fiber";
import { Sparkles } from "@react-three/drei";
import * as THREE from "three";
import { useMotionValueEvent, type MotionValue } from "framer-motion";

// One ">" chevron outline, matching the isotipo's arrow-cross motif.
function buildChevronShape() {
  const h = 1;
  const apex = 1.15;
  const t = 0.46;
  const shape = new THREE.Shape();
  shape.moveTo(0, -h);
  shape.lineTo(apex, 0);
  shape.lineTo(0, h);
  shape.lineTo(0, h - t);
  shape.lineTo(apex - t * 1.35, 0);
  shape.lineTo(0, -h + t);
  shape.closePath();
  return shape;
}

function Chevron({
  position,
  splitRef,
  color,
  flip = false,
  reduceMotion
}: {
  position: [number, number, number];
  splitRef: React.MutableRefObject<number>;
  color: string;
  flip?: boolean;
  reduceMotion: boolean;
}) {
  const geometry = useMemo(() => {
    const shape = buildChevronShape();
    return new THREE.ExtrudeGeometry(shape, {
      depth: 0.32,
      bevelEnabled: true,
      bevelThickness: 0.035,
      bevelSize: 0.035,
      bevelSegments: 3
    });
  }, []);
  const ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!ref.current) return;
    const t = reduceMotion ? 0 : state.clock.elapsedTime;
    const idle = Math.sin(t * 0.25) * 0.05;
    const dir = flip ? -1 : 1;
    ref.current.rotation.y = dir * (0.18 + idle) + splitRef.current * dir;
    ref.current.position.x = position[0] - splitRef.current * dir * 0.9;
  });

  return (
    <mesh ref={ref} geometry={geometry} position={position} scale={flip ? [-1, 1, 1] : [1, 1, 1]}>
      <meshPhysicalMaterial
        color={color}
        metalness={0.35}
        roughness={0.22}
        clearcoat={0.7}
        clearcoatRoughness={0.2}
        emissive={color}
        emissiveIntensity={0.22}
      />
    </mesh>
  );
}

function PointerTilt({
  groupRef,
  reduceMotion
}: {
  groupRef: React.MutableRefObject<THREE.Group | null>;
  reduceMotion: boolean;
}) {
  useFrame((state) => {
    if (!groupRef.current || reduceMotion) return;
    const { pointer } = state;
    groupRef.current.rotation.x = THREE.MathUtils.lerp(
      groupRef.current.rotation.x,
      -pointer.y * 0.22,
      0.04
    );
    groupRef.current.rotation.z = THREE.MathUtils.lerp(
      groupRef.current.rotation.z,
      pointer.x * 0.08,
      0.04
    );
  });
  return null;
}

function Scene({
  progress,
  reduceMotion
}: {
  progress: MotionValue<number>;
  reduceMotion: boolean;
}) {
  const splitRef = useRef(0);
  useMotionValueEvent(progress, "change", (v) => {
    splitRef.current = v;
  });
  const groupRef = useRef<THREE.Group>(null);

  return (
    <>
      <ambientLight intensity={0.55} />
      <pointLight position={[-3, 2, 4]} intensity={22} color="#03E4DE" />
      <pointLight position={[3, -1, 3]} intensity={18} color="#8343F6" />
      <directionalLight position={[2, 4, 5]} intensity={0.55} />

      <group ref={groupRef}>
        <Chevron
          position={[-0.55, 0, 0]}
          splitRef={splitRef}
          color="#0fd9d1"
          reduceMotion={reduceMotion}
        />
        <Chevron
          position={[0.55, 0, 0]}
          splitRef={splitRef}
          color="#7a4bf0"
          flip
          reduceMotion={reduceMotion}
        />
      </group>
      <PointerTilt groupRef={groupRef} reduceMotion={reduceMotion} />

      {!reduceMotion && (
        <Sparkles
          count={90}
          scale={[6, 5, 3]}
          size={2.4}
          speed={0.28}
          color="#03E4DE"
          opacity={0.55}
        />
      )}
    </>
  );
}

function CanvasScene({
  progress,
  reduceMotion
}: {
  progress: MotionValue<number>;
  reduceMotion: boolean;
}) {
  return (
    <Canvas
      camera={{ position: [0, 0, 5.6], fov: 38 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      dpr={[1, 1.5]}
    >
      <Suspense fallback={null}>
        <Scene progress={progress} reduceMotion={reduceMotion} />
      </Suspense>
    </Canvas>
  );
}

// Client-only: WebGL can't run during Next.js static prerendering.
const CanvasSceneClient = dynamic<{ progress: MotionValue<number>; reduceMotion: boolean }>(
  () => Promise.resolve(CanvasScene),
  { ssr: false }
);

export function HeroArrows3D({
  progress,
  reduceMotion = false
}: {
  progress: MotionValue<number>;
  reduceMotion?: boolean;
}) {
  return (
    <div className="h-full w-full">
      <CanvasSceneClient progress={progress} reduceMotion={reduceMotion} />
    </div>
  );
}
