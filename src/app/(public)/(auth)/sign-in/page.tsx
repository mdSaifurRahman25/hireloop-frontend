import type { Metadata } from "next";

import AuthShell from "@/components/auth/auth-shell";
import SignInForm from "@/components/auth/sign-in-form";

export const metadata: Metadata = {
  title: "Sign in — hireloop",
  description: "Sign in to your hireloop account to find and apply for jobs.",
};

const SignInPage = () => {
  return (
    <AuthShell>
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-white">
          Welcome back
        </h1>
        <p className="mt-1.5 text-sm text-zinc-400">
          Sign in to continue to your hireloop account.
        </p>
      </div>

      <SignInForm />
    </AuthShell>
  );
};

export default SignInPage;
