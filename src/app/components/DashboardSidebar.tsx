'use client'

import {
  Bookmark,
  Briefcase,
  Building2,
  FileText,
  LayoutDashboard,
  PlusCircle,
  Settings,
  Users,
  Wallet,
} from "lucide-react"
import { usePathname } from "next/navigation"

import { useSession } from "@/lib/auth-client"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import Link from "next/link"
import type { DashboardMenuItem, DashboardRole } from "@/types"

export type { DashboardMenuItem, DashboardRole }

/**
 * Sidebar navigation per role, following the HL 2.0/Sidebar spec in Figma.
 * Seeker: Dashboard, Jobs, Saved Jobs, Applications, Billing, Settings.
 * Recruiter: Dashboard, My Company, Add Jobs, Manage Jobs, Applications, Settings.
 * Admin: Dashboard, Users, Companies, Jobs, Payments, Settings.
 */
export const menuItemsByRole: Record<DashboardRole, DashboardMenuItem[]> = {
  seeker: [
    {
      id: "seeker-dashboard",
      name: "Dashboard",
      url: "/dashboard/seeker",
      icon: LayoutDashboard,
    },
    {
      id: "seeker-jobs",
      name: "Jobs",
      url: "/dashboard/seeker/jobs",
      icon: Briefcase,
    },
    {
      id: "seeker-saved",
      name: "Saved Jobs",
      url: "/dashboard/seeker/saved",
      icon: Bookmark,
    },
    {
      id: "seeker-applications",
      name: "Applications",
      url: "/dashboard/seeker/applications",
      icon: FileText,
    },
    {
      id: "seeker-billing",
      name: "Billing",
      url: "/dashboard/seeker/billing",
      icon: Wallet,
    },
    {
      id: "seeker-settings",
      name: "Settings",
      url: "/dashboard/seeker/settings",
      icon: Settings,
    },
  ],
  recruiter: [
    {
      id: "recruiter-dashboard",
      name: "Dashboard",
      url: "/dashboard/recruiter",
      icon: LayoutDashboard,
    },
    {
      id: "recruiter-company",
      name: "My Company",
      url: "/dashboard/recruiter/my-company",
      icon: Building2,
    },
    {
      id: "add-jobs",
      name: "Add Jobs",
      url: "/dashboard/recruiter/jobs/new",
      icon: PlusCircle,
    },
    {
      id: "recruiter-jobs",
      name: "Manage Jobs",
      url: "/dashboard/recruiter/jobs",
      icon: Briefcase,
    },
    {
      id: "recruiter-applications",
      name: "Applications",
      url: "/dashboard/recruiter/applications",
      icon: FileText,
    },
    {
      id: "recruiter-settings",
      name: "Settings",
      url: "/dashboard/recruiter/settings",
      icon: Settings,
    },
  ],
  admin: [
    {
      id: "admin-dashboard",
      name: "Dashboard",
      url: "/dashboard/admin",
      icon: LayoutDashboard,
    },
    {
      id: "admin-users",
      name: "Users",
      url: "/dashboard/admin/users",
      icon: Users,
    },
    {
      id: "admin-companies",
      name: "Companies",
      url: "/dashboard/admin/companies",
      icon: Building2,
    },
    {
      id: "admin-jobs",
      name: "Jobs",
      url: "/dashboard/admin/jobs",
      icon: Briefcase,
    },
    {
      id: "admin-payments",
      name: "Payments",
      url: "/dashboard/admin/payments",
      icon: Wallet,
    },
    {
      id: "admin-settings",
      name: "Settings",
      url: "/dashboard/admin/settings",
      icon: Settings,
    },
  ],
}

const isDashboardRole = (
  value: string | null | undefined,
): value is DashboardRole =>
  value === "seeker" || value === "recruiter" || value === "admin"

export function DashboardSidebar() {
  const { data: session } = useSession()
  const pathname = usePathname()

  const sessionRole = session?.user?.role
  const role: DashboardRole = isDashboardRole(sessionRole)
    ? sessionRole
    : "seeker"

  const items = menuItemsByRole[role]
  const dashboardUrl = `/dashboard/${role}`
  // The deepest matching link wins, so /dashboard/recruiter/jobs/new highlights
  // "Add Jobs" without also highlighting "Manage Jobs".
  const activeUrl = items
    .map((item) => item.url)
    .filter(
      (url) =>
        pathname === url ||
        (url !== dashboardUrl && pathname.startsWith(`${url}/`)),
    )
    .sort((a, b) => b.length - a.length)[0]

  return (
    <Sidebar>
      <SidebarHeader />
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            {items.map((item) => (
              <SidebarMenuItem key={item.id}>
                <SidebarMenuButton
                  isActive={item.url === activeUrl}
                  render={<Link href={item.url} />}
                >
                  <item.icon />
                  <span>{item.name}</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  )
}
export default DashboardSidebar
