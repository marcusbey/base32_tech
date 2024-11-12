"use client";

import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

interface TechButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

export default function TechButton({ children, onClick, className = '' }: TechButtonProps) {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`group relative px-8 py-3 rounded-full font-medium 
        bg-yellow-500 text-black overflow-hidden
        transition-all duration-300 ${className}`}
    >
      <div className="relative z-10 flex items-center gap-2">
        {children}
        <motion.div
          initial={{ x: -4, opacity: 0.5 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{
            repeat: Infinity,
            duration: 1,
            ease: "easeInOut"
          }}
        >
          <ArrowRight className="w-4 h-4" />
        </motion.div>
      </div>

      {/* Animated background gradient */}
      <motion.div
        className="absolute inset-0 -z-10 bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600"
        animate={{
          transform: ["translateX(-100%)", "translateX(100%)"],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "linear",
        }}
      />
    </motion.button>
  );
}