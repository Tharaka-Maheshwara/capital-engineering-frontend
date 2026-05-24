"use client";

import { useEffect, useRef, useState } from "react";

const testimonials = [
  {
    name: "Robert Sterling",
    role: "CEO, Sterling Holdings",
    initials: "R",
    quote:
      "Capital Engineering Ceylon transformed our vision into a stunning commercial complex. Their professionalism and attention to detail is unmatched.",
  },
  {
    name: "Amelia Chen",
    role: "Property Developer",
    initials: "A",
    quote:
      "Working with Capital Engineering Ceylon was seamless from start to finish. They delivered on time and within budget — an extraordinary result.",
  },
  {
    name: "Marcus Davies",
    role: "Director, Skyline Group",
    initials: "M",
    quote:
      "The team’s expertise in large-scale industrial projects is remarkable. They exceeded every benchmark we set.",
  },
];

function StarIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 3.6l2.9 5.88 6.5.95-4.7 4.58 1.1 6.48L12 18.46l-5.8 3.03 1.1-6.48-4.7-4.58 6.5-.95L12 3.6z" />
    </svg>
  );
}

function QuoteIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M10 11H6.5A2.5 2.5 0 0 0 4 13.5V18h6v-7Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M20 11h-3.5A2.5 2.5 0 0 0 14 13.5V18h6v-7Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function TestimonialCard({
  name,
  role,
  initials,
  quote,
  delayMs,
  isVisible,
}: {
  name: string;
  role: string;
  initials: string;
  quote: string;
  delayMs: number;
  isVisible: boolean;
}) {
  return (
    <article
      className={`group relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-7 shadow-[0_14px_40px_rgba(15,23,42,0.06)] transition-all duration-700 ease-out hover:-translate-y-1 hover:border-[#b9c7d9] hover:shadow-[0_18px_50px_rgba(15,23,42,0.1)] ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
      style={{ transitionDelay: `${delayMs}ms` }}
    >
      <div className="absolute inset-x-0 top-0 h-1 bg-linear-to-r from-[#6f88a8] via-[#9bb0ca] to-[#6f88a8]" />
      <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-[#879bb6]/10 blur-2xl transition-opacity duration-300 group-hover:opacity-100" />

      <div className="flex items-center gap-1 text-[#7188a6]">
        <span className="h-4 w-4">
          <StarIcon />
        </span>
        <span className="h-4 w-4">
          <StarIcon />
        </span>
        <span className="h-4 w-4">
          <StarIcon />
        </span>
        <span className="h-4 w-4">
          <StarIcon />
        </span>
        <span className="h-4 w-4">
          <StarIcon />
        </span>
      </div>

      <div className="mt-6 text-[0.98rem] leading-8 text-slate-600">
        <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-2xl bg-slate-50 text-[#7188a6]">
          <span className="h-5 w-5">
            <QuoteIcon />
          </span>
        </div>
        <p>{quote}</p>
      </div>

      <div className="mt-7 flex items-center gap-4">
        <div className="flex h-12 w-12 flex-none items-center justify-center rounded-full bg-linear-to-br from-slate-700 to-slate-500 text-sm font-bold text-white shadow-[0_10px_20px_rgba(15,23,42,0.18)]">
          {initials}
        </div>
        <div>
          <h3 className="text-sm font-bold text-slate-900">{name}</h3>
          <p className="text-xs text-slate-500">{role}</p>
        </div>
      </div>
    </article>
  );
}

export default function TestimonialsSection() {
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
      className="relative overflow-hidden bg-[linear-gradient(180deg,#f8fafc_0%,#ffffff_22%,#f8fafc_100%)] py-8 pb-24 md:pb-32"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(114,136,166,0.08),transparent_28%),radial-gradient(circle_at_90%_35%,rgba(159,175,198,0.08),transparent_20%)]" />

      <div
        className={`mx-auto w-full transition-all duration-700 ease-out ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div
            className={`mx-auto max-w-3xl text-center transition-all duration-700 ease-out ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <span className="inline-flex rounded-full border border-blue-100 bg-blue-50 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.18em] text-blue-700">
              Client Voices
            </span>

            <h2 className="mt-5 text-3xl font-extrabold tracking-[-0.04em] text-slate-900 sm:text-4xl md:text-5xl">
              What Our Clients Say
            </h2>

            <p className="mx-auto mt-4 max-w-2xl text-[0.98rem] leading-8 text-slate-500">
              Real feedback from clients who trusted us with complex commercial,
              residential, and industrial projects.
            </p>
          </div>

          <div className="mt-16 grid gap-6 lg:grid-cols-3">
            {testimonials.map((item, index) => (
              <TestimonialCard
                key={item.name}
                name={item.name}
                role={item.role}
                initials={item.initials}
                quote={item.quote}
                delayMs={index * 120}
                isVisible={isVisible}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
