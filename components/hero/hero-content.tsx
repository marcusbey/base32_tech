"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {cn} from "@/lib/utils";
import { useScroll } from "@/context/scroll-context";

// No longer need props as we're focusing only on tech

const taglines = [
  {
    line1: "Ship AI-Powered",
    highlight: "Applications",
    line2: "That Learn, Scale, and Deliver"
  },
  {
    line1: "Building Tomorrow's",
    highlight: "AI-Native Apps",
    line2: "Breaking Traditional Constraints"
  },
  {
    line1: "Your AI Application",
    highlight: "Production-Ready",
    line2: "Shipped in Days, Not Months"
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

export function HeroContent() {
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

  // Tech-focused content only

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
            className="text-4xl md:text-5xl lg:text-6xl font-light text-white absolute inset-0 flex flex-col items-start"
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
        className="text-xl md:text-2xl text-white/70 max-w-2xl backdrop-blur-sm lg:backdrop-blur-none mt-12 lg:mt-16 font-light"
      >
        AI automation cuts development costs by 60% and ships products 10x faster. Seamlessly integrate intelligent agents into your workflow and deliver value to your customers in days not months.
      </motion.p>
    </div>
  );
}