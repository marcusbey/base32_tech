'use client';

import { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, MeshTransmissionMaterial, Environment } from '@react-three/drei';
import { useCompany } from '@/lib/company-context';

function TechShape({ scrollProgress }: { scrollProgress: number }) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.1;
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.15;

      const radius = 0.5 + scrollProgress * 0.25;
      const tube = 0.2 + Math.sin(scrollProgress * Math.PI) * 0.1;
      const tubularSegments = Math.floor(128 + scrollProgress * 128);
      const radialSegments = Math.floor(32 + scrollProgress * 32);

      if (meshRef.current.geometry instanceof THREE.TorusKnotGeometry) {
        meshRef.current.geometry.dispose();
        meshRef.current.geometry = new THREE.TorusKnotGeometry(
          radius,
          tube,
          tubularSegments,
          radialSegments
        );
      }

      const baseScale = 2 + Math.sin(state.clock.getElapsedTime()) * 0.1;
      meshRef.current.scale.set(baseScale, baseScale, baseScale);
    }
  });

  return (
    <mesh ref={meshRef} position={[0, 0, 0]}>
      <torusKnotGeometry args={[0.5, 0.2, 256, 64]} />
      <meshStandardMaterial
        color="#00ff88"
        emissive="#00ff88"
        emissiveIntensity={0.5}
        metalness={0.8}
        roughness={0.2}
        wireframe={true}
      />
    </mesh>
  );
}

function StudioShape({ scrollProgress }: { scrollProgress: number }) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.1;
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.15;

      const radius = 0.5 + scrollProgress * 0.25;
      const tube = 0.2 + Math.sin(scrollProgress * Math.PI) * 0.1;
      const tubularSegments = Math.floor(128 + scrollProgress * 128);
      const radialSegments = Math.floor(32 + scrollProgress * 32);

      if (meshRef.current.geometry instanceof THREE.TorusKnotGeometry) {
        meshRef.current.geometry.dispose();
        meshRef.current.geometry = new THREE.TorusKnotGeometry(
          radius,
          tube,
          tubularSegments,
          radialSegments
        );
      }

      const baseScale = 1 + Math.sin(state.clock.getElapsedTime()) * 0.1;
      meshRef.current.scale.set(baseScale, baseScale, baseScale);
    }
  });

  return (
    <mesh ref={meshRef} position={[0, 0, 0]}>
      <torusKnotGeometry args={[0.5, 0.2, 256, 64]} />
      <MeshTransmissionMaterial
        samples={16}
        resolution={512}
        transmission={1}
        roughness={0}
        clearcoat={1}
        clearcoatRoughness={0}
        thickness={0.1}
        chromaticAberration={0.2}
        anisotropy={0.2}
        temporalDistortion={0.1}
        distortion={0.4}
        distortionScale={0.6}
        ior={1.5}
        color="#ffffff"
        transparent={true}
        opacity={0.8}
        reflectivity={0.5}
        iridescence={0.3}
        iridescenceIOR={1.5}
        iridescenceThicknessRange={[0, 400]}
      />
    </mesh>
  );
}

export default function BackgroundEffects() {
  const { company } = useCompany();
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      const currentScroll = window.scrollY;
      setScrollProgress(Math.min(currentScroll / totalScroll, 1));
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 10], fov: 50 }}
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          opacity: company === 'tech' ? 0.7 : 0.9,
        }}
      >
        <Environment preset="studio" intensity={5} />
        <ambientLight intensity={2} />
        <pointLight position={[10, 10, 10]} intensity={4} color="#fff" />
        <pointLight position={[-10, -10, -10]} intensity={2} color="#fff" />
        <pointLight position={[0, 0, 5]} intensity={3} color="#fff" />
        <pointLight position={[0, 5, 0]} intensity={3} color="#fff" />
        <pointLight position={[5, 0, 0]} intensity={3} color="#fff" />
        <spotLight
          position={[0, 10, 0]}
          angle={0.5}
          penumbra={1}
          intensity={4}
          color="#fff"
        />
        <spotLight
          position={[0, -10, 0]}
          angle={0.5}
          penumbra={1}
          intensity={3}
          color="#fff"
        />
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={0.5}
        />
        {company === 'tech' ? (
          <TechShape scrollProgress={scrollProgress} />
        ) : (
          <StudioShape scrollProgress={scrollProgress} />
        )}
      </Canvas>
    </div>
  );
}