import type { Metadata } from "next";
import Link from "next/link";
import {
  Briefcase,
  Building2,
  CalendarDays,
  ChevronRight,
  Clock,
  Globe,
  MapPin,
  Pencil,
  ShieldCheck,
  UserCheck,
  Users,
} from "lucide-react";
import { cn } from "cn";

import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "My Company",
  description: "Company profile, hiring focus and performance for your listings.",
};

// Placeholder profile until the API exposes a company endpoint.
const COMPANY = {
  name: "HirePulse Network",
  tagline: "Hiring infrastructure for distributed product teams.",
  industry: "Human Resources & Recruiting",
  size: "51–200 employees",
  founded: "2019",
  headquarters: "New York, USA",
  workModel: "Remote-first",
  website: "hirepulse.network",
  about:
    "HirePulse Network helps product teams hire across borders. We build the tooling recruiters use to publish roles, track applicants and keep candidates informed from first touch to signed offer.",
};

const STATS = [
  { label: "Open job posts", value: "5", icon: Briefcase },
  { label: "Total applicants", value: "100", icon: Users },
  { label: "Candidates hired", value: "12", icon: UserCheck },
  { label: "Avg. response", value: "2 days", icon: Clock },
];

const DETAILS = [
  { label: "Industry", value: COMPANY.industry, icon: Building2 },
  { label: "Company size", value: COMPANY.size, icon: Users },
  { label: "Founded", value: COMPANY.founded, icon: CalendarDays },
  { label: "Headquarters", value: COMPANY.headquarters, icon: MapPin },
  { label: "Work model", value: COMPANY.workModel, icon: Globe },
  { label: "Website", value: COMPANY.website, icon: Globe },
];

const HIRING_FOCUS = [
  "Engineering & Tech",
  "Design",
  "Product",
  "Marketing",
  "Operations",
];

const card = "rounded-2xl border border-white/[0.06] bg-white/[0.02]";
const sectionTitle = "text-[17px] font-semibold text-white";

const MyCompanyPage = () => {
  return (
    <div className="mx-auto w-full max-w-[1080px] pb-12">
      <nav
        aria-label="Breadcrumb"
        className="flex items-center gap-1.5 text-[13px] text-zinc-500"
      >
        <span>My Company</span>
        <ChevronRight aria-hidden="true" className="size-3.5" />
        <span className="text-zinc-400">Company Profile</span>
      </nav>

      <div className="mt-3 grid gap-4 sm:grid-cols-[1fr_auto] sm:items-start">
        <div>
          <h1 className="font-heading text-[30px] leading-tight font-semibold tracking-tight text-white sm:text-[36px]">
            My Company
          </h1>
          <p className="mt-2 max-w-xl text-[15px] text-zinc-400">
            Keep your company profile current so candidates know exactly who is
            behind every listing you publish.
          </p>
        </div>

        <Button
          type="button"
          disabled
          title="Company editing will be wired to the API next"
          className="h-10 w-full rounded-lg bg-indigo-600 px-4 text-sm font-semibold text-white sm:w-auto"
        >
          <Pencil aria-hidden="true" className="size-4" />
          Edit Company
        </Button>
      </div>

      <section className={cn("mt-8 overflow-hidden", card)}>
        <div className="flex flex-col gap-4 p-5 sm:flex-row sm:items-start sm:gap-5">
          <span className="flex size-14 shrink-0 items-center justify-center rounded-xl border border-indigo-500/30 bg-indigo-500/10 text-indigo-300">
            <Building2 aria-hidden="true" className="size-6" />
          </span>

          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="font-heading text-[22px] leading-tight font-semibold text-white">
                {COMPANY.name}
              </h2>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-2.5 py-1 text-xs font-medium text-emerald-400">
                <ShieldCheck aria-hidden="true" className="size-3.5" />
                Verified
              </span>
            </div>
            <p className="mt-1 text-[15px] text-zinc-400">{COMPANY.tagline}</p>

            <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-[13px] text-zinc-500">
              <span className="inline-flex items-center gap-1.5">
                <Building2 aria-hidden="true" className="size-3.5 shrink-0" />
                {COMPANY.industry}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <MapPin aria-hidden="true" className="size-3.5 shrink-0" />
                {COMPANY.headquarters}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Globe aria-hidden="true" className="size-3.5 shrink-0" />
                {COMPANY.website}
              </span>
            </div>
          </div>
        </div>

        <dl className="grid grid-cols-2 gap-4 border-t border-white/[0.06] p-5 sm:grid-cols-4">
          {STATS.map((stat) => (
            <div key={stat.label}>
              <dt className="flex items-center gap-1.5 text-[11px] font-semibold tracking-[0.08em] text-zinc-500 uppercase">
                <stat.icon aria-hidden="true" className="size-3.5 shrink-0" />
                <span className="min-w-0">{stat.label}</span>
              </dt>
              <dd className="mt-1.5 text-[20px] font-semibold text-white">
                {stat.value}
              </dd>
            </div>
          ))}
        </dl>
      </section>

      <div className="mt-6 grid gap-6 lg:grid-cols-[minmax(0,1.55fr)_minmax(0,1fr)]">
        <section className={cn("p-5", card)}>
          <h2 className={sectionTitle}>About the company</h2>
          <p className="mt-3 text-[15px] leading-relaxed text-zinc-400">
            {COMPANY.about}
          </p>

          <h3 className="mt-6 text-[11px] font-semibold tracking-[0.08em] text-zinc-500 uppercase">
            Hiring focus
          </h3>
          <ul className="mt-2.5 flex flex-wrap gap-2">
            {HIRING_FOCUS.map((focus) => (
              <li
                key={focus}
                className="rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 text-xs text-zinc-300"
              >
                {focus}
              </li>
            ))}
          </ul>
        </section>

        <section className={cn("p-5", card)}>
          <h2 className={sectionTitle}>Company details</h2>
          <dl className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
            {DETAILS.map((detail) => (
              <div key={detail.label} className="flex items-start gap-2.5">
                <span className="mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/[0.04] text-zinc-400">
                  <detail.icon aria-hidden="true" className="size-3.5" />
                </span>
                <div className="min-w-0">
                  <dt className="text-[11px] font-semibold tracking-[0.08em] text-zinc-500 uppercase">
                    {detail.label}
                  </dt>
                  <dd className="mt-0.5 truncate text-[13px] text-zinc-200">
                    {detail.value}
                  </dd>
                </div>
              </div>
            ))}
          </dl>
        </section>
      </div>

      <p className="mt-4 text-[13px] text-zinc-500">
        Profile details are placeholder values until the backend exposes a
        company endpoint.{" "}
        <Link
          href="/dashboard/recruiter/jobs"
          className="text-indigo-400 transition-colors hover:text-indigo-300"
        >
          View your job posts
        </Link>
        .
      </p>
    </div>
  );
};

export default MyCompanyPage;
