"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useScroll } from "framer-motion";
import { useRef } from "react";
import * as THREE from "three";

function Particles({ count = 100 }) {
  const mesh = useRef<THREE.Points>(null);
  const { scrollYProgress } = useScroll();

  // Create particles
  const particlesPosition = new Float32Array(count * 3);
  const particlesSpeeds = new Float32Array(count);

  for (let i = 0; i < count; i++) {
    const i3 = i * 3;
    // Create particles in a spherical distribution
    const radius = 2 + Math.random() * 2;
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.random() * Math.PI * 2;

    particlesPosition[i3] = radius * Math.sin(theta) * Math.cos(phi);
    particlesPosition[i3 + 1] = radius * Math.sin(theta) * Math.sin(phi);
    particlesPosition[i3 + 2] = radius * Math.cos(theta);

    // Random speeds for each particle
    particlesSpeeds[i] = Math.random() * 0.02;
  }

  useFrame((state) => {
    if (mesh.current) {
      const time = state.clock.getElapsedTime();
      const scroll = scrollYProgress.get();
      const positions = mesh.current.geometry.attributes.position
        .array as Float32Array;

      for (let i = 0; i < count; i++) {
        const i3 = i * 3;
        const speed = particlesSpeeds[i];

        // Orbital motion
        const x = positions[i3];
        const y = positions[i3 + 1];
        const z = positions[i3 + 2];

        const radius = Math.sqrt(x * x + y * y + z * z);
        const theta = Math.atan2(y, x) + speed * (1 - scroll);
        const phi = Math.acos(z / radius);

        positions[i3] = radius * Math.sin(phi) * Math.cos(theta);
        positions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
        positions[i3 + 2] = radius * Math.cos(phi);
      }

      mesh.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={particlesPosition}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.008}
        color="#4f46e5"
        transparent
        opacity={1}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
        sizeAttenuation={true}
      />
    </points>
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
      <Particles />
    </Canvas>
  );
}
