"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import type { ChangeEvent, FormEvent } from "react";

import AdminSidebar from "@/components/admin/admin-sidebar";
import DesignFormModal from "@/components/admin/design-form-modal";
import DesignRecordsSection from "@/components/admin/design-records-section";
import {
  type DesignFormState,
  type DesignRecord,
} from "@/components/admin/design-manager-types";

type DesignApiRecord = {
  id: number;
  main_category?: string | null;
  description?: string | null;
  sub_categories?: string[] | null;
  image_urls?: string[] | null;
  created_at?: string | null;
};

const apiBaseUrl =
  process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://127.0.0.1:8000";

const defaultRecords: DesignRecord[] = [
  {
    id: 1,
    mainCategory: "Residential Designs",
    subCategories: [
      "Modern Single-Story Houses",
      "Luxury Two-Story / Multi-Story Houses",
    ],
    description:
      "A clean residential concept focused on modern family living with efficient spatial flow.",
    imageUrls: ["/images/slider-3.png"],
    createdAt: "Today",
  },
  {
    id: 2,
    mainCategory: "Commercial Designs",
    subCategories: ["Office Buildings / Corporate Spaces"],
    description:
      "A commercial concept designed for flexible office planning and corporate branding.",
    imageUrls: ["/images/slider-4.png"],
    createdAt: "Yesterday",
  },
];

const initialFormState: DesignFormState = {
  mainCategory: "",
  subCategories: [],
  description: "",
};

const navigationItems = [
  { label: "Dashboard", href: "/admin/admin-dashboard", icon: DashboardIcon },
  { label: "Services", href: "#", icon: LayersIcon },
  { label: "Projects", href: "/admin/projects", icon: FolderIcon },
  { label: "Designs", href: "/admin/designs", active: true, icon: PaletteIcon },
  { label: "Articles", href: "/admin/articles", icon: ArticleIcon },
  { label: "Team", href: "#", icon: TeamIcon },
  { label: "Users", href: "#", icon: UsersIcon },
  { label: "Settings", href: "#", icon: SettingsIcon },
];

export default function DesignManager() {
  const [records, setRecords] = useState<DesignRecord[]>([]);
  const [form, setForm] = useState<DesignFormState>(initialFormState);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingDesignId, setEditingDesignId] = useState<number | null>(null);
  const [editingDesign, setEditingDesign] = useState<DesignRecord | null>(null);
  const [imagePreviewUrls, setImagePreviewUrls] = useState<string[]>([]);
  const [imageNames, setImageNames] = useState<string[]>([]);
  const [selectedImageFiles, setSelectedImageFiles] = useState<File[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    void loadDesigns();
  }, []);

  function mapApiRecord(record: DesignApiRecord): DesignRecord {
    return {
      id: record.id,
      mainCategory: record.main_category ?? "",
      subCategories: Array.isArray(record.sub_categories)
        ? record.sub_categories
        : [],
      description: record.description ?? "",
      imageUrls: Array.isArray(record.image_urls) ? record.image_urls : [],
      createdAt: record.created_at ?? "",
    };
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

  async function loadDesigns() {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`${apiBaseUrl}/api/v1/designs?per_page=12`, {
        cache: "no-store",
        headers: {
          Accept: "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to load designs");
      }

      const payload = (await response.json()) as { data?: DesignApiRecord[] };
      setRecords(
        Array.isArray(payload.data) ? payload.data.map(mapApiRecord) : [],
      );
    } catch (loadError) {
      setError(
        loadError instanceof Error
          ? loadError.message
          : "Failed to load designs",
      );
      setRecords([]);
    } finally {
      setIsLoading(false);
    }
  }

  const stats = [
    {
      label: "Total Concepts",
      value: String(records.length).padStart(2, "0"),
      tone: "from-slate-900 via-slate-800 to-slate-700",
    },
    {
      label: "Residential",
      value: String(
        records.filter((r) => r.mainCategory === "Residential Designs").length,
      ).padStart(2, "0"),
      tone: "from-emerald-900 via-emerald-800 to-slate-800",
    },
    {
      label: "Commercial",
      value: String(
        records.filter((r) => r.mainCategory === "Commercial Designs").length,
      ).padStart(2, "0"),
      tone: "from-sky-900 via-sky-800 to-slate-800",
    },
  ];

  function updateField<K extends keyof DesignFormState>(
    key: K,
    value: DesignFormState[K],
  ) {
    setForm((current) => ({ ...current, [key]: value }));
  }

  function handleImagesChange(event: ChangeEvent<HTMLInputElement>) {
    // Revoke previous object URLs
    imagePreviewUrls.forEach((url) => URL.revokeObjectURL(url));

    const files = Array.from(event.target.files ?? []);
    if (files.length === 0) {
      setImagePreviewUrls([]);
      setImageNames([]);
      setSelectedImageFiles([]);
      return;
    }

    const urls = files.map((file) => URL.createObjectURL(file));
    setImagePreviewUrls(urls);
    setImageNames(files.map((file) => file.name));
    setSelectedImageFiles(files);
  }

  function openCreateModal() {
    setEditingDesignId(null);
    setEditingDesign(null);
    setForm(initialFormState);
    setImagePreviewUrls([]);
    setImageNames([]);
    setSelectedImageFiles([]);
    setError(null);
    setSuccess(null);
    setIsModalOpen(true);
  }

  function openEditModal(design: DesignRecord) {
    setEditingDesignId(design.id);
    setEditingDesign(design);
    setForm({
      mainCategory: design.mainCategory,
      subCategories: [...design.subCategories],
      description: design.description,
    });
    setImagePreviewUrls([]); // We don't recreate blob URLs for existing images
    setImageNames(
      design.imageUrls.map((_, idx) => `Existing Image ${idx + 1}`),
    );
    setSelectedImageFiles([]);
    setError(null);
    setSuccess(null);
    setIsModalOpen(true);
  }

  function closeModal() {
    setIsModalOpen(false);
    setEditingDesignId(null);
    setEditingDesign(null);
    setForm(initialFormState);
    imagePreviewUrls.forEach((url) => URL.revokeObjectURL(url));
    setImagePreviewUrls([]);
    setImageNames([]);
    setSelectedImageFiles([]);
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!form.mainCategory || form.subCategories.length === 0) {
      setError("Please select a main category and at least one subcategory.");
      return;
    }

    if (editingDesignId === null && selectedImageFiles.length === 0) {
      setError("Please upload at least one image.");
      return;
    }

    setIsSubmitting(true);
    setError(null);
    setSuccess(null);

    try {
      const isEditing = editingDesignId !== null;
      const endpoint = isEditing
        ? `${apiBaseUrl}/api/v1/designs/${editingDesignId}`
        : `${apiBaseUrl}/api/v1/designs`;
      const formData = new FormData();

      if (isEditing) {
        formData.append("_method", "PUT");
      }

      formData.append("main_category", form.mainCategory);
      formData.append("description", form.description);
      form.subCategories.forEach((subCategory) => {
        formData.append("sub_categories[]", subCategory);
      });

      selectedImageFiles.forEach((file) => {
        formData.append("images[]", file);
      });

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
          "Design could not be saved";
        throw new Error(message);
      }

      setSuccess(
        isEditing
          ? "Design updated successfully."
          : "Design saved successfully.",
      );
      setForm(initialFormState);
      closeModal();
      await loadDesigns();
    } catch (saveError) {
      setError(
        saveError instanceof Error
          ? saveError.message
          : "Design could not be saved",
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleDelete(designId: number) {
    if (!confirm("Delete this concept? This action cannot be undone.")) {
      return;
    }

    setError(null);
    setSuccess(null);

    try {
      const response = await fetch(`${apiBaseUrl}/api/v1/designs/${designId}`, {
        method: "DELETE",
        headers: {
          Accept: "application/json",
        },
      });

      if (!response.ok) {
        const payload = await readResponsePayload(response);
        const message =
          (payload?.message as string | undefined) ||
          (payload?.error as string | undefined) ||
          "Design could not be deleted";
        throw new Error(message);
      }

      setSuccess("Design deleted successfully.");
      await loadDesigns();
    } catch (deleteError) {
      setError(
        deleteError instanceof Error
          ? deleteError.message
          : "Design could not be deleted",
      );
    }
  }

  return (
    <main className="min-h-screen bg-[#f3f5f9] text-slate-900">
      <div className="flex min-h-screen flex-col lg:flex-row">
        <AdminSidebar activeHref="/admin/designs" />

        <div className="flex-1 bg-[radial-gradient(circle_at_top_right,rgba(42,91,136,0.12),transparent_26%),linear-gradient(180deg,#f8fafc_0%,#edf2f7_100%)]">
          <header className="sticky top-0 z-20 border-b border-slate-200/80 bg-white/88 backdrop-blur-xl">
            <div className="flex items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
              <div>
                <p className="text-sm font-medium uppercase tracking-[0.22em] text-slate-500">
                  Concept Management
                </p>
                <h1 className="mt-1 text-2xl font-semibold tracking-[-0.04em] text-slate-900 sm:text-[2.15rem]">
                  Designs
                </h1>
              </div>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={openCreateModal}
                  className="inline-flex h-12 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,#10284a_0%,#23465e_100%)] px-4 text-sm font-semibold text-white shadow-[0_10px_24px_rgba(15,23,42,0.18)] transition-transform duration-150 hover:-translate-y-0.5"
                >
                  Add New Design
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
            {(error || success) && (
              <div
                className={`mb-5 rounded-2xl px-4 py-3 text-sm ${error ? "border border-rose-200 bg-rose-50 text-rose-700" : "border border-emerald-200 bg-emerald-50 text-emerald-700"}`}
              >
                {error ?? success}
              </div>
            )}

            <div className="grid gap-5 md:grid-cols-3">
              {stats.map((stat) => (
                <article
                  key={stat.label}
                  className={`rounded-3xl bg-linear-to-br ${stat.tone} p-5 text-white shadow-[0_18px_40px_rgba(15,23,42,0.16)]`}
                >
                  <p className="text-sm font-medium text-white/80">
                    {stat.label}
                  </p>
                  <div className="mt-3 text-5xl font-semibold tracking-[-0.08em] text-white">
                    {stat.value}
                  </div>
                </article>
              ))}
            </div>

            <div className="mt-6">
              <DesignRecordsSection
                designs={records}
                onEdit={openEditModal}
                onDelete={handleDelete}
              />
            </div>

            {isLoading && (
              <div className="mt-4 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-500 shadow-sm">
                Loading designs...
              </div>
            )}

            <DesignFormModal
              isOpen={isModalOpen}
              editingDesignId={editingDesignId}
              editingDesign={editingDesign}
              form={form}
              imagePreviewUrls={imagePreviewUrls}
              imageNames={imageNames}
              isSubmitting={isSubmitting}
              onClose={closeModal}
              onSubmit={handleSubmit}
              onImagesChange={handleImagesChange}
              onFieldChange={updateField}
            />
          </section>
        </div>
      </div>
    </main>
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

function PaletteIcon() {
  return (
    <GlyphIcon path="M12 3a9 9 0 1 0 9 9c0-2.2-1.8-4-4-4h-1.2a1.8 1.8 0 0 1 0-3.6H17A5 5 0 0 0 12 3Zm-4 9.2a1.2 1.2 0 1 1 0-2.4 1.2 1.2 0 0 1 0 2.4Zm2.8-3.2a1.2 1.2 0 1 1 0-2.4 1.2 1.2 0 0 1 0 2.4Zm4.4 0a1.2 1.2 0 1 1 0-2.4 1.2 1.2 0 0 1 0 2.4Z" />
  );
}

function ArticleIcon() {
  return <GlyphIcon path="M4 6h16M4 10h16M4 14h10M4 18h7" />;
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
