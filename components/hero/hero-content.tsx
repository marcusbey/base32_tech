"use client";

interface HeroContentProps {
  isStudio: boolean;
}

export function HeroContent({ isStudio }: HeroContentProps) {
  return (
    <div className="max-w-5xl">
      {isStudio ? (
        <>
          <h1 className="text-7xl md:text-9xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 leading-tight">
            Creative Design Solutions
          </h1>
          <p className="text-xl md:text-2xl text-gray-700 max-w-2xl">
            We craft brands and user experiences for companies building a brighter future. Our design-driven approach transforms ideas into impactful digital experiences.
          </p>
        </>
      ) : (
        <>
          <h1 className="text-6xl md:text-8xl font-bold mb-8 text-white">
            Intelligent Automation
          </h1>
          <p className="text-xl md:text-2xl text-white/70 max-w-2xl backdrop-blur-sm lg:backdrop-blur-none">
            We create intelligent agents and automation tools that understand your needs, saving you 8 hours daily - no clicks required.
          </p>
        </>
      )}
    </div>
  );
}