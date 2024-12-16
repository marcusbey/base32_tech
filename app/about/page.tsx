"use client";

import { motion } from "framer-motion";
import { useCompany } from "@/lib/company-context";
import Navigation from "@/components/navigation";
// import ThemeSwitch from "@/components/theme-switch";
import BackgroundEffects from "@/components/background-effects";
import Image from 'next/image';

export default function About() {
  const { company } = useCompany();

  return (
    <main className="min-h-screen relative">
      <BackgroundEffects />
      {/* <ThemeSwitch /> */}
      
      <div className="relative z-10 pt-20 sm:pt-32 px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto space-y-8 sm:space-y-12"
        >
          <h1 className={`text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight ${
            company === 'tech' ? 'text-white' : 'text-gray-900'
          }`}>
            About {company === 'tech' ? 'BASE32.TECH' : 'BASE32.STUDIO'}
          </h1>
          
          <div className={`prose ${
            company === 'tech' ? 'prose-invert' : ''
          } max-w-none space-y-6 sm:space-y-8`}>
            {company === 'tech' ? (
              <>
                <p className="text-lg sm:text-xl text-gray-300 leading-normal sm:leading-relaxed">
                  Founded by Romain BOBOE, BASE32 is a team of AI specialists and automation experts dedicated to transforming how businesses operate through intelligent technology solutions.
                </p>
                <div className="space-y-4">
                  <h2 className="text-2xl sm:text-3xl text-white leading-tight">Our Founder</h2>
                  <p className="text-gray-300 leading-normal">
                    Romain BOBOE brings extensive experience in AI development and tech consulting to BASE32. With a passion for innovative solutions and a deep understanding of business needs, he leads our team in delivering cutting-edge AI and automation solutions.
                  </p>
                </div>
                <div className="space-y-4">
                  <h2 className="text-2xl sm:text-3xl text-white leading-tight">Our Mission</h2>
                  <p className="text-gray-300 leading-normal">
                    To revolutionize business operations through cutting-edge AI and automation solutions that save time, reduce errors, and drive growth.
                  </p>
                </div>
                <div className="space-y-4">
                  <h2 className="text-2xl sm:text-3xl text-white leading-tight">Our Approach</h2>
                  <p className="text-gray-300 leading-normal">
                    We combine deep technical expertise with a thorough understanding of business processes to deliver solutions that make a real impact. Under Romain's leadership, we focus on creating custom AI solutions that perfectly align with our clients' needs and goals.
                  </p>
                </div>
              </>
            ) : (
              <>
                <p className="text-lg sm:text-xl text-gray-700 leading-normal sm:leading-relaxed">
                  We're a creative studio that combines design excellence with technical innovation to create memorable digital experiences.
                </p>
                <div className="space-y-4">
                  <h2 className="text-2xl sm:text-3xl text-gray-900 leading-tight">Our Mission</h2>
                  <p className="text-gray-700 leading-normal">
                    To elevate brands through thoughtful design and seamless user experiences that connect with audiences and drive engagement.
                  </p>
                </div>
                <div className="space-y-4">
                  <h2 className="text-2xl sm:text-3xl text-gray-900 leading-tight">Our Approach</h2>
                  <p className="text-gray-700 leading-normal">
                    We believe in the power of design thinking and user-centered approaches to create solutions that are both beautiful and functional.
                  </p>
                </div>
              </>
            )}
          </div>
          <div className="relative w-full h-[250px] sm:h-[300px] lg:h-[400px] mt-8 sm:mt-12 rounded-xl sm:rounded-2xl overflow-hidden">
            <div className="absolute inset-0 bg-black/30 z-10" />
            <Image
              src="/images/about-hero.jpg"
              alt="About Base32"
              fill
              className="object-cover"
              priority
            />
          </div>
        </motion.div>
      </div>

      <Navigation />
    </main>
  );
}