"use client";

import React, { useEffect, useState } from "react";
import { GoogleLogin } from "@react-oauth/google";

type AuthMode = "login" | "signup";

type AuthModalProps = {
  open: boolean;
  onClose: () => void;
};

type GoogleCredentialResponse = {
  credential?: string;
};

type AuthUser = {
  id: number;
  name: string;
  email: string;
  role: string;
  avatar: string | null;
  created_at: string | null;
};

type AuthPayload = {
  token: string;
  user: AuthUser;
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
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const apiBaseUrl =
    process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://127.0.0.1:8000";
  const googleClientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID ?? "";

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  function saveAuthSession(data: AuthPayload) {
    if (typeof window !== "undefined") {
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
    }
  }

  // Google ලොගින් එක සාර්ථක වූ විට ක්‍රියාත්මක වන කොටස
  async function handleGoogleSuccess(
    credentialResponse: GoogleCredentialResponse,
  ) {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${apiBaseUrl}/api/v1/auth/google`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          id_token: credentialResponse.credential, // Google එකෙන් දුන්න ටෝකන් එක Backend එකට යැවීම
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result.message || "Google authentication failed on backend.",
        );
      }

      // Backend එකෙන් දෙන Token සහ User data සේව් කිරීම
      saveAuthSession({
        token: result.data.token,
        user: result.data.user,
      });

      setSuccess("Signed in successfully with Google!");
      setTimeout(() => {
        onClose();
        window.location.reload(); // දත්ත යාවත්කාලීන වීමට page එක reload කිරීම
      }, 1000);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (mode === "signup" && password !== confirmPassword) {
      setError("Password confirmation does not match.");
      return;
    }
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const endpoint = mode === "login" ? "login" : "register";
      const payload =
        mode === "login"
          ? { email, password }
          : { name, email, password, password_confirmation: confirmPassword };

      const response = await fetch(`${apiBaseUrl}/api/v1/${endpoint}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (!response.ok) {
        const validationMessage = result.errors
          ? Object.values(result.errors).flat().filter(Boolean).join(" ")
          : null;
        throw new Error(
          validationMessage || result.message || "Authentication failed.",
        );
      }

      saveAuthSession({ token: result.data.token, user: result.data.user });
      setSuccess(result.message ?? "Success!");
      onClose();
      window.location.reload();
    } catch (submitError: unknown) {
      setError(
        submitError instanceof Error
          ? submitError.message
          : "Authentication failed.",
      );
    } finally {
      setLoading(false);
    }
  }

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-80 flex items-center justify-center bg-slate-950/65 px-4 py-6 backdrop-blur-sm">
      <div
        className="relative w-full max-w-xl overflow-hidden rounded-4xl border border-slate-200 bg-white shadow-[0_30px_90px_rgba(2,12,27,0.32)]"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 z-10 inline-flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-slate-600 hover:bg-slate-200"
        >
          <CloseIcon />
        </button>

        <section className="p-5 sm:p-7 lg:p-8">
          <div className="inline-flex rounded-full bg-slate-100 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
            Client Access
          </div>

          <div className="mt-4">
            <h2 className="text-2xl font-extrabold tracking-[-0.04em] text-slate-900 sm:text-3xl">
              {mode === "login" ? "Sign in to continue" : "Create your account"}
            </h2>
          </div>

          {googleClientId ? (
            <div className="mt-6 flex justify-center">
              <div className="w-full max-w-[320px]">
                <GoogleLogin
                  onSuccess={handleGoogleSuccess}
                  onError={() => setError("Google authentication failed.")}
                  ux_mode="popup" // 🛠️ Popup ක්‍රමයට සකසා ඇත
                  theme="outline"
                  shape="rectangular"
                  text="signin_with"
                  width={320}
                />
              </div>
            </div>
          ) : null}

          <div className="mt-6 flex items-center justify-center">
            <div className="h-px w-full bg-slate-200"></div>
            <span className="px-4 text-xs font-medium uppercase tracking-wider text-slate-400">
              Or
            </span>
            <div className="h-px w-full bg-slate-200"></div>
          </div>

          <div className="mt-6">
            <form className="space-y-4" onSubmit={handleSubmit}>
              {mode === "signup" && (
                <div>
                  <label className="block text-sm font-semibold text-slate-700">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="John Smith"
                    className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none focus:bg-white"
                  />
                </div>
              )}

              <div>
                <label className="block text-sm font-semibold text-slate-700">
                  Email Address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="john@example.com"
                  className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700">
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password"
                  className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none focus:bg-white"
                />
              </div>

              {mode === "signup" && (
                <div>
                  <label className="block text-sm font-semibold text-slate-700">
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Repeat password"
                    className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none focus:bg-white"
                  />
                </div>
              )}

              {error && (
                <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                  {error}
                </div>
              )}
              {success && (
                <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
                  {success}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="inline-flex w-full items-center justify-center rounded-2xl bg-[linear-gradient(180deg,#20395f_0%,#16324a_100%)] px-4 py-3 font-semibold text-white disabled:opacity-70"
              >
                {loading
                  ? "Please wait..."
                  : mode === "login"
                    ? "Sign In"
                    : "Create Account"}
              </button>
            </form>
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
              className="font-semibold text-[#20395f] hover:text-[#12263b]"
            >
              {mode === "login" ? "Sign up" : "Sign in"}
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}
