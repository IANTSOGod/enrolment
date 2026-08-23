import { Outlet } from "react-router-dom";

import { AppSidebar } from "../components/custom/sidebar/AppSidebar";

import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "../components/ui/sidebar";

export default function DashboardLayout() {
  return (
    <SidebarProvider>
      <AppSidebar />

      <SidebarInset>
        {/* Header */}
        <header className="flex h-14 items-center gap-2 border-b px-4">
          <SidebarTrigger />

          <div className="font-semibold">Field Agent</div>
        </header>

        {/* Page */}
        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
