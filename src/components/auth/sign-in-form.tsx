"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import PasswordInput from "@/components/auth/password-input";
import RoleSelector, {
  roleLabel,
  type Role,
} from "@/components/auth/role-selector";
import SocialAuth from "@/components/auth/social-auth";
import { authClient } from "@/lib/auth-client";

const SignInForm = () => {
  const router = useRouter();

  // Which kind of account the visitor is signing in to
  const [role, setRole] = useState<Role>("seeker");
  // Error message from the server, e.g. "Invalid email or password"
  const [error, setError] = useState<string | null>(null);
  // Disables the button while the request is running
  const [isPending, setIsPending] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);

    const formData = new FormData(event.currentTarget);
    const values = Object.fromEntries(
      [...formData.entries()].map(([key, value]) => [key, String(value)]),
    );
    // console.log("Sign in form data:", values);

    setIsPending(true);

    // "error" is renamed so it does not clash with the state variable above
    const { data, error: signInError } = await authClient.signIn.email({
      email: values.email,
      password: values.password,
      // An unchecked checkbox is missing from FormData, a checked one is "on"
      rememberMe: values.rememberMe === "on",
    });
    // console.log(data, 'from sign in page');

    setIsPending(false);

    // Stop here if sign in failed, otherwise we would redirect anyway
    if (signInError) {
      setError(signInError.message ?? "Invalid email or password.");
      return;
    }

    // better-auth signs in by email + password only and ignores extra fields,
    // so the role saved on the account is the source of truth. Compare it with
    // the picker to catch a wrong selection instead of landing in the wrong app.
    const accountRole = data?.user?.role as Role | undefined;

    if (accountRole && accountRole !== role) {
      await authClient.signOut();
      setError(
        `This email is registered as a ${roleLabel(accountRole)}. Pick ${roleLabel(accountRole)} above to continue.`,
      );
      return;
    }

    router.push("/");
    router.refresh(); // refresh server components so they see the new session
  };

  return (
    <form onSubmit={handleSubmit} className="mt-6 space-y-5">
      <RoleSelector
        value={role}
        onChange={setRole}
        legend="Signing in as"
      />

      <SocialAuth role={role} dividerLabel="or continue with email" />

      <div className="space-y-2">
        <label
          htmlFor="sign-in-email"
          className="text-sm font-medium text-zinc-200"
        >
          Email address
        </label>
        <Input
          id="sign-in-email"
          name="email"
          type="email"
          autoComplete="email"
          placeholder="you@example.com"
          required
        />
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between gap-4">
          <label
            htmlFor="sign-in-password"
            className="text-sm font-medium text-zinc-200"
          >
            Password
          </label>
          <Link
            href="/forgot-password"
            className="text-xs font-medium text-indigo-400 transition-colors hover:text-indigo-300"
          >
            Forgot password?
          </Link>
        </div>
        <PasswordInput
          id="sign-in-password"
          name="password"
          autoComplete="current-password"
          placeholder="Enter your password"
          required
          minLength={8}
        />
      </div>

      <label className="flex items-center gap-2.5 text-sm text-zinc-400">
        <input
          type="checkbox"
          name="rememberMe"
          className="size-4 rounded border-white/20 bg-white/5 accent-indigo-600 scheme-dark"
        />
        Remember me for 30 days
      </label>

      {error ? (
        <p role="alert" className="text-sm text-red-400">
          {error}
        </p>
      ) : null}

      <Button
        type="submit"
        size="lg"
        disabled={isPending}
        className="h-11 w-full rounded-xl! bg-indigo-600! text-sm font-semibold text-white! hover:bg-indigo-500! disabled:opacity-60"
      >
        {isPending ? "Signing in..." : "Sign in"}
      </Button>

      <p className="text-center text-sm text-zinc-500">
        New to hireloop?{" "}
        <Link
          href="/sign-up"
          className="font-medium text-indigo-400 transition-colors hover:text-indigo-300"
        >
          Create an account
        </Link>
      </p>
    </form>
  );
};

export default SignInForm;