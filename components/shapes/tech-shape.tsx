"use client";

import dynamic from "next/dynamic";
import { Suspense } from "react";

// Dynamically import the actual scene component
const TechShapeScene = dynamic(() => import("./tech-shape-scene"), {
  ssr: false,
  loading: () => null,
});

export default function TechShape() {
  return (
    <div className="fixed inset-0 pointer-events-none shape-layer">
      <div className="w-full h-full max-w-[800px] max-h-[800px] mx-auto">
        <Suspense fallback={null}>
          <TechShapeScene />
        </Suspense>
      </div>
    </div>
  );
}
