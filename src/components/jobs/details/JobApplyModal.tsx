import Link from "next/link";
import { CheckCircle2, X } from "lucide-react";

interface JobApplyModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  company: string;
  user?: { name?: string | null; email?: string | null } | null;
  isPending: boolean;
  applicantName: string;
  onApplicantNameChange: (val: string) => void;
  applicantEmail: string;
  onApplicantEmailChange: (val: string) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

export function JobApplyModal({
  isOpen,
  onClose,
  title,
  company,
  user,
  isPending,
  applicantName,
  onApplicantNameChange,
  applicantEmail,
  onApplicantEmailChange,
  onSubmit,
}: JobApplyModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-3.5 sm:p-4 backdrop-blur-sm animate-in fade-in">
      <div className="w-full max-w-md rounded-2xl border border-white/15 bg-[#141414] p-5 sm:p-6 shadow-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between border-b border-white/10 pb-3.5 sm:pb-4">
          <div className="min-w-0 pr-2">
            <h3 className="text-base sm:text-lg font-semibold text-white truncate">
              Apply for {title}
            </h3>
            <p className="text-xs text-zinc-400 mt-0.5">{company}</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close modal"
            className="rounded-lg p-1 text-zinc-400 hover:text-white shrink-0"
          >
            <X className="size-5" />
          </button>
        </div>

        <form onSubmit={onSubmit} className="mt-4 sm:mt-5 space-y-3.5 sm:space-y-4">
          {user ? (
            <div className="flex items-center gap-2 rounded-xl border border-indigo-500/20 bg-indigo-500/10 px-3.5 py-2.5 text-xs text-indigo-300">
              <CheckCircle2 className="size-4 shrink-0 text-indigo-400" />
              <span>
                Logged in as <strong className="text-white">{user.name || user.email}</strong>. Details auto-filled.
              </span>
            </div>
          ) : !isPending ? (
            <div className="flex items-center justify-between rounded-xl border border-white/10 bg-white/[0.02] px-3.5 py-2.5 text-xs text-zinc-400">
              <span>Applying as a guest.</span>
              <Link
                href="/sign-in"
                className="font-medium text-indigo-400 hover:text-indigo-300"
              >
                Sign in to auto-fill
              </Link>
            </div>
          ) : null}

          <div>
            <label className="block text-xs font-medium text-zinc-300">
              Your Full Name
            </label>
            <input
              type="text"
              name="fullName"
              required
              value={applicantName}
              onChange={(e) => onApplicantNameChange(e.target.value)}
              placeholder="e.g. Alex Morgan"
              className="mt-1.5 w-full rounded-xl border border-white/10 bg-white/[0.04] px-3.5 py-2.5 text-sm text-white placeholder:text-zinc-500 outline-none focus:border-indigo-500"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-zinc-300">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              required
              value={applicantEmail}
              onChange={(e) => onApplicantEmailChange(e.target.value)}
              placeholder="alex@example.com"
              className="mt-1.5 w-full rounded-xl border border-white/10 bg-white/[0.04] px-3.5 py-2.5 text-sm text-white placeholder:text-zinc-500 outline-none focus:border-indigo-500"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-zinc-300">
              Portfolio / LinkedIn URL
            </label>
            <input
              type="url"
              name="portfolio"
              placeholder="https://linkedin.com/in/..."
              className="mt-1.5 w-full rounded-xl border border-white/10 bg-white/[0.04] px-3.5 py-2.5 text-sm text-white placeholder:text-zinc-500 outline-none focus:border-indigo-500"
            />
          </div>

          <div className="flex items-center justify-end gap-2.5 sm:gap-3 pt-3 border-t border-white/10">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border border-white/10 px-4 py-2 text-xs font-medium text-zinc-300 hover:bg-white/5"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-xl bg-white px-5 py-2 text-xs font-semibold text-black hover:bg-zinc-200 transition-colors"
            >
              Submit Application
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
