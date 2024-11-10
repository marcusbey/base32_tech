"use client";

import { motion } from 'framer-motion';
import { useCompany } from './company-provider';
import { Bot, Workflow, Brain, Clock, Palette, Layout, Wand2, Users } from 'lucide-react';

const services = {
  tech: [
    { icon: Bot, title: 'AI Agents', description: 'Custom intelligent agents that learn and adapt to your needs' },
    { icon: Workflow, title: 'Workflow Automation', description: 'Streamline complex processes with smart automation' },
    { icon: Brain, title: 'Machine Learning', description: 'Advanced algorithms that improve over time' },
    { icon: Clock, title: 'Time Optimization', description: 'Save hours daily with automated task management' },
  ],
  studio: [
    { icon: Palette, title: 'Brand Identity', description: 'Distinctive visual languages that tell your story' },
    { icon: Layout, title: 'UI/UX Design', description: 'Intuitive interfaces that delight users' },
    { icon: Wand2, title: 'Design Systems', description: 'Scalable and consistent design frameworks' },
    { icon: Users, title: 'User Research', description: 'Data-driven design decisions' },
  ],
};

export default function Services() {
  const { company } = useCompany();
  const currentServices = company === 'tech' ? services.tech : services.studio;

  return (
    <section className="py-24 px-4">
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
          Our Services
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {currentServices.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`p-6 rounded-2xl ${
                company === 'tech'
                  ? 'bg-black/50 border border-blue-500/20 hover:border-blue-500/40'
                  : 'bg-white/50 border border-gray-200 hover:border-gray-300'
              } backdrop-blur-lg transition-all duration-300`}
            >
              <service.icon className={`w-12 h-12 mb-4 ${
                company === 'tech' ? 'text-blue-400' : 'text-indigo-500'
              }`} />
              <h3 className={`text-xl font-semibold mb-2 ${
                company === 'tech' ? 'text-white' : 'text-gray-900'
              }`}>
                {service.title}
              </h3>
              <p className={company === 'tech' ? 'text-gray-400' : 'text-gray-600'}>
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}