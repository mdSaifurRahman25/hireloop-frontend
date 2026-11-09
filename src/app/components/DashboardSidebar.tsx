'use client'
import type { ComponentType } from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { useSession } from "@/lib/auth-client";

const projects: {
  name: string;
  url: string;
  icon: ComponentType;
}[] = [];

const menuItemsByRole = {
    seeker: [

    ], 
    recruiter: [

    ],
    admin: [

    ]
}

export function DashboardSidebar() {
    const {data: session, isPending} = useSession(); 
    const role = session?.user?.role; 
    console.log(role, 'from dashboard sidebar page.');

  return (
    <Sidebar>
      <SidebarHeader />
      <SidebarContent>
        <SidebarGroup />
        <SidebarGroup />
        <SidebarGroup>
          <SidebarMenu>
            {projects.map((project) => (
              <SidebarMenuItem key={project.name}>
                <SidebarMenuButton render={<a href={project.url} />}>
                  <project.icon />
                  <span>{project.name}</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
}
export default DashboardSidebar;
