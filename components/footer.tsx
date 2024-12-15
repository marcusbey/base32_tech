"use client";

import { motion } from 'framer-motion';
import { useCompany } from '@/lib/company-context';
import { CircuitBoard, Palette, Github, Twitter, Linkedin } from 'lucide-react';

export default function Footer() {
  const { company } = useCompany();
  const isTech = company === 'tech';

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const sectionId = href.replace('#', '');
    const section = document.getElementById(sectionId);
    if (section) {
      const offset = 200; // 200px offset
      const elementPosition = section.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  const navigation = {
    company: [
      { name: 'Services', href: '#services' },
      { name: 'Values', href: '#values' },
      { name: 'About', href: '#about' },
      { name: 'Contact', href: '#contact' },
    ],
    links: [
      { name: 'Twitter', href: '#', icon: Twitter },
      { name: 'GitHub', href: '#', icon: Github },
      { name: 'LinkedIn', href: '#', icon: Linkedin },
    ],
  };

  return (
    <footer className={`relative overflow-hidden ${
      isTech ? 'bg-gray-900' : 'bg-black'
    } backdrop-blur-lg border-t ${
      isTech ? 'border-blue-500/20' : 'border-gray-200'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Main footer content */}
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-12">
          {/* Logo and description */}
          <div className="lg:max-w-sm">
            <div className="flex items-center gap-2 mb-6">
              {isTech ? (
                <CircuitBoard className="w-8 h-8 text-blue-400" />
              ) : (
                <Palette className="w-8 h-8 text-indigo-500" />
              )}
              <span className={`text-xl font-bold ${
                isTech ? 'text-white' : 'text-gray-900'
              }`}>
                {isTech ? 'BASE32' : 'BASE32.STUDIO'}
              </span>
            </div>
            <p className={`text-base leading-relaxed ${
              isTech ? 'text-gray-400' : 'text-gray-600'
            }`}>
              Building the future through technology and design. We create solutions that transform businesses and delight users.
            </p>
          </div>

          {/* Navigation and Social Links */}
          <div className="flex flex-col sm:flex-row gap-12 lg:gap-24">
            {/* Navigation Links */}
            <div>
              <h3 className={`text-sm font-semibold uppercase tracking-wider mb-4 ${
                isTech ? 'text-gray-300' : 'text-gray-900'
              }`}>
                Navigation
              </h3>
              <ul className="space-y-3">
                {navigation.company.map((item) => (
                  <li key={item.name}>
                    <a
                      href={item.href}
                      onClick={(e) => scrollToSection(e, item.href)}
                      className={`text-sm hover:underline transition-colors ${
                        isTech 
                          ? 'text-gray-400 hover:text-white' 
                          : 'text-gray-600 hover:text-gray-900'
                      }`}
                    >
                      {item.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Social Links */}
            <div>
              <h3 className={`text-sm font-semibold uppercase tracking-wider mb-4 ${
                isTech ? 'text-gray-300' : 'text-gray-900'
              }`}>
                Connect
              </h3>
              <ul className="space-y-3">
                {navigation.links.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className={`text-sm flex items-center gap-2 hover:underline transition-colors ${
                        isTech 
                          ? 'text-gray-400 hover:text-white' 
                          : 'text-gray-600 hover:text-gray-900'
                      }`}
                    >
                      <link.icon className="w-4 h-4" />
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className={`mt-16 pt-8 border-t ${
          isTech ? 'border-blue-500/20' : 'border-gray-200'
        } flex flex-col sm:flex-row justify-between items-center gap-4`}>
          <p className={`text-sm ${
            isTech ? 'text-gray-400' : 'text-gray-600'
          }`}>
            &copy; 2024 BASE32. All rights reserved.
          </p>
          
          {/* Social icons for mobile */}
          <div className="flex gap-6 sm:hidden">
            {navigation.links.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className={isTech ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'}
              >
                <link.icon className="w-5 h-5" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}