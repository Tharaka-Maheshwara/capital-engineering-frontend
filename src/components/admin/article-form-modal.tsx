import type { ChangeEvent, FormEvent, ReactNode } from "react";
import {
  type ArticleFormState,
  type ArticleRecord,
} from "@/components/admin/article-manager-types";

type ArticleFormModalProps = {
  isOpen: boolean;
  editingArticleId: number | null;
  editingArticle: ArticleRecord | null;
  form: ArticleFormState;
  imagePreviewUrls: string[];
  imageNames: string[];
  isSubmitting: boolean;
  onClose: () => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  onImagesChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onFieldChange: <K extends keyof ArticleFormState>(
    key: K,
    value: ArticleFormState[K],
  ) => void;
};

export default function ArticleFormModal({
  isOpen,
  editingArticleId,
  editingArticle,
  form,
  imagePreviewUrls,
  imageNames,
  isSubmitting,
  onClose,
  onSubmit,
  onImagesChange,
  onFieldChange,
}: ArticleFormModalProps) {
  if (!isOpen) {
    return null;
  }

  const fieldInputClass =
    "mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 shadow-[inset_0_1px_0_rgba(255,255,255,0.6)] outline-none transition-colors placeholder:text-slate-400 focus:border-sky-300 focus:bg-white";

  const mainImageUrl =
    imagePreviewUrls.length > 0
      ? imagePreviewUrls[0]
      : editingArticle?.imageUrls && editingArticle.imageUrls.length > 0
        ? editingArticle.imageUrls[0]
        : null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/55 px-4 py-6 backdrop-blur-sm">
      <div className="max-h-[92vh] w-full max-w-5xl overflow-y-auto rounded-3xl border border-slate-200/90 bg-white p-5 shadow-[0_20px_60px_rgba(15,23,42,0.25)] sm:p-6">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
              Article Configuration
            </p>
            <h2 className="mt-1 text-xl font-semibold tracking-[-0.03em] text-slate-900">
              {editingArticleId === null ? "Add new article" : "Edit article"}
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

        <div className="mt-6 grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
          <form className="space-y-5" onSubmit={onSubmit}>
            {/* Title */}
            <Field label="Article Topic / Title *">
              <input
                type="text"
                value={form.title}
                onChange={(e) => onFieldChange("title", e.target.value)}
                className={fieldInputClass}
                placeholder="e.g. Top 5 Construction Trends in 2026"
                required
                maxLength={255}
              />
            </Field>

            {/* Description */}
            <Field label="Article Description *">
              <textarea
                value={form.description}
                onChange={(e) => onFieldChange("description", e.target.value)}
                className={`${fieldInputClass} min-h-40 resize-y`}
                placeholder="Write the full article content or description here..."
                required
                maxLength={50000}
              />
            </Field>

            {/* YouTube Link */}
            <Field label="YouTube Video Link (Optional)">
              <div className="relative mt-2">
                <span className="pointer-events-none absolute inset-y-0 left-4 flex items-center">
                  <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4 text-rose-500" aria-hidden="true">
                    <path d="M21.8 8.001a2.75 2.75 0 0 0-1.94-1.95C18.16 5.6 12 5.6 12 5.6s-6.16 0-7.86.451A2.75 2.75 0 0 0 2.2 8.001 28.6 28.6 0 0 0 1.75 12a28.6 28.6 0 0 0 .45 3.999 2.75 2.75 0 0 0 1.94 1.95C5.84 18.4 12 18.4 12 18.4s6.16 0 7.86-.451a2.75 2.75 0 0 0 1.94-1.95 28.6 28.6 0 0 0 .45-4 28.6 28.6 0 0 0-.45-3.998zM10 15V9l5.196 3L10 15z" />
                  </svg>
                </span>
                <input
                  type="url"
                  value={form.youtubeLink}
                  onChange={(e) => onFieldChange("youtubeLink", e.target.value)}
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 py-3 pl-11 pr-4 text-slate-900 shadow-[inset_0_1px_0_rgba(255,255,255,0.6)] outline-none transition-colors placeholder:text-slate-400 focus:border-sky-300 focus:bg-white"
                  placeholder="https://www.youtube.com/watch?v=..."
                />
              </div>
              <p className="mt-1.5 text-xs text-slate-400">
                Paste a YouTube video URL to embed with the article.
              </p>
            </Field>

            {/* Image Upload */}
            <section className="mt-5 rounded-3xl border border-slate-200/80 bg-slate-50/80 p-4 sm:p-5">
              <div className="mb-4">
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
                  Article Images
                </p>
                <p className="mt-1 text-xs text-slate-400">
                  Upload one or more images to accompany the article.
                </p>
              </div>

              <Field label="Upload Images">
                <label className="mt-2 flex cursor-pointer items-center justify-between gap-4 rounded-2xl border border-dashed border-sky-200 bg-white px-4 py-4 text-sm text-slate-600 transition-colors hover:border-sky-300 hover:bg-sky-50/40">
                  <span className="truncate">
                    {imageNames.length > 0
                      ? `${imageNames.length} image(s) selected`
                      : "Choose image(s)"}
                  </span>
                  <span className="shrink-0 rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
                    Browse
                  </span>
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    className="sr-only"
                    onChange={onImagesChange}
                  />
                </label>
              </Field>

              {imageNames.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-2">
                  {imageNames.map((name, i) => (
                    <span
                      key={i}
                      className="inline-flex rounded-full bg-white px-3 py-1 text-xs font-medium text-slate-600 shadow-sm border border-slate-200"
                    >
                      {name}
                    </span>
                  ))}
                </div>
              )}
            </section>

            {/* Buttons */}
            <div className="flex flex-wrap items-center gap-2 pt-2">
              <button
                type="submit"
                className="inline-flex items-center justify-center rounded-2xl bg-[linear-gradient(135deg,#10284a_0%,#23465e_100%)] px-5 py-3.5 text-sm font-semibold text-white shadow-[0_16px_34px_rgba(3,15,31,0.2)] transition-transform duration-150 hover:-translate-y-0.5"
                disabled={isSubmitting || !form.title || !form.description}
              >
                {isSubmitting
                  ? "Saving..."
                  : editingArticleId === null
                    ? "Save article"
                    : "Update article"}
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

          {/* Preview Panel */}
          <aside className="hidden xl:block">
            <section className="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-[0_18px_40px_rgba(15,23,42,0.06)] sticky top-6">
              <div className="border-b border-slate-200 px-5 py-4">
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
                  Preview
                </p>
                <h2 className="mt-1 text-xl font-semibold tracking-[-0.03em] text-slate-900">
                  Live article card
                </h2>
              </div>

              <div className="p-5">
                {/* Image preview */}
                <div className="relative overflow-hidden rounded-3xl bg-slate-100">
                  <div
                    className="h-52 bg-cover bg-center"
                    style={{
                      backgroundImage: mainImageUrl
                        ? `url(${mainImageUrl})`
                        : "linear-gradient(135deg, rgba(15,23,42,0.08), rgba(15,23,42,0.02))",
                    }}
                    aria-label={form.title || "Article preview"}
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-slate-900/80 via-slate-900/30 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                    <p className="text-base font-bold leading-snug">
                      {form.title || "Article title will appear here"}
                    </p>
                  </div>
                </div>

                {/* Description preview */}
                {form.description && (
                  <p className="mt-4 text-sm leading-6 text-slate-600 line-clamp-4">
                    {form.description}
                  </p>
                )}

                {/* YouTube link preview */}
                {form.youtubeLink && (
                  <div className="mt-3 flex items-center gap-2 rounded-xl border border-rose-100 bg-rose-50 px-3 py-2">
                    <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4 text-rose-500 shrink-0" aria-hidden="true">
                      <path d="M21.8 8.001a2.75 2.75 0 0 0-1.94-1.95C18.16 5.6 12 5.6 12 5.6s-6.16 0-7.86.451A2.75 2.75 0 0 0 2.2 8.001 28.6 28.6 0 0 0 1.75 12a28.6 28.6 0 0 0 .45 3.999 2.75 2.75 0 0 0 1.94 1.95C5.84 18.4 12 18.4 12 18.4s6.16 0 7.86-.451a2.75 2.75 0 0 0 1.94-1.95 28.6 28.6 0 0 0 .45-4 28.6 28.6 0 0 0-.45-3.998zM10 15V9l5.196 3L10 15z" />
                    </svg>
                    <span className="text-xs font-medium text-rose-700 truncate">
                      YouTube video attached
                    </span>
                  </div>
                )}
              </div>
            </section>
          </aside>
        </div>
      </div>
    </div>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <label>
      <span className="block text-[0.85rem] font-semibold uppercase tracking-[0.16em] text-slate-500">
        {label}
      </span>
      {children}
    </label>
  );
}
