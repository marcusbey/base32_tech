"use client";

import { motion } from "framer-motion";
import { useCompany } from "@/lib/company-context";

const stats = {
  tech: [
    { label: "Efficiency Gain", value: "80%", prefix: "Up to" },
    { label: "Cost Reduction", value: "60%", prefix: "Average" },
    { label: "Process Speed", value: "3x", prefix: "Increased" },
  ],
  studio: [
    { label: "User Engagement", value: "200%", prefix: "Up to" },
    { label: "Design Systems", value: "50+", prefix: "Created" },
    { label: "Brand Growth", value: "4x", prefix: "Accelerated" },
  ],
};

export default function StatsBreak() {
  const { company } = useCompany();
  const isTech = company === "tech";
  const currentStats = stats[company];

  return (
    <section className="relative h-[50vh] flex items-center justify-center overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-black/80" />
        
        {/* Animated grid */}
        <div 
          className="absolute inset-0" 
          style={{
            backgroundImage: `linear-gradient(to right, ${isTech ? '#3B82F6' : '#6366F1'}1A 1px, transparent 1px),
                            linear-gradient(to bottom, ${isTech ? '#3B82F6' : '#6366F1'}1A 1px, transparent 1px)`,
            backgroundSize: '4rem 4rem',
            maskImage: 'radial-gradient(circle at 50% 50%, black, transparent 70%)'
          }}
        />

        {/* Radial gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-black" />
        
        {/* Animated circles */}
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            initial={{ scale: 0.8, opacity: 0.3 }}
            animate={{
              scale: [0.8, 1.2, 0.8],
              opacity: [0.3, 0.5, 0.3],
              x: [0, 100, 0],
              y: [0, -50, 0],
            }}
            transition={{
              duration: 20,
              delay: i * 2,
              repeat: Infinity,
              ease: "linear",
            }}
            style={{
              left: `${30 + i * 20}%`,
              top: '50%',
              width: '20rem',
              height: '20rem',
              background: isTech
                ? `radial-gradient(circle at center, #3B82F620 0%, transparent 70%)`
                : `radial-gradient(circle at center, #6366F120 0%, transparent 70%)`,
              borderRadius: '50%',
              filter: 'blur(40px)',
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-16">
          {currentStats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="space-y-2">
                <p className="text-sm text-gray-400 uppercase tracking-wider">
                  {stat.prefix}
                </p>
                <p className={`text-5xl lg:text-6xl font-bold ${
                  isTech ? 'text-yellow-400' : 'text-indigo-400'
                }`}>
                  {stat.value}
                </p>
                <p className="text-lg text-white">
                  {stat.label}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
