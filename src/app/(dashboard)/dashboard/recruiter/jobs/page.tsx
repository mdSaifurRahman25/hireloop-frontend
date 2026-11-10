import { Suspense } from "react";
import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import {
  Boxes,
  Briefcase,
  ChevronRight,
  Code2,
  Eye,
  Globe,
  Headset,
  MapPin,
  Megaphone,
  MoreVertical,
  Palette,
  Pencil,
  Plus,
  Settings2,
  Users,
  Wallet,
} from "lucide-react";
import { cn } from "cn";

import { buttonVariants } from "@/components/ui/button";
import { getJobs } from "@/lib/api/jobs";
import { DeleteJobDialog } from "@/app/components/DeleteJobDialog";
import type { JobDocument, JobPost, JobStatus } from "@/types";
import {
  formatCompensation,
  formatDeadline,
  formatLocationLabel as locationLabel,
  formatTimeline,
} from "@/lib/utils/formatters";

export type { JobPost };

const departmentStyles: Array<{
  match: RegExp;
  icon: LucideIcon;
  className: string;
}> = [
  {
    match: /engineering|tech/i,
    icon: Code2,
    className: "bg-indigo-500/10 text-indigo-300",
  },
  {
    match: /design|creative/i,
    icon: Palette,
    className: "bg-orange-500/10 text-orange-300",
  },
  {
    match: /product/i,
    icon: Boxes,
    className: "bg-sky-500/10 text-sky-300",
  },
  {
    match: /marketing|sales/i,
    icon: Megaphone,
    className: "bg-violet-500/10 text-violet-300",
  },
  {
    match: /customer|support|service/i,
    icon: Headset,
    className: "bg-pink-500/10 text-pink-300",
  },
  {
    match: /operation/i,
    icon: Settings2,
    className: "bg-amber-500/10 text-amber-300",
  },
  {
    match: /finance|account/i,
    icon: Wallet,
    className: "bg-teal-500/10 text-teal-300",
  },
];

const fallbackDepartment = {
  icon: Briefcase,
  className: "bg-white/[0.06] text-zinc-300",
};

const resolveDepartment = (category: string) =>
  departmentStyles.find((entry) => entry.match.test(category)) ??
  fallbackDepartment;


// Applicants only join the table on xl screens, status on lg, so the remaining
// columns keep their design proportions instead of squeezing the job titles.
const columns =
  "md:grid-cols-[minmax(0,3.3fr)_minmax(0,2.4fr)_76px_minmax(0,1.65fr)_minmax(0,1.35fr)_180px] lg:grid-cols-[minmax(0,3.3fr)_minmax(0,2.4fr)_76px_minmax(0,1.65fr)_72px_minmax(0,1.35fr)_180px] xl:grid-cols-[minmax(0,3.3fr)_minmax(0,2.4fr)_76px_minmax(0,1.65fr)_minmax(0,1.5fr)_72px_minmax(0,1.35fr)_180px]";

const mobileLabel =
  "mb-1 block text-[10px] font-semibold tracking-[0.08em] text-zinc-500 uppercase md:hidden";

// The API stores raw job documents; the table renders a presentation model.
const toJobPost = (job: JobDocument): JobPost => {
  const expiresAt = job.deadline ? new Date(job.deadline).getTime() : Number.NaN;
  const expired = !Number.isNaN(expiresAt) && expiresAt < Date.now();

  return {
    id: job._id,
    title: job.title ?? job.jobTitle ?? "Untitled role",
    department: job.category,
    companyName: job.companyName,
    city: job.location,
    workMode: job.isRemote ? "Remote" : "On-site",
    jobType: job.jobType,
    compensation: formatCompensation(job),
    // The API has no applicants field yet.
    applicants: 0,
    status: expired ? "Expired" : "Active",
    deadline: formatDeadline(job.deadline),
    timeline: formatTimeline(job, expired),
  };
};

function StatusPill({ status }: { status: JobStatus }) {
  const isActive = status === "Active";

  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium",
        isActive
          ? "bg-emerald-500/10 text-emerald-400"
          : "bg-white/[0.06] text-zinc-400",
      )}
    >
      <span
        aria-hidden="true"
        className={cn(
          "size-1.5 rounded-full",
          isActive ? "bg-emerald-400" : "bg-zinc-500",
        )}
      />
      {status}
    </span>
  );
}

function JobsTableSkeleton() {
  return (
    <div className="mt-8 overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.02]">
      <div className="hidden h-10 border-b border-white/[0.06] md:block" />
      <ul className="divide-y divide-white/[0.06]">
        {Array.from({ length: 3 }).map((_, index) => (
          <li key={index} className="px-4 py-4 md:px-5">
            <div className="flex items-center gap-3">
              <span className="size-9 shrink-0 animate-pulse rounded-lg bg-white/[0.06]" />
              <div className="flex-1 space-y-2">
                <span className="block h-3 w-40 animate-pulse rounded bg-white/[0.06]" />
                <span className="block h-2.5 w-24 animate-pulse rounded bg-white/[0.04]" />
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="mt-8 rounded-2xl border border-white/[0.06] bg-white/[0.02] px-6 py-14 text-center">
      <span className="mx-auto flex size-12 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-zinc-400">
        <Briefcase aria-hidden="true" className="size-5" />
      </span>
      <p className="mt-4 text-[15px] font-medium text-white">No job posts yet</p>
      <p className="mt-1 text-sm text-zinc-500">
        Publish your first listing and it will show up here.
      </p>
      <Link
        href="/dashboard/recruiter/jobs/new"
        className={cn(
          buttonVariants({ size: "lg" }),
          "mt-5 h-9 rounded-lg bg-indigo-600 px-4 text-sm font-semibold text-white hover:bg-indigo-500",
        )}
      >
        <Plus aria-hidden="true" className="size-4" />
        New Job Post
      </Link>
    </div>
  );
}

function ErrorState({ message }: { message: string }) {
  return (
    <div
      role="alert"
      className="mt-8 rounded-2xl border border-red-500/30 bg-red-500/10 p-5"
    >
      <p className="text-sm font-medium text-red-200">Could not load job posts</p>
      <p className="mt-1 text-sm text-red-200/80">{message}</p>
      <p className="mt-2 text-xs text-red-200/60">
        Check that the backend is running on port 5000 and exposes GET /jobs.
      </p>
    </div>
  );
}

async function JobsTable() {
  let jobs: JobPost[];

  try {
    const documents = await getJobs();
    jobs = documents.map(toJobPost);
  } catch (error) {
    const message =
      error instanceof TypeError
        ? "The API did not respond. Is the backend running on port 5000?"
        : error instanceof Error
          ? error.message
          : "Unknown error.";

    return <ErrorState message={message} />;
  }

  if (jobs.length === 0) return <EmptyState />;

  return (
    <div className="mt-8 overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.02]">
      <div
        className={cn(
          "hidden items-center gap-2 border-b border-white/[0.06] px-5 py-3 text-[11px] font-semibold tracking-[0.08em] text-zinc-500 uppercase md:grid",
          columns,
        )}
      >
        <span>Job title &amp; dept</span>
        <span>Company &amp; location</span>
        <span>Type</span>
        <span>Compensation</span>
        <span className="hidden xl:block">Applicants</span>
        <span className="hidden lg:block">Status</span>
        <span>Deadline</span>
        <span className="text-right">Actions</span>
      </div>

      <ul className="divide-y divide-white/[0.06]">
        {jobs.map((job) => {
          const department = resolveDepartment(job.department);
          const DepartmentIcon = department.icon;

          return (
            <li
              key={job.id}
              className="px-4 py-4 transition-colors hover:bg-white/[0.02] md:px-5"
            >
              <div
                className={cn(
                  "grid grid-cols-2 items-start gap-x-2 gap-y-3 md:items-center md:gap-y-0",
                  columns,
                )}
              >
                <div className="col-span-2 flex min-w-0 items-center gap-3 md:col-span-1">
                  <span
                    className={cn(
                      "flex size-9 shrink-0 items-center justify-center rounded-lg border border-white/10",
                      department.className,
                    )}
                  >
                    <DepartmentIcon aria-hidden="true" className="size-4" />
                  </span>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <p
                        title={job.title}
                        className="truncate text-[15px] font-medium text-white"
                      >
                        {job.title}
                      </p>
                      <span className="lg:hidden">
                        <StatusPill status={job.status} />
                      </span>
                    </div>
                    <p className="mt-0.5 truncate text-xs font-medium text-indigo-400">
                      {job.department}
                    </p>
                  </div>
                </div>

                <div className="col-span-2 min-w-0 md:col-span-1">
                  <p className="truncate text-[13px] text-zinc-200">
                    {job.companyName}
                  </p>
                  <p className="mt-1 flex items-center gap-1.5 text-xs text-zinc-500">
                    {job.workMode === "Remote" ? (
                      <Globe aria-hidden="true" className="size-3.5 shrink-0" />
                    ) : (
                      <MapPin aria-hidden="true" className="size-3.5 shrink-0" />
                    )}
                    <span className="truncate">{locationLabel(job)}</span>
                  </p>
                </div>

                <div>
                  <span className={mobileLabel}>Type</span>
                  <span className="inline-flex rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 text-xs whitespace-nowrap text-zinc-300">
                    {job.jobType}
                  </span>
                </div>

                <div>
                  <span className={mobileLabel}>Compensation</span>
                  <p
                    title={job.compensation}
                    className="truncate text-[13px] font-medium text-zinc-100"
                  >
                    {job.compensation}
                  </p>
                </div>

                <div className="col-span-2 md:col-span-1 md:hidden xl:block">
                  <span className={mobileLabel}>Applicants</span>
                  <p className="flex items-center gap-1.5 text-xs whitespace-nowrap">
                    <Users
                      aria-hidden="true"
                      className="size-4 shrink-0 text-zinc-500"
                    />
                    <span className="font-semibold text-white">
                      {job.applicants}
                    </span>
                    <span className="text-zinc-500">Candidates</span>
                  </p>
                </div>

                <div className="hidden lg:flex">
                  <StatusPill status={job.status} />
                </div>

                <div className="col-span-2 md:col-span-1">
                  <span className={mobileLabel}>Deadline</span>
                  <p className="text-[13px] whitespace-nowrap text-zinc-200">
                    {job.deadline}
                  </p>
                  <p className="mt-1 text-xs text-zinc-500">{job.timeline}</p>
                </div>

                <div className="col-span-2 flex items-center gap-2 md:col-span-1 md:justify-end">
                  <Link
                    href={`/jobs/${job.id}`}
                    aria-label={`View ${job.title}`}
                    title="View job details"
                    className="flex h-8 items-center justify-center rounded-lg border border-white/10 bg-white/[0.04] px-2.5 text-zinc-300 transition-colors hover:bg-white/10 hover:text-white"
                  >
                    <Eye aria-hidden="true" className="size-3.5" />
                  </Link>
                  <Link
                    href={`/dashboard/recruiter/jobs/edit?id=${job.id}`}
                    aria-label={`Edit ${job.title}`}
                    title="Edit job"
                    className="flex h-8 items-center justify-center rounded-lg bg-indigo-600 px-3 text-xs font-medium text-white transition-colors hover:bg-indigo-500"
                  >
                    <Pencil aria-hidden="true" className="size-3.5" />
                  </Link>
                    <DeleteJobDialog job={job} />
                  <button
                    type="button"
                    aria-label={`More actions for ${job.title}`}
                    className="rounded-lg border border-white/10 p-1.5 text-zinc-500 transition-colors hover:bg-white/10 hover:text-white"
                  >
                    <MoreVertical aria-hidden="true" className="size-4" />
                  </button>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

const ManageJobsPage = () => {
  return (
    <div className="mx-auto w-full max-w-[1240px] pb-12">
      <nav
        aria-label="Breadcrumb"
        className="flex items-center gap-1.5 text-[13px] text-zinc-500"
      >
        <Link
          href="/dashboard/recruiter/jobs"
          className="transition-colors hover:text-zinc-200"
        >
          Manage Jobs
        </Link>
        <ChevronRight aria-hidden="true" className="size-3.5" />
        <span className="text-zinc-400">Job Listings &amp; Postings</span>
      </nav>

      <div className="mt-3 grid gap-4 sm:grid-cols-[1fr_auto] sm:items-start">
        <div>
          <h1 className="font-heading text-[30px] leading-tight font-semibold tracking-tight text-white sm:text-[36px]">
            Manage Job Posts
          </h1>
          <p className="mt-2 max-w-2xl text-[15px] text-zinc-400">
            Review live listings, monitor applicants, and update job details
            across your organization.
          </p>
        </div>

        <Link
          href="/dashboard/recruiter/jobs/new"
          className={cn(
            buttonVariants({ size: "lg" }),
            "h-10 w-full rounded-lg bg-indigo-600 px-4 text-sm font-semibold text-white hover:bg-indigo-500 sm:w-auto",
          )}
        >
          <Plus aria-hidden="true" className="size-4" />
          New Job Post
        </Link>
      </div>

      <Suspense fallback={<JobsTableSkeleton />}>
        <JobsTable />
      </Suspense>
    </div>
  );
};

export default ManageJobsPage;
