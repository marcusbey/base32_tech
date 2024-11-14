"use client";

import { useCompany } from "@/lib/company-context";
import { motion, useScroll, useTransform } from "framer-motion";

export default function BackgroundEffects() {
  const { company } = useCompany();
  const { scrollYProgress } = useScroll();

  // Scale down the glow as user scrolls
  const glowScale = useTransform(scrollYProgress, [0, 0.2], [1, 0.8]);
  const glowOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  return (
    <div className="fixed inset-0 -z-10">
      {company === "tech" ? (
        <>
          <div className="absolute inset-0 bg-gradient-to-br from-black via-blue-950/10 to-black" />

          {/* Centered glow effect */}
          <motion.div
            style={{
              scale: glowScale,
              opacity: glowOpacity,
            }}
            className="absolute bottom-0 right-0 w-[800px] h-[800px] flex items-center justify-center"
          >
            {/* Multiple layers for the glow effect */}
            <div className="absolute inset-0 rounded-full bg-blue-900/5 blur-[120px]" />
            <div className="absolute inset-[10%] rounded-full bg-blue-900/5 blur-[100px]" />
            <div className="absolute inset-[20%] rounded-full bg-blue-800/5 blur-[80px]" />
            <div className="absolute inset-[30%] rounded-full bg-blue-700/5 blur-[60px]" />

            {/* Animated inner glow */}
            <motion.div
              className="absolute inset-[40%] rounded-full bg-blue-900/10 blur-[40px]"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.1, 0.15, 0.1],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </motion.div>
        </>
      ) : (
        <div className="absolute inset-0 bg-white" />
      )}
    </div>
  );
}
