"use client";

import { useState } from 'react';
import { motion, AnimatePresence, useMotionValue, useMotionTemplate } from 'framer-motion';
import { useCompany } from '@/lib/company-context';
import { Quote, ChevronLeft, ChevronRight } from 'lucide-react';
import { useEffect, useRef } from 'react';

const testimonials = {
  tech: [
    {
      quote: "Base32 didn't just deliver code – they became true innovation partners. Their deep understanding of AI transformed our automation pipeline, reducing deployment time by 70%. Their strategic thinking and ownership mentality set them apart.",
      author: "Marcus Chen",
      role: "VP of Engineering, TechFlow",
    },
    {
      quote: "The AI integration exceeded all expectations. Their team worked as an extension of ours, delivering features in weeks that we estimated would take quarters. The technical expertise combined with business acumen made all the difference.",
      author: "Sarah Williams",
      role: "CTO, InnovateAI",
    },
    {
      quote: "From day one, Base32 demonstrated exceptional vision and execution. They elevated our entire approach to AI implementation, and the results have exceeded our most optimistic projections by 200%.",
      author: "David Park",
      role: "Head of Innovation, FutureScale",
    },
    {
      quote: "Their AI solutions revolutionized our workflow automation. What impressed me most was how they understood our business challenges and delivered solutions that went beyond just technology – they transformed our entire operation.",
      author: "Jennifer Zhao",
      role: "Director of Operations, NextGen Systems",
    },
  ],
  studio: [
    {
      quote: "Working with Base32 was transformative. They didn't just design our interface – they reimagined our entire user experience. Our user engagement increased by 150% within the first month post-launch.",
      author: "Rachel Torres",
      role: "Product Director, DesignFirst",
    },
    {
      quote: "The level of creativity and technical precision was outstanding. They delivered a design system that not only looks beautiful but has dramatically improved our development efficiency by 80%. Every interaction was purposeful.",
      author: "Michael Zhang",
      role: "UX Director, CreativeFlow",
    },
    {
      quote: "Base32 brought a perfect blend of innovation and practicality. They transformed our complex requirements into an elegant, user-friendly design that our customers love. Our user satisfaction scores jumped from 72% to 94%.",
      author: "Emma Thompson",
      role: "CEO, BrandScape",
    },
    {
      quote: "Their approach to design thinking revolutionized how we view product development. They created a visual language that perfectly captures our brand while delivering an intuitive user experience that our customers rave about.",
      author: "Alex Rivera",
      role: "Creative Director, VisualScope",
    },
  ],
};

const techColors = {
  base: ["#EAB308", "#CA8A04", "#A16207"],
  active: ["#FDE047", "#EAB308", "#CA8A04"],
  glow: ["#FEF08A", "#FDE047", "#EAB308"]
};

const studioColors = {
  base: ["#FDE047", "#EAB308", "#CA8A04"],
  active: ["#FEF08A", "#FDE047", "#EAB308"],
  glow: ["#FEF9C3", "#FEF08A", "#FDE047"]
};

export default function Testimonials() {
  const { company } = useCompany();
  const [currentIndex, setCurrentIndex] = useState(0);
  const currentTestimonials = company === 'tech' ? testimonials.tech : testimonials.studio;
  const isTech = company === 'tech';
  const containerRef = useRef<HTMLDivElement>(null);
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const maskImage = useMotionTemplate`radial-gradient(circle at ${mouseX}px ${mouseY}px, black 10%, transparent 80%)`;

  const gridSize = 40; 
  const baseDotSize = 2; 
  const maxLightRadius = 150; 
  const colors = isTech ? techColors : studioColors;

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      mouseX.set(x);
      mouseY.set(y);
    };

    container.addEventListener("mousemove", handleMouseMove);
    return () => container.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  const generateGrid = () => {
    if (!containerRef.current) return [];

    const width = containerRef.current.offsetWidth;
    const height = containerRef.current.offsetHeight;
    const cols = Math.ceil(width / gridSize);
    const rows = Math.ceil(height / gridSize);

    const mouseXValue = mouseX.get();
    const mouseYValue = mouseY.get();

    const gridElements = [];

    for (let i = 0; i <= cols; i++) {
      for (let j = 0; j <= rows; j++) {
        const x = i * gridSize;
        const y = j * gridSize;

        const dx = mouseXValue - x;
        const dy = mouseYValue - y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const isNearMouse = distance < maxLightRadius;

        const intensity = isNearMouse 
          ? Math.pow(1 - (distance / maxLightRadius), 3)
          : 0;

        const dotColor = isNearMouse
          ? colors.active[Math.floor((x + y) / gridSize) % colors.active.length]
          : colors.base[Math.floor((x + y) / gridSize) % colors.base.length];

        gridElements.push(
          <motion.circle
            key={`${i}-${j}`}
            cx={x}
            cy={y}
            r={baseDotSize}
            fill={dotColor}
            initial={{ opacity: 0.15 }}
            animate={{
              opacity: 0.15 + (intensity * 0.85),
              scale: 1 + (intensity * 0.3),
              fill: dotColor
            }}
            transition={{ duration: 0.2 }}
          />
        );

        if (isNearMouse && intensity > 0.3 && i < cols && j < rows) {
          const nextX = (i + 1) * gridSize;
          const nextY = (j + 1) * gridSize;

          gridElements.push(
            <motion.line
              key={`h-${i}-${j}`}
              x1={x}
              y1={y}
              x2={nextX}
              y2={y}
              stroke={colors.active[Math.floor((x + y) / gridSize) % colors.active.length]}
              strokeOpacity={intensity * 0.2}
              strokeWidth={1}
              initial={false}
            />,
            <motion.line
              key={`v-${i}-${j}`}
              x1={x}
              y1={y}
              x2={x}
              y2={nextY}
              stroke={colors.active[Math.floor((x + y) / gridSize) % colors.active.length]}
              strokeOpacity={intensity * 0.2}
              strokeWidth={1}
              initial={false}
            />
          );
        }
      }
    }

    return gridElements;
  };

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % currentTestimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + currentTestimonials.length) % currentTestimonials.length);
  };

  return (
    <div ref={containerRef} className="relative w-full overflow-hidden">
      {/* Background with grid */}
      <div className="absolute inset-0 -z-10">
        <div className={`w-full h-full ${
          isTech 
            ? 'bg-black/80 backdrop-blur-sm'
            : 'bg-white/90 backdrop-blur-sm'
        }`} />
        <svg
          className="absolute inset-0 w-full h-full"
          style={{
            mask: maskImage as any,
            WebkitMask: maskImage as any,
          }}
        >
          {generateGrid()}
        </svg>
      </div>

      <section id="testimonials-section" className="relative overflow-hidden py-32">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        >
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="max-w-2xl mx-auto text-center mb-16"
          >
            <div className="absolute -left-1/4 top-0 w-[150%] h-full opacity-50">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-yellow-300/20 via-yellow-200/10 to-transparent blur-2xl transform rotate-6 scale-y-125" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_60%_50%,_var(--tw-gradient-stops))] from-yellow-400/15 via-yellow-300/5 to-transparent blur-xl" />
            </div>

          </motion.div>

          <div className="grid lg:grid-cols-12 gap-8 lg:gap-16">
            <motion.div
              className="lg:col-span-4 relative"
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              >
                 <h2 className={`text-4xl lg:text-5xl font-semibold leading-[1.2] bg-clip-text text-transparent bg-gradient-to-br from-white via-yellow-100 to-yellow-300`}>
                  Client Success
                  <br />
                  <span className="bg-clip-text text-transparent bg-gradient-to-br from-yellow-300 via-yellow-200 to-white/90">
                    Stories
                  </span>
                </h2>
                <p className="mt-4 sm:mt-6 text-sm sm:text-base lg:text-lg text-gray-400">
                  {isTech
                    ? "Join companies who have achieved "
                    : "Join businesses who have transformed with "}
                  <span className="text-yellow-400">
                    {isTech ? "95% customer satisfaction" : "150% productivity boost"}
                  </span>
                </p>
              </motion.div>
            </motion.div>

            <div className="lg:col-span-8">
              <div className="relative">
                <div className="flex justify-center items-center gap-8">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={prevTestimonial}
                    className={`p-3 rounded-full ${
                      isTech
                        ? 'bg-blue-500/10 hover:bg-blue-500/20 text-white'
                        : 'bg-indigo-100 hover:bg-indigo-200 text-indigo-600'
                    }`}
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </motion.button>

                  <div className="relative w-full lg:max-w-3xl">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={currentIndex}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                        className="text-center px-0 md:px-8 py-12"
                      >
                        <Quote className={`w-6 h-6 sm:w-8 sm:h-8 mx-auto mb-4 sm:mb-6 ${
                          isTech ? 'text-yellow-400' : 'text-indigo-500'
                        }`} />
                        
                        <p className={`text-base sm:text-lg lg:text-xl mb-6 sm:mb-8 leading-normal sm:leading-relaxed ${
                          isTech ? 'text-white' : 'text-gray-800'
                        }`}>
                          {currentTestimonials[currentIndex].quote}
                        </p>
                        
                        <div>
                          <p className={`font-semibold text-sm sm:text-base ${
                            isTech ? 'text-white' : 'text-gray-900'
                          }`}>
                            {currentTestimonials[currentIndex].author}
                          </p>
                          <p className={`text-xs sm:text-sm ${
                            isTech ? 'text-gray-400' : 'text-gray-600'
                          }`}>
                            {currentTestimonials[currentIndex].role}
                          </p>
                        </div>
                      </motion.div>
                    </AnimatePresence>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={nextTestimonial}
                    className={`p-3 rounded-full ${
                      isTech
                        ? 'bg-blue-500/10 hover:bg-blue-500/20 text-white'
                        : 'bg-indigo-100 hover:bg-indigo-200 text-indigo-600'
                    }`}
                  >
                    <ChevronRight className="w-6 h-6" />
                  </motion.button>
                </div>

                <div className="flex justify-center mt-12 gap-2">
                  {currentTestimonials.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentIndex(index)}
                      className={`w-2 h-2 rounded-full transition-all duration-300 ${
                        index === currentIndex
                          ? isTech
                            ? 'bg-yellow-400 w-6'
                            : 'bg-indigo-500 w-6'
                          : isTech
                            ? 'bg-gray-600'
                            : 'bg-gray-300'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  );
}