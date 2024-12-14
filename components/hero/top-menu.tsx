"use client";

import { motion } from 'framer-motion';
import { Logo } from './logo';
import ThemeSwitch from '../theme-switch';
import Link from 'next/link';
import { useCompany } from '@/lib/company-context';

export function TopMenu() {
  const { company } = useCompany();
  const isStudio = company === 'studio';

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-30 px-8 py-6"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Left Side - Logo */}
        <div className="flex-1">
          <Logo isStudio={isStudio} />
        </div>

        {/* Center - Theme Switch */}
        <div className="flex-1 flex justify-center">
          <ThemeSwitch />
        </div>

        {/* Right Side - Contact Button */}
        <div className="flex-1 flex justify-end">
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
        </div>
      </div>
    </motion.div>
  );
}
