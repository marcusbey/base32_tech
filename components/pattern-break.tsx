"use client";

import { useCompany } from "@/lib/company-context";
import TetrisGrid from "./shapes/tetris-grid";
import InteractiveGrid from "./shapes/interactive-grid"; // Import InteractiveGrid
import { motion } from "framer-motion";

export default function PatternBreak() {
  const { company } = useCompany();
  const isTech = company === "tech";
  
  return (
    <section 
      id="pattern-break-container"
      className="relative h-[40vh] sm:h-[50vh] overflow-hidden bg-gradient-to-b from-black via-gray-900 to-black"
    >
      {/* Background base */}
      <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-black opacity-50" />
      
      {/* TetrisGrid background */}
      <div className="absolute inset-0">
        <div className="relative w-full h-full scale-75 sm:scale-100"> 
          <InteractiveGrid />
        </div>
      </div>

      {/* Value proposition content */}
      <div className="relative z-10 max-w-7xl mx-auto h-full flex flex-col items-center sm:items-end justify-center px-4 sm:px-6 lg:px-8 text-center sm:text-right">
        <motion.h2 
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className={`text-4xl sm:text-4xl md:text-5xl lg:text-6xl font-light mb-3 sm:mb-6 max-w-3xl ${
            isTech 
              ? "bg-gradient-to-r from-blue-600 via-blue-500 to-blue-400" 
              : "bg-gradient-to-r from-indigo-600 via-indigo-500 to-indigo-400"
          } bg-clip-text text-transparent leading-tight`}
        >
          AI-Powered Solutions That Learn & Evolve With Your Business
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-lg sm:text-xl md:text-2xl text-gray-300 max-w-2xl font-light"
        >
          Harness the power of adaptive AI to stay ahead <br />in the digital race
        </motion.p>
      </div>
    </section>
  );
}
