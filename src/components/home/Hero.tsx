import Image from "next/image";
import Link from "next/link";
import {
  ArrowUpRight,
  MapPin,
  Search,
  Sparkles,
  TrendingUp,
} from "lucide-react";

import globe from "@/images/globe.png";
import { Button } from "@/components/ui/button";

const popularSearches = [
  "Product Design",
  "Engineering",
  "Marketing",
  "Remote",
];

const featuredJobs = [
  {
    role: "Senior Product Designer",
    company: "Northstar",
    location: "Remote",
    salary: "$140k – $180k",
    initials: "N",
    avatar: "bg-indigo-500/15 text-indigo-300",
    badge: "New",
  },
  {
    role: "Frontend Engineer",
    company: "Orbit",
    location: "Hybrid · Berlin",
    salary: "$120k – $160k",
    initials: "O",
    avatar: "bg-orange-500/15 text-orange-300",
    badge: "2d",
  },
];

const stats = [
  { value: "12k+", label: "Open roles" },
  { value: "3.2k+", label: "Hiring teams" },
  { value: "87%", label: "Match rate" },
];

const HeroSection = () => {
  return (
    <section className="relative isolate overflow-hidden bg-[#0a0a0a] text-white">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute -top-40 left-1/2 h-[520px] w-[820px] -translate-x-1/2 rounded-full bg-indigo-600/20 blur-[130px]" />
        <div className="absolute -right-32 top-1/3 h-[360px] w-[360px] rounded-full bg-orange-500/10 blur-[120px]" />
        <div className="absolute -left-40 bottom-0 h-[320px] w-[320px] rounded-full bg-blue-500/10 blur-[120px]" />
      </div>

      <div className="relative mx-auto grid w-full max-w-[1240px] items-center gap-14 px-4 pb-20 pt-14 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:gap-8 lg:px-8 lg:pb-28 lg:pt-24">
        <div className="text-center lg:text-left">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3.5 py-1.5 text-xs font-medium text-zinc-300">
            <span className="relative flex size-1.5">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex size-1.5 rounded-full bg-emerald-400" />
            </span>
            New roles added every day
          </span>

          <h1 className="mt-6 text-balance text-4xl font-semibold leading-[1.04] tracking-[-0.04em] sm:text-5xl lg:text-6xl xl:text-[68px]">
            Find work that{" "}
            <span className="bg-gradient-to-r from-indigo-400 via-sky-400 to-orange-400 bg-clip-text text-transparent">
              fits your life
            </span>
            .
          </h1>

          <p className="mx-auto mt-6 max-w-xl text-base leading-7 text-zinc-400 sm:text-lg lg:mx-0">
            Discover roles at companies that value what you bring. Search
            smarter, apply faster, and land your next opportunity with
            hireloop.
          </p>

          <form
            action="/jobs"
            method="get"
            className="mt-8 rounded-2xl border border-white/10 bg-white/[0.04] p-2 backdrop-blur-xl"
          >
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center lg:flex-col lg:items-stretch xl:flex-row xl:items-center">
              <label
                htmlFor="hero-search"
                className="flex flex-1 items-center gap-3 rounded-xl px-4 transition-colors focus-within:bg-white/[0.06]"
              >
                <Search className="size-5 shrink-0 text-zinc-500" />
                <span className="sr-only">Job title or keyword</span>
                <input
                  id="hero-search"
                  name="q"
                  type="search"
                  placeholder="Job title or keyword"
                  className="h-12 w-full bg-transparent text-sm text-white outline-none placeholder:text-zinc-500"
                />
              </label>

              <span
                aria-hidden="true"
                className="hidden h-8 w-px bg-white/10 sm:block lg:hidden xl:block"
              />

              <label
                htmlFor="hero-location"
                className="flex flex-1 items-center gap-3 rounded-xl px-4 transition-colors focus-within:bg-white/[0.06]"
              >
                <MapPin className="size-5 shrink-0 text-zinc-500" />
                <span className="sr-only">Location</span>
                <input
                  id="hero-location"
                  name="location"
                  type="text"
                  placeholder="Location"
                  className="h-12 w-full bg-transparent text-sm text-white outline-none placeholder:text-zinc-500"
                />
              </label>

              <Button
                type="submit"
                size="lg"
                className="h-12 w-full rounded-xl! bg-indigo-600! px-6 text-sm font-semibold text-white! hover:bg-indigo-500! sm:w-auto lg:w-full xl:w-auto"
              >
                Search jobs
              </Button>
            </div>
          </form>

          <div className="mt-5 flex flex-wrap items-center justify-center gap-2 lg:justify-start">
            <span className="text-xs text-zinc-500">Popular:</span>
            {popularSearches.map((term) => (
              <Link
                key={term}
                href={`/jobs?q=${encodeURIComponent(term)}`}
                className="rounded-full border border-white/10 px-3 py-1 text-xs text-zinc-400 transition-colors hover:border-white/25 hover:text-white"
              >
                {term}
              </Link>
            ))}
          </div>

          <dl className="mx-auto mt-10 grid max-w-md grid-cols-3 gap-4 border-t border-white/10 pt-6 lg:mx-0">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center lg:text-left">
                <dt className="sr-only">{stat.label}</dt>
                <dd className="text-2xl font-semibold tracking-tight text-white">
                  {stat.value}
                </dd>
                <dd className="mt-1 text-xs text-zinc-500">{stat.label}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div
          aria-hidden="true"
          className="relative mx-auto w-full max-w-[520px] lg:max-w-none"
        >
          <div className="relative mx-auto aspect-[4/5] w-full max-w-[500px]">
            <div className="absolute inset-x-12 bottom-10 top-1/4 rounded-full bg-indigo-600/20 blur-[100px]" />
            <Image
              src={globe}
              alt=""
              fill
              priority
              sizes="(min-width: 1024px) 45vw, 90vw"
              className="object-contain object-bottom [mask-image:radial-gradient(ellipse_75%_70%_at_50%_60%,black_55%,transparent_100%)]"
            />

            <div className="absolute left-0 top-12 w-[235px] rounded-2xl border border-white/10 bg-[#151515]/90 p-4 shadow-[0_24px_70px_-24px_rgba(0,0,0,0.9)] backdrop-blur-xl sm:w-[255px]">
              <div className="flex items-start gap-3">
                <span
                  className={`flex size-9 shrink-0 items-center justify-center rounded-xl text-sm font-semibold ${featuredJobs[0].avatar}`}
                >
                  {featuredJobs[0].initials}
                </span>
                <div className="min-w-0">
                  <p className="truncate text-[13px] font-medium text-white">
                    {featuredJobs[0].role}
                  </p>
                  <p className="mt-0.5 truncate text-[11px] text-zinc-500">
                    {featuredJobs[0].company} · {featuredJobs[0].location}
                  </p>
                </div>
              </div>
              <div className="mt-3 flex items-center justify-between border-t border-white/5 pt-3">
                <span className="text-[11px] text-zinc-400">
                  {featuredJobs[0].salary}
                </span>
                <span className="rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] font-medium text-emerald-400">
                  {featuredJobs[0].badge}
                </span>
              </div>
            </div>

            <div className="absolute -right-2 top-1/2 hidden w-[250px] rounded-2xl border border-white/10 bg-[#151515]/90 p-4 shadow-[0_24px_70px_-24px_rgba(0,0,0,0.9)] backdrop-blur-xl sm:block">
              <div className="flex items-start gap-3">
                <span
                  className={`flex size-9 shrink-0 items-center justify-center rounded-xl text-sm font-semibold ${featuredJobs[1].avatar}`}
                >
                  {featuredJobs[1].initials}
                </span>
                <div className="min-w-0">
                  <p className="truncate text-[13px] font-medium text-white">
                    {featuredJobs[1].role}
                  </p>
                  <p className="mt-0.5 truncate text-[11px] text-zinc-500">
                    {featuredJobs[1].company} · {featuredJobs[1].location}
                  </p>
                </div>
              </div>
              <div className="mt-3 flex items-center justify-between border-t border-white/5 pt-3">
                <span className="text-[11px] text-zinc-400">
                  {featuredJobs[1].salary}
                </span>
                <span className="rounded-full bg-white/5 px-2 py-0.5 text-[10px] font-medium text-zinc-400">
                  {featuredJobs[1].badge}
                </span>
              </div>
            </div>

            <div className="absolute bottom-10 left-8 hidden items-center gap-2 rounded-full border border-white/10 bg-[#151515]/90 px-3.5 py-2 text-xs font-medium text-zinc-300 shadow-xl backdrop-blur-xl lg:flex">
              <TrendingUp className="size-3.5 text-emerald-400" />
              92% profile match
            </div>
          </div>

          <div className="absolute right-4 top-6 hidden items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-[11px] font-medium text-zinc-300 backdrop-blur-md sm:flex">
            <Sparkles className="size-3.5 text-indigo-400" />
            Curated for you
            <ArrowUpRight className="size-3 text-zinc-500" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
