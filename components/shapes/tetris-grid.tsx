"use client";

import { useCompany } from "@/lib/company-context";
import { motion } from "framer-motion";

const techColors = {
  base: ["#3B82F6", "#2563EB", "#1D4ED8"],
  accent: ["#60A5FA", "#3B82F6", "#2563EB"]
};

const studioColors = {
  base: ["#6366F1", "#4F46E5", "#4338CA"],
  accent: ["#818CF8", "#6366F1", "#4F46E5"]
};

export default function TetrisGrid() {
  const { company } = useCompany();
  const isTech = company === "tech";
  const colors = isTech ? techColors : studioColors;

  const gridSize = 60;
  const baseDotSize = 4;

  const getColorVariant = (x: number, y: number, colorSet: string[]) => {
    const index = Math.abs(Math.floor((x + y) / gridSize)) % colorSet.length;
    return colorSet[index];
  };

  const generateGrid = () => {
    const gridElements = [];
    const cols = Math.ceil(window.innerWidth / gridSize) + 1;
    const rows = Math.ceil(window.innerHeight / gridSize) + 1;

    // Generate grid lines
    for (let i = 0; i <= cols; i++) {
      const lineColor = getColorVariant(i * gridSize, 0, colors.base);
      gridElements.push(
        <motion.line
          key={`vertical-${i}`}
          x1={i * gridSize}
          y1="0"
          x2={i * gridSize}
          y2="100%"
          stroke={lineColor}
          strokeOpacity="0.15"
          strokeWidth="1"
        />
      );
    }

    for (let i = 0; i <= rows; i++) {
      const lineColor = getColorVariant(0, i * gridSize, colors.base);
      gridElements.push(
        <motion.line
          key={`horizontal-${i}`}
          x1="0"
          y1={i * gridSize}
          x2="100%"
          y2={i * gridSize}
          stroke={lineColor}
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
        
        gridElements.push(
          <motion.circle
            key={`dot-${i}-${j}`}
            cx={x}
            cy={y}
            r={baseDotSize}
            fill={getColorVariant(x, y, colors.base)}
            fillOpacity="0.2"
            whileHover={{
              scale: 1.2,
              fillOpacity: 0.4,
              transition: { duration: 0.2 }
            }}
          />
        );
      }
    }

    return gridElements;
  };

  return (
    <div className="absolute inset-0 overflow-hidden">
      <motion.svg
        className="absolute inset-0 w-full h-full"
        style={{
          mask: "radial-gradient(circle at 50% 50%, black, transparent 80%)"
        }}
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
        <motion.g filter="url(#glow)">
          {generateGrid()}
        </motion.g>
      </motion.svg>
    </div>
  );
}
