"use client";

import Link from "next/link";
import { CheckCircle2, Lock, User } from "lucide-react";

interface CustomerInfoCardProps {
  user?: {
    name?: string | null;
    email?: string | null;
  } | null;
  guestName: string;
  guestEmail: string;
  onNameChange: (val: string) => void;
  onEmailChange: (val: string) => void;
}

export function CustomerInfoCard({
  user,
  guestName,
  guestEmail,
  onNameChange,
  onEmailChange,
}: CustomerInfoCardProps) {
  return (
    <div className="space-y-4 rounded-2xl border border-white/[0.08] bg-[#121212] p-5 sm:p-6">
      <div className="flex items-center justify-between border-b border-white/[0.06] pb-3.5">
        <div>
          <h2 className="text-base sm:text-lg font-semibold text-white">
            2. Account & Contact Details
          </h2>
          <p className="text-xs text-zinc-400 mt-0.5">
            Your receipt and subscription access will be linked to this email.
          </p>
        </div>
        <div className="flex items-center gap-1.5 text-xs text-zinc-400">
          <Lock className="size-3.5 text-emerald-400" />
          <span className="hidden sm:inline">Encrypted</span>
        </div>
      </div>

      {user ? (
        <div className="flex items-center justify-between rounded-xl border border-indigo-500/30 bg-indigo-500/10 p-3.5 text-xs">
          <div className="flex items-center gap-3">
            <div className="flex size-8 items-center justify-center rounded-lg bg-indigo-600 text-white">
              <User className="size-4" />
            </div>
            <div>
              <p className="font-semibold text-white">
                {user.name || "Hireloop Member"}
              </p>
              <p className="text-indigo-200/80">{user.email}</p>
            </div>
          </div>
          <div className="flex items-center gap-1 text-emerald-400">
            <CheckCircle2 className="size-4" />
            <span className="hidden sm:inline font-medium">Logged in</span>
          </div>
        </div>
      ) : (
        <div className="space-y-3.5">
          <div className="flex items-center justify-between rounded-xl border border-white/10 bg-white/[0.02] p-3 text-xs text-zinc-400">
            <span>Already have an account?</span>
            <Link
              href="/sign-in?callbackUrl=/checkout"
              className="font-medium text-indigo-400 hover:text-indigo-300"
            >
              Sign in to auto-fill →
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2">
            <div>
              <label className="block text-xs font-medium text-zinc-300">
                Full Name
              </label>
              <input
                type="text"
                value={guestName}
                onChange={(e) => onNameChange(e.target.value)}
                placeholder="e.g. Alex Morgan"
                className="mt-1.5 w-full rounded-xl border border-white/10 bg-[#181818] px-3.5 py-2.5 text-xs text-white placeholder:text-zinc-500 outline-none transition-colors focus:border-indigo-500"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-zinc-300">
                Email Address
              </label>
              <input
                type="email"
                value={guestEmail}
                onChange={(e) => onEmailChange(e.target.value)}
                placeholder="alex@example.com"
                className="mt-1.5 w-full rounded-xl border border-white/10 bg-[#181818] px-3.5 py-2.5 text-xs text-white placeholder:text-zinc-500 outline-none transition-colors focus:border-indigo-500"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
