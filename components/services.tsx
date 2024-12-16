"use client";

import React from 'react';
import { cn } from "@/lib/utils";
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
  const [isBookingOpen, setIsBookingOpen] = React.useState(false);

  return (
    <section id="services-section" className="relative py-16 sm:py-24 overflow-hidden bg-black">
      {/* Background gradient overlay for smooth transition */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black to-black pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
        {/* Header */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 mb-16 lg:mb-24">
          <div 
            className="relative animate-fade-up"
            style={{ "--animation-delay": "0ms" } as React.CSSProperties}
          >
            <h2 className="text-4xl lg:text-5xl font-semibold leading-[1.2] bg-clip-text text-transparent bg-gradient-to-r from-white via-yellow-200 to-yellow-400 animate-hero-gradient">
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
          </div>
        </div>

        {/* Description and Services Grid */}
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-16">
          {/* Left Column - Description and Button */}
          <div 
            className="lg:col-span-4 animate-fade-up"
            style={{ "--animation-delay": "200ms" } as React.CSSProperties}
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
                className="inline-flex items-center px-6 py-3 rounded-full text-white font-medium text-base lg:text-lg bg-gradient-to-r from-yellow-500/20 to-yellow-500/10 border border-yellow-500/20 hover:border-yellow-500/40 duration-300"
                onClick={() => setIsBookingOpen(true)}
              >
                Book a Call
              </button>
            </div>
          </div>

          {/* Right Column - Services Grid */}
          <div className="lg:col-span-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5">
            {services.map((service, index) => (
              <div
                key={index}
                className={cn(
                  "group relative p-4 lg:p-5 rounded-2xl backdrop-blur-lg animate-fade-up",
                  "border border-white/10",
                  "bg-gradient-to-tr",
                  "hover:border-white/20 hover:shadow-lg hover:shadow-white/5",
                  "duration-300"
                )}
                style={{ "--animation-delay": `${300 + (index * 100)}ms` } as React.CSSProperties}
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
                  "absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 duration-300",
                  "bg-gradient-to-tr",
                  service.gradient.includes("blue") ? "from-blue-400/30 via-cyan-400/20 to-transparent" :
                  service.gradient.includes("purple") ? "from-purple-400/30 via-pink-400/20 to-transparent" :
                  service.gradient.includes("emerald") ? "from-emerald-400/30 via-teal-400/20 to-transparent" :
                  service.gradient.includes("amber") ? "from-amber-400/30 via-orange-400/20 to-transparent" :
                  service.gradient.includes("rose") ? "from-rose-400/30 via-pink-400/20 to-transparent" :
                  "from-indigo-400/30 via-violet-400/20 to-transparent",
                  "-z-10"
                )} />

                {/* Content */}
                <div className="relative z-10">
                  <service.icon className="w-5 h-5 lg:w-6 lg:h-6 mb-3 text-yellow-400 group-hover:text-yellow-400/90 duration-300" />
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
              </div>
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
