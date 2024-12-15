"use client";

import { useCompany } from "@/lib/company-context";
import { motion } from "framer-motion";
import Image from "next/image";
import { Twitter, Linkedin } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import { LinkedinIcon, TwitterIcon } from "@/components/icons";

export default function About() {
  const { company } = useCompany();
  const isTech = company === "tech";

  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <section id="about-section" className="relative overflow-hidden py-32">
      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-16">
          {/* Left column - Text content */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="lg:col-span-5 space-y-8"
          >
            <div className="pt-16 relative">
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
                className="text-4xl lg:text-5xl font-semibold leading-[1.2] bg-clip-text text-transparent bg-gradient-to-r from-white via-blue-200 to-blue-400"
              >
                About
                <br />
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-blue-300 to-white">
                  Base32
                </span>
              </motion.h2>
              <div className="absolute -inset-x-4 -inset-y-2 bg-gradient-to-r from-blue-400/10 via-blue-300/5 to-transparent blur-2xl -z-10" />
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
                className="mt-6 text-lg lg:text-xl text-gray-400"
              >
                Transforming ideas into digital excellence with
                <span className="text-blue-400"> innovative solutions</span>
              </motion.p>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
              className="space-y-6 pb-16"
            >
              <div>
                <h3 className={`text-2xl font-semibold mb-3 ${isTech ? "text-blue-400" : "text-indigo-400"}`}>
                  Our Mission
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  At Base32, we're dedicated to pushing the boundaries of digital innovation. Our mission is to empower businesses with cutting-edge technology solutions that drive growth and success in the digital age.
                </p>
              </div>

              <div>
                <h3 className={`text-2xl font-semibold mb-3 ${isTech ? "text-blue-400" : "text-indigo-400"}`}>
                  Our Vision
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  We envision a future where every business, regardless of size, has access to enterprise-grade technology solutions. Through innovation and expertise, we're making this vision a reality.
                </p>
              </div>

              <div>
                <h3 className={`text-2xl font-semibold mb-3 ${isTech ? "text-blue-400" : "text-indigo-400"}`}>
                  Our Team
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  We're a diverse team of developers, designers, and digital strategists passionate about creating exceptional digital experiences. With decades of combined experience, we bring expertise and innovation to every project.
                </p>
              </div>
            </motion.div>
          </motion.div>

          {/* Right column - Image */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
            className="relative lg:col-span-7 h-[700px] lg:h-[800px] -mt-16 flex justify-center"
          >
            <div className="relative w-[400px] h-[700px] lg:h-[800px] rounded-2xl overflow-hidden">
              <div className="absolute inset-0 bg-black/50 z-10" />
              <Image
                src="/images/about-profile2.jpg"
                alt="Base32 Team"
                fill
                className="object-cover object-center rounded-xl"
                sizes="(max-width: 768px) 100vw, 400px"
                priority
              />
              {/* Offset grid pattern div */}
              <div 
                className="absolute -bottom-32 -right-20 w-[300px] h-[200px] z-20"
              >
                <div className="absolute inset-0" style={{
                  backgroundImage: 
                    `linear-gradient(to right, ${isTech ? 'rgba(59, 130, 246, 0.3)' : 'rgba(99, 102, 241, 0.3)'} 1px, transparent 1px),
                     linear-gradient(to bottom, ${isTech ? 'rgba(59, 130, 246, 0.3)' : 'rgba(99, 102, 241, 0.3)'} 1px, transparent 1px)`,
                  backgroundSize: '40px 40px',
                  opacity: 0.7,
                }} />
              </div>
            </div>
            {/* Profile Info and Social Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.7, ease: "easeOut" }}
              className="absolute bottom-8 left-8 z-20"
            >
              <h3 className="text-2xl font-semibold text-white mb-1">
                Romain BOBOE
              </h3>
              <p className="text-gray-300 mb-4">Founder, Tech Lead</p>
              <div className="flex gap-4">
                <Link
                  href="https://www.linkedin.com/in/romainboboe/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-blue-400 transition-colors"
                >
                  <LinkedinIcon className="w-6 h-6" />
                </Link>
                <Link
                  href="https://x.com/romainbey"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-blue-400 transition-colors"
                >
                  <TwitterIcon className="w-6 h-6" />
                </Link>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
