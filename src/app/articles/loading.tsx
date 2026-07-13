export default function ArticlesLoading() {
  return (
    <main className="bg-slate-900 min-h-screen">
      <div className="container mx-auto px-4 py-24 sm:px-6 lg:px-8">
        {/* Header skeleton */}
        <div className="text-center">
          <div className="mx-auto h-10 w-48 animate-pulse rounded bg-slate-700" />
          <div className="mx-auto mt-6 h-5 w-2/3 max-w-lg animate-pulse rounded bg-slate-700" />
        </div>

        {/* Grid skeleton */}
        <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="flex flex-col overflow-hidden rounded-lg bg-slate-800/60"
            >
              <div className="h-48 w-full animate-pulse bg-slate-700" />
              <div className="flex flex-1 flex-col justify-between p-6 space-y-3">
                <div className="h-3 w-16 animate-pulse rounded bg-slate-600" />
                <div className="h-5 w-3/4 animate-pulse rounded bg-slate-600" />
                <div className="space-y-2">
                  <div className="h-3 w-full animate-pulse rounded bg-slate-700" />
                  <div className="h-3 w-5/6 animate-pulse rounded bg-slate-700" />
                  <div className="h-3 w-2/3 animate-pulse rounded bg-slate-700" />
                </div>
                <div className="mt-4 h-3 w-28 animate-pulse rounded bg-slate-700" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
