"use client";

import { motion, LazyMotion, domAnimation } from 'framer-motion';
import { useCompany } from '@/lib/company-context';
import { cn } from "@/lib/utils";
import { Github, Linkedin, Twitter } from 'lucide-react';
import { Logo } from '@/components/hero/logo';
import { siteConfig } from "@/config/site";
import { useEffect, useRef, useState, useMemo, useCallback } from 'react';
import { XIcon } from "./icons/x-icon";
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { debounce } from 'lodash';

interface Dimensions {
  width: number;
  height: number;
}

interface MousePosition {
  x: number;
  y: number;
}

interface NavigationItem {
  name: string;
  href: string;
  icon?: React.ComponentType<{ className?: string }>;
}

const techColors = {
  base: ["#1E3A8A", "#1E40AF", "#1D4ED8"] as const,
  bright: ["#3B82F6", "#60A5FA", "#93C5FD"] as const,
} as const;

const studioColors = {
  base: ["#4338CA", "#4F46E5", "#6366F1"] as const,
  bright: ["#818CF8", "#A5B4FC", "#C7D2FE"] as const,
} as const;

export default function Footer() {
  const { company } = useCompany();
  const isTech = company === 'tech';
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState<Dimensions>({ width: 0, height: 0 });
  const [mousePos, setMousePos] = useState<MousePosition>({ x: 0, y: 0 });
  const [isClient, setIsClient] = useState(false);
  const router = useRouter();

  const gridSize = 60;
  const baseDotSize = 2;
  const hoverRadius = 150;

  const colors = useMemo(() => isTech ? techColors : studioColors, [isTech]);

  const updateDimensions = useCallback(debounce(() => {
    if (containerRef.current) {
      setDimensions({
        width: containerRef.current.offsetWidth,
        height: containerRef.current.offsetHeight
      });
    }
  }, 250), []);

  useEffect(() => {
    setIsClient(true);
    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => {
      window.removeEventListener('resize', updateDimensions);
      updateDimensions.cancel();
    };
  }, [updateDimensions]);

  const throttledHandleMouseMove = useCallback(
    debounce((e: React.MouseEvent) => {
      const rect = containerRef.current?.getBoundingClientRect();
      if (rect) {
        setMousePos({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top
        });
      }
    }, 16), // ~60fps
    []
  );

  const getColorVariant = useCallback((x: number, y: number, colorSet: readonly string[]) => {
    const index = Math.abs(Math.floor((x + y) / gridSize)) % colorSet.length;
    return colorSet[index];
  }, [gridSize]);

  interface GridElement {
    key: string;
    x: number;
    y: number;
    isNearMouse: boolean;
    intensity: number;
    baseColor: string;
    brightColor?: string;
  }

  const generateDotPositions = useCallback(() => {
    if (!isClient) return [];

    const positions: GridElement[] = [];
    const cols = Math.ceil(dimensions.width / gridSize) + 1;
    const rows = Math.ceil(dimensions.height / gridSize) + 1;
    
    // Optimization: Only generate dots within viewport + buffer
    const viewportBuffer = hoverRadius;
    const minCol = Math.max(0, Math.floor((mousePos.x - viewportBuffer) / gridSize));
    const maxCol = Math.min(cols, Math.ceil((mousePos.x + viewportBuffer) / gridSize));
    const minRow = Math.max(0, Math.floor((mousePos.y - viewportBuffer) / gridSize));
    const maxRow = Math.min(rows, Math.ceil((mousePos.y + viewportBuffer) / gridSize));

    for (let i = minCol; i <= maxCol; i++) {
      for (let j = minRow; j <= maxRow; j++) {
        const x = i * gridSize;
        const y = j * gridSize;
        const dx = mousePos.x - x;
        const dy = mousePos.y - y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        // Only process dots within hover radius
        if (distance < hoverRadius) {
          const intensity = Math.pow(1 - (distance / hoverRadius), 2);
          positions.push({
            key: `dot-${i}-${j}`,
            x,
            y,
            isNearMouse: true,
            intensity,
            baseColor: getColorVariant(x, y, colors.base),
            brightColor: colors.bright[Math.floor((x + y) / gridSize) % colors.bright.length]
          });
        }
      }
    }
    return positions;
  }, [isClient, dimensions, mousePos, colors, getColorVariant, gridSize, hoverRadius]);

  const generateGrid = useCallback(() => {
    const positions = generateDotPositions();
    return positions.map(({ key, x, y, intensity, baseColor, brightColor }) => (
      <motion.circle
        key={key}
        cx={x}
        cy={y}
        r={baseDotSize}
        fill={baseColor}
        initial={false}
        animate={{
          opacity: 0.3 + (intensity * 0.7),
          scale: 1 + (intensity * 1),
          fill: brightColor || baseColor,
        }}
        transition={{ 
          type: "spring", 
          stiffness: 500, // Reduced from 1000
          damping: 30,   // Reduced from 50
          mass: 0.05     // Reduced from 0.1
        }}
      />
    ));
  }, [generateDotPositions, baseDotSize]);

  const grid = useMemo(() => generateGrid(), [generateGrid]);

  const navigation = useMemo(() => ({
    company: [
      { name: 'Services', href: `${siteConfig.baseUrl}/#services-section` },
      { name: 'Pricing', href: `${siteConfig.baseUrl}/#pricing-section` },
      { name: 'About', href: `${siteConfig.baseUrl}/#about-section` },
      { name: 'Contact', href: `${siteConfig.baseUrl}/#contact-section` },
    ] as NavigationItem[],
    links: [
      { name: 'X', href: 'https://x.com/romainbey', icon: XIcon },
      { name: 'GitHub', href: 'https://github.com/marcusbey', icon: Github },
      { name: 'LinkedIn', href: 'https://linkedin.com/company/base32-tech/', icon: Linkedin },
    ] as NavigationItem[],
  }), []);

  const scrollToSection = useCallback((e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const sectionId = href.split('#')[1];
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
  }, []);

  return (
    <LazyMotion features={domAnimation}>
      <footer 
        ref={containerRef}
        onMouseMove={throttledHandleMouseMove}
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
            {grid}
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
                        onClick={(e) => scrollToSection(e, item.href)}
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Social Links */}
              <div className="flex gap-4">
                {navigation.links.map((link) => {
                  const Icon = link.icon;
                  return Icon ? (
                    <a
                      key={link.name}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-blue-400 transition-colors"
                    >
                      <Icon className="w-6 h-6" />
                    </a>
                  ) : null;
                })}
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
              {navigation.links.map((link) => {
                const Icon = link.icon;
                return Icon ? (
                  <a
                    key={link.name}
                    href={link.href}
                    className={isTech ? 'text-gray-400 hover:text-white' : 'text-gray-400 hover:text-white'}
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                ) : null;
              })}
            </div>
          </div>
        </div>
      </footer>
    </LazyMotion>
  );
}