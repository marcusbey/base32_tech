'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { usePathname } from 'next/navigation';

type CompanyType = 'tech' | 'studio';

interface CompanyContextType {
  company: CompanyType;
  setCompany: (company: CompanyType) => void;
  toggleCompany: () => void;
  isTransitioning: boolean;
}

const CompanyContext = createContext<CompanyContextType | undefined>(undefined);

export function CompanyProvider({ children }: { children: ReactNode }) {
  const [company, setCompany] = useState<CompanyType>('tech');
  const [isTransitioning, setIsTransitioning] = useState(false);
  const pathname = usePathname();

  // Function to get company from hostname
  const getCompanyFromHostname = (hostname: string): CompanyType => {
    if (hostname.includes('base32.studio')) return 'studio';
    return 'tech'; // Default to tech for base32.tech or any other domain
  };

  useEffect(() => {
    // Get the hostname from window.location
    const hostname = window.location.hostname;
    const detectedCompany = getCompanyFromHostname(hostname);
    setCompany(detectedCompany);
  }, []);

  const handleThemeTransition = async (newCompany: CompanyType) => {
    setIsTransitioning(true);
    
    // Quick fade in
    await new Promise(resolve => setTimeout(resolve, 150));
    
    // Update company state
    setCompany(newCompany);
    
    // Quick fade out
    await new Promise(resolve => setTimeout(resolve, 150));
    
    setIsTransitioning(false);
  };

  const toggleCompany = async () => {
    const newCompany = company === 'tech' ? 'studio' : 'tech';
    
    // Start transition
    await handleThemeTransition(newCompany);
    
    // Handle domain change if needed
    const currentHostname = window.location.hostname;
    const protocol = window.location.protocol;
    const pathname = window.location.pathname;
    
    let newDomain;
    if (newCompany === 'tech') {
      newDomain = currentHostname.replace('base32.studio', 'base32.tech');
    } else {
      newDomain = currentHostname.replace('base32.tech', 'base32.studio');
    }
    
    // Only redirect if we're on a different domain
    if (currentHostname !== newDomain) {
      window.location.href = `${protocol}//${newDomain}${pathname}`;
    }
  };

  return (
    <CompanyContext.Provider value={{ company, setCompany, toggleCompany, isTransitioning }}>
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