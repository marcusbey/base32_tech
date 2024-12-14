"use client";

import { useCompany } from "@/lib/company-context";
import { motion } from "framer-motion";

export default function About() {
  const { company } = useCompany();
  const isTech = company === "tech";

  return (
    <section className="relative py-24 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Section header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h2 className={`text-4xl font-bold mb-4 ${isTech ? "text-blue-500" : "text-indigo-500"}`}>
              About Base32
            </h2>
            <p className="text-gray-400 text-lg">
              Transforming ideas into digital excellence
            </p>
          </motion.div>

          {/* Content grid */}
          <div className="grid md:grid-cols-2 gap-12">
            {/* Mission */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="space-y-4"
            >
              <h3 className={`text-2xl font-semibold mb-4 ${isTech ? "text-blue-400" : "text-indigo-400"}`}>
                Our Mission
              </h3>
              <p className="text-gray-300">
                At Base32, we're dedicated to pushing the boundaries of digital innovation. Our mission is to empower businesses with cutting-edge technology solutions that drive growth and success in the digital age.
              </p>
            </motion.div>

            {/* Vision */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="space-y-4"
            >
              <h3 className={`text-2xl font-semibold mb-4 ${isTech ? "text-blue-400" : "text-indigo-400"}`}>
                Our Vision
              </h3>
              <p className="text-gray-300">
                We envision a future where every business, regardless of size, has access to enterprise-grade technology solutions. Through innovation and expertise, we're making this vision a reality.
              </p>
            </motion.div>
          </div>

          {/* Team section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="mt-16 text-center"
          >
            <h3 className={`text-2xl font-semibold mb-8 ${isTech ? "text-blue-400" : "text-indigo-400"}`}>
              Our Team
            </h3>
            <p className="text-gray-300 mb-8">
              We're a diverse team of developers, designers, and digital strategists passionate about creating exceptional digital experiences. With decades of combined experience, we bring expertise and innovation to every project.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
