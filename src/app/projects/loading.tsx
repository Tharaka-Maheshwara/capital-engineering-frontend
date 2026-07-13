export default function ProjectsLoading() {
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

      {/* Filter bar skeleton */}
      <div className="bg-[#1f3f6f]">
        <div className="mx-auto flex max-w-7xl items-center gap-4 px-4 py-5 sm:px-6 lg:px-8">
          <div className="h-7 w-24 animate-pulse rounded bg-white/20" />
          <div className="flex gap-3">
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="h-8 w-24 animate-pulse rounded-full bg-white/10"
              />
            ))}
          </div>
        </div>
      </div>

      {/* Grid skeleton */}
      <section className="bg-white pb-12">
        <div className="mx-auto max-w-7xl px-4 pt-8 sm:px-6 lg:px-8">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-[0_14px_40px_rgba(15,23,42,0.06)]"
              >
                <div className="aspect-16/10 w-full animate-pulse bg-slate-200" />
                <div className="p-6 space-y-3">
                  <div className="h-5 w-3/4 animate-pulse rounded bg-slate-200" />
                  <div className="h-4 w-full animate-pulse rounded bg-slate-100" />
                  <div className="h-4 w-5/6 animate-pulse rounded bg-slate-100" />
                  <div className="mt-4 space-y-2">
                    <div className="h-4 w-1/2 animate-pulse rounded bg-slate-100" />
                    <div className="h-4 w-2/5 animate-pulse rounded bg-slate-100" />
                    <div className="h-4 w-1/3 animate-pulse rounded bg-slate-100" />
                  </div>
                  <div className="mt-4 flex justify-end">
                    <div className="h-9 w-28 animate-pulse rounded-md bg-slate-200" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
