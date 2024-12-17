"use client";

import { useCompany } from "@/lib/company-context";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, Send, Sparkles } from "lucide-react";
import { useState, useEffect, memo, useCallback, useMemo } from "react";
import { toast } from "sonner";
import BookingModal from "./booking-modal";
import { useThrottledCallback } from "@/lib/performance";

interface FormData {
  vision: string;
  email: string;
  name: string;
}

interface FormErrors {
  vision: string;
  email: string;
  name: string;
}

const SparkleIcon = memo(function SparkleIcon({ isTech }: { isTech: boolean }) {
  return (
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
  );
});

const FormInput = memo(function FormInput({
  type,
  value,
  onChange,
  placeholder,
  error,
  isTech,
}: {
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  error?: string;
  isTech: boolean;
}) {
  return (
    <div className="relative">
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base rounded-xl ${
          isTech
            ? "bg-white/5 border border-blue-400/40 text-white placeholder-gray-300"
            : "bg-white/95 text-gray-900 placeholder-gray-500"
        } focus:outline-none focus:ring-2 ${
          isTech
            ? "focus:ring-yellow-500/50"
            : "focus:ring-indigo-500/50"
        }`}
      />
      {error && (
        <p className={`absolute -bottom-5 left-0 text-sm ${isTech ? "text-red-400" : "text-red-500"}`}>
          {error}
        </p>
      )}
    </div>
  );
});

const Testimonial = memo(function Testimonial({
  quote,
  author,
  role,
  isTech,
}: {
  quote: string;
  author: string;
  role: string;
  isTech: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      className="flex-1 p-4 sm:p-8"
    >
      <div
        className={`text-lg sm:text-xl mb-3 sm:mb-4 ${
          isTech ? "text-yellow-400" : "text-indigo-500"
        }`}
      >
        &quot;
      </div>
      <p
        className={`text-base sm:text-lg mb-4 sm:mb-6 ${
          isTech ? "text-gray-300" : "text-gray-600"
        }`}
      >
        {quote}
      </p>
      <div>
        <p
          className={`font-medium ${
            isTech ? "text-white" : "text-gray-900"
          }`}
        >
          {author}
        </p>
        <p
          className={`text-sm ${
            isTech ? "text-gray-400" : "text-gray-500"
          }`}
        >
          {role}
        </p>
      </div>
    </motion.div>
  );
});

const SubmitButton = memo(function SubmitButton({
  isSubmitting,
  isTech,
}: {
  isSubmitting: boolean;
  isTech: boolean;
}) {
  return (
    <motion.button
      type="submit"
      disabled={isSubmitting}
      whileHover={{ scale: 1.02 }}
      className={`w-full sm:w-auto py-2 sm:py-3 px-4 sm:px-6 rounded-xl font-semibold flex items-center justify-center gap-2 ${
        isTech
          ? "bg-blue-500 hover:bg-blue-600 text-white shadow-lg shadow-blue-500/20 disabled:opacity-50 disabled:cursor-not-allowed"
          : "bg-indigo-500 hover:bg-indigo-600 text-white shadow-lg shadow-indigo-500/20 disabled:opacity-50 disabled:cursor-not-allowed"
      } transition-all duration-300 text-sm sm:text-base`}
    >
      {isSubmitting ? (
        <>
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          >
            <Send className="w-5 h-5" />
          </motion.div>
          <span>Sending...</span>
        </>
      ) : (
        <>
          <Send className="w-5 h-5" />
          Send Message
        </>
      )}
    </motion.button>
  );
});

const initialFormData: FormData = {
  vision: "",
  email: "",
  name: "",
};

const initialErrors: FormErrors = {
  vision: "",
  email: "",
  name: "",
};

const CreativeContact = memo(function CreativeContact() {
  const { company } = useCompany();
  const isTech = company === "tech";
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isValid, setIsValid] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [errors, setErrors] = useState<FormErrors>(initialErrors);
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  const currentTestimonial = useMemo(() => ({
    quote: isTech
      ? "The automation solutions provided by BASE32 have transformed our workflow completely. We're seeing incredible results."
      : "Working with BASE32.STUDIO was a game-changer for our brand. Their attention to detail and creativity is unmatched.",
    author: isTech ? "Sarah Chen" : "David Park",
    role: isTech ? "CTO, InnovateTech" : "Founder, Nexus Innovations",
  }), [isTech]);

  useEffect(() => {
    setMounted(true);
  }, []);

  const validateForm = useCallback(() => {
    const newErrors = { ...initialErrors };
    let isValid = true;

    if (!formData.vision || formData.vision.length < 10) {
      newErrors.vision = "Vision must be at least 10 characters";
      isValid = false;
    }

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
      isValid = false;
    }

    if (!formData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  }, [formData]);

  useEffect(() => {
    if (mounted) {
      const isFormValid = formData.vision.length >= 10 && 
                         /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email) &&
                         formData.name.trim();
      setIsValid(Boolean(isFormValid));
    }
  }, [formData, mounted]);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
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
      setFormData(initialFormData);
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }, [formData, isTech, validateForm]);

  const handleInputChange = useCallback((field: keyof FormData) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData(prev => ({ ...prev, [field]: e.target.value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }));
    }
  }, [errors]);

  return (
    <section id="contact-section" className="relative py-12 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={`relative rounded-[2rem] sm:rounded-[2.5rem] p-6 sm:p-12 lg:p-16 ${
            isTech
              ? "bg-gradient-to-br from-blue-950/30 via-indigo-900/20 to-violet-900/30 backdrop-blur-2xl border border-blue-500/10"
              : "bg-gradient-to-br from-indigo-100/90 via-white/80 to-purple-100/90 backdrop-blur-xl shadow-[inset_0_-100px_200px_-50px_rgba(99,102,241,0.2)]"
          }`}
        >
          {!isTech && (
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-br from-indigo-300/30 via-transparent to-transparent rotate-12 transform-gpu" />
              <div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-to-tl from-purple-300/30 via-transparent to-transparent -rotate-12 transform-gpu" />
            </div>
          )}

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
            <div className="space-y-8 sm:space-y-12 mb-8 sm:mb-16">
              <div className="space-y-4 sm:space-y-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="flex items-center gap-3 mb-4 sm:mb-8"
                >
                  <SparkleIcon isTech={isTech} />
                  <h2
                    className={`text-xl sm:text-2xl md:text-3xl font-bold leading-tight ${
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
                  className={`text-sm sm:text-base leading-normal sm:leading-7 ${
                    isTech ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  Share your ideas and let&apos;s create something extraordinary together.
                </motion.p>

                <div
                  className={`relative rounded-xl overflow-hidden ${
                    isTech ? "bg-blue-950/20" : "bg-white/80"
                  }`}
                >
                  <textarea
                    id="vision"
                    rows={3}
                    value={formData.vision}
                    onChange={handleInputChange('vision')}
                    className={`w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base bg-transparent relative z-10 ${
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

              <div className="flex flex-col gap-4 sm:flex-row sm:gap-4 items-start">
                <div className="w-full sm:flex-1">
                  <FormInput
                    type="text"
                    value={formData.name}
                    onChange={handleInputChange('name')}
                    placeholder="Your name"
                    error={errors.name}
                    isTech={isTech}
                  />
                </div>

                <div className="w-full sm:flex-1">
                  <FormInput
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange('email')}
                    placeholder="Your email"
                    error={errors.email}
                    isTech={isTech}
                  />
                </div>

                <div className="w-full sm:w-auto">
                  <SubmitButton isSubmitting={isSubmitting} isTech={isTech} />
                </div>
              </div>
            </div>

            <div
              className={`h-px w-full ${
                isTech ? "bg-blue-500/20" : "bg-indigo-200/50"
              } mb-8 sm:mb-16`}
            />

            <div className="flex flex-col md:flex-row gap-6 sm:gap-8">
              <Testimonial {...currentTestimonial} isTech={isTech} />

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="flex flex-col items-center md:items-end justify-end w-full md:w-[180px]"
              >
                <p
                  className={`text-base leading-normal sm:leading-7 font-medium mb-4 text-center md:text-right ${
                    isTech ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  Ready to discuss your project in detail?
                </p>
                <motion.button
                  type="button"
                  onClick={() => setIsBookingOpen(true)}
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
      </div>
      
      <BookingModal 
        isOpen={isBookingOpen} 
        onClose={() => setIsBookingOpen(false)} 
      />
    </section>
  );
});

export default CreativeContact;
