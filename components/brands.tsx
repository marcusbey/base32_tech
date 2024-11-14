"use client";

import { useCompany } from "@/lib/company-context";
import { AnimatePresence, motion } from "framer-motion";
import { Building2, Rocket } from "lucide-react";
import { useState } from "react";

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
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const currentSectors = company === "tech" ? sectors.tech : sectors.studio;
  const isTech = company === "tech";

  return (
    <section className="relative py-48 px-4">
      {/* Full section glass background */}
      <div className="absolute inset-0 -z-10">
        <div
          className={`w-full h-full ${
            isTech
              ? "bg-black/30 backdrop-blur-xl border-y border-blue-500/20"
              : "bg-white/30 backdrop-blur-xl border-y border-gray-200"
          }`}
        />
      </div>

      <div className="max-w-7xl mx-auto">
        {/* Grid container for title and content */}
        <div className="grid lg:grid-cols-12 md:grid-cols-2 gap-8 lg:gap-16">
          {/* Left Column - Description (4/12) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-4 md:col-span-1"
          >
            <div className="flex flex-col justify-between h-full">
              <div className="space-y-6 md:text-center lg:text-left">
                <h2
                  className={`text-5xl font-semibold leading-[1.2] ${
                    isTech ? "text-white" : "text-gray-900"
                  }`}
                >
                  Trusted By Industry Leaders
                </h2>
                <p
                  className={`text-xl leading-relaxed ${
                    isTech ? "text-gray-300" : "text-gray-600"
                  }`}
                >
                  {isTech
                    ? "We partner with forward-thinking enterprises and innovative startups to transform their operations through intelligent automation and AI solutions."
                    : "We collaborate with visionary companies to create exceptional digital experiences and memorable brand identities that stand out."}
                </p>
              </div>
            </div>
          </motion.div>

          {/* Empty Column (2/12) */}
          <div className="hidden lg:block lg:col-span-2" />

          {/* Right Column - Cards (6/12) */}
          <div className="lg:col-span-6 md:col-span-1 space-y-4">
            {currentSectors.map((sector, index) => (
              <motion.div
                key={sector.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{
                  background: isTech
                    ? "linear-gradient(135deg, rgba(0,0,0,0.4), rgba(59,130,246,0.2))"
                    : "linear-gradient(135deg, rgba(255,255,255,0.4), rgba(99,102,241,0.2))",
                }}
                className={`p-6 rounded-2xl backdrop-blur-lg transition-all duration-300 ${
                  isTech
                    ? "bg-black/30 border border-blue-500/20"
                    : "bg-white/30 border border-gray-200"
                }`}
                onClick={() =>
                  setActiveIndex(activeIndex === index ? -1 : index)
                }
              >
                <div className="flex items-center gap-4">
                  <div
                    className={`p-3 rounded-xl ${
                      isTech ? "bg-yellow-500/10" : "bg-indigo-500/10"
                    }`}
                  >
                    <sector.icon
                      className={
                        isTech
                          ? "text-yellow-400 w-8 h-8"
                          : "text-indigo-500 w-8 h-8"
                      }
                    />
                  </div>
                  <h3
                    className={`text-2xl font-normal ${
                      isTech ? "text-white" : "text-gray-900"
                    }`}
                  >
                    {sector.name}
                  </h3>
                </div>

                <p
                  className={`mt-4 text-sm ${
                    isTech ? "text-gray-400" : "text-gray-600"
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
