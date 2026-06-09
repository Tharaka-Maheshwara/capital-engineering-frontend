import Link from "next/link";

import { buildDesignUrl } from "@/lib/design-url";

type Design = {
  id: number;
  main_category: string;
  image_urls: string[];
};

export default function DesignsGrid({ designs }: { designs: Design[] }) {
  if (!designs || designs.length === 0) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-16 text-center text-slate-600 sm:px-6 lg:px-8">
        No designs found.
      </div>
    );
  }

  return (
    <section className="bg-white pb-14 pt-0">
      <div className="bg-[#1f3f6f]">
        <div className="mx-auto flex max-w-7xl items-center gap-4 px-4 py-5 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-semibold text-white">Designs</h2>
          <nav className="flex gap-3 overflow-x-auto text-sm text-slate-200">
            <button className="rounded-full bg-white/20 px-4 py-1.5 text-white">
              All
            </button>
            <button className="px-3 py-1.5 text-slate-100">Residential</button>
            <button className="px-3 py-1.5 text-slate-100">Commercial</button>
            <button className="px-3 py-1.5 text-slate-100">Interior</button>
          </nav>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 pt-10 sm:px-6 lg:px-8">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {designs.map((design) => {
            const img = design.image_urls?.[0] ?? null;

            return (
              <article
                key={design.id}
                className="group overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-[0_14px_40px_rgba(15,23,42,0.10)] ring-1 ring-transparent transition-all duration-300 hover:-translate-y-1 hover:border-slate-200 hover:ring-blue-200/60 hover:shadow-[0_24px_70px_rgba(15,23,42,0.18)]"
              >
                <Link href={buildDesignUrl(design.id)} className="block">
                  <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-100">
                    {img ? (
                      <img
                        src={img}
                        alt={design.main_category}
                        className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      />
                    ) : null}

                    <div className="absolute inset-0 bg-linear-to-t from-slate-950/10 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  </div>

                  <div className="border-t border-slate-100/80 bg-linear-to-b from-white to-slate-50/60 p-5">
                    <h3 className="text-lg font-semibold text-slate-900 transition-colors duration-300 group-hover:text-[#1f3f6f]">
                      {design.main_category}
                    </h3>
                  </div>
                </Link>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}