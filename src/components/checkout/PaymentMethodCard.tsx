"use client";

import { CreditCard, ShieldCheck } from "lucide-react";

export function PaymentMethodCard() {
  return (
    <div className="space-y-4 rounded-2xl border border-white/[0.08] bg-[#121212] p-5 sm:p-6">
      <div className="flex items-center justify-between border-b border-white/[0.06] pb-3.5">
        <div>
          <h2 className="text-base sm:text-lg font-semibold text-white">
            3. Payment Method
          </h2>
          <p className="text-xs text-zinc-400 mt-0.5">
            Processed securely with end-to-end encryption.
          </p>
        </div>
        <span className="rounded-full border border-indigo-500/30 bg-indigo-500/10 px-2.5 py-0.5 text-[10px] font-semibold text-indigo-300">
          Stripe Checkout
        </span>
      </div>

      {/* Selected Payment Option Container */}
      <div className="rounded-xl border border-indigo-500/50 bg-indigo-500/[0.04] p-4">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-[#635BFF]/20 text-[#635BFF] border border-[#635BFF]/30">
              <CreditCard className="size-5" />
            </div>
            <div>
              <p className="text-sm font-semibold text-white">
                Credit Card / Debit / Wallets
              </p>
              <p className="text-xs text-zinc-400 mt-0.5">
                Visa, Mastercard, American Express, Apple Pay & Google Pay
              </p>
            </div>
          </div>
          <span className="flex size-4 items-center justify-center rounded-full border border-indigo-500 bg-indigo-500 text-white text-[10px]">
            ✓
          </span>
        </div>

        {/* Accepted Brand Badges */}
        <div className="mt-4 flex flex-wrap items-center gap-2 pt-3 border-t border-white/[0.06] text-[11px] text-zinc-400">
          <span className="rounded-md border border-white/10 bg-white/[0.04] px-2 py-0.5 font-semibold text-white">
            VISA
          </span>
          <span className="rounded-md border border-white/10 bg-white/[0.04] px-2 py-0.5 font-semibold text-white">
            Mastercard
          </span>
          <span className="rounded-md border border-white/10 bg-white/[0.04] px-2 py-0.5 font-semibold text-white">
            AMEX
          </span>
          <span className="rounded-md border border-white/10 bg-white/[0.04] px-2 py-0.5 font-semibold text-white">
            Apple Pay
          </span>
          <span className="rounded-md border border-white/10 bg-white/[0.04] px-2 py-0.5 font-semibold text-white">
            Google Pay
          </span>
        </div>
      </div>

      {/* Security Assurance Notice */}
      <div className="flex items-start gap-3 rounded-xl border border-emerald-500/20 bg-emerald-500/[0.04] p-3 text-xs text-zinc-300">
        <ShieldCheck className="size-4 shrink-0 text-emerald-400 mt-0.5" />
        <div className="space-y-0.5">
          <p className="font-semibold text-emerald-400">
            Bank-Grade Security Guaranteed
          </p>
          <p className="text-zinc-400 text-[11px] leading-relaxed">
            Your card details are never stored on our servers. All transactions
            are encrypted via Stripe with 256-bit SSL and PCI-DSS Level 1 compliance.
          </p>
        </div>
      </div>
    </div>
  );
}
