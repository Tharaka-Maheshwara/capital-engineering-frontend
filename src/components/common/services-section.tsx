"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState, useRef } from "react";

interface ServiceCardProps {
  tag: string;
  image: string;
  title: string;
  description: string;
  href: string;
  delayMs: number;
}

function ServiceCard({
  tag,
  image,
  title,
  description,
  href,
  delayMs,
}: ServiceCardProps) {
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
      { threshold: 0.1 },
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, [delayMs]);

  return (
    <div
      ref={cardRef}
      className={`group relative overflow-hidden rounded-3xl border border-slate-200 bg-white transition-all duration-700 ease-out hover:border-blue-500/50 hover:bg-white shadow-[0_0_25px_rgba(0,0,0,0.08)] hover:shadow-[0_0_40px_rgba(37,99,235,0.15)] hover:-translate-y-2 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
      }`}
    >
      {/* Card Image Wrapper */}
      <div className="relative h-64 w-full overflow-hidden bg-slate-100">
        {/* Category Pill Tag */}
        <span className="absolute left-4 top-4 z-10 rounded-full border border-slate-200/50 bg-white/95 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-slate-800 shadow-[0_4px_12px_rgba(0,0,0,0.08)]">
          {tag}
        </span>

        <Image
          src={image}
          alt={title}
          fill
          className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-110 group-hover:rotate-1"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />

        {/* Inner Gradient Shadow */}
        <div className="absolute inset-0 bg-linear-to-t from-slate-900/40 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      </div>

      {/* Card Content */}
      <div className="px-5 pt-6 pb-5">
        <h3 className="text-xl font-bold text-slate-900 transition-colors duration-300 group-hover:text-blue-600">
          {title}
        </h3>

        <p className="mt-3 text-sm leading-relaxed text-slate-500">
          {description}
        </p>

        {/* Read More Link */}
        <div className="mt-6 flex items-center">
          <Link
            href={href}
            className="inline-flex items-center gap-1.5 text-sm font-bold text-blue-600 transition-colors duration-200 group-hover:text-blue-500"
          >
            <span>View Projects</span>
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-4 w-4 transition-transform duration-300 ease-out group-hover:translate-x-1.5"
            >
              <path d="M5 12h14" />
              <path d="M12 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function ServicesSection() {
  const titleRef = useRef<HTMLDivElement>(null);
  const [titleVisible, setTitleVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setTitleVisible(true);
        }
      },
      { threshold: 0.1 },
    );

    if (titleRef.current) {
      observer.observe(titleRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const services = [
    {
      id: 1,
      tag: "Commercial",
      image: "/images/service-1.png",
      title: "Commercial Construction",
      description:
        "Building state-of-the-art commercial spaces that drive business success and inspire growth.",
      href: "/projects?category=commercial",
      delayMs: 0,
    },
    {
      id: 2,
      tag: "Residential",
      image: "/images/service-2.png",
      title: "Residential Projects",
      description:
        "Creating dream homes with precision, quality, and meticulous attention to every detail.",
      href: "/projects?category=residential",
      delayMs: 150,
    },
    {
      id: 3,
      tag: "Industrial",
      image: "/images/slider-4.png", // fallback structure image
      title: "Industrial Development",
      description:
        "Large-scale industrial facilities engineered to the highest modern standards of performance.",
      href: "/projects?category=industrial",
      delayMs: 300,
    },
  ];

  return (
    <section className="relative overflow-hidden py-20 md:py-28 bg-slate-50">
      {/* Subtle light background accent */}
      <div className="absolute top-1/2 left-1/2 h-112.5 w-150 -translate-y-1/2 -translate-x-1/2 rounded-full bg-blue-100/30 blur-[120px] pointer-events-none" />

      <div className="relative mx-auto w-[min(1280px,calc(100%-48px))]">
        {/* Title Block */}
        <div
          ref={titleRef}
          className={`mx-auto max-w-162.5 text-center transition-all duration-700 ease-out ${
            titleVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-8"
          }`}
        >
          {/* Category Tag Pill */}
          <span className="inline-flex rounded-full border border-blue-100 bg-blue-50 px-3.5 py-1 text-xs font-bold uppercase tracking-[0.15em] text-blue-600">
            What We Build
          </span>

          <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl md:text-5xl">
            Our Core Services
          </h2>

          <p className="mt-4 text-base leading-relaxed text-slate-500">
            Comprehensive construction solutions tailored to your exact vision
            and requirements
          </p>
        </div>

        {/* Cards Grid */}
        <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <ServiceCard
              key={service.id}
              tag={service.tag}
              image={service.image}
              title={service.title}
              description={service.description}
              href={service.href}
              delayMs={service.delayMs}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
