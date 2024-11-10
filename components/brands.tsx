"use client";

import { motion } from 'framer-motion';
import { useCompany } from './company-provider';

const brandLogos = Array(8).fill(null).map((_, i) => ({
  name: `Company ${i + 1}`,
  // Using a placeholder SVG pattern
  logo: (className: string) => (
    <div className={`${className} flex items-center justify-center`}>
      <div className={`w-32 h-8 rounded ${
        i % 2 === 0 ? 'opacity-70' : 'opacity-50'
      }`}>
        <motion.div
          className="w-full h-full"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{
            duration: 3,
            repeat: Infinity,
            delay: i * 0.2,
          }}
        >
          {/* Placeholder logo pattern */}
          <div className={`w-full h-full rounded ${
            i % 2 === 0 ? 'bg-current' : 'border-2 border-current'
          }`} />
        </motion.div>
      </div>
    </div>
  ),
}));

export default function Brands() {
  const { company } = useCompany();

  return (
    <section className="py-24 px-4 overflow-hidden">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="max-w-6xl mx-auto"
      >
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className={`text-4xl font-bold text-center mb-16 ${
            company === 'tech' ? 'text-white' : 'text-gray-900'
          }`}
        >
          Trusted By Industry Leaders
        </motion.h2>

        <motion.div
          initial={{ x: -100 }}
          animate={{ x: 0 }}
          className="flex flex-wrap justify-center gap-12"
        >
          {brandLogos.map((brand, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={company === 'tech' ? 'text-gray-400' : 'text-gray-600'}
            >
              {brand.logo('w-32')}
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}