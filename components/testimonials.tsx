"use client";

import { motion } from 'framer-motion';
import { useCompany } from './company-provider';

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
  const currentTestimonials = company === 'tech' ? testimonials.tech : testimonials.studio;

  return (
    <section className="py-24 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className={`text-4xl font-bold text-center mb-16 ${
            company === 'tech' ? 'text-white' : 'text-gray-900'
          }`}
        >
          What Our Clients Say
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {currentTestimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.author}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`p-8 rounded-2xl ${
                company === 'tech'
                  ? 'bg-black/50 border border-blue-500/20'
                  : 'bg-white/50 border border-gray-200'
              } backdrop-blur-lg`}
            >
              <div className={`mb-6 text-3xl ${
                company === 'tech' ? 'text-blue-400' : 'text-indigo-500'
              }`}>
                "
              </div>
              <p className={`mb-6 ${
                company === 'tech' ? 'text-gray-300' : 'text-gray-600'
              }`}>
                {testimonial.quote}
              </p>
              <div>
                <p className={`font-semibold ${
                  company === 'tech' ? 'text-white' : 'text-gray-900'
                }`}>
                  {testimonial.author}
                </p>
                <p className={`text-sm ${
                  company === 'tech' ? 'text-gray-400' : 'text-gray-500'
                }`}>
                  {testimonial.role}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}