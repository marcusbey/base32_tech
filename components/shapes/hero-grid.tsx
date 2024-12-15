"use client";

import { useCompany } from "@/lib/company-context";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

interface Dimensions {
  width: number;
  height: number;
}

interface Position {
  x: number;
  y: number;
}

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

const defaultDimensions = { width: 0, height: 0 };

const HeroGrid = () => {
  const { company } = useCompany();
  const isTech = company === "tech";
  const colors = isTech ? techColors : studioColors;
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isClient, setIsClient] = useState(false);
  const [dimensions, setDimensions] = useState(defaultDimensions);

  const gridSize = 60;
  const baseDotSize = 2;
  const hoverRadius = 150;

  useEffect(() => {
    setIsClient(true);
    const updateDimensions = () => {
      if (containerRef.current) {
        setDimensions({
          width: containerRef.current.offsetWidth,
          height: containerRef.current.offsetHeight
        });
      }
    };
    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (rect) {
      setMousePos({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      });
    }
  };

  const getColorVariant = (x: number, y: number, colorSet: string[]) => {
    const index = Math.abs(Math.floor((x + y) / gridSize)) % colorSet.length;
    return colorSet[index];
  };

  if (!isClient) {
    return (
      <div 
        ref={containerRef} 
        className="absolute inset-0 overflow-hidden"
        style={{ backgroundColor: 'rgba(0, 0, 0, 0.1)' }}
      />
    );
  }

  const cols = Math.ceil(dimensions.width / gridSize) + 1;
  const rows = Math.ceil(dimensions.height / gridSize) + 1;
  const gridElements = [];

  // Generate grid lines
  for (let i = 0; i <= cols; i++) {
    const x = i * gridSize;
    gridElements.push(
      <motion.line
        key={`v-${i}`}
        x1={x}
        y1={0}
        x2={x}
        y2="100%"
        stroke={getColorVariant(x, 0, colors.base)}
        strokeOpacity={0.15}
        strokeWidth={1}
        initial={false}
      />
    );
  }

  for (let i = 0; i <= rows; i++) {
    const y = i * gridSize;
    gridElements.push(
      <motion.line
        key={`h-${i}`}
        x1={0}
        y1={y}
        x2="100%"
        y2={y}
        stroke={getColorVariant(0, y, colors.base)}
        strokeOpacity={0.15}
        strokeWidth={1}
        initial={false}
      />
    );
  }

  // Generate dots with enhanced interactivity
  for (let i = 0; i <= cols; i++) {
    for (let j = 0; j <= rows; j++) {
      const x = i * gridSize;
      const y = j * gridSize;
      const dx = mousePos.x - x;
      const dy = mousePos.y - y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      const isNearMouse = distance < hoverRadius;
      const intensity = isNearMouse ? Math.pow(1 - (distance / hoverRadius), 2) : 0;
      
      gridElements.push(
        <motion.circle
          key={`dot-${i}-${j}`}
          cx={x}
          cy={y}
          r={baseDotSize}
          fill={getColorVariant(x, y, colors.base)}
          initial={{ fillOpacity: 0.2, scale: 1 }}
          animate={{
            fillOpacity: 0.2 + (intensity * 0.8),
            scale: 1 + (intensity * 2),
            fill: isNearMouse ? colors.bright[Math.floor((x + y) / gridSize) % colors.bright.length] : getColorVariant(x, y, colors.base),
          }}
          transition={{ type: "spring", stiffness: 1000, damping: 50, mass: 0.1 }}
        />
      );
    }
  }

  return (
    <div 
      ref={containerRef} 
      className="absolute inset-0 overflow-hidden"
      style={{ backgroundColor: 'rgba(0, 0, 0, 0.1)' }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseMove}
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
        <g>
          {gridElements}
        </g>
      </motion.svg>
    </div>
  );
};

export default HeroGrid;
