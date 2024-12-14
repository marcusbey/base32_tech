"use client";

import BackgroundEffects from "@/components/background-effects";
import Brands from "@/components/brands";
import CreativeContact from "@/components/creative-contact";
import Footer from "@/components/footer";
import Hero from "@/components/hero";
import Navigation from "@/components/navigation";
import PatternBreak from "@/components/pattern-break";
import Pricing from "@/components/pricing";
import Services from "@/components/services";
import Testimonials from "@/components/testimonials";
import ThemeSwitch from "@/components/theme-switch";
import Values from "@/components/values";
import About from "@/components/about";
import { useCompany } from "@/lib/company-context";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

// Device detection hook
function useDeviceCapabilities() {
  const [capabilities, setCapabilities] = useState({
    isMobile: false,
    isLowEnd: false,
    shouldDisable3D: false,
  });

  useEffect(() => {
    const checkCapabilities = () => {
      const isMobile = window.innerWidth <= 768;
      const cores = navigator.hardwareConcurrency || 4;
      const isLowEnd = cores <= 4;
      const memory = (navigator as any).deviceMemory || 4;
      const shouldDisable3D = isLowEnd && memory < 4;

      setCapabilities({
        isMobile,
        isLowEnd,
        shouldDisable3D,
      });
    };

    checkCapabilities();
    window.addEventListener('resize', checkCapabilities);
    return () => window.removeEventListener('resize', checkCapabilities);
  }, []);

  return capabilities;
}

const Works = dynamic(() => import("@/components/works"), {
  loading: () => null,
});

export default function Home() {
  const { company } = useCompany();
  const isStudio = company === "studio";
  const isTech = company === "tech";
  const { shouldDisable3D } = useDeviceCapabilities();

  return (
    <main className="min-h-screen relative">
      {/* Background (z-index: 1) */}
      <div className="fixed inset-0 background-layer">
        <BackgroundEffects />
      </div>

      {/* Grid background (z-index: 2) */}
      {isStudio && (
        <div className="fixed inset-8 grid-layer rounded-3xl overflow-hidden">
          <div className="w-full h-full studio-grid" />
        </div>
      )}

      {/* Hero section (z-index: 3) */}
      <div className="relative hero-layer">
        <section className="h-screen">
          <Hero />
        </section>
      </div>

      {/* Content sections */}
      <div className="relative content-layer">
        <Navigation />
        <Services />
        <PatternBreak />
        <Brands />
        <Values />
        <Works />
        <Testimonials />
        <Pricing />
        <About />
        <CreativeContact />
        <Footer />
      </div>

      {/* Theme switch */}
      <div className="fixed bottom-8 right-8 z-50">
        <ThemeSwitch />
      </div>
    </main>
  );
}
