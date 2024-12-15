"use client";

import { useCompany } from "@/lib/company-context";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const techColors = {
  base: ["#3B82F6", "#2563EB", "#1D4ED8"],
  bright: [
    "#60A5FA", // blue
    "#34D399", // emerald
    "#A78BFA", // violet
    "#F472B6", // pink
    "#FBBF24", // amber
  ]
};

const studioColors = {
  base: ["#6366F1", "#4F46E5", "#4338CA"],
  bright: [
    "#A78BFA", // violet
    "#F472B6", // pink
    "#FB7185", // rose
    "#60A5FA", // blue
    "#34D399", // emerald
  ]
};

export default function HeroGrid() {
  const { company } = useCompany();
  const isTech = company === "tech";
  const colors = isTech ? techColors : studioColors;
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const mouseSpeedRef = useRef({ x: 0, y: 0 });
  const lastMousePosRef = useRef({ x: 0, y: 0 });
  const [dimensions, setDimensions] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 1920,
    height: typeof window !== 'undefined' ? window.innerHeight : 1080
  });

  const gridSize = 60;
  const baseDotSize = 4;
  const hoverRadius = 200;

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const updateDimensions = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    window.addEventListener('resize', updateDimensions);
    updateDimensions();
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const newX = e.clientX - rect.left;
      const newY = e.clientY - rect.top;

      // Calculate mouse speed
      mouseSpeedRef.current = {
        x: newX - lastMousePosRef.current.x,
        y: newY - lastMousePosRef.current.y
      };
      
      lastMousePosRef.current = { x: newX, y: newY };
      setMousePos({ x: newX, y: newY });
    };

    container.addEventListener("mousemove", handleMouseMove);
    return () => container.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const getColorVariant = (x: number, y: number, colorSet: string[]) => {
    const index = Math.abs(Math.floor((x + y) / gridSize)) % colorSet.length;
    return colorSet[index];
  };

  const getDynamicColor = (x: number, y: number, intensity: number) => {
    const brightColors = colors.bright;
    // Use position and time to create a shifting color pattern
    const angleFromMouse = Math.atan2(y - mousePos.y, x - mousePos.x);
    const normalizedAngle = (angleFromMouse + Math.PI) / (2 * Math.PI); // 0 to 1
    
    // Use mouse speed to affect color selection
    const mouseSpeed = Math.sqrt(
      mouseSpeedRef.current.x * mouseSpeedRef.current.x + 
      mouseSpeedRef.current.y * mouseSpeedRef.current.y
    );
    const speedFactor = Math.min(mouseSpeed / 10, 1); // Normalize speed
    
    // Calculate color index based on angle, position, and time
    const baseIndex = Math.floor(
      (normalizedAngle * brightColors.length + 
       speedFactor * 2) % brightColors.length
    );
    
    // Get two adjacent colors for interpolation
    const color1 = brightColors[baseIndex];
    
    return intensity < 0.1 ? getColorVariant(x, y, colors.base) : color1;
  };

  const generateGrid = () => {
    const gridElements = [];
    const cols = Math.ceil(dimensions.width / gridSize) + 1;
    const rows = Math.ceil(dimensions.height / gridSize) + 1;

    // Generate grid lines
    for (let i = 0; i <= cols; i++) {
      const x = i * gridSize;
      gridElements.push(
        <motion.line
          key={`vertical-${i}`}
          x1={x}
          y1={0}
          x2={x}
          y2="100%"
          stroke={getColorVariant(x, 0, colors.base)}
          strokeOpacity="0.15"
          strokeWidth="1"
          initial={false}
        />
      );
    }

    for (let i = 0; i <= rows; i++) {
      const y = i * gridSize;
      gridElements.push(
        <motion.line
          key={`horizontal-${i}`}
          x1={0}
          y1={y}
          x2="100%"
          y2={y}
          stroke={getColorVariant(0, y, colors.base)}
          strokeOpacity="0.15"
          strokeWidth="1"
          initial={false}
        />
      );
    }

    // Generate intersection dots
    for (let i = 0; i <= cols; i++) {
      for (let j = 0; j <= rows; j++) {
        const x = i * gridSize;
        const y = j * gridSize;
        const dx = mousePos.x - x;
        const dy = mousePos.y - y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const isNearMouse = distance < hoverRadius;
        const intensity = isNearMouse ? Math.pow(1 - (distance / hoverRadius), 1.5) : 0;

        gridElements.push(
          <motion.circle
            key={`dot-${i}-${j}`}
            cx={x}
            cy={y}
            r={baseDotSize}
            fill={getColorVariant(x, y, colors.base)}
            fillOpacity={0.2}
            initial={false}
            animate={{
              fill: isNearMouse ? colors.bright[Math.floor(Math.random() * colors.bright.length)] : getColorVariant(x, y, colors.base),
              fillOpacity: 0.2 + (intensity * 0.8),
              scale: 1 + (intensity * 0.5),
            }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 30,
              mass: 0.5,
            }}
          />
        );
      }
    }

    return gridElements;
  };

  return (
    <div 
      ref={containerRef} 
      className="absolute inset-0 overflow-hidden cursor-none"
      style={{ backgroundColor: 'rgba(0, 0, 0, 0.1)' }}
    >
      <motion.svg
        className="absolute inset-0 w-full h-full"
        initial={false}
      >
        <defs>
          <filter id="glow">
            <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        <g>{generateGrid()}</g>
      </motion.svg>
    </div>
  );
}
