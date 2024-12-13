'use client';

import { motion, MotionValue } from "framer-motion";
import { AuroraBackground } from "../ui/aurora-background";
import { Spotlight } from "../ui/spotlight";
import { useDevice } from "@/hooks/use-device";
import GridBackground from "../shapes/grid-background";
import dynamic from "next/dynamic";
import { Suspense, useEffect, useState } from "react";

const StudioShape = dynamic(() => import("../shapes/studio-shape"), {
  ssr: false,
});
const TechShape = dynamic(() => import("../shapes/tech-shape"), { ssr: false });

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
  const [mounted, setMounted] = useState(false);

  // Detect low performance devices
  useEffect(() => {
    setMounted(true);
    const checkPerformance = () => {
      if (typeof window !== 'undefined') {
        const isLowRefreshRate = window.screen.availWidth * window.screen.availHeight > 2073600;
        setIsLowPerformance(isLowRefreshRate || isMobile);
      }
    };
    
    checkPerformance();
    window.addEventListener('resize', checkPerformance);
    return () => window.removeEventListener('resize', checkPerformance);
  }, [isMobile]);

  // Return a consistent structure during SSR
  if (!mounted) {
    return (
      <div className="relative">
        <div className="absolute inset-0" />
      </div>
    );
  }

    // Render 3D scene with proper fallbacks
    const render3DScene = () => {
      if (isLoading || isMobile || !isStudio) return null;
      
      return (
        <Suspense fallback={
          <div className="absolute inset-0 bg-gradient-to-b from-indigo-500/10 to-transparent" />
        }>
          <div className="absolute inset-0 shape-layer z-[11]">
            <StudioShape quality={isLowPerformance ? "low" : "high"} />
          </div>
        </Suspense>
      );
    };

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
            {render3DScene()}
        </>
      ) : (
        <>
          <div className="absolute inset-0">
            <GridBackground />
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
