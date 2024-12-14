'use client';

import { motion } from 'framer-motion';
import Particles from '../shapes/particles';
import GridBackground from '../shapes/grid-background';

interface BackgroundElementsProps {
  isStudio: boolean;
  gridOpacity: any;
  auroraOpacity: any;
}

export function BackgroundElements({
  isStudio,
  gridOpacity,
  auroraOpacity,
}: BackgroundElementsProps) {
  return (
    <>
      {/* Grid */}
      {isStudio ? (
        <motion.div
          style={{ opacity: gridOpacity }}
          className="absolute inset-0 bg-grid-gray-800/[0.04] bg-[length:40px_40px]"
        />
      ) : (
        <motion.div style={{ opacity: gridOpacity }} className="absolute inset-0">
          <GridBackground />
        </motion.div>
      )}

      {/* Particles - Only show on TECH page */}
      {!isStudio && (
        <motion.div
          style={{ opacity: auroraOpacity }}
          className="absolute inset-0"
        >
          <Particles
            className="h-full w-full"
            quantity={100}
            staticity={20}
            ease={30}
            size={2}
            mouseForce={1.2}
            isStudio={isStudio}
          />
        </motion.div>
      )}
    </>
  );
}
