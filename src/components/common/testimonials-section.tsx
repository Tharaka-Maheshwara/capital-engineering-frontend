"use client";

import { useEffect, useRef, useState } from "react";

import { fetchFeedbackEntries, type FeedbackEntry } from "@/lib/feedback";

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

  useEffect(() => {
    const loadFeedback = async () => {
      setIsLoading(true);

      try {
        setCustomerFeedback(await fetchFeedbackEntries(6));
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

  const visibleCustomerFeedback = customerFeedback.slice(0, 6);

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

          {!isLoading && visibleCustomerFeedback.length > 0 ? (
            <div className="mt-12">
              <div className="mx-auto max-w-3xl text-center">
                <h3 className="text-2xl font-bold tracking-[-0.03em] text-slate-900 sm:text-3xl">
                  Latest Customer Feedback
                </h3>
                <p className="mt-3 text-sm leading-7 text-slate-500">
                  Newly submitted feedback from the About Us page appears here
                  automatically.
                </p>
              </div>

              <div className="mt-8 grid gap-6 lg:grid-cols-3">
                {visibleCustomerFeedback.map((feedback, index) => (
                  <FeedbackCard
                    key={feedback.id}
                    feedback={feedback}
                    delayMs={index * 120}
                    isVisible={isVisible}
                  />
                ))}
              </div>
            </div>
          ) : null}

          {!isLoading && visibleCustomerFeedback.length === 0 ? (
            <div className="mt-12 rounded-3xl border border-slate-200 bg-white px-6 py-10 text-center shadow-[0_14px_40px_rgba(15,23,42,0.06)]">
              <p className="text-lg font-semibold text-slate-900">
                No customer feedback yet.
              </p>
              <p className="mt-2 text-sm leading-7 text-slate-500">
                Logged-in customers can submit the first review from the About
                Us page.
              </p>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
