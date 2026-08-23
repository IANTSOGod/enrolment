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
          <div className="font-semibold w-full flex flex-row">
            <Label className="text-xl text-primary">Enrolment App</Label>
            <div className="ml-auto flex flex-row gap-3 items-center justify-center text-primary">
              <div className="flex flex-row items-center align-center justify-center rounded-xl bg-slate-200">
                <Dot className="text-3xl text-green-500"></Dot>
                <Label className="mr-3 text-black">Syncing</Label>
              </div>
              <Wifi></Wifi>
              <RefreshCw></RefreshCw>
              <User></User>
            </div>
          </div>
        </header>
        <main className="flex-1 p-6">
          <Outlet />
        </main>
        <footer className="bg-slate-100 flex flex-row h-10 text-slate-400">
          <div className="flex flex-row ml-5">
            <Label>
              © 2024 National Identity Systems. Restricted Government Access.
            </Label>
          </div>
          <div className="flex flex-row gap-5 ml-auto mr-5">
            <Label>Privacy policy</Label>
            <Label>Support</Label>
            <Label>Legal</Label>
          </div>
        </footer>
      </SidebarInset>
    </SidebarProvider>
  );
}
