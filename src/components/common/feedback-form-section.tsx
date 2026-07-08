"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import type { FormEvent } from "react";

import { getAuthSession, type AuthSession } from "@/lib/auth";
import { submitFeedback } from "@/lib/feedback";

function StarIcon({ filled }: { filled: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill={filled ? "currentColor" : "none"}
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="h-5 w-5"
    >
      <path d="M12 3.6l2.9 5.88 6.5.95-4.7 4.58 1.1 6.48L12 18.46l-5.8 3.03 1.1-6.48-4.7-4.58 6.5-.95L12 3.6z" />
    </svg>
  );
}

export default function FeedbackFormSection() {
  const [authSession, setAuthSession] = useState<AuthSession | null>(null);
  const [rating, setRating] = useState(5);
  const [message, setMessage] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    const updateAuthSession = () => {
      const session = getAuthSession();
      setAuthSession(session);
      setName(session?.user.name ?? "");
    };

    updateAuthSession();
    window.addEventListener("auth-session-changed", updateAuthSession);

    return () => {
      window.removeEventListener("auth-session-changed", updateAuthSession);
    };
  }, []);

  const isLoggedIn = Boolean(authSession?.user);
  const userName = useMemo(() => authSession?.user.name ?? "", [authSession]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setSuccess(null);

    if (!isLoggedIn || !authSession) {
      setError("Please log in before submitting feedback.");
      return;
    }

    const trimmedMessage = message.trim();
    if (!trimmedMessage) {
      setError("Please write your feedback message.");
      return;
    }

    try {
      await submitFeedback({
        token: authSession.token,
        rating,
        message: trimmedMessage,
      });

      setMessage("");
      setRating(5);
      setSuccess("Thanks. Your feedback has been published on the home page.");
    } catch (submitError) {
      setError(
        submitError instanceof Error
          ? submitError.message
          : "Failed to submit feedback.",
      );
    }
  }

  return (
    <section className="bg-slate-950 px-4 py-20 text-white sm:px-6 lg:px-8 lg:py-24">
      <div className="mx-auto grid w-full max-w-6xl gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
        <div>
          <span className="inline-flex rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.22em] text-slate-200/70 backdrop-blur-sm">
            Client Feedback
          </span>
          <h2 className="mt-6 text-4xl font-extrabold tracking-[-0.04em] text-white sm:text-5xl lg:text-6xl">
            Share your experience with us
          </h2>
          <p className="mt-5 max-w-2xl text-[1rem] leading-8 text-slate-300/80">
            Logged-in customers can leave a star rating and message. Once you
            submit it, the feedback appears immediately on the home page.
          </p>

          <div className="mt-8 rounded-3xl border border-white/10 bg-white/6 p-5">
            <div className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-200/70">
              Login Status
            </div>
            <p className="mt-2 text-[0.98rem] leading-7 text-slate-200/80">
              {isLoggedIn
                ? `Signed in as ${userName || "your account"}. Name is auto-filled below.`
                : "Please sign in first to unlock the feedback form."}
            </p>
            {!isLoggedIn ? (
              <Link
                href="/"
                className="mt-4 inline-flex rounded-2xl bg-white px-4 py-2.5 text-sm font-semibold text-slate-900 transition-transform duration-150 hover:-translate-y-0.5"
              >
                Go to Home and Sign In
              </Link>
            ) : null}
          </div>
        </div>

        <div className="rounded-[28px] border border-white/10 bg-white p-6 text-slate-900 shadow-[0_24px_60px_rgba(15,23,42,0.18)] sm:p-8">
          <form className="space-y-5" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm font-semibold text-slate-700">
                Your Name
              </label>
              <input
                type="text"
                value={name}
                readOnly
                className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition-colors focus:bg-white"
                placeholder="Your logged-in name"
              />
            </div>

            <div>
              <div className="flex items-center justify-between gap-4">
                <label className="block text-sm font-semibold text-slate-700">
                  Rating
                </label>
                <span className="text-sm font-medium text-slate-500">
                  {rating}/5
                </span>
              </div>
              <div className="mt-3 flex items-center gap-2">
                {Array.from({ length: 5 }, (_, index) => {
                  const starValue = index + 1;
                  const filled = starValue <= rating;

                  return (
                    <button
                      key={starValue}
                      type="button"
                      onClick={() => setRating(starValue)}
                      disabled={!isLoggedIn}
                      className={`flex h-11 w-11 items-center justify-center rounded-2xl border transition-colors duration-150 ${filled ? "border-amber-300 bg-amber-50 text-amber-500" : "border-slate-200 bg-slate-50 text-slate-300"} disabled:cursor-not-allowed disabled:opacity-70`}
                      aria-label={`Set rating to ${starValue} stars`}
                    >
                      <StarIcon filled={filled} />
                    </button>
                  );
                })}
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700">
                Message
              </label>
              <textarea
                value={message}
                onChange={(event) => setMessage(event.target.value)}
                disabled={!isLoggedIn}
                rows={5}
                className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition-colors placeholder:text-slate-400 focus:bg-white disabled:cursor-not-allowed disabled:bg-slate-100"
                placeholder="Write your feedback here..."
              />
            </div>

            {error ? (
              <div className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
                {error}
              </div>
            ) : null}

            {success ? (
              <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
                {success}
              </div>
            ) : null}

            <button
              type="submit"
              disabled={!isLoggedIn}
              className="inline-flex w-full items-center justify-center rounded-2xl bg-[linear-gradient(135deg,#10284a_0%,#23465e_100%)] px-5 py-3.5 text-sm font-semibold text-white shadow-[0_12px_28px_rgba(15,23,42,0.16)] transition-transform duration-150 hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60"
            >
              Submit Feedback
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
