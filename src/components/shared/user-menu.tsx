"use client";

import Link from "next/link";
import {
  Bell,
  ChevronDown,
  CreditCard,
  LogOut,
  UserRound,
} from "lucide-react";

import { useSignOut } from "@/hooks/use-sign-out";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type UserMenuProps = {
  name: string;
  email: string;
  image?: string | null;
};

const getInitials = (name: string) =>
  name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("") || "U";

const UserMenu = ({ name, email, image }: UserMenuProps) => {
  const { signOut, isSigningOut } = useSignOut();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        type="button"
        aria-label="Open account menu"
        className="group flex cursor-pointer items-center gap-2 rounded-full p-1 text-left outline-none transition-colors hover:bg-white/5 focus-visible:ring-2 focus-visible:ring-indigo-400/60 data-popup-open:bg-white/5"
      >
        <Avatar className="size-10 border border-white/10">
          {image ? <AvatarImage src={image} alt="" /> : null}
          <AvatarFallback className="bg-indigo-500/15 text-xs font-semibold text-indigo-200">
            {getInitials(name)}
          </AvatarFallback>
        </Avatar>
        <span className="hidden max-w-36 truncate text-sm font-medium text-zinc-200 xl:block">
          {name}
        </span>
        <ChevronDown className="hidden size-4 text-zinc-500 transition-transform group-data-popup-open:rotate-180 xl:block" />
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        sideOffset={12}
        className="w-72! rounded-2xl! border border-white/10 bg-[#1b1b1b]! p-1.5! text-zinc-200 shadow-[0_20px_60px_-20px_rgba(0,0,0,0.9)] ring-0!"
      >
        <div className="flex items-center gap-3 px-2 py-2">
          <Avatar className="size-10 border border-white/10">
            {image ? <AvatarImage src={image} alt="" /> : null}
            <AvatarFallback className="bg-indigo-500/15 text-xs font-semibold text-indigo-200">
              {getInitials(name)}
            </AvatarFallback>
          </Avatar>
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-white">{name}</p>
            <p className="truncate text-xs text-zinc-400">{email}</p>
          </div>
        </div>

        <DropdownMenuSeparator className="bg-white/10!" />

        <DropdownMenuItem
          render={<Link href="/account" />}
          className="cursor-pointer gap-2.5 rounded-xl! px-2.5! py-2.5! text-sm text-zinc-300 focus:bg-white/10! focus:text-white!"
        >
          <UserRound className="size-4 text-zinc-500" />
          Account
        </DropdownMenuItem>
        <DropdownMenuItem
          render={<Link href="/billing" />}
          className="cursor-pointer gap-2.5 rounded-xl! px-2.5! py-2.5! text-sm text-zinc-300 focus:bg-white/10! focus:text-white!"
        >
          <CreditCard className="size-4 text-zinc-500" />
          Billing
        </DropdownMenuItem>
        <DropdownMenuItem
          render={<Link href="/notifications" />}
          className="cursor-pointer gap-2.5 rounded-xl! px-2.5! py-2.5! text-sm text-zinc-300 focus:bg-white/10! focus:text-white!"
        >
          <Bell className="size-4 text-zinc-500" />
          Notifications
        </DropdownMenuItem>

        <DropdownMenuSeparator className="bg-white/10!" />

        <DropdownMenuItem
          variant="destructive"
          disabled={isSigningOut}
          onClick={signOut}
          className="cursor-pointer gap-2.5 rounded-xl! px-2.5! py-2.5! text-sm text-red-400 focus:bg-red-500/10! focus:text-red-300!"
        >
          <LogOut className="size-4" />
          {isSigningOut ? "Logging out..." : "Log out"}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserMenu;
