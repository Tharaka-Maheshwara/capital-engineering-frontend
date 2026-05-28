import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";

interface Props {
  params: Promise<{ slug: string }>;
}

type ProjectDetail = {
  id: number;
  title: string;
  status: string;
  status_label: string;
  type: string | null;
  location: string;
  client: string;
  area: string | null;
  price: string | null;
  start_date: string | null;
  end_date: string | null;
  description: string | null;
  meta_description: string | null;
  featured_image_url: string | null;
  featured_image_thumbnail: string | null;
  featured_image_og: string | null;
  featured_image_alt: string | null;
  gallery: string[];
  published_at: string | null;
};

const apiBase = process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://127.0.0.1:8000";

function formatDate(value: string | null): string {
  if (!value) {
    return "Not specified";
  }

  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) {
    return value;
  }

  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    year: "numeric",
  }).format(parsed);
}

function formatProjectType(type: string | null, statusLabel: string): string {
  if (!type) {
    return statusLabel;
  }

  return type.charAt(0).toUpperCase() + type.slice(1);
}

async function getProject(id: string): Promise<ProjectDetail | null> {
  const response = await fetch(`${apiBase}/api/v1/projects/${id}`, {
    cache: "no-store",
  });

  if (!response.ok) {
    return null;
  }

  const payload = (await response.json()) as { data?: ProjectDetail };
  return payload?.data ?? null;
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = await getProject(slug);

  if (!project) {
    notFound();
  }

  const heroImage =
    project.featured_image_og ?? project.featured_image_url ?? null;
  const gallery = Array.isArray(project.gallery) ? project.gallery : [];
  const completionDate = formatDate(project.end_date ?? project.start_date);
  const projectType = formatProjectType(project.type, project.status_label);
  const heroAlt = project.featured_image_alt ?? project.title;

  return (
    <main className="bg-slate-50 text-slate-900">
      <section className="border-b border-slate-200/80 bg-[linear-gradient(135deg,rgba(240,245,250,1)_0%,rgba(227,236,247,1)_100%)]">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#1f3f6f] transition-colors hover:text-[#163154]"
          >
            <span aria-hidden="true">←</span>
            Back to projects
          </Link>

          <p className="mt-6 text-sm font-semibold uppercase tracking-[0.24em] text-slate-500">
            Project details
          </p>
          <h1 className="mt-2 max-w-4xl text-3xl font-semibold tracking-[-0.04em] text-slate-950 sm:text-4xl lg:text-5xl">
            {project.title}
          </h1>
          <p className="mt-4 max-w-3xl text-base leading-7 text-slate-600 sm:text-lg">
            {project.meta_description ?? project.description ?? project.location}
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
        <div className="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-[0_18px_60px_rgba(15,23,42,0.10)]">
          <div className="grid gap-0 lg:grid-cols-[1.45fr_0.9fr]">
            <div className="relative min-h-80 bg-slate-100 sm:min-h-105 lg:min-h-160">
              {heroImage ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={heroImage}
                  alt={heroAlt}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full min-h-80 items-center justify-center bg-[linear-gradient(135deg,rgba(29,58,97,0.15),rgba(148,163,184,0.28))] p-8 text-center sm:min-h-105 lg:min-h-160">
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-500">
                      Project image
                    </p>
                    <p className="mt-3 text-lg text-slate-700">
                      Featured image is not available for this project yet.
                    </p>
                  </div>
                </div>
              )}

              <div className="absolute left-5 top-5 inline-flex rounded-full bg-white/90 px-3 py-1.5 text-xs font-semibold text-slate-700 shadow-[0_6px_18px_rgba(15,23,42,0.12)] backdrop-blur-sm">
                {projectType}
              </div>

              <div className="absolute bottom-5 left-5 right-5 rounded-2xl bg-slate-950/72 p-4 text-white shadow-[0_18px_40px_rgba(15,23,42,0.22)] backdrop-blur-sm sm:max-w-88">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-200/80">
                  Overview
                </p>
                <p className="mt-2 text-sm leading-6 text-slate-100/90">
                  {project.meta_description ?? project.description ?? project.title}
                </p>
              </div>
            </div>

            <div className="border-t border-slate-200 bg-[linear-gradient(180deg,rgba(248,250,252,1)_0%,rgba(241,245,249,1)_100%)] p-6 sm:p-8 lg:border-l lg:border-t-0 lg:p-10">
              <div className="flex flex-wrap items-center gap-3">
                <span className="rounded-full bg-[#1f3f6f] px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-white">
                  {project.status_label}
                </span>
                {project.type ? (
                  <span className="rounded-full border border-slate-300 bg-white px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-slate-600">
                    {projectType}
                  </span>
                ) : null}
              </div>

              <h2 className="mt-5 text-2xl font-semibold tracking-[-0.03em] text-slate-950 sm:text-3xl">
                Built with precision and delivered to spec.
              </h2>

              <div className="mt-6 space-y-4 text-sm leading-7 text-slate-600">
                <p>
                  This project is located in {project.location} and was delivered
                  for {project.client}.
                </p>
                <p>
                  Construction details, image assets, and project metadata below
                  are pulled directly from the projects table via the API.
                </p>
              </div>

              <div className="mt-8 grid gap-4">
                <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                    Client
                  </p>
                  <p className="mt-2 text-base font-semibold text-slate-900">
                    {project.client}
                  </p>
                </div>
                <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                    Completion Date
                  </p>
                  <p className="mt-2 text-base font-semibold text-slate-900">
                    {completionDate}
                  </p>
                </div>
                <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                    Location
                  </p>
                  <p className="mt-2 text-base font-semibold text-slate-900">
                    {project.location}
                  </p>
                </div>
                <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                    Area / Value
                  </p>
                  <p className="mt-2 text-base font-semibold text-slate-900">
                    {project.area ?? project.price ?? "Not specified"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_10px_30px_rgba(15,23,42,0.06)]">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
              Client
            </p>
            <p className="mt-2 text-base font-semibold text-slate-900">
              {project.client}
            </p>
          </article>
          <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_10px_30px_rgba(15,23,42,0.06)]">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
              Completion Date
            </p>
            <p className="mt-2 text-base font-semibold text-slate-900">
              {completionDate}
            </p>
          </article>
          <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_10px_30px_rgba(15,23,42,0.06)]">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
              Location
            </p>
            <p className="mt-2 text-base font-semibold text-slate-900">
              {project.location}
            </p>
          </article>
          <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_10px_30px_rgba(15,23,42,0.06)]">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
              Project Type
            </p>
            <p className="mt-2 text-base font-semibold text-slate-900">
              {projectType}
            </p>
          </article>
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-[1.3fr_0.7fr]">
          <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-[0_12px_35px_rgba(15,23,42,0.06)] sm:p-8">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">
              Project Description
            </p>
            <div
              className="prose mt-4 max-w-none prose-headings:tracking-[-0.03em] prose-p:text-slate-600 prose-li:text-slate-600 prose-strong:text-slate-900"
              dangerouslySetInnerHTML={{
                __html: project.description ?? "No project description available.",
              }}
            />
          </section>

          <aside className="rounded-3xl border border-slate-200 bg-[linear-gradient(180deg,rgba(31,63,111,0.06)_0%,rgba(255,255,255,1)_48%)] p-6 shadow-[0_12px_35px_rgba(15,23,42,0.06)] sm:p-8">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">
              Project Facts
            </p>
            <dl className="mt-4 space-y-4">
              <div className="rounded-2xl border border-slate-200 bg-white p-4">
                <dt className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
                  Status
                </dt>
                <dd className="mt-2 text-sm font-semibold text-slate-900">
                  {project.status_label}
                </dd>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-white p-4">
                <dt className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
                  Start Date
                </dt>
                <dd className="mt-2 text-sm font-semibold text-slate-900">
                  {formatDate(project.start_date)}
                </dd>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-white p-4">
                <dt className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
                  Project Value
                </dt>
                <dd className="mt-2 text-sm font-semibold text-slate-900">
                  {project.price ? project.price : "Not specified"}
                </dd>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-white p-4">
                <dt className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
                  Area
                </dt>
                <dd className="mt-2 text-sm font-semibold text-slate-900">
                  {project.area ?? "Not specified"}
                </dd>
              </div>
            </dl>
          </aside>
        </div>

        {gallery.length > 0 ? (
          <section className="mt-8">
            <div className="flex items-end justify-between gap-4">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">
                  Gallery
                </p>
                <h2 className="mt-2 text-2xl font-semibold tracking-[-0.03em] text-slate-950">
                  Additional project visuals
                </h2>
              </div>
            </div>

            <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {gallery.map((image, index) => (
                <div
                  key={`${image}-${index}`}
                  className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_10px_28px_rgba(15,23,42,0.08)]"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={image}
                    alt={`${project.title} gallery image ${index + 1}`}
                    className="h-44 w-full object-cover transition-transform duration-300 hover:scale-105"
                  />
                </div>
              ))}
            </div>
          </section>
        ) : null}
      </section>
    </main>
  );
}
