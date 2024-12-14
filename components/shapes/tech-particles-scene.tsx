'use client';

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function Scene() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!containerRef.current) return;

    // Setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ 
      alpha: true,
      antialias: true 
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    containerRef.current.appendChild(renderer.domElement);

    // Add ambient light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    // Add point light
    const pointLight = new THREE.PointLight(0xfbbf24, 1, 100);
    pointLight.position.set(2, 2, 2);
    scene.add(pointLight);

    // Create particles
    const particleCount = 200;
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const sizes = new Float32Array(particleCount);

    const color = new THREE.Color(0xfbbf24);
    const geometry = new THREE.BufferGeometry();

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      const size = 2;

      // Position
      positions[i3] = (Math.random() - 0.5) * size;
      positions[i3 + 1] = (Math.random() - 0.5) * size;
      positions[i3 + 2] = (Math.random() - 0.5) * size;

      // Color with slight variation
      const hue = (color.getHSL({ h: 0, s: 0, l: 0 }).h + Math.random() * 0.1) % 1;
      const particleColor = new THREE.Color().setHSL(hue, 0.8, 0.6);
      colors[i3] = particleColor.r;
      colors[i3 + 1] = particleColor.g;
      colors[i3 + 2] = particleColor.b;

      // Size with variation
      sizes[i] = Math.random() * 0.03 + 0.01;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

    // Create a circular texture programmatically
    const canvas = document.createElement('canvas');
    canvas.width = 64;
    canvas.height = 64;
    const ctx = canvas.getContext('2d')!;
    
    // Create a radial gradient
    const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
    gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
    gradient.addColorStop(0.5, 'rgba(255, 255, 255, 0.5)');
    gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
    
    // Draw the circle
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 64, 64);
    
    // Create texture from canvas
    const circleTexture = new THREE.CanvasTexture(canvas);

    // Custom shader material for circular particles with glow
    const material = new THREE.ShaderMaterial({
      uniforms: {
        pointTexture: { value: circleTexture },
        time: { value: 0 }
      },
      vertexShader: `
        attribute float size;
        varying vec3 vColor;
        void main() {
          vColor = color;
          vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
          gl_PointSize = size * (300.0 / -mvPosition.z);
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        uniform sampler2D pointTexture;
        varying vec3 vColor;
        void main() {
          gl_FragColor = vec4(vColor, 1.0) * texture2D(pointTexture, gl_PointCoord);
        }
      `,
      transparent: true,
      vertexColors: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending
    });

    const points = new THREE.Points(geometry, material);
    scene.add(points);
    camera.position.z = 3;

    // Animation
    const clock = new THREE.Clock();
    
    function animate() {
      requestAnimationFrame(animate);
      
      const time = clock.getElapsedTime();
      material.uniforms.time.value = time;
      
      points.rotation.x = Math.sin(time * 0.3) * 0.2;
      points.rotation.y = Math.cos(time * 0.2) * 0.3;
      
      renderer.render(scene, camera);
    }

    // Handle resize
    function handleResize() {
      const width = window.innerWidth;
      const height = window.innerHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    }

    window.addEventListener('resize', handleResize);
    animate();

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      geometry.dispose();
      material.dispose();
      circleTexture.dispose();
      renderer.dispose();
      if (containerRef.current?.contains(renderer.domElement)) {
        containerRef.current.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div ref={containerRef} style={{ width: '100%', height: '100%', position: 'absolute' }} />;
}
