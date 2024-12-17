"use client";

import { useCompany } from "@/lib/company-context";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useCallback, useEffect, useRef, useState, useMemo } from "react";
import { useRafLoop } from "react-use";

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
} as const;

const studioColors = {
  base: ["#6366F1", "#4F46E5", "#4338CA"],
  bright: [
    "#A78BFA", // violet
    "#F472B6", // pink
    "#FB7185", // rose
    "#60A5FA", // blue
    "#34D399", // emerald
  ]
} as const;

const defaultDimensions = { width: 0, height: 0 };

const HeroGrid = () => {
  const { company } = useCompany();
  const isTech = company === "tech";
  const colors = isTech ? techColors : studioColors;
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothMouseX = useSpring(mouseX, { stiffness: 300, damping: 30 });
  const smoothMouseY = useSpring(mouseY, { stiffness: 300, damping: 30 });
  const [isClient, setIsClient] = useState(false);
  const [dimensions, setDimensions] = useState(defaultDimensions);

  const gridSize = 60;
  const baseDotSize = 2;
  const hoverRadius = 150;

  // Memoize the update dimensions callback
  const updateDimensions = useCallback(() => {
    if (containerRef.current) {
      setDimensions({
        width: containerRef.current.offsetWidth,
        height: containerRef.current.offsetHeight
      });
    }
  }, []);

  useEffect(() => {
    setIsClient(true);
    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, [updateDimensions]);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (rect) {
      mouseX.set(e.clientX - rect.left);
      mouseY.set(e.clientY - rect.top);
    }
  }, [mouseX, mouseY]);

  const getColorVariant = useCallback((x: number, y: number, colorSet: readonly string[]) => {
    const index = Math.abs(Math.floor((x + y) / gridSize)) % colorSet.length;
    return colorSet[index];
  }, [gridSize]);

  // Generate static grid lines
  const gridLines = useMemo(() => {
    if (!isClient) return [];
    
    const cols = Math.ceil(dimensions.width / gridSize) + 1;
    const rows = Math.ceil(dimensions.height / gridSize) + 1;
    const lines = [];

    for (let i = 0; i <= cols; i++) {
      const x = i * gridSize;
      lines.push(
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
      lines.push(
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

    return lines;
  }, [dimensions, gridSize, getColorVariant, colors.base, isClient]);

  // Generate interactive dots with optimized performance
  const generateDots = useCallback(() => {
    if (!isClient) return [];
    
    const mousePosition = {
      x: smoothMouseX.get(),
      y: smoothMouseY.get()
    };

    const cols = Math.ceil(dimensions.width / gridSize) + 1;
    const rows = Math.ceil(dimensions.height / gridSize) + 1;
    const dots = [];

    // Calculate visible area with buffer
    const buffer = hoverRadius;
    const minCol = Math.max(0, Math.floor((mousePosition.x - buffer) / gridSize) - 1);
    const maxCol = Math.min(cols, Math.ceil((mousePosition.x + buffer) / gridSize) + 1);
    const minRow = Math.max(0, Math.floor((mousePosition.y - buffer) / gridSize) - 1);
    const maxRow = Math.min(rows, Math.ceil((mousePosition.y + buffer) / gridSize) + 1);

    // Generate background dots for all intersections
    for (let i = 0; i <= cols; i++) {
      for (let j = 0; j <= rows; j++) {
        const x = i * gridSize;
        const y = j * gridSize;
        
        // Add static intersection shapes
        dots.push(
          <motion.circle
            key={`static-dot-${i}-${j}`}
            cx={x}
            cy={y}
            r={1.5}
            fill={getColorVariant(x, y, colors.base)}
            initial={false}
            animate={{
              opacity: 0.3,
              scale: 1
            }}
          />
        );

        // Only process interactive dots within hover radius
        if (i >= minCol && i <= maxCol && j >= minRow && j <= maxRow) {
          const dx = mousePosition.x - x;
          const dy = mousePosition.y - y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < hoverRadius) {
            const intensity = Math.pow(1 - (distance / hoverRadius), 2);
            dots.push(
              <motion.circle
                key={`dot-${i}-${j}`}
                cx={x}
                cy={y}
                r={baseDotSize}
                fill={getColorVariant(x, y, colors.base)}
                initial={false}
                animate={{
                  fillOpacity: 0.2 + (intensity * 0.8),
                  scale: 1 + (intensity * 2),
                  fill: colors.bright[Math.floor((x + y) / gridSize) % colors.bright.length],
                }}
                transition={{ 
                  type: "spring", 
                  stiffness: 400,
                  damping: 25,
                  mass: 0.05,
                  restSpeed: 0.5
                }}
              />
            );

            // Add connecting lines when near mouse
            if (i < cols && j < rows) {
              const nextX = (i + 1) * gridSize;
              const nextY = (j + 1) * gridSize;
              
              dots.push(
                <motion.line
                  key={`line-h-${i}-${j}`}
                  x1={x}
                  y1={y}
                  x2={nextX}
                  y2={y}
                  stroke={colors.bright[Math.floor((x + y) / gridSize) % colors.bright.length]}
                  strokeOpacity={intensity * 0.4}
                  strokeWidth={1}
                  initial={false}
                />,
                <motion.line
                  key={`line-v-${i}-${j}`}
                  x1={x}
                  y1={y}
                  x2={x}
                  y2={nextY}
                  stroke={colors.bright[Math.floor((x + y) / gridSize) % colors.bright.length]}
                  strokeOpacity={intensity * 0.4}
                  strokeWidth={1}
                  initial={false}
                />
              );
            }
          }
        }
      }
    }

    return dots;
  }, [dimensions, gridSize, smoothMouseX, smoothMouseY, colors, getColorVariant, hoverRadius, baseDotSize, isClient]);

  // Use RAF for smooth dot updates
  const [dots, setDots] = useState<JSX.Element[]>([]);
  const [stop, start] = useRafLoop(() => {
    setDots(generateDots());
  }, false);

  useEffect(() => {
    start();
    return () => stop();
  }, [start, stop]);

  if (!isClient) {
    return (
      <div 
        ref={containerRef} 
        className="absolute inset-0 overflow-hidden"
        style={{ backgroundColor: 'rgba(0, 0, 0, 0.1)' }}
      />
    );
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
          {gridLines}
          {dots}
        </g>
      </motion.svg>
    </div>
  );
};

export default HeroGrid;
