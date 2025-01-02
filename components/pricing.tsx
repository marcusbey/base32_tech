"use client";

import { useCompany } from "@/lib/company-context";
import { motion } from "framer-motion";
import { useState } from "react";
import BookingModal from "./booking-modal";
import {
  Bot,
  Brain,
  CheckCircle2,
  Clock,
  Code,
  Layout,
  Palette,
  Rocket,
  Shield,
  Target,
  Workflow,
} from "lucide-react";
import { memo } from "react";

const pricingFeatures = {
  tech: [
    {
      icon: Bot,
      title: "60% Cost Reduction",
      description: "Slash operational costs with smart automation",
    },
    {
      icon: Workflow,
      title: "3x Faster Growth",
      description: "Accelerate your business with AI-powered solutions",
    },
    {
      icon: Brain,
      title: "24/7 AI Operations",
      description: "Non-stop intelligent automation working for you",
    },
    {
      icon: Shield,
      title: "99.9% Accuracy",
      description: "Enterprise-grade precision in every task",
    },
    {
      icon: Clock,
      title: "Instant Scaling",
      description: "Grow your operations without growing overhead",
    },
  ],
  studio: [
    {
      icon: Palette,
      title: "Brand Identity",
      description: "Complete visual language system",
    },
    {
      icon: Layout,
      title: "UI/UX Design",
      description: "User-centered interface design",
    },
    {
      icon: Code,
      title: "Development",
      description: "Clean, maintainable code",
    },
    {
      icon: Target,
      title: "Strategy",
      description: "Data-driven design decisions",
    },
    {
      icon: Clock,
      title: "Fast Delivery",
      description: "Quick turnaround times",
    },
  ],
};

function Pricing() {
  const { company } = useCompany();
  const currentFeatures =
    company === "tech" ? pricingFeatures.tech : pricingFeatures.studio;
  const isTech = company === "tech";
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  
  return (
    <section id="pricing-section" className="relative py-16 sm:py-24 overflow-hidden flex items-center">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <h2
            className={`text-3xl lg:text-5xl font-[500] mb-4 ${
              isTech ? "text-white" : "text-gray-900"
            }`}
          >
            Let's Build Something Great
          </h2>
          <p
            className={`text-base lg:text-xl font-light ${isTech ? "text-gray-400" : "text-gray-600"}`}
          >
            Schedule a consultation to discuss your unique needs
          </p>
        </motion.div>

        <div className="grid md:grid-cols-12 gap-16 max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="mega-glass-card rounded-2xl overflow-hidden relative group md:col-span-7 bg-gradient-to-br from-blue-900/30 via-blue-800/20 to-blue-700/10"
          >
            <div className="p-8 relative">
              <div className="absolute inset-0 overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,_var(--tw-gradient-stops))] from-blue-600/20 via-blue-800/5 to-transparent animate-pulse-slow blur-3xl" />
                <div className="absolute inset-0 bg-[conic-gradient(from_0deg_at_50%_50%,_var(--tw-gradient-stops))] from-blue-700/10 via-blue-600/5 to-blue-700/10 animate-spin-slower blur-2xl" />
                <div className="absolute inset-0 bg-gradient-to-t from-blue-900/20 via-transparent to-transparent backdrop-blur-2xlxl" />
              </div>
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-6">
                  <h3
                    className={`text-xl lg:text-2xl font-[500] ${
                      isTech ? "text-white" : "text-gray-900"
                    }`}
                  >
                    {isTech ? "Enterprise AI Solution" : "Full Design System"}
                  </h3>
                  <span
                    className={`text-xs lg:text-sm font-light px-4 py-2 lg:px-3 lg:py-1 text-center rounded-full ${
                      isTech
                        ? "bg-yellow-500/10 text-yellow-400"
                        : "bg-indigo-500/10 text-indigo-500"
                    }`}
                  >
                    {isTech ? "Custom Solutions" : "Tailored Design"}
                  </span>
                </div>

                <div className="mb-8">
                  <p className={`text-base lg:text-lg font-light ${isTech ? "text-gray-300" : "text-gray-700"}`}>
                    Get a customized solution designed specifically for your business needs. Our team will work closely with you to understand your requirements and deliver exceptional results.
                  </p>
                </div>

                <div className="space-y-4 mb-8">
                  {currentFeatures.map((feature, index) => (
                    <motion.div
                      key={feature.title}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-start gap-3"
                    >
                      <feature.icon
                        className={`w-5 h-5 mt-0.5 ${
                          isTech ? "text-yellow-400" : "text-indigo-500"
                        }`}
                      />
                      <div className="space-y-2">
                        <h3 className={`text-base lg:text-lg font-[500] leading-tight ${isTech ? "text-white" : "text-gray-900"}`}>
                          {feature.title}
                        </h3>
                        <p className={`text-xs lg:text-sm leading-normal sm:leading-6 font-light ${isTech ? "text-gray-400" : "text-gray-600"}`}>
                          {feature.description}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <div className="flex justify-start">
                  <motion.button
                    whileTap={{ opacity: 0.8 }}
                    onClick={() => setIsBookingOpen(true)}
                    className="inline-flex items-center px-6 py-3 rounded-full text-white font-light text-sm lg:text-base bg-gradient-to-r from-yellow-500/30 via-yellow-400/20 to-yellow-300/10 border border-yellow-500/30 hover:border-yellow-400/50 transition-all duration-300"
                  >
                    Schedule a Consultation
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="md:col-span-5 flex flex-col justify-center"
          >
            <div className="space-y-6">
              <div>
                <h4
                  className={`text-xl font-[500] mb-2 ${
                    isTech ? "text-white" : "text-gray-900"
                  }`}
                >
                  Why Choose Us?
                </h4>
                <p className={`${isTech ? "text-gray-400" : "text-gray-600"} font-light`}>
                  We partner with you to create solutions that drive real business value. Our approach combines technical excellence with strategic thinking.
                </p>
              </div>
              <div>
                <h4
                  className={`text-xl font-[500] mb-2 ${
                    isTech ? "text-white" : "text-gray-900"
                  }`}
                >
                  Our Process
                </h4>
                <ul className={`space-y-3 font-light ${isTech ? "text-gray-400" : "text-gray-600"}`}>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className={`w-5 h-5 ${isTech ? "text-yellow-400" : "text-indigo-500"}`} />
                    Discovery Call
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className={`w-5 h-5 ${isTech ? "text-yellow-400" : "text-indigo-500"}`} />
                    Custom Solution Design
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className={`w-5 h-5 ${isTech ? "text-yellow-400" : "text-indigo-500"}`} />
                    Implementation & Support
                  </li>
                </ul>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
      <BookingModal 
        isOpen={isBookingOpen} 
        onClose={() => setIsBookingOpen(false)} 
      />   
    </section>
  );
}

export default memo(Pricing);
