import { ISidebarItem } from "@/lib/types";
import { LayoutDashboard, FileText, UserCircle } from "lucide-react";
import { LANDLORD_SIDEBAR_ITEMS } from "./landlordSidebarItems";
import { ADMIN_SIDEBAR_ITEMS } from "./adminSidebarItems";


const TENANT_SIDEBAR_ITEMS: ISidebarItem[] = [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "My Requests",
    href: "/dashboard/requests",
    icon: FileText,
  },
  {
    label: "My Payments",
    href: "/dashboard/payments",
    icon: FileText,
  },
  {
    label: "My Reviews",
    href: "/dashboard/reviews",
    icon: FileText,
  },
   {
   label: "Profile",
   href: "/profile",
   icon: UserCircle,
 },
];

export const sidebarMenuItems = {
  TENANT: TENANT_SIDEBAR_ITEMS,
  LANDLORD: LANDLORD_SIDEBAR_ITEMS,
  ADMIN: ADMIN_SIDEBAR_ITEMS,
};