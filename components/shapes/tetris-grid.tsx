"use client";

import { useCompany } from "@/lib/company-context";
import { useEffect, useState } from "react";

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

export default function TetrisGrid() {
  const { company } = useCompany();
  const isTech = company === "tech";
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const gridSize = 60;
  const baseDotSize = 4;
  const maxDotSize = 12;
  const maxLightRadius = 300;
  const colors = isTech ? techColors : studioColors;

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const getColorVariant = (x: number, y: number, colorSet: string[]) => {
    // Use position to deterministically select a color variant
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
        <line
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
        <line
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
        
        // Calculate distance from mouse to dot
        const dx = mousePosition.x - x;
        const dy = mousePosition.y - y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        // Calculate intensity based on distance
        const intensity = Math.max(0, 1 - distance / maxLightRadius);
        
        let dotColor;
        let opacity = 0.2;
        
        // Progressive size calculation
        const dotSize = baseDotSize + (maxDotSize - baseDotSize) * Math.pow(intensity, 1.5);
        
        if (distance < maxLightRadius) {
          if (distance < maxLightRadius / 3) {
            dotColor = getColorVariant(x, y, colors.glow);
            opacity = 0.8;
          } else {
            dotColor = getColorVariant(x, y, colors.active);
            opacity = 0.5;
          }
        } else {
          dotColor = getColorVariant(x, y, colors.base);
        }

        gridElements.push(
          <circle
            key={`dot-${i}-${j}`}
            cx={x}
            cy={y}
            r={dotSize}
            fill={dotColor}
            fillOpacity={opacity}
            style={{
              transition: "fill 0.2s ease-out, fill-opacity 0.2s ease-out, r 0.2s ease-out",
            }}
          />
        );
      }
    }

    return gridElements;
  };

  return (
    <div id="pattern-container" className="absolute inset-0 overflow-hidden">
      <svg
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
        <g filter="url(#glow)">
          {generateGrid()}
        </g>
      </svg>
    </div>
  );
}
