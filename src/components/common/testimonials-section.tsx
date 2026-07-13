"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { fetchFeedbackEntries, type FeedbackEntry } from "@/lib/feedback";
import { getAuthSession, type AuthSession } from "@/lib/auth";

function FeedbackStarIcon({ filled }: { filled: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill={filled ? "currentColor" : "none"}
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
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

function FeedbackCard({
  feedback,
  delayMs,
  isVisible,
}: {
  feedback: FeedbackEntry;
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
        {Array.from({ length: 5 }, (_, index) => (
          <span key={index} className="h-4 w-4">
            <FeedbackStarIcon filled={index < feedback.rating} />
          </span>
        ))}
      </div>

      <div className="mt-6 text-[0.98rem] leading-8 text-slate-600">
        <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-2xl bg-slate-50 text-[#7188a6]">
          <span className="h-5 w-5">
            <QuoteIcon />
          </span>
        </div>
        <p>{feedback.message}</p>
      </div>

      <div className="mt-7 flex items-center gap-4">
        <div className="flex h-12 w-12 flex-none items-center justify-center rounded-full bg-linear-to-br from-slate-700 to-slate-500 text-sm font-bold text-white shadow-[0_10px_20px_rgba(15,23,42,0.18)]">
          {feedback.name
            .trim()
            .split(/\s+/)
            .map((part) => part[0])
            .slice(0, 2)
            .join("")
            .toUpperCase() || "U"}
        </div>
        <div>
          <h3 className="text-sm font-bold text-slate-900">{feedback.name}</h3>
          <p className="text-xs text-slate-500">Customer feedback</p>
        </div>
      </div>
    </article>
  );
}

export default function TestimonialsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [customerFeedback, setCustomerFeedback] = useState<FeedbackEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [authSession, setAuthSession] = useState<AuthSession | null>(null);

  useEffect(() => {
    const updateAuthSession = () => {
      setAuthSession(getAuthSession());
    };
    updateAuthSession();
    window.addEventListener("auth-session-changed", updateAuthSession);
    return () => {
      window.removeEventListener("auth-session-changed", updateAuthSession);
    };
  }, []);

  useEffect(() => {
    const loadFeedback = async () => {
      setIsLoading(true);

      try {
        setCustomerFeedback(await fetchFeedbackEntries(12));
      } catch {
        setCustomerFeedback([]);
      } finally {
        setIsLoading(false);
      }
    };

    const handleFeedbackUpdated = () => {
      void loadFeedback();
    };

    void loadFeedback();
    window.addEventListener("feedback-updated", handleFeedbackUpdated);

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

    return () => {
      observer.disconnect();
      window.removeEventListener("feedback-updated", handleFeedbackUpdated);
    };
  }, []);

  const feedbackPageSize = 3;
  const totalPages = Math.max(
    1,
    Math.ceil(customerFeedback.length / feedbackPageSize),
  );
  const currentPage = Math.min(carouselIndex, totalPages - 1);
  const visibleCustomerFeedback = useMemo(
    () =>
      customerFeedback.slice(
        currentPage * feedbackPageSize,
        currentPage * feedbackPageSize + feedbackPageSize,
      ),
    [currentPage, customerFeedback],
  );

  const totalRatings = customerFeedback.length;
  const averageRating = totalRatings > 0 
    ? (customerFeedback.reduce((acc, curr) => acc + curr.rating, 0) / totalRatings).toFixed(1) 
    : "0.0";

  useEffect(() => {
    setCarouselIndex((index) => Math.min(index, totalPages - 1));
  }, [totalPages]);

  function moveCarousel(direction: "previous" | "next") {
    setCarouselIndex((index) => {
      if (direction === "previous") {
        return Math.max(0, index - 1);
      }

      return Math.min(totalPages - 1, index + 1);
    });
  }

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
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
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

          {isLoading ? (
            <div className="mt-12 rounded-3xl border border-slate-200 bg-white px-5 py-4 text-sm text-slate-500 shadow-[0_14px_40px_rgba(15,23,42,0.06)]">
              Loading customer feedback...
            </div>
          ) : null}

          {!isLoading && customerFeedback.length > 0 ? (
            <div className="mt-12 mb-8 rounded-2xl border border-slate-100 bg-white px-8 py-6 shadow-[0_4px_20px_rgba(0,0,0,0.03)] flex flex-col sm:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-5">
                <div className="text-[2.75rem] font-bold text-[#003b9f] leading-none tracking-tight">
                  {averageRating}
                </div>
                <div>
                  <div className="flex items-center gap-1 text-[#fbbd0a]">
                    {Array.from({ length: 5 }, (_, index) => {
                      const fillPercentage = Math.max(0, Math.min(1, parseFloat(averageRating) - index));
                      return (
                        <div key={index} className="relative h-[22px] w-[22px]">
                          <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.8"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="absolute inset-0 text-slate-200"
                          >
                            <path d="M12 3.6l2.9 5.88 6.5.95-4.7 4.58 1.1 6.48L12 18.46l-5.8 3.03 1.1-6.48-4.7-4.58 6.5-.95L12 3.6z" />
                          </svg>
                          <svg
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            stroke="currentColor"
                            strokeWidth="1.8"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="absolute inset-0 text-[#fbbd0a]"
                            style={{ clipPath: `inset(0 ${100 - fillPercentage * 100}% 0 0)` }}
                          >
                            <path d="M12 3.6l2.9 5.88 6.5.95-4.7 4.58 1.1 6.48L12 18.46l-5.8 3.03 1.1-6.48-4.7-4.58 6.5-.95L12 3.6z" />
                          </svg>
                        </div>
                      );
                    })}
                  </div>
                  <div className="mt-1 text-[0.8rem] text-slate-400">
                    Based on {totalRatings} ratings
                  </div>
                </div>
              </div>

              <div>
                {authSession ? (
                  <Link
                    href="/rate-us"
                    className="inline-flex items-center gap-2.5 rounded-lg bg-[#0044b3] px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#00338a]"
                  >
                    <span className="h-4 w-4">
                      <FeedbackStarIcon filled={false} />
                    </span>
                    Leave your rating
                  </Link>
                ) : (
                  <Link
                    href="/auth/login"
                    className="inline-flex items-center gap-2.5 rounded-lg bg-[#0044b3] px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#00338a]"
                  >
                    <span className="h-4 w-4">
                      <FeedbackStarIcon filled={false} />
                    </span>
                    Sign in to rate
                  </Link>
                )}
              </div>
            </div>
          ) : null}

          {!isLoading && visibleCustomerFeedback.length > 0 ? (
            <div>
              <div className="grid gap-5 lg:grid-cols-[auto_minmax(0,1fr)_auto] lg:items-center">
                <div className="flex justify-center lg:justify-start">
                  <button
                    type="button"
                    onClick={() => moveCarousel("previous")}
                    disabled={currentPage === 0}
                    className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 shadow-[0_10px_24px_rgba(15,23,42,0.08)] transition-transform duration-150 hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-40"
                    aria-label="Show previous feedback"
                  >
                    <span className="text-2xl leading-none">&lt;</span>
                  </button>
                </div>

                <div className="grid gap-6 lg:grid-cols-3">
                  {visibleCustomerFeedback.map((feedback, index) => (
                    <FeedbackCard
                      key={feedback.id}
                      feedback={feedback}
                      delayMs={index * 120}
                      isVisible={isVisible}
                    />
                  ))}
                </div>

                <div className="flex justify-center lg:justify-end">
                  <button
                    type="button"
                    onClick={() => moveCarousel("next")}
                    disabled={currentPage >= totalPages - 1}
                    className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 shadow-[0_10px_24px_rgba(15,23,42,0.08)] transition-transform duration-150 hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-40"
                    aria-label="Show next feedback"
                  >
                    <span className="text-2xl leading-none">&gt;</span>
                  </button>
                </div>
              </div>
            </div>
          ) : null}

          {!isLoading && visibleCustomerFeedback.length === 0 ? (
            <div className="mt-12 rounded-3xl border border-slate-200 bg-white px-6 py-10 text-center shadow-[0_14px_40px_rgba(15,23,42,0.06)]">
              <p className="text-lg font-semibold text-slate-900">
                No customer feedback yet.
              </p>
              <div className="mt-4">
                {authSession ? (
                  <Link
                    href="/rate-us"
                    className="inline-flex items-center gap-2 rounded-lg bg-[#0044b3] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#00338a]"
                  >
                    <span className="h-4 w-4">
                      <FeedbackStarIcon filled={false} />
                    </span>
                    Leave the first rating
                  </Link>
                ) : (
                  <Link
                    href="/auth/login"
                    className="inline-flex items-center gap-2 rounded-lg bg-[#0044b3] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#00338a]"
                  >
                    <span className="h-4 w-4">
                      <FeedbackStarIcon filled={false} />
                    </span>
                    Sign in to rate
                  </Link>
                )}
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
