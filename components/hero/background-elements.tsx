'use client';

import { useCompany } from "@/lib/company-context";
import TetrisGrid from "../shapes/tetris-grid";

interface BackgroundElementsProps {
  className?: string;
}

export default function BackgroundElements({ className }: BackgroundElementsProps) {
  const { company } = useCompany();

  return (
    <div className={className}>
      <TetrisGrid />
    </div>
  );
}
