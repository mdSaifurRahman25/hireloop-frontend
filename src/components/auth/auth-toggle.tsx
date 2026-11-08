import Link from "next/link";
import { cn } from "cn";

type AuthToggleProps = {
  active: "sign-in" | "sign-up";
};

const options = [
  { value: "sign-in", label: "Sign in", href: "/sign-in" },
  { value: "sign-up", label: "Sign up", href: "/sign-up" },
] as const;

const AuthToggle = ({ active }: AuthToggleProps) => {
  return (
    <nav
      aria-label="Authentication"
      className="grid grid-cols-2 gap-1 rounded-full border border-white/10 bg-white/[0.04] p-1"
    >
      {options.map((option) => {
        const isActive = option.value === active;

        return (
          <Link
            key={option.value}
            href={option.href}
            aria-current={isActive ? "page" : undefined}
            className={cn(
              "flex h-9 items-center justify-center rounded-full text-sm font-medium transition-colors",
              isActive
                ? "bg-indigo-600 text-white shadow-[0_8px_24px_-12px_rgba(79,70,229,0.9)]"
                : "text-zinc-400 hover:text-white",
            )}
          >
            {option.label}
          </Link>
        );
      })}
    </nav>
  );
};

export default AuthToggle;
