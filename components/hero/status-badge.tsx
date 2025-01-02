"use client";

import { motion } from 'framer-motion';

interface StatusBadgeProps {
  isStudio: boolean;
}

export function StatusBadge({ isStudio }: StatusBadgeProps) {
  return (
    <div className="flex items-center gap-2">
      <motion.div
        className={`w-2 h-2 rounded-full ${
          isStudio ? 'bg-indigo-500' : 'bg-yellow-400'
        }`}
        animate={{
          scale: [1, 1.5, 1],
          opacity: [1, 0.5, 1],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <span className={`text-xs uppercase tracking-wider font-light ${
        isStudio ? 'text-indigo-400' : 'text-yellow-400'
      }`}>
        Available Now
      </span>
    </div>
  );
}