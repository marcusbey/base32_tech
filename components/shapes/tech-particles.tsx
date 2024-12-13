'use client';

import dynamic from 'next/dynamic';

const Scene = dynamic(() => import('./tech-particles-scene'), {
  ssr: false,
});

export default function TechParticles() {
  return (
    <div className="fixed inset-0 pointer-events-none">
      <Scene />
    </div>
  );
}