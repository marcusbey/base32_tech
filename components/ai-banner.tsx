"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Sparkles } from "lucide-react";
import { useCompany } from "@/lib/company-context";
import { useEffect, useState } from "react";

export default function AIBanner() {
  const { company } = useCompany();
  const isTech = company === "tech";
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 10000); // 10 seconds

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div 
          className={`w-full sm:block pt-2 sm:pt-4 pointer-events-none z-50 absolute top-0`}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.5 }}
        >
          <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-1.5 sm:py-2 flex items-center justify-center gap-1.5 sm:gap-2">
            <Sparkles className={`w-3 h-3 sm:w-4 sm:h-4"
            }`} />
            <p className="text-xs sm:text-sm text-gray-300">
              🤖 This website was entirely generated and improved using AI prompts
            </p>
            <Sparkles className={`w-3 h-3 sm:w-4 sm:h-4 ${
              isTech ? "text-blue-400" : "text-indigo-400"
            }`} />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
