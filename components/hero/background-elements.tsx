"use client";

import { motion, MotionValue } from "framer-motion";
import dynamic from "next/dynamic";
import { AuroraBackground } from "../ui/aurora-background";
import { Spotlight } from "../ui/spotlight";
import { useDevice } from "@/hooks/use-device";

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

  return (
    <>
      {/* Spotlight effect for tech page */}
      {!isStudio && !isMobile && (
        <Spotlight className="!-top-[20%] !-left-[20%] fill-yellow-400/20" />
      )}

      {/* Grid Background for Studio */}
      {isStudio && (
        <motion.div
          className="hero-grid shadow-lg"
          style={{ opacity: gridOpacity }}
        />
      )}

      {/* Shape container with proper positioning */}
      {!isLoading && !isMobile && (
        <div
          className={`absolute inset-0 shape-layer ${
            isStudio ? "z-[11]" : "lg:z-[11] z-[5]"
          }`}
        >
          {isStudio ? <StudioShape /> : <TechShape />}
        </div>
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
      {isStudio && !isMobile && (
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
