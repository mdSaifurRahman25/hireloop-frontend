export function CheckoutSkeleton() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 animate-pulse">
      <div className="h-8 w-64 rounded-xl bg-white/10 mb-2" />
      <div className="h-4 w-96 rounded-lg bg-white/5 mb-8" />

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
        <div className="space-y-6 lg:col-span-7">
          <div className="h-64 rounded-2xl border border-white/[0.08] bg-[#121212]" />
          <div className="h-48 rounded-2xl border border-white/[0.08] bg-[#121212]" />
          <div className="h-44 rounded-2xl border border-white/[0.08] bg-[#121212]" />
        </div>

        <div className="lg:col-span-5">
          <div className="h-96 rounded-2xl border border-white/[0.08] bg-[#121212]" />
        </div>
      </div>
    </div>
  );
}
