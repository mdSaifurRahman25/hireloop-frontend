import Image from "next/image";
import Link from "next/link";
import {
  Briefcase,
  Building2,
  Gift,
  MapPin,
  Search,
  Star,
  Users,
} from "lucide-react";

import globe from "@/images/globe.png";

const trendingPositions = [
  "Product Designer",
  "AI Engineering",
  "Dev-ops Engineer",
];

const stats = [
  { icon: Briefcase, value: "50K", label: "Active jobs" },
  { icon: Building2, value: "12K", label: "Companies" },
  { icon: Users, value: "2M", label: "Job Seekers" },
  { icon: Star, value: "97%", label: "Satisfaction Rate" },
];

const HeroSection = () => {
  return (
    <section className="relative isolate overflow-hidden bg-[#0a0a0a] text-white">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-0 h-[560px] w-[900px] -translate-x-1/2 rounded-full bg-indigo-600/15 blur-[150px]" />
        <div className="absolute inset-x-0 top-0 h-64 bg-gradient-to-b from-white/[0.04] to-transparent" />
      </div>

      <div className="relative mx-auto w-full max-w-[1440px] px-4 pb-14 pt-10 sm:px-6 lg:px-8 lg:pb-20 lg:pt-14">
        <div className="mx-auto max-w-3xl text-center">
          <div className="flex items-center justify-center gap-3 sm:gap-5">
            <span
              aria-hidden="true"
              className="hidden h-px w-10 bg-gradient-to-r from-transparent to-white/25 sm:block sm:w-20"
            />
            <p className="flex items-center gap-2 whitespace-nowrap text-[10px] font-medium uppercase tracking-[0.12em] sm:text-xs sm:tracking-[0.18em]">
              <span className="flex size-5 shrink-0 items-center justify-center rounded-[6px] bg-orange-500/15">
                <Gift className="size-3 text-orange-400" strokeWidth={2} />
              </span>
              <span className="font-semibold text-orange-400">59,999+</span>
              <span className="text-zinc-300">New jobs this month</span>
            </p>
            <span
              aria-hidden="true"
              className="hidden h-px w-10 bg-gradient-to-l from-transparent to-white/25 sm:block sm:w-20"
            />
          </div>

          <h1 className="mt-8 text-balance text-4xl font-bold leading-[1.08] tracking-[-0.035em] sm:text-[44px] lg:text-[56px]">
            Find Your Dream Job Today
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-zinc-400 sm:text-base">
            HireLoop connects top talent with world-class companies. Browse
            thousands of curated opportunities and land your next role – faster.
          </p>

          <form
            action="/browse-jobs"
            method="get"
            className="mx-auto mt-8 w-full max-w-[800px]"
          >
            <div className="flex flex-col gap-1 rounded-2xl border border-white/10 bg-white/[0.04] p-2 backdrop-blur-xl transition-colors focus-within:border-white/20 sm:flex-row sm:items-center sm:rounded-full sm:pl-4">
              <label
                htmlFor="hero-search"
                className="flex flex-1 items-center gap-2.5 rounded-xl px-3 py-2 transition-colors focus-within:bg-white/[0.04] sm:rounded-full sm:py-0"
              >
                <Search className="size-4 shrink-0 text-zinc-500" />
                <span className="sr-only">Job title, skill or company</span>
                <input
                  id="hero-search"
                  name="q"
                  type="search"
                  placeholder="Job title, skill or company"
                  className="h-9 w-full min-w-0 bg-transparent text-sm text-white outline-none placeholder:text-zinc-500"
                />
              </label>

              <span
                aria-hidden="true"
                className="mx-3 h-px shrink-0 bg-white/10 sm:mx-0 sm:h-6 sm:w-px"
              />

              <label
                htmlFor="hero-location"
                className="flex flex-1 items-center gap-2.5 rounded-xl px-3 py-2 transition-colors focus-within:bg-white/[0.04] sm:rounded-full sm:py-0"
              >
                <MapPin className="size-4 shrink-0 text-zinc-500" />
                <span className="sr-only">Location or Remote</span>
                <input
                  id="hero-location"
                  name="location"
                  type="text"
                  placeholder="Location or Remote"
                  className="h-9 w-full min-w-0 bg-transparent text-sm text-white outline-none placeholder:text-zinc-500"
                />
              </label>

              <button
                type="submit"
                aria-label="Search jobs"
                className="flex h-10 w-full shrink-0 items-center justify-center gap-2 rounded-xl bg-indigo-600 text-sm font-semibold text-white transition-colors hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-400 sm:size-11 sm:w-11 sm:rounded-xl"
              >
                <Search className="size-4 sm:hidden" />
                <span className="sm:hidden">Search jobs</span>
                <Search className="hidden size-4 sm:block" />
              </button>
            </div>
          </form>

          <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
            <span className="text-[11px] text-zinc-500">
              Trending Position
            </span>
            {trendingPositions.map((position) => (
              <Link
                key={position}
                href={`/browse-jobs?q=${encodeURIComponent(position)}`}
                className="rounded-full border border-white/10 bg-white/[0.02] px-3 py-1 text-[11px] text-zinc-300 transition-colors hover:border-white/25 hover:text-white"
              >
                {position}
              </Link>
            ))}
          </div>
        </div>

        <div className="relative mt-8 lg:mt-10">
          <div className="relative mx-auto w-full max-w-[1120px]">
            <div className="relative aspect-square overflow-hidden sm:aspect-[16/10] lg:aspect-[16/9]">
              <Image
                src={globe}
                alt=""
                fill
                priority
                sizes="(min-width: 1280px) 1120px, 100vw"
                className="object-cover object-center [mask-image:linear-gradient(to_bottom,transparent_0%,black_20%)]"
              />

              <p className="absolute inset-x-0 bottom-[20%] z-10 px-4 text-center text-lg font-semibold leading-snug tracking-[-0.01em] text-white/90 drop-shadow-[0_2px_24px_rgba(0,0,0,0.65)] sm:px-6 sm:text-2xl lg:text-[32px]">
                Assisting over 15,000 job seekers
                <br className="hidden sm:block" /> find their dream positions.
              </p>
            </div>
          </div>

          <div className="relative z-10 -mt-12 grid grid-cols-2 gap-3 sm:-mt-16 lg:-mt-24 lg:grid-cols-4 lg:gap-5">
            {stats.map((stat) => {
              const Icon = stat.icon;

              return (
                <div
                  key={stat.label}
                  className="flex min-h-[150px] flex-col rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.05] to-white/[0.015] p-5 backdrop-blur-md lg:min-h-[230px] lg:p-6"
                >
                  <Icon
                    className="size-5 text-zinc-300"
                    strokeWidth={1.5}
                    aria-hidden="true"
                  />
                  <p className="mt-auto text-3xl font-semibold tracking-tight text-white lg:text-5xl">
                    {stat.value}
                  </p>
                  <p className="mt-1 text-xs text-zinc-400 lg:mt-2 lg:text-sm">
                    {stat.label}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

