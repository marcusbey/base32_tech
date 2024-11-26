"use client";

import { motion } from 'framer-motion';
import Image from 'next/image';

interface LogoProps {
  isStudio: boolean;
}

export function Logo({ isStudio }: LogoProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="absolute top-8 left-8 z-30"
    >
      <div className="flex items-center gap-3">
        <motion.div
          whileHover={{ rotate: 180 }}
          transition={{ duration: 0.5 }}
          className={`p-3 rounded-xl ${
            isStudio 
              ? 'bg-white/10 backdrop-blur-md'
              : 'bg-black/20 backdrop-blur-md'
          }`}
        >
          <div className="w-6 h-6 relative">
            <Image
              src={isStudio ? '/images/dark_base32.svg' : '/images/white_base32.svg'}
              alt="Base32 Logo"
              fill
              className="object-contain"
              priority
            />
          </div>
        </motion.div>
        <div className={`hidden sm:block ${
          isStudio ? 'text-gray-800' : 'text-white'
        }`}>
          <h3 className="text-lg font-bold leading-none">
            BASE32
          </h3>
          <p className="text-sm opacity-80">
            {isStudio ? '.STUDIO' : '.TECH'}
          </p>
        </div>
      </div>
    </motion.div>
  );
}