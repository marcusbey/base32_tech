"use client";

import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import { MeshDistortMaterial } from "@react-three/drei";

export default function TechShape() {
  const meshRef = useRef<THREE.Mesh>(null);
  
  // Create color array for smooth transitions
  const colors = useMemo(() => [
    new THREE.Color("#4F46E5"), // indigo
    new THREE.Color("#2563EB"), // blue
    new THREE.Color("#7C3AED"), // violet
  ], []);
  
  const colorIndices = useRef({ current: 0, next: 1 });
  const colorT = useRef(0);
  
  useFrame((state) => {
    if (!meshRef.current) return;
    
    const time = state.clock.getElapsedTime() * 0.5; // Slower animation for better performance
    
    // Smooth color transition
    colorT.current += 0.003;
    if (colorT.current >= 1) {
      colorT.current = 0;
      colorIndices.current = {
        current: (colorIndices.current.current + 1) % colors.length,
        next: (colorIndices.current.next + 1) % colors.length
      };
    }
    
    const currentCol = colors[colorIndices.current.current];
    const nextCol = colors[colorIndices.current.next];
    const lerpedColor = currentCol.clone().lerp(nextCol, colorT.current);
    
    if (meshRef.current.material) {
      (meshRef.current.material as THREE.Material).color = lerpedColor;
    }
    
    // Simple rotation and scale animation
    meshRef.current.rotation.x = Math.sin(time * 0.3) * 0.2;
    meshRef.current.rotation.y = time * 0.2;
    
    const scale = 1 + Math.sin(time * 0.5) * 0.1;
    meshRef.current.scale.setScalar(scale);
  });

  return (
    <mesh ref={meshRef} position={[0, 0, 0]}>
      <icosahedronGeometry args={[1, 1]} />
      <MeshDistortMaterial
        color={colors[0]}
        speed={2}
        distort={0.3}
        radius={1}
        transparent
        opacity={0.8}
      />
    </mesh>
  );
}
