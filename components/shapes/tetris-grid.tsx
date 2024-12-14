"use client";

import { motion } from "framer-motion";
import { useCompany } from "@/lib/company-context";

export default function TetrisGrid() {
  const { company } = useCompany();
  const isTech = company === "tech";
  
  const primaryColor = isTech ? "#3B82F6" : "#6366F1";
  const gridSize = 60; // Increased grid size
  const dotSize = 4; // Increased dot size

  const generateGrid = () => {
    const gridElements = [];
    const cols = Math.ceil(window.innerWidth / gridSize) + 1;
    const rows = Math.ceil(window.innerHeight / gridSize) + 1;

    // Generate grid lines
    for (let i = 0; i <= cols; i++) {
      gridElements.push(
        <line
          key={`vertical-${i}`}
          x1={i * gridSize}
          y1="0"
          x2={i * gridSize}
          y2="100%"
          stroke={primaryColor}
          strokeOpacity="0.2"
          strokeWidth="1"
        />
      );
    }

    for (let i = 0; i <= rows; i++) {
      gridElements.push(
        <line
          key={`horizontal-${i}`}
          x1="0"
          y1={i * gridSize}
          x2="100%"
          y2={i * gridSize}
          stroke={primaryColor}
          strokeOpacity="0.2"
          strokeWidth="1"
        />
      );
    }

    // Generate intersection dots
    for (let i = 0; i <= cols; i++) {
      for (let j = 0; j <= rows; j++) {
        gridElements.push(
          <motion.circle
            key={`dot-${i}-${j}`}
            cx={i * gridSize}
            cy={j * gridSize}
            r={dotSize}
            fill={primaryColor}
            fillOpacity="0.4"
            initial={{ scale: 0.8 }}
            animate={{
              scale: [0.8, 1.2, 0.8],
              opacity: [0.4, 0.6, 0.4],
            }}
            transition={{
              duration: 3,
              delay: (i + j) * 0.1,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        );
      }
    }

    return gridElements;
  };

  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Removed the gradient overlay for better visibility */}
      <svg
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
        <g filter="url(#glow)">
          {generateGrid()}
        </g>
      </svg>
    </div>
  );
}
