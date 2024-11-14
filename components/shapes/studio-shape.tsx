"use client";

import { Environment, MeshTransmissionMaterial } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useScroll } from "framer-motion";
import dynamic from "next/dynamic";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";

const StudioShapeContent = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  const spotLightRef = useRef<THREE.SpotLight>(null);
  const haloLightRef = useRef<THREE.SpotLight>(null);
  const { scrollYProgress } = useScroll();
  const clock = useMemo(() => new THREE.Clock(), []);

  const geometry = useMemo(
    () => new THREE.TorusKnotGeometry(1.5, 0.6, 200, 64),
    []
  );

  useFrame(() => {
    if (!meshRef.current || !spotLightRef.current || !haloLightRef.current)
      return;

    const time = clock.getElapsedTime();
    const scroll = scrollYProgress.get();

    meshRef.current.position.y = THREE.MathUtils.lerp(
      meshRef.current.position.y,
      Math.sin(time * 0.5) * 0.2,
      0.1
    );
    meshRef.current.position.x = THREE.MathUtils.lerp(
      meshRef.current.position.x,
      Math.cos(time * 0.5) * 0.2,
      0.1
    );

    meshRef.current.rotation.x = THREE.MathUtils.lerp(
      meshRef.current.rotation.x,
      time * 0.1,
      0.1
    );
    meshRef.current.rotation.y = THREE.MathUtils.lerp(
      meshRef.current.rotation.y,
      time * 0.15,
      0.1
    );

    spotLightRef.current.intensity = THREE.MathUtils.lerp(
      spotLightRef.current.intensity,
      30 * (1 - scroll),
      0.1
    );
    haloLightRef.current.intensity = THREE.MathUtils.lerp(
      haloLightRef.current.intensity,
      50 * (1 - scroll),
      0.1
    );
  });

  useEffect(() => {
    return () => {
      if (geometry) geometry.dispose();
    };
  }, [geometry]);

  return (
    <>
      <mesh ref={meshRef} position={[0, 0, 0]} geometry={geometry}>
        <MeshTransmissionMaterial
          samples={32}
          resolution={512}
          thickness={2.5}
          roughness={0.02}
          clearcoat={1}
          clearcoatRoughness={0.02}
          transmission={0.98}
          ior={1.25}
          chromaticAberration={0.05}
          anisotropy={0.5}
          distortion={0.8}
          distortionScale={0.4}
          temporalDistortion={0.2}
          attenuationDistance={1.5}
          attenuationColor="#E3F2FD" // Light blue attenuation
          color="#BBE3FA" // Subtle blue base color
          backside={true}
          transparent={true}
          opacity={0.5}
          envMapIntensity={3}
        />
      </mesh>

      {/* Main front light - with blue tint */}
      <spotLight
        ref={spotLightRef}
        position={[0, 0, 8]}
        angle={Math.PI / 2}
        penumbra={1}
        intensity={30}
        distance={25}
        color="#E3F2FD"
      />

      {/* Back light - with blue tint */}
      <spotLight
        ref={haloLightRef}
        position={[0, 0, -12]}
        angle={Math.PI / 1.5}
        penumbra={1}
        intensity={50}
        distance={30}
        color="#E3F2FD"
      />

      {/* Accent lights with blue tints */}
      <pointLight position={[8, 3, 5]} intensity={15} color="#E3F2FD" />
      <pointLight position={[-8, -3, 5]} intensity={15} color="#BBDEFB" />
      <pointLight position={[3, 8, 5]} intensity={15} color="#90CAF9" />
      <pointLight position={[-3, -8, 5]} intensity={15} color="#64B5F6" />

      {/* Rim lights - stronger blue tint */}
      <pointLight position={[5, 0, -5]} intensity={10} color="#2196F3" />
      <pointLight position={[-5, 0, -5]} intensity={10} color="#1E88E5" />

      <Environment preset="dawn" background={false} />
    </>
  );
};

const StudioShapeCanvas = () => (
  <Canvas
    camera={{ position: [0, 0, 5], fov: 75 }}
    dpr={Math.min(window.devicePixelRatio * 0.75, 2)}
    performance={{ min: 0.5 }}
    gl={{
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
      stencil: false,
      depth: true,
    }}
  >
    <StudioShapeContent />
  </Canvas>
);

const StudioShape = dynamic(() => Promise.resolve(StudioShapeCanvas), {
  ssr: false,
});

export default function StudioShapeWrapper() {
  return (
    <div className="absolute inset-0 -z-10">
      <StudioShape />
    </div>
  );
}
