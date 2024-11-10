"use client";

import { motion } from 'framer-motion';
import { useCompany } from './company-provider';

export default function ThemeSwitch() {
  const { company, toggleCompany } = useCompany();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed top-8 left-1/2 -translate-x-1/2 z-50"
    >
      <div className="relative">
        {/* Glow effect */}
        <motion.div
          className={`absolute inset-0 rounded-full blur-xl opacity-50 ${
            company === 'tech'
              ? 'bg-blue-500'
              : 'bg-gradient-to-r from-purple-400 to-pink-400'
          }`}
          animate={{
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        <motion.button
          onClick={toggleCompany}
          className={`relative w-24 h-12 rounded-full backdrop-blur-lg ${
            company === 'tech'
              ? 'bg-black/30 border border-blue-500/20'
              : 'bg-white/30 border border-gray-200/50'
          }`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <motion.div
            className={`absolute top-1.5 left-1.5 w-9 h-9 rounded-full ${
              company === 'tech'
                ? 'bg-gradient-to-r from-blue-400 to-cyan-400'
                : 'bg-gradient-to-r from-purple-400 to-pink-400'
            }`}
            animate={{
              x: company === 'tech' ? 0 : 48,
            }}
            transition={{
              type: "spring",
              stiffness: 500,
              damping: 30
            }}
          />
        </motion.button>
      </div>
    </motion.div>
  );
}