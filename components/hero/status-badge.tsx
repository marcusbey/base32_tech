"use client";

import { motion } from 'framer-motion';

// No longer need props as we're focusing only on tech

export function StatusBadge() {
  return (
    <div className="flex items-center gap-2">
      <motion.div
        className="w-2 h-2 rounded-full bg-yellow-400"
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
      <span className="text-xs uppercase tracking-wider font-light text-yellow-400">
        Available Now
      </span>
    </div>
  );
}