import React from "react";
import ProjectsGrid from "@/components/projects/projects-grid";

const apiBase = process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://127.0.0.1:8000";

export default async function ProjectsPage() {
  const res = await fetch(`${apiBase}/api/v1/projects?per_page=12`, {
    cache: "no-store",
  });
  const payload = (await res.json()) as { data?: any[] };
  const projects = Array.isArray(payload?.data) ? payload.data : [];

  return (
    <main>
      <ProjectsGrid projects={projects} />
    </main>
  );
}
