import { Banknote, Calendar, Clock, MapPin } from "lucide-react";

interface JobQuickInfoProps {
  salary: string;
  location: string;
  jobType: string;
  deadline: string;
}

export function JobQuickInfo({
  salary,
  location,
  jobType,
  deadline,
}: JobQuickInfoProps) {
  return (
    <section
      aria-label="Job quick details"
      className="grid grid-cols-2 gap-2.5 sm:grid-cols-4 sm:gap-4"
    >
      {/* Salary */}
      <div className="rounded-2xl border border-white/[0.08] bg-[#121212] p-3.5 sm:p-5">
        <div className="flex items-center gap-1.5 sm:gap-2 text-zinc-400">
          <Banknote aria-hidden="true" className="size-3.5 sm:size-4 text-zinc-400" />
          <span className="text-[10px] sm:text-xs font-semibold tracking-wider text-zinc-500 uppercase">
            SALARY / RATE
          </span>
        </div>
        <p className="mt-1.5 sm:mt-2 text-xs sm:text-base font-semibold text-white truncate">
          {salary}
        </p>
      </div>

      {/* Location */}
      <div className="rounded-2xl border border-white/[0.08] bg-[#121212] p-3.5 sm:p-5">
        <div className="flex items-center gap-1.5 sm:gap-2 text-zinc-400">
          <MapPin aria-hidden="true" className="size-3.5 sm:size-4 text-zinc-400" />
          <span className="text-[10px] sm:text-xs font-semibold tracking-wider text-zinc-500 uppercase">
            LOCATION
          </span>
        </div>
        <p className="mt-1.5 sm:mt-2 text-xs sm:text-base font-semibold text-white truncate">
          {location}
        </p>
      </div>

      {/* Job Type */}
      <div className="rounded-2xl border border-white/[0.08] bg-[#121212] p-3.5 sm:p-5">
        <div className="flex items-center gap-1.5 sm:gap-2 text-zinc-400">
          <Clock aria-hidden="true" className="size-3.5 sm:size-4 text-zinc-400" />
          <span className="text-[10px] sm:text-xs font-semibold tracking-wider text-zinc-500 uppercase">
            JOB TYPE
          </span>
        </div>
        <p className="mt-1.5 sm:mt-2 text-xs sm:text-base font-semibold text-white truncate">
          {jobType}
        </p>
      </div>

      {/* Deadline */}
      <div className="rounded-2xl border border-white/[0.08] bg-[#121212] p-3.5 sm:p-5">
        <div className="flex items-center gap-1.5 sm:gap-2 text-zinc-400">
          <Calendar aria-hidden="true" className="size-3.5 sm:size-4 text-zinc-400" />
          <span className="text-[10px] sm:text-xs font-semibold tracking-wider text-zinc-500 uppercase">
            DEADLINE
          </span>
        </div>
        <p className="mt-1.5 sm:mt-2 text-xs sm:text-base font-semibold text-white truncate">
          {deadline}
        </p>
      </div>
    </section>
  );
}
