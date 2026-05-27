import type { ChangeEvent, FormEvent, ReactNode } from "react";

import type {
  ProjectFormState,
  ProjectRecord,
} from "@/components/admin/project-manager-types";

type ProjectFormModalProps = {
  isOpen: boolean;
  editingProjectId: number | null;
  editingProject: ProjectRecord | null;
  submitting: boolean;
  form: ProjectFormState;
  fieldInputClass: string;
  districts: string[];
  mediaResetKey: number;
  displayImageFile: File | null;
  displayPreviewUrl: string | null;
  galleryImageFiles: File[];
  onClose: () => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  onDisplayImageChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onGalleryImagesChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onRemoveGalleryImage: (index: number) => void;
  onFieldChange: <K extends keyof ProjectFormState>(
    key: K,
    value: ProjectFormState[K],
  ) => void;
};

export default function ProjectFormModal({
  isOpen,
  editingProjectId,
  editingProject,
  submitting,
  form,
  fieldInputClass,
  districts,
  mediaResetKey,
  displayImageFile,
  displayPreviewUrl,
  galleryImageFiles,
  onClose,
  onSubmit,
  onDisplayImageChange,
  onGalleryImagesChange,
  onRemoveGalleryImage,
  onFieldChange,
}: ProjectFormModalProps) {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/55 px-4 py-6 backdrop-blur-sm">
      <div className="max-h-[92vh] w-full max-w-4xl overflow-y-auto rounded-3xl border border-slate-200/90 bg-white p-5 shadow-[0_20px_60px_rgba(15,23,42,0.25)] sm:p-6">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
              Project form
            </p>
            <h2 className="mt-1 text-xl font-semibold tracking-[-0.03em] text-slate-900">
              {editingProjectId === null ? "Add new project" : "Edit project"}
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="inline-flex h-11 items-center justify-center rounded-2xl border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-600 hover:bg-slate-50"
          >
            Close
          </button>
        </div>

        <form className="mt-6 space-y-5" onSubmit={onSubmit}>
          <section className="rounded-3xl border border-slate-200/80 bg-slate-50/80 p-4 sm:p-5">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
                  Project Media
                </p>
              </div>
            </div>

            {(editingProject?.featured_image_thumbnail ||
              displayPreviewUrl) && (
              <div className="mt-4 rounded-3xl border border-slate-200 bg-white p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
                  {displayPreviewUrl
                    ? "Selected image preview"
                    : "Current image"}
                </p>
                <div className="mt-3 overflow-hidden rounded-2xl border border-slate-200 bg-slate-50">
                  <img
                    src={
                      displayPreviewUrl ??
                      editingProject?.featured_image_thumbnail ??
                      ""
                    }
                    alt={
                      editingProject?.featured_image_alt ||
                      form.title ||
                      "Project image"
                    }
                    className="h-48 w-full object-cover"
                  />
                </div>
              </div>
            )}

            <div className="mt-4 grid gap-4 lg:grid-cols-2">
              <label className="block rounded-3xl border border-dashed border-sky-200 bg-white p-4">
                <span className="block text-[0.85rem] font-semibold uppercase tracking-[0.16em] text-slate-500">
                  Display Image *
                </span>
                <span className="mt-2 block text-sm leading-6 text-slate-500">
                  Select one primary image for the project card or hero area.
                </span>
                <input
                  key={`display-${mediaResetKey}`}
                  type="file"
                  accept="image/*"
                  onChange={onDisplayImageChange}
                  className="mt-4 block w-full cursor-pointer rounded-2xl border border-slate-200 bg-slate-50 px-3 py-3 text-sm text-slate-600 file:mr-4 file:rounded-xl file:border-0 file:bg-slate-900 file:px-4 file:py-2.5 file:text-sm file:font-semibold file:text-white hover:bg-slate-100"
                />
                <div className="mt-3 min-h-12 rounded-2xl bg-slate-50 px-4 py-3 text-sm text-slate-500">
                  {displayImageFile ? (
                    <span className="inline-flex items-center rounded-full bg-sky-100 px-3 py-1 text-sm font-medium text-sky-700">
                      {displayImageFile.name}
                    </span>
                  ) : (
                    "No display image selected yet."
                  )}
                </div>
              </label>

              <label className="block rounded-3xl border border-dashed border-slate-300 bg-white p-4">
                <span className="block text-[0.85rem] font-semibold uppercase tracking-[0.16em] text-slate-500">
                  Gallery Images
                </span>
                <span className="mt-2 block text-sm leading-6 text-slate-500">
                  Select multiple images for the project gallery.
                </span>
                <input
                  key={`gallery-${mediaResetKey}`}
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={onGalleryImagesChange}
                  className="mt-4 block w-full cursor-pointer rounded-2xl border border-slate-200 bg-slate-50 px-3 py-3 text-sm text-slate-600 file:mr-4 file:rounded-xl file:border-0 file:bg-slate-900 file:px-4 file:py-2.5 file:text-sm file:font-semibold file:text-white hover:bg-slate-100"
                />
                <div className="mt-3 rounded-2xl bg-slate-50 px-4 py-3 text-sm text-slate-500">
                  {galleryImageFiles.length > 0 ? (
                    <>
                      <div className="mb-2 text-sm font-medium text-slate-700">
                        {galleryImageFiles.length} images selected
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {galleryImageFiles.map((file, index) => (
                          <span
                            key={`${file.name}-${index}`}
                            className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1 text-xs font-medium text-slate-600 shadow-sm"
                          >
                            <span className="max-w-48 truncate">
                              {file.name}
                            </span>
                            <button
                              type="button"
                              onClick={() => onRemoveGalleryImage(index)}
                              className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-slate-100 text-slate-500 transition-colors hover:bg-rose-100 hover:text-rose-700"
                              aria-label={`Remove ${file.name}`}
                            >
                              ×
                            </button>
                          </span>
                        ))}
                      </div>
                    </>
                  ) : (
                    "No gallery images selected yet."
                  )}
                </div>
              </label>
            </div>
          </section>

          <div className="grid gap-4 md:grid-cols-2">
            <Field label="Title *">
              <input
                className={fieldInputClass}
                value={form.title}
                onChange={(event) => onFieldChange("title", event.target.value)}
                placeholder="Central Plaza Tower"
                required
              />
            </Field>

            <Field label="Status *">
              <select
                className={fieldInputClass}
                value={form.status}
                onChange={(event) =>
                  onFieldChange(
                    "status",
                    event.target.value as ProjectFormState["status"],
                  )
                }
              >
                <option value="planning">Planning</option>
                <option value="ongoing">Ongoing</option>
                <option value="completed">Completed</option>
              </select>
            </Field>

            <Field label="Type *">
              <select
                className={fieldInputClass}
                value={form.type}
                onChange={(event) =>
                  onFieldChange("type", event.target.value as ProjectFormState["type"])
                }
                required
              >
                <option value="commercial">Commercial</option>
                <option value="residential">Residential</option>
                <option value="industrial">Industrial</option>
              </select>
            </Field>

            <Field label="Location *">
              <input
                className={fieldInputClass}
                list="project-location-options"
                value={form.location}
                onChange={(event) =>
                  onFieldChange("location", event.target.value)
                }
                placeholder="Start typing a location"
                required
              />
              <datalist id="project-location-options">
                {districts.map((district) => (
                  <option key={district} value={district} />
                ))}
              </datalist>
            </Field>

            <Field label="Client *">
              <input
                className={fieldInputClass}
                value={form.client}
                onChange={(event) =>
                  onFieldChange("client", event.target.value)
                }
                placeholder="Capital Holdings"
                required
              />
            </Field>

            <Field label="Area">
              <input
                className={fieldInputClass}
                value={form.area}
                onChange={(event) => onFieldChange("area", event.target.value)}
                placeholder="24,000 sq ft"
              />
            </Field>

            <Field label="Project Price">
              <input
                className={fieldInputClass}
                value={form.price}
                onChange={(event) => onFieldChange("price", event.target.value)}
                placeholder="15000000"
                inputMode="decimal"
              />
            </Field>

            <Field label="Project Duration" fullWidth>
              <div className="grid gap-3 sm:grid-cols-2">
                <div>
                  <span className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-400">
                    Start date
                  </span>
                  <input
                    className={fieldInputClass}
                    type="date"
                    value={form.startDate}
                    onChange={(event) =>
                      onFieldChange("startDate", event.target.value)
                    }
                  />
                </div>
                <div>
                  <span className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-400">
                    End date
                  </span>
                  <input
                    className={fieldInputClass}
                    type="date"
                    min={form.startDate || undefined}
                    value={form.endDate}
                    onChange={(event) =>
                      onFieldChange("endDate", event.target.value)
                    }
                  />
                </div>
              </div>
            </Field>

            <Field label="Description *" fullWidth>
              <textarea
                className={`${fieldInputClass} min-h-44 resize-y`}
                value={form.description}
                onChange={(event) =>
                  onFieldChange("description", event.target.value)
                }
                placeholder="Write the full project brief, scope, and delivery notes."
                required
              />
            </Field>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              type="submit"
              disabled={submitting}
              className="inline-flex items-center justify-center rounded-2xl bg-[linear-gradient(135deg,#10284a_0%,#23465e_100%)] px-5 py-3.5 text-sm font-semibold text-white shadow-[0_16px_34px_rgba(3,15,31,0.2)] transition-transform duration-150 hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {submitting
                ? editingProjectId === null
                  ? "Saving project..."
                  : "Updating project..."
                : editingProjectId === null
                  ? "Save project"
                  : "Update project"}
            </button>

            <button
              type="button"
              onClick={onClose}
              className="inline-flex items-center justify-center rounded-2xl border border-slate-200 bg-white px-5 py-3.5 text-sm font-semibold text-slate-700 hover:bg-slate-50"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function Field({
  label,
  children,
  fullWidth,
}: {
  label: string;
  children: ReactNode;
  fullWidth?: boolean;
}) {
  return (
    <label className={fullWidth ? "md:col-span-2" : ""}>
      <span className="mb-2 block text-[0.85rem] font-semibold uppercase tracking-[0.16em] text-slate-500">
        {label}
      </span>
      {children}
    </label>
  );
}
