"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useCompany } from "@/lib/company-context";
import { useEffect, useState } from "react";

export default function PatternBreak() {
  const { company } = useCompany();
  const isTech = company === "tech";
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 30, stiffness: 200 };
  const springX = useSpring(mouseX, springConfig);
  const springY = useSpring(mouseY, springConfig);

  // Increase rotation and translation range
  const rotate = useTransform(springX, [-400, 400], [-25, 25]);
  const translateY = useTransform(springY, [-300, 300], [-30, 30]);

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      const rect = document.getElementById("pattern-container")?.getBoundingClientRect();
      if (rect) {
        const x = event.clientX - rect.left - rect.width / 2;
        const y = event.clientY - rect.top - rect.height / 2;
        mouseX.set(x);
        mouseY.set(y);
      }
    };

    const container = document.getElementById("pattern-container");
    if (container) {
      container.addEventListener("mousemove", handleMouseMove);
      return () => container.removeEventListener("mousemove", handleMouseMove);
    }
  }, [mouseX, mouseY]);

  const generateLines = () => {
    const lines = [];
    const spacing = 60; // Decreased spacing between lines
    const count = Math.ceil(window.innerWidth / spacing) + 5;
    const baseColor = isTech ? "#3B82F6" : "#6366F1";
    const accentColor = isTech ? "#60A5FA" : "#818CF8";

    // Generate two sets of lines for a cross-hatch effect
    for (let i = -2; i < count; i++) {
      // First set - diagonal from left to right
      lines.push(
        <motion.line
          key={`line1-${i}`}
          x1={i * spacing - 1000}
          y1={-200}
          x2={i * spacing + 200}
          y2={800}
          stroke={i % 2 === 0 ? baseColor : accentColor}
          strokeWidth="1.5"
          strokeOpacity="0.4"
          style={{
            rotate,
            translateY,
            transformOrigin: "center",
          }}
        />
      );

      // Second set - diagonal from right to left
      lines.push(
        <motion.line
          key={`line2-${i}`}
          x1={i * spacing + 200}
          y1={-200}
          x2={i * spacing - 1000}
          y2={800}
          stroke={i % 2 === 0 ? baseColor : accentColor}
          strokeWidth="1.5"
          strokeOpacity="0.3"
          style={{
            rotate: useTransform(springX, [-400, 400], [25, -25]),
            translateY,
            transformOrigin: "center",
          }}
        />
      );
    }
    return lines;
  };

  return (
    <section 
      id="pattern-container"
      className="relative h-[50vh] overflow-hidden bg-gradient-to-b from-black via-gray-900 to-black"
    >
      {/* Background base */}
      <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-black opacity-50" />
      
      {/* Pattern container */}
      <motion.svg
        className="absolute inset-0 w-full h-full"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.g>{generateLines()}</motion.g>
      </motion.svg>

      {/* Mouse glow effect */}
      <motion.div
        className="pointer-events-none absolute w-96 h-96 rounded-full"
        style={{
          background: isTech
            ? "radial-gradient(circle at center, #3B82F620 0%, transparent 70%)"
            : "radial-gradient(circle at center, #6366F120 0%, transparent 70%)",
          x: springX,
          y: springY,
          translateX: "-50%",
          translateY: "-50%",
        }}
      />
    </section>
  );
}
