"use client";

import { motion } from 'framer-motion';
import Link from 'next/link';

// No longer need props as we're focusing only on tech

export function CTAButton() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="absolute top-8 right-8 z-30"
    >
      <Link href="/contact">
        <motion.button
          className="px-6 sm:px-8 py-3 rounded-xl text-base sm:text-lg font-light tracking-tight transition-transform bg-yellow-500 hover:bg-yellow-600 text-black"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Contact
          <span className="absolute inset-0 w-full h-full -z-10 opacity-50 blur-xl rounded-3xl bg-yellow-500" />
        </motion.button>
      </Link>
    </motion.div>
  );
}
