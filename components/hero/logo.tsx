"use client"; import { motion } from 'framer-motion'; import Image from 'next/image'; import Link from 'next/link'; interface LogoProps { isStudio: boolean; } export function Logo({ isStudio }: LogoProps) { return ( <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="absolute top-8 left-8 z-30" > <Link href="/"> <motion.div 
          className="flex items-center gap-4"
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.2 }}
        >
          <motion.div
            whileHover={{ rotate: 180 }}
            transition={{ duration: 0.5 }}
            className={`p-4 rounded-2xl ${
              isStudio 
                ? 'bg-white/20 shadow-lg backdrop-blur-xl hover:bg-white/30'
                : 'bg-black/30 shadow-lg backdrop-blur-xl hover:bg-black/40'
            } transition-colors duration-200`}
          >
            <div className="w-12 h-12 relative">
              <Image
                src={'images/dark_base32.png'}
                alt="Base32 Logo"
                fill
                className="object-contain"
                priority
              />
            </div>
          </motion.div>
          <div className={`block ${
            isStudio ? 'text-gray-800' : 'text-white'
          }`}>
            <h3 className="text-2xl font-bold leading-none tracking-tight mb-1">
              BASE32
            </h3>
            <p className={`text-sm font-medium ${
              isStudio ? 'text-gray-600' : 'text-gray-300'
            }`}>
              {isStudio ? '.STUDIO' : '.TECH'}
            </p>
          </div>
        </motion.div>
      </Link>
    </motion.div>
  );
}