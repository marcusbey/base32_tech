"use client";

import { MeshTransmissionMaterial } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { MotionValue, useScroll } from "framer-motion";
import { useMemo, useRef } from "react";
import * as THREE from "three";

interface FragmentProps {
  position: [number, number, number];
  rotation: [number, number, number];
  scale: [number, number, number];
  baseGeometry: THREE.BufferGeometry;
  scrollProgress: MotionValue<number>;
  index: number;
}

function Fragment({
  position,
  rotation,
  scale,
  baseGeometry,
  scrollProgress,
  index,
}: FragmentProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const initialPosition = useMemo(
    () => new THREE.Vector3(...position),
    [position]
  );
  const initialRotation = useMemo(
    () => new THREE.Euler(...rotation),
    [rotation]
  );

  useFrame((state) => {
    if (meshRef.current) {
      const time = state.clock.getElapsedTime();
      const scroll = scrollProgress.get();

      const explosionFactor = scroll * 2;
      const direction = initialPosition.clone().normalize();

      meshRef.current.position.copy(
        initialPosition.clone().multiplyScalar(1 + explosionFactor)
      );

      meshRef.current.rotation.x =
        initialRotation.x + time * 0.2 + scroll * Math.PI * 0.5;
      meshRef.current.rotation.y =
        initialRotation.y + time * 0.3 + scroll * Math.PI * 0.5;
      meshRef.current.rotation.z =
        initialRotation.z + time * 0.1 + scroll * Math.PI * 0.5;

      const pulseScale = 1 + Math.sin(time * 2 + index) * 0.05;
      meshRef.current.scale.set(
        scale[0] * pulseScale,
        scale[1] * pulseScale,
        scale[2] * pulseScale
      );
    }
  });

  return (
    <mesh
      ref={meshRef}
      position={position}
      rotation={rotation}
      scale={scale}
      geometry={baseGeometry}
    >
      <MeshTransmissionMaterial
        samples={4}
        thickness={0.5}
        chromaticAberration={0.2}
        distortion={0.2}
        temporalDistortion={0.1}
        transmission={0.95}
        ior={1.5}
        color="#1e3a8a"
        attenuationDistance={0.2}
        attenuationColor="#1e3a8a"
        // Removed unused or performance-heavy properties
      />
    </mesh>
  );
}

function Lighting() {
  const mainLightRef = useRef<THREE.DirectionalLight>(null);
  const yellowLightRef = useRef<THREE.SpotLight>(null);
  const { scrollYProgress } = useScroll();

  const targetPosition = useMemo(() => new THREE.Vector3(0, 0, 0), []);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    const scroll = scrollYProgress.get();

    if (mainLightRef.current) {
      // Reduced main light intensity
      mainLightRef.current.intensity = THREE.MathUtils.lerp(20, 10, scroll);
      mainLightRef.current.position.x = Math.sin(time * 0.2) * 3;
      mainLightRef.current.position.y = Math.cos(time * 0.2) * 3;
      mainLightRef.current.lookAt(targetPosition);
    }

    if (yellowLightRef.current) {
      // Animate yellow light subtly
      yellowLightRef.current.position.x = -5 + Math.sin(time * 0.1) * 0.5;
      yellowLightRef.current.position.y = 5 + Math.cos(time * 0.1) * 0.5;
      yellowLightRef.current.intensity = 8 + Math.sin(time * 0.2) * 2;
    }
  });

  return (
    <>
      {/* Main directional light with shadow - reduced intensity */}
      <directionalLight
        ref={mainLightRef}
        position={[5, 5, 5]}
        intensity={20}
        color="#1e3a8a"
        castShadow
      />

      {/* Yellow highlight light from top left */}
      <spotLight
        ref={yellowLightRef}
        position={[-5, 5, 3]}
        intensity={8}
        angle={Math.PI / 4}
        penumbra={0.5}
        distance={20}
        color="#ffd700"
      />

      {/* Ambient light - reduced intensity */}
      <ambientLight intensity={0.2} color="#ffffff" />

      {/* Hemisphere light - reduced intensity */}
      <hemisphereLight intensity={0.3} color="#1e3a8a" groundColor="#000000" />

      {/* Rim light - slightly reduced */}
      <spotLight
        position={[0, 0, -10]}
        intensity={12}
        angle={Math.PI / 3}
        penumbra={1}
        distance={20}
        color="#1e3a8a"
      />
    </>
  );
}

function ExplodedGeodesic() {
  const { scrollYProgress } = useScroll();
  const baseGeometry = useMemo(() => new THREE.IcosahedronGeometry(1, 1), []);

  const fragments = useMemo(() => {
    const positions = baseGeometry.attributes.position;
    const fragments = [];
    const faces = positions.count / 3;

    for (let i = 0; i < faces; i++) {
      const idx1 = i * 3;
      const idx2 = i * 3 + 1;
      const idx3 = i * 3 + 2;

      const v1 = new THREE.Vector3(
        positions.getX(idx1),
        positions.getY(idx1),
        positions.getZ(idx1)
      );
      const v2 = new THREE.Vector3(
        positions.getX(idx2),
        positions.getY(idx2),
        positions.getZ(idx2)
      );
      const v3 = new THREE.Vector3(
        positions.getX(idx3),
        positions.getY(idx3),
        positions.getZ(idx3)
      );

      const center = new THREE.Vector3()
        .add(v1)
        .add(v2)
        .add(v3)
        .divideScalar(3);
      const direction = center.clone().normalize();

      fragments.push({
        position: [direction.x * 0.8, direction.y * 0.8, direction.z * 0.8] as [
          number,
          number,
          number
        ],
        rotation: [
          Math.random() * Math.PI,
          Math.random() * Math.PI,
          Math.random() * Math.PI,
        ] as [number, number, number],
        scale: [0.4, 0.4, 0.1] as [number, number, number],
      });
    }

    return fragments;
  }, [baseGeometry]);

  return (
    <>
      <Lighting />
      {fragments.map((fragment, index) => (
        <Fragment
          key={index}
          {...fragment}
          baseGeometry={baseGeometry}
          scrollProgress={scrollYProgress}
          index={index}
        />
      ))}
    </>
  );
}

export default function TechShape() {
  return (
    <div className="fixed inset-0 pointer-events-none shape-layer flex items-center justify-center">
      <div className="w-full h-full max-w-[800px] max-h-[800px]">
        <Canvas
          camera={{ position: [0, 0, 5], fov: 45 }}
          dpr={[1, 2]} // Limit maximum pixel ratio for performance
        >
          <ExplodedGeodesic />
        </Canvas>
      </div>
    </div>
  );
}
