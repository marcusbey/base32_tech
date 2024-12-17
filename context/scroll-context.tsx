"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';

type ScrollContextType = {
  gradientProgress: number;
  setGradientProgress: (value: number) => void;
};

const ScrollContext = createContext<ScrollContextType>({
  gradientProgress: 0,
  setGradientProgress: () => {},
});

export function ScrollProvider({ children }: { children: React.ReactNode }) {
  const [gradientProgress, setGradientProgress] = useState(0);

  return (
    <ScrollContext.Provider value={{ gradientProgress, setGradientProgress }}>
      {children}
    </ScrollContext.Provider>
  );
}

export const useScroll = () => useContext(ScrollContext);
