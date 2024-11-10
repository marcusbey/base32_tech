"use client";

import { motion } from 'framer-motion';
import { useCompany } from './company-provider';
import { CircuitBoard, Palette } from 'lucide-react';

export default function Navigation() {
  const { company, toggleCompany } = useCompany();

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed bottom-8 left-1/2 -translate-x-1/2 z-50 ${
        company === 'tech'
          ? 'bg-black/50 text-white'
          : 'bg-white/50 text-black'
      } backdrop-blur-lg rounded-full px-6 py-3`}
    >
      <div className="flex items-center gap-8">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={toggleCompany}
          className="flex items-center gap-2"
        >
          {company === 'tech' ? (
            <>
              <CircuitBoard className="w-5 h-5" />
              <span className="font-bold">BASE32.TECH</span>
            </>
          ) : (
            <>
              <Palette className="w-5 h-5" />
              <span className="font-bold">BASE32.STUDIO</span>
            </>
          )}
        </motion.button>
        
        <div className="flex gap-6">
          {['Services', 'About', 'Contact'].map((item) => (
            <motion.a
              key={item}
              href={`#${item.toLowerCase()}`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative"
            >
              {item}
              <motion.div
                className="absolute -bottom-1 left-0 w-full h-0.5 bg-current"
                initial={{ scaleX: 0 }}
                whileHover={{ scaleX: 1 }}
              />
            </motion.a>
          ))}
        </div>
      </div>
    </motion.nav>
  );
}