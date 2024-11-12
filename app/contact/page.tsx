"use client";

import { motion } from "framer-motion";
import { useCompany } from "@/lib/company-context";
import Navigation from "@/components/navigation";
import ThemeSwitch from "@/components/theme-switch";
import BackgroundEffects from "@/components/background-effects";
import CreativeContact from "@/components/creative-contact";

export default function Contact() {
  const { company } = useCompany();

  return (
    <main className="min-h-screen relative">
      <BackgroundEffects />
      <ThemeSwitch />
      
      <div className="relative z-10 pt-32">
        <CreativeContact />
      </div>

      <Navigation />
    </main>
  );
}