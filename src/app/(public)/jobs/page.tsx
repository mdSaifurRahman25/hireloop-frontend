"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowUpRight,
  Banknote,
  Bookmark,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Clock,
  Filter,
  Flame,
  Globe,
  Search,
  SlidersHorizontal,
  Star,
  Zap,
} from "lucide-react";
import { cn } from "cn";
import type { JobDocument, JobItem } from "@/types";

const DEFAULT_JOBS: JobItem[] = [
  {
    id: "job-1",
    title: "Senior Product Designer",
    company: "TechFlow Systems",
    location: "San Francisco, CA (Remote)",
    salary: "$140k - $180k",
    type: "Full-time",
    workMode: "Remote",
    badge: { label: "Easy Apply", type: "easy-apply" },
    logoColor: "cyan",
  },
  {
    id: "job-2",
    title: "Lead Frontend Engineer",
    company: "FinGrid Solutions",
    location: "New York, NY",
    salary: "$165k - $210k",
    type: "Full-time",
    workMode: "Hybrid",
    badge: { label: "Hybrid", type: "neutral" },
    logoColor: "blue",
  },
  {
    id: "job-3",
    title: "UX Researcher",
    company: "CreativeStudio",
    location: "Austin, TX",
    salary: "$110k - $145k",
    type: "Contract",
    workMode: "On-site",
    logoColor: "amber",
  },
  {
    id: "job-4",
    title: "Machine Learning Engineer",
    company: "HealthAI Corp",
    location: "Boston, MA (Remote)",
    salary: "$180k - $250k",
    type: "Full-time",
    workMode: "Remote",
    level: "Senior",
    badge: { label: "Hot Job", type: "hot" },
    logoColor: "indigo",
  },
];

const JOB_TYPE_FILTERS = [
  { id: "Full-time", label: "Full-time", count: "1.2k" },
  { id: "Contract", label: "Contract", count: "432" },
  { id: "Freelance", label: "Freelance", count: "156" },
];

function CompanyLogo({ color }: { color: JobItem["logoColor"] }) {
  if (color === "cyan") {
    return (
      <div className="flex size-10 sm:size-12 shrink-0 items-center justify-center rounded-xl border border-emerald-500/20 bg-gradient-to-br from-emerald-950/60 to-zinc-950 shadow-inner">
        <svg viewBox="0 0 24 24" className="size-5 sm:size-6 text-emerald-400" fill="none" stroke="currentColor" strokeWidth="1.75">
          <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
        </svg>
      </div>
    );
  }

  if (color === "blue") {
    return (
      <div className="flex size-10 sm:size-12 shrink-0 items-center justify-center rounded-xl border border-sky-500/20 bg-gradient-to-br from-sky-950/60 to-zinc-950 shadow-inner">
        <svg viewBox="0 0 24 24" className="size-5 sm:size-6 text-sky-400" fill="none" stroke="currentColor" strokeWidth="1.75">
          <rect x="3" y="3" width="18" height="18" rx="3" />
          <path d="M3 9h18M9 21V9" />
        </svg>
      </div>
    );
  }

  if (color === "amber") {
    return (
      <div className="flex size-10 sm:size-12 shrink-0 items-center justify-center rounded-xl border border-amber-500/20 bg-gradient-to-br from-amber-950/60 to-zinc-950 shadow-inner">
        <svg viewBox="0 0 24 24" className="size-5 sm:size-6 text-amber-400" fill="none" stroke="currentColor" strokeWidth="1.75">
          <polygon points="12 2 22 8.5 22 15.5 12 22 2 15.5 2 8.5 12 2" />
          <line x1="12" y1="22" x2="12" y2="12" />
          <polyline points="22 8.5 12 12 2 8.5" />
        </svg>
      </div>
    );
  }

  return (
    <div className="flex size-10 sm:size-12 shrink-0 items-center justify-center rounded-xl border border-indigo-500/20 bg-gradient-to-br from-indigo-950/60 to-zinc-950 shadow-inner">
      <svg viewBox="0 0 24 24" className="size-5 sm:size-6 text-indigo-400" fill="none" stroke="currentColor" strokeWidth="1.75">
        <circle cx="12" cy="12" r="3" />
        <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
      </svg>
    </div>
  );
}

export default function JobGalleryPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTypes, setSelectedTypes] = useState<string[]>(["Full-time"]);
  const [bookmarkedIds, setBookmarkedIds] = useState<Record<string, boolean>>({});
  const [sortBy, setSortBy] = useState("Most Recent");
  const [sortDropdownOpen, setSortDropdownOpen] = useState(false);
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [jobs, setJobs] = useState<JobItem[]>(DEFAULT_JOBS);

  // Attempt to load any live jobs created in DB and prepend them
  useEffect(() => {
    const fetchApiJobs = async () => {
      try {
        const baseUri = process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:5000";
        const res = await fetch(`${baseUri}/jobs`);
        if (!res.ok) return;
        const data = await res.json();
        if (Array.isArray(data) && data.length > 0) {
          const apiJobs: JobItem[] = (data as JobDocument[]).map((doc, index) => {
            const low = doc.minSalary ?? doc.maxSalary;
            const high = doc.maxSalary ?? doc.minSalary;
            const salary =
              low && high
                ? `$${low.toLocaleString()} - $${high.toLocaleString()}`
                : "$120k - $160k";

            const colors: JobItem["logoColor"][] = ["cyan", "blue", "amber", "indigo"];
            return {
              id: doc._id ?? `api-${index}`,
              title: doc.title ?? doc.jobTitle ?? "Software Engineer",
              company: doc.companyName ?? "Hireloop Partner",
              location: doc.location ? `${doc.location}${doc.isRemote ? " (Remote)" : ""}` : "Remote",
              salary,
              type: doc.jobType ?? "Full-time",
              workMode: doc.isRemote ? "Remote" : "On-site",
              badge: doc.isRemote ? { label: "Easy Apply", type: "easy-apply" } : undefined,
              logoColor: colors[index % colors.length],
            };
          });

          // Deduplicate and merge with default jobs
          setJobs([...apiJobs, ...DEFAULT_JOBS]);
        }
      } catch {
        // Backend offline or unreachable: DEFAULT_JOBS are used
      }
    };

    fetchApiJobs();
  }, []);

  const toggleType = (typeId: string) => {
    setSelectedTypes((prev) =>
      prev.includes(typeId) ? prev.filter((t) => t !== typeId) : [...prev, typeId]
    );
  };

  const toggleBookmark = (id: string) => {
    setBookmarkedIds((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      const matchesSearch =
        searchQuery.trim() === "" ||
        job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.location.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesType =
        selectedTypes.length === 0 || selectedTypes.includes(job.type);

      return matchesSearch && matchesType;
    });
  }, [jobs, searchQuery, selectedTypes]);

  const totalCountText =
    selectedTypes.includes("Full-time") && searchQuery === ""
      ? "1,248"
      : filteredJobs.length.toLocaleString();

  return (
    <main className="min-h-screen bg-[#0a0a0a] px-3.5 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-[1240px] space-y-6">
        {/* Search Bar Banner */}
        <section
          aria-label="Search jobs"
          className="rounded-2xl border border-white/[0.08] bg-[#121212] p-2 sm:p-3 shadow-xl"
        >
          <div className="flex flex-col items-center gap-2.5 sm:flex-row sm:gap-3">
            <div className="relative w-full flex-1">
              <Search
                aria-hidden="true"
                className="pointer-events-none absolute left-3.5 sm:left-4 top-1/2 size-4.5 sm:size-5 -translate-y-1/2 text-zinc-500"
              />
              <input
                type="text"
                placeholder="Search by job title, keywords..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-xl bg-transparent py-2.5 pr-4 pl-10 sm:pl-12 text-sm text-white placeholder:text-zinc-500 outline-none transition-colors"
              />
            </div>
            <button
              type="button"
              className="w-full shrink-0 rounded-xl bg-white px-7 py-2.5 sm:py-3 text-sm font-semibold text-black transition-colors hover:bg-zinc-200 sm:w-auto"
            >
              Search Jobs
            </button>
          </div>
        </section>

        {/* Mobile Filter Toggle Button */}
        <div className="flex items-center justify-between lg:hidden">
          <button
            type="button"
            onClick={() => setShowMobileFilters(!showMobileFilters)}
            className="flex items-center gap-2 rounded-xl border border-white/10 bg-[#121212] px-3.5 py-2 text-xs font-medium text-zinc-200 transition-colors hover:border-white/20 hover:text-white"
          >
            <SlidersHorizontal className="size-3.5 text-zinc-400" />
            <span>Filters ({selectedTypes.length})</span>
          </button>
          <span className="text-xs text-zinc-400">
            {totalCountText} jobs available
          </span>
        </div>

        {/* Two-Column Grid: Filters Sidebar + Jobs Results */}
        <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-[280px_1fr]">
          {/* Filters Sidebar (Collapsible on Mobile, always visible on Desktop) */}
          <aside
            className={cn(
              "w-full shrink-0 rounded-2xl border border-white/[0.08] bg-[#121212] p-5 sm:p-6 transition-all",
              showMobileFilters ? "block" : "hidden lg:block"
            )}
          >
            <div className="flex items-center justify-between">
              <h2 className="text-base font-semibold text-white flex items-center gap-2">
                <Filter className="size-4 text-zinc-400 hidden sm:inline" />
                Filters
              </h2>
              {selectedTypes.length > 0 && (
                <button
                  type="button"
                  onClick={() => setSelectedTypes([])}
                  className="text-xs text-zinc-400 hover:text-white transition-colors"
                >
                  Clear all
                </button>
              )}
            </div>

            <div className="mt-5 border-t border-white/[0.06] pt-4 sm:pt-5">
              <h3 className="text-sm font-semibold text-zinc-200">Job Type</h3>
              <div className="mt-3.5 space-y-2.5 sm:space-y-3">
                {JOB_TYPE_FILTERS.map((type) => {
                  const isChecked = selectedTypes.includes(type.id);
                  return (
                    <button
                      key={type.id}
                      type="button"
                      onClick={() => toggleType(type.id)}
                      className="group flex w-full cursor-pointer items-center justify-between py-1 text-left transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <span
                          className={cn(
                            "flex size-4.5 items-center justify-center rounded border transition-colors",
                            isChecked
                              ? "border-white bg-white text-black"
                              : "border-white/20 bg-white/[0.04] group-hover:border-white/40"
                          )}
                        >
                          {isChecked && <Check className="size-3 stroke-[3]" />}
                        </span>
                        <span
                          className={cn(
                            "text-sm transition-colors",
                            isChecked
                              ? "font-medium text-white"
                              : "text-zinc-400 group-hover:text-zinc-200"
                          )}
                        >
                          {type.label}
                        </span>
                      </div>
                      <span className="text-xs text-zinc-500 font-mono">{type.count}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </aside>

          {/* Right Section: Results Header + Job Cards + Pagination */}
          <section aria-label="Available jobs" className="flex flex-col">
            {/* Header: Found count + Sort Dropdown */}
            <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
              <h2 className="text-sm sm:text-base font-semibold text-white sm:text-lg">
                Found {totalCountText} Professional Jobs
              </h2>

              <div className="relative">
                <div className="flex items-center gap-2">
                  <span className="text-xs text-zinc-400">Sort by:</span>
                  <button
                    type="button"
                    onClick={() => setSortDropdownOpen(!sortDropdownOpen)}
                    className="flex items-center gap-2 rounded-lg border border-white/10 bg-[#141414] px-3 py-1.5 text-xs text-zinc-200 transition-colors hover:border-white/20"
                  >
                    <span>{sortBy}</span>
                    <ChevronDown className="size-3.5 text-zinc-400" />
                  </button>
                </div>

                {sortDropdownOpen && (
                  <div className="absolute right-0 z-20 mt-1.5 w-36 overflow-hidden rounded-xl border border-white/10 bg-[#161616] py-1 shadow-2xl backdrop-blur-md">
                    {["Most Recent", "Highest Salary", "Full-time First"].map((option) => (
                      <button
                        key={option}
                        type="button"
                        onClick={() => {
                          setSortBy(option);
                          setSortDropdownOpen(false);
                        }}
                        className={cn(
                          "w-full px-3 py-1.5 text-left text-xs transition-colors hover:bg-white/10",
                          sortBy === option ? "font-semibold text-white" : "text-zinc-400"
                        )}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Job Cards List */}
            <div className="space-y-3.5">
              {filteredJobs.length === 0 ? (
                <div className="rounded-2xl border border-white/[0.08] bg-[#121212] px-6 py-12 text-center">
                  <p className="text-sm font-medium text-white">No jobs match your filter criteria.</p>
                  <p className="mt-1 text-xs text-zinc-500">Try searching with different keywords or clearing filters.</p>
                  <button
                    type="button"
                    onClick={() => {
                      setSearchQuery("");
                      setSelectedTypes(["Full-time", "Contract", "Freelance"]);
                    }}
                    className="mt-4 rounded-lg bg-white/10 px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-white/20"
                  >
                    Reset Filters
                  </button>
                </div>
              ) : (
                filteredJobs.map((job) => {
                  const isBookmarked = !!bookmarkedIds[job.id];
                  return (
                    <article
                      key={job.id}
                      onClick={() => router.push(`/jobs/${job.id}`)}
                      className="group relative cursor-pointer rounded-2xl border border-white/[0.08] bg-[#121212] p-4 sm:p-5 transition-all duration-200 hover:border-white/20 hover:bg-[#151515]"
                    >
                      <div className="flex items-start justify-between gap-3 sm:gap-4">
                        <div className="flex items-start gap-3 sm:gap-4 min-w-0 flex-1">
                          <CompanyLogo color={job.logoColor} />

                          <div className="min-w-0 flex-1">
                            <h3 className="text-sm sm:text-base font-semibold text-white transition-colors group-hover:text-indigo-300">
                              <Link
                                href={`/jobs/${job.id}`}
                                onClick={(e) => e.stopPropagation()}
                                className="hover:underline"
                              >
                                {job.title}
                              </Link>
                            </h3>
                            <p className="mt-0.5 text-xs text-zinc-400 truncate">
                              {job.company} • {job.location}
                            </p>

                            {/* Badges Row */}
                            <div className="mt-3 flex flex-wrap items-center gap-1.5 sm:gap-2">
                              {/* Salary Badge */}
                              <span className="inline-flex items-center gap-1 rounded-lg border border-white/10 bg-white/[0.03] px-2 py-0.5 sm:px-2.5 sm:py-1 text-[11px] sm:text-xs font-medium text-zinc-300">
                                <Banknote aria-hidden="true" className="size-3 sm:size-3.5 text-zinc-400" />
                                {job.salary}
                              </span>

                              {/* Job Type Badge */}
                              <span className="inline-flex items-center gap-1 rounded-lg border border-white/10 bg-white/[0.03] px-2 py-0.5 sm:px-2.5 sm:py-1 text-[11px] sm:text-xs font-medium text-zinc-300">
                                <Clock aria-hidden="true" className="size-3 sm:size-3.5 text-zinc-400" />
                                {job.type}
                              </span>

                              {/* Level Badge if present */}
                              {job.level && (
                                <span className="inline-flex items-center gap-1 rounded-lg border border-white/10 bg-white/[0.03] px-2 py-0.5 sm:px-2.5 sm:py-1 text-[11px] sm:text-xs font-medium text-zinc-300">
                                  <Star aria-hidden="true" className="size-3 sm:size-3.5 text-zinc-400" />
                                  {job.level}
                                </span>
                              )}

                              {/* Special Status Badge */}
                              {job.badge && (
                                <>
                                  {job.badge.type === "easy-apply" && (
                                    <span className="inline-flex items-center gap-1 rounded-lg border border-emerald-500/20 bg-emerald-500/10 px-2 py-0.5 sm:px-2.5 sm:py-1 text-[11px] sm:text-xs font-medium text-emerald-400">
                                      <Zap aria-hidden="true" className="size-3 sm:size-3.5 fill-emerald-400 text-emerald-400" />
                                      {job.badge.label}
                                    </span>
                                  )}

                                  {job.badge.type === "hot" && (
                                    <span className="inline-flex items-center gap-1 rounded-lg border border-amber-500/20 bg-amber-500/10 px-2 py-0.5 sm:px-2.5 sm:py-1 text-[11px] sm:text-xs font-medium text-amber-400">
                                      <Flame aria-hidden="true" className="size-3 sm:size-3.5 fill-amber-400 text-amber-400" />
                                      {job.badge.label}
                                    </span>
                                  )}

                                  {job.badge.type === "neutral" && (
                                    <span className="inline-flex items-center gap-1 rounded-lg border border-white/10 bg-white/[0.03] px-2 py-0.5 sm:px-2.5 sm:py-1 text-[11px] sm:text-xs font-medium text-zinc-300">
                                      <Globe aria-hidden="true" className="size-3 sm:size-3.5 text-zinc-400" />
                                      {job.badge.label}
                                    </span>
                                  )}
                                </>
                              )}
                            </div>
                          </div>
                        </div>

                        {/* Right Area: Bookmark & View Details indicator */}
                        <div className="flex flex-col items-end justify-between self-stretch gap-2">
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleBookmark(job.id);
                            }}
                            aria-label={isBookmarked ? "Remove bookmark" : "Bookmark this job"}
                            className="rounded-lg p-1 text-zinc-500 transition-colors hover:text-white"
                          >
                            <Bookmark
                              className={cn(
                                "size-4 sm:size-4.5 transition-all",
                                isBookmarked ? "fill-white text-white" : ""
                              )}
                            />
                          </button>

                          <span className="hidden sm:inline-flex items-center gap-1 text-[11px] text-zinc-500 group-hover:text-zinc-200 transition-colors">
                            Details
                            <ArrowUpRight className="size-3" />
                          </span>
                        </div>
                      </div>
                    </article>
                  );
                })
              )}
            </div>

            {/* Responsive Pagination Controls */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-1.5 sm:gap-2">
              <button
                type="button"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                aria-label="Previous page"
                className="flex size-7 sm:size-8 items-center justify-center rounded-lg border border-white/10 bg-[#121212] text-zinc-400 transition-colors hover:bg-white/5 hover:text-white disabled:pointer-events-none disabled:opacity-30"
              >
                <ChevronLeft className="size-3.5 sm:size-4" />
              </button>

              {[1, 2, 3].map((page) => (
                <button
                  key={page}
                  type="button"
                  onClick={() => setCurrentPage(page)}
                  className={cn(
                    "flex size-7 sm:size-8 items-center justify-center rounded-lg text-xs font-semibold transition-colors",
                    currentPage === page
                      ? "bg-white text-black"
                      : "text-zinc-400 hover:bg-white/5 hover:text-white"
                  )}
                >
                  {page}
                </button>
              ))}

              <span className="flex size-7 sm:size-8 items-center justify-center text-xs text-zinc-600">...</span>

              <button
                type="button"
                onClick={() => setCurrentPage(42)}
                className={cn(
                  "flex size-7 sm:size-8 items-center justify-center rounded-lg text-xs font-semibold transition-colors",
                  currentPage === 42
                    ? "bg-white text-black"
                    : "text-zinc-400 hover:bg-white/5 hover:text-white"
                )}
              >
                42
              </button>

              <button
                type="button"
                onClick={() => setCurrentPage((prev) => Math.min(42, prev + 1))}
                aria-label="Next page"
                className="flex size-7 sm:size-8 items-center justify-center rounded-lg border border-white/10 bg-[#121212] text-zinc-400 transition-colors hover:bg-white/5 hover:text-white"
              >
                <ChevronRight className="size-3.5 sm:size-4" />
              </button>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
