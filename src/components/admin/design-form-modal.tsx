import type { ChangeEvent, FormEvent, ReactNode } from "react";
import { designCategoryMap, type DesignFormState, type DesignRecord } from "@/components/admin/design-manager-types";

type DesignFormModalProps = {
  isOpen: boolean;
  editingDesignId: number | null;
  editingDesign: DesignRecord | null;
  form: DesignFormState;
  imagePreviewUrls: string[];
  imageNames: string[];
  isSubmitting: boolean;
  onClose: () => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  onImagesChange: (event: ChangeEvent<HTMLInputElement>) => void;
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
  imagePreviewUrls,
  imageNames,
  isSubmitting,
  onClose,
  onSubmit,
  onImagesChange,
  onFieldChange,
}: DesignFormModalProps) {
  if (!isOpen) {
    return null;
  }

  const fieldInputClass =
    "mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 shadow-[inset_0_1px_0_rgba(255,255,255,0.6)] outline-none transition-colors placeholder:text-slate-400 focus:border-sky-300 focus:bg-white";

  const availableSubcategories = designCategoryMap[form.mainCategory] || [];

  function handleSubcategoryToggle(subCat: string) {
    const nextSubs = form.subCategories.includes(subCat)
      ? form.subCategories.filter((s) => s !== subCat)
      : [...form.subCategories, subCat];
    onFieldChange("subCategories", nextSubs);
  }

  const mainImageUrl =
    imagePreviewUrls.length > 0
      ? imagePreviewUrls[0]
      : editingDesign?.imageUrls && editingDesign.imageUrls.length > 0
      ? editingDesign.imageUrls[0]
      : null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/55 px-4 py-6 backdrop-blur-sm">
      <div className="max-h-[92vh] w-full max-w-5xl overflow-y-auto rounded-3xl border border-slate-200/90 bg-white p-5 shadow-[0_20px_60px_rgba(15,23,42,0.25)] sm:p-6">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
              Design Configuration
            </p>
            <h2 className="mt-1 text-xl font-semibold tracking-[-0.03em] text-slate-900">
              {editingDesignId === null ? "Add new design" : "Edit design"}
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
            
            <Field label="Main Category *">
              <select
                value={form.mainCategory}
                onChange={(event) => {
                  onFieldChange("mainCategory", event.target.value);
                  onFieldChange("subCategories", []); // reset on main category change
                }}
                className={fieldInputClass}
                required
              >
                <option value="" disabled>Select a category</option>
                {Object.keys(designCategoryMap).map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </Field>

            {form.mainCategory && (
              <Field label="Subcategories (Select one or more) *">
                <div className="mt-3 space-y-3">
                  {availableSubcategories.map((subCat) => (
                    <label
                      key={subCat}
                      className="flex cursor-pointer items-start gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 transition-colors hover:bg-white has-checked:border-sky-300 has-checked:bg-sky-50"
                    >
                      <input
                        type="checkbox"
                        checked={form.subCategories.includes(subCat)}
                        onChange={() => handleSubcategoryToggle(subCat)}
                        className="mt-0.5 h-5 w-5 shrink-0 rounded border-slate-300 text-sky-600 focus:ring-sky-600"
                      />
                      <span className="text-[0.98rem] font-medium text-slate-800">
                        {subCat}
                      </span>
                    </label>
                  ))}
                </div>
              </Field>
            )}

            <Field label="Short Description">
              <textarea
                value={form.description}
                onChange={(event) => onFieldChange("description", event.target.value)}
                className={`${fieldInputClass} min-h-28 resize-y`}
                placeholder="Write a short description for this design concept"
                maxLength={255}
              />
            </Field>

            <section className="mt-5 rounded-3xl border border-slate-200/80 bg-slate-50/80 p-4 sm:p-5">
               <div className="mb-4">
                 <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
                   Design Media
                 </p>
               </div>
               
               <Field label="Upload Images (One or more)">
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
                     <span key={i} className="inline-flex rounded-full bg-white px-3 py-1 text-xs font-medium text-slate-600 shadow-sm border border-slate-200">
                       {name}
                     </span>
                   ))}
                 </div>
               )}
            </section>

            <div className="flex flex-wrap items-center gap-2 pt-2">
              <button
                type="submit"
                className="inline-flex items-center justify-center rounded-2xl bg-[linear-gradient(135deg,#10284a_0%,#23465e_100%)] px-5 py-3.5 text-sm font-semibold text-white shadow-[0_16px_34px_rgba(3,15,31,0.2)] transition-transform duration-150 hover:-translate-y-0.5"
                disabled={isSubmitting || !form.mainCategory || form.subCategories.length === 0}
              >
                {isSubmitting
                  ? "Saving..."
                  : editingDesignId === null
                    ? "Save design concept"
                    : "Update design concept"}
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
                <div className="relative overflow-hidden rounded-3xl bg-slate-100">
                  <div
                    className="h-96 bg-cover bg-center"
                    style={{
                      backgroundImage: mainImageUrl
                        ? `url(${mainImageUrl})`
                        : "linear-gradient(135deg, rgba(15,23,42,0.08), rgba(15,23,42,0.02))",
                    }}
                    aria-label={form.mainCategory || "Concept preview"}
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-slate-900/80 via-slate-900/40 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
                    <span className="inline-flex rounded-full bg-white/15 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-white/90 backdrop-blur-sm">
                      {form.mainCategory || "Select Category"}
                    </span>
                    {form.description && (
                      <p className="mt-3 max-w-full text-sm leading-6 text-white/80">
                        {form.description}
                      </p>
                    )}
                    <div className="mt-4 flex flex-wrap gap-2">
                      {form.subCategories.map((subCat) => (
                        <span key={subCat} className="inline-flex items-center rounded-xl bg-white/10 px-3 py-1.5 text-sm font-medium text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.1)] backdrop-blur-md">
                          {subCat}
                        </span>
                      ))}
                      {form.subCategories.length === 0 && (
                        <span className="text-sm text-white/60 italic">No subcategories selected</span>
                      )}
                    </div>
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
