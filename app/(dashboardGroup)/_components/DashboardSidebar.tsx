"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { sidebarMenuItems } from "../_config/sidebarMenuItems";
import type { ISidebarItem, NavbarProps } from "@/lib/types";

export default function DashboardSidebar({ user }: NavbarProps) {
  const pathname = usePathname();

  let navItems: ISidebarItem[] = [];

  if (user?.role === "TENANT") {
    navItems = sidebarMenuItems.TENANT;
  } else if (user?.role === "LANDLORD") {
    navItems = sidebarMenuItems.LANDLORD;
  } else if (user?.role === "ADMIN") {
    navItems = sidebarMenuItems.ADMIN;
  }

  return (
    <Sidebar
      collapsible="none"
      className="h-[calc(100svh-4rem)] border-r border-sidebar-border"
    >
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton
                    asChild
                    isActive={
                      item.href === "/"
                        ? pathname === "/"
                        : pathname.startsWith(item.href)
                    }
                  >
                    <Link href={item.href}>
                      <item.icon />
                      <span>{item.label}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}