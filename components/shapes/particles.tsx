"use client";

import React, { useEffect, useRef, useState } from "react";

interface MousePosition {
  x: number;
  y: number;
}

function useMousePosition(): MousePosition {
  const [mousePosition, setMousePosition] = useState<MousePosition>({
    x: 0,
    y: 0,
  });

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      setMousePosition({ x: event.clientX, y: event.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return mousePosition;
}

interface ParticlesProps {
  className?: string;
  quantity?: number;
  staticity?: number;
  ease?: number;
  size?: number;
  color?: string;
  mouseForce?: number;
  isStudio?: boolean;
}

interface Particle {
  x: number;
  y: number;
  translateX: number;
  translateY: number;
  size: number;
  alpha: number;
  targetAlpha: number;
  dx: number;
  dy: number;
  magnetism: number;
}

export default function Particles({
  className = "",
  quantity = 100,
  staticity = 50,
  ease = 50,
  size = 1,
  color = "#fbbf24",
  mouseForce = 1,
  isStudio = false,
}: ParticlesProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const context = useRef<CanvasRenderingContext2D | null>(null);
  const particles = useRef<Particle[]>([]);
  const mousePosition = useMousePosition();
  const mouse = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const canvasSize = useRef<{ w: number; h: number }>({ w: 0, h: 0 });
  const dpr = typeof window !== "undefined" ? window.devicePixelRatio : 1;

  useEffect(() => {
    if (canvasRef.current) {
      context.current = canvasRef.current.getContext("2d");
    }
    initCanvas();
    animate();
    window.addEventListener("resize", initCanvas);

    return () => {
      window.removeEventListener("resize", initCanvas);
    };
  }, [color]);

  useEffect(() => {
    onMouseMove();
  }, [mousePosition.x, mousePosition.y]);

  const initCanvas = () => {
    resizeCanvas();
    createParticles();
  };

  const onMouseMove = () => {
    if (canvasRef.current) {
      const rect = canvasRef.current.getBoundingClientRect();
      const { w, h } = canvasSize.current;
      const x = mousePosition.x - rect.left - w / 2;
      const y = mousePosition.y - rect.top - h / 2;
      const inside = x < w / 2 && x > -w / 2 && y < h / 2 && y > -h / 2;
      if (inside) {
        mouse.current.x = x;
        mouse.current.y = y;
      }
    }
  };

  const resizeCanvas = () => {
    if (containerRef.current && canvasRef.current && context.current) {
      particles.current.length = 0;
      canvasSize.current.w = containerRef.current.offsetWidth;
      canvasSize.current.h = containerRef.current.offsetHeight;
      canvasRef.current.width = canvasSize.current.w * dpr;
      canvasRef.current.height = canvasSize.current.h * dpr;
      canvasRef.current.style.width = `${canvasSize.current.w}px`;
      canvasRef.current.style.height = `${canvasSize.current.h}px`;
      context.current.scale(dpr, dpr);
    }
  };

  const createParticle = (): Particle => {
    const x = Math.floor(Math.random() * canvasSize.current.w);
    const y = Math.floor(Math.random() * canvasSize.current.h);
    const translateX = 0;
    const translateY = 0;
    
    // More varied particle sizes with occasional larger particles
    const sizeVariation = Math.random();
    const particleSize = sizeVariation > 0.95 
      ? size * (Math.random() * 3 + 2) // 5% chance of being 2-5x base size
      : sizeVariation > 0.8
      ? size * (Math.random() * 1.5 + 1) // 15% chance of being 1-2.5x base size
      : size * (Math.random() * 0.5 + 0.8); // 80% chance of being 0.8-1.3x base size
    
    const alpha = 0;
    const targetAlpha = parseFloat((Math.random() * 0.6 + 0.2).toFixed(1));
    
    // Increased speed range for more dynamic movement
    const dx = (Math.random() - 0.5) * 0.3;
    const dy = (Math.random() - 0.5) * 0.3;
    
    // More varied magnetism for different particle behaviors
    const magnetism = Math.random() > 0.8
      ? 0.5 + Math.random() * 4 * mouseForce // 20% stronger magnetism
      : 0.1 + Math.random() * 2 * mouseForce; // 80% normal magnetism
    
    return {
      x,
      y,
      translateX,
      translateY,
      size: particleSize,
      alpha,
      targetAlpha,
      dx,
      dy,
      magnetism,
    };
  };

  const createParticles = () => {
    clearContext();
    for (let i = 0; i < quantity; i++) {
      const particle = createParticle();
      drawParticle(particle);
      particles.current.push(particle);
    }
  };

  const drawParticle = (particle: Particle) => {
    if (context.current) {
      const { x, y, translateX, translateY, size, alpha } = particle;
      context.current.translate(translateX, translateY);
      context.current.beginPath();
      context.current.arc(x, y, size, 0, Math.PI * 2);
      context.current.fillStyle = `rgba(${isStudio ? '0, 0, 0' : '251, 191, 36'}, ${alpha})`;
      context.current.fill();
      context.current.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
  };

  const clearContext = () => {
    if (context.current) {
      context.current.clearRect(
        0,
        0,
        canvasSize.current.w,
        canvasSize.current.h
      );
    }
  };

  const animate = () => {
    clearContext();
    particles.current.forEach((particle, i) => {
      // Update position
      particle.x += particle.dx;
      particle.y += particle.dy;

      // Update alpha
      if (particle.alpha < particle.targetAlpha) {
        particle.alpha += 0.02;
      }

      // Mouse interaction
      particle.translateX += (mouse.current.x / (staticity / particle.magnetism) - particle.translateX) / ease;
      particle.translateY += (mouse.current.y / (staticity / particle.magnetism) - particle.translateY) / ease;

      // Draw the particle
      drawParticle(particle);

      // Reset particle if it's out of bounds
      if (
        particle.x < -particle.size ||
        particle.x > canvasSize.current.w + particle.size ||
        particle.y < -particle.size ||
        particle.y > canvasSize.current.h + particle.size
      ) {
        particles.current[i] = createParticle();
      }
    });

    requestAnimationFrame(animate);
  };

  return (
    <div className={className} ref={containerRef} aria-hidden="true">
      <canvas 
        ref={canvasRef} 
        className="h-full w-full"
      />
    </div>
  );
}
