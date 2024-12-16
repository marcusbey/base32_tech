"use client";

import { motion } from 'framer-motion';
import { useCompany } from '@/lib/company-context';
import { cn } from "@/lib/utils";
import { Github, Linkedin, Twitter } from 'lucide-react';
import { Logo } from '@/components/hero/logo';
import { siteConfig } from "@/config/site";
import { useEffect, useRef, useState } from 'react';
import { XIcon } from "./icons/x-icon";
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function Footer() {
  const { company } = useCompany();
  const isTech = company === 'tech';
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isClient, setIsClient] = useState(false);
  const router = useRouter();

  const gridSize = 60;
  const baseDotSize = 2;
  const hoverRadius = 150;

  const techColors = {
    base: ["#1E3A8A", "#1E40AF", "#1D4ED8"], // Darker blue
    bright: ["#3B82F6", "#60A5FA", "#93C5FD"],
  };

  const studioColors = {
    base: ["#4338CA", "#4F46E5", "#6366F1"],
    bright: ["#818CF8", "#A5B4FC", "#C7D2FE"],
  };

  const colors = isTech ? techColors : studioColors;

  useEffect(() => {
    setIsClient(true);
    const updateDimensions = () => {
      if (containerRef.current) {
        setDimensions({
          width: containerRef.current.offsetWidth,
          height: containerRef.current.offsetHeight
        });
      }
    };
    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (rect) {
      setMousePos({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      });
    }
  };

  const getColorVariant = (x: number, y: number, colorSet: string[]) => {
    const index = Math.abs(Math.floor((x + y) / gridSize)) % colorSet.length;
    return colorSet[index];
  };

  const generateGrid = () => {
    if (!isClient) return [];

    const gridElements = [];
    const cols = Math.ceil(dimensions.width / gridSize) + 1;
    const rows = Math.ceil(dimensions.height / gridSize) + 1;

    // Generate dots
    for (let i = 0; i <= cols; i++) {
      for (let j = 0; j <= rows; j++) {
        const x = i * gridSize;
        const y = j * gridSize;
        const dx = mousePos.x - x;
        const dy = mousePos.y - y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const isNearMouse = distance < hoverRadius;
        const intensity = isNearMouse ? Math.pow(1 - (distance / hoverRadius), 2) : 0;
        
        gridElements.push(
          <motion.circle
            key={`dot-${i}-${j}`}
            cx={x}
            cy={y}
            r={baseDotSize}
            fill={getColorVariant(x, y, colors.base)}
            initial={{ opacity: 0.3, scale: 1 }}
            animate={{
              opacity: 0.3 + (intensity * 0.7),
              scale: 1 + (intensity * 1),
              fill: isNearMouse ? colors.bright[Math.floor((x + y) / gridSize) % colors.bright.length] : getColorVariant(x, y, colors.base),
            }}
            transition={{ type: "spring", stiffness: 1000, damping: 50, mass: 0.1 }}
          />
        );

        // Add connecting lines when near mouse
        if (isNearMouse && i < cols && j < rows) {
          const nextX = (i + 1) * gridSize;
          const nextY = (j + 1) * gridSize;
          
          gridElements.push(
            <motion.line
              key={`line-h-${i}-${j}`}
              x1={x}
              y1={y}
              x2={nextX}
              y2={y}
              stroke={getColorVariant(x, y, colors.bright)}
              strokeOpacity={intensity * 0.4}
              strokeWidth={1.5}
              initial={false}
            />,
            <motion.line
              key={`line-v-${i}-${j}`}
              x1={x}
              y1={y}
              x2={x}
              y2={nextY}
              stroke={getColorVariant(x, y, colors.bright)}
              strokeOpacity={intensity * 0.4}
              strokeWidth={1.5}
              initial={false}
            />
          );
        }
      }
    }

    return gridElements;
  };

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const sectionId = href.replace('#', '');
    const section = document.getElementById(sectionId);
    
    if (section) {
      const headerOffset = 80;
      const elementPosition = section.offsetTop;
      const offsetPosition = elementPosition - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  const navigation = {
    company: [
      { name: 'Services', href: `${siteConfig.baseUrl}/#services-section` },
      { name: 'Pricing', href: `${siteConfig.baseUrl}/#pricing-section` },
      { name: 'About', href: `${siteConfig.baseUrl}/#about-section` },
      { name: 'Contact', href: `${siteConfig.baseUrl}/#contact-section` },
    ],
    links: [
      { name: 'X', href: 'https://x.com/romainbey', icon: XIcon },
      { name: 'GitHub', href: 'https://github.com/marcusbey', icon: Github },
      { name: 'LinkedIn', href: 'https://linkedin.com/company/base32-tech/', icon: Linkedin },
    ],
  };

  return (
    <footer 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className={`relative overflow-hidden ${
        isTech ? 'bg-gradient-to-b from-[#1E3A8A] to-[#1E40AF]' : 'bg-gradient-to-b from-gray-900 to-black'
      } border-t ${
        isTech ? 'border-blue-500/20' : 'border-gray-200/20'
      }`}
    >
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black pointer-events-none" />

      {/* Interactive Grid Background */}
      <motion.svg
        className="absolute inset-0 w-full h-full pointer-events-none mix-blend-screen"
        initial={false}
      >
        <defs>
          <filter id="glow">
            <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        <g>
          {generateGrid()}
        </g>
      </motion.svg>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
        {/* Main footer content */}
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-12">
          {/* Logo and description */}
          <div className="lg:max-w-sm">
            <div className="flex items-center gap-2 mb-6">
              <Logo isStudio={!isTech} />
            </div>
            <p className={`text-base leading-relaxed ${
              isTech ? 'text-gray-400' : 'text-gray-400'
            }`}>
              Building the future through technology and design. We create solutions that transform businesses and delight users.
            </p>
          </div>

          {/* Navigation and Social Links */}
          <div className="flex flex-col sm:flex-row gap-12 lg:gap-24">
            {/* Navigation Links */}
            <div>
              <h3 className={`text-sm font-semibold uppercase tracking-wider mb-4 ${
                isTech ? 'text-gray-300' : 'text-gray-300'
              }`}>
                Navigation
              </h3>
              <ul className="space-y-3">
                {navigation.company.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className={`text-sm hover:underline transition-colors ${
                        isTech 
                          ? 'text-gray-400 hover:text-white' 
                          : 'text-gray-400 hover:text-white'
                      }`}
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Social Links */}
            <div className="flex gap-4">
              {navigation.links.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-blue-400 transition-colors"
                >
                  <link.icon className="w-6 h-6" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className={`mt-16 pt-8 border-t ${
          isTech ? 'border-blue-500/20' : 'border-gray-200/20'
        } flex flex-col sm:flex-row justify-between items-center gap-4`}>
          <p className={`text-sm ${
            isTech ? 'text-gray-400' : 'text-gray-400'
          }`}>
            &copy; 2024 BASE32. All rights reserved.
          </p>
          
          {/* Social icons for mobile */}
          <div className="flex gap-6 sm:hidden">
            {navigation.links.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className={isTech ? 'text-gray-400 hover:text-white' : 'text-gray-400 hover:text-white'}
              >
                <link.icon className="w-5 h-5" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}