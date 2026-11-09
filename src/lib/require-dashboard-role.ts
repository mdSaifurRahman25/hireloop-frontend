import { headers } from "next/headers"
import { redirect } from "next/navigation"

import { auth } from "@/lib/auth"
import { isDashboardRole, type DashboardRole } from "@/lib/roles"

/**
 * Server-side guard for the role dashboards. Signed-out visitors are sent to
 * sign-in, and a signed-in user who opens another role's dashboard is sent to
 * their own, so the sidebar always matches the account's role.
 */
export const requireDashboardRole = async (role: DashboardRole) => {
  const session = await auth.api.getSession({ headers: await headers() })

  if (!session) redirect("/sign-in")

  const userRole = session.user.role
  if (userRole !== role) {
    redirect(
      isDashboardRole(userRole) ? `/dashboard/${userRole}` : "/dashboard/seeker",
    )
  }

  return session
}
