import { notFound } from "next/navigation";

const apiBase = process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://127.0.0.1:8000";

type DesignDetail = {
  id: number;
  main_category?: string | null;
  description?: string | null;
  sub_categories?: string[] | null;
  image_urls?: string[] | null;
  created_at?: string | null;
};

async function loadDesign(id: string): Promise<DesignDetail | null> {
  const response = await fetch(`${apiBase}/api/v1/designs/${id}`, {
    cache: "no-store",
    headers: {
      Accept: "application/json",
    },
  });

  if (!response.ok) {
    return null;
  }

  const payload = (await response.json()) as
    | {
        data?: DesignDetail;
      }
    | DesignDetail;

  if ("data" in payload && payload.data) {
    return payload.data;
  }

  return payload as DesignDetail;
}

export default async function DesignDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const design = await loadDesign(id);

  if (!design) {
    notFound();
  }

  const images = Array.isArray(design.image_urls) ? design.image_urls : [];
  const subCategories = Array.isArray(design.sub_categories)
    ? design.sub_categories
    : [];

  return (
    <main className="bg-slate-50">
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">
            Design Details
          </p>
          <h1 className="mt-2 text-3xl font-semibold tracking-[-0.03em] text-slate-900 sm:text-4xl">
            {design.main_category ?? "Untitled design"}
          </h1>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[1.15fr_0.85fr] lg:px-8">
        <div className="space-y-4">
          {images.length > 0 ? (
            <div className="overflow-hidden rounded-3xl bg-white shadow-[0_18px_40px_rgba(15,23,42,0.08)]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={images[0]}
                alt={design.main_category ?? "Design image"}
                className="h-105 w-full object-cover"
              />
            </div>
          ) : (
            <div className="flex h-105 items-center justify-center rounded-3xl border border-dashed border-slate-300 bg-white text-slate-500">
              No image available
            </div>
          )}

          {images.length > 1 ? (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {images.slice(1).map((imageUrl, index) => (
                <div
                  key={`${imageUrl}-${index}`}
                  className="overflow-hidden rounded-2xl bg-white shadow-[0_12px_26px_rgba(15,23,42,0.08)]"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={imageUrl}
                    alt={`${design.main_category ?? "Design"} ${index + 2}`}
                    className="h-44 w-full object-cover"
                  />
                </div>
              ))}
            </div>
          ) : null}
        </div>

        <aside className="space-y-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-[0_18px_40px_rgba(15,23,42,0.06)]">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">
              Overview
            </p>
            <p className="mt-3 text-base leading-7 text-slate-700">
              {design.description || "No description available."}
            </p>
          </div>

          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">
              Sub Categories
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {subCategories.length > 0 ? (
                subCategories.map((subCategory) => (
                  <span
                    key={subCategory}
                    className="inline-flex rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-sm text-slate-700"
                  >
                    {subCategory}
                  </span>
                ))
              ) : (
                <span className="text-sm text-slate-500">
                  No subcategories listed.
                </span>
              )}
            </div>
          </div>

          <div className="grid gap-4 border-t border-slate-200 pt-5 sm:grid-cols-2">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
                Design ID
              </p>
              <p className="mt-1 text-base font-medium text-slate-900">
                #{design.id}
              </p>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
                Created
              </p>
              <p className="mt-1 text-base font-medium text-slate-900">
                {design.created_at
                  ? new Date(design.created_at).toLocaleDateString()
                  : "—"}
              </p>
            </div>
          </div>
        </aside>
      </section>
    </main>
  );
}
