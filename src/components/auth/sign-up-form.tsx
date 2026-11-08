"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import PasswordInput from "@/components/auth/password-input";
import { authClient } from "@/lib/auth-client";

const SignUpForm = () => {
  const router = useRouter();

  // Password mismatch error (shown under the confirm password field)
  const [error, setError] = useState<string | null>(null);
  // Error from the server, e.g. "User already exists" (shown above the button)
  const [serverError, setServerError] = useState<string | null>(null);
  // Disables the button while the request is running
  const [isPending, setIsPending] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setServerError(null);

    const formData = new FormData(event.currentTarget);
    const name = String(formData.get("name") ?? "").trim();
    const email = String(formData.get("email") ?? "").trim();
    const password = String(formData.get("password") ?? "");
    const confirmPassword = String(formData.get("confirmPassword") ?? "");

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setIsPending(true);

    // better-auth returns { data, error } instead of throwing.
    // "error" is renamed so it does not clash with the state variable above.
    const { error: signUpError } = await authClient.signUp.email({
      name,
      email,
      password,
    });

    setIsPending(false);

    // Stop here if sign up failed, otherwise we would redirect anyway
    if (signUpError) {
      setServerError(
        signUpError.message ?? "Something went wrong. Please try again.",
      );
      return;
    }

    router.push("/");
    router.refresh(); // refresh server components so they see the new session
  };

  return (
    <form onSubmit={handleSubmit} className="mt-6 space-y-5">
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
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? "sign-up-error" : undefined}
        />
        {error ? (
          <p id="sign-up-error" role="alert" className="text-xs text-red-400">
            {error}
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

      {serverError ? (
        <p role="alert" className="text-sm text-red-400">
          {serverError}
        </p>
      ) : null}

      <Button
        type="submit"
        size="lg"
        disabled={isPending}
        className="h-11 w-full rounded-xl! bg-indigo-600! text-sm font-semibold text-white! hover:bg-indigo-500! disabled:opacity-60"
      >
        {isPending ? "Creating account..." : "Create account"}
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