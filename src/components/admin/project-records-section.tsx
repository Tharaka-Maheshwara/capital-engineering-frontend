import type { ProjectRecord } from "@/components/admin/project-manager-types";

type ProjectRecordsSectionProps = {
  projects: ProjectRecord[];
  loadingProjects: boolean;
  deletingProjectId: number | null;
  onEdit: (project: ProjectRecord) => void;
  onDelete: (projectId: number) => void;
};

export default function ProjectRecordsSection({
  projects,
  loadingProjects,
  deletingProjectId,
  onEdit,
  onDelete,
}: ProjectRecordsSectionProps) {
  return (
    <section className="rounded-3xl border border-slate-200/80 bg-white p-5 shadow-[0_18px_40px_rgba(15,23,42,0.08)]">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
            Project records
          </p>
          <h2 className="mt-1 text-xl font-semibold tracking-[-0.03em] text-slate-900">
            Saved projects
          </h2>
        </div>
        <span className="text-sm font-medium text-slate-500">
          {loadingProjects ? "Loading..." : `${projects.length} items`}
        </span>
      </div>

      <div className="mt-5 space-y-3">
        {projects.map((project) => (
          <article
            key={project.id}
            className="rounded-[18px] border border-slate-200 bg-slate-50/80 px-4 py-4"
          >
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div className="flex items-start gap-4">
                <div className="flex h-16 w-16 items-center justify-center overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                  {project.featured_image_thumbnail ? (
                    <img
                      src={project.featured_image_thumbnail}
                      alt={project.featured_image_alt ?? project.title}
                      className="h-full w-full object-cover"
                      loading="lazy"
                    />
                  ) : (
                    <span className="text-sm font-semibold text-slate-400">
                      N/A
                    </span>
                  )}
                </div>
                <div>
                  <h3 className="text-[1rem] font-semibold text-slate-900">
                    {project.title}
                  </h3>
                  <p className="mt-1 text-sm text-slate-600">
                    {project.location} · {project.client}
                  </p>
                  {project.area && (
                    <p className="mt-1 text-xs uppercase tracking-[0.12em] text-slate-500">
                      Area: {project.area}
                    </p>
                  )}
                </div>
              </div>

              <span className="shrink-0 rounded-full bg-white px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-slate-500 shadow-sm">
                {project.status_label}
              </span>
            </div>

            <div className="mt-4 flex items-center gap-2">
              <button
                type="button"
                onClick={() => onEdit(project)}
                className="inline-flex items-center justify-center rounded-xl border border-slate-300 bg-white px-3 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-slate-700 transition-colors hover:bg-slate-100"
              >
                Edit
              </button>
              <button
                type="button"
                onClick={() => onDelete(project.id)}
                disabled={deletingProjectId === project.id}
                className="inline-flex items-center justify-center rounded-xl border border-rose-200 bg-rose-50 px-3 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-rose-700 transition-colors hover:bg-rose-100 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {deletingProjectId === project.id ? "Deleting..." : "Delete"}
              </button>
            </div>
          </article>
        ))}

        {!loadingProjects && projects.length === 0 && (
          <div className="rounded-[18px] border border-dashed border-slate-200 bg-slate-50 px-4 py-5 text-sm text-slate-500">
            No projects yet. Click Add New Project to create the first entry.
          </div>
        )}
      </div>
    </section>
  );
}
