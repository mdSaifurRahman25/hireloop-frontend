"use client";

import Link from "next/link";
import { Briefcase, Search } from "lucide-react";
import type { ApplicationItem } from "@/types";
import { JobRoleIcon } from "./JobRoleIcon";
import { StatusBadge } from "./StatusBadge";

interface ApplicationTableProps {
  applications: ApplicationItem[];
  totalCount: number;
  isLoading: boolean;
  searchQuery: string;
  tabFilter: "Active" | "Archived";
  onSelectApp: (app: ApplicationItem) => void;
  onClearSearch: () => void;
  onShowActive: () => void;
}

export function ApplicationTable({
  applications,
  totalCount,
  isLoading,
  searchQuery,
  tabFilter,
  onSelectApp,
  onClearSearch,
  onShowActive,
}: ApplicationTableProps) {
  return (
    <div className="overflow-hidden rounded-2xl border border-white/[0.08] bg-[#121212]">
      {/* Desktop Table Header */}
      <div className="hidden grid-cols-[minmax(0,3.5fr)_minmax(0,2.5fr)_minmax(0,1.8fr)_minmax(0,1.5fr)_minmax(0,1fr)] items-center border-b border-white/[0.06] px-6 py-3.5 text-xs font-medium text-zinc-400 md:grid">
        <span>Job Title</span>
        <span>Company</span>
        <span>Applied</span>
        <span>Status</span>
        <span className="text-right">Action</span>
      </div>

      {/* Loading Skeleton */}
      {isLoading ? (
        <div className="space-y-4 p-6 animate-pulse">
          {[1, 2, 3, 4, 5].map((i) => (
            <div
              key={i}
              className="flex items-center justify-between gap-4 border-b border-white/[0.04] pb-4 last:border-0 last:pb-0"
            >
              <div className="flex items-center gap-3">
                <div className="size-10 rounded-xl bg-white/10" />
                <div className="space-y-1.5">
                  <div className="h-4 w-44 rounded bg-white/10" />
                  <div className="h-3 w-28 rounded bg-white/5" />
                </div>
              </div>
              <div className="h-4 w-28 rounded bg-white/10" />
              <div className="h-4 w-20 rounded bg-white/5" />
              <div className="h-6 w-16 rounded-full bg-white/10" />
              <div className="h-4 w-12 rounded bg-white/5" />
            </div>
          ))}
        </div>
      ) : totalCount === 0 ? (
        /* Empty State - No Applications in Database */
        <div className="py-16 text-center">
          <Briefcase className="mx-auto size-10 text-zinc-600" />
          <h3 className="mt-3 text-base font-semibold text-white">
            No applications yet
          </h3>
          <p className="mx-auto mt-1 max-w-sm text-xs text-zinc-400">
            You haven&apos;t submitted any job applications yet. Browse
            available jobs and apply to roles matching your skills.
          </p>
          <div className="mt-5">
            <Link
              href="/browse-jobs"
              className="inline-flex items-center gap-1.5 rounded-xl bg-white px-5 py-2.5 text-xs font-semibold text-black transition-colors hover:bg-zinc-200"
            >
              Browse Available Jobs
            </Link>
          </div>
        </div>
      ) : applications.length === 0 ? (
        /* Empty State - Filter or Search has no results */
        <div className="py-14 text-center">
          <Search className="mx-auto size-8 text-zinc-600" />
          <p className="mt-3 text-sm font-medium text-white">
            No applications match your criteria
          </p>
          <p className="mt-1 text-xs text-zinc-500">
            {searchQuery
              ? `No applications found matching "${searchQuery}".`
              : `You currently have no ${tabFilter.toLowerCase()} applications.`}
          </p>
          <div className="mt-4 flex justify-center gap-2">
            {searchQuery && (
              <button
                type="button"
                onClick={onClearSearch}
                className="rounded-lg border border-white/10 px-3.5 py-1.5 text-xs font-medium text-zinc-300 hover:bg-white/5"
              >
                Clear Search
              </button>
            )}
            {tabFilter === "Archived" && (
              <button
                type="button"
                onClick={onShowActive}
                className="rounded-lg border border-white/10 px-3.5 py-1.5 text-xs font-medium text-zinc-300 hover:bg-white/5"
              >
                Show Active
              </button>
            )}
          </div>
        </div>
      ) : (
        <ul className="divide-y divide-white/[0.06]">
          {applications.map((app) => (
            <li
              key={app.id}
              className="transition-colors hover:bg-white/[0.02]"
            >
              {/* Desktop Row */}
              <div className="hidden grid-cols-[minmax(0,3.5fr)_minmax(0,2.5fr)_minmax(0,1.8fr)_minmax(0,1.5fr)_minmax(0,1fr)] items-center px-6 py-4 md:grid">
                {/* Job Title & Subtitle with Icon */}
                <div className="flex items-center gap-3.5 min-w-0 pr-4">
                  <JobRoleIcon type={app.iconType} />
                  <div className="min-w-0 flex-1">
                    <h3 className="truncate text-sm font-semibold text-white">
                      {app.title}
                    </h3>
                    <p className="text-xs text-zinc-400">
                      {app.type} • {app.workMode}
                    </p>
                  </div>
                </div>

                {/* Company */}
                <span className="truncate text-sm text-zinc-300">
                  {app.company}
                </span>

                {/* Applied Time */}
                <span className="text-xs text-zinc-400">
                  {app.appliedDate}
                </span>

                {/* Status Badge */}
                <div>
                  <StatusBadge status={app.status} />
                </div>

                {/* Action Link */}
                <div className="text-right">
                  <button
                    type="button"
                    onClick={() => onSelectApp(app)}
                    className="text-xs font-medium text-zinc-300 transition-colors hover:text-white"
                  >
                    Details
                  </button>
                </div>
              </div>

              {/* Mobile Responsive Card (< md screens) */}
              <div className="flex flex-col gap-3 p-4 md:hidden">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3 min-w-0">
                    <JobRoleIcon type={app.iconType} />
                    <div className="min-w-0">
                      <h3 className="truncate text-sm font-semibold text-white">
                        {app.title}
                      </h3>
                      <p className="text-xs text-zinc-400">
                        {app.company} • {app.type}
                      </p>
                    </div>
                  </div>
                  <StatusBadge status={app.status} />
                </div>

                <div className="flex items-center justify-between border-t border-white/[0.06] pt-3 text-xs">
                  <span className="text-zinc-500">
                    Applied {app.appliedDate}
                  </span>
                  <button
                    type="button"
                    onClick={() => onSelectApp(app)}
                    className="font-medium text-indigo-400 hover:text-indigo-300"
                  >
                    View Details →
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
