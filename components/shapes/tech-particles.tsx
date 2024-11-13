"use client";

import dynamic from 'next/dynamic';
import { Suspense } from 'react';

// Dynamically import the Canvas component
const Scene = dynamic(() => import('./tech-particles-scene'), {
  ssr: false,
  loading: () => null
});

export default function TechParticles() {
  return (
    <div className="fixed inset-0 pointer-events-none">
      <Suspense fallback={null}>
        <Scene />
      </Suspense>
    </div>
  );
}