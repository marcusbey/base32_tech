"use client";

import { useCompany } from "@/lib/company-context";
import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useState } from "react";

// Device detection hook
function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return isMobile;
}

export default function BackgroundEffects() {
  const { company } = useCompany();
  const { scrollYProgress } = useScroll();
  const isMobile = useIsMobile();

  // Scale down the glow as user scrolls
  const glowScale = useTransform(scrollYProgress, [0, 0.2], [1, 0.8]);
  const glowOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  return (
    <div className="fixed inset-0 -z-10">
      {company === "tech" ? (
        <>
          <div className="absolute inset-0 bg-gradient-to-br from-black via-blue-950/10 to-black" />

          {/* Simplified glow effect for mobile */}
          <motion.div
            style={{
              scale: glowScale,
              opacity: glowOpacity,
            }}
            className={`absolute bottom-0 right-0 ${isMobile ? 'w-[400px] h-[400px]' : 'w-[800px] h-[800px]'} flex items-center justify-center`}
          >
            {/* Reduced number of blur layers for mobile */}
            <div className={`absolute inset-0 rounded-full bg-blue-900/5 ${isMobile ? 'blur-[60px]' : 'blur-[120px]'}`} />
            {!isMobile && (
              <>
                <div className="absolute inset-[10%] rounded-full bg-blue-900/5 blur-[100px]" />
                <div className="absolute inset-[20%] rounded-full bg-blue-800/5 blur-[80px]" />
                <div className="absolute inset-[30%] rounded-full bg-blue-700/5 blur-[60px]" />
              </>
            )}

            {/* Simplified animation for mobile */}
            <motion.div
              className={`absolute inset-[40%] rounded-full bg-blue-900/10 ${isMobile ? 'blur-[20px]' : 'blur-[40px]'}`}
              animate={{
                scale: [1, 1.1, 1],
                opacity: [0.1, 0.12, 0.1],
              }}
              transition={{
                duration: isMobile ? 6 : 4,
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
