"use client";

import { motion } from 'framer-motion';
import { useCompany } from './company-provider';
import { CircuitBoard, Palette } from 'lucide-react';

export default function Pricing() {
  const { company } = useCompany();

  const pricingData = {
    tech: {
      price: 3.9,
      spotsLeft: 4,
      features: [
        'AI-powered automation',
        'Custom intelligent agents',
        'Workflow optimization',
        '24/7 automated support',
      ],
    },
    studio: {
      price: 4.9,
      spotsLeft: 3,
      features: [
        'Custom brand design',
        'UI/UX development',
        'Design system creation',
        'Brand strategy',
      ],
    },
  };

  const currentData = company === 'tech' ? pricingData.tech : pricingData.studio;

  return (
    <section className="min-h-screen flex items-center justify-center px-4 py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className={`w-full max-w-md ${
          company === 'tech'
            ? 'bg-black/50 border border-blue-500/20'
            : 'bg-white/50 border border-gray-200'
        } backdrop-blur-lg rounded-2xl overflow-hidden`}
      >
        <div className="p-8">
          <div className="flex items-center gap-3 mb-6">
            {company === 'tech' ? (
              <CircuitBoard className="w-8 h-8 text-blue-400" />
            ) : (
              <Palette className="w-8 h-8 text-indigo-500" />
            )}
            <h2 className={`text-2xl font-bold ${
              company === 'tech' ? 'text-white' : 'text-gray-900'
            }`}>
              {company === 'tech' ? 'BASE32.TECH' : 'BASE32.STUDIO'}
            </h2>
          </div>

          <div className="mb-6">
            <p className={`text-4xl font-bold ${
              company === 'tech' ? 'text-white' : 'text-gray-900'
            }`}>
              ${currentData.price}
              <span className="text-lg font-normal">/month</span>
            </p>
            <p className={`mt-2 ${
              company === 'tech' ? 'text-blue-400' : 'text-indigo-500'
            }`}>
              Only {currentData.spotsLeft} spots left!
            </p>
          </div>

          <ul className="space-y-4 mb-8">
            {currentData.features.map((feature, index) => (
              <motion.li
                key={feature}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`flex items-center gap-3 ${
                  company === 'tech' ? 'text-gray-300' : 'text-gray-600'
                }`}
              >
                <svg
                  className={`w-5 h-5 ${
                    company === 'tech' ? 'text-blue-400' : 'text-indigo-500'
                  }`}
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M5 13l4 4L19 7" />
                </svg>
                {feature}
              </motion.li>
            ))}
          </ul>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`w-full py-3 px-6 rounded-lg font-semibold transition-colors ${
              company === 'tech'
                ? 'bg-blue-500 hover:bg-blue-600 text-white'
                : 'bg-indigo-500 hover:bg-indigo-600 text-white'
            }`}
          >
            Get Started Now
          </motion.button>
        </div>
      </motion.div>
    </section>
  );
}