"use client";

import { Suspense, useState, useMemo } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { ArrowLeft, ShieldCheck, Sparkles } from "lucide-react";
import { toast } from "@/components/ui/toast";
import { useSession } from "@/lib/auth-client";
import {
  CHECKOUT_PLANS,
  CheckoutSkeleton,
  CustomerInfoCard,
  OrderSummary,
  PaymentMethodCard,
  PlanSelection,
} from "@/components/checkout";

function CheckoutContent() {
  const searchParams = useSearchParams();
  const initialPlanParam = searchParams.get("plan")?.toLowerCase();
  const initialBillingParam = searchParams.get("billing")?.toLowerCase();

  const [selectedPlanId, setSelectedPlanId] = useState<string>(() => {
    if (
      initialPlanParam &&
      CHECKOUT_PLANS.some((p) => p.id === initialPlanParam)
    ) {
      return initialPlanParam;
    }
    return "pro";
  });

  const [billingCycle, setBillingCycle] = useState<"monthly" | "annual">(() => {
    if (initialBillingParam === "annual") return "annual";
    return "monthly";
  });

  const [guestName, setGuestName] = useState("");
  const [guestEmail, setGuestEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { data: session } = useSession();
  const user = session?.user;

  const currentPlan = useMemo(() => {
    return (
      CHECKOUT_PLANS.find((p) => p.id === selectedPlanId) || CHECKOUT_PLANS[1]
    );
  }, [selectedPlanId]);

 const handleProceedToPayment = async () => {
  const customerEmail = user?.email || guestEmail.trim();
  const customerName = user?.name || guestName.trim();

  if (!customerEmail) {
    toast.add({
      title: "Email Required",
      description:
        "Please enter your email address to receive your receipt and access.",
    });
    return;
  }

  if (!user && !customerName) {
    toast.add({
      title: "Name Required",
      description: "Please enter your full name.",
    });
    return;
  }

  setIsSubmitting(true);

  try {
  
    const paymentData = {
      planId: currentPlan.id,
      planName: currentPlan.name,
      billingCycle,

      customer: {
        name: customerName,
        email: customerEmail,
      },

      metadata: {
        source: "hireloop_web",
        userId: user?.id || null,
      },
    };
    console.log(paymentData);

    const response = await fetch("/api/checkout_sessions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(paymentData),
    });

    const result = await response.json();

    console.log(result);

    if (!response.ok) {
      throw new Error(
        result.error || result.message || "Unable to initialize checkout."
      );
    }

    if (!result.checkoutUrl) {
      throw new Error("Stripe checkout URL not found.");
    }


    window.location.href = result.checkoutUrl;

  } catch (error) {
    console.error("Stripe checkout error:", error);

    toast.add({
      title: "Payment Initialization Failed",
      description:
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again.",
    });
  } finally {
    setIsSubmitting(false);
  }
};

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Top Banner / Breadcrumb */}
      <div className="border-b border-white/[0.06] bg-[#0d0d0d]">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <Link
            href="/browse-jobs"
            className="inline-flex items-center gap-2 text-xs font-medium text-zinc-400 transition-colors hover:text-white"
          >
            <ArrowLeft className="size-3.5" />
            <span>Back to Browse Jobs</span>
          </Link>

          <div className="flex items-center gap-2 text-xs text-zinc-400">
            <ShieldCheck className="size-4 text-emerald-400" />
            <span className="hidden sm:inline">256-bit SSL Secure Checkout</span>
          </div>
        </div>
      </div>

      {/* Main Checkout Grid */}
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
        <div className="mb-8">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-3 py-1 text-xs font-medium text-indigo-400 mb-3">
            <Sparkles className="size-3.5" />
            <span>Hireloop Membership & Postings</span>
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white">
            Checkout & Subscription
          </h1>
          <p className="mt-1.5 text-xs sm:text-sm text-zinc-400 max-w-2xl">
            Upgrade your recruitment workflow or accelerate your job search with
            Hireloop Pro features.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          {/* Left Column: Plan, Account & Payment Method Details (7 Columns) */}
          <div className="space-y-6 lg:col-span-7">
            <PlanSelection
              selectedPlanId={selectedPlanId}
              billingCycle={billingCycle}
              onSelectPlan={setSelectedPlanId}
              onToggleBilling={setBillingCycle}
            />

            <CustomerInfoCard
              user={user}
              guestName={guestName}
              guestEmail={guestEmail}
              onNameChange={setGuestName}
              onEmailChange={setGuestEmail}
            />

            <PaymentMethodCard />
          </div>

          {/* Right Column: Order Summary & Pay Button (5 Columns) */}
          <div className="lg:col-span-5">
            <OrderSummary
              plan={currentPlan}
              billingCycle={billingCycle}
              isSubmitting={isSubmitting}
              onProceedToPayment={handleProceedToPayment}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

interface CheckoutPageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function CheckoutPage({
  searchParams,
}: CheckoutPageProps) {
   const { canceled } = await searchParams

  if (canceled) {
    console.log(
      'Order canceled -- continue to shop around and check out when you\'re ready.'
    )
  }

  return (
    <Suspense fallback={<CheckoutSkeleton />}>
      <CheckoutContent />
    </Suspense>
  );
}
