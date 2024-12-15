"use client";

import { CompanyProvider } from "@/lib/company-context";
import AIBanner from "./ai-banner";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <CompanyProvider>
      <AIBanner />
      {children}
    </CompanyProvider>
  );
}
