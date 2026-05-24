"use client";

import { useEffect, useState, useRef } from "react";

interface StatItemProps {
  icon: React.ReactNode;
  endValue: number;
  suffix: string;
  label: string;
  delayMs: number;
}

function AnimatedCounter({ endValue, suffix, duration = 1800 }: { endValue: number; suffix: string; duration?: number }) {
  const [count, setCount] = useState(0);
  const elementRef = useRef<HTMLSpanElement>(null);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasStarted) {
          setHasStarted(true);
          let startTimestamp: number | null = null;
          
          const animate = (timestamp: number) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const elapsed = timestamp - startTimestamp;
            const progress = Math.min(elapsed / duration, 1);
            
            // Ease out quad formula
            const easeOutProgress = progress * (2 - progress);
            
            setCount(Math.floor(easeOutProgress * endValue));

            if (progress < 1) {
              window.requestAnimationFrame(animate);
            } else {
              setCount(endValue);
            }
          };

          window.requestAnimationFrame(animate);
        }
      },
      { threshold: 0.1 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, [endValue, duration, hasStarted]);

  return (
    <span ref={elementRef} className="font-bold tracking-tight">
      {count}
      {suffix}
    </span>
  );
}

function StatCard({ icon, endValue, suffix, label, delayMs }: StatItemProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setTimeout(() => {
            setIsVisible(true);
          }, delayMs);
        }
      },
      { threshold: 0.1 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, [delayMs]);

  return (
    <div
      ref={cardRef}
      className={`flex flex-col items-center text-center transition-all duration-700 ease-out ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
    >
      {/* Glassmorphic Icon Wrapper */}
      <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-blue-300 shadow-[0_8px_32px_0_rgba(0,0,0,0.2)] backdrop-blur-md transition-all duration-300 hover:border-blue-400/30 hover:bg-white/10 hover:text-blue-200">
        {icon}
      </div>

      {/* Counter */}
      <div className="text-4xl font-extrabold text-white md:text-5xl">
        <AnimatedCounter endValue={endValue} suffix={suffix} />
      </div>

      {/* Label */}
      <p className="mt-2 text-sm font-medium text-slate-400/90 tracking-wide md:text-base">
        {label}
      </p>
    </div>
  );
}

export default function StatsSection() {
  const stats = [
    {
      id: 1,
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
          <circle cx="12" cy="8" r="7" />
          <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88" />
        </svg>
      ),
      endValue: 500,
      suffix: "+",
      label: "Projects Completed",
      delayMs: 0,
    },
    {
      id: 2,
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      ),
      endValue: 150,
      suffix: "+",
      label: "Expert Team Members",
      delayMs: 150,
    },
    {
      id: 3,
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
          <circle cx="12" cy="12" r="10" />
          <polyline points="12 6 12 12 16 14" />
        </svg>
      ),
      endValue: 15,
      suffix: "+",
      label: "Years Experience",
      delayMs: 300,
    },
    {
      id: 4,
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
          <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
          <polyline points="17 6 23 6 23 12" />
        </svg>
      ),
      endValue: 98,
      suffix: "%",
      label: "Client Satisfaction",
      delayMs: 450,
    },
  ];

  return (
    <section className="relative overflow-hidden border-b border-white/5 bg-[rgba(10,23,41,0.48)] py-16 backdrop-blur-md md:py-24">
      {/* Decorative grid background overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(59,130,246,0.06),transparent_70%)]" />
      
      <div className="relative mx-auto w-[min(1280px,calc(100%-48px))]">
        <div className="grid grid-cols-2 gap-y-12 gap-x-6 sm:grid-cols-4 lg:gap-12">
          {stats.map((stat) => (
            <StatCard
              key={stat.id}
              icon={stat.icon}
              endValue={stat.endValue}
              suffix={stat.suffix}
              label={stat.label}
              delayMs={stat.delayMs}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
