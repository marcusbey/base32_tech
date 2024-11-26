"use client";

import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { useCompany } from "@/lib/company-context";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import Image from 'next/image';

export default function Navigation() {
  const { company, toggleCompany } = useCompany();
  const pathname = usePathname();
  const isStudio = company === 'studio';
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  // Get scroll progress
  const { scrollYProgress } = useScroll();
  
  // Transform width based on scroll - starts at 'auto', expands to max-w-4xl
  const width = useTransform(
    scrollYProgress,
    [0, 0.1], // Trigger animation when scrolling 10% of the page
    ["568px", "768px"] // From initial width to max-w-4xl (48rem = 768px)
  );

  const scrollToSection = (sectionId: string) => {
    if (pathname === '/') {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
    setIsMenuOpen(false);
  };

  const navItems = [
    { name: 'Services', path: '/#services', action: () => scrollToSection('services') },
    { name: 'Pricing', path: '/#pricing', action: () => scrollToSection('pricing') },
    { name: 'About', path: '/about' },
  ];

  return (
    <>
      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40"
          >
            {/* Backdrop */}
            <motion.div 
              className="absolute inset-0 backdrop-blur-xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className={`absolute inset-0 ${
                isStudio ? 'bg-white/80' : 'bg-black/80'
              }`} />
            </motion.div>

            {/* Menu Content */}
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 20 }}
              className="absolute inset-0 flex flex-col items-center justify-center p-8"
            >
              {/* Close Button */}
              <motion.button
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsMenuOpen(false)}
                className={`absolute top-8 right-8 p-3 rounded-full ${
                  isStudio
                    ? 'bg-gray-100 text-gray-900'
                    : 'bg-gray-900 text-white'
                }`}
              >
                <X className="w-6 h-6" />
              </motion.button>

              {/* Navigation Links */}
              <nav className="space-y-8">
                {[...navItems, { name: 'Contact', path: '/#contact', action: () => scrollToSection('contact') }].map((item, index) => (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="text-center"
                  >
                    {item.action ? (
                      <button
                        onClick={item.action}
                        className={`text-3xl font-medium ${
                          isStudio ? 'text-gray-900' : 'text-white'
                        }`}
                      >
                        {item.name}
                      </button>
                    ) : (
                      <Link
                        href={item.path}
                        onClick={() => setIsMenuOpen(false)}
                        className={`text-2xl font-medium font-semibold ${
                          isStudio ? 'text-gray-900' : 'text-white'
                        }`}
                      >
                        {item.name}
                      </Link>
                    )}
                  </motion.div>
                ))}
              </nav>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bottom Navigation Bar */}
      <div className="fixed bottom-0 left-0 right-0 flex justify-center items-center p-8 z-50">
        <motion.nav
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          style={{ width }}
          className="mega-glass-card rounded-full px-8 py-4 backdrop-blur-2xl bg-opacity-20 hover-glow"
        >
          <div className="flex items-center justify-between">
            {/* Logo Side */}
            <Link href="/">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={toggleCompany}
                className={`flex items-center gap-2 ${
                  isStudio ? 'text-gray-800' : 'text-white'
                }`}
              >
                <div className="w-4 h-4 relative">
                  <Image
                    src={isStudio ? '/images/dark_base32.svg' : '/images/white_base32.svg'}
                    alt="Base32 Logo"
                    fill
                    className="object-contain"
                    priority
                  />
                </div>
                <span className="text-sm font-medium">
                  {isStudio ? 'BASE32.STUDIO' : 'BASE32.TECH'}
                </span>
              </motion.button>
            </Link>

            {/* Navigation Items - Hidden on Mobile */}
            <div className="hidden md:flex items-center gap-8">
              {navItems.map((item) => (
                <motion.div key={item.name}>
                  {item.action ? (
                    <button
                      onClick={item.action}
                      className={`relative text-xs uppercase tracking-wide ${
                        isStudio ? 'text-gray-800' : 'text-white'
                      }`}
                    >
                      {item.name}
                      <motion.div
                        className={`absolute -bottom-1 left-0 w-full h-0.5 ${
                          isStudio ? 'bg-gray-800' : 'bg-white'
                        } opacity-50`}
                        initial={{ scaleX: 0 }}
                        whileHover={{ scaleX: 1 }}
                      />
                    </button>
                  ) : (
                    <Link href={item.path}>
                      <span className={`relative text-xs uppercase tracking-wide ${
                        isStudio ? 'text-gray-800' : 'text-white'
                      }`}>
                        {item.name}
                        <motion.div
                          className={`absolute -bottom-1 left-0 w-full h-0.5 ${
                            isStudio ? 'bg-gray-800' : 'bg-white'
                          } opacity-50`}
                          initial={{ scaleX: 0 }}
                          whileHover={{ scaleX: 1 }}
                        />
                      </span>
                    </Link>
                  )}
                </motion.div>
              ))}
              
              {/* Contact Button */}
              <motion.button
                onClick={() => scrollToSection('contact')}
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
            </div>

            {/* Mobile Menu Button - Visible only on Mobile */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsMenuOpen(true)}
              className={`md:hidden flex flex-col gap-1.5 ${
                isStudio ? 'text-gray-800' : 'text-white'
              }`}
            >
              <motion.span className="w-6 h-0.5 rounded-full bg-current" />
              <motion.span className="w-4 h-0.5 rounded-full bg-current" />
              <motion.span className="w-6 h-0.5 rounded-full bg-current" />
            </motion.button>
          </div>
        </motion.nav>
      </div>
    </>
  );
}