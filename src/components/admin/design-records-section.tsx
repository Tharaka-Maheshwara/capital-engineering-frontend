import type { DesignRecord } from "@/components/admin/design-manager-types";

type DesignRecordsSectionProps = {
  designs: DesignRecord[];
  onEdit: (design: DesignRecord) => void;
  onDelete: (designId: number) => void;
};

export default function DesignRecordsSection({
  designs,
  onEdit,
  onDelete,
}: DesignRecordsSectionProps) {
  return (
    <section className="rounded-3xl border border-slate-200/80 bg-white p-5 shadow-[0_18px_40px_rgba(15,23,42,0.08)]">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
            Design records
          </p>
          <h2 className="mt-1 text-xl font-semibold tracking-[-0.03em] text-slate-900">
            Saved concepts
          </h2>
        </div>
        <span className="text-sm font-medium text-slate-500">
          {designs.length} items
        </span>
      </div>

      <div className="mt-5 space-y-4">
        {designs.map((design) => {
          const mainImage =
            design.imageUrls && design.imageUrls.length > 0
              ? design.imageUrls[0]
              : null;

          return (
            <article
              key={design.id}
              className="rounded-[18px] border border-slate-200 bg-slate-50/80 p-4"
            >
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
                  <div className="flex h-24 w-32 shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                    {mainImage ? (
                      <img
                        src={mainImage}
                        alt={design.mainCategory}
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
                    <h3 className="text-lg font-semibold text-slate-900">
                      {design.mainCategory}
                    </h3>
                    {design.description && (
                      <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
                        {design.description}
                      </p>
                    )}
                    <div className="mt-2 flex flex-wrap gap-2">
                      {design.subCategories.map((subCat) => (
                        <span
                          key={subCat}
                          className="inline-flex items-center rounded-full border border-slate-200 bg-white px-2.5 py-1 text-xs font-medium text-slate-600 shadow-sm"
                        >
                          {subCat}
                        </span>
                      ))}
                    </div>
                    <p className="mt-3 text-xs uppercase tracking-[0.12em] text-slate-500">
                      Images: {design.imageUrls?.length || 0}
                    </p>
                  </div>
                </div>

                <div className="flex shrink-0 items-center gap-2 sm:flex-col sm:items-end">
                  <button
                    type="button"
                    onClick={() => onEdit(design)}
                    className="inline-flex w-full items-center justify-center rounded-xl border border-slate-300 bg-white px-4 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-slate-700 transition-colors hover:bg-slate-100 sm:w-auto"
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    onClick={() => onDelete(design.id)}
                    className="inline-flex w-full items-center justify-center rounded-xl border border-rose-200 bg-rose-50 px-4 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-rose-700 transition-colors hover:bg-rose-100 sm:w-auto"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </article>
          );
        })}

        {designs.length === 0 && (
          <div className="rounded-[18px] border border-dashed border-slate-200 bg-slate-50 px-4 py-5 text-center text-sm text-slate-500">
            No designs yet. Click "Add New Design" to create the first concept.
          </div>
        )}
      </div>
    </section>
  );
}
