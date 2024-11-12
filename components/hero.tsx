"use client";

import { motion, useScroll, useTransform } from 'framer-motion';
import { useCompany } from '@/lib/company-context';
import dynamic from 'next/dynamic';
import { Spotlight } from './ui/spotlight';
import { AuroraBackground } from "./ui/aurora-background";

const StudioShape = dynamic(() => import('./shapes/studio-shape'), { ssr: false });
const TechShape = dynamic(() => import('./shapes/tech-shape'), { ssr: false });

export default function Hero() {
  const { company } = useCompany();
  const { scrollYProgress } = useScroll();
  
  // Transform values for scroll animations - complete fade out by 15% scroll (faster)
  const opacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.15], [1, 0.7]); // More dramatic scale
  const y = useTransform(scrollYProgress, [0, 0.15], [0, -100]); // Faster movement up
  const gridOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  const auroraOpacity = useTransform(scrollYProgress, [0, 0.15], [0.5, 0]); // Aurora fade out

  const isStudio = company === 'studio';

  return (
    <section className="fixed inset-0 h-screen flex items-center justify-center overflow-hidden">
      {/* Spotlight effect for tech page */}
      {!isStudio && (
        <Spotlight className="!-top-[20%] !-left-[20%]" fill="rgb(234 179 8)" />
      )}

      {/* Grid Background for Studio */}
      {isStudio && (
        <motion.div 
          className="hero-grid shadow-lg"
          style={{ opacity: gridOpacity }}
        />
      )}

      {/* Shape container with proper positioning */}
      <div className={`absolute inset-0 shape-layer ${
        isStudio ? 'z-[11]' : ''
      }`}>
        {isStudio ? <StudioShape /> : <TechShape />}
      </div>

      {/* Aurora Background only for Studio */}
      {isStudio && (
        <motion.div 
          className="absolute inset-0 z-[10]"
          style={{ opacity: auroraOpacity }}
        >
          <AuroraBackground />
        </motion.div>
      )}
      
      <motion.div 
        style={{ opacity, scale, y }}
        className="relative z-10 w-full max-w-7xl mx-auto px-8 lg:px-16"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-8"
        >
          <div className="flex items-center gap-2">
            <motion.div
              className={`w-2 h-2 rounded-full ${
                isStudio ? 'bg-indigo-500' : 'bg-green-400'
              }`}
              animate={{
                scale: [1, 1.5, 1],
                opacity: [1, 0.5, 1],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            <span className={`text-xs uppercase tracking-wider ${
              isStudio ? 'text-indigo-400' : 'text-yellow-400/80'
            }`}>
              Available Now
            </span>
          </div>

          <div className="max-w-5xl">
            {isStudio ? (
              <>
                <h1 className="text-7xl md:text-9xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 leading-tight">
                  Creative Design Solutions
                </h1>
                <p className="text-xl md:text-2xl text-gray-700 max-w-2xl">
                  We craft brands and user experiences for companies building a brighter future. Our design-driven approach transforms ideas into impactful digital experiences.
                </p>
              </>
            ) : (
              <>
                <h1 className="text-6xl md:text-8xl font-bold mb-8 text-white">
                  Intelligent Automation
                </h1>
                <p className="text-xl md:text-2xl text-white/70 max-w-2xl">
                  We create intelligent agents and automation tools that understand your needs, saving you 8 hours daily - no clicks required.
                </p>
              </>
            )}
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}