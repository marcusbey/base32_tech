"use client";

import { motion } from "framer-motion";
import { useCompany } from "@/lib/company-context";
import Navigation from "@/components/navigation";
import ThemeSwitch from "@/components/theme-switch";
import BackgroundEffects from "@/components/background-effects";

export default function About() {
  const { company } = useCompany();

  return (
    <main className="min-h-screen relative">
      <BackgroundEffects />
      <ThemeSwitch />
      
      <div className="relative z-10 pt-32 px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto"
        >
          <h1 className={`text-5xl font-bold mb-8 ${
            company === 'tech' ? 'text-white' : 'text-gray-900'
          }`}>
            About {company === 'tech' ? 'BASE32.TECH' : 'BASE32.STUDIO'}
          </h1>
          
          <div className={`prose ${
            company === 'tech' ? 'prose-invert' : ''
          } max-w-none`}>
            {company === 'tech' ? (
              <>
                <p className="text-xl text-gray-300 mb-6">
                  We're a team of AI specialists and automation experts dedicated to transforming how businesses operate through intelligent technology solutions.
                </p>
                <h2 className="text-3xl text-white mb-4">Our Mission</h2>
                <p className="text-gray-300 mb-6">
                  To revolutionize business operations through cutting-edge AI and automation solutions that save time, reduce errors, and drive growth.
                </p>
                <h2 className="text-3xl text-white mb-4">Our Approach</h2>
                <p className="text-gray-300">
                  We combine deep technical expertise with a thorough understanding of business processes to deliver solutions that make a real impact.
                </p>
              </>
            ) : (
              <>
                <p className="text-xl text-gray-700 mb-6">
                  We're a creative studio that combines design excellence with technical innovation to create memorable digital experiences.
                </p>
                <h2 className="text-3xl text-gray-900 mb-4">Our Mission</h2>
                <p className="text-gray-700 mb-6">
                  To elevate brands through thoughtful design and seamless user experiences that connect with audiences and drive engagement.
                </p>
                <h2 className="text-3xl text-gray-900 mb-4">Our Approach</h2>
                <p className="text-gray-700">
                  We believe in the power of design thinking and user-centered approaches to create solutions that are both beautiful and functional.
                </p>
              </>
            )}
          </div>
        </motion.div>
      </div>

      <Navigation />
    </main>
  );
}