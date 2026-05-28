import React from "react";
import Link from "next/link";

type Project = {
  id: number;
  title: string;
  description: string;
  location: string;
  price: string | null;
  start_date: string | null;
  end_date: string | null;
  featured_image_og: string | null;
  featured_image_thumbnail: string | null;
  type?: string | null;
};

export default function ProjectsGrid({ projects }: { projects: Project[] }) {
  if (!projects || projects.length === 0) {
    return (
      <div className="py-12 text-center text-slate-600">No projects found.</div>
    );
  }

  return (
    <section className="bg-white pb-12 pt-0">
      <div className="mb-8 bg-[#1f3f6f]">
        <div className="mx-auto flex max-w-7xl items-center gap-4 px-4 py-5 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-semibold text-white">Projects</h2>
          <nav className="flex gap-3 text-sm text-slate-200">
            <button className="rounded-full bg-white/20 px-4 py-1.5 text-white">
              All Projects
            </button>
            <button className="px-3 py-1.5 text-slate-100">Commercial</button>
            <button className="px-3 py-1.5 text-slate-100">Residential</button>
            <button className="px-3 py-1.5 text-slate-100">Industrial</button>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((p) => {
            const year = p.end_date
              ? new Date(p.end_date).getFullYear()
              : p.start_date
                ? new Date(p.start_date).getFullYear()
                : undefined;
            const img =
              p.featured_image_thumbnail ?? p.featured_image_og ?? null;

            return (
              <article
                key={p.id}
                className="group overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-[0_14px_40px_rgba(15,23,42,0.10)] ring-1 ring-transparent transition-all duration-300 hover:-translate-y-1 hover:border-slate-200 hover:ring-blue-200/60 hover:shadow-[0_24px_70px_rgba(15,23,42,0.18)]"
              >
                <div className="relative">
                  <div className="relative aspect-16/10 w-full overflow-hidden bg-slate-100">
                    {img ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={img}
                        alt={p.title}
                        className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      />
                    ) : null}

                    <div className="absolute inset-0 bg-linear-to-t from-slate-950/10 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  </div>

                  {p.type ? (
                    <div className="absolute left-4 top-4 inline-flex items-center rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-sky-800 shadow-[0_6px_18px_rgba(15,23,42,0.12)] backdrop-blur-sm">
                      {p.type.charAt(0).toUpperCase() + p.type.slice(1)}
                    </div>
                  ) : null}

                  {year ? (
                    <div className="absolute right-4 top-4 inline-flex items-center rounded-full bg-slate-900/80 px-3 py-1 text-xs font-semibold text-white shadow-[0_6px_18px_rgba(15,23,42,0.18)] backdrop-blur-sm">
                      {year}
                    </div>
                  ) : null}
                </div>

                <div className="border-t border-slate-100/80 bg-linear-to-b from-white to-slate-50/60 p-6">
                  <h3 className="text-lg font-semibold text-slate-900 transition-colors duration-300 group-hover:text-[#1f3f6f]">
                    {p.title}
                  </h3>
                  <p className="mt-3 line-clamp-3 text-sm text-slate-600">
                    {p.description}
                  </p>

                  <ul className="mt-5 space-y-3 text-sm text-slate-600">
                    <li className="flex items-center gap-3">
                      <svg
                        className="h-4 w-4 text-slate-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M12 11c1.657 0 3-1.567 3-3.5S13.657 4 12 4 9 5.567 9 7.5 10.343 11 12 11z"
                        ></path>
                        <path
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M12 22s8-4.5 8-11.5S14.866 2 12 2 4 6.5 4 10.5 12 22 12 22z"
                        ></path>
                      </svg>
                      <span>{p.location}</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <svg
                        className="h-4 w-4 text-slate-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M3 8h18M7 4h10v4H7z"
                        ></path>
                        <path
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-7"
                        ></path>
                      </svg>
                      <span>{year ? `Completed ${year}` : "In progress"}</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <svg
                        className="h-4 w-4 text-slate-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M12 8c-4 0-6 2-6 4s2 4 6 4 6-2 6-4-2-4-6-4z"
                        ></path>
                      </svg>
                      <span>
                        {p.price
                          ? `Project Value: ${p.price}`
                          : "Project Value: —"}
                      </span>
                    </li>
                  </ul>

                  <div className="mt-6 flex justify-end">
                    <Link
                      href={`/projects/${p.id}`}
                      className="inline-flex items-center rounded-md bg-[#1f3f6f] px-4 py-2 text-sm font-semibold text-white shadow-sm transition-colors duration-200 hover:bg-[#163154]"
                    >
                      More details
                    </Link>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
