"use client";

import { useCompany } from "@/lib/company-context";
import { motion, useScroll, useTransform } from "framer-motion";
import { BackgroundElements } from "./hero/background-elements";
import { HeroContent } from "./hero/hero-content";
import { Logo } from "./hero/logo";
import { StatusBadge } from "./hero/status-badge";

export default function Hero() {
  const { company } = useCompany();
  const { scrollYProgress } = useScroll();
  
  const isStudio = company === "studio";
  const isTech = company === "tech";

  // Only apply scroll animations for studio page
  const gridOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  const auroraOpacity = useTransform(scrollYProgress, [0, 0.15], [0.5, 0]);
  
  // Studio-only transforms
  const studioTransform = useTransform(
    scrollYProgress,
    [0, 0.15],
    ["translate(0, 0) scale(1)", "translate(0, -100px) scale(0.7)"]
  );

  const studioOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);

  // Tech-specific visibility control
  const techVisibility = useTransform(
    scrollYProgress,
    [0, 0.15, 0.2],
    [1, 1, 0]
  );

  return (
    <section className="fixed inset-0 h-screen flex items-center justify-center overflow-hidden">
      <Logo isStudio={isStudio} />

      <motion.div
        style={{ opacity: isTech ? techVisibility : 1 }}
        className="absolute inset-0"
      >
        <BackgroundElements
          isStudio={isStudio}
          gridOpacity={gridOpacity}
          auroraOpacity={auroraOpacity}
        />
      </motion.div>

      <motion.div
        style={isStudio ? {
          transform: studioTransform,
          opacity: studioOpacity,
        } : {
          opacity: techVisibility
        }}
        className={`relative ${
          isStudio ? "z-10" : "z-20"
        } w-full max-w-7xl mx-auto px-8 lg:px-16`}
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
