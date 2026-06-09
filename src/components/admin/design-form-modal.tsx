import type { ChangeEvent, FormEvent, ReactNode } from "react";
import type { DesignFormState, DesignRecord, DesignStatus } from "@/components/admin/design-manager-types";

type DesignFormModalProps = {
  isOpen: boolean;
  editingDesignId: number | null;
  editingDesign: DesignRecord | null;
  form: DesignFormState;
  categoryOptions: string[];
  styleOptions: string[];
  imagePreviewUrl: string | null;
  selectedImageName: string | null;
  galleryNames: string[];
  onClose: () => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  onImageChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onGalleryImagesChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onFieldChange: <K extends keyof DesignFormState>(
    key: K,
    value: DesignFormState[K]
  ) => void;
};

export default function DesignFormModal({
  isOpen,
  editingDesignId,
  editingDesign,
  form,
  categoryOptions,
  styleOptions,
  imagePreviewUrl,
  selectedImageName,
  galleryNames,
  onClose,
  onSubmit,
  onImageChange,
  onGalleryImagesChange,
  onFieldChange,
}: DesignFormModalProps) {
  if (!isOpen) {
    return null;
  }

  const fieldInputClass =
    "mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 shadow-[inset_0_1px_0_rgba(255,255,255,0.6)] outline-none transition-colors placeholder:text-slate-400 focus:border-sky-300 focus:bg-white";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/55 px-4 py-6 backdrop-blur-sm">
      <div className="max-h-[92vh] w-full max-w-5xl overflow-y-auto rounded-3xl border border-slate-200/90 bg-white p-5 shadow-[0_20px_60px_rgba(15,23,42,0.25)] sm:p-6">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
              Design form
            </p>
            <h2 className="mt-1 text-xl font-semibold tracking-[-0.03em] text-slate-900">
              {editingDesignId === null ? "Add new concept" : "Edit concept"}
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
            <section className="rounded-3xl border border-slate-200/80 bg-slate-50/80 p-4 sm:p-5">
               <div className="mb-4">
                 <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
                   Design Media
                 </p>
               </div>
               
               <div className="grid gap-5 md:grid-cols-2">
                 <Field label="Main concept image">
                   <label className="mt-2 flex cursor-pointer items-center justify-between gap-4 rounded-2xl border border-dashed border-sky-200 bg-white px-4 py-3 text-sm text-slate-600 transition-colors hover:border-sky-300 hover:bg-sky-50/40">
                     <span className="truncate">{selectedImageName ?? "Choose an image"}</span>
                     <span className="shrink-0 rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
                       Upload
                     </span>
                     <input
                       type="file"
                       accept="image/*"
                       className="sr-only"
                       onChange={onImageChange}
                     />
                   </label>
                 </Field>
                 <Field label="Image alt text">
                   <input
                     value={form.imageAlt}
                     onChange={(event) => onFieldChange("imageAlt", event.target.value)}
                     className={fieldInputClass}
                     placeholder="Exterior concept preview"
                   />
                 </Field>
               </div>

               <div className="mt-4">
                 <Field label="Gallery images">
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={onGalleryImagesChange}
                      className="mt-2 block w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-600 file:mr-4 file:rounded-xl file:border-0 file:bg-slate-900 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white"
                    />
                    <p className="mt-2 text-sm text-slate-500">
                      {galleryNames.length > 0
                        ? `${galleryNames.length} file(s) selected`
                        : "Add multiple supporting renders or mood-board images."}
                    </p>
                 </Field>
               </div>
            </section>

            <div className="grid gap-4 md:grid-cols-2">
              <Field label="Design title *">
                <input
                  value={form.title}
                  onChange={(event) => onFieldChange("title", event.target.value)}
                  className={fieldInputClass}
                  placeholder="Villa concept with pool court"
                  required
                />
              </Field>

              <Field label="Display order">
                <input
                  type="number"
                  min="1"
                  value={form.displayOrder}
                  onChange={(event) => onFieldChange("displayOrder", event.target.value)}
                  className={fieldInputClass}
                  placeholder="1"
                />
              </Field>

              <Field label="Category">
                <select
                  value={form.category}
                  onChange={(event) => onFieldChange("category", event.target.value)}
                  className={fieldInputClass}
                >
                  {categoryOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </Field>

              <Field label="Style">
                <select
                  value={form.style}
                  onChange={(event) => onFieldChange("style", event.target.value)}
                  className={fieldInputClass}
                >
                  {styleOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </Field>
              
              <Field label="Status" fullWidth>
                <div className="mt-2 grid gap-3 sm:grid-cols-2">
                  {(["Draft", "Published"] as DesignStatus[]).map((option) => (
                    <button
                      key={option}
                      type="button"
                      onClick={() => onFieldChange("status", option)}
                      className={`rounded-2xl border px-4 py-3 text-left text-sm font-semibold transition-colors ${form.status === option ? "border-sky-300 bg-sky-50 text-sky-700 shadow-[inset_0_1px_0_rgba(255,255,255,0.6)]" : "border-slate-200 bg-slate-50 text-slate-600 hover:bg-white"}`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </Field>

              <Field label="Description" fullWidth>
                <textarea
                  value={form.description}
                  onChange={(event) => onFieldChange("description", event.target.value)}
                  rows={4}
                  className={`${fieldInputClass} min-h-32 resize-y`}
                  placeholder="Explain the concept, mood, materials, or client brief."
                />
              </Field>
            </div>

            <div className="flex flex-wrap items-center gap-2 pt-2">
              <button
                type="submit"
                className="inline-flex items-center justify-center rounded-2xl bg-[linear-gradient(135deg,#10284a_0%,#23465e_100%)] px-5 py-3.5 text-sm font-semibold text-white shadow-[0_16px_34px_rgba(3,15,31,0.2)] transition-transform duration-150 hover:-translate-y-0.5"
              >
                {editingDesignId === null ? "Save design concept" : "Update design concept"}
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

          <aside className="hidden xl:block">
            <section className="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-[0_18px_40px_rgba(15,23,42,0.06)] sticky top-6">
              <div className="border-b border-slate-200 px-5 py-4">
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
                  Preview
                </p>
                <h2 className="mt-1 text-xl font-semibold tracking-[-0.03em] text-slate-900">
                  Live concept card
                </h2>
              </div>

              <div className="p-5">
                <div className="relative overflow-hidden rounded-[24px] bg-slate-100">
                  <div
                    className="h-72 bg-cover bg-center"
                    style={{
                      backgroundImage: imagePreviewUrl
                        ? `url(${imagePreviewUrl})`
                        : editingDesign?.imageUrl
                        ? `url(${editingDesign.imageUrl})`
                        : "linear-gradient(135deg, rgba(15,23,42,0.08), rgba(15,23,42,0.02))",
                    }}
                    aria-label={form.imageAlt || form.title || "Concept preview"}
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-slate-900/60 via-transparent to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
                    <span className="inline-flex rounded-full bg-white/15 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-white/90 backdrop-blur-sm">
                      {form.category}
                    </span>
                    <h3 className="mt-3 text-2xl font-semibold tracking-[-0.04em]">
                      {form.title || "Untitled concept"}
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-white/80 line-clamp-2">
                      {form.description || "Concept description will appear here."}
                    </p>
                  </div>
                </div>
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
  fullWidth,
}: {
  label: string;
  children: ReactNode;
  fullWidth?: boolean;
}) {
  return (
    <label className={fullWidth ? "md:col-span-2" : ""}>
      <span className="block text-[0.85rem] font-semibold uppercase tracking-[0.16em] text-slate-500">
        {label}
      </span>
      {children}
    </label>
  );
}
