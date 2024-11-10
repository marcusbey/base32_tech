"use client";

import { motion } from 'framer-motion';
import { useCompany } from './company-provider';
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
      py-12 px-4 pb-32
      ${company === 'tech' ? 'bg-black/50' : 'bg-white/50'}
      backdrop-blur-lg border-t
      ${company === 'tech' ? 'border-blue-500/20' : 'border-gray-200'}
    `}>
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              {company === 'tech' ? (
                <CircuitBoard className="w-6 h-6 text-blue-400" />
              ) : (
                <Palette className="w-6 h-6 text-indigo-500" />
              )}
              <span className={`font-bold ${
                company === 'tech' ? 'text-white' : 'text-gray-900'
              }`}>
                {company === 'tech' ? 'BASE32.TECH' : 'BASE32.STUDIO'}
              </span>
            </div>
            <p className={company === 'tech' ? 'text-gray-400' : 'text-gray-600'}>
              Building the future through technology and design.
            </p>
          </div>

          {['Products', 'Company', 'Resources'].map((section) => (
            <div key={section}>
              <h3 className={`font-semibold mb-4 ${
                company === 'tech' ? 'text-white' : 'text-gray-900'
              }`}>
                {section}
              </h3>
              <ul className="space-y-2">
                {['About', 'Features', 'Contact', 'Blog'].map((item) => (
                  <li key={item}>
                    <a
                      href="#"
                      className={`hover:underline ${
                        company === 'tech' ? 'text-gray-400' : 'text-gray-600'
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

        <div className={`flex flex-col md:flex-row justify-between items-center pt-8 border-t ${
          company === 'tech' ? 'border-blue-500/20' : 'border-gray-200'
        }`}>
          <p className={company === 'tech' ? 'text-gray-400' : 'text-gray-600'}>
            © 2024 BASE32. All rights reserved.
          </p>

          <div className="flex gap-4 mt-4 md:mt-0">
            {socialLinks.map((social, index) => (
              <motion.a
                key={index}
                href={social.href}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className={`p-2 rounded-full ${
                  company === 'tech'
                    ? 'text-gray-400 hover:text-white hover:bg-blue-500/20'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                <social.icon className="w-5 h-5" />
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}