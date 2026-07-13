"use client";

import { useEffect, useMemo, useState } from "react";
import type { FormEvent } from "react";
import { getAuthSession, type AuthSession } from "@/lib/auth";
import { submitFeedback } from "@/lib/feedback";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";

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

export default function RateUsPage() {
  const router = useRouter();
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
      setSuccess("Thank you for your feedback! Redirecting...");
      
      setTimeout(() => {
        router.push("/");
      }, 1000);
    } catch (submitError) {
      setError(
        submitError instanceof Error
          ? submitError.message
          : "Failed to submit feedback.",
      );
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-16">
      <div className="w-full max-w-xl">
        {/* Logo and Back Link */}
        <div className="mb-8 flex flex-col items-center gap-3">
          <Link href="/">
            <Image
              src="/images/logo.png"
              alt="Capital Engineering Logo"
              width={72}
              height={72}
              className="rounded-[18px] bg-white/5 p-1.5 shadow-[0_12px_28px_rgba(0,0,0,0.24)]"
              priority
            />
          </Link>
          <Link
            href="/"
            className="text-sm font-medium text-slate-400 hover:text-slate-200 transition-colors"
          >
            ← Back to Home
          </Link>
        </div>

        <div className="overflow-hidden rounded-[28px] border border-white/10 bg-white shadow-[0_30px_90px_rgba(2,12,27,0.32)]">
          <section className="p-6 sm:p-8 lg:p-10">
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label className="block text-sm font-semibold text-[#1a3150]">
                  Your Name
                </label>
                <input
                  type="text"
                  value={name}
                  readOnly
                  className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-[#1a3150] outline-none transition-colors focus:bg-white placeholder:text-slate-400"
                  placeholder="Your logged-in name"
                />
              </div>

              <div>
                <div className="flex items-center justify-between gap-4">
                  <label className="block text-sm font-semibold text-[#1a3150]">
                    Rating
                  </label>
                  <span className="text-sm font-medium text-[#1a3150]">
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
                        className={`flex h-11 w-11 items-center justify-center rounded-2xl border transition-colors duration-150 ${
                          filled
                            ? "border-amber-300 bg-amber-50 text-amber-500"
                            : "border-slate-200 bg-slate-50 text-slate-300"
                        } disabled:cursor-not-allowed disabled:opacity-70 hover:scale-105 active:scale-95`}
                        aria-label={`Set rating to ${starValue} stars`}
                      >
                        <StarIcon filled={filled} />
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-[#1a3150]">
                  Message
                </label>
                <textarea
                  value={message}
                  onChange={(event) => setMessage(event.target.value)}
                  disabled={!isLoggedIn}
                  rows={5}
                  className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-[#1a3150] outline-none transition-colors placeholder:text-slate-400 focus:bg-white disabled:cursor-not-allowed disabled:bg-slate-100 resize-none"
                  placeholder="Write your feedback here..."
                />
              </div>

              {error ? (
                <div className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm font-medium text-rose-700">
                  {error}
                </div>
              ) : null}

              {success ? (
                <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700">
                  {success}
                </div>
              ) : null}

              <div className="mt-8 flex flex-col-reverse sm:flex-row items-center gap-4">
                <Link
                  href="/"
                  className="inline-flex w-full sm:w-auto items-center justify-center rounded-2xl px-5 py-4 text-[0.98rem] font-semibold text-slate-500 transition-all duration-200 hover:bg-slate-100 hover:text-slate-700"
                >
                  Cancel
                </Link>
                <button
                  type="submit"
                  disabled={!isLoggedIn}
                  className="inline-flex w-full items-center justify-center rounded-2xl bg-[#7c8b99] px-5 py-4 text-[0.98rem] font-semibold text-white shadow-sm transition-all duration-200 hover:bg-[#6c7b89] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  Submit Feedback
                </button>
              </div>
            </form>
          </section>
        </div>
      </div>
    </div>
  );
}
