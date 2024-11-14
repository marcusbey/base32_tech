"use client";

import { useCompany } from "@/lib/company-context";
import { AnimatePresence, motion } from "framer-motion";

export default function ThemeTransition() {
  const { company } = useCompany();

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{
          opacity: 1,
          transition: { duration: 0.15 },
        }}
        exit={{
          opacity: 0,
          transition: { duration: 0.15 },
        }}
        className="fixed inset-0 z-[100] pointer-events-none"
      >
        <motion.div
          initial={{
            backdropFilter: "blur(0px)",
            scale: 1,
          }}
          animate={{
            backdropFilter: "blur(12px)",
            scale: 0.99,
            transition: {
              duration: 0.2,
              scale: {
                type: "spring",
                stiffness: 300,
                damping: 20,
              },
            },
          }}
          exit={{
            backdropFilter: "blur(0px)",
            scale: 1,
            transition: {
              duration: 0.2,
              scale: {
                type: "spring",
                stiffness: 300,
                damping: 20,
              },
            },
          }}
          className="absolute inset-0 bg-black/5"
        />
      </motion.div>
    </AnimatePresence>
  );
}
