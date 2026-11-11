import { Globe } from "lucide-react";

interface JobCompanyOverviewProps {
  company: string;
  category: string;
  isRemote?: boolean;
  onApplyClick: () => void;
  hasApplied: boolean;
  isPending: boolean;
}

export function JobCompanyOverview({
  company,
  category,
  isRemote,
  onApplyClick,
  hasApplied,
  isPending,
}: JobCompanyOverviewProps) {
  return (
    <aside className="lg:sticky lg:top-28 space-y-5 sm:space-y-6 rounded-2xl border border-white/[0.08] bg-[#121212] p-4.5 sm:p-6 shadow-xl">
      <h2 className="text-base font-semibold text-white">Company Overview</h2>

      {/* Company Modern Office Workspace Preview */}
      <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl border border-white/10 bg-zinc-900 shadow-md">
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10" />
        <div
          className="h-full w-full bg-cover bg-center transition-transform duration-500 hover:scale-105"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80')",
          }}
        />
        <div className="absolute bottom-3 left-3 z-20 flex items-center gap-2">
          <span className="size-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-xs font-medium text-white/90">
            Hiring actively
          </span>
        </div>
      </div>

      {/* Company Metadata Info */}
      <div className="space-y-3.5 sm:space-y-4 border-t border-white/[0.06] pt-4 sm:pt-5">
        <div className="flex items-center justify-between text-xs sm:text-sm">
          <span className="text-[10px] sm:text-[11px] font-semibold tracking-wider text-zinc-500 uppercase">
            COMPANY
          </span>
          <span className="font-medium text-zinc-200">{company}</span>
        </div>

        <div className="flex items-center justify-between text-xs sm:text-sm">
          <span className="text-[10px] sm:text-[11px] font-semibold tracking-wider text-zinc-500 uppercase">
            INDUSTRY
          </span>
          <span className="font-medium text-zinc-200">{category}</span>
        </div>

        <div className="flex items-center justify-between text-xs sm:text-sm">
          <span className="text-[10px] sm:text-[11px] font-semibold tracking-wider text-zinc-500 uppercase">
            WORK ENVIRONMENT
          </span>
          <span className="font-medium text-zinc-200">
            {isRemote ? "Remote First" : "On-site / Hybrid"}
          </span>
        </div>
      </div>

      {/* Apply Button */}
      <div className="border-t border-white/[0.06] pt-4 sm:pt-5">
        <button
          type="button"
          onClick={onApplyClick}
          disabled={hasApplied || isPending}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-white py-2.5 text-center text-xs sm:text-sm font-semibold text-black transition-colors hover:bg-zinc-200 disabled:opacity-50"
        >
          <Globe className="size-4 text-zinc-700" />
          {hasApplied ? "Application Submitted" : "Apply for this Position"}
        </button>
      </div>
    </aside>
  );
}
