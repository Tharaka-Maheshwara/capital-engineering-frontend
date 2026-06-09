import Image from "next/image";
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

      <div className="mt-5 space-y-3">
        {designs.map((design) => (
          <article
            key={design.id}
            className="rounded-[18px] border border-slate-200 bg-slate-50/80 px-4 py-4"
          >
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div className="flex items-start gap-4">
                <div className="flex h-16 w-16 items-center justify-center overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                  {design.imageUrl ? (
                    <img
                      src={design.imageUrl}
                      alt={design.imageAlt ?? design.title}
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
                    {design.title}
                  </h3>
                  <p className="mt-1 text-sm text-slate-600">
                    {design.category} · {design.style}
                  </p>
                  <p className="mt-1 text-xs uppercase tracking-[0.12em] text-slate-500">
                    Order: {design.displayOrder} · Gallery: {design.galleryCount} images
                  </p>
                </div>
              </div>

              <span className={`shrink-0 rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] shadow-sm ${design.status === "Published" ? "bg-emerald-50 text-emerald-700" : "bg-amber-50 text-amber-700"}`}>
                {design.status}
              </span>
            </div>

            <div className="mt-4 flex items-center gap-2">
              <button
                type="button"
                onClick={() => onEdit(design)}
                className="inline-flex items-center justify-center rounded-xl border border-slate-300 bg-white px-3 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-slate-700 transition-colors hover:bg-slate-100"
              >
                Edit
              </button>
              <button
                type="button"
                onClick={() => onDelete(design.id)}
                className="inline-flex items-center justify-center rounded-xl border border-rose-200 bg-rose-50 px-3 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-rose-700 transition-colors hover:bg-rose-100"
              >
                Delete
              </button>
            </div>
          </article>
        ))}

        {designs.length === 0 && (
          <div className="rounded-[18px] border border-dashed border-slate-200 bg-slate-50 px-4 py-5 text-sm text-slate-500">
            No designs yet. Click Add New Design to create the first concept.
          </div>
        )}
      </div>
    </section>
  );
}
