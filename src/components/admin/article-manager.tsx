"use client";

import { useEffect, useState } from "react";
import type { ChangeEvent, FormEvent } from "react";

import AdminLayout from "@/components/admin/admin-layout";
import ArticleFormModal from "@/components/admin/article-form-modal";
import ArticleRecordsSection from "@/components/admin/article-records-section";
import {
  type ArticleFormState,
  type ArticleRecord,
} from "@/components/admin/article-manager-types";
import Link from "next/link";

type ArticleApiRecord = {
  id: number;
  title?: string | null;
  description?: string | null;
  youtube_link?: string | null;
  image_urls?: string[] | null;
  created_at?: string | null;
};

const apiBaseUrl =
  process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://127.0.0.1:8000";

const initialFormState: ArticleFormState = {
  title: "",
  description: "",
  youtubeLink: "",
};

export default function ArticleManager() {
  const [records, setRecords] = useState<ArticleRecord[]>([]);
  const [form, setForm] = useState<ArticleFormState>(initialFormState);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingArticleId, setEditingArticleId] = useState<number | null>(null);
  const [editingArticle, setEditingArticle] = useState<ArticleRecord | null>(
    null,
  );
  const [imagePreviewUrls, setImagePreviewUrls] = useState<string[]>([]);
  const [imageNames, setImageNames] = useState<string[]>([]);
  const [selectedImageFiles, setSelectedImageFiles] = useState<File[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    void loadArticles();
  }, []);

  function mapApiRecord(record: ArticleApiRecord): ArticleRecord {
    return {
      id: record.id,
      title: record.title ?? "",
      description: record.description ?? "",
      youtubeLink: record.youtube_link ?? undefined,
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

  async function loadArticles() {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `${apiBaseUrl}/api/v1/articles?per_page=50`,
        {
          cache: "no-store",
          headers: {
            Accept: "application/json",
          },
        },
      );

      if (!response.ok) {
        throw new Error("Failed to load articles");
      }

      const payload = (await response.json()) as { data?: ArticleApiRecord[] };
      setRecords(
        Array.isArray(payload.data) ? payload.data.map(mapApiRecord) : [],
      );
    } catch (loadError) {
      setError(
        loadError instanceof Error
          ? loadError.message
          : "Failed to load articles",
      );
      setRecords([]);
    } finally {
      setIsLoading(false);
    }
  }

  const stats = [
    {
      label: "Total Articles",
      value: String(records.length).padStart(2, "0"),
      tone: "from-slate-900 via-slate-800 to-slate-700",
    },
    {
      label: "With Videos",
      value: String(
        records.filter((r) => r.youtubeLink && r.youtubeLink.length > 0).length,
      ).padStart(2, "0"),
      tone: "from-rose-900 via-rose-800 to-slate-800",
    },
    {
      label: "With Images",
      value: String(
        records.filter((r) => r.imageUrls && r.imageUrls.length > 0).length,
      ).padStart(2, "0"),
      tone: "from-sky-900 via-sky-800 to-slate-800",
    },
  ];

  function updateField<K extends keyof ArticleFormState>(
    key: K,
    value: ArticleFormState[K],
  ) {
    setForm((current) => ({ ...current, [key]: value }));
  }

  function handleImagesChange(event: ChangeEvent<HTMLInputElement>) {
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
    setEditingArticleId(null);
    setEditingArticle(null);
    setForm(initialFormState);
    setImagePreviewUrls([]);
    setImageNames([]);
    setSelectedImageFiles([]);
    setError(null);
    setSuccess(null);
    setIsModalOpen(true);
  }

  function openEditModal(article: ArticleRecord) {
    setEditingArticleId(article.id);
    setEditingArticle(article);
    setForm({
      title: article.title,
      description: article.description,
      youtubeLink: article.youtubeLink ?? "",
    });
    setImagePreviewUrls([]);
    setImageNames(
      article.imageUrls.map((_, idx) => `Existing Image ${idx + 1}`),
    );
    setSelectedImageFiles([]);
    setError(null);
    setSuccess(null);
    setIsModalOpen(true);
  }

  function closeModal() {
    setIsModalOpen(false);
    setEditingArticleId(null);
    setEditingArticle(null);
    setForm(initialFormState);
    imagePreviewUrls.forEach((url) => URL.revokeObjectURL(url));
    setImagePreviewUrls([]);
    setImageNames([]);
    setSelectedImageFiles([]);
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!form.title || !form.description) {
      setError("Please fill in the title and description.");
      return;
    }

    setIsSubmitting(true);
    setError(null);
    setSuccess(null);

    try {
      const isEditing = editingArticleId !== null;
      const endpoint = isEditing
        ? `${apiBaseUrl}/api/v1/articles/${editingArticleId}`
        : `${apiBaseUrl}/api/v1/articles`;
      const formData = new FormData();

      if (isEditing) {
        formData.append("_method", "PUT");
      }

      formData.append("title", form.title);
      formData.append("description", form.description);

      if (form.youtubeLink && form.youtubeLink.trim().length > 0) {
        formData.append("youtube_link", form.youtubeLink.trim());
      }

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
          "Article could not be saved";
        throw new Error(message);
      }

      setSuccess(
        isEditing
          ? "Article updated successfully."
          : "Article saved successfully.",
      );
      setForm(initialFormState);
      closeModal();
      await loadArticles();
    } catch (saveError) {
      setError(
        saveError instanceof Error
          ? saveError.message
          : "Article could not be saved",
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleDelete(articleId: number) {
    if (!confirm("Delete this article? This action cannot be undone.")) {
      return;
    }

    setError(null);
    setSuccess(null);

    try {
      const response = await fetch(
        `${apiBaseUrl}/api/v1/articles/${articleId}`,
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
          "Article could not be deleted";
        throw new Error(message);
      }

      setSuccess("Article deleted successfully.");
      await loadArticles();
    } catch (deleteError) {
      setError(
        deleteError instanceof Error
          ? deleteError.message
          : "Article could not be deleted",
      );
    }
  }

  return (
    <AdminLayout
      activeHref="/admin/articles"
      title="Content Management"
      pageTitle="Articles"
    >
      <div className="flex items-center justify-end gap-3 mb-5">
        <button
          type="button"
          onClick={openCreateModal}
          className="inline-flex h-12 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,#10284a_0%,#23465e_100%)] px-4 text-sm font-semibold text-white shadow-[0_10px_24px_rgba(15,23,42,0.18)] transition-transform duration-150 hover:-translate-y-0.5"
        >
          Add New Article
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

      {/* Stats cards */}
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
        <ArticleRecordsSection
          articles={records}
          onEdit={openEditModal}
          onDelete={handleDelete}
        />
      </div>

      {isLoading && (
        <div className="mt-4 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-500 shadow-sm">
          Loading articles...
        </div>
      )}

      <ArticleFormModal
        isOpen={isModalOpen}
        editingArticleId={editingArticleId}
        editingArticle={editingArticle}
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
