"use client";

import React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

const clientLogos = [
  { src: "/logos/bell.png", alt: "Bell" },
  { src: "/logos/compozit.png", alt: "Compozit" },
  { src: "/logos/grics.png", alt: "Grics" },
  { src: "/logos/jda.png", alt: "JDA" },
  { src: "/logos/northscale.png", alt: "Northscale", className: "h-16" },
];

export default function LogoCarousel() {
  return (
    <div className="w-full bg-background/50 backdrop-blur-sm py-4 sm:py-6 md:py-8">
      <div className="container mx-auto px-4">
        <div className="relative flex overflow-hidden gradient-mask">
          <div className="logos">
            {[...clientLogos, ...clientLogos].map((logo, index) => (
              <div
                key={index}
                className={cn(
                  "flex-shrink-0 h-8 w-24 sm:h-10 sm:w-28 md:h-12 md:w-32 relative grayscale hover:grayscale-0 transition-all duration-300",
                  logo.className
                )}
              >
                <Image
                  src={logo.src}
                  alt={logo.alt}
                  fill
                  className="object-contain"
                  sizes="(max-width: 640px) 96px, (max-width: 768px) 112px, 128px"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(calc(-50% - var(--gap, 2rem)));
          }
        }

        .logos {
          display: flex;
          gap: 2rem;
          animation: scroll 25s linear infinite;
        }

        @media (min-width: 640px) {
          .logos {
            gap: 4rem;
          }
        }

        @media (min-width: 1024px) {
          .logos {
            gap: 8rem;
          }
        }

        .gradient-mask {
          mask-image: linear-gradient(
            to right,
            transparent,
            black 15%,
            black 85%,
            transparent
          );
          -webkit-mask-image: linear-gradient(
            to right,
            transparent,
            black 15%,
            black 85%,
            transparent
          );
        }
      `}</style>
    </div>
  );
}
