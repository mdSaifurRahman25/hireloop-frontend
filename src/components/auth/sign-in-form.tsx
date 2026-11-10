"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import PasswordInput from "@/components/auth/password-input";
import SocialAuth from "@/components/auth/social-auth";
import { authClient } from "@/lib/auth-client";

const SignInForm = () => {
  const router = useRouter();

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

    setIsPending(true);

    const { error: signInError } = await authClient.signIn.email({
      email: values.email,
      password: values.password,
      rememberMe: values.rememberMe === "on",
    });

    setIsPending(false);

    if (signInError) {
      setError(signInError.message ?? "Invalid email or password.");
      return;
    }

    router.push("/");
    router.refresh();
  };

  return (
    <form onSubmit={handleSubmit} className="mt-6 space-y-5">
      <SocialAuth dividerLabel="or continue with email" />

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
