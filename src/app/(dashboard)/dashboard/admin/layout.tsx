import type { ReactNode } from "react"

import { requireDashboardRole } from "@/lib/require-dashboard-role"

// The session read is request-time data, so this segment blocks instead of
// prerendering a static shell (cacheComponents is enabled).
export const instant = false

const AdminDashboardLayout = async ({ children }: { children: ReactNode }) => {
  await requireDashboardRole("admin")

  return <>{children}</>
}

export default AdminDashboardLayout
