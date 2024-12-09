"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { TextScramble } from "../animations/text-scramble";

const techTaglines = [
  {
    highlight: "Digital Agents",
    text: "Revolutionizing Production at Unmatched Speed",
    color: "from-blue-500 to-blue-300",
  },
  {
    highlight: "Smarter Automation",
    text: "Faster Scaling, Greater Success",
    color: "from-indigo-500 to-indigo-300",
  },
  {
    highlight: "AI-Powered, MVP-Ready",
    text: "Delivered Faster Than Ever",
    color: "from-violet-500 to-violet-300",
  },
];

interface HeroContentProps {
  isStudio: boolean;
}

export function HeroContent({ isStudio }: HeroContentProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showSurroundingText, setShowSurroundingText] = useState(false);
  const [isScrambling, setIsScrambling] = useState(true);

  useEffect(() => {
    if (!isStudio) {
      const cycleAnimation = () => {
        // Start with scramble
        setIsScrambling(true);
        setShowSurroundingText(false);

        // After scramble completes, show surrounding text
        const surroundingTextTimeout = setTimeout(() => {
          setShowSurroundingText(true);
        }, 800); // Adjust timing as needed

        // Before next cycle, hide surrounding text
        const hideTextTimeout = setTimeout(() => {
          setShowSurroundingText(false);
        }, 2500);

        // Start next cycle
        const nextCycleTimeout = setTimeout(() => {
          setCurrentIndex((prev) => (prev + 1) % techTaglines.length);
        }, 3000);

        return () => {
          clearTimeout(surroundingTextTimeout);
          clearTimeout(hideTextTimeout);
          clearTimeout(nextCycleTimeout);
        };
      };

      const animation = cycleAnimation();
      return () => {
        animation();
      };
    }
  }, [isStudio, currentIndex]);

  return (
    <div className="max-w-5xl">
      {isStudio ? (
        <>
          <h1 className="text-7xl md:text-9xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 leading-tight">
            Creative Design Solutions
          </h1>
          <p className="text-xl md:text-2xl text-gray-700 max-w-2xl">
            We craft brands and user experiences for companies building a brighter future. Our design-driven approach transforms ideas into impactful digital experiences.
          </p>
        </>
      ) : (
        <>
          <div className="mb-8">
            <h1 className="text-6xl md:text-8xl font-bold text-white flex flex-col items-start gap-4">
              <div className="flex flex-col gap-2">
                <TextScramble
                  text={techTaglines[currentIndex].highlight}
                  isActive={isScrambling}
                  onComplete={() => setIsScrambling(false)}
                  className={`bg-clip-text text-transparent bg-gradient-to-r ${techTaglines[currentIndex].color}`}
                />
                <AnimatePresence mode="wait">
                  {showSurroundingText && (
                    <motion.span
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="text-white/90"
                    >
                      {techTaglines[currentIndex].text}
                    </motion.span>
                  )}
                </AnimatePresence>
              </div>
            </h1>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl md:text-2xl text-white/70 max-w-2xl backdrop-blur-sm lg:backdrop-blur-none"
          >
            Leverage our cutting-edge AI solutions to transform your business operations
            and accelerate your digital transformation journey.
          </motion.p>
          
          {/* Indicators */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="flex gap-2 mt-8"
          >
            {techTaglines.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? "bg-blue-500 w-6"
                    : "bg-gray-600"
                }`}
              />
            ))}
          </motion.div>
        </>
      )}
    </div>
  );
}