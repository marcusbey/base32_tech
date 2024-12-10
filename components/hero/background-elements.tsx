"use client";

import { motion, MotionValue } from "framer-motion";
import { AuroraBackground } from "../ui/aurora-background";
import { Spotlight } from "../ui/spotlight";
import { useDevice } from "@/hooks/use-device";
import { useEffect, useState } from "react";
import GridBackground from "../shapes/grid-background";
import TechParticles from "../shapes/tech-particles";

interface BackgroundElementsProps {
  isStudio: boolean;
  gridOpacity: MotionValue<number>;
  auroraOpacity: MotionValue<number>;
}

export function BackgroundElements({
  isStudio,
  gridOpacity,
  auroraOpacity,
}: BackgroundElementsProps) {
  const { isMobile, isLoading } = useDevice();
  const [isLowPerformance, setIsLowPerformance] = useState(false);

  // Detect low performance devices
  useEffect(() => {
    const checkPerformance = () => {
      const isLowRefreshRate = window.screen.availWidth * window.screen.availHeight > 2073600;
      setIsLowPerformance(isLowRefreshRate || isMobile);
    };
    
    checkPerformance();
    window.addEventListener('resize', checkPerformance);
    return () => window.removeEventListener('resize', checkPerformance);
  }, [isMobile]);

  return (
    <>
      {/* Spotlight effect for tech page */}
      {!isStudio && !isMobile && (
        <Spotlight className="!-top-[20%] !-left-[20%] fill-yellow-400/20" />
      )}

      {isStudio ? (
        <>
          {/* Grid Background for Studio */}
          <motion.div
            className="hero-grid shadow-lg"
            style={{ opacity: gridOpacity }}
          />
        </>
      ) : (
        <>
          <div className="absolute inset-0">
            <GridBackground />
          </div>
          <div className="absolute inset-0 pointer-events-none">
            <TechParticles />
          </div>
        </>
      )}

      {/* Mobile fallback background */}
      {isMobile && (
        <div className="absolute inset-0 z-[5]">
          <div className={`absolute inset-0 ${
            isStudio 
              ? 'bg-gradient-to-b from-indigo-500/10 to-transparent'
              : 'bg-gradient-to-b from-yellow-500/10 to-transparent'
          }`} />
        </div>
      )}

      {/* Aurora Background only for Studio */}
      {isStudio && !isMobile && !isLowPerformance && (
        <motion.div
          className="absolute inset-0 z-[10]"
          style={{ opacity: auroraOpacity }}
        >
          <AuroraBackground>
            <div />
          </AuroraBackground>
        </motion.div>
      )}
    </>
  );
}
