"use client";

import type { ApplicationMetrics } from "@/types";

interface ApplicationStatCardsProps {
  metrics: ApplicationMetrics;
  isLoading?: boolean;
}

export function ApplicationStatCards({
  metrics,
  isLoading = false,
}: ApplicationStatCardsProps) {
  return (
    <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
      {/* Total Applied */}
      <div className="rounded-2xl border border-white/[0.08] bg-[#121212] p-4 sm:p-5">
        <span className="text-xs font-medium text-zinc-400">Total Applied</span>
        <p className="mt-1.5 text-2xl sm:text-3xl font-bold tracking-tight text-white">
          {isLoading ? "—" : metrics.totalApplied}
        </p>
      </div>

      {/* Shortlisted */}
      <div className="rounded-2xl border border-white/[0.08] bg-[#121212] p-4 sm:p-5">
        <span className="text-xs font-medium text-zinc-400">Shortlisted</span>
        <p className="mt-1.5 text-2xl sm:text-3xl font-bold tracking-tight text-white">
          {isLoading ? "—" : metrics.shortlisted}
        </p>
      </div>

      {/* Interviews */}
      <div className="rounded-2xl border border-white/[0.08] bg-[#121212] p-4 sm:p-5">
        <span className="text-xs font-medium text-zinc-400">Interviews</span>
        <p className="mt-1.5 text-2xl sm:text-3xl font-bold tracking-tight text-amber-400">
          {isLoading ? "—" : metrics.interviews}
        </p>
      </div>

      {/* Success Rate */}
      <div className="rounded-2xl border border-white/[0.08] bg-[#121212] p-4 sm:p-5">
        <span className="text-xs font-medium text-zinc-400">Success Rate</span>
        <p className="mt-1.5 text-2xl sm:text-3xl font-bold tracking-tight text-emerald-400">
          {isLoading ? "—" : metrics.successRate}
        </p>
      </div>
    </div>
  );
}
