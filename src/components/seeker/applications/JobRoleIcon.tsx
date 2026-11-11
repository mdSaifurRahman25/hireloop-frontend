"use client";

import {
  Bot,
  Briefcase,
  Cloud,
  Code2,
  Compass,
  Database,
} from "lucide-react";
import { cn } from "cn";
import type { ApplicationIconType } from "@/types";

interface JobRoleIconProps {
  type: ApplicationIconType;
  className?: string;
}

export function JobRoleIcon({ type, className }: JobRoleIconProps) {
  if (type === "code") {
    return (
      <div
        className={cn(
          "flex size-10 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-[#1c1c1c] text-zinc-300",
          className,
        )}
      >
        <Code2 className="size-5" />
      </div>
    );
  }
  if (type === "design") {
    return (
      <div
        className={cn(
          "flex size-10 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-[#1c1c1c] text-zinc-300",
          className,
        )}
      >
        <Compass className="size-5" />
      </div>
    );
  }
  if (type === "data") {
    return (
      <div
        className={cn(
          "flex size-10 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-[#1c1c1c] text-zinc-300",
          className,
        )}
      >
        <Database className="size-5" />
      </div>
    );
  }
  if (type === "cloud") {
    return (
      <div
        className={cn(
          "flex size-10 shrink-0 items-center justify-center rounded-xl border border-red-800/30 bg-red-950/40 text-red-400",
          className,
        )}
      >
        <Cloud className="size-5" />
      </div>
    );
  }
  if (type === "ai") {
    return (
      <div
        className={cn(
          "flex size-10 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-[#1c1c1c] text-zinc-300",
          className,
        )}
      >
        <Bot className="size-5" />
      </div>
    );
  }
  return (
    <div
      className={cn(
        "flex size-10 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-[#1c1c1c] text-zinc-300",
        className,
      )}
    >
      <Briefcase className="size-5" />
    </div>
  );
}
