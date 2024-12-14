"use client";

import { useState } from 'react';
import { motion, AnimatePresence, useMotionValue, useMotionTemplate } from 'framer-motion';
import { useCompany } from '@/lib/company-context';
import { Quote, ChevronLeft, ChevronRight } from 'lucide-react';
import { useEffect, useRef } from 'react';

const testimonials = {
  tech: [
    {
      quote: "BASE32.TECH's automation solutions have transformed our workflow. We've saved countless hours on repetitive tasks.",
      author: "Sarah Chen",
      role: "CTO, InnovateTech",
    },
    {
      quote: "Their AI agents are incredibly intuitive. It's like having a team of virtual assistants that actually understand our needs.",
      author: "Michael Rodriguez",
      role: "Operations Director, FutureScale",
    },
    {
      quote: "The ROI we've seen from implementing their solutions has been remarkable. A game-changer for our business.",
      author: "Emma Thompson",
      role: "CEO, DataFlow Systems",
    },
  ],
  studio: [
    {
      quote: "The brand identity BASE32.STUDIO created for us perfectly captures our vision. Their attention to detail is unmatched.",
      author: "David Park",
      role: "Founder, Nexus Innovations",
    },
    {
      quote: "Working with their team was a breeze. They transformed our complex ideas into beautiful, functional designs.",
      author: "Lisa Morgan",
      role: "Creative Director, ArtisanTech",
    },
    {
      quote: "Their design system has brought consistency and efficiency to our product development process.",
      author: "James Wilson",
      role: "Product Lead, DesignFirst",
    },
  ],
};

const techColors = {
  base: ["#EAB308", "#CA8A04", "#A16207"],
  active: ["#FDE047", "#EAB308", "#CA8A04"],
  glow: ["#FEF08A", "#FDE047", "#EAB308"]
};

const studioColors = {
  base: ["#FDE047", "#EAB308", "#CA8A04"],
  active: ["#FEF08A", "#FDE047", "#EAB308"],
  glow: ["#FEF9C3", "#FEF08A", "#FDE047"]
};

export default function Testimonials() {
  const { company } = useCompany();
  const [currentIndex, setCurrentIndex] = useState(0);
  const currentTestimonials = company === 'tech' ? testimonials.tech : testimonials.studio;
  const isTech = company === 'tech';
  const containerRef = useRef<HTMLDivElement>(null);
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const maskImage = useMotionTemplate`radial-gradient(circle at ${mouseX}px ${mouseY}px, black 10%, transparent 80%)`;

  const gridSize = 60;
  const baseDotSize = 4;
  const maxLightRadius = 300;
  const colors = isTech ? techColors : studioColors;

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      mouseX.set(x);
      mouseY.set(y);
    };

    container.addEventListener("mousemove", handleMouseMove);
    return () => container.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  const getColorVariant = (x: number, y: number, colorSet: string[]) => {
    const index = Math.abs(Math.floor((x + y) / gridSize)) % colorSet.length;
    return colorSet[index];
  };

  const generateGrid = () => {
    const gridElements = [];
    const cols = Math.ceil(window.innerWidth / gridSize) + 1;
    const rows = Math.ceil(window.innerHeight / gridSize) + 1;

    // Generate intersection dots
    for (let i = 0; i <= cols; i++) {
      for (let j = 0; j <= rows; j++) {
        const x = i * gridSize;
        const y = j * gridSize;

        gridElements.push(
          <motion.circle
            key={`dot-${i}-${j}`}
            cx={x}
            cy={y}
            r={baseDotSize}
            initial={{ fill: getColorVariant(x, y, colors.base), fillOpacity: 0.2 }}
            whileHover={{
              fill: getColorVariant(x, y, colors.glow),
              fillOpacity: 0.9,
              transition: { duration: 0.2 }
            }}
            animate={(mouseX.get() > x - maxLightRadius && mouseX.get() < x + maxLightRadius &&
                     mouseY.get() > y - maxLightRadius && mouseY.get() < y + maxLightRadius)
              ? {
                  fill: getColorVariant(x, y, colors.active),
                  fillOpacity: 0.6,
                  transition: { duration: 0.3 }
                }
              : {
                  fill: getColorVariant(x, y, colors.base),
                  fillOpacity: 0.2,
                  transition: { duration: 0.3 }
                }
            }
          />
        );

        // Add grid lines
        if (j === 0) {
          gridElements.push(
            <motion.line
              key={`vertical-${i}`}
              x1={x}
              y1="0"
              x2={x}
              y2="100%"
              stroke={getColorVariant(x, 0, colors.base)}
              strokeOpacity={0.1}
              strokeWidth={1}
            />
          );
        }
        if (i === 0) {
          gridElements.push(
            <motion.line
              key={`horizontal-${j}`}
              x1="0"
              y1={y}
              x2="100%"
              y2={y}
              stroke={getColorVariant(0, y, colors.base)}
              strokeOpacity={0.1}
              strokeWidth={1}
            />
          );
        }
      }
    }
    return gridElements;
  };

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % currentTestimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + currentTestimonials.length) % currentTestimonials.length);
  };

  return (
    <div ref={containerRef} className="relative w-full overflow-hidden">
      {/* Background with grid */}
      <div className="absolute inset-0 -z-10">
        <div className={`w-full h-full ${
          isTech 
            ? 'bg-black/80 backdrop-blur-sm'
            : 'bg-white/90 backdrop-blur-sm'
        }`} />
        <svg
          className="absolute inset-0 w-full h-full"
          style={{
            mask: maskImage as any,
            WebkitMask: maskImage as any,
          }}
        >
          {generateGrid()}
        </svg>
      </div>

      <section className="relative py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-16">
            <motion.div
              className="lg:col-span-4 relative"
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="text-4xl lg:text-5xl font-semibold leading-[1.2] bg-clip-text text-transparent bg-gradient-to-r from-white via-yellow-200 to-yellow-400">
                  Client Success
                  <br />
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 via-yellow-300 to-white">
                    Stories
                  </span>
                </h2>
                <div className="absolute -inset-x-4 -inset-y-2 bg-gradient-to-r from-yellow-400/10 via-yellow-300/5 to-transparent blur-2xl -z-10" />
                <p className="mt-6 text-lg lg:text-xl text-gray-400">
                  {isTech
                    ? "Join companies who have achieved "
                    : "Join businesses who have transformed with "}
                  <span className="text-yellow-400">
                    {isTech ? "95% customer satisfaction" : "150% productivity boost"}
                  </span>
                </p>
              </motion.div>
            </motion.div>

            <div className="lg:col-span-8">
              <div className="relative">
                <div className="flex justify-center items-center gap-8">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={prevTestimonial}
                    className={`p-3 rounded-full ${
                      isTech
                        ? 'bg-blue-500/10 hover:bg-blue-500/20 text-white'
                        : 'bg-indigo-100 hover:bg-indigo-200 text-indigo-600'
                    }`}
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </motion.button>

                  <div className="relative w-full max-w-3xl">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={currentIndex}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                        className="text-center px-8 py-12"
                      >
                        <Quote className={`w-12 h-12 mx-auto mb-8 ${
                          isTech ? 'text-yellow-400' : 'text-indigo-500'
                        }`} />
                        
                        <p className={`text-2xl mb-12 leading-relaxed ${
                          isTech ? 'text-white' : 'text-gray-800'
                        }`}>
                          {currentTestimonials[currentIndex].quote}
                        </p>
                        
                        <div>
                          <p className={`font-semibold text-lg ${
                            isTech ? 'text-white' : 'text-gray-900'
                          }`}>
                            {currentTestimonials[currentIndex].author}
                          </p>
                          <p className={
                            isTech ? 'text-gray-400' : 'text-gray-600'
                          }>
                            {currentTestimonials[currentIndex].role}
                          </p>
                        </div>
                      </motion.div>
                    </AnimatePresence>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={nextTestimonial}
                    className={`p-3 rounded-full ${
                      isTech
                        ? 'bg-blue-500/10 hover:bg-blue-500/20 text-white'
                        : 'bg-indigo-100 hover:bg-indigo-200 text-indigo-600'
                    }`}
                  >
                    <ChevronRight className="w-6 h-6" />
                  </motion.button>
                </div>

                <div className="flex justify-center mt-12 gap-2">
                  {currentTestimonials.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentIndex(index)}
                      className={`w-2 h-2 rounded-full transition-all duration-300 ${
                        index === currentIndex
                          ? isTech
                            ? 'bg-yellow-400 w-6'
                            : 'bg-indigo-500 w-6'
                          : isTech
                            ? 'bg-gray-600'
                            : 'bg-gray-300'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}