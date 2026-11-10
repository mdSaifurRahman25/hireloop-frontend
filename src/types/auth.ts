import type { LucideIcon } from "lucide-react";

export type UserRole = "seeker" | "recruiter" | "admin";

export type DashboardRole = UserRole;

export type DashboardMenuItem = {
  id: string;
  name: string;
  url: string;
  icon: LucideIcon;
};
