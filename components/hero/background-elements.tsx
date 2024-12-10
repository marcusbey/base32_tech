"use client";

import { motion, MotionValue } from "framer-motion";
import dynamic from "next/dynamic";
import { AuroraBackground } from "../ui/aurora-background";
import { Spotlight } from "../ui/spotlight";
import { useDevice } from "@/hooks/use-device";
import { Suspense, useEffect, useState } from "react";
import GridBackground from "../shapes/grid-background";
import TechParticles from "../shapes/tech-particles";

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

  // Detect low performance devices
  useEffect(() => {
    const checkPerformance = () => {
      // Check if device has a low refresh rate or is thermal throttling
      const isLowRefreshRate = window.screen.availWidth * window.screen.availHeight > 2073600; // > 1080p
      setIsLowPerformance(isLowRefreshRate || isMobile);
    };
    
    checkPerformance();
    window.addEventListener('resize', checkPerformance);
    return () => window.removeEventListener('resize', checkPerformance);
  }, [isMobile]);

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
        </>
      ) : (
        <>
          <GridBackground />
          <div className="fixed inset-0 pointer-events-none">
            <TechParticles />
          </div>
        </>
      )}

      {render3DScene()}

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
            {/* Empty div as children to satisfy prop requirement */}
            <div />
          </AuroraBackground>
        </motion.div>
      )}
    </>
  );
}
