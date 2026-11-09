import type { ReactNode } from "react"

import { requireDashboardRole } from "@/lib/require-dashboard-role"

// The session read is request-time data, so this segment blocks instead of
// prerendering a static shell (cacheComponents is enabled).
export const instant = false

const RecruiterDashboardLayout = async ({
  children,
}: {
  children: ReactNode
}) => {
  await requireDashboardRole("recruiter")

  return <>{children}</>
}

export default RecruiterDashboardLayout
