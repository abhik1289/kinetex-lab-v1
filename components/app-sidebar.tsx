"use client"

import * as React from "react"
import Image from "next/image"
import { useTheme } from "next-themes"
import { NavMain } from "@/components/nav-main"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import {
  LayoutDashboardIcon,
  MoonIcon,
  Settings2Icon,
  ShieldCheckIcon,
  SunIcon,
  UsersIcon,
  UsersRoundIcon,
} from "lucide-react"

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: (
        <LayoutDashboardIcon
        />
      ),
    },
    {
      title: "Users",
      url: "/users",
      icon: <UsersIcon />,
    },
    {
      title: "Teams",
      url: "/teams",
      icon: <UsersRoundIcon />,
    },
    {
      title: "Admins",
      url: "/admins",
      icon: <ShieldCheckIcon />,
    },
    {
      title: "Control",
      url: "/controls",
      icon: <Settings2Icon />,
    },
  ],
 
}

function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme()
  const mounted = React.useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  )

  if (!mounted) {
    return null
  }

  const isDark = resolvedTheme === "dark"

  return (
    <Button
      aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
      className="w-full justify-start gap-2 text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground group-data-[collapsible=icon]:size-8! group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:p-2!"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      size="sm"
      title={`Switch to ${isDark ? "light" : "dark"} mode`}
      variant="ghost"
    >
      {isDark ? <SunIcon /> : <MoonIcon />}
      <span className="group-data-[collapsible=icon]:hidden">
        {isDark ? "Light mode" : "Dark mode"}
      </span>
    </Button>
  )
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              className="data-[slot=sidebar-menu-button]:p-1.5!"
              render={<a href="/dashboard" />}
            >
              <Image alt="KinexLab logo" height={24} src="/images/logo1.png" width={24} />
              <span className="text-base font-semibold">KinexLab</span>
            </SidebarMenuButton>
            
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      {/* <Separator /> */}
      <SidebarContent>
        <NavMain items={data.navMain} />
        {/* <NavDocuments items={data.documents} />
        <NavSecondary items={data.navSecondary} className="mt-auto" /> */}
      </SidebarContent>
      <SidebarFooter>
        <ThemeToggle />
      </SidebarFooter>
    </Sidebar>
  )
}
