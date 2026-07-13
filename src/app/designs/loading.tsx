export default function DesignsLoading() {
  return (
    <main>
      {/* Hero skeleton */}
      <section className="relative overflow-hidden bg-slate-900">
        <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
          <div className="h-4 w-28 animate-pulse rounded bg-slate-700" />
          <div className="mt-4 h-10 w-3/4 max-w-xl animate-pulse rounded bg-slate-700" />
          <div className="mt-5 h-5 w-2/3 max-w-lg animate-pulse rounded bg-slate-700" />
        </div>
      </section>

      {/* Grid skeleton */}
      <section className="bg-white py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className="overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-[0_14px_40px_rgba(15,23,42,0.06)]"
              >
                <div className="aspect-square w-full animate-pulse bg-slate-200" />
                <div className="p-4 space-y-2">
                  <div className="h-4 w-3/4 animate-pulse rounded bg-slate-200" />
                  <div className="h-3 w-1/2 animate-pulse rounded bg-slate-100" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
