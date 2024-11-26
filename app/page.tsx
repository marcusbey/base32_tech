"use client";

import BackgroundEffects from "@/components/background-effects";
import Brands from "@/components/brands";
import CreativeContact from "@/components/creative-contact";
import Footer from "@/components/footer";
import Hero from "@/components/hero";
import Navigation from "@/components/navigation";
import Pricing from "@/components/pricing";
import Testimonials from "@/components/testimonials";
import ThemeSwitch from "@/components/theme-switch";
import Values from "@/components/values";
import TechParticlesFallback from "@/components/shapes/tech-particles-fallback";
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

// Lazy load heavy components
const TechParticles = dynamic(
  () => import("@/components/shapes/tech-particles"),
  {
    ssr: false,
    loading: () => null,
  }
);

const Services = dynamic(() => import("@/components/services"), {
  loading: () => null,
});

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

      {/* Particles for tech page (z-index: 1) */}
      {isTech && (
        <div className="fixed inset-0 particles-layer">
          {shouldDisable3D ? (
            <TechParticlesFallback />
          ) : (
            <TechParticles />
          )}
        </div>
      )}

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

      {/* Content sections with glass background for studio (z-index: 4) */}
      <div
        className={`relative ${
          isStudio ? "content-overlay-layer" : "content-layer"
        }`}
      >
        {isStudio ? (
          <div className="relative">
            <div className="absolute inset-0 -z-10">
              <div className="w-full h-full mega-glass-card" />
            </div>
            <div className="relative">
              <Works />
              <Services />
              <Brands />
              <div className="py-24">
                <Pricing />
              </div>
              <Testimonials />
              <CreativeContact />
              <Footer />
            </div>
          </div>
        ) : (
          <div className="relative">
            <Services />
            <Brands />
            <Values />
            <div className="relative">
              <div className="absolute inset-0 -z-10">
                <div className="w-full h-full border-y border-blue-500/20" />
              </div>
              <div className="relative">
                <Pricing />
              </div>
            </div>
            <Testimonials />
            <CreativeContact />
            <Footer />
          </div>
        )}
      </div>

      {/* UI Elements (z-index: 50) */}
      <div className="fixed top-0 left-0 right-0 ui-layer">
        <ThemeSwitch />
        <Navigation />
      </div>
    </main>
  );
}
