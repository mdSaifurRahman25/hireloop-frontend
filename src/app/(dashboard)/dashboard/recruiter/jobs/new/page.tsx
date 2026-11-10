"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Building2,
  CalendarDays,
  ChevronRight,
  DollarSign,
  Globe,
  MapPin,
  X,
} from "lucide-react";
import { cn } from "cn";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createJob } from "@/lib/actions/jobs";
import { toast } from "@/components/ui/toast";
import { useRouter } from "next/navigation";
import {
  FREQUENCIES,
  JOB_CATEGORIES,
  JOB_TYPES,
} from "@/lib/constants/jobs";
import {
  JobFieldLabel,
  JobSectionHeading,
  JobSelectField,
  inputIconClassName,
} from "@/components/jobs/job-form-controls";

const NewJobPage = () => {
  const router = useRouter(); 
  const [title, setTitle] = useState("");
  const [jobType, setJobType] =
    useState<(typeof JOB_TYPES)[number]>("Full-time");
  const [isRemote, setIsRemote] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const deadlineRef = useRef<HTMLInputElement>(null);

  // The earliest selectable deadline is today. This is applied after mount so
  // the server-rendered HTML never depends on the client's clock/timezone.
  useEffect(() => {
    const input = deadlineRef.current;
    if (!input) return;

    const now = new Date();
    input.min = new Date(now.getTime() - now.getTimezoneOffset() * 60000)
      .toISOString()
      .slice(0, 10);
  }, []);

  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isSubmitting) return;

    const form = event.currentTarget;
    const formData = new FormData(form);
    const jobData = Object.fromEntries(
      Array.from(formData.entries(), ([key, value]) => [key, String(value)]),
    );

    setIsSubmitting(true);
    try {
      const result = await createJob(jobData);

      if (result.insertedId) {
        form.reset();
        setTitle("");
        setJobType("Full-time");
        setIsRemote(true);

        toast.add({
          title: "Job Added!",
          description: "The new job has been successfully added.",
        });

        router.push("/dashboard/recruiter/jobs");
        router.refresh();
      } else {
        toast.add({
          title: "Failed to publish job",
          description: result.message || "Could not publish the job.",
        });
      }
    } catch (error) {
      const message =
        error instanceof TypeError
          ? "Could not reach the server. Is the backend running on port 5000?"
          : error instanceof Error
            ? error.message
            : "Could not publish the job.";

      toast.add({
        title: "Failed to publish job",
        description: message,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mx-auto w-full max-w-[1080px] pb-12">
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
        <span className="text-zinc-400">Create New Listing</span>
      </nav>

      <div className="mt-3 grid gap-4 sm:grid-cols-[1fr_auto] sm:items-start">
        <div>
          <h1 className="font-heading text-[30px] leading-tight font-semibold tracking-tight text-white sm:text-[36px]">
            Post a New Job
          </h1>
          <p className="mt-2 max-w-xl text-[15px] text-zinc-400">
            Fill in the position specifications to attract qualified talent
            across our network.
          </p>
        </div>
      </div>

      <form
        id="new-job-form"
        className="mt-12 space-y-12"
        onSubmit={handleFormSubmit}
      >
        <section className="space-y-5">
          <JobSectionHeading step={1}>Basic Information</JobSectionHeading>

          <div>
            <JobFieldLabel htmlFor="title" required>
              Job Title
            </JobFieldLabel>
            <div className="relative">
              <Input
                id="title"
                name="title"
                value={title}
                onChange={(event) => setTitle(event.target.value)}
                placeholder="e.g. Frontend Developer"
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
              <JobFieldLabel htmlFor="companyName" required>
                Company Name
              </JobFieldLabel>
              <div className="relative">
                <Building2 aria-hidden="true" className={inputIconClassName} />
                <Input
                  id="companyName"
                  name="companyName"
                  placeholder="e.g. HirePulse Network"
                  autoComplete="organization"
                  required
                  className="pl-11 text-[15px]"
                />
              </div>
            </div>

            <div>
              <JobFieldLabel htmlFor="category" required>
                Job Category
              </JobFieldLabel>
              <JobSelectField
                id="category"
                name="category"
                options={JOB_CATEGORIES}
                defaultValue="Engineering & Tech"
              />
            </div>
          </div>

          <div>
            <JobFieldLabel id="jobType-label" required>
              Job Type
            </JobFieldLabel>
            <div
              role="group"
              aria-labelledby="jobType-label"
              className="grid grid-cols-2 gap-4 sm:grid-cols-4"
            >
              {JOB_TYPES.map((type) => (
                <button
                  key={type}
                  type="button"
                  aria-pressed={jobType === type}
                  onClick={() => setJobType(type)}
                  className={cn(
                    "h-11 rounded-xl border text-[15px] font-medium transition-colors",
                    jobType === type
                      ? "border-indigo-500/60 bg-indigo-500/10 text-white"
                      : "border-white/5 bg-white/[0.04] text-zinc-400 hover:bg-white/[0.07] hover:text-zinc-200",
                  )}
                >
                  {type}
                </button>
              ))}
            </div>
            <input type="hidden" name="jobType" value={jobType} />
          </div>
        </section>

        <section className="space-y-5">
          <JobSectionHeading step={2}>
            Location, Compensation &amp; Timeline
          </JobSectionHeading>

          <div className="flex items-center justify-between gap-4 rounded-2xl border border-white/5 bg-white/[0.04] p-4">
            <div className="flex items-center gap-3">
              <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-indigo-500/10 text-indigo-300 ring-1 ring-indigo-500/30">
                <Globe aria-hidden="true" className="size-4" />
              </span>
              <div>
                <p className="text-[15px] font-semibold text-white">
                  Remote Work Allowed{" "}
                  <span className="font-normal text-zinc-400">(isRemote)</span>
                </p>
                <p className="mt-0.5 text-xs text-zinc-400">
                  Enable worldwide or distributed candidate applications
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
                isRemote ? "bg-zinc-600" : "bg-white/10",
              )}
            >
              <span
                className={cn(
                  "absolute top-0.5 left-0.5 size-5 rounded-full bg-white transition-transform",
                  isRemote && "translate-x-5",
                )}
              />
            </button>
          </div>
          <input type="hidden" name="isRemote" value={String(isRemote)} />

          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <JobFieldLabel
                htmlFor="location"
                hint={
                  <span className="text-[11px] text-zinc-500">Required</span>
                }
              >
                Job Location (location)
              </JobFieldLabel>
              <div className="relative">
                <MapPin aria-hidden="true" className={inputIconClassName} />
                <Input
                  id="location"
                  name="location"
                  placeholder="e.g. New York, USA"
                  autoComplete="off"
                  required
                  className="pl-11 text-[15px]"
                />
              </div>
            </div>

            <div>
              <JobFieldLabel htmlFor="deadline">
                Application Deadline (deadline)
              </JobFieldLabel>
              <div className="relative">
                <CalendarDays aria-hidden="true" className={inputIconClassName} />
                <Input
                  ref={deadlineRef}
                  id="deadline"
                  name="deadline"
                  type="date"
                  onClick={(event) => event.currentTarget.showPicker?.()}
                  className="pl-11 text-[15px] [&::-webkit-calendar-picker-indicator]:hidden"
                />
              </div>
            </div>
          </div>

          <div className="grid gap-5 sm:grid-cols-3">
            <div>
              <JobFieldLabel htmlFor="minSalary">Min Salary / Rate</JobFieldLabel>
              <div className="relative">
                <DollarSign aria-hidden="true" className={inputIconClassName} />
                <Input
                  id="minSalary"
                  name="minSalary"
                  inputMode="decimal"
                  placeholder="e.g. 25"
                  className="pl-11 text-[15px]"
                />
              </div>
            </div>

            <div>
              <JobFieldLabel htmlFor="maxSalary">Max Salary / Rate</JobFieldLabel>
              <div className="relative">
                <DollarSign aria-hidden="true" className={inputIconClassName} />
                <Input
                  id="maxSalary"
                  name="maxSalary"
                  inputMode="decimal"
                  placeholder="e.g. 40"
                  className="pl-11 text-[15px]"
                />
              </div>
            </div>

            <div>
              <JobFieldLabel htmlFor="frequency">Frequency</JobFieldLabel>
              <JobSelectField
                id="frequency"
                name="frequency"
                options={FREQUENCIES}
                defaultValue="per hour"
              />
            </div>
          </div>
        </section>

        <section className="space-y-5">
          <JobSectionHeading step={3}>
            Responsibilities &amp; Requirements
          </JobSectionHeading>

          <div>
            <JobFieldLabel htmlFor="responsibilities" required>
              Key Responsibilities
            </JobFieldLabel>
            <textarea
              id="responsibilities"
              name="responsibilities"
              required
              placeholder="Describe what this role owns day to day, the people it works with, and the outcomes it drives."
              className="min-h-[104px] w-full resize-y rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-[15px] text-white outline-none transition-colors placeholder:text-zinc-500 focus-visible:border-indigo-500/60 focus-visible:ring-2 focus-visible:ring-indigo-500/20"
            />
          </div>

          <div>
            <JobFieldLabel htmlFor="qualifications" required>
              Qualifications &amp; Requirements
            </JobFieldLabel>
            <textarea
              id="qualifications"
              name="qualifications"
              required
              placeholder="List the must-have skills, experience, and tools for this position."
              className="min-h-[104px] w-full resize-y rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-[15px] text-white outline-none transition-colors placeholder:text-zinc-500 focus-visible:border-indigo-500/60 focus-visible:ring-2 focus-visible:ring-indigo-500/20"
            />
          </div>
        </section>
        <section className="space-y-4">
          {/* {status ? (
            <p
              role={status.type === "error" ? "alert" : "status"}
              className={cn(
                "rounded-xl border px-4 py-3 text-sm",
                status.type === "error"
                  ? "border-red-500/30 bg-red-500/10 text-red-200"
                  : "border-emerald-500/30 bg-emerald-500/10 text-emerald-200",
              )}
            >
              {status.message}
            </p>
          ) : null} */}

          <Button
            type="submit"
            form="new-job-form"
            disabled={isSubmitting}
            className="h-10 w-full rounded-full bg-indigo-600 px-7 text-[15px] font-semibold text-white hover:bg-indigo-500 sm:w-auto [&_svg:not([class*='size-'])]:size-4"
          >
            {isSubmitting ? "Publishing..." : "Publish Job"}
            {isSubmitting ? null : <ArrowRight aria-hidden="true" />}
          </Button>
        </section>
      </form>
    </div>
  );
};

export default NewJobPage;
