"use client";

import { useCompany } from "@/lib/company-context";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { Linkedin } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import { XIcon } from "./icons/x-icon";
import { motion } from "framer-motion";

export default function About() {
  const { company } = useCompany();
  const isTech = company === "tech";

  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <section id="about-section" className="relative overflow-hidden py-8 sm:py-12 lg:py-32">
      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        <div className="grid lg:grid-cols-12 gap-6 lg:gap-16 items-start">
          {/* Left column - Text content */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="lg:col-span-5 w-full max-w-lg mx-auto lg:max-w-none space-y-4 sm:space-y-6 lg:space-y-8"
          >
            <div className="pt-4 sm:pt-6 lg:pt-16 relative w-full">
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
                className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold leading-[1.2] bg-clip-text text-transparent bg-gradient-to-r from-white via-blue-200 to-blue-400"
              >
                About
                <br />
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-blue-300 to-white">
                  Base32
                </span>
              </motion.h2>
              <div className="absolute -inset-x-4 -inset-y-2 bg-gradient-to-r from-blue-400/10 via-blue-300/5 to-transparent blur-2xl -z-10" />
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
                className="mt-3 sm:mt-4 md:mt-6 text-sm sm:text-base md:text-lg lg:text-xl text-gray-400"
              >
                Crafting intelligent solutions at the intersection of
                <span className="text-blue-400"> AI and innovation</span>
              </motion.p>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
              className="space-y-4 sm:space-y-6 md:space-y-8"
            >
              <div>
                <h3 className={`text-lg sm:text-xl md:text-2xl font-semibold mb-1.5 sm:mb-2 md:mb-3 ${isTech ? "text-blue-400" : "text-indigo-400"}`}>
                  Our Mission
                </h3>
                <p className="text-xs sm:text-sm md:text-base text-gray-300 leading-relaxed">
                  At BASE32, we harness the power of artificial intelligence to solve complex business challenges. Our mission is to make advanced AI technology accessible and impactful, helping businesses automate, innovate, and thrive in an AI-driven world.
                </p>
              </div>

              <div>
                <h3 className={`text-lg sm:text-xl md:text-2xl font-semibold mb-1.5 sm:mb-2 md:mb-3 ${isTech ? "text-blue-400" : "text-indigo-400"}`}>
                  Our Vision
                </h3>
                <p className="text-xs sm:text-sm md:text-base text-gray-300 leading-relaxed">
                  We envision a future where AI enhances every aspect of business operations. Through cutting-edge LLMs, machine learning, and custom AI solutions, we're building intelligent systems that transform how businesses operate and compete.
                </p>
              </div>

              <div>
                <h3 className={`text-lg sm:text-xl md:text-2xl font-semibold mb-1.5 sm:mb-2 md:mb-3 ${isTech ? "text-blue-400" : "text-indigo-400"}`}>
                  Our Expertise
                </h3>
                <p className="text-xs sm:text-sm md:text-base text-gray-300 leading-relaxed">
                  We specialize in developing sophisticated AI solutions, from custom LLM applications to automated workflows. Our team combines deep technical knowledge with strategic insight to deliver AI systems that drive real business value.
                </p>
              </div>
            </motion.div>
          </motion.div>

          {/* Right column - Image */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
            className="relative lg:col-span-7 lg:col-start-6 h-[500px] sm:h-[600px] lg:h-[800px] mt-16 sm:mt-24 lg:mt-32 flex justify-end"
          >
            <div className="relative w-full sm:w-[400px] h-[500px] sm:h-[600px] lg:h-[800px] rounded-2xl overflow-hidden">
              <div className="absolute inset-0 bg-black/50 z-10" />
              <Image
                src="/images/about-profile2.jpg"
                alt="Base32 Team"
                fill
                className="object-cover object-center rounded-xl"
                sizes="(max-width: 640px) 100vw, (max-width: 768px) 400px, 400px"
                priority
              />
              {/* Offset grid pattern div */}
              <div 
                className="absolute -bottom-32 -right-20 w-[200px] sm:w-[300px] h-[150px] sm:h-[200px] z-20"
              >
                <div className="absolute inset-0" style={{
                  backgroundImage: 
                    `linear-gradient(to right, ${isTech ? 'rgba(59, 130, 246, 0.3)' : 'rgba(99, 102, 241, 0.3)'} 1px, transparent 1px),
                     linear-gradient(to bottom, ${isTech ? 'rgba(59, 130, 246, 0.3)' : 'rgba(99, 102, 241, 0.3)'} 1px, transparent 1px)`,
                  backgroundSize: '30px 30px',
                  opacity: 0.7,
                }} />
              </div>
            </div>
            {/* Profile Info and Social Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.7, ease: "easeOut" }}
              className="absolute bottom-4 sm:bottom-8 left-4 sm:left-8 z-20"
            >
              <h3 className="text-xl sm:text-2xl font-semibold text-white mb-1">
                Romain BOBOE
              </h3>
              <p className="text-sm sm:text-base text-gray-300 mb-3 sm:mb-4">Founder, Tech Lead</p>
              <div className="flex gap-3 sm:gap-4">
                <Link
                  href="https://www.linkedin.com/in/romainboboe/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-blue-400 transition-colors"
                >
                  <Linkedin className="w-5 h-5 sm:w-6 sm:h-6" />
                </Link>
                <Link
                  href="https://x.com/romainbey"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-blue-400 transition-colors"
                >
                  <XIcon className="w-5 h-5 sm:w-6 sm:h-6" />
                </Link>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
