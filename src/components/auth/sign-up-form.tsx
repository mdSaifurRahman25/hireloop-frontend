"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import PasswordInput from "@/components/auth/password-input";
import RoleSelector, { type Role } from "@/components/auth/role-selector";
import SocialAuth from "@/components/auth/social-auth";

const SignUpForm = () => {
  const router = useRouter();

  const [role, setRole] = useState<Role>("seeker");
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isSubmitting) return;

    const formData = new FormData(event.currentTarget);
    const values = Object.fromEntries(
      [...formData.entries()].map(([key, value]) => [key, String(value)]),
    );

    if (values.password !== values.confirmPassword) {
      setPasswordError("Passwords do not match.");
      return;
    }

    setPasswordError(null);
    setSubmitError(null);
    setIsSubmitting(true);

    const { error } = await authClient.signUp.email({
      name: values.name,
      email: values.email,
      password: values.password,
      role,
    });

    setIsSubmitting(false);

    if (error) {
      setSubmitError(
        error.message ?? "Could not create your account. Please try again.",
      );
      return;
    }

    console.log("Sign up payload:", {
      name: values.name,
      email: values.email,
      role,
    });
    router.push("/sign-in");
    router.refresh(); // refresh server components so they see the new session
  };

  return (
    <form onSubmit={handleSubmit} className="mt-6 space-y-5">
      <RoleSelector
        value={role}
        onChange={setRole}
        legend="Joining HireLoop as"
      />

      <SocialAuth role={role} dividerLabel="or sign up with email" />

      <div className="space-y-2">
        <label
          htmlFor="sign-up-name"
          className="text-sm font-medium text-zinc-200"
        >
          Full name
        </label>
        <Input
          id="sign-up-name"
          name="name"
          type="text"
          autoComplete="name"
          placeholder="Jane Doe"
          required
        />
      </div>

      <div className="space-y-2">
        <label
          htmlFor="sign-up-email"
          className="text-sm font-medium text-zinc-200"
        >
          Email address
        </label>
        <Input
          id="sign-up-email"
          name="email"
          type="email"
          autoComplete="email"
          placeholder="you@example.com"
          required
        />
      </div>

      <div className="space-y-2">
        <label
          htmlFor="sign-up-password"
          className="text-sm font-medium text-zinc-200"
        >
          Password
        </label>
        <PasswordInput
          id="sign-up-password"
          name="password"
          autoComplete="new-password"
          placeholder="Create a password"
          required
          minLength={8}
        />
        <p className="text-xs text-zinc-500">At least 8 characters.</p>
      </div>

      <div className="space-y-2">
        <label
          htmlFor="sign-up-confirm-password"
          className="text-sm font-medium text-zinc-200"
        >
          Confirm password
        </label>
        <PasswordInput
          id="sign-up-confirm-password"
          name="confirmPassword"
          autoComplete="new-password"
          placeholder="Repeat your password"
          required
          minLength={8}
          aria-invalid={passwordError ? true : undefined}
          aria-describedby={passwordError ? "sign-up-password-error" : undefined}
        />
        {passwordError ? (
          <p
            id="sign-up-password-error"
            role="alert"
            className="text-xs text-red-400"
          >
            {passwordError}
          </p>
        ) : null}
      </div>

      <label className="flex items-start gap-2.5 text-sm leading-5 text-zinc-400">
        <input
          type="checkbox"
          name="acceptTerms"
          required
          className="mt-0.5 size-4 shrink-0 rounded border-white/20 bg-white/5 accent-indigo-600 scheme-dark"
        />
        <span>
          I agree to the{" "}
          <Link
            href="/terms"
            className="font-medium text-indigo-400 transition-colors hover:text-indigo-300"
          >
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link
            href="/privacy"
            className="font-medium text-indigo-400 transition-colors hover:text-indigo-300"
          >
            Privacy Policy
          </Link>
          .
        </span>
      </label>

      {submitError ? (
        <p
          role="alert"
          className="rounded-xl border border-red-500/20 bg-red-500/10 px-3 py-2.5 text-xs leading-5 text-red-300"
        >
          {submitError}
        </p>
      ) : null}

      <Button
        type="submit"
        size="lg"
        disabled={isSubmitting}
        className="h-11 w-full rounded-xl! bg-indigo-600! text-sm font-semibold text-white! hover:bg-indigo-500! disabled:opacity-60"
      >
        {isSubmitting ? "Creating account..." : "Create account"}
      </Button>

      <p className="text-center text-sm text-zinc-500">
        Already have an account?{" "}
        <Link
          href="/sign-in"
          className="font-medium text-indigo-400 transition-colors hover:text-indigo-300"
        >
          Sign in
        </Link>
      </p>
    </form>
  );
};

export default SignUpForm;
