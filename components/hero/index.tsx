"use client";

import { useCompany } from "@/lib/company-context";
import TechHero from "./tech-hero";
import StudioHero from "./studio-hero";

export default function Hero() {
  const { company } = useCompany();
  const isTech = company === "tech";

  return (
    <>
      {isTech ? <TechHero /> : <StudioHero />}
    </>
  );
}
