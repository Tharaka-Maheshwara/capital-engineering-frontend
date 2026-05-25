"use client";

import React, { useEffect, useState } from "react";

type AuthMode = "login" | "signup";

type AuthModalProps = {
  open: boolean;
  onClose: () => void;
};

function CloseIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M6 6l12 12"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path
        d="M18 6L6 18"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default function AuthModal({ open, onClose }: AuthModalProps) {
  const [mode, setMode] = useState<AuthMode>("login");

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  useEffect(() => {
    if (open) {
      setMode("login");
    }
  }, [open]);

  if (!open) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-80 flex items-center justify-center bg-slate-950/65 px-4 py-6 backdrop-blur-sm"
      role="presentation"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="auth-modal-title"
        className="relative w-full max-w-xl overflow-hidden rounded-4xl border border-slate-200 bg-white shadow-[0_30px_90px_rgba(2,12,27,0.32)]"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          aria-label="Close dialog"
          onClick={onClose}
          className="absolute right-4 top-4 z-10 inline-flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-slate-600 transition-colors hover:bg-slate-200 hover:text-slate-900"
        >
          <CloseIcon />
        </button>

        <section className="p-5 sm:p-7 lg:p-8">
          <div className="inline-flex rounded-full bg-slate-100 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
            Client Access
          </div>

          <div className="mt-4">
            <div>
              <h2
                id="auth-modal-title"
                className="text-2xl font-extrabold tracking-[-0.04em] text-slate-900 sm:text-3xl"
              >
                {mode === "login"
                  ? "Sign in to continue"
                  : "Create your account"}
              </h2>

              <p className="mt-2 max-w-xl text-sm leading-6 text-slate-600">
                {mode === "login"
                  ? "Access project updates, quotes, and support from one secure place."
                  : "Set up your account to submit requests, track communication, and stay updated."}
              </p>
            </div>
          </div>

          <div className="mt-6">
            {mode === "login" ? <LoginForm /> : <SignupForm />}
          </div>

          <div className="mt-5 text-center text-sm text-slate-600">
            <span>
              {mode === "login"
                ? "Need an account? "
                : "Already have an account? "}
            </span>
            <button
              type="button"
              onClick={() => setMode(mode === "login" ? "signup" : "login")}
              className="font-semibold text-[#20395f] transition-colors hover:text-[#12263b]"
            >
              {mode === "login" ? "Sign up" : "Sign in"}
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}

function LoginForm() {
  return (
    <form className="space-y-4">
      <div>
        <label className="block text-sm font-semibold text-slate-700">
          Email Address
        </label>
        <input
          type="email"
          autoComplete="email"
          placeholder="john@example.com"
          className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition-colors placeholder:text-slate-400 focus:border-[#7e92ad] focus:bg-white"
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-slate-700">
          Password
        </label>
        <input
          type="password"
          autoComplete="current-password"
          placeholder="Enter your password"
          className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition-colors placeholder:text-slate-400 focus:border-[#7e92ad] focus:bg-white"
        />
      </div>

      <div className="flex items-center justify-between gap-4 pt-1 text-sm">
        <label className="inline-flex items-center gap-2 text-slate-600">
          <input
            type="checkbox"
            className="h-4 w-4 rounded border-slate-300 text-[#20395f] focus:ring-[#20395f]"
          />
          Remember me
        </label>

        <button type="button" className="font-semibold text-[#20395f]">
          Forgot password?
        </button>
      </div>

      <button
        type="submit"
          className="inline-flex w-full items-center justify-center rounded-2xl bg-[linear-gradient(180deg,#20395f_0%,#16324a_100%)] px-4 py-3 font-semibold text-white shadow-[0_16px_34px_rgba(32,57,95,0.24)] transition-transform duration-150 hover:-translate-y-0.5"
      >
        Sign In
      </button>
    </form>
  );
}

function SignupForm() {
  return (
    <form className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="block text-sm font-semibold text-slate-700">
            Full Name
          </label>
          <input
            type="text"
            autoComplete="name"
            placeholder="John Smith"
            className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition-colors placeholder:text-slate-400 focus:border-[#7e92ad] focus:bg-white"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700">
            Phone Number
          </label>
          <input
            type="tel"
            autoComplete="tel"
            placeholder="+94 77 123 4567"
            className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition-colors placeholder:text-slate-400 focus:border-[#7e92ad] focus:bg-white"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-semibold text-slate-700">
          Email Address
        </label>
        <input
          type="email"
          autoComplete="email"
          placeholder="john@example.com"
          className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition-colors placeholder:text-slate-400 focus:border-[#7e92ad] focus:bg-white"
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="block text-sm font-semibold text-slate-700">
            Password
          </label>
          <input
            type="password"
            autoComplete="new-password"
            placeholder="Create a password"
            className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition-colors placeholder:text-slate-400 focus:border-[#7e92ad] focus:bg-white"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700">
            Confirm Password
          </label>
          <input
            type="password"
            autoComplete="new-password"
            placeholder="Repeat password"
            className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition-colors placeholder:text-slate-400 focus:border-[#7e92ad] focus:bg-white"
          />
        </div>
      </div>

      <label className="flex items-start gap-3 pt-1 text-sm text-slate-600">
        <input
          type="checkbox"
          className="mt-1 h-4 w-4 rounded border-slate-300 text-[#20395f] focus:ring-[#20395f]"
        />
        <span>
          I agree to the terms of service and privacy policy.
        </span>
      </label>

      <button
        type="submit"
        className="inline-flex w-full items-center justify-center rounded-2xl bg-[linear-gradient(180deg,#20395f_0%,#16324a_100%)] px-4 py-3 font-semibold text-white shadow-[0_16px_34px_rgba(32,57,95,0.24)] transition-transform duration-150 hover:-translate-y-0.5"
      >
        Create Account
      </button>
    </form>
  );
}
