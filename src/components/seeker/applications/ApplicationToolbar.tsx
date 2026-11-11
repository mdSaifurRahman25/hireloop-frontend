"use client";

import { Bell, Download, Mail, Search } from "lucide-react";
import { cn } from "cn";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface ApplicationToolbarProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  tabFilter: "Active" | "Archived";
  onTabFilterChange: (tab: "Active" | "Archived") => void;
  onExportPDF: () => void;
  user?: {
    name?: string | null;
    email?: string | null;
    image?: string | null;
  } | null;
}

export function ApplicationToolbar({
  searchQuery,
  onSearchChange,
  tabFilter,
  onTabFilterChange,
  onExportPDF,
  user,
}: ApplicationToolbarProps) {
  return (
    <div className="space-y-6">
      {/* Search & Profile Notification Header */}
      <div className="flex flex-col-reverse gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full sm:max-w-md">
          <Search className="absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-zinc-500" />
          <input
            type="text"
            placeholder="Search applications..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full rounded-xl border border-white/10 bg-[#121212] py-2 pl-10 pr-4 text-xs text-white placeholder:text-zinc-500 outline-none transition-colors focus:border-white/20"
          />
        </div>

        <div className="flex items-center justify-end gap-3">
          <button
            type="button"
            aria-label="Notifications"
            className="flex size-9 items-center justify-center rounded-xl border border-white/10 bg-[#121212] text-zinc-400 transition-colors hover:border-white/20 hover:text-white"
          >
            <Bell className="size-4" />
          </button>
          <button
            type="button"
            aria-label="Messages"
            className="flex size-9 items-center justify-center rounded-xl border border-white/10 bg-[#121212] text-zinc-400 transition-colors hover:border-white/20 hover:text-white"
          >
            <Mail className="size-4" />
          </button>
          <Avatar className="size-9 border border-white/15 bg-zinc-800">
            {user?.image && (
              <AvatarImage src={user.image} alt={user.name || "User"} />
            )}
            <AvatarFallback className="bg-zinc-800 text-xs font-semibold text-white">
              {(user?.name || "U").slice(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </div>
      </div>

      {/* Title & Filter/Action Buttons */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
            My Applications
          </h1>
          <p className="mt-1 text-xs sm:text-sm text-zinc-400">
            Track your job applications and interview progress in real-time.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {/* Active / Archived Toggle */}
          <div className="inline-flex items-center rounded-xl border border-white/10 bg-[#141414] p-1">
            <button
              type="button"
              onClick={() => onTabFilterChange("Active")}
              className={cn(
                "rounded-lg px-3.5 py-1.5 text-xs font-semibold transition-all",
                tabFilter === "Active"
                  ? "bg-[#242424] text-white shadow-sm"
                  : "text-zinc-400 hover:text-white",
              )}
            >
              Active
            </button>
            <button
              type="button"
              onClick={() => onTabFilterChange("Archived")}
              className={cn(
                "rounded-lg px-3.5 py-1.5 text-xs font-semibold transition-all",
                tabFilter === "Archived"
                  ? "bg-[#242424] text-white shadow-sm"
                  : "text-zinc-400 hover:text-white",
              )}
            >
              Archived
            </button>
          </div>

          {/* Export PDF Button */}
          <button
            type="button"
            onClick={onExportPDF}
            className="inline-flex items-center gap-2 rounded-xl bg-white px-4 py-2 text-xs font-semibold text-black transition-colors hover:bg-zinc-200 shadow-sm"
          >
            <Download className="size-3.5" />
            Export PDF
          </button>
        </div>
      </div>
    </div>
  );
}
