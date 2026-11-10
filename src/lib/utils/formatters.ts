import type { JobDocument, JobPost } from "@/types";
import { FREQUENCY_SUFFIX } from "@/lib/constants/jobs";

export const formatMoney = (value: number, perYear: boolean): string =>
  perYear && value >= 1000
    ? `$${Math.round(value / 1000)}k`
    : `$${value.toLocaleString("en-US")}`;

export const formatCompensation = (job: JobDocument): string => {
  const low = job.minSalary ?? job.maxSalary ?? null;
  const high = job.maxSalary ?? job.minSalary ?? null;
  const frequency = job.frequency ?? job.salaryFrequency ?? null;

  if (low === null || high === null) return "Not disclosed";

  const perYear = frequency === "per year";
  const range =
    low === high
      ? formatMoney(low, perYear)
      : `${formatMoney(low, perYear)} – ${formatMoney(high, perYear)}`;

  const suffix = frequency
    ? (FREQUENCY_SUFFIX[frequency] ?? frequency.replace("per ", ""))
    : null;

  return suffix ? `${range} / ${suffix}` : range;
};

export const formatDeadline = (value: string | null | undefined): string => {
  if (!value) return "No deadline";

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "No deadline";

  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  });
};

export const formatTimeline = (
  job: JobDocument,
  expired: boolean,
): string => {
  if (expired) return "Closed";
  if (!job.createdAt) return "Recently posted";

  const created = new Date(job.createdAt);
  if (Number.isNaN(created.getTime())) return "Recently posted";

  const elapsedDays = Math.max(
    0,
    Math.floor((Date.now() - created.getTime()) / (24 * 60 * 60 * 1000)),
  );

  if (elapsedDays === 0) return "Posted today";
  if (elapsedDays === 1) return "Posted yesterday";
  return `Posted ${elapsedDays}d ago`;
};

export const formatLocationLabel = (job: JobPost): string =>
  job.workMode === "Remote"
    ? `Remote (${job.city})`
    : `${job.city} (${job.workMode})`;
