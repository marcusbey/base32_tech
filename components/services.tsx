"use client";

import { useCompany } from "@/lib/company-context";
import { motion } from "framer-motion";
import {
  Bot,
  Brain,
  Clock,
  Layout,
  Palette,
  Users,
  Wand2,
  Workflow,
  Zap,
} from "lucide-react";

const services = {
  tech: [
    {
      icon: Bot,
      title: "AI Agents",
      description:
        "Custom intelligent agents that learn and adapt to your needs",
      features: [
        "Natural language processing",
        "Machine learning integration",
        "Automated decision making",
        "Continuous learning",
      ],
      gradient: "from-blue-500/10 to-transparent",
      hoverGradient: "from-blue-500/5 to-transparent",
    },
    {
      icon: Workflow,
      title: "Workflow Automation",
      description: "Streamline complex processes with smart automation",
      features: [
        "Process optimization",
        "Custom workflows",
        "Integration with existing tools",
        "Real-time monitoring",
      ],
      gradient: "from-purple-500/10 to-transparent",
      hoverGradient: "from-purple-500/5 to-transparent",
    },
    {
      icon: Brain,
      title: "Machine Learning",
      description: "Advanced algorithms that improve over time",
      features: [
        "Predictive analytics",
        "Pattern recognition",
        "Data processing",
        "Model optimization",
      ],
      gradient: "from-green-500/10 to-transparent",
      hoverGradient: "from-green-500/5 to-transparent",
    },
    {
      icon: Clock,
      title: "Time Optimization",
      description: "Save hours daily with automated task management",
      features: [
        "Task prioritization",
        "Resource allocation",
        "Performance tracking",
        "Efficiency metrics",
      ],
      gradient: "from-orange-500/10 to-transparent",
      hoverGradient: "from-orange-500/5 to-transparent",
    },
  ],
  studio: [
    {
      icon: Palette,
      title: "Brand Identity",
      description: "Distinctive visual languages that tell your story",
      features: [
        "Logo design",
        "Color systems",
        "Typography",
        "Brand guidelines",
      ],
      gradient: "from-pink-500/10 to-transparent",
      hoverGradient: "from-pink-500/5 to-transparent",
    },
    {
      icon: Layout,
      title: "UI/UX Design",
      description: "Intuitive interfaces that delight users",
      features: ["User research", "Wireframing", "Prototyping", "User testing"],
      gradient: "from-indigo-500/10 to-transparent",
      hoverGradient: "from-indigo-500/5 to-transparent",
    },
    {
      icon: Wand2,
      title: "Design Systems",
      description: "Scalable and consistent design frameworks",
      features: [
        "Component libraries",
        "Style guides",
        "Documentation",
        "Design tokens",
      ],
      gradient: "from-cyan-500/10 to-transparent",
      hoverGradient: "from-cyan-500/5 to-transparent",
    },
    {
      icon: Users,
      title: "User Research",
      description: "Data-driven design decisions",
      features: [
        "User interviews",
        "Usability testing",
        "Analytics",
        "Feedback loops",
      ],
      gradient: "from-violet-500/10 to-transparent",
      hoverGradient: "from-violet-500/5 to-transparent",
    },
  ],
};

export default function Services() {
  const { company } = useCompany();
  const currentServices = company === "tech" ? services.tech : services.studio;
  const isTech = company === "tech";

  return (
    <section className="relative py-32 px-4 border-t border-blue-500/20">
      <div className="max-w-7xl mx-auto">
        {/* First Row: Title */}
        <div className="grid lg:grid-cols-2 gap-16 mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2
              className={`text-5xl font-semibold leading-[1.2] ${
                isTech ? "text-white" : "text-gray-900"
              }`}
            >
              Pioneering Tomorrow&apos;s Solutions Today
            </h2>
          </motion.div>
        </div>

        {/* Second Row: Description + Button and Service Cards */}
        <div className="grid lg:grid-cols-12 md:grid-cols-2 gap-8 lg:gap-16">
          {/* Left Column - Description and Button (2/6) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-4 md:col-span-1"
          >
            <div className="flex flex-col justify-between h-full">
              <div className="space-y-8">
                <p
                  className={`text-xl leading-relaxed font-normal ${
                    isTech ? "text-gray-300" : "text-gray-600"
                  } leading-[1.8]`}
                >
                  Transform your business operations with our enterprise-grade
                  automation solutions. We specialize in developing intelligent
                  systems that reduce operational costs, eliminate human error,
                  and accelerate growth.
                </p>

                <div
                  className={`text-lg leading-relaxed ${
                    isTech ? "text-gray-400" : "text-gray-500"
                  }`}
                >
                  <p className="mb-6">
                    Our solutions have helped companies achieve:
                  </p>
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

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="group relative px-8 py-3 rounded-full font-medium 
                    bg-yellow-500 text-black overflow-hidden
                    transition-all duration-300 mt-20"
                >
                  <div className="relative z-10 flex items-center gap-2">
                    See Our Services
                    <motion.div
                      initial={{ x: -4, opacity: 0.5 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{
                        repeat: Infinity,
                        duration: 1,
                        ease: "easeInOut",
                      }}
                    >
                      →
                    </motion.div>
                  </div>

                  <motion.div
                    className="absolute inset-0 -z-10 bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600"
                    animate={{
                      transform: ["translateX(-100%)", "translateX(100%)"],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  />
                </motion.button>
              </div>
            </div>
          </motion.div>

          {/* Empty Column (1/6) */}
          <div className="hidden lg:block lg:col-span-2" />

          {/* Right Column - Services Grid (3/6) */}
          <div className="lg:col-span-6 md:col-span-1 grid md:grid-cols-2 gap-6">
            {currentServices.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{
                  backdropFilter: "blur(12px)",
                }}
                className={`p-6 rounded-2xl backdrop-blur-lg transition-all duration-700 
                  bg-gradient-to-br ${service.gradient}
                  hover:bg-gradient-to-br hover:${service.hoverGradient}
                  ${
                    isTech
                      ? "border border-blue-500/10"
                      : "border border-gray-200/30"
                  }`}
              >
                <service.icon
                  className={`w-8 h-8 mb-4 ${
                    isTech ? "text-yellow-400" : "text-indigo-500"
                  }`}
                />
                <h3
                  className={`text-xl font-semibold mb-2 ${
                    isTech ? "text-white" : "text-gray-900"
                  }`}
                >
                  {service.title}
                </h3>
                <p
                  className={`mb-4 font-normal ${
                    isTech ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  {service.description}
                </p>
                <ul
                  className={`space-y-2 font-normal ${
                    isTech ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  {service.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <div
                        className={`w-1 h-1 rounded-full ${
                          isTech ? "bg-yellow-400" : "bg-indigo-500"
                        }`}
                      />
                      {feature}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
