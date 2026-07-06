"use client";

import { useEffect } from "react";
import { clearAuthSession, saveAuthSession } from "@/lib/auth";
import { useRouter, useSearchParams } from "next/navigation";

export default function GoogleAuthCallbackPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const error = searchParams.get("error");
  const token = searchParams.get("token");
  const userParam = searchParams.get("user");

  const message = error ? decodeURIComponent(error) : "Completing Google sign-in...";

  useEffect(() => {
    if (!token || !userParam) {
      if (!error) {
        router.replace("/");
      }
      return;
    }

    try {
      const user = JSON.parse(decodeURIComponent(userParam)) as Parameters<typeof saveAuthSession>[0]["user"];

      saveAuthSession({
        token: decodeURIComponent(token),
        user,
      });
      router.replace("/");
    } catch (e) {
      console.error("Error parsing Google user payload:", e);
      clearAuthSession();
      router.replace("/");
    }
  }, [error, router, token, userParam]);

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-950 px-6 text-slate-100">
      <div className="max-w-md rounded-3xl border border-white/10 bg-white/5 px-6 py-8 text-center shadow-[0_24px_60px_rgba(0,0,0,0.35)] backdrop-blur-md">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-slate-700 border-t-blue-500 mx-auto mb-4"></div>
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-400">Google Auth</p>
        <h1 className="mt-3 text-xl font-bold tracking-[-0.04em] text-white">{message}</h1>
      </div>
    </main>
  );
}