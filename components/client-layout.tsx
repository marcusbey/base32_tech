"use client";

import { CompanyProvider } from "@/lib/company-context";
import ThemeTransition from "./theme-transition";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <CompanyProvider>
      <ThemeTransition />
      {children}
    </CompanyProvider>
  );
}