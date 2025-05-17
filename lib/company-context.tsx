"use client";

import {
  createContext,
  ReactNode,
  useContext,
} from "react";

// Simplified to only support tech
type CompanyType = "tech";

interface CompanyContextType {
  company: CompanyType;
}

const CompanyContext = createContext<CompanyContextType | undefined>(undefined);

export function CompanyProvider({ children }: { children: ReactNode }) {
  // Fixed as "tech" only
  const company: CompanyType = "tech";

  return (
    <CompanyContext.Provider value={{ company }}>
      {children}
    </CompanyContext.Provider>
  );
}

export function useCompany() {
  const context = useContext(CompanyContext);
  if (context === undefined) {
    throw new Error("useCompany must be used within a CompanyProvider");
  }
  return context;
}
