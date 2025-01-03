"use client";

import { useCompany } from "@/lib/company-context";
import { useState, useEffect } from "react";
import styles from "./grid-background.module.css";
import { motion } from "framer-motion";

export default function GridBackground() {
  const { company } = useCompany();
  const isTech = company === "tech";
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Return a placeholder with the same structure during SSR
  if (!mounted) {
    return <div className="fixed inset-0 pointer-events-none" />;
  }

  if (!isTech) {
    return null;
  }

  return (
    <div className="fixed inset-0 pointer-events-none">
      <div className="absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]">
        {/* Grid Container */}
        <div className={`absolute inset-0 ${styles.gridContainer} ${styles.gridBackground}`} />

        {/* Radial Gradient Overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="absolute inset-0 bg-[radial-gradient(circle_500px_at_50%_200px,rgba(79,70,229,0.1),transparent_80%)]"
        />
      </div>
    </div>
  );
}
