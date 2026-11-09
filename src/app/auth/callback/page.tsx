"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

import { authClient } from "@/lib/auth-client";
import { roles, type Role } from "@/components/auth/role-selector";
import { PENDING_ROLE_COOKIE } from "@/components/auth/social-auth";

const readCookie = (name: string) => {
  const prefix = `${name}=`;
  const match = document.cookie
    .split("; ")
    .find((cookie) => cookie.startsWith(prefix));

  return match ? decodeURIComponent(match.slice(prefix.length)) : null;
};

const clearCookie = (name: string) => {
  document.cookie = `${name}=; path=/; max-age=0; samesite=lax`;
};

const isRole = (value: string | null): value is Role =>
  roles.some((option) => option.value === value);

/**
 * Landing page for a brand-new Google account. The role picked on the auth
 * page is kept in a short-lived cookie, because better-auth's OAuth flow cannot
 * carry additional fields. Existing accounts skip this page.
 */
const AuthCallbackPage = () => {
  const router = useRouter();
  const hasRun = useRef(false);

  useEffect(() => {
    if (hasRun.current) return;
    hasRun.current = true;

    const applyRole = async () => {
      const pendingRole = readCookie(PENDING_ROLE_COOKIE);

      // A failed update should not block the visitor, they are already signed in.
      if (isRole(pendingRole)) {
        await authClient.updateUser({ role: pendingRole });
      }

      clearCookie(PENDING_ROLE_COOKIE);
      router.replace("/");
      router.refresh(); // pick up the new session in server components
    };

    void applyRole();
  }, [router]);

  return (
    <section className="flex flex-1 items-center justify-center bg-[#0a0a0a] px-4 py-24">
      <div className="flex flex-col items-center gap-3 text-center">
        <Loader2
          className="size-6 animate-spin text-indigo-400"
          aria-hidden="true"
        />
        <p className="text-sm text-zinc-400" role="status">
          Setting up your account...
        </p>
      </div>
    </section>
  );
};

export default AuthCallbackPage;
