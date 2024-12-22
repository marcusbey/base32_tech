"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {cn} from "@/lib/utils";
import { useScroll } from "@/context/scroll-context";

interface HeroContentProps {
  isStudio: boolean;
}

const taglines = [
  {
    line1: "Enterprise Solutions",
    highlight: "Smarter Automation",
    line2: "Faster Scaling, Greater Success"
  },
  {
    line1: "Building Tomorrow's",
    highlight: "AI-Native Apps",
    line2: "Breaking Traditional Constraints"
  },
  {
    line1: "Your Application",
    highlight: "MVP-Ready",
    line2: "Delivered Faster Than Ever"
  }
] as const;

const animationVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 }
};

const descriptionVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 }
};

export function HeroContent({ isStudio }: HeroContentProps) {
  const [currentTagline, setCurrentTagline] = useState(0);
  const { gradientProgress } = useScroll();

  const gradientStyle = useMemo(() => ({
    backgroundImage: `linear-gradient(to right, 
      rgb(${Math.round(40 * (1 - gradientProgress) + 234 * gradientProgress)}, 
          ${Math.round(50 * (1 - gradientProgress) + 179 * gradientProgress)}, 
          ${Math.round(255 * (1 - gradientProgress) + 8 * gradientProgress)}) 0%,
      rgb(${Math.round(30 * (1 - gradientProgress) + 245 * gradientProgress)}, 
          ${Math.round(35 * (1 - gradientProgress) + 217 * gradientProgress)}, 
          ${Math.round(255 * (1 - gradientProgress) + 255 * gradientProgress)}) 45%,
      rgb(${Math.round(20 * (1 - gradientProgress) + 255 * gradientProgress)}, 
          ${Math.round(25 * (1 - gradientProgress) + 255 * gradientProgress)}, 
          ${Math.round(255 * (1 - gradientProgress) + 255 * gradientProgress)}) 100%)`,
    WebkitBackgroundClip: 'text',
    backgroundClip: 'text',
    color: 'transparent',
    transition: 'background-image 0.3s ease-out'
  } as React.CSSProperties), [gradientProgress]);

  const currentTaglineContent = useMemo(() => taglines[currentTagline], [currentTagline]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTagline((prev) => (prev + 1) % taglines.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  if (isStudio) {
    return (
      <div className="max-w-5xl">
        <h1
          className={cn(
            "text-7xl md:text-9xl",
            "font-semibold leading-none tracking-tight",
            "bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"
          )}
        >
          Creative Design Solutions
        </h1>
        <p className="text-xl md:text-2xl text-gray-700 max-w-2xl mt-6">
          We craft brands and user experiences for companies building a brighter future. Our design-driven approach transforms ideas into impactful digital experiences.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-5xl">
      <div className="relative h-48 mb-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentTagline}
            variants={animationVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.5 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white absolute inset-0 flex flex-col items-start"
          >
            <span className="text-indigo-200 pb-4">
              {currentTaglineContent.line1}
            </span>
            <span style={gradientStyle} className="whitespace-nowrap pb-4">
              {currentTaglineContent.highlight}
            </span>
            <span className="text-white/90 pb-4">
              {currentTaglineContent.line2}
            </span>
          </motion.div>
        </AnimatePresence>
      </div>
      <motion.p 
        variants={descriptionVariants}
        initial="initial"
        animate="animate"
        transition={{ delay: 0.3, duration: 0.5 }}
        className="text-xl md:text-2xl text-white/70 max-w-2xl backdrop-blur-sm lg:backdrop-blur-none mt-12 lg:mt-16"
      >
        AI automation cuts development costs by 60% and ships products 10x faster. Seamlessly integrate intelligent agents into your workflow and deliver value to your customers in days not months.
      </motion.p>
    </div>
  );
}