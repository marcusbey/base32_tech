"use client";

import { MeshTransmissionMaterial } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useScroll } from "framer-motion";
import { useMemo, useRef } from "react";
import * as THREE from "three";

interface FragmentProps {
  position: [number, number, number];
  rotation: [number, number, number];
  scale: [number, number, number];
  baseGeometry: THREE.BufferGeometry;
  scrollProgress: { get: () => number };
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
    if (!meshRef.current) return;

    const time = state.clock.getElapsedTime();
    const scroll = scrollProgress.get();

    const explosionFactor = scroll * 2;

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
      />
    </mesh>
  );
}

function Lighting() {
  const mainLightRef = useRef<THREE.DirectionalLight>(null);
  const yellowLightRef = useRef<THREE.SpotLight>(null);
  const { scrollYProgress } = useScroll();

  useFrame((state) => {
    if (!mainLightRef.current || !yellowLightRef.current) return;

    const time = state.clock.getElapsedTime();
    const scroll = scrollYProgress.get();

    mainLightRef.current.intensity = THREE.MathUtils.lerp(20, 10, scroll);
    mainLightRef.current.position.x = Math.sin(time * 0.2) * 3;
    mainLightRef.current.position.y = Math.cos(time * 0.2) * 3;

    yellowLightRef.current.position.x = -5 + Math.sin(time * 0.1) * 0.5;
    yellowLightRef.current.position.y = 5 + Math.cos(time * 0.1) * 0.5;
    yellowLightRef.current.intensity = 8 + Math.sin(time * 0.2) * 2;
  });

  return (
    <>
      <directionalLight
        ref={mainLightRef}
        position={[5, 5, 5]}
        intensity={20}
        color="#1e3a8a"
      />
      <spotLight
        ref={yellowLightRef}
        position={[-5, 5, 3]}
        intensity={8}
        angle={Math.PI / 4}
        penumbra={0.5}
        distance={20}
        color="#ffd700"
      />
      <ambientLight intensity={0.2} />
      <hemisphereLight intensity={0.3} color="#1e3a8a" groundColor="#000000" />
    </>
  );
}

function ExplodedGeodesic() {
  const { scrollYProgress } = useScroll();
  const baseGeometry = useMemo(() => new THREE.IcosahedronGeometry(1, 1), []);

  const fragments = useMemo(() => {
    const positions = baseGeometry.attributes.position;
    const fragments: Array<{
      position: [number, number, number];
      rotation: [number, number, number];
      scale: [number, number, number];
    }> = [];
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

export default function Scene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 45 }}
      gl={{
        antialias: true,
        alpha: true,
        powerPreference: "high-performance",
        stencil: false,
        depth: true,
      }}
    >
      <ExplodedGeodesic />
    </Canvas>
  );
}
