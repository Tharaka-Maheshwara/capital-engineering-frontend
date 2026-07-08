"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import AdminSidebar from "@/components/admin/admin-sidebar";
import {
  clearAuthSession,
  getAuthSession,
  type AuthSession,
} from "@/lib/auth";

type ProjectApiRecord = {
  id: number;
  status?: string | null;
};

const apiBaseUrl =
  process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://127.0.0.1:8000";

export default function AdminDashboardPage() {
  const router = useRouter();
  const [authSession, setAuthSession] = useState<AuthSession | null>(null);
  const [projectCount, setProjectCount] = useState(0);
  const [projectTotals, setProjectTotals] = useState({
    planning: 0,
    ongoing: 0,
    completed: 0,
  });
  const [isLoadingProjects, setIsLoadingProjects] = useState(true);

  useEffect(() => {
    const updateAuthSession = () => {
      setAuthSession(getAuthSession());
    };

    updateAuthSession();
    window.addEventListener("auth-session-changed", updateAuthSession);

    return () => {
      window.removeEventListener("auth-session-changed", updateAuthSession);
    };
  }, []);

  useEffect(() => {
    let isMounted = true;

    async function loadProjectTotals() {
      setIsLoadingProjects(true);

      try {
        const response = await fetch(
          `${apiBaseUrl}/api/v1/projects?per_page=1000`,
          {
            cache: "no-store",
            headers: {
              Accept: "application/json",
            },
          },
        );

        if (!response.ok) {
          throw new Error("Failed to load project totals");
        }

        const payload = (await response.json()) as { data?: ProjectApiRecord[] };
        const projects = Array.isArray(payload.data) ? payload.data : [];

        if (!isMounted) {
          return;
        }

        setProjectCount(projects.length);
        setProjectTotals({
          planning: projects.filter((project) => project.status === "planning")
            .length,
          ongoing: projects.filter((project) => project.status === "ongoing")
            .length,
          completed: projects.filter((project) => project.status === "completed")
            .length,
        });
      } catch {
        if (!isMounted) {
          return;
        }

        setProjectCount(0);
        setProjectTotals({ planning: 0, ongoing: 0, completed: 0 });
      } finally {
        if (isMounted) {
          setIsLoadingProjects(false);
        }
      }
    }

    void loadProjectTotals();

    return () => {
      isMounted = false;
    };
  }, []);

  const displayName = authSession?.user.name.trim() || "Logged User Name";

  const handleLogout = () => {
    clearAuthSession();
    setAuthSession(null);
    router.push("/");
  };

  return (
    <main className="min-h-screen bg-[#f3f5f9] text-slate-900">
      <div className="flex min-h-screen flex-col lg:flex-row">
        <AdminSidebar activeHref="/admin/admin-dashboard" />

        <div className="flex-1 bg-[radial-gradient(circle_at_top_right,rgba(42,91,136,0.12),transparent_26%),linear-gradient(180deg,#f8fafc_0%,#edf2f7_100%)]">
          <header className="sticky top-0 z-20 border-b border-slate-200/80 bg-white/88 backdrop-blur-xl">
            <div className="flex items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
              <div>
                <p className="text-sm font-medium uppercase tracking-[0.22em] text-slate-500">
                  Dashboard
                </p>
                <h1 className="mt-1 text-2xl font-semibold tracking-[-0.04em] text-slate-900 sm:text-[2.15rem]">
                  Welcome, {displayName}!
                </h1>
              </div>

              <button
                type="button"
                onClick={handleLogout}
                className="inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-500 shadow-[0_10px_24px_rgba(15,23,42,0.08)] transition-transform duration-150 hover:-translate-y-0.5 hover:text-slate-700"
                aria-label="Logout"
              >
                <LogoutIcon />
              </button>
            </div>
          </header>

          <section className="px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
            <div className="rounded-[28px] border border-slate-200/70 bg-white p-6 shadow-[0_24px_60px_rgba(15,23,42,0.08)] sm:p-8">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.22em] text-slate-500">
                    Project Overview
                  </p>
                  <h2 className="mt-1 text-2xl font-semibold tracking-[-0.04em] text-slate-900 sm:text-[2rem]">
                    Actual Project Count
                  </h2>
                </div>
                <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                  {isLoadingProjects ? "Loading" : "Live"}
                </span>
              </div>

              <div className="mt-6 grid gap-4 lg:grid-cols-[1.2fr_1fr]">
                <article className="relative overflow-hidden rounded-[28px] bg-[linear-gradient(135deg,#10284a_0%,#23465e_100%)] p-6 text-white shadow-[0_18px_40px_rgba(15,23,42,0.16)]">
                  <p className="text-sm font-medium uppercase tracking-[0.2em] text-white/72">
                    Total Projects
                  </p>
                  <div className="mt-4 text-7xl font-semibold tracking-[-0.08em] text-white">
                    {String(projectCount).padStart(2, "0")}
                  </div>
                  <p className="mt-4 max-w-md text-sm leading-6 text-white/78">
                    This is the actual count loaded from the projects API.
                  </p>
                </article>

                <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
                  <PopupStatCard
                    label="Planning"
                    value={projectTotals.planning}
                    tone="from-sky-900 via-sky-800 to-slate-800"
                  />
                  <PopupStatCard
                    label="Ongoing"
                    value={projectTotals.ongoing}
                    tone="from-amber-900 via-amber-800 to-slate-800"
                  />
                  <PopupStatCard
                    label="Completed"
                    value={projectTotals.completed}
                    tone="from-emerald-900 via-emerald-800 to-slate-800"
                  />
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
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

function PopupStatCard({
  label,
  value,
  tone,
}: {
  label: string;
  value: number;
  tone: string;
}) {
  return (
    <article
      className={`rounded-3xl bg-linear-to-br ${tone} p-5 text-white shadow-[0_18px_40px_rgba(15,23,42,0.16)]`}
    >
      <p className="text-sm font-medium text-white/80">{label}</p>
      <div className="mt-3 text-5xl font-semibold tracking-[-0.08em] text-white">
        {String(value).padStart(2, "0")}
      </div>
    </article>
  );
}
