"use client";

import { useCompany } from "@/lib/company-context";
import { useEffect } from "react";

export default function BookingCalendar() {
  const { company } = useCompany();
  const isTech = company === "tech";

  useEffect(() => {
    // Load Calendly script
    const script = document.createElement("script");
    script.src = "https://assets.calendly.com/assets/external/widget.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div
        className={`rounded-2xl overflow-hidden shadow-xl ${
          isTech
            ? "bg-gradient-to-br from-blue-950/30 via-indigo-900/20 to-violet-900/30 backdrop-blur-2xl border border-blue-500/10"
            : "bg-gradient-to-br from-indigo-100/90 via-white/80 to-purple-100/90 backdrop-blur-xl"
        }`}
      >
        <div
          className="calendly-inline-widget"
          data-url={`https://calendly.com/base32/30min`}
          style={{ minWidth: "320px", height: "700px" }}
        />
      </div>
    </div>
  );
}
