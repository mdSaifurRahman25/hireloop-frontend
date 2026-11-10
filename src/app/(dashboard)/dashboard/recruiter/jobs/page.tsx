"use client";

import Link from "next/link";
import {
  ChevronRight,
  Code2,
  Globe,
  MapPin,
  Megaphone,
  MoreVertical,
  Palette,
  Pencil,
  Plus,
  Server,
  ShieldCheck,
  Trash2,
  Users,
} from "lucide-react";
import { cn } from "cn";

import { Button, buttonVariants } from "@/components/ui/button";

type JobStatus = "Active" | "Expired";
type WorkMode = "Remote" | "Hybrid" | "On-site";

type JobPost = {
  id: string;
  title: string;
  department: string;
  companyName: string;
  city: string;
  workMode: WorkMode;
  jobType: "Full-time" | "Part-time";
  compensation: string;
  applicants: number;
  status: JobStatus;
  deadline: string;
  timeline: string;
};

// Placeholder rows until the API exposes a GET /jobs endpoint.
const JOB_POSTS: JobPost[] = [
  {
    id: "frontend-developer",
    title: "Frontend Developer",
    department: "Engineering",
    companyName: "HirePulse Network",
    city: "New York, USA",
    workMode: "Remote",
    jobType: "Full-time",
    compensation: "$25 – $40 / hr",
    applicants: 34,
    status: "Active",
    deadline: "May 30, 2025",
    timeline: "Posted 4d ago",
  },
  {
    id: "senior-product-designer",
    title: "Senior Product Designer",
    department: "Design",
    companyName: "HirePulse Labs",
    city: "London, UK",
    workMode: "Hybrid",
    jobType: "Full-time",
    compensation: "$90k – $115k / yr",
    applicants: 19,
    status: "Active",
    deadline: "Jun 14, 2025",
    timeline: "Posted 1w ago",
  },
  {
    id: "devops-specialist",
    title: "DevOps Specialist",
    department: "Infrastructure",
    companyName: "HirePulse Platform",
    city: "Berlin, Germany",
    workMode: "On-site",
    jobType: "Full-time",
    compensation: "$95k – $120k / yr",
    applicants: 12,
    status: "Active",
    deadline: "Jun 30, 2025",
    timeline: "Posted 2w ago",
  },
  {
    id: "product-marketing-lead",
    title: "Product Marketing Lead",
    department: "Marketing",
    companyName: "HirePulse Network",
    city: "EU/US",
    workMode: "Remote",
    jobType: "Full-time",
    compensation: "$80k – $105k / yr",
    applicants: 27,
    status: "Active",
    deadline: "Jul 15, 2025",
    timeline: "Posted 5d ago",
  },
  {
    id: "qa-automation-engineer",
    title: "QA Automation Engineer",
    department: "Quality",
    companyName: "HirePulse Platform",
    city: "Dublin, Ireland",
    workMode: "Hybrid",
    jobType: "Part-time",
    compensation: "$35 – $50 / hr",
    applicants: 8,
    status: "Expired",
    deadline: "May 01, 2025",
    timeline: "Closed",
  },
];

const departments: Record<
  string,
  { icon: typeof Code2; className: string }
> = {
  Engineering: { icon: Code2, className: "bg-indigo-500/10 text-indigo-300" },
  Design: { icon: Palette, className: "bg-orange-500/10 text-orange-300" },
  Infrastructure: { icon: Server, className: "bg-sky-500/10 text-sky-300" },
  Marketing: { icon: Megaphone, className: "bg-violet-500/10 text-violet-300" },
  Quality: { icon: ShieldCheck, className: "bg-emerald-500/10 text-emerald-300" },
};

// Applicants only join the table on xl screens, status on lg, so the remaining
// columns keep their design proportions instead of squeezing the job titles.
const columns =
  "md:grid-cols-[minmax(0,3.3fr)_minmax(0,2.4fr)_76px_minmax(0,1.65fr)_minmax(0,1.35fr)_160px] lg:grid-cols-[minmax(0,3.3fr)_minmax(0,2.4fr)_76px_minmax(0,1.65fr)_72px_minmax(0,1.35fr)_160px] xl:grid-cols-[minmax(0,3.3fr)_minmax(0,2.4fr)_76px_minmax(0,1.65fr)_minmax(0,1.5fr)_72px_minmax(0,1.35fr)_160px]";

const mobileLabel =
  "mb-1 block text-[10px] font-semibold tracking-[0.08em] text-zinc-500 uppercase md:hidden";

const locationLabel = (job: JobPost) =>
  job.workMode === "Remote"
    ? `Remote (${job.city})`
    : `${job.city} (${job.workMode})`;

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
          {JOB_POSTS.map((job) => {
            const department = departments[job.department];
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
                      <DepartmentIcon
                        aria-hidden="true"
                        className="size-4"
                      />
                    </span>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="truncate text-[15px] font-medium text-white">
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
                        <MapPin
                          aria-hidden="true"
                          className="size-3.5 shrink-0"
                        />
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
                    <p className="truncate text-[13px] font-medium text-zinc-100">
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
                    <p className="mt-1 text-xs text-zinc-500">
                      {job.timeline}
                    </p>
                  </div>

                  <div className="col-span-2 flex items-center gap-2 md:col-span-1 md:justify-end">
                    <Button
                      variant="ghost"
                      className="h-8 rounded-lg bg-indigo-600 px-3 text-xs font-medium text-white hover:bg-indigo-500"
                    >
                      <Pencil aria-hidden="true" className="size-3.5" />
                      Update
                    </Button>
                    <button
                      type="button"
                      aria-label={`Delete ${job.title}`}
                      className="rounded-lg p-1.5 text-zinc-500 transition-colors hover:bg-white/10 hover:text-white"
                    >
                      <Trash2 aria-hidden="true" className="size-4" />
                    </button>
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
    </div>
  );
};

export default ManageJobsPage;




