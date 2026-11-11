export function JobDetailsSkeleton() {
  return (
    <main className="min-h-screen bg-[#0a0a0a] px-3.5 py-5 sm:px-6 sm:py-8 lg:px-8">
      <div className="mx-auto max-w-[1240px] space-y-4 sm:space-y-6 animate-pulse">
        {/* Breadcrumb Skeleton */}
        <div className="h-4 w-48 rounded bg-white/10" />

        {/* Header Skeleton */}
        <div className="rounded-2xl border border-white/[0.08] bg-[#121212] p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-4">
              <div className="size-14 rounded-2xl bg-white/10" />
              <div className="space-y-2">
                <div className="h-6 w-64 rounded bg-white/10" />
                <div className="h-4 w-40 rounded bg-white/5" />
              </div>
            </div>
            <div className="flex gap-3">
              <div className="size-10 rounded-xl bg-white/10" />
              <div className="h-10 w-28 rounded-xl bg-white/10" />
            </div>
          </div>
        </div>

        {/* Quick Info Grid Skeleton */}
        <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4 sm:gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="h-20 rounded-2xl border border-white/[0.08] bg-[#121212]"
            />
          ))}
        </div>

        {/* Content Skeleton */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_340px] xl:grid-cols-[1fr_380px]">
          <div className="h-96 rounded-2xl border border-white/[0.08] bg-[#121212]" />
          <div className="h-96 rounded-2xl border border-white/[0.08] bg-[#121212]" />
        </div>
      </div>
    </main>
  );
}
