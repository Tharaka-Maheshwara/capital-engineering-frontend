"use client";

import Image from "next/image";
import { useState, useEffect, useCallback } from "react";

const slides = [
  {
    id: 1,
    src: "/images/slider-1.png",
    alt: "High-rise building construction with steel framework",
    tag: "Structural Engineering",
    title: "Building Towering Structures with Precision",
    description:
      "From foundation to skyline, we deliver high-rise construction projects with world-class engineering standards and safety compliance.",
  },
  {
    id: 2,
    src: "/images/slider-2.png",
    alt: "Modern bridge infrastructure construction over river",
    tag: "Infrastructure Development",
    title: "Engineering Bridges That Connect Communities",
    description:
      "Our infrastructure expertise spans bridges, highways and civil works — built to endure decades of service with uncompromising quality.",
  },
  {
    id: 3,
    src: "/images/slider-3.png",
    alt: "Modern luxury architectural building exterior at twilight",
    tag: "Architectural Design",
    title: "Designing Spaces That Inspire & Endure",
    description:
      "Contemporary architectural design meets functional excellence. We create buildings that are both aesthetically stunning and structurally sound.",
  },
  {
    id: 4,
    src: "/images/slider-4.png",
    alt: "Engineering team reviewing blueprints at construction site",
    tag: "Expert Engineering Team",
    title: "Driven by Expertise, Defined by Excellence",
    description:
      "Our seasoned team of civil engineers, architects and project managers collaborate to turn complex visions into remarkable built realities.",
  },
];

function ChevronLeftIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M15 18l-6-6 6-6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ChevronRightIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M9 18l6-6-6-6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function HeroSlider() {
  const [current, setCurrent] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [direction, setDirection] = useState<"left" | "right">("right");
  const [isPaused, setIsPaused] = useState(false);
  const [progress, setProgress] = useState(0);

  const SLIDE_DURATION = 5500;

  const goTo = useCallback(
    (index: number, dir: "left" | "right" = "right") => {
      if (isAnimating) return;
      setDirection(dir);
      setIsAnimating(true);
      setProgress(0);
      setTimeout(() => {
        setCurrent(index);
        setIsAnimating(false);
      }, 600);
    },
    [isAnimating]
  );

  const next = useCallback(() => {
    goTo((current + 1) % slides.length, "right");
  }, [current, goTo]);

  const prev = useCallback(() => {
    goTo((current - 1 + slides.length) % slides.length, "left");
  }, [current, goTo]);

  // Progress bar
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          return 0;
        }
        return p + 100 / (SLIDE_DURATION / 50);
      });
    }, 50);
    return () => clearInterval(interval);
  }, [isPaused, current]);

  // Auto-advance
  useEffect(() => {
    if (isPaused) return;
    const timer = setTimeout(() => {
      next();
    }, SLIDE_DURATION);
    return () => clearTimeout(timer);
  }, [current, isPaused, next]);

  return (
    <section
      id="hero"
      className="hero-slider-section"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      aria-label="Featured construction projects"
    >
      {/* Slides */}
      <div className="hero-slider-track">
        {slides.map((slide, idx) => {
          const isActive = idx === current;
          const animClass = isAnimating && isActive
            ? direction === "right"
              ? "hero-slide-enter-right"
              : "hero-slide-enter-left"
            : isActive
            ? "hero-slide-active"
            : "hero-slide-hidden";

          return (
            <div
              key={slide.id}
              className={`hero-slide ${animClass}`}
              aria-hidden={!isActive}
            >
              {/* Background Image */}
              <Image
                src={slide.src}
                alt={slide.alt}
                fill
                className="hero-slide-img"
                priority={idx === 0}
                sizes="100vw"
              />

              {/* Gradient overlay */}
              <div className="hero-gradient-overlay" />

              {/* Content */}
              <div className="hero-content-wrapper">
                <div className={`hero-content ${isActive && !isAnimating ? "hero-content-visible" : "hero-content-hidden"}`}>
                  <span className="hero-tag">{slide.tag}</span>
                  <h2 className="hero-title">{slide.title}</h2>
                  <p className="hero-description">{slide.description}</p>
                  <div className="hero-cta-group">
                    <a href="/projects" className="hero-btn-primary">
                      View Our Projects
                    </a>
                    <a href="/#contact" className="hero-btn-secondary">
                      Get a Quote
                    </a>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Controls */}
      <button
        className="hero-nav-btn hero-nav-prev"
        onClick={prev}
        aria-label="Previous slide"
      >
        <span className="hero-nav-icon">
          <ChevronLeftIcon />
        </span>
      </button>
      <button
        className="hero-nav-btn hero-nav-next"
        onClick={next}
        aria-label="Next slide"
      >
        <span className="hero-nav-icon">
          <ChevronRightIcon />
        </span>
      </button>

      {/* Dots + progress */}
      <div className="hero-bottom-bar">
        {/* Slide counter */}
        <span className="hero-counter">
          <span className="hero-counter-current">
            {String(current + 1).padStart(2, "0")}
          </span>
          <span className="hero-counter-sep">/</span>
          <span className="hero-counter-total">
            {String(slides.length).padStart(2, "0")}
          </span>
        </span>

        {/* Progress bar */}
        <div className="hero-progress-track">
          <div
            className="hero-progress-fill"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Dots */}
        <div className="hero-dots" role="tablist" aria-label="Slide navigation">
          {slides.map((slide, idx) => (
            <button
              key={slide.id}
              role="tab"
              aria-selected={idx === current}
              aria-label={`Go to slide ${idx + 1}: ${slide.tag}`}
              className={`hero-dot ${idx === current ? "hero-dot-active" : ""}`}
              onClick={() => goTo(idx, idx > current ? "right" : "left")}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
