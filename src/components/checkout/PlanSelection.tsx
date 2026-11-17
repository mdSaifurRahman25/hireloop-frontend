"use client";

import { Check, Sparkles } from "lucide-react";
import { cn } from "cn";

export interface PlanOption {
  id: string;
  name: string;
  badge?: string;
  description: string;
  monthlyPrice: number;
  annualPrice: number;
  features: string[];
}

export const CHECKOUT_PLANS: PlanOption[] = [
  {
    id: "starter",
    name: "Starter Plan",
    description: "Great for individual job seekers or freelancers seeking visibility.",
    monthlyPrice: 19,
    annualPrice: 15,
    features: [
      "Highlighted profile in candidate search",
      "Unlimited job applications",
      "Email alerts for matching jobs",
      "Standard customer support",
    ],
  },
  {
    id: "pro",
    name: "Hireloop Pro",
    badge: "Most Popular",
    description: "Ideal for active seekers and small hiring teams needing AI speed.",
    monthlyPrice: 49,
    annualPrice: 39,
    features: [
      "AI resume match scoring on all jobs",
      "Verified candidate / recruiter badge",
      "Direct recruiter & applicant messaging",
      "Up to 3 active job postings",
      "Priority 24/7 dedicated support",
    ],
  },
  {
    id: "recruiter",
    name: "Enterprise Recruiter",
    description: "Maximum reach and high-volume recruitment for growing teams.",
    monthlyPrice: 99,
    annualPrice: 79,
    features: [
      "Unlimited active job postings",
      "Featured job placement on browse page",
      "Full applicant management & PDF exports",
      "Team collaboration & shared notes",
      "Dedicated account manager",
    ],
  },
];

interface PlanSelectionProps {
  selectedPlanId: string;
  billingCycle: "monthly" | "annual";
  onSelectPlan: (planId: string) => void;
  onToggleBilling: (cycle: "monthly" | "annual") => void;
}

export function PlanSelection({
  selectedPlanId,
  billingCycle,
  onSelectPlan,
  onToggleBilling,
}: PlanSelectionProps) {
  const currentPlan =
    CHECKOUT_PLANS.find((p) => p.id === selectedPlanId) || CHECKOUT_PLANS[1];

  return (
    <div className="space-y-5 rounded-2xl border border-white/[0.08] bg-[#121212] p-5 sm:p-6">
      {/* Header and Billing Switcher */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between border-b border-white/[0.06] pb-4">
        <div>
          <h2 className="text-base sm:text-lg font-semibold text-white">
            1. Select Your Plan
          </h2>
          <p className="text-xs text-zinc-400 mt-0.5">
            Choose the membership or hiring package that fits your goals.
          </p>
        </div>

        {/* Monthly vs Annual Toggle */}
        <div className="inline-flex self-start sm:self-auto items-center rounded-xl border border-white/10 bg-[#181818] p-1">
          <button
            type="button"
            onClick={() => onToggleBilling("monthly")}
            className={cn(
              "rounded-lg px-3 py-1.5 text-xs font-medium transition-all",
              billingCycle === "monthly"
                ? "bg-[#282828] text-white shadow-sm"
                : "text-zinc-400 hover:text-white",
            )}
          >
            Monthly
          </button>
          <button
            type="button"
            onClick={() => onToggleBilling("annual")}
            className={cn(
              "flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition-all",
              billingCycle === "annual"
                ? "bg-[#282828] text-white shadow-sm"
                : "text-zinc-400 hover:text-white",
            )}
          >
            <span>Annual</span>
            <span className="rounded-full bg-emerald-500/20 px-1.5 py-0.2 text-[10px] font-semibold text-emerald-400">
              Save 20%
            </span>
          </button>
        </div>
      </div>

      {/* Plan Cards Grid */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        {CHECKOUT_PLANS.map((plan) => {
          const isSelected = plan.id === selectedPlanId;
          const price =
            billingCycle === "annual" ? plan.annualPrice : plan.monthlyPrice;

          return (
            <button
              key={plan.id}
              type="button"
              onClick={() => onSelectPlan(plan.id)}
              className={cn(
                "relative flex flex-col justify-between rounded-xl border p-4 text-left transition-all",
                isSelected
                  ? "border-indigo-500/80 bg-indigo-500/[0.08] shadow-[0_0_20px_rgba(99,102,241,0.15)] ring-1 ring-indigo-500/50"
                  : "border-white/10 bg-white/[0.02] hover:border-white/20 hover:bg-white/[0.04]",
              )}
            >
              {plan.badge && (
                <div className="absolute -top-2.5 right-3 inline-flex items-center gap-1 rounded-full border border-indigo-500/40 bg-indigo-600 px-2.5 py-0.5 text-[10px] font-semibold text-white shadow-sm">
                  <Sparkles className="size-2.5" />
                  {plan.badge}
                </div>
              )}

              <div>
                <span className="text-xs font-medium text-zinc-400">
                  {plan.name}
                </span>
                <div className="mt-1 flex items-baseline gap-1">
                  <span className="text-xl sm:text-2xl font-bold text-white">
                    ${price}
                  </span>
                  <span className="text-[11px] text-zinc-400">/mo</span>
                </div>
                <p className="mt-1.5 text-[11px] leading-relaxed text-zinc-400 line-clamp-2">
                  {plan.description}
                </p>
              </div>

              <div className="mt-4 flex items-center gap-2 pt-2 border-t border-white/[0.06]">
                <div
                  className={cn(
                    "flex size-4 items-center justify-center rounded-full border text-[10px]",
                    isSelected
                      ? "border-indigo-500 bg-indigo-500 text-white"
                      : "border-zinc-600 bg-transparent",
                  )}
                >
                  {isSelected && <Check className="size-2.5 stroke-[3]" />}
                </div>
                <span className="text-xs font-medium text-zinc-300">
                  {isSelected ? "Selected" : "Choose plan"}
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Selected Plan Details & Features List */}
      <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
          What&apos;s included in {currentPlan.name}:
        </h3>
        <ul className="mt-3 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
          {currentPlan.features.map((feature, i) => (
            <li
              key={i}
              className="flex items-center gap-2.5 text-xs text-zinc-300"
            >
              <div className="flex size-4 shrink-0 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-400">
                <Check className="size-2.5 stroke-[3]" />
              </div>
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
