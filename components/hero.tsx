"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useCompany } from "@/lib/company-context";
import { HeroContent } from "./hero/hero-content";
import { TopMenu } from "./hero/top-menu";
import { StatusBadge } from "./hero/status-badge";
import HeroGrid from "./shapes/hero-grid";

export default function Hero() {
  const { company } = useCompany();
  const { scrollYProgress } = useScroll();
  
  const isStudio = company === "studio";
  const isTech = company === "tech";

  // Scroll animations
  const gridOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);
  const contentTransform = useTransform(
    scrollYProgress,
    [0, 0.15],
    ["translate(0, 0) scale(1)", "translate(0, -100px) scale(0.7)"]
  );

  return (
    <section className="fixed inset-0 h-screen flex items-center justify-center overflow-hidden">
      <TopMenu />

      {/* Background Grid */}
      <motion.div className="absolute inset-0" style={{ opacity: gridOpacity }}>
        <HeroGrid />
      </motion.div>

      {/* Content */}
      <motion.div
        style={isStudio ? {
          transform: contentTransform,
          opacity: contentOpacity,
        } : {
          opacity: contentOpacity
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
          <HeroContent isStudio={isStudio}>
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
              {company === "tech" ? "BASE32 Tech" : "BASE32 Studio"}
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-300">
              AI automation that cuts development costs by 60% and ships products 10x faster. Seamlessly integrate intelligent agents into your workflow and deliver value to your customers in days not months.
            </p>
          </HeroContent>
        </motion.div>
      </motion.div>
    </section>
  );
}
