"use client";

import { motion, useScroll, useTransform } from 'framer-motion';
import { useCompany } from '@/lib/company-context';
import { StatusBadge } from './hero/status-badge';
import { HeroContent } from './hero/hero-content';
import { BackgroundElements } from './hero/background-elements';
import { Logo } from './hero/logo';

export default function Hero() {
  const { company } = useCompany();
  const { scrollYProgress } = useScroll();
  
  // Transform values for scroll animations
  const opacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.15], [1, 0.7]);
  const y = useTransform(scrollYProgress, [0, 0.15], [0, -100]);
  const gridOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  const auroraOpacity = useTransform(scrollYProgress, [0, 0.15], [0.5, 0]);

  const isStudio = company === 'studio';

  return (
    <section className="fixed inset-0 h-screen flex items-center justify-center overflow-hidden">
      <Logo isStudio={isStudio} />
      
      <BackgroundElements 
        isStudio={isStudio}
        gridOpacity={gridOpacity}
        auroraOpacity={auroraOpacity}
      />
      
      <motion.div 
        style={{ opacity, scale, y }}
        className={`relative ${isStudio ? 'z-10' : 'z-20'} w-full max-w-7xl mx-auto px-8 lg:px-16`}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-8"
        >
          <StatusBadge isStudio={isStudio} />
          <HeroContent isStudio={isStudio} />
        </motion.div>
      </motion.div>
    </section>
  );
}