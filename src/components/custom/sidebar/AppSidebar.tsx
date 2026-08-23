import {
  ArrowRightLeft,
  Grid2X2,
  History,
  LogOut,
  Settings,
  UserPlus,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "../../ui/sidebar";

import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar";

import { NavLink, useLocation } from "react-router-dom";

const mainItems = [
  {
    title: "Dashboard",
    url: "/admin/dashboard",
    icon: Grid2X2,
  },
  {
    title: "New Enrolment",
    url: "/admin/enrolment",
    icon: UserPlus,
  },
  {
    title: "History",
    url: "/admin/history",
    icon: History,
  },
  {
    title: "Sync Queue",
    url: "/admin/sync",
    icon: ArrowRightLeft,
  },
];

const bottomItems = [
  {
    title: "Settings",
    url: "/admin/settings",
    icon: Settings,
  },
];

export function AppSidebar() {
  const location = useLocation();

  return (
    <Sidebar collapsible="icon" className="bg-[#f8f9fb]">
      {/* ================= PROFILE ================= */}

      <SidebarHeader className="border-none px-3 pt-4">
        <div className="flex flex-col items-center">
          <Avatar
            className="
              h-11 w-11 rounded-lg
              group-data-[collapsible=icon]:h-8
              group-data-[collapsible=icon]:w-8
            "
          >
            <AvatarImage
              src="/assets/agent.jpg"
              alt="Agent"
              className="object-cover"
            />

            <AvatarFallback className="rounded-lg">AG</AvatarFallback>
          </Avatar>

          <div
            className="
              mt-2 text-center
              group-data-[collapsible=icon]:hidden
            "
          >
            <p className="text-[15px] font-bold leading-tight text-gray-900">
              Agent ID: 8829
            </p>

            <p className="mt-0.5 text-[10px] leading-tight text-gray-500">
              Field Office Sector 7
            </p>
          </div>
        </div>
      </SidebarHeader>

      {/* ================= MAIN MENU ================= */}

      <SidebarContent className="pt-3">
        <SidebarGroup className="p-0">
          <SidebarGroupContent>
            <SidebarMenu className="gap-1.5 px-2.5">
              {mainItems.map((item) => {
                const isActive = location.pathname === item.url;

                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      render={<NavLink to={item.url} />}
                      isActive={isActive}
                      tooltip={item.title}
                      className="
                        h-8
                        rounded-lg
                        px-2.5
                        text-[11px]
                        font-medium
                        text-gray-600

                        hover:bg-transparent
                        hover:text-gray-700

                        data-[active]:bg-[#dce4f5]
                        data-[active]:text-gray-700
                      "
                    >
                      <item.icon
                        className="h-4 w-4 shrink-0"
                        strokeWidth={1.8}
                      />

                      <span>{item.title}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* ================= FOOTER ================= */}

      <SidebarFooter className="border-none px-2.5 pb-5">
        <SidebarMenu className="gap-1.5">
          {bottomItems.map((item) => {
            const isActive = location.pathname === item.url;

            return (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton
                  render={<NavLink to={item.url} />}
                  isActive={isActive}
                  tooltip={item.title}
                  className="
                    h-8
                    rounded-lg
                    px-2.5
                    text-[11px]
                    font-medium
                    text-gray-600

                    hover:bg-transparent
                    hover:text-gray-700

                    data-[active]:bg-[#dce4f5]
                    data-[active]:text-gray-700
                  "
                >
                  <item.icon className="h-4 w-4 shrink-0" strokeWidth={1.8} />

                  <span>{item.title}</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          })}

          {/* Logout */}

          <SidebarMenuItem>
            <SidebarMenuButton
              tooltip="Logout"
              className="
                h-8
                rounded-lg
                px-2.5
                text-[11px]
                font-medium
                text-gray-600

                hover:bg-transparent
                hover:text-gray-700
              "
              onClick={() => {
                console.log("logout");
              }}
            >
              <LogOut className="h-4 w-4 shrink-0" strokeWidth={1.8} />

              <span>Logout</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
