import { Bookmark, CheckCircle2 } from "lucide-react";
import { cn } from "cn";

interface JobHeaderProps {
  title: string;
  company: string;
  category: string;
  isBookmarked: boolean;
  onToggleBookmark: () => void;
  onApplyClick: () => void;
  hasApplied: boolean;
  isPending: boolean;
}

export function JobHeader({
  title,
  company,
  category,
  isBookmarked,
  onToggleBookmark,
  onApplyClick,
  hasApplied,
  isPending,
}: JobHeaderProps) {
  return (
    <section
      aria-label="Job header"
      className="rounded-2xl border border-white/[0.08] bg-[#121212] p-4.5 sm:p-6 lg:p-7 shadow-xl"
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3.5 sm:gap-5 min-w-0">
          {/* Company Logo Square */}
          <div className="flex size-12 sm:size-16 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-[#181818] shadow-inner">
            <svg
              viewBox="0 0 24 24"
              className="size-6 sm:size-7 text-white"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.75"
            >
              <polygon points="12 2 2 7 12 12 22 7 12 2" />
              <polyline points="2 17 12 22 22 17" />
              <polyline points="2 12 12 17 22 12" />
            </svg>
          </div>

          {/* Title & Company Info */}
          <div className="min-w-0 flex-1">
            <h1 className="text-lg sm:text-2xl lg:text-[28px] font-bold tracking-tight text-white truncate">
              {title}
            </h1>
            <div className="mt-1 flex flex-wrap items-center gap-1.5 sm:gap-2 text-xs sm:text-sm">
              <span className="font-medium text-zinc-300">{company}</span>
              <span aria-hidden="true" className="text-zinc-600">
                •
              </span>
              <span className="text-zinc-400">{category}</span>
              <span aria-hidden="true" className="text-zinc-600">
                •
              </span>
              <span className="inline-flex items-center gap-1 font-medium text-emerald-400">
                <CheckCircle2 className="size-3.5 fill-emerald-400 text-black" />
                Verified Employer
              </span>
            </div>
          </div>
        </div>

        {/* Actions: Bookmark & Apply Now */}
        <div className="flex items-center gap-2.5 sm:gap-3 w-full sm:w-auto pt-2 sm:pt-0 border-t border-white/[0.06] sm:border-0">
          <button
            type="button"
            onClick={onToggleBookmark}
            aria-label={isBookmarked ? "Remove bookmark" : "Save job"}
            className={cn(
              "flex size-10 items-center justify-center rounded-xl border border-white/10 bg-[#181818] transition-colors hover:border-white/20 hover:text-white shrink-0",
              isBookmarked ? "text-white" : "text-zinc-400"
            )}
          >
            <Bookmark
              className={cn(
                "size-4.5 transition-all",
                isBookmarked ? "fill-white text-white" : ""
              )}
            />
          </button>

          <button
            type="button"
            onClick={onApplyClick}
            disabled={hasApplied || isPending}
            className={cn(
              "flex-1 sm:flex-initial h-10 rounded-xl px-6 text-sm font-semibold transition-all shadow-sm text-center",
              hasApplied
                ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 cursor-default"
                : "bg-white text-black hover:bg-zinc-200"
            )}
          >
            {hasApplied ? "Applied ✓" : "Apply Now"}
          </button>
        </div>
      </div>
    </section>
  );
}
