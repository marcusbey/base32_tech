"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

const taglines = [
  {
    text: "Digital Agents: ",
    highlight: "Revolutionizing Production at Unmatched Speed",
    color: "text-blue-500",
  },
  {
    text: "Enterprise Solutions: ",
    highlight: "Smarter Automation, Faster Scaling, Greater Success",
    color: "text-indigo-500",
  },
  {
    text: "Your Application: ",
    highlight: "AI-Powered, MVP-Ready, Delivered Faster Than Ever",
    color: "text-violet-500",
  },
];

export default function Hero() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % taglines.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative min-h-[90vh] flex items-center justify-center">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 text-center">
        <div className="space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative"
          >
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 tracking-tight">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentIndex}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                  className="flex flex-col items-center justify-center gap-2"
                >
                  <span className="text-white/90">{taglines[currentIndex].text}</span>
                  <span className={`${taglines[currentIndex].color} font-extrabold`}>
                    {taglines[currentIndex].highlight}
                  </span>
                </motion.div>
              </AnimatePresence>
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto"
          >
            Leverage our cutting-edge AI solutions to transform your business operations
            and accelerate your digital transformation journey.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-8"
          >
            <a
              href="#contact"
              className="px-8 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-medium text-lg hover:from-blue-600 hover:to-indigo-700 transition-all duration-200 transform hover:scale-105"
            >
              Get Started
            </a>
            <a
              href="#showcase"
              className="px-8 py-3 rounded-xl border border-gray-700 text-gray-300 font-medium text-lg hover:bg-gray-800 transition-all duration-200 transform hover:scale-105"
            >
              View Showcase
            </a>
          </motion.div>

          {/* Indicators */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="flex justify-center gap-2 mt-8"
          >
            {taglines.map((_, index) => (
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
        </div>
      </div>
    </div>
  );
}
