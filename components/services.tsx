"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useInView } from "framer-motion";
import { useRef } from "react";
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
    icon: Bot,
    title: "Intelligent Agents",
    description: "Accelerate production with AI-driven efficiency.",
    details: "We create tailored digital agents that streamline your operations, saving time and optimizing workflows.",
    gradient: "from-blue-500/10 to-transparent",
    hoverGradient: "from-blue-500/5 to-transparent"
  },
  {
    icon: Workflow,
    title: "Custom Workflow Automation",
    description: "Simplify processes and maximize productivity.",
    details: "Transform repetitive tasks into seamless workflows with smart automation built to adapt to your business.",
    gradient: "from-purple-500/10 to-transparent",
    hoverGradient: "from-purple-500/5 to-transparent"
  },
  {
    icon: Brain,
    title: "AI-Powered Prototyping",
    description: "From concept to MVP, faster than ever.",
    details: "Rapidly develop and iterate MVPs with AI-driven solutions that reduce costs and speed up delivery.",
    gradient: "from-green-500/10 to-transparent",
    hoverGradient: "from-green-500/5 to-transparent"
  },
  {
    icon: Zap,
    title: "Advanced AI Integration",
    description: "Empower your systems with intelligent automation.",
    details: "Integrate cutting-edge AI into your operations to enhance decision-making and improve scalability.",
    gradient: "from-orange-500/10 to-transparent",
    hoverGradient: "from-orange-500/5 to-transparent"
  },
  {
    icon: FileCode,
    title: "Content Creation with AI",
    description: "Fuel your creativity with AI-driven insights.",
    details: "Leverage AI to generate, refine, and optimize content for blogs, campaigns, and social platforms.",
    gradient: "from-pink-500/10 to-transparent",
    hoverGradient: "from-pink-500/5 to-transparent"
  },
  {
    icon: AppWindow,
    title: "Custom Application Development",
    description: "Build smarter, scalable applications fast.",
    details: "Develop AI-integrated web and mobile applications tailored to your business needs, ready to scale.",
    gradient: "from-indigo-500/10 to-transparent",
    hoverGradient: "from-indigo-500/5 to-transparent"
  }
];

export default function Services() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  return (
    <section className="relative py-32 bg-black" ref={containerRef}>
      {/* Background gradient overlay for smooth transition */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black to-black pointer-events-none" />
      
      <div className="max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="grid lg:grid-cols-2 gap-16 mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl font-semibold leading-[1.2] text-white">
              Pioneering Tomorrow's Solutions Today
            </h2>
          </motion.div>
        </div>

        {/* Description and Services Grid */}
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-16">
          {/* Left Column - Description and Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 0.9, y: 1 }}
            viewport={{ once: true }}
            className="lg:col-span-3"
          >
            <div className="space-y-8">
              <p className="text-xl leading-[1.8] text-gray-300">
                Transform your business operations with our enterprise-grade
                automation solutions. We specialize in developing intelligent
                systems that reduce operational costs, eliminate human error,
                and accelerate growth.
              </p>

              <div className="text-lg leading-[1.6] text-gray-400">
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

              <motion.a
                href="/contact"
                className={cn(
                  "inline-flex items-center px-6 py-3 rounded-full",
                  "text-white font-medium text-lg",
                  "bg-gradient-to-r from-yellow-500/20 to-yellow-500/10",
                  "border border-yellow-500/20 hover:border-yellow-500/40",
                  "transition-all duration-300 mt-12"
                )}
              >
                <div className="relative z-10 flex items-center gap-2">
                  Contact us
                  <motion.div
                    initial={{ x: -4, opacity: 0.5 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{
                      repeat: Infinity,
                      repeatType: "mirror",
                      duration: 1,
                    }}
                  >
                    →
                  </motion.div>
                </div>
              </motion.a>
            </div>
          </motion.div>

          {/* Empty Column for spacing */}
          <div className="hidden lg:block lg:col-span-1" />

          {/* Right Column - Services Grid */}
          <div className="lg:col-span-8 grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={cn(
                  "group relative p-5 rounded-2xl backdrop-blur-lg",
                  "border border-white/10",
                  `bg-gradient-to-br ${service.gradient}`,
                  "hover:border-white/20 transition-all duration-500"
                )}
              >
                <div className="relative z-10">
                  <service.icon className="w-6 h-6 mb-3 text-yellow-400" />
                  <h3 className="text-base font-semibold text-white mb-2 leading-snug">
                    {service.title}
                  </h3>
                  <p className="text-yellow-400/90 mb-3 leading-relaxed text-sm">
                    {service.description}
                  </p>
                  <p className="text-gray-400 leading-relaxed text-sm">
                    {service.details}
                  </p>
                </div>

                {/* Hover gradient effect */}
                <div className={cn(
                  "absolute inset-0 rounded-2xl",
                  `bg-gradient-to-b ${service.hoverGradient}`,
                  "opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                )} />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
