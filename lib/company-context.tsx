"use client";

import { usePathname } from "next/navigation";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

type CompanyType = "tech" | "studio";

interface CompanyContextType {
  company: CompanyType;
  setCompany: (company: CompanyType) => void;
  toggleCompany: () => void;
}

const CompanyContext = createContext<CompanyContextType | undefined>(undefined);

export function CompanyProvider({ children }: { children: ReactNode }) {
  const [company, setCompany] = useState<CompanyType>("tech");
  const pathname = usePathname();

  // Function to get company from hostname
  const getCompanyFromHostname = (hostname: string): CompanyType => {
    if (hostname.includes("base32.studio")) return "studio";
    return "tech"; // Default to tech for base32.tech or any other domain
  };

  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    // Get the hostname from window.location
    const hostname = window.location.hostname;
    const detectedCompany = getCompanyFromHostname(hostname);
    setCompany(detectedCompany);
  }, []);

  const toggleCompany = () => {
    const newCompany = company === "tech" ? "studio" : "tech";
    setCompany(newCompany);

    const handleCompanyChange = (newCompany: string) => {
      if (typeof window === 'undefined') return;
      
      const currentHostname = window.location.hostname;
      const protocol = window.location.protocol;
      const pathname = window.location.pathname;

      let newDomain;
      if (newCompany === "tech") {
        newDomain = currentHostname.replace("base32.studio", "base32.tech");
      } else {
        newDomain = currentHostname.replace("base32.tech", "base32.studio");
      }

      // Only redirect if we're on a different domain
      if (currentHostname !== newDomain) {
        window.location.href = `${protocol}//${newDomain}${pathname}`;
      }
    };

    handleCompanyChange(newCompany);
  };

  return (
    <CompanyContext.Provider value={{ company, setCompany, toggleCompany }}>
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
