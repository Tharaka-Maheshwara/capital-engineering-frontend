"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export default function FeaturedProjectSection() {
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
      className="relative overflow-hidden bg-slate-50 py-8 pb-20 md:py-12 md:pb-28"
    >
      <div
        className={`w-full transition-all duration-700 ease-out ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        <div className="relative overflow-hidden shadow-[0_20px_60px_rgba(15,23,42,0.15)] sm:mx-0">
          <div className="relative min-h-95 overflow-hidden sm:min-h-115 lg:min-h-130">
            <Image
              src="/images/slider-3.png"
              alt="Featured construction project"
              fill
              priority={false}
              sizes="(max-width: 768px) 100vw, 1280px"
              className="object-cover object-center"
            />

            <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(13,29,54,0.88)_0%,rgba(13,29,54,0.72)_40%,rgba(13,29,54,0.25)_70%,rgba(13,29,54,0.1)_100%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_50%,rgba(255,255,255,0.06),transparent_24%)]" />

            <div className="relative z-10 flex h-full items-center px-6 py-12 sm:px-10 md:px-14 lg:justify-start lg:px-16">
              <div className="max-w-140 text-white lg:translate-x-8 xl:translate-x-12">
                <span className="inline-flex rounded-full border border-white/15 bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.24em] text-slate-200/85 backdrop-blur-sm">
                  Featured Project
                </span>

                <h2 className="mt-6 max-w-[14ch] text-4xl font-extrabold leading-[1.08] tracking-[-0.04em] sm:text-5xl lg:text-6xl">
                  Skyline Urban Development – Downtown Core
                </h2>

                <p className="mt-6 max-w-[28ch] text-[1rem] leading-8 text-slate-100/85 sm:text-[1.08rem]">
                  A $22M mixed-use masterpiece spanning 12 floors of office
                  space, retail, and luxury residential units.
                </p>

                <div className="mt-8">
                  <Link
                    href="/projects"
                    className="inline-flex items-center gap-3 rounded-2xl bg-[#879bb6] px-6 py-4 text-sm font-bold text-white shadow-[0_12px_28px_rgba(0,0,0,0.18)] transition-transform duration-150 hover:-translate-y-0.5 hover:bg-[#98acc4] sm:px-7 sm:py-4 sm:text-[0.98rem]"
                  >
                    Explore Projects
                    <span aria-hidden="true" className="text-xl leading-none">
                      →
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
