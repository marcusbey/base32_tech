'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

type CompanyType = 'tech' | 'studio';

interface CompanyContextType {
  company: CompanyType;
  setCompany: (company: CompanyType) => void;
}

const CompanyContext = createContext<CompanyContextType | undefined>(undefined);

export function CompanyProvider({ children }: { children: ReactNode }) {
  const [company, setCompany] = useState<CompanyType>('tech');

  return (
    <CompanyContext.Provider value={{ company, setCompany }}>
      {children}
    </CompanyContext.Provider>
  );
}

export function useCompany() {
  const context = useContext(CompanyContext);
  if (context === undefined) {
    throw new Error('useCompany must be used within a CompanyProvider');
  }
  return context;
}