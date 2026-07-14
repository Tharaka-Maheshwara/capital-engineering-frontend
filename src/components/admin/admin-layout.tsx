"use client";

import { useState, type ReactNode } from "react";
import AdminSidebar from "@/components/admin/admin-sidebar";
import { clearAuthSession, getAuthSession, type AuthSession } from "@/lib/auth";
import { useRouter } from "next/navigation";

function HamburgerIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-6 w-6"
    >
      <path d="M3 12h18M3 6h18M3 18h18" />
    </svg>
  );
}

function LogoutIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-5 w-5"
      aria-hidden="true"
    >
      <path d="M10 17l5-5-5-5M15 12H3m12-7h3a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1h-3" />
    </svg>
  );
}

export default function AdminLayout({
  children,
  activeHref,
  title,
  pageTitle,
}: {
  children: ReactNode;
  activeHref: string;
  title: string;
  pageTitle: string;
}) {
  const router = useRouter();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const authSession = getAuthSession();

  const displayName = authSession?.user.name.trim() || "Admin";

  const handleLogout = () => {
    clearAuthSession();
    router.push("/");
  };

  return (
    <main className="min-h-screen bg-[#f3f5f9] text-slate-900">
      <div className="flex min-h-screen flex-col lg:flex-row">
        <AdminSidebar
          activeHref={activeHref}
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
        />

        <div className="flex-1 bg-[radial-gradient(circle_at_top_right,rgba(42,91,136,0.12),transparent_26%),linear-gradient(180deg,#f8fafc_0%,#edf2f7_100%)]">
          <header className="sticky top-0 z-20 flex items-center justify-between gap-4 border-b border-slate-200/80 bg-white/88 px-4 py-4 backdrop-blur-xl sm:px-6 lg:px-8">
            <div className="flex items-center gap-4">
              <button
                type="button"
                onClick={() => setIsSidebarOpen(true)}
                className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 shadow-sm transition-colors hover:bg-slate-50 lg:hidden"
                aria-label="Open sidebar"
              >
                <HamburgerIcon />
              </button>
              <div>
                <p className="text-sm font-medium uppercase tracking-[0.22em] text-slate-500">
                  {title}
                </p>
                <h1 className="mt-1 text-2xl font-semibold tracking-[-0.04em] text-slate-900 sm:text-[2.15rem]">
                  {pageTitle.replace("{name}", displayName)}
                </h1>
              </div>
            </div>

            <button
              type="button"
              onClick={handleLogout}
              className="inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-500 shadow-[0_10px_24px_rgba(15,23,42,0.08)] transition-transform duration-150 hover:-translate-y-0.5 hover:text-slate-700"
              aria-label="Logout"
            >
              <LogoutIcon />
            </button>
          </header>

          <section className="px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
            {children}
          </section>
        </div>
      </div>
    </main>
  );
}
