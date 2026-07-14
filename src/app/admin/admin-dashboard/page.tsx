"use client";

import { useEffect, useState } from "react";
import AdminLayout from "@/components/admin/admin-layout";

type ProjectApiRecord = {
  id: number;
  status?: string | null;
};

const apiBaseUrl =
  process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://127.0.0.1:8000";

export default function AdminDashboardPage() {
  const [projectCount, setProjectCount] = useState(0);
  const [projectTotals, setProjectTotals] = useState({
    planning: 0,
    ongoing: 0,
    completed: 0,
  });
  const [isLoadingProjects, setIsLoadingProjects] = useState(true);

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

        const payload = (await response.json()) as {
          data?: ProjectApiRecord[];
        };
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
          completed: projects.filter(
            (project) => project.status === "completed",
          ).length,
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

  return (
    <AdminLayout
      activeHref="/admin/admin-dashboard"
      title="Dashboard"
      pageTitle="Welcome, {name}!"
    >
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
    </AdminLayout>
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

