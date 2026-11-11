"use client";

import { Suspense, useCallback, useEffect, useId, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  ArrowUpRight,
  Banknote,
  Bookmark,
  Briefcase,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Clock,
  Filter,
  Flame,
  Globe,
  Loader2,
  Search,
  SlidersHorizontal,
  Star,
  Zap,
} from "lucide-react";
import { cn } from "cn";
import type { JobDocument, JobItem } from "@/types";
import { getBrowseJobs } from "@/lib/api/jobs";
import {
  BROWSE_JOB_TYPES,
  JOB_CATEGORIES,
  SALARY_RANGES,
  SORT_OPTIONS,
} from "@/lib/constants/jobs";

const DEFAULT_JOBS: JobItem[] = [
  {
    id: "job-1",
    title: "Senior Product Designer",
    company: "TechFlow Systems",
    location: "San Francisco, CA (Remote)",
    salary: "$140k - $180k",
    type: "Full-time",
    category: "Design",
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
    category: "Engineering & Tech",
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
    category: "Design",
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
    category: "Engineering & Tech",
    workMode: "Remote",
    level: "Senior",
    badge: { label: "Hot Job", type: "hot" },
    logoColor: "indigo",
  },
  {
    id: "job-5",
    title: "Digital Marketing Executive",
    company: "GrowthLab",
    location: "Dhaka, Bangladesh",
    salary: "$50k - $75k",
    type: "Full-time",
    category: "Marketing",
    workMode: "On-site",
    logoColor: "indigo",
  },
  {
    id: "job-6",
    title: "Product Manager",
    company: "CloudNest",
    location: "Remote",
    salary: "$120k - $150k",
    type: "Full-time",
    category: "Product",
    workMode: "Remote",
    logoColor: "cyan",
  },
];

function CompanyLogo({ color }: { color: JobItem["logoColor"] }) {
  if (color === "cyan") {
    return (
      <div className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-emerald-500/20 bg-gradient-to-br from-emerald-950/60 to-zinc-950 shadow-inner sm:size-12">
        <svg
          viewBox="0 0 24 24"
          className="size-5 text-emerald-400 sm:size-6"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.75"
        >
          <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
        </svg>
      </div>
    );
  }

  if (color === "blue") {
    return (
      <div className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-sky-500/20 bg-gradient-to-br from-sky-950/60 to-zinc-950 shadow-inner sm:size-12">
        <svg
          viewBox="0 0 24 24"
          className="size-5 text-sky-400 sm:size-6"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.75"
        >
          <rect x="3" y="3" width="18" height="18" rx="3" />
          <path d="M3 9h18M9 21V9" />
        </svg>
      </div>
    );
  }

  if (color === "amber") {
    return (
      <div className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-amber-500/20 bg-gradient-to-br from-amber-950/60 to-zinc-950 shadow-inner sm:size-12">
        <svg
          viewBox="0 0 24 24"
          className="size-5 text-amber-400 sm:size-6"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.75"
        >
          <polygon points="12 2 22 8.5 22 15.5 12 22 2 15.5 2 8.5 12 2" />
          <line x1="12" y1="22" x2="12" y2="12" />
          <polyline points="22 8.5 12 12 2 8.5" />
        </svg>
      </div>
    );
  }

  return (
    <div className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-indigo-500/20 bg-gradient-to-br from-indigo-950/60 to-zinc-950 shadow-inner sm:size-12">
      <svg
        viewBox="0 0 24 24"
        className="size-5 text-indigo-400 sm:size-6"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
      >
        <circle cx="12" cy="12" r="3" />
        <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
      </svg>
    </div>
  );
}

function BrowseJobsSkeleton() {
  return (
    <main className="min-h-screen bg-[#0a0a0a] px-3.5 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-[1240px] space-y-6">
        <div className="h-16 w-full animate-pulse rounded-2xl border border-white/[0.08] bg-[#121212]" />
        <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-[280px_1fr]">
          <div className="h-96 w-full animate-pulse rounded-2xl border border-white/[0.08] bg-[#121212]" />
          <div className="space-y-4">
            <div className="h-8 w-60 animate-pulse rounded-lg bg-white/[0.05]" />
            <div className="h-32 w-full animate-pulse rounded-2xl border border-white/[0.08] bg-[#121212]" />
            <div className="h-32 w-full animate-pulse rounded-2xl border border-white/[0.08] bg-[#121212]" />
            <div className="h-32 w-full animate-pulse rounded-2xl border border-white/[0.08] bg-[#121212]" />
          </div>
        </div>
      </div>
    </main>
  );
}

function BrowseJobsContent() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const searchInputId = useId();

  // Read URL query parameters
  const qParam = searchParams.get("q") ?? "";
  const typeParam = searchParams.get("type") ?? "All";
  const categoryParam = searchParams.get("category") ?? "All";
  const salaryParam = searchParams.get("salary") ?? "All";
  const sortParam = searchParams.get("sort") ?? "Most Recent";
  const pageParam = Math.max(1, parseInt(searchParams.get("page") ?? "1", 10) || 1);

  // Local state for search input to ensure instant typing response
  const [searchInput, setSearchInput] = useState(qParam);
  const [prevQParam, setPrevQParam] = useState(qParam);
  const [sortDropdownOpen, setSortDropdownOpen] = useState(false);
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [bookmarkedIds, setBookmarkedIds] = useState<Record<string, boolean>>({});

  // Sync search input if URL qParam changes externally (e.g. browser back/forward or clear)
  if (qParam !== prevQParam) {
    setPrevQParam(qParam);
    setSearchInput(qParam);
  }

  // Data states from backend
  const [jobs, setJobs] = useState<JobItem[]>(DEFAULT_JOBS);
  const [totalJobs, setTotalJobs] = useState(DEFAULT_JOBS.length);
  const [totalPages, setTotalPages] = useState(1);
  const [typeCounts, setTypeCounts] = useState<Record<string, number>>({});
  const [categoryCounts, setCategoryCounts] = useState<Record<string, number>>({});
  const [isLoading, setIsLoading] = useState(false);

  // Centralized URL Search Params Updater
  const updateParams = useCallback(
    (updates: Record<string, string | null>) => {
      const current = new URLSearchParams(Array.from(searchParams.entries()));

      Object.entries(updates).forEach(([key, value]) => {
        if (value === null || value === "" || value === "All") {
          current.delete(key);
        } else {
          current.set(key, value);
        }
      });

      // Reset page to 1 on any filter or query change unless explicit page is provided
      if (!("page" in updates)) {
        current.delete("page");
      }

      const queryString = current.toString();
      const targetUrl = queryString ? `${pathname}?${queryString}` : pathname;
      router.push(targetUrl, { scroll: false });
    },
    [pathname, router, searchParams],
  );

  // 300ms Debounce for text search input
  useEffect(() => {
    if (searchInput === qParam) return;

    const timer = setTimeout(() => {
      updateParams({ q: searchInput.trim() || null });
    }, 300);

    return () => clearTimeout(timer);
  }, [searchInput, qParam, updateParams]);

  // Fetch jobs from backend based on URL query parameters
  useEffect(() => {
    let isSubscribed = true;

    const loadJobs = async () => {
      setIsLoading(true);
      try {
        const response = await getBrowseJobs({
          q: qParam,
          type: typeParam,
          category: categoryParam,
          salaryRange: salaryParam,
          sort: sortParam,
          page: pageParam,
          limit: 10,
        });

        if (!isSubscribed) return;

        if (response && Array.isArray(response.jobs) && response.jobs.length > 0) {
          const colors: JobItem["logoColor"][] = ["cyan", "blue", "amber", "indigo"];
          const mappedJobs: JobItem[] = response.jobs.map((doc: JobDocument, idx: number) => {
            const low = doc.minSalary ?? doc.maxSalary;
            const high = doc.maxSalary ?? doc.minSalary;
            const frequency = doc.frequency ? ` / ${doc.frequency.replace("per ", "")}` : "";
            const salary =
              low && high
                ? low === high
                  ? `$${low.toLocaleString()}${frequency}`
                  : `$${low.toLocaleString()} - $${high.toLocaleString()}${frequency}`
                : "Salary Undisclosed";

            return {
              id: doc._id ?? `job-${idx}`,
              title: doc.title ?? doc.jobTitle ?? "Software Engineer",
              company: doc.companyName ?? "Hireloop Partner",
              location: doc.location ? `${doc.location}${doc.isRemote ? " (Remote)" : ""}` : "Remote",
              salary,
              type: doc.jobType ?? "Full-time",
              category: doc.category ?? "Engineering & Tech",
              workMode: doc.isRemote ? "Remote" : "On-site",
              badge: doc.isRemote ? { label: "Easy Apply", type: "easy-apply" } : undefined,
              logoColor: colors[idx % colors.length],
            };
          });

          setJobs(mappedJobs);
          setTotalJobs(response.total);
          setTotalPages(Math.max(1, response.totalPages || 1));
          if (response.typeCounts) setTypeCounts(response.typeCounts);
          if (response.categoryCounts) setCategoryCounts(response.categoryCounts);
        } else if (response && response.total === 0) {
          // Explicit zero results from backend filter
          setJobs([]);
          setTotalJobs(0);
          setTotalPages(1);
          if (response.typeCounts) setTypeCounts(response.typeCounts);
          if (response.categoryCounts) setCategoryCounts(response.categoryCounts);
        } else {
          // Fallback client filtering if backend response is empty/offline
          applyFallbackFilter();
        }
      } catch {
        if (!isSubscribed) return;
        applyFallbackFilter();
      } finally {
        if (isSubscribed) setIsLoading(false);
      }
    };

    const applyFallbackFilter = () => {
      let filtered = [...DEFAULT_JOBS];

      if (qParam.trim()) {
        const query = qParam.toLowerCase();
        filtered = filtered.filter(
          (j) =>
            j.title.toLowerCase().includes(query) ||
            j.company.toLowerCase().includes(query) ||
            j.location.toLowerCase().includes(query),
        );
      }

      if (typeParam && typeParam !== "All") {
        filtered = filtered.filter((j) => j.type.toLowerCase() === typeParam.toLowerCase());
      }

      if (categoryParam && categoryParam !== "All") {
        filtered = filtered.filter(
          (j) => j.category?.toLowerCase() === categoryParam.toLowerCase(),
        );
      }

      if (sortParam === "Highest Salary") {
        filtered.sort((a, b) => b.salary.localeCompare(a.salary));
      } else if (sortParam === "Full-time First") {
        filtered.sort((a, b) => (a.type === "Full-time" ? -1 : b.type === "Full-time" ? 1 : 0));
      }

      setJobs(filtered);
      setTotalJobs(filtered.length);
      setTotalPages(Math.max(1, Math.ceil(filtered.length / 10)));
    };

    loadJobs();

    return () => {
      isSubscribed = false;
    };
  }, [qParam, typeParam, categoryParam, salaryParam, sortParam, pageParam]);

  const toggleBookmark = (id: string) => {
    setBookmarkedIds((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleClearAll = () => {
    setSearchInput("");
    router.push(pathname, { scroll: false });
  };

  const hasActiveFilters = Boolean(
    qParam ||
      (typeParam && typeParam !== "All") ||
      (categoryParam && categoryParam !== "All") ||
      (salaryParam && salaryParam !== "All"),
  );

  return (
    <main className="min-h-screen bg-[#0a0a0a] px-3.5 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-[1240px] space-y-6">
        {/* Search Bar Banner */}
        <section
          aria-label="Search jobs"
          className="rounded-2xl border border-white/[0.08] bg-[#121212] p-2 shadow-xl sm:p-3"
        >
          <form
            onSubmit={(e) => {
              e.preventDefault();
              updateParams({ q: searchInput.trim() || null });
            }}
            className="flex flex-col items-center gap-2.5 sm:flex-row sm:gap-3"
          >
            <div className="relative w-full flex-1">
              <label htmlFor={searchInputId} className="sr-only">
                Search by job title, keywords
              </label>
              <Search
                aria-hidden="true"
                className="pointer-events-none absolute top-1/2 left-3.5 size-4.5 -translate-y-1/2 text-zinc-500 sm:left-4 sm:size-5"
              />
              <input
                id={searchInputId}
                type="text"
                placeholder="Search by job title, keywords..."
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                className="w-full rounded-xl bg-transparent py-2.5 pr-4 pl-10 text-sm text-white placeholder:text-zinc-500 outline-none transition-colors sm:pl-12"
              />
            </div>
            <button
              type="submit"
              className="w-full shrink-0 rounded-xl bg-white px-7 py-2.5 text-sm font-semibold text-black transition-colors hover:bg-zinc-200 sm:w-auto sm:py-3"
            >
              Search Jobs
            </button>
          </form>
        </section>

        {/* Mobile Filter Toggle Button */}
        <div className="flex items-center justify-between lg:hidden">
          <button
            type="button"
            onClick={() => setShowMobileFilters(!showMobileFilters)}
            className="flex items-center gap-2 rounded-xl border border-white/10 bg-[#121212] px-3.5 py-2 text-xs font-medium text-zinc-200 transition-colors hover:border-white/20 hover:text-white"
          >
            <SlidersHorizontal className="size-3.5 text-zinc-400" />
            <span>Filters {hasActiveFilters && "(Active)"}</span>
          </button>
          <span className="text-xs text-zinc-400">
            {totalJobs.toLocaleString()} jobs available
          </span>
        </div>

        {/* Two-Column Grid: Filters Sidebar + Jobs Results */}
        <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-[280px_1fr]">
          {/* Filters Sidebar */}
          <aside
            className={cn(
              "w-full shrink-0 space-y-5 rounded-2xl border border-white/[0.08] bg-[#121212] p-5 transition-all sm:p-6",
              showMobileFilters ? "block" : "hidden lg:block",
            )}
          >
            <div className="flex items-center justify-between">
              <h2 className="flex items-center gap-2 text-base font-semibold text-white">
                <Filter className="hidden size-4 text-zinc-400 sm:inline" />
                Filters
              </h2>
              {hasActiveFilters && (
                <button
                  type="button"
                  onClick={handleClearAll}
                  className="text-xs font-medium text-indigo-400 transition-colors hover:text-indigo-300"
                >
                  Clear all
                </button>
              )}
            </div>

            {/* Filter 1: Job Type (Radio Buttons - Single Select) */}
            <div className="border-t border-white/[0.06] pt-4 sm:pt-5">
              <h3 className="text-sm font-semibold text-zinc-200">Job Type</h3>
              <div className="mt-3.5 space-y-2.5 sm:space-y-3">
                {BROWSE_JOB_TYPES.map((type) => {
                  const isSelected =
                    type === "All"
                      ? typeParam === "All" || !typeParam
                      : typeParam.toLowerCase() === type.toLowerCase();

                  const count =
                    type === "All"
                      ? totalJobs
                      : (typeCounts[type] ?? (type === "Full-time" ? "1.2k" : "—"));

                  return (
                    <button
                      key={type}
                      type="button"
                      role="radio"
                      aria-checked={isSelected}
                      onClick={() => updateParams({ type: type === "All" ? null : type })}
                      className="group flex w-full cursor-pointer items-center justify-between py-1 text-left transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <span
                          className={cn(
                            "flex size-4.5 items-center justify-center rounded-full border transition-colors",
                            isSelected
                              ? "border-indigo-500 bg-indigo-500/20"
                              : "border-white/20 bg-white/[0.04] group-hover:border-white/40",
                          )}
                        >
                          {isSelected && (
                            <span className="size-2 rounded-full bg-indigo-400 shadow-sm" />
                          )}
                        </span>
                        <span
                          className={cn(
                            "text-sm transition-colors",
                            isSelected
                              ? "font-medium text-white"
                              : "text-zinc-400 group-hover:text-zinc-200",
                          )}
                        >
                          {type}
                        </span>
                      </div>
                      <span className="font-mono text-xs text-zinc-500">{count}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Filter 2: Job Category / Industry (Radio Buttons - Single Select) */}
            <div className="border-t border-white/[0.06] pt-4 sm:pt-5">
              <h3 className="flex items-center gap-1.5 text-sm font-semibold text-zinc-200">
                <Briefcase className="size-3.5 text-zinc-400" />
                Industry / Category
              </h3>
              <div className="mt-3.5 max-h-56 space-y-2.5 overflow-y-auto pr-1 sm:space-y-3">
                <button
                  type="button"
                  role="radio"
                  aria-checked={categoryParam === "All" || !categoryParam}
                  onClick={() => updateParams({ category: null })}
                  className="group flex w-full cursor-pointer items-center justify-between py-1 text-left transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={cn(
                        "flex size-4.5 items-center justify-center rounded-full border transition-colors",
                        categoryParam === "All" || !categoryParam
                          ? "border-indigo-500 bg-indigo-500/20"
                          : "border-white/20 bg-white/[0.04] group-hover:border-white/40",
                      )}
                    >
                      {(categoryParam === "All" || !categoryParam) && (
                        <span className="size-2 rounded-full bg-indigo-400 shadow-sm" />
                      )}
                    </span>
                    <span
                      className={cn(
                        "text-sm transition-colors",
                        categoryParam === "All" || !categoryParam
                          ? "font-medium text-white"
                          : "text-zinc-400 group-hover:text-zinc-200",
                      )}
                    >
                      All Categories
                    </span>
                  </div>
                </button>

                {JOB_CATEGORIES.map((category) => {
                  const isSelected = categoryParam.toLowerCase() === category.toLowerCase();
                  const count = categoryCounts[category] ?? "—";

                  return (
                    <button
                      key={category}
                      type="button"
                      role="radio"
                      aria-checked={isSelected}
                      onClick={() => updateParams({ category })}
                      className="group flex w-full cursor-pointer items-center justify-between py-1 text-left transition-colors"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <span
                          className={cn(
                            "flex size-4.5 shrink-0 items-center justify-center rounded-full border transition-colors",
                            isSelected
                              ? "border-indigo-500 bg-indigo-500/20"
                              : "border-white/20 bg-white/[0.04] group-hover:border-white/40",
                          )}
                        >
                          {isSelected && (
                            <span className="size-2 rounded-full bg-indigo-400 shadow-sm" />
                          )}
                        </span>
                        <span
                          className={cn(
                            "truncate text-sm transition-colors",
                            isSelected
                              ? "font-medium text-white"
                              : "text-zinc-400 group-hover:text-zinc-200",
                          )}
                        >
                          {category}
                        </span>
                      </div>
                      <span className="font-mono text-xs text-zinc-500">{count}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Filter 3: Salary Range (Radio Buttons) */}
            <div className="border-t border-white/[0.06] pt-4 sm:pt-5">
              <h3 className="flex items-center gap-1.5 text-sm font-semibold text-zinc-200">
                <Banknote className="size-3.5 text-zinc-400" />
                Salary Range
              </h3>
              <div className="mt-3.5 space-y-2.5 sm:space-y-3">
                {SALARY_RANGES.map((range) => {
                  const isSelected =
                    range.id === "All"
                      ? salaryParam === "All" || !salaryParam
                      : salaryParam === range.id;

                  return (
                    <button
                      key={range.id}
                      type="button"
                      role="radio"
                      aria-checked={isSelected}
                      onClick={() => updateParams({ salary: range.id === "All" ? null : range.id })}
                      className="group flex w-full cursor-pointer items-center justify-between py-1 text-left transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <span
                          className={cn(
                            "flex size-4.5 items-center justify-center rounded-full border transition-colors",
                            isSelected
                              ? "border-indigo-500 bg-indigo-500/20"
                              : "border-white/20 bg-white/[0.04] group-hover:border-white/40",
                          )}
                        >
                          {isSelected && (
                            <span className="size-2 rounded-full bg-indigo-400 shadow-sm" />
                          )}
                        </span>
                        <span
                          className={cn(
                            "text-sm transition-colors",
                            isSelected
                              ? "font-medium text-white"
                              : "text-zinc-400 group-hover:text-zinc-200",
                          )}
                        >
                          {range.label}
                        </span>
                      </div>
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
              <h2 className="text-sm font-semibold text-white sm:text-base lg:text-lg">
                Found {totalJobs.toLocaleString()} Professional Jobs
              </h2>

              <div className="relative">
                <div className="flex items-center gap-2">
                  <span className="text-xs text-zinc-400">Sort by:</span>
                  <button
                    type="button"
                    onClick={() => setSortDropdownOpen(!sortDropdownOpen)}
                    className="flex items-center gap-2 rounded-lg border border-white/10 bg-[#141414] px-3 py-1.5 text-xs text-zinc-200 transition-colors hover:border-white/20"
                  >
                    <span>{sortParam}</span>
                    <ChevronDown className="size-3.5 text-zinc-400" />
                  </button>
                </div>

                {sortDropdownOpen && (
                  <div className="absolute right-0 z-20 mt-1.5 w-40 overflow-hidden rounded-xl border border-white/10 bg-[#161616] py-1 shadow-2xl backdrop-blur-md">
                    {SORT_OPTIONS.map((option) => (
                      <button
                        key={option}
                        type="button"
                        onClick={() => {
                          updateParams({ sort: option === "Most Recent" ? null : option });
                          setSortDropdownOpen(false);
                        }}
                        className={cn(
                          "w-full px-3 py-1.5 text-left text-xs transition-colors hover:bg-white/10",
                          sortParam === option ? "font-semibold text-white" : "text-zinc-400",
                        )}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Loading Indicator or Job Cards List */}
            {isLoading ? (
              <div className="flex min-h-[300px] flex-col items-center justify-center rounded-2xl border border-white/[0.08] bg-[#121212] py-16">
                <Loader2 className="size-8 animate-spin text-indigo-500" />
                <p className="mt-3 text-sm text-zinc-400">Loading filtered jobs...</p>
              </div>
            ) : jobs.length === 0 ? (
              <div className="rounded-2xl border border-white/[0.08] bg-[#121212] px-6 py-12 text-center">
                <p className="text-sm font-medium text-white">No jobs match your filter criteria.</p>
                <p className="mt-1 text-xs text-zinc-500">
                  Try searching with different keywords or clearing active filters.
                </p>
                <button
                  type="button"
                  onClick={handleClearAll}
                  className="mt-4 rounded-lg bg-white/10 px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-white/20"
                >
                  Reset Filters
                </button>
              </div>
            ) : (
              <div className="space-y-3.5">
                {jobs.map((job) => {
                  const isBookmarked = !!bookmarkedIds[job.id];
                  return (
                    <article
                      key={job.id}
                      onClick={() => router.push(`/browse-jobs/${job.id}`)}
                      className="group relative cursor-pointer rounded-2xl border border-white/[0.08] bg-[#121212] p-4 transition-all duration-200 hover:border-white/20 hover:bg-[#151515] sm:p-5"
                    >
                      <div className="flex items-start justify-between gap-3 sm:gap-4">
                        <div className="flex min-w-0 flex-1 items-start gap-3 sm:gap-4">
                          <CompanyLogo color={job.logoColor} />

                          <div className="min-w-0 flex-1">
                            <h3 className="text-sm font-semibold text-white transition-colors group-hover:text-indigo-300 sm:text-base">
                              <Link
                                href={`/browse-jobs/${job.id}`}
                                onClick={(e) => e.stopPropagation()}
                                className="hover:underline"
                              >
                                {job.title}
                              </Link>
                            </h3>
                            <p className="mt-0.5 truncate text-xs text-zinc-400">
                              {job.company} • {job.location}
                            </p>

                            {/* Badges Row */}
                            <div className="mt-3 flex flex-wrap items-center gap-1.5 sm:gap-2">
                              {/* Salary Badge */}
                              <span className="inline-flex items-center gap-1 rounded-lg border border-white/10 bg-white/[0.03] px-2 py-0.5 text-[11px] font-medium text-zinc-300 sm:px-2.5 sm:py-1 sm:text-xs">
                                <Banknote aria-hidden="true" className="size-3 text-zinc-400 sm:size-3.5" />
                                {job.salary}
                              </span>

                              {/* Job Type Badge */}
                              <span className="inline-flex items-center gap-1 rounded-lg border border-white/10 bg-white/[0.03] px-2 py-0.5 text-[11px] font-medium text-zinc-300 sm:px-2.5 sm:py-1 sm:text-xs">
                                <Clock aria-hidden="true" className="size-3 text-zinc-400 sm:size-3.5" />
                                {job.type}
                              </span>

                              {/* Level Badge if present */}
                              {job.level && (
                                <span className="inline-flex items-center gap-1 rounded-lg border border-white/10 bg-white/[0.03] px-2 py-0.5 text-[11px] font-medium text-zinc-300 sm:px-2.5 sm:py-1 sm:text-xs">
                                  <Star aria-hidden="true" className="size-3 text-zinc-400 sm:size-3.5" />
                                  {job.level}
                                </span>
                              )}

                              {/* Special Status Badge */}
                              {job.badge && (
                                <>
                                  {job.badge.type === "easy-apply" && (
                                    <span className="inline-flex items-center gap-1 rounded-lg border border-emerald-500/20 bg-emerald-500/10 px-2 py-0.5 text-[11px] font-medium text-emerald-400 sm:px-2.5 sm:py-1 sm:text-xs">
                                      <Zap aria-hidden="true" className="size-3 fill-emerald-400 text-emerald-400 sm:size-3.5" />
                                      {job.badge.label}
                                    </span>
                                  )}

                                  {job.badge.type === "hot" && (
                                    <span className="inline-flex items-center gap-1 rounded-lg border border-amber-500/20 bg-amber-500/10 px-2 py-0.5 text-[11px] font-medium text-amber-400 sm:px-2.5 sm:py-1 sm:text-xs">
                                      <Flame aria-hidden="true" className="size-3 fill-amber-400 text-amber-400 sm:size-3.5" />
                                      {job.badge.label}
                                    </span>
                                  )}

                                  {job.badge.type === "neutral" && (
                                    <span className="inline-flex items-center gap-1 rounded-lg border border-white/10 bg-white/[0.03] px-2 py-0.5 text-[11px] font-medium text-zinc-300 sm:px-2.5 sm:py-1 sm:text-xs">
                                      <Globe aria-hidden="true" className="size-3 text-zinc-400 sm:size-3.5" />
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
                                "size-4 transition-all sm:size-4.5",
                                isBookmarked ? "fill-white text-white" : "",
                              )}
                            />
                          </button>

                          <span className="hidden items-center gap-1 text-[11px] text-zinc-500 transition-colors group-hover:text-zinc-200 sm:inline-flex">
                            Details
                            <ArrowUpRight className="size-3" />
                          </span>
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>
            )}

            {/* Responsive Pagination Controls */}
            {totalPages > 1 && (
              <div className="mt-8 flex flex-wrap items-center justify-center gap-1.5 sm:gap-2">
                <button
                  type="button"
                  disabled={pageParam <= 1}
                  onClick={() => updateParams({ page: String(Math.max(1, pageParam - 1)) })}
                  aria-label="Previous page"
                  className="flex size-7 items-center justify-center rounded-lg border border-white/10 bg-[#121212] text-zinc-400 transition-colors hover:bg-white/5 hover:text-white disabled:pointer-events-none disabled:opacity-30 sm:size-8"
                >
                  <ChevronLeft className="size-3.5 sm:size-4" />
                </button>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => {
                  // Show current page, first, last, and immediate neighbors
                  if (
                    totalPages > 7 &&
                    p !== 1 &&
                    p !== totalPages &&
                    Math.abs(p - pageParam) > 1
                  ) {
                    if (p === 2 || p === totalPages - 1) {
                      return (
                        <span
                          key={p}
                          className="flex size-7 items-center justify-center text-xs text-zinc-600 sm:size-8"
                        >
                          ...
                        </span>
                      );
                    }
                    return null;
                  }

                  return (
                    <button
                      key={p}
                      type="button"
                      onClick={() => updateParams({ page: String(p) })}
                      className={cn(
                        "flex size-7 items-center justify-center rounded-lg text-xs font-semibold transition-colors sm:size-8",
                        pageParam === p
                          ? "bg-white text-black"
                          : "text-zinc-400 hover:bg-white/5 hover:text-white",
                      )}
                    >
                      {p}
                    </button>
                  );
                })}

                <button
                  type="button"
                  disabled={pageParam >= totalPages}
                  onClick={() =>
                    updateParams({ page: String(Math.min(totalPages, pageParam + 1)) })
                  }
                  aria-label="Next page"
                  className="flex size-7 items-center justify-center rounded-lg border border-white/10 bg-[#121212] text-zinc-400 transition-colors hover:bg-white/5 hover:text-white disabled:pointer-events-none disabled:opacity-30 sm:size-8"
                >
                  <ChevronRight className="size-3.5 sm:size-4" />
                </button>
              </div>
            )}
          </section>
        </div>
      </div>
    </main>
  );
}

export default function JobGalleryPage() {
  return (
    <Suspense fallback={<BrowseJobsSkeleton />}>
      <BrowseJobsContent />
    </Suspense>
  );
}
