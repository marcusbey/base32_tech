"use client";

import { motion } from 'framer-motion';
import Link from 'next/link';

interface CTAButtonProps {
  isStudio: boolean;
}

export function CTAButton({ isStudio }: CTAButtonProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="absolute top-8 right-8 z-30"
    >
      <Link href="/contact">
        <motion.button
          className={`relative px-4 py-2 rounded-full text-xs uppercase tracking-wide border ${
            isStudio 
              ? 'border-gray-300 text-gray-800 hover:border-indigo-400'
              : 'border-white/20 text-white hover:border-yellow-400'
          } transition-colors`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Contact
          <span className={`absolute inset-x-0 w-1/2 mx-auto -bottom-px h-px ${
            isStudio
              ? 'bg-gradient-to-r from-transparent via-indigo-500 to-transparent'
              : 'bg-gradient-to-r from-transparent via-yellow-400 to-transparent'
          }`} />
        </motion.button>
      </Link>
    </motion.div>
  );
}
