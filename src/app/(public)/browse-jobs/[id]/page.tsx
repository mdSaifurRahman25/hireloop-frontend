"use client";

import { use, useEffect, useState, Suspense } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "@/components/ui/toast";
import type { JobApplicationPayload, JobDocument } from "@/types";
import { getJobById } from "@/lib/api/jobs";
import { formatCompensation, formatDeadline } from "@/lib/utils/formatters";
import { useSession } from "@/lib/auth-client";

import {
  JobHeader,
  JobQuickInfo,
  JobCompanyOverview,
  JobApplyModal,
  JobDetailsSkeleton,
  JobNotFound,
  SkillIcon,
  BenefitIcon,
  CATEGORY_SKILLS,
  DEFAULT_BENEFITS,
} from "@/components/jobs/details";
import applyToJob from "@/lib/actions/applications";

function JobDetailsContent({ jobId }: { jobId: string }) {
  const [job, setJob] = useState<JobDocument | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [fetchedJobId, setFetchedJobId] = useState<string | null>(null);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);
  const [applicantNameInput, setApplicantNameInput] = useState<string | null>(
    null,
  );
  const [applicantEmailInput, setApplicantEmailInput] = useState<string | null>(
    null,
  );
  const [hasApplied, setHasApplied] = useState(false);
  const router = useRouter();

  const { data: session, isPending } = useSession();
  const user = session?.user;

  const applicantName = applicantNameInput ?? user?.name ?? "";
  const applicantEmail = applicantEmailInput ?? user?.email ?? "";

  useEffect(() => {
    let isMounted = true;

    getJobById(jobId)
      .then((data) => {
        if (isMounted) {
          // console.log("Full Job Details Object:", data);
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
  const deadline = job.deadline
    ? formatDeadline(job.deadline)
    : "Open until filled";

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

  // Check authentication before opening the application modal
  const handleApplyClick = () => {
    if (isPending) return;

    if (!session?.user) {
      router.push("/sign-in");
      return;
    }

    setIsApplyModalOpen(true);
  };

  const handleApply = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (isPending) return;

    if (!session?.user) {
      setIsApplyModalOpen(false);
      router.push("/sign-in");
      return;
    }

    if (user?.role && user.role !== "seeker") {
      toast.add({
        title: "Application Restricted",
        description: "Only Job Seeker accounts can submit job applications.",
      });
      return;
    }

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    const application: JobApplicationPayload = {
      jobId,
      jobTitle: title,
      companyName: company,
      salary,
      location,
      applicantName: String(data.fullName || applicantName).trim(),
      applicantEmail: String(data.email || applicantEmail).trim(),
      portfolioUrl: data.portfolio ? String(data.portfolio).trim() : undefined,
      appliedAt: new Date().toISOString(),
    };

    try {
      console.log("Complete Application Data:", application);
      const result = await applyToJob(application);

      if (result.insertedId) {
        console.log("Application submitted successfully.");
        setHasApplied(true);
        setIsApplyModalOpen(false);
        toast.add({
          title: "Application Submitted!",
          description: `Your application for ${title} at ${company} has been received.`,
        });
        router.push("/browse-jobs");
      }
    } catch (err) {
      console.error("Failed to submit application:", err);
      toast.add({
        title: "Submission Failed",
        description: "Could not submit your application. Please try again.",
      });
    }
  };

  const handleToggleBookmark = () => {
    setIsBookmarked(!isBookmarked);
    toast.add({
      title: isBookmarked ? "Job Removed" : "Job Saved!",
      description: isBookmarked
        ? "Job removed from your saved list."
        : "Job added to your saved list.",
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
        <JobHeader
          title={title}
          company={company}
          category={category}
          isBookmarked={isBookmarked}
          onToggleBookmark={handleToggleBookmark}
          onApplyClick={handleApplyClick}
          hasApplied={hasApplied}
          isPending={isPending}
        />

        {/* 2. Quick Info Cards Grid */}
        <JobQuickInfo
          salary={salary}
          location={location}
          jobType={jobType}
          deadline={deadline}
        />

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
          <JobCompanyOverview
            company={company}
            category={category}
            isRemote={job.isRemote}
            onApplyClick={handleApplyClick}
            hasApplied={hasApplied}
            isPending={isPending}
          />
        </div>
      </div>

      {/* Interactive Application Modal */}
      <JobApplyModal
        isOpen={isApplyModalOpen}
        onClose={() => setIsApplyModalOpen(false)}
        title={title}
        company={company}
        user={user}
        isPending={isPending}
        applicantName={applicantName}
        onApplicantNameChange={setApplicantNameInput}
        applicantEmail={applicantEmail}
        onApplicantEmailChange={setApplicantEmailInput}
        onSubmit={handleApply}
      />
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
