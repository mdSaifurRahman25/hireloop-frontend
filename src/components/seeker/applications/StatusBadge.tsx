"use client";

import { cn } from "cn";
import type { ApplicationStatus } from "@/types";

interface StatusBadgeProps {
  status: ApplicationStatus;
  className?: string;
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const styles: Record<ApplicationStatus, string> = {
    Applied: "border-zinc-700/60 bg-zinc-800/80 text-zinc-300",
    Review: "border-amber-500/30 bg-amber-500/10 text-amber-400",
    Shortlisted: "border-sky-500/30 bg-sky-500/10 text-sky-400",
    Rejected: "border-red-500/30 bg-red-500/10 text-red-400",
    Offered: "border-emerald-500/30 bg-emerald-500/10 text-emerald-400",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center justify-center rounded-full border px-3 py-0.5 text-[11px] font-medium tracking-wide",
        styles[status] ?? "border-zinc-700 bg-zinc-800 text-zinc-300",
        className,
      )}
    >
      {status}
    </span>
  );
}
