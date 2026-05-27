"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import type { ChangeEvent, FormEvent, ReactNode } from "react";

type NavigationItem = {
  label: string;
  href: string;
  active?: boolean;
  icon: () => ReactNode;
};

type ProjectRecord = {
  id: number;
  title: string;
  status: string;
  status_label: string;
  location: string;
  client: string;
  area: string | null;
  description: string;
  meta_description: string | null;
  featured_image_url: string | null;
  featured_image_thumbnail: string | null;
  featured_image_alt: string | null;
  published_at: string | null;
};

type ProjectFormState = {
  title: string;
  description: string;
  status: "planning" | "ongoing" | "completed";
  location: string;
  client: string;
  area: string;
  metaDescription: string;
  featuredImageAlt: string;
};

const navigationItems: NavigationItem[] = [
  { label: "Dashboard", href: "/admin/admin-dashboard", icon: DashboardIcon },
  { label: "Services", href: "#", icon: LayersIcon },
  {
    label: "Projects",
    href: "/admin/projects",
    active: true,
    icon: FolderIcon,
  },
  { label: "Team", href: "#", icon: TeamIcon },
  { label: "Users", href: "#", icon: UsersIcon },
  { label: "Settings", href: "#", icon: SettingsIcon },
];

const initialFormState: ProjectFormState = {
  title: "",
  description: "",
  status: "planning",
  location: "",
  client: "",
  area: "",
  metaDescription: "",
  featuredImageAlt: "",
};

const apiBaseUrl =
  process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://127.0.0.1:8000";
const fieldInputClass =
  "mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-slate-900 shadow-[inset_0_1px_0_rgba(255,255,255,0.6)] outline-none transition-colors placeholder:text-slate-400 focus:border-sky-300 focus:bg-white";

export default function ProjectManager() {
  const [form, setForm] = useState<ProjectFormState>(initialFormState);
  const [projects, setProjects] = useState<ProjectRecord[]>([]);
  const [loadingProjects, setLoadingProjects] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProjectId, setEditingProjectId] = useState<number | null>(null);
  const [editingProject, setEditingProject] =
    useState<ProjectRecord | null>(null);
  const [deletingProjectId, setDeletingProjectId] = useState<number | null>(
    null,
  );
  const [displayImageFile, setDisplayImageFile] = useState<File | null>(null);
  const [displayPreviewUrl, setDisplayPreviewUrl] = useState<string | null>(
    null,
  );
  const [galleryImageFiles, setGalleryImageFiles] = useState<File[]>([]);
  const [mediaResetKey, setMediaResetKey] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    void loadProjects();
  }, []);

  useEffect(() => {
    if (!displayImageFile) {
      setDisplayPreviewUrl(null);
      return;
    }

    const objectUrl = URL.createObjectURL(displayImageFile);
    setDisplayPreviewUrl(objectUrl);

    return () => {
      URL.revokeObjectURL(objectUrl);
    };
  }, [displayImageFile]);

  async function loadProjects() {
    setLoadingProjects(true);
    setError(null);

    try {
      const response = await fetch(
        `${apiBaseUrl}/api/v1/projects?per_page=12`,
        {
          cache: "no-store",
        },
      );

      if (!response.ok) {
        throw new Error("Failed to load projects");
      }

      const payload = (await response.json()) as { data?: ProjectRecord[] };
      setProjects(Array.isArray(payload.data) ? payload.data : []);
    } catch (loadError) {
      setError(
        loadError instanceof Error
          ? loadError.message
          : "Failed to load projects",
      );
    } finally {
      setLoadingProjects(false);
    }
  }

  function updateField<K extends keyof ProjectFormState>(
    key: K,
    value: ProjectFormState[K],
  ) {
    setForm((current) => ({ ...current, [key]: value }));
  }

  function resetMediaFields() {
    setDisplayImageFile(null);
    setGalleryImageFiles([]);
    setMediaResetKey((current) => current + 1);
  }

  function handleDisplayImageChange(event: ChangeEvent<HTMLInputElement>) {
    setDisplayImageFile(event.target.files?.[0] ?? null);
  }

  function handleGalleryImagesChange(event: ChangeEvent<HTMLInputElement>) {
    setGalleryImageFiles(Array.from(event.target.files ?? []));
  }

  function removeGalleryImage(indexToRemove: number) {
    setGalleryImageFiles((current) =>
      current.filter((_, index) => index !== indexToRemove),
    );
  }

  function openCreateModal() {
    setEditingProjectId(null);
    setEditingProject(null);
    setForm(initialFormState);
    resetMediaFields();
    setError(null);
    setSuccess(null);
    setIsModalOpen(true);
  }

  function openEditModal(project: ProjectRecord) {
    setEditingProjectId(project.id);
    setEditingProject(project);
    setForm({
      title: project.title,
      description: project.description,
      status: project.status as ProjectFormState["status"],
      location: project.location,
      client: project.client,
      area: project.area ?? "",
      metaDescription: project.meta_description ?? "",
      featuredImageAlt: project.featured_image_alt ?? "",
    });
    resetMediaFields();
    setError(null);
    setSuccess(null);
    setIsModalOpen(true);
  }

  function closeModal() {
    if (submitting) {
      return;
    }

    setIsModalOpen(false);
    setEditingProjectId(null);
    setEditingProject(null);
    setForm(initialFormState);
    resetMediaFields();
  }

  async function readResponsePayload(
    response: Response,
  ): Promise<Record<string, unknown> | null> {
    const contentType = response.headers.get("content-type") ?? "";
    const bodyText = await response.text();

    if (!contentType.includes("application/json") || !bodyText) {
      return null;
    }

    try {
      return JSON.parse(bodyText) as Record<string, unknown>;
    } catch {
      return null;
    }
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setSuccess(null);

    if (!form.title || !form.description || !form.location || !form.client) {
      setError("Please complete the required project fields.");
      return;
    }

    setSubmitting(true);

    try {
      const isEditing = editingProjectId !== null;
      const endpoint = isEditing
        ? `${apiBaseUrl}/api/v1/projects/${editingProjectId}`
        : `${apiBaseUrl}/api/v1/projects`;
      const formData = new FormData();
      formData.append("title", form.title);
      formData.append("description", form.description);
      formData.append("status", form.status);
      formData.append("location", form.location);
      formData.append("client", form.client);
      if (form.area) {
        formData.append("area", form.area);
      }
      if (form.metaDescription) {
        formData.append("meta_description", form.metaDescription);
      }
      if (form.featuredImageAlt) {
        formData.append("featured_image_alt", form.featuredImageAlt);
      }
      if (displayImageFile) {
        formData.append("featured_image", displayImageFile);
      }

      const response = await fetch(endpoint, {
        method: isEditing ? "PUT" : "POST",
        headers: {
          Accept: "application/json",
        },
        body: formData,
      });

      const payload = await readResponsePayload(response);

      if (!response.ok) {
        const message =
          (payload?.message as string | undefined) ||
          (payload?.error as string | undefined) ||
          "Project could not be saved";
        throw new Error(message);
      }

      setSuccess(
        isEditing
          ? "Project updated successfully."
          : "Project saved successfully.",
      );
      setForm(initialFormState);
      resetMediaFields();
      setIsModalOpen(false);
      setEditingProjectId(null);
      await loadProjects();
    } catch (saveError) {
      setError(
        saveError instanceof Error
          ? saveError.message
          : "Project could not be saved",
      );
    } finally {
      setSubmitting(false);
    }
  }

  async function handleDelete(projectId: number) {
    if (!confirm("Delete this project? This action cannot be undone.")) {
      return;
    }

    setDeletingProjectId(projectId);
    setError(null);
    setSuccess(null);

    try {
      const response = await fetch(
        `${apiBaseUrl}/api/v1/projects/${projectId}`,
        {
          method: "DELETE",
          headers: {
            Accept: "application/json",
          },
        },
      );

      if (!response.ok) {
        const payload = await readResponsePayload(response);
        const message =
          (payload?.message as string | undefined) ||
          (payload?.error as string | undefined) ||
          "Project could not be deleted";
        throw new Error(message);
      }

      setSuccess("Project deleted successfully.");
      await loadProjects();
    } catch (deleteError) {
      setError(
        deleteError instanceof Error
          ? deleteError.message
          : "Project could not be deleted",
      );
    } finally {
      setDeletingProjectId(null);
    }
  }

  const projectTotals = {
    total: projects.length,
    planning: projects.filter((project) => project.status === "planning")
      .length,
    ongoing: projects.filter((project) => project.status === "ongoing").length,
    completed: projects.filter((project) => project.status === "completed")
      .length,
  };

  return (
    <main className="min-h-screen bg-[#f3f5f9] text-slate-900">
      <div className="flex min-h-screen flex-col lg:flex-row">
        <aside className="relative w-full overflow-hidden bg-[linear-gradient(180deg,#0c1d33_0%,#10284a_46%,#0a1627_100%)] text-slate-100 lg:sticky lg:top-0 lg:h-screen lg:w-70 lg:border-r lg:border-white/10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_82%_18%,rgba(92,153,190,0.18),transparent_18%),radial-gradient(circle_at_50%_80%,rgba(255,255,255,0.06),transparent_22%)]" />
          <div className="relative flex h-full flex-col px-5 py-6 sm:px-6 lg:px-5 lg:py-7">
            <div className="flex items-center gap-3 rounded-[22px] border border-white/10 bg-white/5 px-4 py-4 shadow-[0_18px_40px_rgba(0,0,0,0.18)] backdrop-blur-md">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.14)]">
                <span className="text-lg font-black tracking-[-0.06em]">
                  CE
                </span>
              </div>
              <div>
                <div className="text-[0.96rem] font-semibold uppercase tracking-[0.24em] text-slate-200/70">
                  Capital Engineering
                </div>
                <div className="text-[1.08rem] font-bold tracking-[-0.03em] text-white">
                  Project Manager
                </div>
              </div>
            </div>

            <nav
              className="mt-8 flex flex-1 flex-col gap-2"
              aria-label="Admin navigation"
            >
              {navigationItems.map((item) => {
                const Icon = item.icon;

                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    aria-current={item.active ? "page" : undefined}
                    className={`group flex items-center gap-3 rounded-[18px] px-4 py-3 text-[1rem] font-medium transition-colors duration-150 ${item.active ? "bg-white/14 text-white shadow-[0_14px_30px_rgba(0,0,0,0.16)]" : "text-slate-200/72 hover:bg-white/7 hover:text-white"}`}
                  >
                    <span
                      className={`flex h-9 w-9 items-center justify-center rounded-2xl border ${item.active ? "border-white/10 bg-white/10" : "border-white/5 bg-white/5"}`}
                    >
                      <Icon />
                    </span>
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </nav>

            <div className="mt-6 rounded-[22px] border border-white/10 bg-white/6 p-4 backdrop-blur-md">
              <div className="text-sm font-semibold text-white">
                Project Intake
              </div>
              <p className="mt-2 text-sm leading-6 text-slate-200/70">
                Add the project details, description, and SEO metadata directly
                into the backend.
              </p>
              <div className="mt-4 flex items-center justify-between rounded-2xl border border-sky-400/20 bg-sky-400/10 px-4 py-3 text-sm text-sky-200">
                <span>Connected</span>
                <span className="h-2.5 w-2.5 rounded-full bg-sky-300 shadow-[0_0_0_6px_rgba(56,189,248,0.12)]" />
              </div>
            </div>
          </div>
        </aside>

        <div className="flex-1 bg-[radial-gradient(circle_at_top_right,rgba(42,91,136,0.12),transparent_26%),linear-gradient(180deg,#f8fafc_0%,#edf2f7_100%)]">
          <header className="sticky top-0 z-20 border-b border-slate-200/80 bg-white/88 backdrop-blur-xl">
            <div className="flex items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
              <div>
                <p className="text-sm font-medium uppercase tracking-[0.22em] text-slate-500">
                  Project Management
                </p>
                <h1 className="mt-1 text-2xl font-semibold tracking-[-0.04em] text-slate-900 sm:text-[2.15rem]">
                  Projects
                </h1>
              </div>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={openCreateModal}
                  className="inline-flex h-12 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,#10284a_0%,#23465e_100%)] px-4 text-sm font-semibold text-white shadow-[0_10px_24px_rgba(15,23,42,0.18)] transition-transform duration-150 hover:-translate-y-0.5"
                >
                  Add New Project
                </button>
                <Link
                  href="/admin/admin-dashboard"
                  className="inline-flex h-12 items-center justify-center rounded-2xl border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-600 shadow-[0_10px_24px_rgba(15,23,42,0.08)] transition-transform duration-150 hover:-translate-y-0.5 hover:text-slate-800"
                >
                  Back to dashboard
                </Link>
              </div>
            </div>
          </header>

          <section className="px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
              <StatCard
                label="Total Projects"
                value={String(projectTotals.total).padStart(2, "0")}
                tone="from-slate-900 via-slate-800 to-slate-700"
              />
              <StatCard
                label="Planning"
                value={String(projectTotals.planning).padStart(2, "0")}
                tone="from-sky-900 via-sky-800 to-slate-800"
              />
              <StatCard
                label="Ongoing"
                value={String(projectTotals.ongoing).padStart(2, "0")}
                tone="from-emerald-900 via-emerald-800 to-slate-800"
              />
              <StatCard
                label="Completed"
                value={String(projectTotals.completed).padStart(2, "0")}
                tone="from-amber-900 via-amber-800 to-slate-800"
              />
            </div>

            {error && (
              <div className="mt-6 rounded-2xl border border-rose-400/20 bg-rose-400/10 px-4 py-3 text-sm text-rose-700">
                {error}
              </div>
            )}

            {success && (
              <div className="mt-6 rounded-2xl border border-emerald-400/20 bg-emerald-400/10 px-4 py-3 text-sm text-emerald-700">
                {success}
              </div>
            )}

            <div className="mt-6">
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
                    {loadingProjects
                      ? "Loading..."
                      : `${projects.length} items`}
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
                          onClick={() => openEditModal(project)}
                          className="inline-flex items-center justify-center rounded-xl border border-slate-300 bg-white px-3 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-slate-700 transition-colors hover:bg-slate-100"
                        >
                          Edit
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDelete(project.id)}
                          disabled={deletingProjectId === project.id}
                          className="inline-flex items-center justify-center rounded-xl border border-rose-200 bg-rose-50 px-3 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-rose-700 transition-colors hover:bg-rose-100 disabled:cursor-not-allowed disabled:opacity-60"
                        >
                          {deletingProjectId === project.id
                            ? "Deleting..."
                            : "Delete"}
                        </button>
                      </div>
                    </article>
                  ))}

                  {!loadingProjects && projects.length === 0 && (
                    <div className="rounded-[18px] border border-dashed border-slate-200 bg-slate-50 px-4 py-5 text-sm text-slate-500">
                      No projects yet. Click Add New Project to create the first
                      entry.
                    </div>
                  )}
                </div>
              </section>
            </div>

            {isModalOpen && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/55 px-4 py-6 backdrop-blur-sm">
                <div className="max-h-[92vh] w-full max-w-4xl overflow-y-auto rounded-3xl border border-slate-200/90 bg-white p-5 shadow-[0_20px_60px_rgba(15,23,42,0.25)] sm:p-6">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
                        Project form
                      </p>
                      <h2 className="mt-1 text-xl font-semibold tracking-[-0.03em] text-slate-900">
                        {editingProjectId === null
                          ? "Add new project"
                          : "Edit project"}
                      </h2>
                    </div>
                    <button
                      type="button"
                      onClick={closeModal}
                      className="inline-flex h-11 items-center justify-center rounded-2xl border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-600 hover:bg-slate-50"
                    >
                      Close
                    </button>
                  </div>

                  <form className="mt-6 space-y-5" onSubmit={handleSubmit}>
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
                              src={displayPreviewUrl ?? editingProject?.featured_image_thumbnail ?? ""}
                              alt={
                                form.featuredImageAlt ||
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
                            Select one primary image for the project card or
                            hero area.
                          </span>
                          <input
                            key={`display-${mediaResetKey}`}
                            type="file"
                            accept="image/*"
                            onChange={handleDisplayImageChange}
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
                            onChange={handleGalleryImagesChange}
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
                                        onClick={() =>
                                          removeGalleryImage(index)
                                        }
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
                      <Field label="Image Alt Text">
                        <input
                          className={fieldInputClass}
                          value={form.featuredImageAlt}
                          onChange={(event) =>
                            updateField("featuredImageAlt", event.target.value)
                          }
                          placeholder="Short description for accessibility"
                        />
                      </Field>

                      <Field label="Title *">
                        <input
                          className={fieldInputClass}
                          value={form.title}
                          onChange={(event) =>
                            updateField("title", event.target.value)
                          }
                          placeholder="Central Plaza Tower"
                          required
                        />
                      </Field>

                      <Field label="Status *">
                        <select
                          className={fieldInputClass}
                          value={form.status}
                          onChange={(event) =>
                            updateField(
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

                      <Field label="Location *">
                        <input
                          className={fieldInputClass}
                          value={form.location}
                          onChange={(event) =>
                            updateField("location", event.target.value)
                          }
                          placeholder="Colombo, Sri Lanka"
                          required
                        />
                      </Field>

                      <Field label="Client *">
                        <input
                          className={fieldInputClass}
                          value={form.client}
                          onChange={(event) =>
                            updateField("client", event.target.value)
                          }
                          placeholder="Capital Holdings"
                          required
                        />
                      </Field>

                      <Field label="Area">
                        <input
                          className={fieldInputClass}
                          value={form.area}
                          onChange={(event) =>
                            updateField("area", event.target.value)
                          }
                          placeholder="24,000 sq ft"
                        />
                      </Field>

                      <Field label="Meta Description" fullWidth>
                        <textarea
                          className={`${fieldInputClass} min-h-28 resize-y`}
                          value={form.metaDescription}
                          onChange={(event) =>
                            updateField("metaDescription", event.target.value)
                          }
                          maxLength={160}
                          placeholder="Short SEO summary for search snippets"
                        />
                      </Field>

                      <Field label="Description *" fullWidth>
                        <textarea
                          className={`${fieldInputClass} min-h-44 resize-y`}
                          value={form.description}
                          onChange={(event) =>
                            updateField("description", event.target.value)
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
                        onClick={closeModal}
                        className="inline-flex items-center justify-center rounded-2xl border border-slate-200 bg-white px-5 py-3.5 text-sm font-semibold text-slate-700 hover:bg-slate-50"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </section>
        </div>
      </div>
    </main>
  );
}

function Field({
  label,
  children,
  fullWidth,
}: {
  label: string;
  children: React.ReactNode;
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

function StatCard({
  label,
  value,
  tone,
}: {
  label: string;
  value: string;
  tone: string;
}) {
  return (
    <article
      className={`rounded-3xl bg-linear-to-br ${tone} p-5 text-white shadow-[0_18px_40px_rgba(15,23,42,0.16)]`}
    >
      <p className="text-sm font-medium text-white/80">{label}</p>
      <div className="mt-3 text-5xl font-semibold tracking-[-0.08em] text-white">
        {value}
      </div>
    </article>
  );
}

function DashboardIcon() {
  return (
    <GlyphIcon path="M4 13h7V4H4zm9 7h7v-12h-7zM4 20h7v-5H4zm9-14h7v-2h-7z" />
  );
}

function LayersIcon() {
  return <GlyphIcon path="M12 3l9 5-9 5-9-5 9-5zm0 9l9 5-9 5-9-5 9-5z" />;
}

function FolderIcon() {
  return (
    <GlyphIcon path="M3.5 7.5h6l2 2H20a1 1 0 0 1 1 1v8.5a1 1 0 0 1-1 1h-16a1 1 0 0 1-1-1V8.5a1 1 0 0 1 1-1z" />
  );
}

function TeamIcon() {
  return (
    <GlyphIcon path="M9 11a3 3 0 1 0-3-3 3 3 0 0 0 3 3zm6 0a2.5 2.5 0 1 0-2.5-2.5A2.5 2.5 0 0 0 15 11zM3.5 19a5.5 5.5 0 0 1 11 0" />
  );
}

function UsersIcon() {
  return (
    <GlyphIcon path="M9 12a3.5 3.5 0 1 0-3.5-3.5A3.5 3.5 0 0 0 9 12zm8 1a2.5 2.5 0 1 0-2.5-2.5A2.5 2.5 0 0 0 17 13zM2.5 20a6.5 6.5 0 0 1 13 0m2-3a4.5 4.5 0 0 1 4.5 4.5" />
  );
}

function SettingsIcon() {
  return (
    <GlyphIcon path="M12 8.5a3.5 3.5 0 1 0 3.5 3.5A3.5 3.5 0 0 0 12 8.5zm8 3.5l-2.1.8a6.9 6.9 0 0 1-.7 1.7l1 2-1.7 1.7-2-1a6.9 6.9 0 0 1-1.7.7L12 21l-1.8-.1a6.9 6.9 0 0 1-1.7-.7l-2 1-1.7-1.7 1-2a6.9 6.9 0 0 1-.7-1.7L3 12l.1-1.8a6.9 6.9 0 0 1 .7-1.7l-1-2L4.5 5l2 1a6.9 6.9 0 0 1 1.7-.7L12 3l1.8.1a6.9 6.9 0 0 1 1.7.7l2-1 1.7 1.7-1 2a6.9 6.9 0 0 1 .7 1.7L20 12z" />
  );
}

function GlyphIcon({ path }: { path: string }) {
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
      <path d={path} />
    </svg>
  );
}
