"use client";

import { use, useEffect, useState, Suspense } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Banknote,
  BarChart3,
  Bookmark,
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
import type { JobDetails, JobDocument } from "@/types";

const PRESET_JOBS: Record<string, JobDetails> = {
  "job-1": {
    id: "job-1",
    title: "Senior Product Designer",
    company: "CloudScale AI",
    isVerified: true,
    salary: "$140k - $180k",
    location: "Remote (US)",
    jobType: "Full-time",
    experience: "5+ Years",
    description:
      "At CloudScale AI, we are building the next generation of infrastructure monitoring tools. We are looking for a Senior Product Designer who is passionate about translating complex technical workflows into elegant, intuitive interfaces. You will be a key member of our design team, working closely with engineering and product leadership to define the vision for our core platform experience.",
    responsibilities: [
      "Lead the end-to-end design process for major platform features, from discovery to high-fidelity implementation.",
      "Collaborate with cross-functional partners to understand user needs and translate them into functional design requirements.",
      "Maintain and evolve our design system, ensuring consistency and accessibility across the entire product suite.",
      "Conduct user research and usability testing to validate design decisions and iterate based on feedback.",
    ],
    skills: [
      { label: "Figma Expertise", icon: "figma" },
      { label: "System Thinking", icon: "system" },
      { label: "UI/UX Design", icon: "uiux" },
      { label: "Basic Frontend", icon: "frontend" },
    ],
    requirements: [
      "5+ years of experience designing complex B2B SaaS products or data-heavy applications.",
      "A strong portfolio showcasing your design process and problem-solving skills.",
    ],
    benefits: [
      { label: "Full Health & Dental", icon: "health" },
      { label: "Competitive 401k", icon: "401k" },
      { label: "Latest Hardware Stipend", icon: "hardware" },
      { label: "Unlimited PTO", icon: "pto" },
    ],
    companySize: "250 - 500 Employees",
    industry: "SaaS / Artificial Intelligence",
    websiteUrl: "https://cloudscale.ai",
    officeImage:
      "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80",
  },
  "job-2": {
    id: "job-2",
    title: "Lead Frontend Engineer",
    company: "FinGrid Solutions",
    isVerified: true,
    salary: "$165k - $210k",
    location: "New York, NY (Hybrid)",
    jobType: "Full-time",
    experience: "7+ Years",
    description:
      "FinGrid Solutions is building sub-millisecond algorithmic trading dashboards. We need an experienced Lead Frontend Engineer to architect resilient web applications using Next.js, React, and WebGL visualizations.",
    responsibilities: [
      "Architect and maintain high-throughput web client applications handling real-time financial telemetry.",
      "Mentor and guide a squad of 8 frontend engineers on TypeScript standards and code quality.",
      "Partner with quantitative analysts and designers to ship intuitive financial workflows.",
      "Optimize rendering cycles and DOM memory footprint for high-frequency chart updates.",
    ],
    skills: [
      { label: "React & Next.js", icon: "frontend" },
      { label: "System Thinking", icon: "system" },
      { label: "TypeScript Architecture", icon: "frontend" },
      { label: "UI/UX Design", icon: "uiux" },
    ],
    requirements: [
      "7+ years of professional web engineering experience with modern React & TypeScript.",
      "Proven track record building complex data-heavy interfaces with strict performance budgets.",
    ],
    benefits: [
      { label: "Premium Medical & Dental", icon: "health" },
      { label: "Competitive 401k Matching", icon: "401k" },
      { label: "Top-Spec M-Series Mac", icon: "hardware" },
      { label: "Flexible Hybrid PTO", icon: "pto" },
    ],
    companySize: "100 - 250 Employees",
    industry: "FinTech / High-Frequency Trading",
    websiteUrl: "https://fingrid.io",
    officeImage:
      "https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=800&q=80",
  },
  "job-3": {
    id: "job-3",
    title: "UX Researcher",
    company: "CreativeStudio",
    isVerified: true,
    salary: "$110k - $145k",
    location: "Austin, TX (On-site)",
    jobType: "Contract",
    experience: "3+ Years",
    description:
      "CreativeStudio helps global consumer technology brands design intuitive, beloved digital products. We are seeking an empathetic UX Researcher to run discovery interviews, synthesize testing, and translate insights into actionable product strategies.",
    responsibilities: [
      "Design and execute mixed-methods research studies across web and mobile platforms.",
      "Synthesize large qualitative datasets into digestible persona frameworks and journey maps.",
      "Facilitate weekly user usability labs and present findings directly to clients.",
      "Collaborate closely with product designers to prototype and evaluate interface concepts.",
    ],
    skills: [
      { label: "Qualitative Research", icon: "system" },
      { label: "Usability Labs", icon: "uiux" },
      { label: "Journey Mapping", icon: "figma" },
      { label: "Design Systems", icon: "frontend" },
    ],
    requirements: [
      "3+ years running generative and evaluative UX research in high-growth environments.",
      "Strong storytelling skills and ability to turn raw research into clear recommendations.",
    ],
    benefits: [
      { label: "Comprehensive Healthcare", icon: "health" },
      { label: "Project Milestone Bonus", icon: "401k" },
      { label: "Ergonomic Studio Setup", icon: "hardware" },
      { label: "Generous Time Off", icon: "pto" },
    ],
    companySize: "50 - 100 Employees",
    industry: "Design & Product Innovation",
    websiteUrl: "https://creativestudio.design",
    officeImage:
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80",
  },
  "job-4": {
    id: "job-4",
    title: "Machine Learning Engineer",
    company: "HealthAI Corp",
    isVerified: true,
    salary: "$180k - $250k",
    location: "Boston, MA (Remote)",
    jobType: "Full-time",
    experience: "5+ Years",
    description:
      "HealthAI Corp is leveraging multimodal foundation models to revolutionize clinical diagnosis and patient care. We are looking for an ML Engineer with deep learning and MLOps expertise to build robust model training pipelines.",
    responsibilities: [
      "Train, fine-tune, and evaluate deep learning architectures on clinical imaging datasets.",
      "Build scalable, fault-tolerant distributed training pipelines using PyTorch and Ray.",
      "Partner with biomedical researchers to audit models for fairness, safety, and clinical efficacy.",
      "Deploy low-latency inference services on GPU clusters with automated monitoring.",
    ],
    skills: [
      { label: "PyTorch & Transformers", icon: "frontend" },
      { label: "MLOps Architecture", icon: "system" },
      { label: "Distributed Training", icon: "system" },
      { label: "Model Evaluation", icon: "uiux" },
    ],
    requirements: [
      "5+ years building and deploying deep learning pipelines in production.",
      "Strong background in computer vision, multimodal transformers, or NLP.",
    ],
    benefits: [
      { label: "Top-Tier Health & Vision", icon: "health" },
      { label: "Significant Equity Grant", icon: "401k" },
      { label: "Home Office & GPU Budget", icon: "hardware" },
      { label: "Unlimited Wellness Days", icon: "pto" },
    ],
    companySize: "150 - 300 Employees",
    industry: "HealthTech / Applied AI",
    websiteUrl: "https://healthai.org",
    officeImage:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80",
  },
};

function SkillIcon({ type }: { type: "figma" | "system" | "uiux" | "frontend" }) {
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

function BenefitIcon({ type }: { type: "health" | "401k" | "hardware" | "pto" }) {
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

function JobDetailsContent({ jobId }: { jobId: string }) {

  const [liveJob, setLiveJob] = useState<JobDetails | null>(null);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);
  const [applicantName, setApplicantName] = useState("");
  const [applicantEmail, setApplicantEmail] = useState("");
  const [hasApplied, setHasApplied] = useState(false);

  // If jobId is a live job in MongoDB, load its properties
  useEffect(() => {
    if (!jobId || PRESET_JOBS[jobId]) return;

    const fetchLiveJob = async () => {
      try {
        const baseUri = process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:5000";
        const res = await fetch(`${baseUri}/jobs`);
        if (!res.ok) return;
        const jobs = (await res.json()) as JobDocument[];
        const matched = jobs.find((j) => j._id === jobId);

        if (matched) {
          const low = matched.minSalary ?? matched.maxSalary;
          const high = matched.maxSalary ?? matched.minSalary;
          const salary =
            low && high
              ? `$${low.toLocaleString()} - $${high.toLocaleString()}`
              : "$120k - $160k";

          const location = matched.isRemote
            ? matched.location
              ? `${matched.location} (Remote)`
              : "Remote"
            : matched.location ?? "On-site";

          const parsedResponsibilities = matched.responsibilities
            ? matched.responsibilities
                .split("\n")
                .map((line: string) => line.replace(/^[-*•]\s*/, "").trim())
                .filter(Boolean)
            : PRESET_JOBS["job-1"].responsibilities;

          const parsedRequirements = matched.qualifications
            ? matched.qualifications
                .split("\n")
                .map((line: string) => line.replace(/^[-*•]\s*/, "").trim())
                .filter(Boolean)
            : PRESET_JOBS["job-1"].requirements;

          setLiveJob({
            ...PRESET_JOBS["job-1"],
            id: matched._id,
            title: matched.title ?? matched.jobTitle ?? "Software Engineer",
            company: matched.companyName ?? "Hireloop Partner",
            salary,
            location,
            jobType: matched.jobType ?? "Full-time",
            responsibilities:
              parsedResponsibilities.length > 0
                ? parsedResponsibilities
                : PRESET_JOBS["job-1"].responsibilities,
            requirements:
              parsedRequirements.length > 0
                ? parsedRequirements
                : PRESET_JOBS["job-1"].requirements,
          });
        }
      } catch {
        // Keep current preset on error
      }
    };

    fetchLiveJob();
  }, [jobId]);

  const job = liveJob ?? (PRESET_JOBS[jobId] ?? PRESET_JOBS["job-1"]);

  const handleApply = (e: React.FormEvent) => {
    e.preventDefault();
    setHasApplied(true);
    setIsApplyModalOpen(false);
    toast.add({
      title: "Application Submitted!",
      description: `Your application for ${job.title} at ${job.company} has been received.`,
    });
  };

  return (
    <main className="min-h-screen bg-[#0a0a0a] px-3.5 py-5 sm:px-6 sm:py-8 lg:px-8">
      <div className="mx-auto max-w-[1240px] space-y-4 sm:space-y-6">
        {/* Responsive Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-zinc-500 overflow-hidden">
          <Link
            href="/browse-jobs"
            className="inline-flex items-center gap-1.5 shrink-0 transition-colors hover:text-zinc-200"
          >
            <ArrowLeft className="size-3.5" />
            Browse Jobs
          </Link>
          <span className="shrink-0">/</span>
          <span className="truncate text-zinc-400">{job.title}</span>
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
                  {job.title}
                </h1>
                <div className="mt-1 flex flex-wrap items-center gap-1.5 sm:gap-2 text-xs sm:text-sm">
                  <span className="font-medium text-zinc-300">{job.company}</span>
                  <span aria-hidden="true" className="text-zinc-600">
                    •
                  </span>
                  {job.isVerified && (
                    <span className="inline-flex items-center gap-1 font-medium text-emerald-400">
                      <CheckCircle2 className="size-3.5 fill-emerald-400 text-black" />
                      Verified Employer
                    </span>
                  )}
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
                  className={cn("size-4.5 transition-all", isBookmarked ? "fill-white text-white" : "")}
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
        <section aria-label="Job quick details" className="grid grid-cols-2 gap-2.5 sm:grid-cols-4 sm:gap-4">
          {/* Salary */}
          <div className="rounded-2xl border border-white/[0.08] bg-[#121212] p-3.5 sm:p-5">
            <div className="flex items-center gap-1.5 sm:gap-2 text-zinc-400">
              <Banknote aria-hidden="true" className="size-3.5 sm:size-4 text-zinc-400" />
              <span className="text-[10px] sm:text-xs font-semibold tracking-wider text-zinc-500 uppercase">
                SALARY RANGE
              </span>
            </div>
            <p className="mt-1.5 sm:mt-2 text-xs sm:text-base font-semibold text-white truncate">{job.salary}</p>
          </div>

          {/* Location */}
          <div className="rounded-2xl border border-white/[0.08] bg-[#121212] p-3.5 sm:p-5">
            <div className="flex items-center gap-1.5 sm:gap-2 text-zinc-400">
              <MapPin aria-hidden="true" className="size-3.5 sm:size-4 text-zinc-400" />
              <span className="text-[10px] sm:text-xs font-semibold tracking-wider text-zinc-500 uppercase">
                LOCATION
              </span>
            </div>
            <p className="mt-1.5 sm:mt-2 text-xs sm:text-base font-semibold text-white truncate">{job.location}</p>
          </div>

          {/* Job Type */}
          <div className="rounded-2xl border border-white/[0.08] bg-[#121212] p-3.5 sm:p-5">
            <div className="flex items-center gap-1.5 sm:gap-2 text-zinc-400">
              <Clock aria-hidden="true" className="size-3.5 sm:size-4 text-zinc-400" />
              <span className="text-[10px] sm:text-xs font-semibold tracking-wider text-zinc-500 uppercase">
                JOB TYPE
              </span>
            </div>
            <p className="mt-1.5 sm:mt-2 text-xs sm:text-base font-semibold text-white truncate">{job.jobType}</p>
          </div>

          {/* Experience */}
          <div className="rounded-2xl border border-white/[0.08] bg-[#121212] p-3.5 sm:p-5">
            <div className="flex items-center gap-1.5 sm:gap-2 text-zinc-400">
              <BarChart3 aria-hidden="true" className="size-3.5 sm:size-4 text-zinc-400" />
              <span className="text-[10px] sm:text-xs font-semibold tracking-wider text-zinc-500 uppercase">
                EXPERIENCE
              </span>
            </div>
            <p className="mt-1.5 sm:mt-2 text-xs sm:text-base font-semibold text-white truncate">{job.experience}</p>
          </div>
        </section>

        {/* 3. Main Content: Left Details Card & Right Company Overview */}
        <div className="grid grid-cols-1 items-start gap-5 sm:gap-6 lg:grid-cols-[1fr_340px] xl:grid-cols-[1fr_380px]">
          {/* Left Column: Full Job Details */}
          <div className="space-y-6 sm:space-y-8 rounded-2xl border border-white/[0.08] bg-[#121212] p-4.5 sm:p-7 lg:p-8">
            {/* Job Description */}
            <section aria-labelledby="desc-heading">
              <h2 id="desc-heading" className="text-base font-semibold text-white sm:text-lg">
                Job Description
              </h2>
              <p className="mt-2.5 sm:mt-3 text-xs sm:text-[15px] leading-relaxed text-zinc-400">
                {job.description}
              </p>
            </section>

            {/* Responsibilities */}
            <section aria-labelledby="resp-heading" className="border-t border-white/[0.06] pt-5 sm:pt-6">
              <h2 id="resp-heading" className="text-base font-semibold text-white sm:text-lg">
                Responsibilities
              </h2>
              <ul className="mt-3.5 sm:mt-4 space-y-2.5 sm:space-y-3">
                {job.responsibilities.map((resp, index) => (
                  <li key={index} className="flex items-start gap-2.5 sm:gap-3 text-xs sm:text-sm leading-relaxed text-zinc-400">
                    <span
                      aria-hidden="true"
                      className="mt-1.5 size-1.5 shrink-0 rounded-full bg-zinc-500"
                    />
                    <span>{resp}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* Requirements */}
            <section aria-labelledby="req-heading" className="border-t border-white/[0.06] pt-5 sm:pt-6">
              <h2 id="req-heading" className="text-base font-semibold text-white sm:text-lg">
                Requirements
              </h2>

              {/* Skill Badges */}
              <div className="mt-3.5 sm:mt-4 flex flex-wrap items-center gap-2 sm:gap-2.5">
                {job.skills.map((skill, index) => (
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
                {job.requirements.map((req, index) => (
                  <li key={index} className="flex items-start gap-2.5 sm:gap-3 text-xs sm:text-sm leading-relaxed text-zinc-400">
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
            <section aria-labelledby="benefits-heading" className="border-t border-white/[0.06] pt-5 sm:pt-6">
              <h2 id="benefits-heading" className="text-base font-semibold text-white sm:text-lg">
                Benefits
              </h2>

              <div className="mt-4 sm:mt-5 grid grid-cols-1 gap-3.5 sm:grid-cols-2 sm:gap-4">
                {job.benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="flex size-8.5 sm:size-9 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04]">
                      <BenefitIcon type={benefit.icon} />
                    </div>
                    <span className="text-xs sm:text-sm font-medium text-zinc-200">{benefit.label}</span>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Right Column: Company Overview Card */}
          <aside className="lg:sticky lg:top-28 space-y-5 sm:space-y-6 rounded-2xl border border-white/[0.08] bg-[#121212] p-4.5 sm:p-6 shadow-xl">
            <h2 className="text-base font-semibold text-white">Company Overview</h2>

            {/* Company Modern Office Workspace Preview */}
            <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl border border-white/10 bg-zinc-900 shadow-md">
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10" />
              <div
                className="h-full w-full bg-cover bg-center transition-transform duration-500 hover:scale-105"
                style={{
                  backgroundImage: `url('${job.officeImage}')`,
                }}
              />
              <div className="absolute bottom-3 left-3 z-20 flex items-center gap-2">
                <span className="size-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-xs font-medium text-white/90">Hiring actively</span>
              </div>
            </div>

            {/* Company Metadata Info */}
            <div className="space-y-3.5 sm:space-y-4 border-t border-white/[0.06] pt-4 sm:pt-5">
              <div className="flex items-center justify-between text-xs sm:text-sm">
                <span className="text-[10px] sm:text-[11px] font-semibold tracking-wider text-zinc-500 uppercase">
                  SIZE
                </span>
                <span className="font-medium text-zinc-200">{job.companySize}</span>
              </div>

              <div className="flex items-center justify-between text-xs sm:text-sm">
                <span className="text-[10px] sm:text-[11px] font-semibold tracking-wider text-zinc-500 uppercase">
                  INDUSTRY
                </span>
                <span className="font-medium text-zinc-200">{job.industry}</span>
              </div>
            </div>

            {/* Visit Website Button */}
            <div className="border-t border-white/[0.06] pt-4 sm:pt-5">
              <a
                href={job.websiteUrl}
                target="_blank"
                rel="noreferrer"
                className="flex w-full items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] py-2.5 text-center text-xs sm:text-sm font-medium text-zinc-200 transition-colors hover:border-white/20 hover:bg-white/10 hover:text-white"
              >
                <Globe className="size-4 text-zinc-400" />
                Visit Website
              </a>
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
                <h3 className="text-base sm:text-lg font-semibold text-white truncate">Apply for {job.title}</h3>
                <p className="text-xs text-zinc-400 mt-0.5">{job.company}</p>
              </div>
              <button
                type="button"
                onClick={() => setIsApplyModalOpen(false)}
                className="rounded-lg p-1 text-zinc-400 hover:text-white shrink-0"
              >
                <X className="size-5" />
              </button>
            </div>

            <form onSubmit={handleApply} className="mt-4 sm:mt-5 space-y-3.5 sm:space-y-4">
              <div>
                <label className="block text-xs font-medium text-zinc-300">Your Full Name</label>
                <input
                  type="text"
                  required
                  value={applicantName}
                  onChange={(e) => setApplicantName(e.target.value)}
                  placeholder="e.g. Alex Morgan"
                  className="mt-1.5 w-full rounded-xl border border-white/10 bg-white/[0.04] px-3.5 py-2.5 text-sm text-white placeholder:text-zinc-500 outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-zinc-300">Email Address</label>
                <input
                  type="email"
                  required
                  value={applicantEmail}
                  onChange={(e) => setApplicantEmail(e.target.value)}
                  placeholder="alex@example.com"
                  className="mt-1.5 w-full rounded-xl border border-white/10 bg-white/[0.04] px-3.5 py-2.5 text-sm text-white placeholder:text-zinc-500 outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-zinc-300">Portfolio / LinkedIn URL</label>
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
  return <JobDetailsContent jobId={resolvedParams?.id ?? "job-1"} />;
}

export default function JobDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#0a0a0a] px-3.5 py-5 sm:px-6 sm:py-8 lg:px-8">
          <div className="mx-auto max-w-[1240px] py-16 text-center">
            <div className="mx-auto size-8 rounded-full border-2 border-indigo-500 border-t-transparent animate-spin" />
            <p className="mt-3 text-sm text-zinc-400">Loading job details...</p>
          </div>
        </div>
      }
    >
      <JobDetailsAsyncLoader params={params} />
    </Suspense>
  );
}
