'use client';

import { useCompany } from '@/components/company-provider';
import BackgroundEffects from '@/components/background-effects';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

export default function Home() {
  const { company, setCompany } = useCompany();

  return (
    <main className="min-h-screen relative">
      <BackgroundEffects />
      
      <div className="container mx-auto px-4 py-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h1 className={`text-6xl font-bold mb-6 ${
            company === 'tech' 
              ? 'bg-gradient-to-r from-blue-500 via-cyan-400 to-green-400 text-transparent bg-clip-text'
              : 'bg-gradient-to-r from-gray-800 to-gray-600 text-transparent bg-clip-text'
          }`}>
            BASE32.{company.toUpperCase()}
          </h1>
          <p className="text-xl mb-8">
            {company === 'tech'
              ? "We create intelligent agents and automation tools that understand your needs, saving you 8 hours daily - no clicks required."
              : "We craft brands and user experiences for companies building a brighter future."}
          </p>
          
          <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-20">
            <Button
              onClick={() => setCompany(company === 'tech' ? 'studio' : 'tech')}
              className={`
                px-8 py-6 rounded-full text-lg font-medium transition-all duration-300
                ${company === 'tech'
                  ? 'bg-black/20 hover:bg-black/30 text-white backdrop-blur-lg border border-blue-500/20'
                  : 'bg-white/20 hover:bg-white/30 text-gray-800 backdrop-blur-lg border border-gray-200'}
              `}
            >
              Switch to BASE32.{company === 'tech' ? 'STUDIO' : 'TECH'}
            </Button>
          </div>
        </motion.div>
      </div>
    </main>
  );
}