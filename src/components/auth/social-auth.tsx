"use client";

import { useState, type ComponentProps } from "react";
import { Loader2 } from "lucide-react";

import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import type { Role } from "@/components/auth/role-selector";

export const PENDING_ROLE_COOKIE = "hireloop_pending_role";

const GoogleIcon = (props: ComponentProps<"svg">) => (
  <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
    <path
      fill="#4285F4"
      d="M23.49 12.27c0-.79-.07-1.54-.19-2.27H12v4.51h6.47a5.54 5.54 0 0 1-2.4 3.58v3h3.86c2.26-2.09 3.56-5.17 3.56-8.82Z"
    />
    <path
      fill="#34A853"
      d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.86-3c-1.08.72-2.45 1.16-4.07 1.16-3.13 0-5.78-2.11-6.73-4.96H1.29v3.09A11.99 11.99 0 0 0 12 24Z"
    />
    <path
      fill="#FBBC05"
      d="M5.27 14.29a7.2 7.2 0 0 1 0-4.58V6.62H1.29a11.99 11.99 0 0 0 0 10.76l3.98-3.09Z"
    />
    <path
      fill="#EA4335"
      d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.31 0 3.26 2.69 1.29 6.62l3.98 3.09C6.22 6.86 8.87 4.75 12 4.75Z"
    />
  </svg>
);

type SocialAuthProps = {
  /** Role picked on the page; applied to accounts created by this OAuth flow. */
  role?: Role;
  dividerLabel: string;
};

const SocialAuth = ({ role, dividerLabel }: SocialAuthProps) => {
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGoogle = async () => {
    if (isPending) return;

    setIsPending(true);
    setError(null);

    // Remember the picked role across the Google redirect. It is only applied
    // when the OAuth flow creates a new account (see /auth/callback).
    if (role) {
      document.cookie = `${PENDING_ROLE_COOKIE}=${role}; path=/; max-age=600; samesite=lax`;
    }

    const { error: socialError } = await authClient.signIn.social({
      provider: "google",
      callbackURL: "/",
      newUserCallbackURL: "/auth/callback",
    });

    // On success the browser is sent to Google, so only failures reach here.
    if (socialError) {
      setError(
        socialError.message ?? "Could not start Google sign in. Please try again.",
      );
      setIsPending(false);
    }
  };

  return (
    <div>
      <Button
        type="button"
        onClick={handleGoogle}
        disabled={isPending}
        className="h-11 w-full gap-2.5 rounded-xl! border-white/15! bg-white/[0.04]! text-sm font-medium text-white! hover:bg-white/[0.08]! disabled:opacity-60"
      >
        {isPending ? (
          <Loader2 className="size-4 animate-spin" aria-hidden="true" />
        ) : (
          <GoogleIcon className="size-4.5" />
        )}
        {isPending ? "Redirecting to Google..." : "Continue with Google"}
      </Button>

      {error ? (
        <p role="alert" className="mt-2 text-xs text-red-400">
          {error}
        </p>
      ) : null}

      <div className="my-5 flex items-center gap-3" aria-hidden="true">
        <span className="h-px flex-1 bg-white/10" />
        <span className="text-xs font-medium tracking-wide text-zinc-500">
          {dividerLabel}
        </span>
        <span className="h-px flex-1 bg-white/10" />
      </div>
    </div>
  );
};

export default SocialAuth;
