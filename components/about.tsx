"use client";

import { useCompany } from "@/lib/company-context";
import { motion } from "framer-motion";
import Image from "next/image";

export default function About() {
  const { company } = useCompany();
  const isTech = company === "tech";

  return (
    <section className="relative overflow-hidden pb-48">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-16">
          {/* Left column - Text content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-5 space-y-8"
          >
            <div className="pt-16 relative">
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
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
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="mt-6 text-lg lg:text-xl text-gray-400"
              >
                Transforming ideas into digital excellence with
                <span className="text-blue-400"> innovative solutions</span>
              </motion.p>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
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
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="relative lg:col-span-7 h-[700px] lg:h-[800px] -mt-16"
          >
            <Image
              src="/images/about-profile2.jpg"
              alt="Base32 Team"
              fill
              className="object-cover object-top rounded-xl"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
