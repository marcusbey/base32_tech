"use client";

import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { useCompany } from "@/lib/company-context";

export default function AIBanner() {
  const { company } = useCompany();
  const isTech = company === "tech";

  return (
    <div className={`w-full pt-4 ${
      isTech ? "bg-blue-500/10" : "bg-indigo-500/10"
    }`}>
      <motion.div 
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 flex items-center justify-center gap-2"
      >
        <Sparkles className={`w-4 h-4 ${
          isTech ? "text-blue-400" : "text-indigo-400"
        }`} />
        <p className="text-sm text-gray-300">
          We built this website in 5 hours with AI
        </p>
        <Sparkles className={`w-4 h-4 ${
          isTech ? "text-blue-400" : "text-indigo-400"
        }`} />
      </motion.div>
    </div>
  );
}
