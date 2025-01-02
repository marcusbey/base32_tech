"use client";

import { motion, useScroll, useTransform } from 'framer-motion';
import { Logo } from './logo';
import Link from 'next/link';
import { useCompany } from '@/lib/company-context';
import { siteConfig } from '@/config/site';

export function TopMenu() {
  const { company } = useCompany();
  const isStudio = company === 'studio';
  const { scrollY } = useScroll();
  
  // Transform scroll position to opacity
  const opacity = useTransform(
    scrollY,
    [0, 2000], // scroll range
    [1, 0] // opacity range
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      style={{ opacity }}
      className="fixed top-0 left-0 right-0 z-30 px-3 sm:px-6 lg:px-8 py-4 sm:py-6"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Left Side - Logo */}
        <div className="flex-1">
          <Logo isStudio={isStudio} />
        </div>

        {/* Right Side - Contact Button */}
        <div className="flex-1 flex justify-end">
          <Link href={`${siteConfig.baseUrl}/#contact-section`}>
            <motion.button
              className={`relative px-2.5 sm:px-4 py-1 sm:py-2 rounded-full text-[10px] sm:text-xs uppercase tracking-wide border font-light ${
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
