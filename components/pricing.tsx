"use client";

import { useCompany } from "@/lib/company-context";
import { motion } from "framer-motion";
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
      title: "Custom AI Agents",
      description: "Intelligent automation tailored to your needs",
    },
    {
      icon: Workflow,
      title: "Process Automation",
      description: "Streamline your entire workflow",
    },
    {
      icon: Brain,
      title: "Machine Learning",
      description: "Self-improving algorithms",
    },
    {
      icon: Shield,
      title: "Enterprise Security",
      description: "Bank-grade data protection",
    },
    {
      icon: Clock,
      title: "24/7 Monitoring",
      description: "Round-the-clock system oversight",
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

  return (
    <section className="relative min-h-screen py-32 overflow-hidden flex items-center">
      <div className="relative z-10 container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <h2
            className={`text-5xl font-semibold mb-4 ${
              isTech ? "text-white" : "text-gray-900"
            }`}
          >
            Simple, Transparent Pricing
          </h2>
          <p
            className={`text-xl ${isTech ? "text-gray-400" : "text-gray-600"}`}
          >
            Choose the perfect plan for your business needs
          </p>
        </motion.div>

        <div className="grid md:grid-cols-12 gap-16 max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            whileHover={{
              background: isTech
                ? "linear-gradient(135deg, rgba(234, 179, 8, 0.1), rgba(59, 130, 246, 0.1))"
                : "linear-gradient(135deg, rgba(219, 39, 119, 0.1), rgba(59, 130, 246, 0.1))",
              backdropFilter: "blur(12px)",
              transition: { duration: 0.3 },
            }}
            className="mega-glass-card rounded-2xl overflow-hidden relative group md:col-span-7"
          >
            <div className="p-8">
              <div className="flex items-center justify-between mb-6">
                <h3
                  className={`text-2xl font-bold ${
                    isTech ? "text-white" : "text-gray-900"
                  }`}
                >
                  {isTech ? "Enterprise AI Solution" : "Full Design System"}
                </h3>
                <span
                  className={`text-sm font-medium px-3 py-1 rounded-full ${
                    isTech
                      ? "bg-yellow-500/10 text-yellow-400"
                      : "bg-indigo-500/10 text-indigo-500"
                  }`}
                >
                  {isTech ? "3 seats left" : "2 seats left"}
                </span>
              </div>

              <div className="mb-8">
                <div className="flex items-baseline gap-1">
                  <span
                    className={`text-4xl font-bold ${
                      isTech ? "text-yellow-400" : "text-indigo-500"
                    }`}
                  >
                    ${isTech ? "3,989" : "4,899"}
                  </span>
                  <span className={isTech ? "text-gray-400" : "text-gray-600"}>
                    /month
                  </span>
                </div>
                <p
                  className={`mt-2 text-sm ${
                    isTech ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  {isTech
                    ? "Everything you need to automate your business"
                    : "Complete design system for your brand"}
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
                    <div>
                      <p
                        className={`font-medium ${
                          isTech ? "text-white" : "text-gray-900"
                        }`}
                      >
                        {feature.title}
                      </p>
                      <p
                        className={`text-sm ${
                          isTech ? "text-gray-400" : "text-gray-600"
                        }`}
                      >
                        {feature.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="flex justify-center">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`w-2/3 py-3 px-6 rounded-xl font-semibold transition-colors ${
                    isTech
                      ? "bg-yellow-500 hover:bg-yellow-600 text-black"
                      : "bg-indigo-500 hover:bg-indigo-600 text-white"
                  }`}
                >
                  Get Started
                </motion.button>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass-card rounded-2xl p-8 flex flex-col justify-between md:col-span-4"
          >
            <div>
              <h3
                className={`text-2xl font-bold mb-8 ${
                  isTech ? "text-white" : "text-gray-900"
                }`}
              >
                Success Metrics
              </h3>

              <div className="space-y-8">
                <div className="space-y-4">
                  <div
                    className={`flex items-center gap-3 ${
                      isTech ? "text-yellow-400" : "text-indigo-500"
                    }`}
                  >
                    <Rocket className="w-5 h-5" />
                    <span className="font-semibold">Implementation Time</span>
                  </div>
                  <div
                    className={`ml-8 ${
                      isTech ? "text-gray-400" : "text-gray-600"
                    }`}
                  >
                    <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className={`h-full w-[85%] ${
                          isTech ? "bg-yellow-400" : "bg-indigo-500"
                        }`}
                      />
                    </div>
                    <p className="mt-2">
                      85% faster than traditional solutions
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div
                    className={`flex items-center gap-3 ${
                      isTech ? "text-yellow-400" : "text-indigo-500"
                    }`}
                  >
                    <CheckCircle2 className="w-5 h-5" />
                    <span className="font-semibold">Success Rate</span>
                  </div>
                  <div
                    className={`ml-8 ${
                      isTech ? "text-gray-400" : "text-gray-600"
                    }`}
                  >
                    <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className={`h-full w-[98%] ${
                          isTech ? "bg-yellow-400" : "bg-indigo-500"
                        }`}
                      />
                    </div>
                    <p className="mt-2">98% client satisfaction rate</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div
                    className={`flex items-center gap-3 ${
                      isTech ? "text-yellow-400" : "text-indigo-500"
                    }`}
                  >
                    <Clock className="w-5 h-5" />
                    <span className="font-semibold">Time Saved</span>
                  </div>
                  <div
                    className={`ml-8 ${
                      isTech ? "text-gray-400" : "text-gray-600"
                    }`}
                  >
                    <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className={`h-full w-[75%] ${
                          isTech ? "bg-yellow-400" : "bg-indigo-500"
                        }`}
                      />
                    </div>
                    <p className="mt-2">Save up to 40 hours per week</p>
                  </div>
                </div>
              </div>
            </div>

            <div
              className={`mt-8 p-4 rounded-xl ${
                isTech ? "bg-blue-950/30" : "bg-gray-50"
              }`}
            >
              <p
                className={`text-sm ${
                  isTech ? "text-gray-400" : "text-gray-600"
                }`}
              >
                &ldquo;We guarantee measurable results within the first 30 days
                or your money back. No questions asked.&rdquo;
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default memo(Pricing);
