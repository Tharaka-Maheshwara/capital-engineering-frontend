"use client";

import React, { useState } from "react";
import { GoogleLogin } from "@react-oauth/google";
import { saveAuthSession } from "@/lib/auth";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

type GoogleCredentialResponse = {
  credential?: string;
};

export default function SignUpPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const apiBaseUrl =
    process.env.NEXT_PUBLIC_API_BASE_URL ??
    "https://capital-engineering-backend.onrender.com";
  const googleClientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID ?? "";

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
          id_token: credentialResponse.credential,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result.message || "Google authentication failed on backend.",
        );
      }

      saveAuthSession({
        token: result.data.token,
        user: result.data.user,
      });

      setSuccess("Signed in successfully with Google!");
      setTimeout(() => {
        if (result.data.user.role === "admin") {
          router.push("/admin/admin-dashboard");
        } else {
          router.push("/");
        }
      }, 1000);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (password !== confirmPassword) {
      setError("Password confirmation does not match.");
      return;
    }
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const response = await fetch(`${apiBaseUrl}/api/v1/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
          password_confirmation: confirmPassword,
        }),
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
      setTimeout(() => {
        if (result.data.user.role === "admin") {
          router.push("/admin/admin-dashboard");
        } else {
          router.push("/");
        }
      }, 800);
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

  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-16">
      <div className="w-full max-w-xl">
        {/* Logo */}
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

        {/* Card */}
        <div className="overflow-hidden rounded-4xl border border-white/10 bg-white shadow-[0_30px_90px_rgba(2,12,27,0.32)]">
          <section className="p-5 sm:p-7 lg:p-8">
            <div className="inline-flex rounded-full bg-slate-100 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
              Client Access
            </div>

            <div className="mt-4">
              <h1 className="text-2xl font-extrabold tracking-[-0.04em] text-slate-900 sm:text-3xl">
                Create your account
              </h1>
            </div>

            {googleClientId ? (
              <div className="mt-6 flex justify-center">
                <div className="w-full max-w-[320px]">
                  <GoogleLogin
                    onSuccess={handleGoogleSuccess}
                    onError={() => setError("Google authentication failed.")}
                    ux_mode="popup"
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
                <div>
                  <label className="block text-sm font-semibold text-slate-700">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="John Smith"
                    required
                    className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="john@example.com"
                    required
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
                    required
                    className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700">
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Repeat password"
                    required
                    className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none focus:bg-white"
                  />
                </div>

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
                  {loading ? "Please wait..." : "Create Account"}
                </button>
              </form>
            </div>

            <div className="mt-5 text-center text-sm text-slate-600">
              <span>Already have an account? </span>
              <Link
                href="/auth/login"
                className="font-semibold text-[#20395f] hover:text-[#12263b]"
              >
                Sign in
              </Link>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
