import { ISidebarItem } from "@/lib/types";
import {
  LayoutDashboard,
  Users,
  Building,
  FileText,
  UserCircle,
  BarChart3,
  Tags,
} from "lucide-react";

export const ADMIN_SIDEBAR_ITEMS: ISidebarItem[] = [
  {
    label: "Dashboard",
    href: "/admin-dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "Users",
    href: "/admin-dashboard/users",
    icon: Users,
  },
  {
    label: "Properties",
    href: "/admin-dashboard/properties",
    icon: Building,
  },
  {
    label: "Rentals",
    href: "/admin-dashboard/rentals",
    icon: FileText,
  },
  {
    label: "Analytics",
    href: "/admin-dashboard/analytics",
    icon: BarChart3,
  },
  {
    label: "Categories",
    href: "/admin-dashboard/categories",
    icon: Tags,
  },
  {
    label: "Profile",
    href: "/profile",
    icon: UserCircle,
  },
];