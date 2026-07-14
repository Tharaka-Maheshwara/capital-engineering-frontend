"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import type { ChangeEvent, FormEvent } from "react";

import AdminLayout from "@/components/admin/admin-layout";
import ProjectFormModal from "@/components/admin/project-form-modal";
import ProjectRecordsSection from "@/components/admin/project-records-section";
import type {
  ProjectFormState,
  ProjectRecord,
} from "@/components/admin/project-manager-types";

const sriLankaLocations = [
  "Colombo",
  "Dehiwala",
  "Mount Lavinia",
  "Moratuwa",
  "Sri Jayawardenepura Kotte",
  "Maharagama",
  "Nugegoda",
  "Malabe",
  "Battaramulla",
  "Homagama",
  "Kaduwela",
  "Avissawella",
  "Gampaha",
  "Negombo",
  "Wattala",
  "Ja-Ela",
  "Kadawatha",
  "Kiribathgoda",
  "Kelaniya",
  "Minuwangoda",
  "Nittambuwa",
  "Veyangoda",
  "Kalutara",
  "Panadura",
  "Horana",
  "Beruwala",
  "Matugama",
  "Aluthgama",
  "Bandaragama",
  "Kandy",
  "Peradeniya",
  "Gampola",
  "Katugastota",
  "Kundasale",
  "Digana",
  "Nawalapitiya",
  "Galagedara",
  "Matale",
  "Dambulla",
  "Sigiriya",
  "Ukuwela",
  "Raththota",
  "Pallepola",
  "Nuwara Eliya",
  "Hatton",
  "Talawakelle",
  "Ginigathena",
  "Maskeliya",
  "Ragala",
  "Galle",
  "Hikkaduwa",
  "Ambalangoda",
  "Karapitiya",
  "Elpitiya",
  "Baddegama",
  "Ahangama",
  "Bentota",
  "Matara",
  "Weligama",
  "Akuressa",
  "Deniyaya",
  "Dikwella",
  "Kamburupitiya",
  "Hakmana",
  "Hambantota",
  "Tangalle",
  "Ambalantota",
  "Tissamaharama",
  "Beliatta",
  "Middeniya",
  "Ratnapura",
  "Embilipitiya",
  "Balangoda",
  "Pelmadulla",
  "Kuruwita",
  "Kahawatta",
  "Nivitigala",
  "Kegalle",
  "Mawanella",
  "Warakapola",
  "Rambukkana",
  "Ruwanwella",
  "Dehiowita",
  "Yatiyantota",
  "Kurunegala",
  "Kuliyapitiya",
  "Narammala",
  "Wariyapola",
  "Polgahawela",
  "Pannala",
  "Ibbagamuwa",
  "Mawatagama",
  "Puttalam",
  "Chilaw",
  "Marawila",
  "Wennappuwa",
  "Kalpitiya",
  "Madampe",
  "Anamaduwa",
  "Anuradhapura",
  "Mihintale",
  "Thambuththegama",
  "Eppawala",
  "Kekirawa",
  "Medawachchiya",
  "Nochchiyagama",
  "Polonnaruwa",
  "Kaduruwela",
  "Hingurakgoda",
  "Medirigiriya",
  "Welikanda",
  "Badulla",
  "Bandarawela",
  "Diyatalawa",
  "Ella",
  "Welimada",
  "Mahiyanganaya",
  "Hali-Ela",
  "Passara",
  "Monaragala",
  "Wellawaya",
  "Kataragama",
  "Bibile",
  "Buttala",
  "Thanamalwila",
  "Trincomalee",
  "Mutur",
  "Kinniya",
  "Kantale",
  "Batticaloa",
  "Kattankudy",
  "Eravur",
  "Valaichchenai",
  "Ampara",
  "Kalmunai",
  "Akkaraipattu",
  "Sainthamaruthu",
  "Pottuvil",
  "Jaffna",
  "Chavakachcheri",
  "Point Pedro",
  "Kopay",
  "Kayts",
  "Kilinochchi",
  "Pallai",
  "Mannar",
  "Murunkan",
  "Vavuniya",
  "Cheddikulam",
  "Mullaitivu",
  "Puthukudiyiruppu",
];

const initialFormState: ProjectFormState = {
  title: "",
  description: "",
  status: "planning",
  type: "commercial",
  location: "",
  client: "",
  area: "",
  price: "",
  startDate: "",
  endDate: "",
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
  const [editingProject, setEditingProject] = useState<ProjectRecord | null>(
    null,
  );
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
    setForm((current) => {
      if (key === "startDate" && typeof value === "string") {
        const nextStartDate = value;
        const nextEndDate =
          current.endDate && current.endDate < nextStartDate
            ? ""
            : current.endDate;

        return {
          ...current,
          startDate: nextStartDate,
          endDate: nextEndDate,
        };
      }

      return { ...current, [key]: value };
    });
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
      type: (project as any).type ?? "commercial",
      location: project.location,
      client: project.client,
      area: project.area ?? "",
      price: project.price ?? "",
      startDate: project.start_date ?? "",
      endDate: project.end_date ?? "",
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

    if (form.startDate && form.endDate && form.endDate < form.startDate) {
      setError("The end date must be on or after the start date.");
      return;
    }

    setSubmitting(true);

    try {
      const isEditing = editingProjectId !== null;
      const endpoint = isEditing
        ? `${apiBaseUrl}/api/v1/projects/${editingProjectId}`
        : `${apiBaseUrl}/api/v1/projects`;
      const formData = new FormData();
      if (isEditing) {
        formData.append("_method", "PUT");
      }
      formData.append("title", form.title);
      formData.append("description", form.description);
      formData.append("status", form.status);
      formData.append("location", form.location);
      formData.append("client", form.client);
      formData.append("type", form.type);
      if (form.area) {
        formData.append("area", form.area);
      }
      if (form.price) {
        formData.append("price", form.price);
      }
      if (form.startDate) {
        formData.append("start_date", form.startDate);
      }
      if (form.endDate) {
        formData.append("end_date", form.endDate);
      }
      if (displayImageFile) {
        formData.append("featured_image", displayImageFile);
      }
      if (galleryImageFiles.length > 0) {
        galleryImageFiles.forEach((file) => {
          formData.append("gallery_images[]", file);
        });
      }

      const response = await fetch(endpoint, {
        method: "POST",
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
    <AdminLayout
      activeHref="/admin/projects"
      title="Project Management"
      pageTitle="Projects"
    >
      <div className="flex items-center justify-end gap-3 mb-5">
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
        <ProjectRecordsSection
          projects={projects}
          loadingProjects={loadingProjects}
          deletingProjectId={deletingProjectId}
          onEdit={openEditModal}
          onDelete={handleDelete}
        />
      </div>
      <ProjectFormModal
        isOpen={isModalOpen}
        editingProjectId={editingProjectId}
        editingProject={editingProject}
        submitting={submitting}
        form={form}
        fieldInputClass={fieldInputClass}
        districts={sriLankaLocations}
        mediaResetKey={mediaResetKey}
        displayImageFile={displayImageFile}
        displayPreviewUrl={displayPreviewUrl}
        galleryImageFiles={galleryImageFiles}
        onClose={closeModal}
        onSubmit={handleSubmit}
        onDisplayImageChange={handleDisplayImageChange}
        onGalleryImagesChange={handleGalleryImagesChange}
        onRemoveGalleryImage={removeGalleryImage}
        onFieldChange={updateField}
      />
    </AdminLayout>
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
