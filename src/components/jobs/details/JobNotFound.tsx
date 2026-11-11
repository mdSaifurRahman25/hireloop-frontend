import Link from "next/link";
import { ArrowLeft, Clock } from "lucide-react";

export function JobNotFound({ id }: { id: string }) {
  return (
    <main className="min-h-screen bg-[#0a0a0a] px-3.5 py-5 sm:px-6 sm:py-8 lg:px-8">
      <div className="mx-auto max-w-[1240px] space-y-6">
        <nav
          aria-label="Breadcrumb"
          className="flex items-center gap-2 text-xs text-zinc-500"
        >
          <Link
            href="/browse-jobs"
            className="inline-flex items-center gap-1.5 transition-colors hover:text-zinc-200"
          >
            <ArrowLeft className="size-3.5" />
            Browse Jobs
          </Link>
          <span>/</span>
          <span className="text-zinc-400">Not Found</span>
        </nav>

        <div className="rounded-2xl border border-white/[0.08] bg-[#121212] p-8 sm:p-14 text-center">
          <div className="mx-auto flex size-14 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04] text-zinc-400">
            <Clock className="size-6 text-zinc-400" />
          </div>
          <h1 className="mt-4 text-lg sm:text-xl font-bold text-white">
            Job Posting Not Found
          </h1>
          <p className="mx-auto mt-2 max-w-md text-xs sm:text-sm text-zinc-400">
            The job posting{" "}
            {id ? (
              <span className="font-mono text-zinc-300">({id})</span>
            ) : null}{" "}
            does not exist, has expired, or may have been removed.
          </p>
          <div className="mt-6 flex justify-center">
            <Link
              href="/browse-jobs"
              className="inline-flex items-center gap-2 rounded-xl bg-white px-5 py-2.5 text-xs font-semibold text-black transition-colors hover:bg-zinc-200"
            >
              <ArrowLeft className="size-3.5" />
              Browse Available Jobs
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
