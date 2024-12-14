'use client';

import { useCompany } from "@/lib/company-context";

interface BackgroundElementsProps {
  className?: string;
}

export default function BackgroundElements({ className }: BackgroundElementsProps) {
  const { company } = useCompany();

  return (
    <div className={className}>
      {/* Background elements can be added here if needed */}
    </div>
  );
}
