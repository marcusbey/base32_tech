"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {cn} from "@/lib/utils";

interface HeroContentProps {
  isStudio: boolean;
}

const taglines = [
  {
    line1: "Revolutionizing Production",
    highlight: "Digital Agents",
    line2: "Driving Speed and Efficiency"
  },
  {
    line1: "Enterprise Solutions",
    highlight: "Smarter Automation",
    line2: "Faster Scaling, Greater Success"
  },
  {
    line1: "Your Application",
    highlight: "MVP-Ready",
    line2: "Delivered Faster Than Ever"
  }
];

export function HeroContent({ isStudio }: HeroContentProps) {
  const [currentTagline, setCurrentTagline] = useState(0);

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
        <p className="text-xl md:text-2xl text-gray-700 max-w-2xl">
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
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white absolute inset-0 flex flex-col items-start"
          >
            <span className="text-indigo-200 mb-2">
              {taglines[currentTagline].line1}
            </span>
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-indigo-500 to-indigo-600 whitespace-nowrap mb-2">
              {taglines[currentTagline].highlight}
            </span>
            <span className="text-white/90">
              {taglines[currentTagline].line2}
            </span>
          </motion.div>
        </AnimatePresence>
      </div>
      <motion.p 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="text-xl md:text-2xl text-white/70 max-w-2xl backdrop-blur-sm lg:backdrop-blur-none"
      >
        We create intelligent agents and automation tools that understand your needs, saving you 8 hours daily - no clicks required.
      </motion.p>
    </div>
  );
}