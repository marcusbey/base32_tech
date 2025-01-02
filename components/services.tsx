"use client";

import React from 'react';
import { cn } from "@/lib/utils";
import BookingModal from "./booking-modal";
import { useScroll } from "@/context/scroll-context";

import {
  Bot,
  Workflow,
  Brain,
  Zap,
  FileCode,
  AppWindow,
  Database
} from "lucide-react";

const services = [
  {
    icon: Brain,
    title: "Intelligent Agents",
    description: "Accelerate production with AI-driven efficiency.",
    details: "We create tailored digital agents that streamline your operations, saving time and optimizing workflows.",
    gradient: "from-blue-600/10 via-cyan-500/5 to-transparent"
  },
  {
    icon: AppWindow,
    title: "AI Native Applications",
    description: "Build AI-first, scalable applications.",
    details: "Develop applications with AI at their core, ensuring intelligence is built-in, not bolted-on, for truly modern solutions.",
    gradient: "from-indigo-600/10 via-violet-500/5 to-transparent"
  },
  {
    icon: Workflow,
    title: "Process Automation",
    description: "Simplify processes and maximize productivity.",
    details: "Transform repetitive tasks into seamless workflows with smart automation built to adapt to your business.",
    gradient: "from-purple-600/10 via-pink-500/5 to-transparent"
  },
  {
    icon: Brain,
    title: "Rapid Prototyping",
    description: "From concept to MVP, faster than ever.",
    details: "Rapidly develop and iterate MVPs with AI-driven solutions that reduce costs and speed up delivery.",
    gradient: "from-emerald-600/10 via-teal-500/5 to-transparent"
  },
  {
    icon: Zap,
    title: "AI Integration",
    description: "Empower your systems with intelligent automation.",
    details: "Integrate cutting-edge AI into your operations to enhance decision-making and improve scalability.",
    gradient: "from-amber-600/10 via-orange-500/5 to-transparent"
  },
  {
    icon: Database,
    title: "Data Scraping",
    description: "Extract valuable data from any web source.",
    details: "Automate data collection from websites, transform raw data into structured formats, and gain actionable insights.",
    gradient: "from-blue-600/10 via-cyan-500/5 to-transparent"
  }
];

export default function Services() {
  const [isBookingOpen, setIsBookingOpen] = React.useState(false);
  const [isVisible, setIsVisible] = React.useState(false);
  const sectionRef = React.useRef<HTMLElement>(null);
  const { setGradientProgress } = useScroll();

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
        }
      },
      { 
        threshold: 0.1,
        rootMargin: "-100px 0px" 
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  React.useEffect(() => {
    const calculateProgress = () => {
      if (!sectionRef.current) return;

      const rect = sectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const halfScreen = windowHeight / 2;
      
      // Calculate progress based on section position relative to half screen
      const distanceFromHalf = rect.top - halfScreen;
      const startDistance = windowHeight; // Start transition one screen height before half
      
      let progress = 1 - (distanceFromHalf / startDistance);
      progress = Math.max(0, Math.min(1, progress)); // Clamp between 0 and 1
      
      setGradientProgress(progress);
    };

    window.addEventListener('scroll', calculateProgress);
    calculateProgress(); // Initial calculation

    return () => window.removeEventListener('scroll', calculateProgress);
  }, [setGradientProgress]);

  return (
    <section
      ref={sectionRef}
      id="services-section"
      className="relative py-16 sm:py-24"
    >
      <div className={cn("services-glow", isVisible && "show")} aria-hidden="true" />
      
      {/* Background gradient overlay for smooth transition */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black to-black pointer-events-none z-10" />
      
      <div className="relative bg-black  w-full z-20">

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 py-32">
          {/* Header */}
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 mb-16 lg:mb-24">
            <div 
              className="relative animate-fade-up"
              style={{ "--animation-delay": "0ms" } as React.CSSProperties}
            >
              <h2 className="text-4xl lg:text-5xl font-[500] leading-[1.2] bg-clip-text text-transparent bg-gradient-to-r from-white via-yellow-200 to-yellow-400 animate-hero-gradient">
                Automate Your Business,
                <br />
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 via-yellow-300 to-white">
                  3x Faster Growth
                </span>
              </h2>
              <div className="absolute -inset-x-4 -inset-y-2 bg-gradient-to-r from-yellow-400/10 via-yellow-300/5 to-transparent blur-2xl z-20" />
              <p className="mt-6 text-lg lg:text-xl text-gray-400 font-light">
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
                <p className="text-lg lg:text-xl leading-[1.8] text-gray-300 font-light">
                  Transform your business operations with our enterprise-grade
                  automation solutions. We specialize in developing intelligent
                  systems that reduce operational costs, eliminate human error,
                  and accelerate growth.
                </p>

                <div className="text-base lg:text-lg leading-[1.6] text-gray-400 font-light">
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
                  className="inline-flex items-center px-12 py-3 rounded-full text-white font-light text-base lg:text-lg bg-gradient-to-r from-yellow-500/20 to-yellow-500/10 border border-yellow-500/20 hover:border-yellow-500/40 duration-300"
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
                      <h3 className="text-lg font-[500] text-white mb-2">
                        {service.title}
                      </h3>
                      <p className="text-sm text-gray-400 font-light">
                        {service.description}
                      </p>
                    </div>
                    <p className="mt-2 text-sm text-gray-500 font-light">
                      {service.details}
                    </p>
                  </div>
                </div>
              ))}
            </div>
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
