"use client";

import { use, useEffect, useState, Suspense } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Banknote,
  Bookmark,
  Calendar,
  CheckCircle2,
  Clock,
  Code2,
  Coins,
  Globe,
  Infinity as InfinityIcon,
  Laptop,
  MapPin,
  Network,
  Palette,
  PenTool,
  ShieldCheck,
  X,
} from "lucide-react";
import { cn } from "cn";
import { toast } from "@/components/ui/toast";
import type { JobDocument } from "@/types";
import { getJobById } from "@/lib/api/jobs";
import { formatCompensation, formatDeadline } from "@/lib/utils/formatters";
import { useSession } from "@/lib/auth-client";

const CATEGORY_SKILLS: Record<
  string,
  { label: string; icon: "figma" | "system" | "uiux" | "frontend" }[]
> = {
  "Engineering & Tech": [
    { label: "Software Architecture", icon: "system" },
    { label: "Code Quality & Testing", icon: "frontend" },
    { label: "API Design", icon: "system" },
    { label: "Modern Stack", icon: "frontend" },
  ],
  Design: [
    { label: "UI/UX Design", icon: "uiux" },
    { label: "Figma Systems", icon: "figma" },
    { label: "User Research", icon: "system" },
    { label: "Prototyping", icon: "uiux" },
  ],
  Product: [
    { label: "Product Roadmap", icon: "system" },
    { label: "User Journey", icon: "uiux" },
    { label: "Sprint Planning", icon: "frontend" },
    { label: "Data Analytics", icon: "system" },
  ],
  Marketing: [
    { label: "Growth Strategy", icon: "system" },
    { label: "Content Marketing", icon: "uiux" },
    { label: "SEO & SEM", icon: "frontend" },
    { label: "Campaign Analytics", icon: "system" },
  ],
  Sales: [
    { label: "B2B Sales", icon: "system" },
    { label: "Pipeline Management", icon: "frontend" },
    { label: "Negotiation", icon: "system" },
    { label: "Client Success", icon: "uiux" },
  ],
  Operations: [
    { label: "Process Optimization", icon: "system" },
    { label: "Cross-team Delivery", icon: "frontend" },
    { label: "Operational Scaling", icon: "system" },
    { label: "Resource Planning", icon: "uiux" },
  ],
  Finance: [
    { label: "Financial Modeling", icon: "system" },
    { label: "Budget Planning", icon: "system" },
    { label: "Reporting", icon: "frontend" },
    { label: "Compliance", icon: "system" },
  ],
  "Customer Support": [
    { label: "Customer Empathy", icon: "uiux" },
    { label: "Issue Resolution", icon: "system" },
    { label: "Documentation", icon: "frontend" },
    { label: "Communication", icon: "system" },
  ],
};

const DEFAULT_BENEFITS: {
  label: string;
  icon: "health" | "401k" | "hardware" | "pto";
}[] = [
  { label: "Full Health & Dental", icon: "health" },
  { label: "Competitive 401k / Pension", icon: "401k" },
  { label: "Latest Hardware Stipend", icon: "hardware" },
  { label: "Flexible Paid Time Off (PTO)", icon: "pto" },
];

function SkillIcon({
  type,
}: {
  type: "figma" | "system" | "uiux" | "frontend";
}) {
  if (type === "figma") {
    return <PenTool aria-hidden="true" className="size-3.5 text-zinc-400" />;
  }
  if (type === "system") {
    return <Network aria-hidden="true" className="size-3.5 text-zinc-400" />;
  }
  if (type === "uiux") {
    return <Palette aria-hidden="true" className="size-3.5 text-zinc-400" />;
  }
  return <Code2 aria-hidden="true" className="size-3.5 text-zinc-400" />;
}

function BenefitIcon({
  type,
}: {
  type: "health" | "401k" | "hardware" | "pto";
}) {
  if (type === "health") {
    return <ShieldCheck aria-hidden="true" className="size-4 text-zinc-300" />;
  }
  if (type === "401k") {
    return <Coins aria-hidden="true" className="size-4 text-zinc-300" />;
  }
  if (type === "hardware") {
    return <Laptop aria-hidden="true" className="size-4 text-zinc-300" />;
  }
  return <InfinityIcon aria-hidden="true" className="size-4 text-zinc-300" />;
}

function JobDetailsSkeleton() {
  return (
    <main className="min-h-screen bg-[#0a0a0a] px-3.5 py-5 sm:px-6 sm:py-8 lg:px-8">
      <div className="mx-auto max-w-[1240px] space-y-4 sm:space-y-6 animate-pulse">
        {/* Breadcrumb Skeleton */}
        <div className="h-4 w-48 rounded bg-white/10" />

        {/* Header Skeleton */}
        <div className="rounded-2xl border border-white/[0.08] bg-[#121212] p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-4">
              <div className="size-14 rounded-2xl bg-white/10" />
              <div className="space-y-2">
                <div className="h-6 w-64 rounded bg-white/10" />
                <div className="h-4 w-40 rounded bg-white/5" />
              </div>
            </div>
            <div className="flex gap-3">
              <div className="size-10 rounded-xl bg-white/10" />
              <div className="h-10 w-28 rounded-xl bg-white/10" />
            </div>
          </div>
        </div>

        {/* Quick Info Grid Skeleton */}
        <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4 sm:gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="h-20 rounded-2xl border border-white/[0.08] bg-[#121212]"
            />
          ))}
        </div>

        {/* Content Skeleton */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_340px] xl:grid-cols-[1fr_380px]">
          <div className="h-96 rounded-2xl border border-white/[0.08] bg-[#121212]" />
          <div className="h-96 rounded-2xl border border-white/[0.08] bg-[#121212]" />
        </div>
      </div>
    </main>
  );
}

function JobNotFound({ id }: { id: string }) {
  return (
    <main className="min-h-screen bg-[#0a0a0a] px-3.5 py-5 sm:px-6 sm:py-8 lg:px-8">
      <div className="mx-auto max-w-[1240px] space-y-6">
        <nav
          aria-label="Breadcrumb"
          className="flex items-center gap-2 text-xs text-zinc-500"
        >
          <Link
            href="/browse-jobs"
            className="inline-flex items-center gap-1.5 transition-colors hover:text-zinc-200"
          >
            <ArrowLeft className="size-3.5" />
            Browse Jobs
          </Link>
          <span>/</span>
          <span className="text-zinc-400">Not Found</span>
        </nav>

        <div className="rounded-2xl border border-white/[0.08] bg-[#121212] p-8 sm:p-14 text-center">
          <div className="mx-auto flex size-14 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04] text-zinc-400">
            <Clock className="size-6 text-zinc-400" />
          </div>
          <h1 className="mt-4 text-lg sm:text-xl font-bold text-white">
            Job Posting Not Found
          </h1>
          <p className="mx-auto mt-2 max-w-md text-xs sm:text-sm text-zinc-400">
            The job posting{" "}
            {id ? (
              <span className="font-mono text-zinc-300">({id})</span>
            ) : null}{" "}
            does not exist, has expired, or may have been removed.
          </p>
          <div className="mt-6 flex justify-center">
            <Link
              href="/browse-jobs"
              className="inline-flex items-center gap-2 rounded-xl bg-white px-5 py-2.5 text-xs font-semibold text-black transition-colors hover:bg-zinc-200"
            >
              <ArrowLeft className="size-3.5" />
              Browse Available Jobs
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}

function JobDetailsContent({ jobId }: { jobId: string }) {
  const [job, setJob] = useState<JobDocument | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [fetchedJobId, setFetchedJobId] = useState<string | null>(null);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);
  const [applicantNameInput, setApplicantNameInput] = useState<string | null>(null);
  const [applicantEmailInput, setApplicantEmailInput] = useState<string | null>(null);
  const [hasApplied, setHasApplied] = useState(false);

  const { data: session, isPending } = useSession();
  const user = session?.user;

  const applicantName = applicantNameInput ?? user?.name ?? "";
  const applicantEmail = applicantEmailInput ?? user?.email ?? "";

  useEffect(() => {
    let isMounted = true;

    getJobById(jobId)
      .then((data) => {
        if (isMounted) {
          setJob(data);
          setFetchedJobId(jobId);
          setError(null);
        }
      })
      .catch((err) => {
        if (isMounted) {
          console.error("Failed to load job details:", err);
          setError("Job not found or could not be loaded.");
          setFetchedJobId(jobId);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [jobId]);

  const isLoading = fetchedJobId !== jobId;

  if (isLoading) {
    return <JobDetailsSkeleton />;
  }

  if (error || !job) {
    return <JobNotFound id={jobId} />;
  }

  const title = job.title || job.jobTitle || "Untitled Position";
  const company = job.companyName || "Hireloop Partner";
  const category = job.category || "Engineering & Tech";
  const salary = formatCompensation(job);
  const location = `${job.location || "Remote"}${
    job.isRemote && !job.location?.toLowerCase().includes("remote")
      ? " (Remote)"
      : ""
  }`;
  const jobType = job.jobType || "Full-time";
  const deadline = job.deadline ? formatDeadline(job.deadline) : "Open until filled";

  const responsibilities = job.responsibilities
    ? job.responsibilities
        .split("\n")
        .map((line) => line.replace(/^[-*•]\s*/, "").trim())
        .filter(Boolean)
    : [
        "Collaborate with cross-functional team members to execute project deliverables.",
        "Take ownership of core responsibilities and ensure high quality standards.",
        "Communicate effectively and align with team goals and deadlines.",
      ];

  const requirements = job.qualifications
    ? job.qualifications
        .split("\n")
        .map((line) => line.replace(/^[-*•]\s*/, "").trim())
        .filter(Boolean)
    : [
        "Proven experience in a similar role or related professional field.",
        "Strong problem-solving, communication, and collaboration skills.",
        "Self-motivated with ability to thrive in a high-growth environment.",
      ];

  const skills =
    CATEGORY_SKILLS[category] || CATEGORY_SKILLS["Engineering & Tech"];

  const description = `${company} is actively seeking a qualified and motivated ${title} to join their team. This ${jobType.toLowerCase()} role in ${location} offers an exciting opportunity to collaborate with industry professionals and make a direct impact.`;

  const handleApply = (e: React.FormEvent) => {
    e.preventDefault();
    setHasApplied(true);
    setIsApplyModalOpen(false);

    toast.add({
      title: "Application Submitted!",
      description: `Your application for ${title} at ${company} has been received.`,
    });
  };

  return (
    <main className="min-h-screen bg-[#0a0a0a] px-3.5 py-5 sm:px-6 sm:py-8 lg:px-8">
      <div className="mx-auto max-w-[1240px] space-y-4 sm:space-y-6">
        {/* Responsive Breadcrumb Navigation */}
        <nav
          aria-label="Breadcrumb"
          className="flex items-center gap-2 text-xs text-zinc-500 overflow-hidden"
        >
          <Link
            href="/browse-jobs"
            className="inline-flex items-center gap-1.5 shrink-0 transition-colors hover:text-zinc-200"
          >
            <ArrowLeft className="size-3.5" />
            Browse Jobs
          </Link>
          <span className="shrink-0">/</span>
          <span className="truncate text-zinc-400">{title}</span>
        </nav>

        {/* 1. Job Header Card */}
        <section
          aria-label="Job header"
          className="rounded-2xl border border-white/[0.08] bg-[#121212] p-4.5 sm:p-6 lg:p-7 shadow-xl"
        >
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3.5 sm:gap-5 min-w-0">
              {/* Company Logo Square */}
              <div className="flex size-12 sm:size-16 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-[#181818] shadow-inner">
                <svg
                  viewBox="0 0 24 24"
                  className="size-6 sm:size-7 text-white"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.75"
                >
                  <polygon points="12 2 2 7 12 12 22 7 12 2" />
                  <polyline points="2 17 12 22 22 17" />
                  <polyline points="2 12 12 17 22 12" />
                </svg>
              </div>

              {/* Title & Company Info */}
              <div className="min-w-0 flex-1">
                <h1 className="text-lg sm:text-2xl lg:text-[28px] font-bold tracking-tight text-white truncate">
                  {title}
                </h1>
                <div className="mt-1 flex flex-wrap items-center gap-1.5 sm:gap-2 text-xs sm:text-sm">
                  <span className="font-medium text-zinc-300">{company}</span>
                  <span aria-hidden="true" className="text-zinc-600">
                    •
                  </span>
                  <span className="text-zinc-400">{category}</span>
                  <span aria-hidden="true" className="text-zinc-600">
                    •
                  </span>
                  <span className="inline-flex items-center gap-1 font-medium text-emerald-400">
                    <CheckCircle2 className="size-3.5 fill-emerald-400 text-black" />
                    Verified Employer
                  </span>
                </div>
              </div>
            </div>

            {/* Actions: Bookmark & Apply Now */}
            <div className="flex items-center gap-2.5 sm:gap-3 w-full sm:w-auto pt-2 sm:pt-0 border-t border-white/[0.06] sm:border-0">
              <button
                type="button"
                onClick={() => {
                  setIsBookmarked(!isBookmarked);
                  toast.add({
                    title: isBookmarked ? "Job Removed" : "Job Saved!",
                    description: isBookmarked
                      ? "Job removed from your saved list."
                      : "Job added to your saved list.",
                  });
                }}
                aria-label={isBookmarked ? "Remove bookmark" : "Save job"}
                className={cn(
                  "flex size-10 items-center justify-center rounded-xl border border-white/10 bg-[#181818] transition-colors hover:border-white/20 hover:text-white shrink-0",
                  isBookmarked ? "text-white" : "text-zinc-400"
                )}
              >
                <Bookmark
                  className={cn(
                    "size-4.5 transition-all",
                    isBookmarked ? "fill-white text-white" : ""
                  )}
                />
              </button>

              <button
                type="button"
                onClick={() => setIsApplyModalOpen(true)}
                disabled={hasApplied}
                className={cn(
                  "flex-1 sm:flex-initial h-10 rounded-xl px-6 text-sm font-semibold transition-all shadow-sm text-center",
                  hasApplied
                    ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 cursor-default"
                    : "bg-white text-black hover:bg-zinc-200"
                )}
              >
                {hasApplied ? "Applied ✓" : "Apply Now"}
              </button>
            </div>
          </div>
        </section>

        {/* 2. Quick Info Cards Grid (2 cols on mobile, 4 on desktop) */}
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

        {/* 3. Main Content: Left Details Card & Right Company Overview */}
        <div className="grid grid-cols-1 items-start gap-5 sm:gap-6 lg:grid-cols-[1fr_340px] xl:grid-cols-[1fr_380px]">
          {/* Left Column: Full Job Details */}
          <div className="space-y-6 sm:space-y-8 rounded-2xl border border-white/[0.08] bg-[#121212] p-4.5 sm:p-7 lg:p-8">
            {/* Job Description */}
            <section aria-labelledby="desc-heading">
              <h2
                id="desc-heading"
                className="text-base font-semibold text-white sm:text-lg"
              >
                About the Role
              </h2>
              <p className="mt-2.5 sm:mt-3 text-xs sm:text-[15px] leading-relaxed text-zinc-400">
                {description}
              </p>
            </section>

            {/* Responsibilities */}
            <section
              aria-labelledby="resp-heading"
              className="border-t border-white/[0.06] pt-5 sm:pt-6"
            >
              <h2
                id="resp-heading"
                className="text-base font-semibold text-white sm:text-lg"
              >
                Responsibilities
              </h2>
              <ul className="mt-3.5 sm:mt-4 space-y-2.5 sm:space-y-3">
                {responsibilities.map((resp, index) => (
                  <li
                    key={index}
                    className="flex items-start gap-2.5 sm:gap-3 text-xs sm:text-sm leading-relaxed text-zinc-400"
                  >
                    <span
                      aria-hidden="true"
                      className="mt-1.5 size-1.5 shrink-0 rounded-full bg-zinc-500"
                    />
                    <span>{resp}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* Requirements / Qualifications */}
            <section
              aria-labelledby="req-heading"
              className="border-t border-white/[0.06] pt-5 sm:pt-6"
            >
              <h2
                id="req-heading"
                className="text-base font-semibold text-white sm:text-lg"
              >
                Qualifications & Skills
              </h2>

              {/* Skill Badges */}
              <div className="mt-3.5 sm:mt-4 flex flex-wrap items-center gap-2 sm:gap-2.5">
                {skills.map((skill, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center gap-1.5 sm:gap-2 rounded-lg border border-white/10 bg-white/[0.04] px-2.5 sm:px-3 py-1 sm:py-1.5 text-xs font-medium text-zinc-300"
                  >
                    <SkillIcon type={skill.icon} />
                    {skill.label}
                  </span>
                ))}
              </div>

              {/* Requirements bullets */}
              <ul className="mt-4 sm:mt-5 space-y-2.5 sm:space-y-3">
                {requirements.map((req, index) => (
                  <li
                    key={index}
                    className="flex items-start gap-2.5 sm:gap-3 text-xs sm:text-sm leading-relaxed text-zinc-400"
                  >
                    <span
                      aria-hidden="true"
                      className="mt-1.5 size-1.5 shrink-0 rounded-full bg-zinc-500"
                    />
                    <span>{req}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* Benefits */}
            <section
              aria-labelledby="benefits-heading"
              className="border-t border-white/[0.06] pt-5 sm:pt-6"
            >
              <h2
                id="benefits-heading"
                className="text-base font-semibold text-white sm:text-lg"
              >
                Benefits & Perks
              </h2>

              <div className="mt-4 sm:mt-5 grid grid-cols-1 gap-3.5 sm:grid-cols-2 sm:gap-4">
                {DEFAULT_BENEFITS.map((benefit, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="flex size-8.5 sm:size-9 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04]">
                      <BenefitIcon type={benefit.icon} />
                    </div>
                    <span className="text-xs sm:text-sm font-medium text-zinc-200">
                      {benefit.label}
                    </span>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Right Column: Company Overview Card */}
          <aside className="lg:sticky lg:top-28 space-y-5 sm:space-y-6 rounded-2xl border border-white/[0.08] bg-[#121212] p-4.5 sm:p-6 shadow-xl">
            <h2 className="text-base font-semibold text-white">
              Company Overview
            </h2>

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
                  {job.isRemote ? "Remote First" : "On-site / Hybrid"}
                </span>
              </div>
            </div>

            {/* Apply Button */}
            <div className="border-t border-white/[0.06] pt-4 sm:pt-5">
              <button
                type="button"
                onClick={() => setIsApplyModalOpen(true)}
                disabled={hasApplied}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-white py-2.5 text-center text-xs sm:text-sm font-semibold text-black transition-colors hover:bg-zinc-200 disabled:opacity-50"
              >
                <Globe className="size-4 text-zinc-700" />
                {hasApplied ? "Application Submitted" : "Apply for this Position"}
              </button>
            </div>
          </aside>
        </div>
      </div>

      {/* Interactive Application Modal */}
      {isApplyModalOpen && (
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
                onClick={() => setIsApplyModalOpen(false)}
                className="rounded-lg p-1 text-zinc-400 hover:text-white shrink-0"
              >
                <X className="size-5" />
              </button>
            </div>

            <form
              onSubmit={handleApply}
              className="mt-4 sm:mt-5 space-y-3.5 sm:space-y-4"
            >
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
                  required
                  value={applicantName}
                  onChange={(e) => setApplicantNameInput(e.target.value)}
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
                  required
                  value={applicantEmail}
                  onChange={(e) => setApplicantEmailInput(e.target.value)}
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
                  placeholder="https://linkedin.com/in/..."
                  className="mt-1.5 w-full rounded-xl border border-white/10 bg-white/[0.04] px-3.5 py-2.5 text-sm text-white placeholder:text-zinc-500 outline-none focus:border-indigo-500"
                />
              </div>

              <div className="flex items-center justify-end gap-2.5 sm:gap-3 pt-3 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setIsApplyModalOpen(false)}
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
      )}
    </main>
  );
}

function JobDetailsAsyncLoader({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = use(params);
  if (!resolvedParams?.id) {
    return <JobNotFound id="" />;
  }
  return <JobDetailsContent jobId={resolvedParams.id} />;
}

export default function JobDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  return (
    <Suspense fallback={<JobDetailsSkeleton />}>
      <JobDetailsAsyncLoader params={params} />
    </Suspense>
  );
}
