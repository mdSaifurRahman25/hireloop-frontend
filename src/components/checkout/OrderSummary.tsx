"use client";

import { useState } from "react";
import { ArrowRight, CheckCircle2, Lock, ShieldCheck, Tag } from "lucide-react";
import type { PlanOption } from "./PlanSelection";

interface OrderSummaryProps {
  plan: PlanOption;
  billingCycle: "monthly" | "annual";
  isSubmitting: boolean;
  onProceedToPayment: () => void;
}

export function OrderSummary({
  plan,
  billingCycle,
  isSubmitting,
  onProceedToPayment,
}: OrderSummaryProps) {
  const [promoCode, setPromoCode] = useState("");
  const [discountPercent, setDiscountPercent] = useState<number>(0);
  const [promoMessage, setPromoMessage] = useState<string | null>(null);

  const basePrice =
    billingCycle === "annual" ? plan.annualPrice * 12 : plan.monthlyPrice;
  const discountAmount = Math.round(basePrice * (discountPercent / 100));
  const finalPrice = Math.max(0, basePrice - discountAmount);

  const handleApplyPromo = () => {
    const cleaned = promoCode.trim().toUpperCase();
    if (!cleaned) return;

    if (cleaned === "HIRE10" || cleaned === "WELCOME10") {
      setDiscountPercent(10);
      setPromoMessage("Coupon applied! 10% discount added.");
    } else if (cleaned === "HIRE20") {
      setDiscountPercent(20);
      setPromoMessage("Coupon applied! 20% discount added.");
    } else {
      setDiscountPercent(0);
      setPromoMessage("Invalid promo code. Try 'HIRE10'.");
    }
  };

  return (
    <div className="sticky top-28 space-y-5 rounded-2xl border border-white/[0.08] bg-[#121212] p-5 sm:p-6 shadow-xl">
      <div className="border-b border-white/[0.06] pb-4">
        <h2 className="text-base sm:text-lg font-semibold text-white">
          Order Summary
        </h2>
        <p className="text-xs text-zinc-400 mt-0.5">
          Review your subscription details before paying.
        </p>
      </div>

      {/* Plan Row */}
      <div className="flex items-start justify-between gap-3 text-xs">
        <div>
          <p className="font-semibold text-white">{plan.name}</p>
          <p className="text-zinc-400 mt-0.5 capitalize">
            Billed {billingCycle}
            {billingCycle === "annual" && " ($" + plan.annualPrice + "/mo)"}
          </p>
        </div>
        <span className="font-semibold text-white">${basePrice}.00</span>
      </div>

      {/* Promo Code Input */}
      <div className="space-y-1.5 pt-2 border-t border-white/[0.06]">
        <label className="block text-[11px] font-medium text-zinc-400">
          Have a promotional code?
        </label>
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Tag className="absolute left-3 top-1/2 size-3.5 -translate-y-1/2 text-zinc-500" />
            <input
              type="text"
              value={promoCode}
              onChange={(e) => setPromoCode(e.target.value)}
              placeholder="e.g. HIRE10"
              className="w-full rounded-xl border border-white/10 bg-[#181818] py-2 pl-9 pr-3 text-xs text-white placeholder:text-zinc-500 uppercase outline-none transition-colors focus:border-indigo-500"
            />
          </div>
          <button
            type="button"
            onClick={handleApplyPromo}
            className="rounded-xl border border-white/10 bg-white/[0.05] px-3.5 py-2 text-xs font-semibold text-zinc-300 transition-colors hover:bg-white/10 hover:text-white"
          >
            Apply
          </button>
        </div>
        {promoMessage && (
          <p
            className={`text-[11px] ${
              discountPercent > 0 ? "text-emerald-400" : "text-amber-400"
            }`}
          >
            {promoMessage}
          </p>
        )}
      </div>

      {/* Financial Calculations */}
      <div className="space-y-2 pt-3 border-t border-white/[0.06] text-xs">
        <div className="flex justify-between text-zinc-400">
          <span>Subtotal</span>
          <span className="text-zinc-300">${basePrice}.00</span>
        </div>

        {discountAmount > 0 && (
          <div className="flex justify-between text-emerald-400">
            <span>Discount ({discountPercent}%)</span>
            <span>-${discountAmount}.00</span>
          </div>
        )}

        <div className="flex justify-between text-zinc-400">
          <span>Taxes / VAT</span>
          <span className="text-zinc-300">$0.00</span>
        </div>

        <div className="flex items-baseline justify-between pt-2 border-t border-white/[0.08]">
          <div>
            <span className="text-sm font-semibold text-white">
              Total Due Today
            </span>
            <p className="text-[10px] text-zinc-500">
              Auto-renews until cancelled
            </p>
          </div>
          <span className="text-xl sm:text-2xl font-bold text-white">
            ${finalPrice}.00
          </span>
        </div>
      </div>

      {/* Pay with Stripe Button */}
      <button
        type="button"
        disabled={isSubmitting}
        onClick={onProceedToPayment}
        className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 text-xs sm:text-sm font-semibold text-black transition-all hover:bg-zinc-200 active:scale-[0.99] disabled:opacity-50 shadow-[0_0_25px_rgba(255,255,255,0.15)] cursor-pointer"
      >
        {isSubmitting ? (
          <>
            <span className="size-4 animate-spin rounded-full border-2 border-black border-t-transparent" />
            <span>Redirecting to Stripe...</span>
          </>
        ) : (
          <>
            <Lock className="size-4" />
            <span>Pay ${finalPrice}.00 with Stripe</span>
            <ArrowRight className="size-4 ml-0.5" />
          </>
        )}
      </button>

      {/* Security & Reassurance Highlights */}
      <div className="space-y-2 pt-2 text-[11px] text-zinc-400">
        <div className="flex items-center gap-2">
          <CheckCircle2 className="size-3.5 text-emerald-400 shrink-0" />
          <span>Instant activation upon payment completion</span>
        </div>
        <div className="flex items-center gap-2">
          <ShieldCheck className="size-3.5 text-emerald-400 shrink-0" />
          <span>14-day 100% money-back guarantee</span>
        </div>
        <div className="flex items-center gap-2">
          <Lock className="size-3.5 text-zinc-500 shrink-0" />
          <span>Cancel anytime in 1-click from dashboard</span>
        </div>
      </div>

      <p className="text-center text-[10px] text-zinc-500 pt-1 leading-relaxed">
        By proceeding, you agree to Hireloop&apos;s Terms of Service and
        Privacy Policy.
      </p>
    </div>
  );
}
