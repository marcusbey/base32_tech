"use client";

import { useCompany } from "@/lib/company-context";
import { motion } from "framer-motion";
import { Calendar, Send, Sparkles } from "lucide-react";
import { useState, useEffect } from "react";
import { toast } from "sonner";

export default function CreativeContact() {
  const { company } = useCompany();
  const isTech = company === "tech";
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isValid, setIsValid] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [errors, setErrors] = useState({
    vision: "",
    email: "",
  });

  const [formData, setFormData] = useState({
    vision: "",
    email: "",
  });

  const currentTestimonial = {
    quote: isTech
      ? "The automation solutions provided by BASE32.TECH have transformed our workflow completely. We're seeing incredible results."
      : "Working with BASE32.STUDIO was a game-changer for our brand. Their attention to detail and creativity is unmatched.",
    author: isTech ? "Sarah Chen" : "David Park",
    role: isTech ? "CTO, InnovateTech" : "Founder, Nexus Innovations",
  };

  // Handle client-side mounting
  useEffect(() => {
    setMounted(true);
  }, []);

  const validateForm = () => {
    const newErrors = {
      vision: "",
      email: "",
    };
    let isValid = true;

    if (!formData.vision || formData.vision.length < 10) {
      newErrors.vision = "Vision must be at least 10 characters";
      isValid = false;
    }

    if (!formData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  // Client-side validation
  useEffect(() => {
    if (mounted) {
      const isFormValid = formData.vision.length >= 10 && 
                         /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email);
      setIsValid(isFormValid);
    }
  }, [formData, mounted]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    try {
      const response = await fetch('/api/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          company: isTech ? 'tech' : 'studio'
        }),
      });

      if (!response.ok) throw new Error('Failed to send message');

      toast.success("Thank you for sharing your vision! We'll be in touch soon.");
      setFormData({ vision: "", email: "" });
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="min-h-[80vh] flex items-center justify-center px-4 py-32">
      <div
        className={`w-full max-w-6xl rounded-2xl p-8 md:p-16 relative overflow-hidden ${
          isTech
            ? "bg-gradient-to-br from-blue-950/30 via-indigo-900/20 to-violet-900/30 backdrop-blur-2xl border border-blue-500/10"
            : "bg-gradient-to-br from-indigo-100/90 via-white/80 to-purple-100/90 backdrop-blur-xl shadow-[inset_0_-100px_200px_-50px_rgba(99,102,241,0.2)]"
        }`}
      >
        {/* Studio-specific decorative elements */}
        {!isTech && (
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-br from-indigo-300/30 via-transparent to-transparent rotate-12 transform-gpu" />
            <div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-to-tl from-purple-300/30 via-transparent to-transparent -rotate-12 transform-gpu" />
          </div>
        )}

        {/* Animated gradient background for tech theme */}
        {isTech && (
          <motion.div
            className="absolute inset-0 -z-10"
            animate={{
              background: [
                "radial-gradient(circle at 0% 0%, rgba(30, 58, 138, 0.1) 0%, transparent 50%)",
                "radial-gradient(circle at 100% 100%, rgba(30, 58, 138, 0.1) 0%, transparent 50%)",
                "radial-gradient(circle at 0% 100%, rgba(30, 58, 138, 0.1) 0%, transparent 50%)",
                "radial-gradient(circle at 100% 0%, rgba(30, 58, 138, 0.1) 0%, transparent 50%)",
                "radial-gradient(circle at 0% 0%, rgba(30, 58, 138, 0.1) 0%, transparent 50%)",
              ],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        )}

        <form onSubmit={handleSubmit} className="w-full max-w-2xl mx-auto">
          <div className="space-y-12 mb-16">
            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="flex items-center gap-3 mb-8"
              >
                <motion.div
                  animate={{
                    rotate: [0, 360],
                    scale: [1, 1.2, 1],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                >
                  <Sparkles
                    className={`w-6 h-6 ${
                      isTech ? "text-yellow-400" : "text-indigo-500"
                    }`}
                  />
                </motion.div>
                <h2
                  className={`text-3xl font-semibold ${
                    isTech ? "text-white" : "text-gray-900"
                  }`}
                >
                  What&apos;s your vision?
                </h2>
              </motion.div>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className={`text-lg mb-8 ${
                  isTech ? "text-gray-400" : "text-gray-600"
                }`}
              >
                Share your ideas and let&apos;s create something extraordinary
                together.
              </motion.p>

              <div
                className={`relative rounded-xl overflow-hidden ${
                  isTech ? "bg-blue-950/20" : "bg-white/80"
                }`}
              >
                <textarea
                  id="vision"
                  rows={4}
                  value={formData.vision}
                  onChange={(e) => {
                    setFormData((prev) => ({ ...prev, vision: e.target.value }));
                    if (errors.vision) setErrors(prev => ({ ...prev, vision: "" }));
                  }}
                  className={`w-full px-4 py-3 bg-transparent relative z-10 ${
                    isTech
                      ? "text-white placeholder-gray-400"
                      : "text-gray-900 placeholder-gray-500"
                  } focus:outline-none focus:ring-2 ${
                    isTech
                      ? "focus:ring-yellow-500/50"
                      : "focus:ring-indigo-500/50"
                  }`}
                  placeholder="Tell us about your project..."
                />
                {errors.vision && (
                  <p className={`absolute -bottom-6 left-0 text-sm ${isTech ? "text-red-400" : "text-red-500"}`}>
                    {errors.vision}
                  </p>
                )}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 items-start">
              <div className="flex-1">
                <div className="relative">
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => {
                      setFormData((prev) => ({ ...prev, email: e.target.value }));
                      if (errors.email) setErrors(prev => ({ ...prev, email: "" }));
                    }}
                    placeholder="Your email"
                    className={`w-full px-4 py-3 rounded-xl ${
                      isTech
                        ? "bg-blue-950/20 border border-blue-500/20 text-white placeholder-gray-400"
                        : "bg-white/80 text-gray-900 placeholder-gray-500"
                    } focus:outline-none focus:ring-2 ${
                      isTech
                        ? "focus:ring-yellow-500/50"
                        : "focus:ring-indigo-500/50"
                    }`}
                  />
                  {errors.email && (
                    <p className={`absolute -bottom-5 left-0 text-sm ${isTech ? "text-red-400" : "text-red-500"}`}>
                      {errors.email}
                    </p>
                  )}
                </div>
              </div>

              <motion.button
                type="submit"
                disabled={isSubmitting || !isValid}
                whileHover={{ scale: isValid ? 1.02 : 1 }}
                className={`w-full sm:w-[180px] py-3 rounded-xl font-semibold flex items-center justify-center gap-2 ${
                  isTech
                    ? "bg-blue-500 hover:bg-blue-600 text-white"
                    : "bg-indigo-500 text-white hover:bg-indigo-600"
                } transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                {isSubmitting ? (
                  <>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    >
                      <Calendar className="w-5 h-5" />
                    </motion.div>
                    <span>Sending...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    <span>Send Message</span>
                  </>
                )}
              </motion.button>
            </div>
          </div>

          {/* Divider */}
          <div
            className={`h-px w-full ${
              isTech ? "bg-blue-500/20" : "bg-indigo-200/50"
            } mb-16`}
          />

          {/* Testimonial and Call Booking Section */}
          <div className="flex flex-col md:flex-row gap-8">
            {/* Testimonial */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex-1 p-8"
            >
              <div
                className={`text-xl mb-4 ${
                  isTech ? "text-yellow-400" : "text-indigo-500"
                }`}
              >
                &quot;
              </div>
              <p
                className={`text-lg mb-6 ${
                  isTech ? "text-gray-300" : "text-gray-600"
                }`}
              >
                {currentTestimonial.quote}
              </p>
              <div>
                <p
                  className={`font-medium ${
                    isTech ? "text-white" : "text-gray-900"
                  }`}
                >
                  {currentTestimonial.author}
                </p>
                <p
                  className={`text-sm ${
                    isTech ? "text-gray-400" : "text-gray-500"
                  }`}
                >
                  {currentTestimonial.role}
                </p>
              </div>
            </motion.div>

            {/* Call Booking */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex flex-col items-center md:items-end justify-end w-full md:w-[180px]"
            >
              <p
                className={`text-sm font-medium mb-4 text-center md:text-right ${
                  isTech ? "text-gray-300" : "text-gray-700"
                }`}
              >
                Ready to discuss your project in detail?
              </p>
              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                className={`w-full max-w-[300px] md:max-w-none py-3 rounded-xl font-semibold flex items-center justify-center gap-2 ${
                  isTech
                    ? "bg-yellow-500 hover:bg-yellow-600 text-black shadow-lg shadow-yellow-500/20"
                    : "bg-indigo-500 hover:bg-indigo-600 text-white shadow-lg shadow-indigo-500/20"
                } transition-all duration-300`}
              >
                <Calendar className="w-5 h-5" />
                Book a Call
              </motion.button>
            </motion.div>
          </div>
        </form>
      </div>
    </section>
  );
}
