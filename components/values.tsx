"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";

const values = [
  {
    title: "Innovation First",
    description:
      "We push boundaries and embrace cutting-edge solutions to drive technological advancement.",
  },
  {
    title: "Client Success",
    description:
      "Your success is our priority. We're committed to delivering results that exceed expectations.",
  },
  {
    title: "Continuous Growth",
    description:
      "We foster an environment of learning and development, staying ahead in the ever-evolving tech landscape.",
  },
];

const backgrounds = [
  "/images/city-background.jpg",
  "/images/city-background.webp",
];

export default function Values() {
  const [currentBg, setCurrentBg] = useState(0);

  // Background image rotation
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBg((prev) => (prev === 0 ? 1 : 0));
    }, 7000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative h-[54vh] overflow-hidden">
      {/* Animated Background Images */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentBg}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5 }}
          className="absolute inset-0 w-full h-full"
        >
          <Image
            src={backgrounds[currentBg]}
            alt="City Skyline"
            fill
            className="object-cover"
            priority
          />
        </motion.div>
      </AnimatePresence>

      {/* Dark Blue Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-900/80 via-blue-900/70 to-black/90" />

      {/* Blur Layer */}
      <div className="absolute inset-0 backdrop-blur-sm bg-black/20" />

      {/* Content Container */}
      <div className="relative h-full flex flex-col">
        <div className="max-w-7xl mx-auto px-8 md:px-16 py-20 flex-1 flex flex-col w-full">
          {/* Title Section */}
          <motion.div 
            className="flex-1 flex items-center justify-end"
          >
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-right"
            >
              <motion.h2 
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-blue-600 via-blue-500 to-blue-400 bg-clip-text text-transparent leading-tight text-right ml-auto"
              >
                Committed to Your Success,
                <br />
                Every Step of the Way
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-xl md:text-2xl text-gray-300 leading-relaxed text-right ml-auto mb-20"
              >
                Beyond service providers, we're your
                <br />
                dedicated partners in technological advancement
              </motion.p>
            </motion.div>
          </motion.div>

          {/* Cards Section - Bottom Half */}
          <div className="pb-16">
            <div className="grid md:grid-cols-3 gap-8 md:gap-12">
              {values.map((value, index) => (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 }}
                  className="bg-black/30 backdrop-blur-sm border border-blue-500/20 rounded-2xl p-8 md:p-10 hover:bg-black/40 transition-all hover:border-blue-500/30 hover:scale-[1.02]"
                >
                  <h3 className="text-2xl font-bold text-white mb-4">{value.title}</h3>
                  <p className="text-gray-300">{value.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}