"use client";

import { useCompany } from "@/lib/company-context";
import { motion, useScroll, useTransform } from "framer-motion";
import { ExternalLink } from "lucide-react";
import Image from "next/image";
import { memo, useRef } from "react";

const projects = [
  {
    title: "AI-Powered Healthcare Platform",
    description:
      "A revolutionary healthcare platform that leverages artificial intelligence to provide personalized patient care and streamline medical workflows.",
    image:
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80",
    tags: ["Healthcare", "AI", "UX Design"],
    link: "#",
  },
  {
    title: "Sustainable Energy Dashboard",
    description:
      "An intuitive dashboard for monitoring and optimizing renewable energy consumption in smart buildings.",
    image:
      "https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?auto=format&fit=crop&q=80",
    tags: ["Energy", "Dashboard", "Analytics"],
    link: "#",
  },
  {
    title: "Next-Gen Education Platform",
    description:
      "An innovative learning platform that combines immersive technologies with adaptive learning algorithms.",
    image:
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80",
    tags: ["Education", "Technology", "UI Design"],
    link: "#",
  },
];

function Works() {
  const { company } = useCompany();
  const { scrollYProgress } = useScroll();

  if (company !== "studio") return null;

  return (
    <section className="py-32 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl font-bold text-gray-900 mb-16 text-center"
        >
          Selected Works
        </motion.h2>

        <div className="relative">
          {projects.map((project, index) => {
            const targetRef = useRef(null);
            const { scrollYProgress: elementProgress } = useScroll({
              target: targetRef,
              offset: ["start end", "center center"],
            });

            // Modified scale transform to maintain scale after reaching center
            const scale = useTransform(
              elementProgress,
              [0, 0.5],
              [0.8, 1],
              { clamp: true } // This ensures the value stays clamped between 0.8 and 1
            );

            // Modified opacity transform to maintain opacity after reaching center
            const opacity = useTransform(
              elementProgress,
              [0, 0.5],
              [0.3, 1],
              { clamp: true } // This ensures the value stays clamped between 0.3 and 1
            );

            return (
              <motion.div key={project.title} ref={targetRef} className="mb-24">
                <div
                  className="sticky"
                  style={{
                    top: `${index * 64}px`,
                    zIndex: projects.length - index,
                  }}
                >
                  <motion.div
                    className="flex flex-col gap-8 py-8"
                    style={{ scale, opacity }}
                  >
                    <div
                      className="w-full relative overflow-hidden rounded-2xl"
                      style={{
                        height: "min(60vh, 500px)",
                      }}
                    >
                      <motion.div
                        className="absolute inset-0 h-[150%] w-full"
                        initial={{ y: 0 }}
                        whileHover={{ y: "-33.33%" }}
                        transition={{ duration: 3, ease: "easeOut" }}
                      >
                        <Image
                          src={project.image}
                          alt={project.title}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
                        />
                      </motion.div>
                    </div>

                    <div className="max-w-3xl mx-auto w-full">
                      <div className="space-y-6">
                        <h3 className="text-3xl font-semibold text-gray-900">
                          {project.title}
                        </h3>

                        <p className="text-gray-600 text-lg">
                          {project.description}
                        </p>

                        <div className="flex flex-wrap gap-2">
                          {project.tags.map((tag) => (
                            <span
                              key={tag}
                              className="px-4 py-2 rounded-full text-sm bg-indigo-50 text-indigo-600 font-medium"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>

                        <motion.a
                          href={project.link}
                          whileHover={{ x: 4 }}
                          className="inline-flex items-center gap-2 text-indigo-600 hover:text-indigo-700 transition-colors font-medium"
                        >
                          View Project Details
                          <ExternalLink className="w-4 h-4" />
                        </motion.a>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default memo(Works);
