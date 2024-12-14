"use client";

import { useCompany } from "@/lib/company-context";
import { useEffect, useRef } from "react";
import { motion, useMotionValue, useMotionTemplate } from "framer-motion";

const techColors = {
  base: ["#3B82F6", "#2563EB", "#1D4ED8"],
  active: ["#60A5FA", "#3B82F6", "#2563EB"],
  glow: ["#93C5FD", "#60A5FA", "#3B82F6"]
};

const studioColors = {
  base: ["#6366F1", "#4F46E5", "#4338CA"],
  active: ["#818CF8", "#6366F1", "#4F46E5"],
  glow: ["#A5B4FC", "#818CF8", "#6366F1"]
};

export default function InteractiveGrid() {
  const { company } = useCompany();
  const isTech = company === "tech";
  const containerRef = useRef<HTMLDivElement>(null);
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const maskImage = useMotionTemplate`radial-gradient(circle at ${mouseX}px ${mouseY}px, black 10%, transparent 80%)`;

  const gridSize = 60;
  const baseDotSize = 4;
  const maxLightRadius = 300;
  const colors = isTech ? techColors : studioColors;

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      mouseX.set(x);
      mouseY.set(y);
    };

    container.addEventListener("mousemove", handleMouseMove);
    return () => container.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  const getColorVariant = (x: number, y: number, colorSet: string[]) => {
    const index = Math.abs(Math.floor((x + y) / gridSize)) % colorSet.length;
    return colorSet[index];
  };

  const generateGrid = () => {
    const gridElements = [];
    const cols = Math.ceil(window.innerWidth / gridSize) + 1;
    const rows = Math.ceil(window.innerHeight / gridSize) + 1;

    // Generate intersection dots
    for (let i = 0; i <= cols; i++) {
      for (let j = 0; j <= rows; j++) {
        const x = i * gridSize;
        const y = j * gridSize;

        gridElements.push(
          <motion.circle
            key={`dot-${i}-${j}`}
            cx={x}
            cy={y}
            r={baseDotSize}
            initial={{ fill: getColorVariant(x, y, colors.base), fillOpacity: 0.2 }}
            whileHover={{
              fill: getColorVariant(x, y, colors.glow),
              fillOpacity: 0.9,
              transition: { duration: 0.2 }
            }}
            animate={(mouseX.get() > x - maxLightRadius && mouseX.get() < x + maxLightRadius &&
                     mouseY.get() > y - maxLightRadius && mouseY.get() < y + maxLightRadius)
              ? {
                  fill: getColorVariant(x, y, colors.active),
                  fillOpacity: 0.6,
                  transition: { duration: 0.3 }
                }
              : {
                  fill: getColorVariant(x, y, colors.base),
                  fillOpacity: 0.2,
                  transition: { duration: 0.3 }
                }
            }
          />
        );

        // Add grid lines
        if (j === 0) {
          gridElements.push(
            <motion.line
              key={`vertical-${i}`}
              x1={x}
              y1="0"
              x2={x}
              y2="100%"
              stroke={getColorVariant(x, 0, colors.base)}
              strokeOpacity="0.15"
              strokeWidth="1"
            />
          );
        }
        if (i === 0) {
          gridElements.push(
            <motion.line
              key={`horizontal-${j}`}
              x1="0"
              y1={y}
              x2="100%"
              y2={y}
              stroke={getColorVariant(0, y, colors.base)}
              strokeOpacity="0.15"
              strokeWidth="1"
            />
          );
        }
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
          mask: maskImage
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
        <motion.g filter="url(#glow)">
          {generateGrid()}
        </motion.g>
      </motion.svg>
    </div>
  );
}
