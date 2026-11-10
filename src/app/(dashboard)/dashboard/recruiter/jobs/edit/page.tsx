"use client";

import { Suspense, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import {
  ArrowLeft,
  Building2,
  CalendarDays,
  ChevronDown,
  ChevronRight,
  DollarSign,
  Globe,
  Loader2,
  MapPin,
  Save,
  X,
} from "lucide-react";
import { cn } from "cn";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/toast";
import { updateJob } from "@/lib/actions/jobs";
import type { JobDocument } from "@/lib/api/jobs";

const JOB_TYPES = ["Full-time", "Part-time", "Contract", "Internship"] as const;

const JOB_CATEGORIES = [
  "Engineering & Tech",
  "Design",
  "Product",
  "Marketing",
  "Sales",
  "Operations",
  "Finance",
  "Customer Support",
];

const FREQUENCIES = ["per hour", "per day", "per month", "per year"];

const inputIcon =
  "pointer-events-none absolute top-1/2 left-4 size-4 -translate-y-1/2 text-zinc-500";

function FieldLabel({
  htmlFor,
  id,
  children,
  required,
  hint,
}: {
  htmlFor?: string;
  id?: string;
  children: React.ReactNode;
  required?: boolean;
  hint?: React.ReactNode;
}) {
  const labelClassName = "text-sm font-medium text-zinc-200";
  const content = (
    <>
      {children}
      {required ? (
        <span aria-hidden="true" className="ml-1 text-indigo-400">
          *
        </span>
      ) : null}
    </>
  );

  return (
    <div className="mb-2 flex items-center justify-between gap-3">
      {htmlFor ? (
        <label htmlFor={htmlFor} className={labelClassName}>
          {content}
        </label>
      ) : (
        <span id={id} className={labelClassName}>
          {content}
        </span>
      )}
      {hint}
    </div>
  );
}

function SectionHeading({
  step,
  children,
}: {
  step: number;
  children: React.ReactNode;
}) {
  return (
    <h2 className="flex items-center gap-2.5 text-[17px] font-semibold text-white">
      <span aria-hidden="true" className="size-1.5 rounded-full bg-indigo-500" />
      <span>
        {step}. {children}
      </span>
    </h2>
  );
}

export function EditJobContent({ explicitId }: { explicitId?: string }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const jobId = explicitId ?? searchParams.get("id");

  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Form states
  const [title, setTitle] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [category, setCategory] = useState("Engineering & Tech");
  const [jobType, setJobType] = useState<(typeof JOB_TYPES)[number]>("Full-time");
  const [isRemote, setIsRemote] = useState(true);
  const [location, setLocation] = useState("");
  const [deadline, setDeadline] = useState("");
  const [minSalary, setMinSalary] = useState("");
  const [maxSalary, setMaxSalary] = useState("");
  const [frequency, setFrequency] = useState("per hour");
  const [responsibilities, setResponsibilities] = useState("");
  const [qualifications, setQualifications] = useState("");

  const deadlineRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!jobId) return;

    const loadJob = async () => {
      try {
        const baseUri = process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:5000";
        const res = await fetch(`${baseUri}/jobs/${jobId}`);

        let jobData: JobDocument | null = null;
        if (res.ok) {
          jobData = await res.json();
        } else {
          // Fallback: search in all jobs
          const allRes = await fetch(`${baseUri}/jobs`);
          if (allRes.ok) {
            const allJobs = (await allRes.json()) as JobDocument[];
            jobData = allJobs.find((j) => j._id === jobId) ?? null;
          }
        }

        if (jobData) {
          setTitle(jobData.title ?? jobData.jobTitle ?? "");
          setCompanyName(jobData.companyName ?? "");
          setCategory(jobData.category ?? "Engineering & Tech");
          setJobType(
            (JOB_TYPES as readonly string[]).includes(jobData.jobType)
              ? (jobData.jobType as (typeof JOB_TYPES)[number])
              : "Full-time"
          );
          setIsRemote(jobData.isRemote ?? true);
          setLocation(jobData.location ?? "");
          if (jobData.deadline) {
            const dateStr = new Date(jobData.deadline).toISOString().slice(0, 10);
            setDeadline(dateStr);
          }
          setMinSalary(jobData.minSalary ? String(jobData.minSalary) : "");
          setMaxSalary(jobData.maxSalary ? String(jobData.maxSalary) : "");
          setFrequency(jobData.frequency ?? jobData.salaryFrequency ?? "per hour");
          setResponsibilities(jobData.responsibilities ?? "");
          setQualifications(jobData.qualifications ?? "");
        } else {
          setErrorMessage("The requested job listing could not be found.");
        }
      } catch (error) {
        console.error("Failed to load job details:", error);
        setErrorMessage("Could not load job details. Is the backend running on port 5000?");
      } finally {
        setIsLoading(false);
      }
    };

    loadJob();
  }, [jobId]);

  const effectiveError = !jobId ? "No job ID was provided to edit." : errorMessage;
  const effectiveLoading = !jobId ? false : isLoading;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!jobId || isSubmitting) return;

    setIsSubmitting(true);
    setErrorMessage(null);

    const payload = {
      title,
      companyName,
      category,
      jobType,
      isRemote: String(isRemote),
      location,
      deadline,
      minSalary,
      maxSalary,
      frequency,
      responsibilities,
      qualifications,
    };

    try {
      await updateJob(jobId, payload);
      toast.add({
        title: "Job Updated!",
        description: "The job post has been updated successfully.",
      });
      router.push("/dashboard/recruiter/jobs");
      router.refresh();
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Failed to update the job.";
      setErrorMessage(message);
      toast.add({
        title: "Update Failed",
        description: message,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (effectiveLoading) {
    return (
      <div className="mx-auto w-full max-w-[1080px] py-16 text-center">
        <Loader2 className="mx-auto size-8 animate-spin text-indigo-500" />
        <p className="mt-3 text-sm text-zinc-400">Loading job information...</p>
      </div>
    );
  }

  if (effectiveError && !title) {
    return (
      <div className="mx-auto w-full max-w-[1080px] py-12">
        <div className="rounded-2xl border border-red-500/30 bg-red-500/10 p-6 text-center">
          <p className="text-base font-semibold text-red-300">Unable to edit job</p>
          <p className="mt-1 text-sm text-red-200/80">{effectiveError}</p>
          <Link
            href="/dashboard/recruiter/jobs"
            className="mt-5 inline-flex items-center gap-2 rounded-xl bg-white px-5 py-2.5 text-xs font-semibold text-black hover:bg-zinc-200 transition-colors"
          >
            <ArrowLeft className="size-4" />
            Back to Manage Jobs
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-[1080px] pb-12">
      {/* Breadcrumb Navigation */}
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
        <span className="text-zinc-400">Edit Listing</span>
      </nav>

      {/* Header */}
      <div className="mt-3 grid gap-4 sm:grid-cols-[1fr_auto] sm:items-start">
        <div>
          <h1 className="font-heading text-[28px] leading-tight font-semibold tracking-tight text-white sm:text-[34px]">
            Edit Job Post
          </h1>
          <p className="mt-1.5 max-w-xl text-sm text-zinc-400">
            Update the position specifications, compensation, and requirements across your organization.
          </p>
        </div>

        <Link
          href="/dashboard/recruiter/jobs"
          className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-4 py-2.5 text-xs font-medium text-zinc-300 hover:bg-white/10 hover:text-white transition-colors"
        >
          <ArrowLeft className="size-3.5" />
          Cancel
        </Link>
      </div>

      {errorMessage && (
        <div className="mt-6 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-200">
          {errorMessage}
        </div>
      )}

      {/* Edit Form */}
      <form id="edit-job-form" className="mt-10 space-y-10 sm:space-y-12" onSubmit={handleSubmit}>
        {/* Step 1: Basic Information */}
        <section className="space-y-5">
          <SectionHeading step={1}>Basic Information</SectionHeading>

          <div>
            <FieldLabel htmlFor="title" required>
              Job Title
            </FieldLabel>
            <div className="relative">
              <Input
                id="title"
                name="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Senior Frontend Developer"
                autoComplete="off"
                required
                className="pr-10 text-[15px]"
              />
              {title ? (
                <button
                  type="button"
                  onClick={() => setTitle("")}
                  aria-label="Clear job title"
                  className="absolute top-1/2 right-3 -translate-y-1/2 rounded-full p-1 text-zinc-500 transition-colors hover:bg-white/10 hover:text-white"
                >
                  <X className="size-3.5" />
                </button>
              ) : null}
            </div>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <FieldLabel htmlFor="companyName" required>
                Company Name
              </FieldLabel>
              <div className="relative">
                <Building2 aria-hidden="true" className={inputIcon} />
                <Input
                  id="companyName"
                  name="companyName"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  placeholder="e.g. HirePulse Network"
                  autoComplete="organization"
                  required
                  className="pl-11 text-[15px]"
                />
              </div>
            </div>

            <div>
              <FieldLabel htmlFor="category" required>
                Job Category
              </FieldLabel>
              <div className="relative">
                <select
                  id="category"
                  name="category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="h-11 w-full appearance-none rounded-xl border border-white/10 bg-white/[0.04] px-4 pr-10 text-[15px] text-white outline-none transition-colors focus-visible:border-indigo-500/60 focus-visible:ring-2 focus-visible:ring-indigo-500/20"
                >
                  {JOB_CATEGORIES.map((cat) => (
                    <option key={cat} value={cat} className="bg-[#141414] text-white">
                      {cat}
                    </option>
                  ))}
                </select>
                <ChevronDown className="pointer-events-none absolute top-1/2 right-4 size-4 -translate-y-1/2 text-zinc-500" />
              </div>
            </div>
          </div>

          <div>
            <FieldLabel id="jobType-label" required>
              Job Type
            </FieldLabel>
            <div
              role="group"
              aria-labelledby="jobType-label"
              className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4"
            >
              {JOB_TYPES.map((type) => (
                <button
                  key={type}
                  type="button"
                  aria-pressed={jobType === type}
                  onClick={() => setJobType(type)}
                  className={cn(
                    "h-11 rounded-xl border text-[14px] sm:text-[15px] font-medium transition-colors",
                    jobType === type
                      ? "border-indigo-500/60 bg-indigo-500/10 text-white"
                      : "border-white/5 bg-white/[0.04] text-zinc-400 hover:bg-white/[0.07] hover:text-zinc-200"
                  )}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Step 2: Location, Compensation & Timeline */}
        <section className="space-y-5">
          <SectionHeading step={2}>
            Location, Compensation &amp; Timeline
          </SectionHeading>

          <div className="flex items-center justify-between gap-4 rounded-2xl border border-white/5 bg-white/[0.04] p-4">
            <div className="flex items-center gap-3">
              <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-indigo-500/10 text-indigo-300 ring-1 ring-indigo-500/30">
                <Globe aria-hidden="true" className="size-4" />
              </span>
              <div>
                <p className="text-[14px] sm:text-[15px] font-semibold text-white">
                  Remote Work Allowed
                </p>
                <p className="mt-0.5 text-xs text-zinc-400">
                  Allow candidates to apply from remote or distributed locations
                </p>
              </div>
            </div>

            <button
              type="button"
              role="switch"
              aria-checked={isRemote}
              aria-label="Remote work allowed"
              onClick={() => setIsRemote((value) => !value)}
              className={cn(
                "relative h-6 w-11 shrink-0 rounded-full transition-colors",
                isRemote ? "bg-indigo-600" : "bg-white/10"
              )}
            >
              <span
                className={cn(
                  "absolute top-0.5 left-0.5 size-5 rounded-full bg-white transition-transform",
                  isRemote && "translate-x-5"
                )}
              />
            </button>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <FieldLabel htmlFor="location" required>
                Job Location
              </FieldLabel>
              <div className="relative">
                <MapPin aria-hidden="true" className={inputIcon} />
                <Input
                  id="location"
                  name="location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="e.g. San Francisco, USA"
                  autoComplete="off"
                  required
                  className="pl-11 text-[15px]"
                />
              </div>
            </div>

            <div>
              <FieldLabel htmlFor="deadline">
                Application Deadline
              </FieldLabel>
              <div className="relative">
                <CalendarDays aria-hidden="true" className={inputIcon} />
                <Input
                  ref={deadlineRef}
                  id="deadline"
                  name="deadline"
                  type="date"
                  value={deadline}
                  onChange={(e) => setDeadline(e.target.value)}
                  onClick={(e) => e.currentTarget.showPicker?.()}
                  className="pl-11 text-[15px] [&::-webkit-calendar-picker-indicator]:hidden"
                />
              </div>
            </div>
          </div>

          <div className="grid gap-5 sm:grid-cols-3">
            <div>
              <FieldLabel htmlFor="minSalary">Min Salary / Rate</FieldLabel>
              <div className="relative">
                <DollarSign aria-hidden="true" className={inputIcon} />
                <Input
                  id="minSalary"
                  name="minSalary"
                  inputMode="decimal"
                  value={minSalary}
                  onChange={(e) => setMinSalary(e.target.value)}
                  placeholder="e.g. 50"
                  className="pl-11 text-[15px]"
                />
              </div>
            </div>

            <div>
              <FieldLabel htmlFor="maxSalary">Max Salary / Rate</FieldLabel>
              <div className="relative">
                <DollarSign aria-hidden="true" className={inputIcon} />
                <Input
                  id="maxSalary"
                  name="maxSalary"
                  inputMode="decimal"
                  value={maxSalary}
                  onChange={(e) => setMaxSalary(e.target.value)}
                  placeholder="e.g. 80"
                  className="pl-11 text-[15px]"
                />
              </div>
            </div>

            <div>
              <FieldLabel htmlFor="frequency">Frequency</FieldLabel>
              <div className="relative">
                <select
                  id="frequency"
                  name="frequency"
                  value={frequency}
                  onChange={(e) => setFrequency(e.target.value)}
                  className="h-11 w-full appearance-none rounded-xl border border-white/10 bg-white/[0.04] px-4 pr-10 text-[15px] text-white outline-none transition-colors focus-visible:border-indigo-500/60 focus-visible:ring-2 focus-visible:ring-indigo-500/20"
                >
                  {FREQUENCIES.map((freq) => (
                    <option key={freq} value={freq} className="bg-[#141414] text-white">
                      {freq}
                    </option>
                  ))}
                </select>
                <ChevronDown className="pointer-events-none absolute top-1/2 right-4 size-4 -translate-y-1/2 text-zinc-500" />
              </div>
            </div>
          </div>
        </section>

        {/* Step 3: Responsibilities & Requirements */}
        <section className="space-y-5">
          <SectionHeading step={3}>
            Responsibilities &amp; Requirements
          </SectionHeading>

          <div>
            <FieldLabel htmlFor="responsibilities" required>
              Key Responsibilities
            </FieldLabel>
            <textarea
              id="responsibilities"
              name="responsibilities"
              required
              rows={4}
              value={responsibilities}
              onChange={(e) => setResponsibilities(e.target.value)}
              placeholder="Describe what this role owns day to day, the team it collaborates with, and the milestones it drives."
              className="min-h-[110px] w-full resize-y rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-[15px] text-white outline-none transition-colors placeholder:text-zinc-500 focus-visible:border-indigo-500/60 focus-visible:ring-2 focus-visible:ring-indigo-500/20"
            />
          </div>

          <div>
            <FieldLabel htmlFor="qualifications" required>
              Qualifications &amp; Requirements
            </FieldLabel>
            <textarea
              id="qualifications"
              name="qualifications"
              required
              rows={4}
              value={qualifications}
              onChange={(e) => setQualifications(e.target.value)}
              placeholder="List the required technical skills, years of experience, and tools for this role."
              className="min-h-[110px] w-full resize-y rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-[15px] text-white outline-none transition-colors placeholder:text-zinc-500 focus-visible:border-indigo-500/60 focus-visible:ring-2 focus-visible:ring-indigo-500/20"
            />
          </div>
        </section>

        {/* Action Buttons */}
        <section className="flex flex-col-reverse sm:flex-row items-center gap-3 pt-4 border-t border-white/[0.08]">
          <Link
            href="/dashboard/recruiter/jobs"
            className="w-full sm:w-auto text-center rounded-xl border border-white/10 bg-white/[0.04] px-6 py-2.5 text-sm font-medium text-zinc-300 hover:bg-white/10 hover:text-white transition-colors"
          >
            Cancel
          </Link>

          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full sm:w-auto h-11 rounded-xl bg-indigo-600 px-8 text-[15px] font-semibold text-white hover:bg-indigo-500 transition-colors"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 size-4 animate-spin" />
                Saving Changes...
              </>
            ) : (
              <>
                <Save className="mr-2 size-4" />
                Save Changes
              </>
            )}
          </Button>
        </section>
      </form>
    </div>
  );
}

export default function EditJobsPage() {
  return (
    <Suspense
      fallback={
        <div className="mx-auto w-full max-w-[1080px] py-16 text-center">
          <Loader2 className="mx-auto size-8 animate-spin text-indigo-500" />
          <p className="mt-3 text-sm text-zinc-400">Loading editor...</p>
        </div>
      }
    >
      <EditJobContent />
    </Suspense>
  );
}
