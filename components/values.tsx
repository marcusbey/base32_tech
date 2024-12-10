"use client";

import { motion, useScroll, useTransform } from 'framer-motion';
import { useCompany } from '@/lib/company-context';

const values = [
  {
    title: "Innovation Through Intelligence",
    description: "We push the boundaries of what's possible with AI and automation, creating solutions that adapt and evolve with your business needs.",
    keywords: ["TRANSFORM", "DISRUPT", "CREATE", "PIONEER", "ADVANCE", "INSPIRE"]
  },
  {
    title: "Precision in Execution",
    description: "Every line of code, every algorithm, and every solution is crafted with meticulous attention to detail and performance.",
    keywords: ["DELIVER", "PERFECT", "OPTIMIZE", "ACHIEVE", "EXCEL", "MASTER"]
  },
  {
    title: "Client-Centric Evolution",
    description: "Your success drives our innovation. We continuously evolve our solutions based on real-world feedback and results.",
    keywords: ["ADAPT", "GROW", "IMPROVE", "PROGRESS", "DEVELOP", "THRIVE"]
  }
];

export default function Values() {
  const { company } = useCompany();
  const { scrollYProgress } = useScroll();
  const isTech = company === "tech";
  
  // Transform values for the big words
  const y = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.5, 0]);

  if (company !== 'tech') return null;

  return (
    <section className={`relative py-24 ${isTech ? 'bg-black' : ''}`}>
      {/* Tech-specific gradient overlay */}
      {isTech && (
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/50 to-black pointer-events-none" />
      )}
      
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                viewport={{ once: true }}
                className={`relative p-8 rounded-lg ${
                  isTech 
                    ? 'bg-black/40 border border-indigo-500/20' 
                    : 'bg-white/5 backdrop-blur-sm'
                }`}
              >
                <motion.div
                  style={{ y, opacity }}
                  className="absolute -top-10 right-0 text-8xl font-bold text-gray-100/5 pointer-events-none"
                >
                  {value.bigWord}
                </motion.div>
                <h3 className={`text-2xl font-bold mb-4 ${
                  isTech ? 'text-white' : 'text-gray-900 dark:text-white'
                }`}>
                  {value.title}
                </h3>
                <p className={`mb-6 ${
                  isTech ? 'text-gray-300' : 'text-gray-600 dark:text-gray-300'
                }`}>
                  {value.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {value.keywords.map((keyword) => (
                    <span
                      key={keyword}
                      className={`text-xs font-medium px-2 py-1 rounded ${
                        isTech
                          ? 'bg-indigo-500/10 text-indigo-300'
                          : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300'
                      }`}
                    >
                      {keyword}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}