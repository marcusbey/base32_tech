"use client";

import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { useCompany } from "@/lib/company-context";

export default function AIBanner() {
  const { company } = useCompany();
  const isTech = company === "tech";

  return (
    <div className={`w-full hidden sm:block pt-2 sm:pt-4 pointer-events-none ${
      isTech ? "bg-blue-500/10" : "bg-indigo-500/10"
    }`}>
      <motion.div 
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-1.5 sm:py-2 flex items-center justify-center gap-1.5 sm:gap-2"
      >
        <Sparkles className={`w-3 h-3 sm:w-4 sm:h-4 ${
          isTech ? "text-blue-400" : "text-indigo-400"
        }`} />
        <p className="text-xs sm:text-sm text-gray-300">
          We built this website in 5 hours with AI
        </p>
        <Sparkles className={`w-3 h-3 sm:w-4 sm:h-4 ${
          isTech ? "text-blue-400" : "text-indigo-400"
        }`} />
      </motion.div>
    </div>
  );
}
