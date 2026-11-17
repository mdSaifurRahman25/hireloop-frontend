import { stripe } from "@/lib/stripe";
import { redirect } from "next/navigation";

interface CheckoutSuccessPageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function CheckoutSuccessPage({
  searchParams,
}: CheckoutSuccessPageProps) {
  const resolvedParams = await searchParams;
  const sessionId =
    typeof resolvedParams.session_id === "string"
      ? resolvedParams.session_id
      : Array.isArray(resolvedParams.session_id)
      ? resolvedParams.session_id[0]
      : undefined;

  if (!sessionId) {
    throw new Error("Please provide a valid session_id (`cs_test_...`)");
  }

  const session = await stripe.checkout.sessions.retrieve(sessionId, {
    expand: ["line_items", "payment_intent"],
  });

  const { status, payment_status, metadata, payment_intent } = session;
  const customerEmail =
    session.customer_details?.email || session.customer_email;

  // Since payment_intent is expanded, it can be an object (Stripe.PaymentIntent) or string ID
  const paymentIntentId =
    typeof payment_intent === "string"
      ? payment_intent
      : payment_intent?.id;

  if (status === "open") {
    return redirect("/");
  }

  if (status === "complete") {
    return (
      <section id="success">
        <p>
          We appreciate your business! A confirmation email will be sent to{" "}
          {customerEmail}. If you have any questions, please email{" "}
          <a href="mailto:orders@example.com">orders@example.com</a>.
        </p>
        <div style={{ marginTop: "1rem", fontSize: "0.875rem", color: "#666" }}>
          <p>Payment Status: {payment_status}</p>
          {paymentIntentId && <p>Payment Intent ID: {paymentIntentId}</p>}
          {metadata?.userId && <p>User ID: {metadata.userId}</p>}
        </div>
      </section>
    );
  }

  return redirect("/");
}
