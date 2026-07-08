import { Suspense } from "react";

import GoogleAuthCallbackClient from "./google-auth-callback-client";

export default function GoogleAuthCallbackPage() {
  return (
    <Suspense
      fallback={
        <main className="flex min-h-screen items-center justify-center bg-slate-950 px-6 text-slate-100">
          <div className="max-w-md rounded-3xl border border-white/10 bg-white/5 px-6 py-8 text-center shadow-[0_24px_60px_rgba(0,0,0,0.35)] backdrop-blur-md">
            <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-4 border-slate-700 border-t-blue-500"></div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-400">
              Google Auth
            </p>
            <h1 className="mt-3 text-xl font-bold tracking-[-0.04em] text-white">
              Completing Google sign-in...
            </h1>
          </div>
        </main>
      }
    >
      <GoogleAuthCallbackClient />
    </Suspense>
  );
}