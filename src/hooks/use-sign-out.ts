"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { authClient } from "@/lib/auth-client";

export const useSignOut = () => {
  const router = useRouter();
  const [isSigningOut, setIsSigningOut] = useState(false);

  const signOut = async () => {
    if (isSigningOut) return;

    setIsSigningOut(true);
    await authClient.signOut();
    router.push("/");
    router.refresh(); // drop the cached session from server components
    setIsSigningOut(false);
  };

  return { signOut, isSigningOut };
};
