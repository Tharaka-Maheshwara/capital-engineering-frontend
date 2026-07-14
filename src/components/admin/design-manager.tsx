"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import type { ChangeEvent, FormEvent } from "react";

import AdminLayout from "@/components/admin/admin-layout";
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

const initialFormState: DesignFormState = {
  mainCategory: "",
  subCategories: [],
  description: "",
};

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
    <AdminLayout
      activeHref="/admin/designs"
      title="Concept Management"
      pageTitle="Designs"
    >
      <div className="flex items-center justify-end gap-3 mb-5">
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
    </AdminLayout>
  );
}
