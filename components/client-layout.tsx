'use client';

import { CompanyProvider } from '@/components/company-provider';

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <CompanyProvider>{children}</CompanyProvider>;
}