"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import type { ISidebarItem, NavbarProps } from "@/lib/types";
import { sidebarMenuItems } from "../_config/sidebarMenuItems";

export default function MobileDashboardNav({ user }: NavbarProps) {
  const [open, setOpen] = useState(false);
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
    <div className="md:hidden">
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <button className="fixed top-20 left-4 z-40 p-2 bg-card border border-border rounded-lg shadow-sm hover:bg-muted transition-colors">
            <Menu className="w-5 h-5 text-foreground" />
          </button>
        </SheetTrigger>
        <SheetContent side="left" className="w-64 bg-card p-0">
          <SheetHeader className="p-4 border-b border-border">
            <SheetTitle className="font-heading text-foreground">
              Navigation
            </SheetTitle>
          </SheetHeader>
          <nav className="flex flex-col gap-1 p-4">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-primary/10 text-primary"
                      : "text-gray-600 hover:text-foreground hover:bg-muted"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </SheetContent>
      </Sheet>
    </div>
  );
}