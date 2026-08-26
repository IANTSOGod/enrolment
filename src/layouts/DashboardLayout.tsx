import { Outlet } from "react-router-dom";

import { AppSidebar } from "../components/custom/sidebar/AppSidebar";

import { Dot, RefreshCw, User, Wifi } from "lucide-react";
import { Label } from "../components/ui/label";
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
        <header className="flex h-14 items-center gap-2 border-b px-4">
          <SidebarTrigger />
          <div className="font-semibold flex w-full flex-row items-center gap-2">
            <Label className="truncate text-xl text-primary">Enrolment App</Label>
            <div className="ml-auto flex flex-row items-center justify-center gap-2 sm:gap-3 text-primary">
              <div className="hidden flex-row items-center justify-center rounded-xl bg-slate-200 sm:flex">
                <Dot className="text-3xl text-green-500"></Dot>
                <Label className="mr-3 text-black">Syncing</Label>
              </div>
              <Wifi></Wifi>
              <RefreshCw></RefreshCw>
              <User></User>
            </div>
          </div>
        </header>
        <main className="flex-1 p-4 sm:p-6">
          <Outlet />
        </main>
        <footer className="bg-slate-100 flex flex-col gap-1 px-4 py-2 text-slate-400 sm:flex-row sm:h-10 sm:items-center sm:px-0 sm:py-0">
          <div className="flex flex-row ml-0 sm:ml-5">
            <Label className="text-[12px] sm:text-sm">
              © 2024 National Identity Systems. Restricted Government Access.
            </Label>
          </div>
          <div className="flex flex-row gap-5 ml-0 sm:ml-auto sm:mr-5">
            <Label>Privacy policy</Label>
            <Label>Support</Label>
            <Label>Legal</Label>
          </div>
        </footer>
      </SidebarInset>
    </SidebarProvider>
  );
}
