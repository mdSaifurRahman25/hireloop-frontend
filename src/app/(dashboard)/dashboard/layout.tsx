import { Suspense, type ReactNode } from "react";

import DashboardSidebar from "@/app/components/DashboardSidebar";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";

const DashboardLayout = ({ children }: { children: ReactNode }) => {
  return (
    <SidebarProvider>
      <Suspense fallback={<div className="hidden md:block w-64 border-r border-white/10 bg-[#0d0d0d]" />}>
        <DashboardSidebar />
      </Suspense>
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b border-white/10 px-4">
          <SidebarTrigger className="text-zinc-300 hover:bg-white/10 hover:text-white" />
        </header>
        <div className="flex flex-1 flex-col gap-6 p-4 sm:p-6">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default DashboardLayout;
