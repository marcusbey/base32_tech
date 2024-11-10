"use client";

import { motion } from 'framer-motion';
import { useCompany } from './company-provider';
import { useEffect, useState } from 'react';

const initialGrid = [
  { cols: 2, rows: 2 },
  { cols: 1, rows: 1 },
  { cols: 1, rows: 2 },
  { cols: 2, rows: 1 },
  { cols: 1, rows: 1 },
  { cols: 1, rows: 1 },
  { cols: 2, rows: 2 },
  { cols: 1, rows: 1 },
];

export default function Hero() {
  const { company } = useCompany();
  const [grid, setGrid] = useState(initialGrid);

  useEffect(() => {
    if (company === 'tech') {
      const interval = setInterval(() => {
        setGrid(current => {
          const newGrid = [...current];
          const randomIndex = Math.floor(Math.random() * newGrid.length);
          newGrid[randomIndex] = {
            cols: Math.random() > 0.5 ? 2 : 1,
            rows: Math.random() > 0.5 ? 2 : 1,
          };
          return newGrid;
        });
      }, 2000);

      return () => clearInterval(interval);
    }
  }, [company]);

  return (
    <section className="min-h-screen relative flex items-center justify-center overflow-hidden">
      {company === 'tech' && (
        <div className="absolute inset-0 p-4">
          <div className="grid grid-cols-4 gap-4 h-full">
            {grid.map((item, index) => (
              <motion.div
                key={index}
                layout
                className="bg-blue-500/5 border border-blue-500/20 rounded-xl backdrop-blur-sm"
                style={{
                  gridColumn: `span ${item.cols}`,
                  gridRow: `span ${item.rows}`,
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              />
            ))}
          </div>
        </div>
      )}

      <motion.div
        className="relative z-10 text-center max-w-4xl mx-auto px-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <motion.h1
          className={`text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent ${
            company === 'tech'
              ? 'bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500'
              : 'bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-400'
          }`}
        >
          {company === 'tech' ? (
            <>Intelligent Automation</>
          ) : (
            <>Creative Design Solutions</>
          )}
        </motion.h1>
        <motion.p
          className={`text-xl md:text-2xl ${
            company === 'tech' ? 'text-gray-300' : 'text-gray-600'
          }`}
        >
          {company === 'tech'
            ? "We create intelligent agents and automation tools that understand your needs, saving you 8 hours daily - no clicks required."
            : "We craft brands and user experiences for companies building a brighter future."}
        </motion.p>
      </motion.div>
    </section>
  );
}