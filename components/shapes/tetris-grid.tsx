"use client";

import { useCompany } from "@/lib/company-context";
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import { useEffect, useRef } from "react";

const techColors = {
  base: ["#3B82F6", "#2563EB", "#1D4ED8"],
  bright: ["#FFFFFF", "#93C5FD", "#60A5FA"] // Much brighter colors
};

const studioColors = {
  base: ["#6366F1", "#4F46E5", "#4338CA"],
  bright: ["#FFFFFF", "#C7D2FE", "#A5B4FC"] // Much brighter colors
};

export default function TetrisGrid() {
  const { company } = useCompany();
  const isTech = company === "tech";
  const colors = isTech ? techColors : studioColors;
  const containerRef = useRef<HTMLDivElement>(null);
  
  const mouseX = useSpring(0);
  const mouseY = useSpring(0);

  const gridSize = 60;
  const baseDotSize = 4;
  const hoverRadius = 80; // Smaller, more focused radius

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouseX.set(e.clientX - rect.left);
      mouseY.set(e.clientY - rect.top);
    };

    const handleMouseLeave = () => {
      mouseX.set(0);
      mouseY.set(0);
    };

    container.addEventListener("mousemove", handleMouseMove);
    container.addEventListener("mouseleave", handleMouseLeave);
    return () => {
      container.removeEventListener("mousemove", handleMouseMove);
      container.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [mouseX, mouseY]);

  const getColorVariant = (x: number, y: number, colorSet: string[]) => {
    const index = Math.abs(Math.floor((x + y) / gridSize)) % colorSet.length;
    return colorSet[index];
  };

  const calculateGrid = () => {
    if (typeof window === 'undefined') return { cols: 0, rows: 0 };
    
    const cols = Math.ceil(window.innerWidth / gridSize) + 1;
    const rows = Math.ceil(window.innerHeight / gridSize) + 1;
    return { cols, rows };
  };

  const generateGrid = () => {
    const gridElements = [];
    const { cols, rows } = calculateGrid();

    // Generate grid lines
    for (let i = 0; i <= cols; i++) {
      gridElements.push(
        <motion.line
          key={`vertical-${i}`}
          x1={i * gridSize}
          y1="0"
          x2={i * gridSize}
          y2="100%"
          stroke={getColorVariant(i * gridSize, 0, colors.base)}
          strokeOpacity="0.15"
          strokeWidth="1"
        />
      );
    }

    for (let i = 0; i <= rows; i++) {
      gridElements.push(
        <motion.line
          key={`horizontal-${i}`}
          x1="0"
          y1={i * gridSize}
          x2="100%"
          y2={i * gridSize}
          stroke={getColorVariant(0, i * gridSize, colors.base)}
          strokeOpacity="0.15"
          strokeWidth="1"
        />
      );
    }

    // Generate intersection dots
    for (let i = 0; i <= cols; i++) {
      for (let j = 0; j <= rows; j++) {
        const x = i * gridSize;
        const y = j * gridSize;
        
        const dot = (
          <motion.g key={`dot-${i}-${j}`}>
            {/* Base dot */}
            <motion.circle
              cx={x}
              cy={y}
              r={baseDotSize}
              fill={getColorVariant(x, y, colors.base)}
              fillOpacity={0.2}
            />
            
            {/* Glow effect */}
            <motion.circle
              cx={x}
              cy={y}
              r={baseDotSize}
              animate={{
                fill: (() => {
                  const dx = mouseX.get() - x;
                  const dy = mouseY.get() - y;
                  const distance = Math.sqrt(dx * dx + dy * dy);
                  return distance < hoverRadius ? "#FFD700" : "#4B5563";
                })(),
                fillOpacity: (() => {
                  const dx = mouseX.get() - x;
                  const dy = mouseY.get() - y;
                  const distance = Math.sqrt(dx * dx + dy * dy);
                  return distance < hoverRadius ? 0.8 : 0.5;
                })(),
                scale: (() => {
                  const dx = mouseX.get() - x;
                  const dy = mouseY.get() - y;
                  const distance = Math.sqrt(dx * dx + dy * dy);
                  return distance < hoverRadius ? 1.2 : 1;
                })(),
                filter: (() => {
                  const dx = mouseX.get() - x;
                  const dy = mouseY.get() - y;
                  const distance = Math.sqrt(dx * dx + dy * dy);
                  return distance < hoverRadius ? "blur(0px)" : "blur(1px)";
                })()
              }}
              style={{
                transformOrigin: `${x}px ${y}px`
              }}
              transition={{
                type: "tween",
                ease: "easeInOut",
                duration: 0.2
              }}
            />
          </motion.g>
        );
        
        gridElements.push(dot);
      }
    }

    return gridElements;
  };

  return (
    <div 
      ref={containerRef}
      className="absolute inset-0 overflow-hidden cursor-none"
    >
      <motion.svg
        className="absolute inset-0 w-full h-full"
        style={{
          mask: "radial-gradient(circle at 50% 50%, black, transparent 80%)"
        }}
      >
        <defs>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        <motion.g>
          {generateGrid()}
        </motion.g>
      </motion.svg>
    </div>
  );
}
