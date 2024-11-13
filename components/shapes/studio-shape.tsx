"use client";

import dynamic from "next/dynamic";
import { Suspense } from "react";

// Dynamically import the actual scene component
const StudioShapeScene = dynamic(() => import("./studio-shape-scene"), {
  ssr: false,
  loading: () => null,
});

export default function StudioShape() {
  return (
    <div className="absolute inset-0 -z-10">
      <Suspense fallback={null}>
        <StudioShapeScene />
      </Suspense>
    </div>
  );
}
