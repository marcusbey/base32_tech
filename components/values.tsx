"use client";

import { motion, useMotionValue, useMotionTemplate, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useCompany } from "@/lib/company-context";

const values = [
  {
    title: "Innovation First",
    description:
      "We push boundaries and embrace cutting-edge solutions to drive technological advancement.",
  },
  {
    title: "Client Success",
    description:
      "Your success is our priority. We're committed to delivering results that exceed expectations.",
  },
  {
    title: "Continuous Growth",
    description:
      "We foster an environment of learning and development, staying ahead in the ever-evolving tech landscape.",
  },
];

const backgrounds = [
  "/images/city-background.jpg",
  "/images/city-background.webp",
];

const techColors = {
  base: ["#3B82F6", "#2563EB", "#1D4ED8"],
  bright: ["#60A5FA", "#3B82F6", "#2563EB"],
};

const studioColors = {
  base: ["#6366F1", "#4F46E5", "#4338CA"],
  bright: ["#818CF8", "#6366F1", "#4F46E5"],
};

export default function Values() {
  const { company } = useCompany();
  const isTech = company === "tech";
  const colors = isTech ? techColors : studioColors;
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentBg, setCurrentBg] = useState(0);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isClient, setIsClient] = useState(false);

  const gridSize = 60;
  const baseDotSize = 2;
  const hoverRadius = 120;

  // Background image rotation
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBg((prev) => (prev === 0 ? 1 : 0));
    }, 7000);
    return () => clearInterval(interval);
  }, []);

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

  const generateGrid = () => {
    if (!isClient) return [];

    const gridElements = [];
    const cols = Math.ceil(dimensions.width / gridSize) + 1;
    const rows = Math.ceil(dimensions.height / gridSize) + 1;

    // Generate lines
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

    // Generate dots
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
              scale: 1 + (intensity * 0.5),
              fill: isNearMouse ? colors.bright[Math.floor((x + y) / gridSize) % colors.bright.length] : getColorVariant(x, y, colors.base),
            }}
            transition={{ type: "spring", stiffness: 1000, damping: 50, mass: 0.1 }}
          />
        );
      }
    }

    return gridElements;
  };

  return (
    <section id="values-section" className="relative py-32 overflow-hidden">
      {/* Animated Background Images */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentBg}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5 }}
          className="absolute inset-0 w-full h-full"
        >
          <Image
            src={backgrounds[currentBg]}
            alt="City Skyline"
            fill
            className="object-cover"
            priority
          />
        </motion.div>
      </AnimatePresence>

      {/* Interactive Grid Overlay */}
      <div 
        ref={containerRef} 
        className="absolute inset-0 overflow-hidden cursor-none bg-black/60"
        onMouseMove={handleMouseMove}
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
            {generateGrid()}
          </g>
        </motion.svg>
      </div>

      {/* Gradient Overlay for Section Transition */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black pointer-events-none" />

      {/* Content Container */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative h-full flex flex-col"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24 flex-1 flex flex-col w-full">
          {/* Title Section */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="text-right"
          >
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              className={`text-4xl sm:text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r ${
                isTech 
                  ? "from-blue-600 via-blue-500 to-blue-400"
                  : "from-indigo-600 via-indigo-500 to-indigo-400"
              } bg-clip-text text-transparent text-right ml-auto py-4 leading-tight sm:leading-loose`}
            >
              Committed to Your Success,
              <br className="hidden sm:block" />
              Every Step of the Way
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
              className="text-lg sm:text-xl md:text-2xl text-gray-300 leading-normal sm:leading-relaxed text-right ml-auto mb-12 sm:mb-20"
            >
              Beyond service providers, we're your
              <br className="hidden sm:block" />
              dedicated partners in technological advancement
            </motion.p>
          </motion.div>

          {/* Cards Section - Bottom Half */}
          <div className="pb-16">
            <style jsx>{`
              .number-outline {
                -webkit-text-stroke: 2px ${isTech ? '#3B82F6' : '#6366F1'};
                color: transparent;
                font-size: 3rem;
                font-weight: bold;
                text-shadow: 
                  -1px -1px 0 ${isTech ? '#3B82F6' : '#6366F1'},
                  1px -1px 0 ${isTech ? '#3B82F6' : '#6366F1'},
                  -1px 1px 0 ${isTech ? '#3B82F6' : '#6366F1'},
                  1px 1px 0 ${isTech ? '#3B82F6' : '#6366F1'};
              }
            `}</style>
            <div className="grid md:grid-cols-3 gap-4 md:gap-6">
              {values.map((value, index) => (
                <div
                  key={value.title}
                  className="group backdrop-blur-lg p-5 sm:p-6 md:p-8 rounded-xl sm:rounded-2xl relative overflow-hidden animate-fade-up"
                  style={{
                    background: `linear-gradient(135deg, ${colors.base[0]}10, ${colors.base[2]}05)`,
                    borderColor: `${colors.base[1]}20`,
                    '--animation-delay': `${index * 150}ms`
                  } as React.CSSProperties}
                >
                  <div className="relative z-10">
                    <h3 className="text-xl sm:text-2xl font-semibold text-white mb-3 sm:mb-4 leading-tight transition-transform duration-300 group-hover:translate-y-[-2px]">
                      {value.title}
                    </h3>
                    <p className="text-gray-400 leading-normal sm:leading-relaxed text-sm sm:text-base transition-transform duration-300 group-hover:translate-y-[-2px]">
                      {value.description}
                    </p>
                  </div>
                  <div 
                    className="absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-10 transition-opacity duration-300"
                    style={{
                      background: `linear-gradient(135deg, ${colors.bright[0]}, ${colors.bright[2]})`
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}