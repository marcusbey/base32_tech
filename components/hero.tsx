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

  const gridOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  const auroraOpacity = useTransform(scrollYProgress, [0, 0.15], [0.5, 0]);

  const isTech = company === "tech";
  const isStudio = company === "studio";

  // Adjusted timing for tech page
  const combinedTransform = useTransform(
    scrollYProgress,
    [0, isTech ? 0.12 : 0.15],
    [
      "translate(0, 0) scale(1)",
      `translate(0, ${isTech ? -120 : -100}px) scale(${isTech ? 0.6 : 0.7})`,
    ]
  );

  // Slightly delayed opacity fade for tech page
  const contentOpacity = useTransform(
    scrollYProgress,
    [0, isTech ? 0.1 : 0.15],
    [1, 0]
  );

  return (
    <section className="fixed inset-0 h-screen flex items-center justify-center overflow-hidden">
      <Logo isStudio={isStudio} />

      <BackgroundElements
        isStudio={isStudio}
        gridOpacity={gridOpacity}
        auroraOpacity={auroraOpacity}
      />

      <motion.div
        style={{
          transform: combinedTransform,
          opacity: contentOpacity,
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
