export const dashboardRoles = ["seeker", "recruiter", "admin"] as const

export type DashboardRole = (typeof dashboardRoles)[number]

export const isDashboardRole = (
  value: string | null | undefined,
): value is DashboardRole =>
  value === "seeker" || value === "recruiter" || value === "admin"
