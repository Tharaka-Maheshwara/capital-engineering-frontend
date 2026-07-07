"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { getAuthSession } from "@/lib/auth";
import AuthModal from "./auth-modal";

function LoadingSpinner() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white">
      <div className="h-10 w-10 animate-spin rounded-full border-4 border-slate-300 border-t-slate-900" />
    </div>
  );
}

export default function AuthGuard({
  children,
  allowedRoles,
}: {
  children: React.ReactNode;
  allowedRoles: string[];
}) {
  const router = useRouter();
  const [status, setStatus] = useState<"loading" | "authorized" | "unauthorized">("loading");

  const checkAuth = useCallback(() => {
    const session = getAuthSession();
    if (session?.user && allowedRoles.includes(session.user.role)) {
      setStatus("authorized");
    } else {
      setStatus("unauthorized");
    }
  }, [allowedRoles]);

  useEffect(() => {
    checkAuth();
    window.addEventListener("auth-session-changed", checkAuth);
    return () => {
      window.removeEventListener("auth-session-changed", checkAuth);
    };
  }, [checkAuth]);

  if (status === "loading") {
    return <LoadingSpinner />;
  }

  if (status === "authorized") {
    return <>{children}</>;
  }

  // status is "unauthorized"
  return <AuthModal open={true} onClose={() => router.push("/")} />;
}
