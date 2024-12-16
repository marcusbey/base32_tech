"use client";

import { useCompany } from "@/lib/company-context";
import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import { Building2, Rocket } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

const sectors = {
  tech: [
    {
      name: "Startups",
      icon: Rocket,
      description:
        "Empowering startups with agile development and cost-effective solutions. We excel in product thinking, rapid prototyping, MVP development...",
      fullDescription:
        "Empowering startups with agile development and cost-effective solutions. We excel in product thinking, rapid prototyping, MVP development, and comprehensive mobile and SAAS solutions.",
      benefits: [
        "Rapid MVP development and iteration",
        "Scalable architecture from day one",
        "Cost-effective automation solutions",
        "Growth-focused implementation",
      ],
    },
    {
      name: "Enterprise",
      icon: Building2,
      description:
        "Partnering with established organizations to drive digital transformation through intelligent automation. We specialize in enterprise-wide solutions, legacy system modernization...",
      fullDescription:
        "Partnering with established organizations to drive digital transformation through intelligent automation. We specialize in enterprise-wide solutions, legacy system modernization, and secure, scalable architectures that enhance operational efficiency.",
      benefits: [
        "Custom AI solutions tailored to enterprise scale",
        "Seamless integration with existing systems",
        "Enhanced security and compliance measures",
        "Comprehensive training and support",
      ],
    },
  ],
  studio: [
    {
      name: "Startups",
      icon: Rocket,
      description:
        "Helping startups build memorable brands and engaging digital products. We focus on rapid iteration and scalable design solutions...",
      fullDescription:
        "Helping startups build memorable brands and engaging digital products. We focus on rapid iteration and scalable design solutions that grow with your business.",
      benefits: [
        "Brand strategy development",
        "Product design",
        "User interface design",
        "Design system creation",
      ],
    },
    {
      name: "Enterprise",
      icon: Building2,
      description:
        "Creating sophisticated brand identities and digital experiences for established organizations. Our enterprise solutions deliver scalable design systems...",
      fullDescription:
        "Creating sophisticated brand identities and digital experiences for established organizations. Our enterprise solutions deliver scalable design systems and comprehensive brand guidelines.",
      benefits: [
        "Enterprise-scale design systems",
        "Brand identity development",
        "Digital transformation",
        "User experience optimization",
      ],
    },
  ],
};

export default function Brands() {
  const { company } = useCompany();
  const currentSectors = company === "tech" ? sectors.tech : sectors.studio;
  const isTech = company === "tech";
  const sectionRef = useRef<HTMLElement>(null);
  const [activeIndex, setActiveIndex] = useState<number>(0);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Use scroll position to determine which card to show
  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (latest) => {
      // Switch cards when section is in the middle of the viewport
      if (latest > 0.4 && latest < 0.8) {
        setActiveIndex(1);
      } else {
        setActiveIndex(0);
      }
    });

    return () => unsubscribe();
  }, [scrollYProgress]);

  return (
    <section id="brands" className="relative py-22 lg:py-48 overflow-hidden">
      {/* Full section glass background */}
      <div className="absolute inset-0 -z-10">
        <div
          className={`w-full h-full ${
            isTech
              ? "bg-black/30 backdrop-blur-xl"
              : "bg-white/30 backdrop-blur-xl border-y border-gray-200"
          }`}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
        {/* Grid container for title and content */}
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-16">
          {/* Left Column - Description (4/12) */}
          <motion.div
            className="lg:col-span-4 relative"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl lg:text-5xl font-semibold leading-[1.2] bg-clip-text text-transparent bg-gradient-to-r from-white via-yellow-200 to-yellow-400">
                Partner with
                <br />
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 via-yellow-300 to-white">
                  Industry Leaders
                </span>
              </h2>
              <div className="absolute -inset-x-4 -inset-y-2 bg-gradient-to-r from-yellow-400/10 via-yellow-300/5 to-transparent blur-2xl -z-10" />
              <p className="mt-6 text-lg lg:text-xl text-gray-400">
                {isTech
                  ? "Join forward-thinking enterprises and innovative startups who have achieved "
                  : "Join visionary companies who have transformed their digital presence with "}
                <span className="text-yellow-400">
                  {isTech ? "80% operational efficiency gains" : "200% engagement growth"}
                </span>
              </p>
            </motion.div>
          </motion.div>

          {/* Right Column - Cards (8/12) */}
          <div className="lg:col-span-8 space-y-4">
            {currentSectors.map((sector, index) => (
              <motion.div
                key={sector.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                animate={{
                  background: activeIndex === index
                    ? isTech
                      ? "linear-gradient(135deg, rgba(234, 179, 8, 0.15), rgba(59, 130, 246, 0.15))"
                      : "linear-gradient(135deg, rgba(99, 102, 241, 0.15), rgba(79, 70, 229, 0.15))"
                    : isTech
                      ? "linear-gradient(135deg, rgba(59, 130, 246, 0.05), rgba(29, 78, 216, 0.02))"
                      : "linear-gradient(135deg, rgba(99, 102, 241, 0.05), rgba(79, 70, 229, 0.02))"
                }}
                whileHover={{
                  background: isTech
                    ? "linear-gradient(135deg, rgba(0,0,0,0.4), rgba(59,130,246,0.2))"
                    : "linear-gradient(135deg, rgba(255,255,255,0.4), rgba(99,102,241,0.2))",
                }}
                className={`group cursor-pointer p-6 rounded-2xl backdrop-blur-lg transition-all duration-300 ${
                  isTech
                    ? "hover:bg-blue-950/20"
                    : "hover:bg-indigo-50/50"
                }`}
                onClick={() =>
                  setActiveIndex(activeIndex === index ? -1 : index)
                }
              >
                <div className="flex items-center gap-4">
                  <div
                    className={`p-3 rounded-xl transition-colors duration-300 ${
                      isTech
                        ? "bg-yellow-500/10 group-hover:bg-yellow-500/20"
                        : "bg-indigo-500/10 group-hover:bg-indigo-500/20"
                    }`}
                  >
                    <sector.icon
                      className={cn(
                        "w-8 h-8 transition-transform duration-300 group-hover:scale-110",
                        isTech
                          ? "text-yellow-400 group-hover:text-yellow-300"
                          : "text-indigo-500 group-hover:text-indigo-400"
                      )}
                    />
                  </div>
                  <h3
                    className={`text-2xl font-normal transition-colors duration-300 ${
                      isTech
                        ? "text-white group-hover:text-yellow-50"
                        : "text-gray-900 group-hover:text-indigo-900"
                    }`}
                  >
                    {sector.name}
                  </h3>
                </div>

                <p
                  className={`mt-4 text-sm transition-colors duration-300 ${
                    isTech
                      ? "text-gray-400 group-hover:text-gray-300"
                      : "text-gray-600 group-hover:text-gray-700"
                  }`}
                >
                  {activeIndex === index
                    ? sector.fullDescription
                    : sector.description}
                </p>

                <AnimatePresence>
                  {activeIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="mt-6"
                    >
                      <div className="grid md:grid-cols-2 gap-4">
                        {sector.benefits.map((benefit, idx) => (
                          <div
                            key={idx}
                            className={`flex items-center gap-2 ${
                              isTech ? "text-gray-400" : "text-gray-600"
                            }`}
                          >
                            <div
                              className={`w-1.5 h-1.5 rounded-full ${
                                isTech ? "bg-yellow-400" : "bg-indigo-500"
                              }`}
                            />
                            <span>{benefit}</span>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
