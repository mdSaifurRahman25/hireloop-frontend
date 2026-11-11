"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "cn";

interface ApplicationPaginationProps {
  currentPage: number;
  totalPages: number;
  totalFiltered: number;
  pageSize: number;
  onPageChange: (page: number) => void;
}

export function ApplicationPagination({
  currentPage,
  totalPages,
  totalFiltered,
  pageSize,
  onPageChange,
}: ApplicationPaginationProps) {
  if (totalFiltered <= 0) return null;

  const startCount = Math.min((currentPage - 1) * pageSize + 1, totalFiltered);
  const endCount = Math.min(currentPage * pageSize, totalFiltered);

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-white/[0.06] px-6 py-4">
      <span className="text-xs text-zinc-500">
        Showing {startCount}-{endCount} of {totalFiltered} applications
      </span>

      <div className="flex items-center gap-1.5">
        {/* Previous Page */}
        <button
          type="button"
          onClick={() => onPageChange(Math.max(1, currentPage - 1))}
          disabled={currentPage === 1}
          aria-label="Previous page"
          className="flex size-8 items-center justify-center rounded-lg border border-white/10 text-zinc-400 transition-colors hover:border-white/20 hover:text-white disabled:opacity-30 disabled:pointer-events-none"
        >
          <ChevronLeft className="size-4" />
        </button>

        {/* Page Numbers */}
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            type="button"
            onClick={() => onPageChange(page)}
            className={cn(
              "flex size-8 items-center justify-center rounded-lg text-xs font-semibold transition-colors",
              currentPage === page
                ? "bg-white text-black"
                : "text-zinc-400 hover:bg-white/5 hover:text-white",
            )}
          >
            {page}
          </button>
        ))}

        {/* Next Page */}
        <button
          type="button"
          onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
          disabled={currentPage === totalPages}
          aria-label="Next page"
          className="flex size-8 items-center justify-center rounded-lg border border-white/10 text-zinc-400 transition-colors hover:border-white/20 hover:text-white disabled:opacity-30 disabled:pointer-events-none"
        >
          <ChevronRight className="size-4" />
        </button>
      </div>
    </div>
  );
}
