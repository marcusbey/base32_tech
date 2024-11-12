"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCompany } from '@/lib/company-context';
import { Quote, ChevronLeft, ChevronRight } from 'lucide-react';

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

export default function Testimonials() {
  const { company } = useCompany();
  const [currentIndex, setCurrentIndex] = useState(0);
  const currentTestimonials = company === 'tech' ? testimonials.tech : testimonials.studio;
  const isTech = company === 'tech';

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % currentTestimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + currentTestimonials.length) % currentTestimonials.length);
  };

  return (
    <section className="relative py-48 overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className={`w-full h-full ${
          isTech 
            ? 'bg-black/30 backdrop-blur-xl border-y border-blue-500/20'
            : 'bg-gradient-to-br from-indigo-50/80 via-white/40 to-purple-50/80 backdrop-blur-xl'
        }`} />
      </div>

      {/* Studio-specific decorative elements */}
      {!isTech && (
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-br from-indigo-200/20 via-transparent to-transparent rotate-12 transform-gpu" />
          <div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-to-tl from-purple-200/20 via-transparent to-transparent -rotate-12 transform-gpu" />
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-2xl mx-auto mb-24"
        >
          <h2 className={`text-5xl font-semibold mb-4 ${
            isTech ? 'text-white' : 'text-gray-900'
          }`}>
            Client Success Stories
          </h2>
          <p className={`text-xl ${
            isTech ? 'text-gray-400' : 'text-gray-600'
          }`}>
            Real results from real clients
          </p>
        </motion.div>

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
    </section>
  );
}