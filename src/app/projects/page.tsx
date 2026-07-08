import React from "react";
import ProjectsGrid from "@/components/projects/projects-grid";

const apiBase = process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://127.0.0.1:8000";

type ProjectsPageProps = {
  searchParams?: Promise<{ category?: string | string[] }>;
};

export default async function ProjectsPage({
  searchParams,
}: ProjectsPageProps) {
  const resolvedSearchParams = searchParams ? await searchParams : undefined;
  const category = Array.isArray(resolvedSearchParams?.category)
    ? resolvedSearchParams?.category[0]
    : resolvedSearchParams?.category;

  let projects: any[] = [];
  try {
    const res = await fetch(`${apiBase}/api/v1/projects?per_page=12`, {
      cache: "no-store",
      headers: {
        Accept: "application/json",
      },
    });
    if (res.ok) {
      const payload = (await res.json()) as { data?: any[] };
      projects = Array.isArray(payload?.data) ? payload.data : [];
    } else {
      console.error(
        `Failed to fetch projects: ${res.status} ${res.statusText}`,
      );
    }
  } catch (error) {
    console.error("Error fetching projects:", error);
  }

  return (
    <main>
      <section className="relative overflow-hidden bg-slate-900">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/images/slider-2.png')" }}
          aria-hidden="true"
        />
        <div
          className="absolute inset-0 bg-[linear-gradient(115deg,rgba(15,23,42,0.88)_0%,rgba(15,23,42,0.7)_38%,rgba(15,23,42,0.45)_65%,rgba(15,23,42,0.78)_100%)]"
          aria-hidden="true"
        />

        <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sky-200/90">
            Our Portfolio
          </p>
          <h1 className="mt-3 max-w-3xl text-3xl font-semibold leading-tight tracking-[-0.02em] text-white sm:text-4xl lg:text-5xl">
            Projects That Define Modern Construction Standards
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-7 text-slate-200 sm:text-lg">
            Explore Capital Engineering projects across commercial, residential,
            and industrial sectors with a focus on quality, innovation, and
            lasting value.
          </p>
        </div>
      </section>

      <ProjectsGrid projects={projects} initialCategory={category} />
    </main>
  );
}
