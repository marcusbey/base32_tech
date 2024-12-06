"use client";

import { motion, useScroll, useTransform } from 'framer-motion';
import { useCompany } from '@/lib/company-context';

const values = [
  {
    title: "Innovation Through Intelligence",
    description: "We push the boundaries of what's possible with AI and automation, creating solutions that adapt and evolve with your business needs.",
    bigWord: "INNOVATE",
    keywords: ["TRANSFORM", "DISRUPT", "CREATE", "PIONEER", "ADVANCE", "INSPIRE"]
  },
  {
    title: "Precision in Execution",
    description: "Every line of code, every algorithm, and every solution is crafted with meticulous attention to detail and performance.",
    bigWord: "EXECUTE",
    keywords: ["DELIVER", "PERFECT", "OPTIMIZE", "ACHIEVE", "EXCEL", "MASTER"]
  },
  {
    title: "Client-Centric Evolution",
    description: "Your success drives our innovation. We continuously evolve our solutions based on real-world feedback and results.",
    bigWord: "EVOLVE",
    keywords: ["ADAPT", "GROW", "IMPROVE", "PROGRESS", "DEVELOP", "THRIVE"]
  }
];

export default function Values() {
  const { company } = useCompany();
  const { scrollYProgress } = useScroll();
  
  // Transform values for the big words
  const x1 = useTransform(scrollYProgress, [0.4, 0.8], ['-100%', '100%']);
  const x2 = useTransform(scrollYProgress, [0.4, 0.8], ['100%', '-100%']);
  const x3 = useTransform(scrollYProgress, [0.4, 0.8], ['-100%', '100%']);
  
  if (company !== 'tech') return null;

  return (
    <section className="relative border-t border-blue-500/20">
      {/* Content */}
      <div className="relative mx-auto max-w-7xl">
          
          {/* Left Column - Text Content */}
          <div className="grid lg:grid-cols-5">
            <div className="relative col-span-2 px-8 py-32 space-y-32">
              {values.map((value, index) => (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ 
                    delay: index * 0.2,
                    duration: 0.8,
                    ease: [0.21, 0.45, 0.15, 1.0]
                  }}
                  className="relative"
                >
                  <h3 className="text-2xl font-medium text-white mb-4">{value.title}</h3>
                  <p className="text-slate-400">{value.description}</p>
                  
                  {/* Keywords Animation */}
                  <div className="absolute -right-24 top-0 flex flex-wrap w-24 gap-2">
                    {value.keywords.map((keyword, kidx) => (
                      <motion.span
                        key={keyword}
                        className="text-xs font-medium text-blue-400/60"
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{
                          delay: index * 0.1 + kidx * 0.1,
                          duration: 0.5,
                          ease: "easeOut"
                        }}
                      >
                        {keyword}
                      </motion.span>
                    ))}
                  </div>
                  
                  {/* Subtle decorative line */}
                  <div className="absolute -left-8 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-yellow-500/30 to-transparent" />
                </motion.div>
              ))}
            </div>
          <div className=""></div>
      </div>
              </div>
  {/* Right Column - Moving Words Background */}
        <div className="absolute top-0 right-0 h-full w-1/2 overflow-hidden">
          {/* Glass effect background */}
          <div className="absolute inset-0 bg-black/10 backdrop-blur-xl">
            {/* Subtle pattern overlay */}
            <div className="absolute inset-0 opacity-5" style={{
              backgroundImage: `radial-gradient(circle at 1px 1px, rgba(0,0,0, 0.4) 1px, transparent 0)`,
              backgroundSize: '32px 32px'
            }} />
            
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-950/20 via-transparent to-blue-900/20" />

            {/* Big Moving Words */}
            <motion.div
              style={{ x: x1 }}
              className="absolute top-[10%] whitespace-nowrap text-[20vw] font-bold text-white/[0.05]"
            >
              {values[0].bigWord}
            </motion.div>
            <motion.div
              style={{ x: x2 }}
              className="absolute top-[40%] whitespace-nowrap text-[20vw] font-bold text-white/[0.05]"
            >
              {values[1].bigWord}
            </motion.div>
            <motion.div
              style={{ x: x3 }}
              className="absolute top-[70%] whitespace-nowrap text-[20vw] font-bold text-white/[0.05]"
            >
              {values[2].bigWord}
            </motion.div>
          </div>
        </div>
      

    </section>
  );
}