"use client";

import { ShieldCheck, UserRound, UsersRound } from "lucide-react";
import { cn } from "cn";

export const roles = [
  { value: "seeker", label: "Job Seeker", icon: UserRound },
  { value: "recruiter", label: "Recruiter", icon: UsersRound },
  { value: "admin", label: "Admin", icon: ShieldCheck },
] as const;

export type Role = (typeof roles)[number]["value"];

export const roleLabel = (role: string) =>
  roles.find((option) => option.value === role)?.label ?? role;

type RoleSelectorProps = {
  value: Role;
  onChange: (role: Role) => void;
  legend: string;
  name?: string;
};

const RoleSelector = ({
  value,
  onChange,
  legend,
  name = "role",
}: RoleSelectorProps) => {
  return (
    <fieldset>
      <legend className="text-sm font-medium text-zinc-200">{legend}</legend>
      <div className="mt-2 grid grid-cols-3 gap-2">
        {roles.map((option) => {
          const Icon = option.icon;
          const isActive = value === option.value;

          return (
            <label
              key={option.value}
              className={cn(
                "flex cursor-pointer flex-col items-center gap-1.5 rounded-xl border px-2 py-3 text-center transition-colors",
                "has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-indigo-400/50",
                isActive
                  ? "border-indigo-500 bg-indigo-500/10 text-white"
                  : "border-white/10 bg-white/[0.03] text-zinc-400 hover:border-white/20 hover:text-zinc-200",
              )}
            >
              <input
                type="radio"
                name={name}
                value={option.value}
                checked={isActive}
                onChange={() => onChange(option.value)}
                className="sr-only"
              />
              <Icon className="size-4" aria-hidden="true" />
              <span className="text-xs font-medium">{option.label}</span>
            </label>
          );
        })}
      </div>
    </fieldset>
  );
};

export default RoleSelector;
