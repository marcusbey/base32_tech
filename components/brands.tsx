"use client";

import React from "react";
import { useCompany } from "@/lib/company-context";
import { Building2, Rocket } from "lucide-react";
import { useEffect, useRef, useState, memo, useMemo, useCallback } from "react";
import { cn } from "@/lib/utils";
import { useThrottledCallback } from "@/lib/performance";
import Image from "next/image";

const sectors = {
  tech: [
    {
      name: "Startups" as const,
      icon: Rocket,
      description:
        "Empowering startups with agile development and cost-effective solutions. We excel in product thinking, rapid prototyping, MVP development...",
      fullDescription:
        "Empowering startups with agile development and cost-effective solutions. We excel in product thinking, rapid prototyping, MVP development, and comprehensive mobile and SAAS solutions.",
      benefits: [
        "Rapid MVP development and iteration",
        "Scalable architecture from day one",
        "Cost-effective automation solutions",
        "Growth-focused implementation",
      ],
    },
    {
      name: "Enterprise" as const,
      icon: Building2,
      description:
        "Partnering with established organizations to drive digital transformation through intelligent automation. We specialize in enterprise-wide solutions, legacy system modernization...",
      fullDescription:
        "Partnering with established organizations to drive digital transformation through intelligent automation. We specialize in enterprise-wide solutions, legacy system modernization, and secure, scalable architectures that enhance operational efficiency.",
      benefits: [
        "Custom AI solutions tailored to enterprise scale",
        "Seamless integration with existing systems",
        "Enhanced security and compliance measures",
        "Comprehensive training and support",
      ],
    },
  ],
  studio: [
    {
      name: "Startups" as const,
      icon: Rocket,
      description:
        "Helping startups build memorable brands and engaging digital products. We focus on rapid iteration and scalable design solutions...",
      fullDescription:
        "Helping startups build memorable brands and engaging digital products. We focus on rapid iteration and scalable design solutions that grow with your business.",
      benefits: [
        "Brand strategy development",
        "Product design",
        "User interface design",
        "Design system creation",
      ],
    },
    {
      name: "Enterprise" as const,
      icon: Building2,
      description:
        "Creating sophisticated brand identities and digital experiences for established organizations. Our enterprise solutions deliver scalable design systems...",
      fullDescription:
        "Creating sophisticated brand identities and digital experiences for established organizations. Our enterprise solutions deliver scalable design systems and comprehensive brand guidelines.",
      benefits: [
        "Enterprise-scale design systems",
        "Brand identity development",
        "Digital transformation",
        "User experience optimization",
      ],
    },
  ],
} as const;

type SectorType = typeof sectors.tech[number] | typeof sectors.studio[number];

const clientLogos = [
  { src: "/logos/bell.png", alt: "Bell" },
  { src: "/logos/compozit.png", alt: "Compozit" },
  { src: "/logos/grics.png", alt: "Grics" },
  { src: "/logos/jda.png", alt: "JDA" },
  { src: "/logos/northscale.png", alt: "Northscale", className: "h-16" },
];

const BrandCard = memo(function BrandCard({
  sector,
  index,
  isActive,
  isTech,
  isInView,
  onClick,
}: {
  sector: SectorType;
  index: number;
  isActive: boolean;
  isTech: boolean;
  isInView: boolean;
  onClick: () => void;
}) {
  return (
    <div
      className={cn(
        "brand-card p-6 rounded-2xl backdrop-blur-lg cursor-pointer",
        isActive && "active",
        isInView && "animate-fade-up",
        isTech ? "hover:bg-blue-950/20" : "hover:bg-indigo-50/50"
      )}
      style={{ '--animation-delay': `${index * 150}ms` } as React.CSSProperties}
      onClick={onClick}
    >
      <div className="flex items-center gap-4">
        <div
          className={cn(
            "p-3 rounded-xl transition-colors duration-300",
            isTech
              ? "bg-yellow-500/10 group-hover:bg-yellow-500/20"
              : "bg-indigo-500/10 group-hover:bg-indigo-500/20"
          )}
        >
          <sector.icon
            className={cn(
              "w-8 h-8 transition-transform duration-300 group-hover:scale-110",
              isTech
                ? "text-yellow-400 group-hover:text-yellow-300"
                : "text-indigo-500 group-hover:text-indigo-400"
            )}
          />
        </div>

        <h3
          className={cn(
            "text-2xl font-light transition-colors duration-300",
            isTech
              ? "text-white group-hover:text-yellow-50"
              : "text-gray-900 group-hover:text-indigo-900"
          )}
        >
          {sector.name}
        </h3>
      </div>

      <p
        className={cn(
          "mt-4 text-sm font-light transition-colors duration-300",
          isTech
            ? "text-gray-400 group-hover:text-gray-300"
            : "text-gray-600 group-hover:text-gray-700"
        )}
      >
        {sector.fullDescription}
      </p>

      <div className="mt-6">
        <div className="grid md:grid-cols-2 gap-4">
          {sector.benefits.map((benefit, idx) => (
            <div
              key={idx}
              className={cn(
                "flex items-center gap-2 font-light",
                isTech ? "text-gray-400" : "text-gray-600"
              )}
            >
              <div
                className={cn(
                  "w-1.5 h-1.5 rounded-full",
                  isTech ? "bg-yellow-400" : "bg-indigo-500"
                )}
              />
              <span>{benefit}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
});

const Brands = memo(function Brands() {
  const { company } = useCompany();
  const currentSectors = useMemo(
    () => (company === "tech" ? sectors.tech : sectors.studio),
    [company]
  );
  const isTech = company === "tech";
  const sectionRef = useRef<HTMLElement>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        setIsInView(entries[0].isIntersecting);
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section 
      ref={sectionRef}
      id="brands" 
      className="relative py-22 lg:py-48 overflow-hidden"
    >
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .card-fade-in {
          animation: fadeIn 0.8s ease-out forwards;
        }
        .logos {
          display: flex;
          gap: 2rem;
          animation: scroll 80s linear infinite;
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
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(calc(-50% - var(--gap, 2rem)));
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
      <div className="absolute inset-0 -z-10">
        <div
          className={cn(
            "w-full h-full",
            isTech
              ? "bg-black/30 backdrop-blur-xl"
              : "bg-white/30 backdrop-blur-xl border-y border-gray-200"
          )}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-16">
          <div className="lg:col-span-4 relative">
            <div 
              className={cn(
                "transition-all duration-700",
                isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              )}
            >
              <h2 className="text-4xl lg:text-5xl font-light leading-[1.2] bg-clip-text text-transparent bg-gradient-to-r from-white via-yellow-200 to-yellow-400">
                Partner with
                <br />
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 via-yellow-300 to-white">
                  Industry Leaders
                </span>
              </h2>
              <div className="absolute -inset-x-4 -inset-y-2 bg-gradient-to-r from-yellow-400/10 via-yellow-300/5 to-transparent blur-2xl -z-10" />
              <p className="mt-6 text-lg lg:text-xl font-light text-gray-400">
                {isTech
                  ? "Join forward-thinking enterprises and innovative startups who have achieved "
                  : "Join visionary companies who have transformed their digital presence with "}
                <span className="text-yellow-400">
                  {isTech ? "80% operational efficiency gains" : "200% engagement growth"}
                </span>
              </p>
            </div>
          </div>

          <div className="lg:col-span-8 space-y-4">
            {currentSectors.map((sector, index) => (
              <div key={sector.name} className="card-fade-in" style={{ animationDelay: `${index * 0.2}s` }}>
                <BrandCard
                  sector={sector}
                  index={index}
                  isActive={true}
                  isTech={isTech}
                  isInView={isInView}
                  onClick={() => {}}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Logo Carousel */}
      <div className="w-full bg-background/50 backdrop-blur-sm py-4 sm:py-6 md:py-8 mt-8">
        <div className="container mx-auto px-4">
          <div className="relative flex overflow-hidden gradient-mask">
            <div 
              className="logos" 
              style={{ ["--gap" as string]: "2rem" } as React.CSSProperties}
            >
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
      </div>
    </section>
  );
});

export default Brands;
