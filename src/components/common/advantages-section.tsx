"use client";

import { useEffect, useRef, useState } from "react";

const advantages = [
  {
    title: "Licensed & Insured",
    description:
      "Fully certified professionals with comprehensive coverage on every project.",
    icon: ShieldIcon,
  },
  {
    title: "Fast Delivery",
    description:
      "On-time project completion guaranteed with our proven management system.",
    icon: BoltIcon,
  },
  {
    title: "End-to-End Service",
    description:
      "From design concepts through construction to final handover — we handle it all.",
    icon: LayersIcon,
  },
  {
    title: "Quality Assured",
    description:
      "Rigorous quality checks at every stage to ensure flawless results.",
    icon: CheckCircleIcon,
  },
];

function ShieldIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M12 3l7 3v5c0 5-3.5 8.5-7 10-3.5-1.5-7-5-7-10V6l7-3Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function BoltIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M13 2L4 14h6l-1 8 11-14h-7l1-6Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function LayersIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M12 4l8 4-8 4-8-4 8-4Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M4 12l8 4 8-4"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M4 16l8 4 8-4"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CheckCircleIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.8" />
      <path
        d="M8 12.5l2.5 2.5L16 9.5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function FeatureCard({
  title,
  description,
  icon: Icon,
  delayMs,
  isVisible,
}: {
  title: string;
  description: string;
  icon: React.ComponentType;
  delayMs: number;
  isVisible: boolean;
}) {
  return (
    <div
      className={`rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-[0_8px_25px_rgba(15,23,42,0.05)] transition-all duration-700 ease-out hover:-translate-y-1 hover:shadow-[0_12px_32px_rgba(15,23,42,0.08)] ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
      style={{ transitionDelay: `${delayMs}ms` }}
    >
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-slate-500 shadow-inner">
        <span className="h-7 w-7">
          <Icon />
        </span>
      </div>
      <h3 className="mt-6 text-lg font-semibold text-slate-900">{title}</h3>
      <p className="mt-3 text-sm leading-7 text-slate-500">{description}</p>
    </div>
  );
}

export default function AdvantagesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 },
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-slate-50 py-20 md:py-28"
    >
      <div className="relative mx-auto w-[min(1280px,calc(100%-48px))]">
        <div
          className={`mx-auto max-w-3xl text-center transition-all duration-700 ease-out ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <span className="inline-flex rounded-full border border-blue-100 bg-blue-50 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.18em] text-blue-700">
            Our Advantage
          </span>

          <h2 className="mt-5 text-3xl font-extrabold tracking-[-0.04em] text-slate-900 sm:text-4xl md:text-5xl">
            Why Choose Capital Engineering Ceylon?
          </h2>

          <p className="mt-4 text-base leading-8 text-blue-900/80">
            We bring unmatched expertise, tools, and dedication to every project
            we take on.
          </p>
        </div>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {advantages.map((item) => (
            <FeatureCard
              key={item.title}
              title={item.title}
              description={item.description}
              icon={item.icon}
              delayMs={advantages.indexOf(item) * 120}
              isVisible={isVisible}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
