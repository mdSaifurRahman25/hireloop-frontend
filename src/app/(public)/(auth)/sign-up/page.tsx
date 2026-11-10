import type { Metadata } from "next";

import AuthShell from "@/components/auth/auth-shell";
import SignUpForm from "@/components/auth/sign-up-form";

export const metadata: Metadata = {
  title: "Sign up — hireloop",
  description:
    "Create your hireloop account and start applying to curated roles.",
};

const SignUpPage = () => {
  return (
    <AuthShell>
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-white">
          Create your account
        </h1>
        <p className="mt-1.5 text-sm text-zinc-400">
          Start applying to curated roles in a few minutes.
        </p>
      </div>

      <SignUpForm />
    </AuthShell>
  );
};

export default SignUpPage;
