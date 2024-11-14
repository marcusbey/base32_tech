"use client";

import { useCompany } from "@/lib/company-context";
import { motion, useScroll, useTransform } from "framer-motion";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function ThemeSwitch() {
  const { company, toggleCompany } = useCompany();
  const pathname = usePathname();
  const [isMounted, setIsMounted] = useState(false);

  const { scrollYProgress } = useScroll();

  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.2], [0, -20]);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted || pathname !== "/") return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      style={{ opacity, y }}
      className="fixed top-8 left-1/2 -translate-x-1/2 z-50"
    >
      {/* Large switch for desktop */}
      <div className="relative hidden lg:block">
        {/* Glow effect */}
        <motion.div
          className={`absolute inset-0 rounded-full blur-xl opacity-30 ${
            company === "tech"
              ? "bg-yellow-500"
              : "bg-gradient-to-r from-purple-400 to-pink-400"
          }`}
          animate={{
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        <motion.button
          onClick={toggleCompany}
          className={`relative w-24 h-12 rounded-full backdrop-blur-lg border-2 ${
            company === "tech"
              ? "bg-black/10 border-yellow-500/30"
              : "bg-white/10 border-gray-200/50"
          }`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <motion.div
            className={`absolute top-1.5 left-1.5 w-8 h-8 rounded-full ${
              company === "tech"
                ? "bg-gradient-to-r from-yellow-400 to-yellow-500"
                : "bg-gradient-to-r from-purple-400 to-pink-400"
            }`}
            animate={{
              x: company === "tech" ? 0 : 48,
            }}
            transition={{
              type: "spring",
              stiffness: 500,
              damping: 30,
            }}
          />
        </motion.button>
      </div>

      {/* Smaller switch for tablet and mobile */}
      <div className="relative block lg:hidden">
        {/* Glow effect */}
        <motion.div
          className={`absolute inset-0 rounded-full blur-xl opacity-30 ${
            company === "tech"
              ? "bg-yellow-500"
              : "bg-gradient-to-r from-purple-400 to-pink-400"
          }`}
          animate={{
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        <motion.button
          onClick={toggleCompany}
          className={`relative w-16 h-8 rounded-full backdrop-blur-lg border-2 ${
            company === "tech"
              ? "bg-black/10 border-yellow-500/30"
              : "bg-white/10 border-gray-200/50"
          }`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <motion.div
            className={`absolute top-1 left-1 w-5 h-5 rounded-full ${
              company === "tech"
                ? "bg-gradient-to-r from-yellow-400 to-yellow-500"
                : "bg-gradient-to-r from-purple-400 to-pink-400"
            }`}
            animate={{
              x: company === "tech" ? 0 : 32,
            }}
            transition={{
              type: "spring",
              stiffness: 500,
              damping: 30,
            }}
          />
        </motion.button>
      </div>
    </motion.div>
  );
}
