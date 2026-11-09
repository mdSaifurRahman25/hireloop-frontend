"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LogOut, Menu, X } from "lucide-react";

import logo from "@/images/logo.png";
import { Button, buttonVariants } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import UserMenu from "@/components/shared/user-menu";
import { useSignOut } from "@/hooks/use-sign-out";
import { authClient } from "@/lib/auth-client";

const getInitials = (name: string) =>
  name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("") || "U";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const { signOut, isSigningOut } = useSignOut();

  const { data: session, isPending } = authClient.useSession();

  const user = session?.user;
  //   console.log(user, "from navbar user.");

  const navLinks = [
    { label: "Browse Jobs", href: "/jobs" },
    { label: "Company", href: "/company" },
    { label: "Pricing", href: "/pricing" },
    ...(user
      ? [{ label: "Dashboard", href: `/dashboard/${user.role ?? "seeker"}` }]
      : []),
  ];

  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open]);

  return (
    <header className="sticky top-0 z-50 bg-[#0a0a0a]/80 px-4 pt-4 backdrop-blur-md sm:px-6 lg:px-8">
      <nav
        aria-label="Main"
        className="mx-auto flex h-20 w-full max-w-[1720px] items-center justify-between gap-6 rounded-[28px] bg-[#1b1b1b] px-5 shadow-[0_10px_40px_-12px_rgba(0,0,0,0.6)] sm:px-7 lg:h-24 lg:px-10"
      >
        <Link href="/" className="flex shrink-0 items-center">
          <Image
            src={logo}
            alt="hireloop"
            priority
            className="h-10 w-auto lg:h-11"
          />
        </Link>

        <div className="hidden flex-1 items-center justify-center gap-9 lg:flex">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;

            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={isActive ? "page" : undefined}
                className={`text-[15px] font-medium transition-colors hover:text-white ${
                  isActive ? "text-white" : "text-zinc-200"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </div>

        <div className="hidden items-center gap-6 lg:flex">
          {isPending ? (
            <div className="size-10 animate-pulse rounded-full bg-white/10" />
          ) : user ? (
            <UserMenu name={user.name} email={user.email} image={user.image} />
          ) : (
            <>
              <span aria-hidden="true" className="h-7 w-px bg-white/15" />
              <Link
                href="/sign-in"
                className="text-[15px] font-medium text-indigo-400 transition-colors hover:text-indigo-300"
              >
                Sign In
              </Link>
              <Link
                href="/sign-up"
                className={buttonVariants({
                  size: "lg",
                  className:
                    "h-12 rounded-2xl! bg-indigo-600! px-7 text-[15px] font-semibold text-white! hover:bg-indigo-500!",
                })}
              >
                Get Started
              </Link>
            </>
          )}
        </div>

        <Button
          type="button"
          variant="ghost"
          size="icon-lg"
          className="text-zinc-200 hover:bg-white/10 hover:text-white lg:hidden [&_svg]:size-5"
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((isOpen) => !isOpen)}
        >
          {open ? <X /> : <Menu />}
        </Button>
      </nav>

      {open && (
        <nav
          id="mobile-nav"
          aria-label="Mobile"
          className="mx-auto mt-2 w-full max-w-[1720px] animate-in fade-in slide-in-from-top-2 rounded-[28px] bg-[#1b1b1b] p-4 shadow-[0_10px_40px_-12px_rgba(0,0,0,0.6)] duration-200 lg:hidden"
        >
          <div className="flex flex-col">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  aria-current={isActive ? "page" : undefined}
                  className={`rounded-xl px-4 py-3 text-[15px] font-medium transition-colors hover:bg-white/5 hover:text-white ${
                    isActive ? "bg-white/5 text-white" : "text-zinc-200"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>

          <div className="mt-3 flex flex-col gap-2 border-t border-white/10 pt-3">
            {isPending ? (
              <div className="flex items-center gap-3 px-3 py-2.5">
                <div className="size-9 animate-pulse rounded-full bg-white/10" />
                <div className="flex-1 space-y-2">
                  <div className="h-3 w-24 animate-pulse rounded bg-white/10" />
                  <div className="h-3 w-36 animate-pulse rounded bg-white/5" />
                </div>
              </div>
            ) : user ? (
              <>
                <div className="flex items-center gap-3 rounded-xl bg-white/5 px-3 py-2.5">
                  <Avatar className="size-9 border border-white/10">
                    {user.image ? (
                      <AvatarImage src={user.image} alt="" />
                    ) : null}
                    <AvatarFallback className="bg-indigo-500/15 text-xs font-semibold text-indigo-200">
                      {getInitials(user.name)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-white">
                      {user.name}
                    </p>
                    <p className="truncate text-xs text-zinc-400">
                      {user.email}
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  disabled={isSigningOut}
                  onClick={async () => {
                    setOpen(false);
                    await signOut();
                  }}
                  className="flex items-center gap-2.5 rounded-xl px-4 py-3 text-left text-[15px] font-medium text-red-400 transition-colors hover:bg-red-500/10 hover:text-red-300 disabled:opacity-60"
                >
                  <LogOut className="size-4" />
                  {isSigningOut ? "Logging out..." : "Log out"}
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/sign-in"
                  onClick={() => setOpen(false)}
                  className="rounded-xl px-4 py-3 text-[15px] font-medium text-indigo-400 transition-colors hover:bg-white/5 hover:text-indigo-300"
                >
                  Sign In
                </Link>
                <Link
                  href="/sign-up"
                  onClick={() => setOpen(false)}
                  className={buttonVariants({
                    size: "lg",
                    className:
                      "h-12 w-full rounded-2xl! bg-indigo-600! text-[15px] font-semibold text-white! hover:bg-indigo-500!",
                  })}
                >
                  Get Started
                </Link>
              </>
            )}
          </div>
        </nav>
      )}
    </header>
  );
};

export default Navbar;
