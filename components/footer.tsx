"use client";

import { motion } from 'framer-motion';
import { useCompany } from '@/lib/company-context';
import { CircuitBoard, Palette, Github, Twitter, Linkedin } from 'lucide-react';

export default function Footer() {
  const { company } = useCompany();

  const socialLinks = [
    { icon: Github, href: '#' },
    { icon: Twitter, href: '#' },
    { icon: Linkedin, href: '#' },
  ];

  return (
    <footer className={`
      py-24 px-4 pb-48
      ${company === 'tech' ? 'bg-black/50' : 'bg-white/50'}
      backdrop-blur-lg border-t
      ${company === 'tech' ? 'border-blue-500/20' : 'border-gray-200'}
    `}>
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-16">
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              {company === 'tech' ? (
                <CircuitBoard className="w-8 h-8 text-blue-400" />
              ) : (
                <Palette className="w-8 h-8 text-indigo-500" />
              )}
              <span className={`text-xl font-bold ${
                company === 'tech' ? 'text-white' : 'text-gray-900'
              }`}>
                {company === 'tech' ? 'BASE32.TECH' : 'BASE32.STUDIO'}
              </span>
            </div>
            <p className={`text-lg leading-relaxed ${company === 'tech' ? 'text-gray-400' : 'text-gray-600'}`}>
              Building the future through technology and design. We create solutions that transform businesses and delight users.
            </p>
          </div>

          {['Products', 'Company', 'Resources'].map((section) => (
            <div key={section} className="space-y-8">
              <h3 className={`text-lg font-semibold ${
                company === 'tech' ? 'text-white' : 'text-gray-900'
              }`}>
                {section}
              </h3>
              <ul className="space-y-4">
                {['About', 'Features', 'Contact', 'Blog'].map((item) => (
                  <li key={item}>
                    <a
                      href="#"
                      className={`text-lg hover:underline transition-colors ${
                        company === 'tech' 
                          ? 'text-gray-400 hover:text-white' 
                          : 'text-gray-600 hover:text-gray-900'
                      }`}
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className={`flex flex-col md:flex-row justify-between items-center pt-16 border-t ${
          company === 'tech' ? 'border-blue-500/20' : 'border-gray-200'
        }`}>
          <p className={`text-lg ${company === 'tech' ? 'text-gray-400' : 'text-gray-600'}`}>
            © 2024 BASE32. All rights reserved.
          </p>

          <div className="flex gap-6 mt-8 md:mt-0">
            {socialLinks.map((social, index) => (
              <motion.a
                key={index}
                href={social.href}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className={`p-3 rounded-full transition-colors ${
                  company === 'tech'
                    ? 'text-gray-400 hover:text-white hover:bg-blue-500/20'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                <social.icon className="w-6 h-6" />
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}