"use client";

import React from 'react';
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useInView } from "framer-motion";
import { useRef } from "react";
import BookingModal from "./booking-modal";

import {
  Bot,
  Workflow,
  Brain,
  Zap,
  FileCode,
  AppWindow
} from "lucide-react";

const services = [
  {
    icon: Brain,
    title: "Intelligent Agents",
    description: "Accelerate production with AI-driven efficiency.",
    details: "We create tailored digital agents that streamline your operations, saving time and optimizing workflows.",
    gradient: "from-blue-600/20 via-cyan-500/10 to-transparent"
  },
  {
    icon: Workflow,
    title: "Process Automation",
    description: "Simplify processes and maximize productivity.",
    details: "Transform repetitive tasks into seamless workflows with smart automation built to adapt to your business.",
    gradient: "from-purple-600/20 via-pink-500/10 to-transparent"
  },
  {
    icon: Brain,
    title: "Rapid Prototyping",
    description: "From concept to MVP, faster than ever.",
    details: "Rapidly develop and iterate MVPs with AI-driven solutions that reduce costs and speed up delivery.",
    gradient: "from-emerald-600/20 via-teal-500/10 to-transparent"
  },
  {
    icon: Zap,
    title: "AI Integration",
    description: "Empower your systems with intelligent automation.",
    details: "Integrate cutting-edge AI into your operations to enhance decision-making and improve scalability.",
    gradient: "from-amber-600/20 via-orange-500/10 to-transparent"
  },
  {
    icon: FileCode,
    title: "Content Generation",
    description: "Fuel your creativity with AI-driven insights.",
    details: "Leverage AI to generate, refine, and optimize content for blogs, campaigns, and social platforms.",
    gradient: "from-rose-600/20 via-pink-500/10 to-transparent"
  },
  {
    icon: AppWindow,
    title: "AI Applications",
    description: "Build smarter, scalable applications fast.",
    details: "Develop AI-integrated web and mobile applications tailored to your business needs, ready to scale.",
    gradient: "from-indigo-600/20 via-violet-500/10 to-transparent"
  }
];

export default function Services() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  const scrollToContact = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth'
    });
  };

  const [isBookingOpen, setIsBookingOpen] = React.useState(false);

  return (
    <section id="services-section" className="relative py-16 sm:py-24 overflow-hidden bg-black" ref={containerRef}>
      {/* Background gradient overlay for smooth transition */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black to-black pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
        {/* Header */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 mb-16 lg:mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <h2 className="text-4xl lg:text-5xl font-semibold leading-[1.2] bg-clip-text text-transparent bg-gradient-to-r from-white via-yellow-200 to-yellow-400">
              Automate Your Business,
              <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 via-yellow-300 to-white">
                3x Faster Growth
              </span>
            </h2>
            <div className="absolute -inset-x-4 -inset-y-2 bg-gradient-to-r from-yellow-400/10 via-yellow-300/5 to-transparent blur-2xl -z-10" />
            <p className="mt-6 text-lg lg:text-xl text-gray-400">
              Our AI solutions help businesses reduce costs by 60% while 
              <span className="text-yellow-400"> tripling their operational efficiency</span>
            </p>
          </motion.div>
        </div>

        {/* Description and Services Grid */}
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-16">
          {/* Left Column - Description and Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 0.9, y: 1 }}
            viewport={{ once: true }}
            className="lg:col-span-4"
          >
            <div className="space-y-8">
              <p className="text-lg lg:text-xl leading-[1.8] text-gray-300">
                Transform your business operations with our enterprise-grade
                automation solutions. We specialize in developing intelligent
                systems that reduce operational costs, eliminate human error,
                and accelerate growth.
              </p>

              <div className="text-base lg:text-lg leading-[1.6] text-gray-400">
                <p className="mb-6">Our solutions have helped companies achieve:</p>
                <ul className="space-y-3">
                  <li className="flex items-center gap-2">
                    <Zap className="w-4 h-4 text-yellow-400" />
                    80% reduction in manual tasks
                  </li>
                  <li className="flex items-center gap-2">
                    <Zap className="w-4 h-4 text-yellow-400" />
                    60% faster processing times
                  </li>
                  <li className="flex items-center gap-2">
                    <Zap className="w-4 h-4 text-yellow-400" />
                    99.9% accuracy in automated processes
                  </li>
                </ul>
              </div>

              <button 
                className="inline-flex items-center px-6 py-3 rounded-full text-white font-medium text-base lg:text-lg bg-gradient-to-r from-yellow-500/20 to-yellow-500/10 border border-yellow-500/20 hover:border-yellow-500/40 transition-all duration-300 mt-8 lg:mt-12"
                onClick={() => setIsBookingOpen(true)}
              >
                Book a Call
              </button>
            </div>
          </motion.div>

          {/* Right Column - Services Grid */}
          <div className="lg:col-span-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={cn(
                  "group relative p-4 lg:p-5 rounded-2xl backdrop-blur-lg",
                  "border border-white/10",
                  "bg-gradient-to-tr",
                  "hover:border-white/20 hover:shadow-lg hover:shadow-white/5",
                  "transition-all duration-500"
                )}
              >
                {/* Base gradient */}
                <div className={cn(
                  "absolute inset-0 rounded-2xl",
                  "bg-gradient-to-tr",
                  service.gradient,
                  "-z-10"
                )} />

                {/* Hover gradient effect */}
                <div className={cn(
                  "absolute inset-0 rounded-2xl",
                  "bg-gradient-to-tr from-white/20 via-white/10 to-transparent",
                  "opacity-0 group-hover:opacity-100",
                  "transition-all duration-500",
                  "group-hover:bg-gradient-to-tr",
                  service.gradient.includes("blue") ? "group-hover:from-blue-400/30 group-hover:via-cyan-400/20 group-hover:to-transparent" :
                  service.gradient.includes("purple") ? "group-hover:from-purple-400/30 group-hover:via-pink-400/20 group-hover:to-transparent" :
                  service.gradient.includes("emerald") ? "group-hover:from-emerald-400/30 group-hover:via-teal-400/20 group-hover:to-transparent" :
                  service.gradient.includes("amber") ? "group-hover:from-amber-400/30 group-hover:via-orange-400/20 group-hover:to-transparent" :
                  service.gradient.includes("rose") ? "group-hover:from-rose-400/30 group-hover:via-pink-400/20 group-hover:to-transparent" :
                  "group-hover:from-indigo-400/30 group-hover:via-violet-400/20 group-hover:to-transparent"
                )} />

                {/* Content */}
                <div className="relative z-10">
                  <service.icon className="w-5 h-5 lg:w-6 lg:h-6 mb-3 text-yellow-400 group-hover:text-yellow-400/90 transition-colors duration-500" />
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold leading-tight text-gray-100">
                      {service.title}
                    </h3>
                    <p className="text-sm leading-normal sm:leading-6 text-gray-400">
                      {service.description}
                    </p>
                  </div>
                  <p className="text-gray-400 leading-relaxed text-xs lg:text-sm group-hover:text-gray-400/90">
                    {service.details}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
      <BookingModal 
        isOpen={isBookingOpen} 
        onClose={() => setIsBookingOpen(false)} 
      />
    </section>
  );
}
