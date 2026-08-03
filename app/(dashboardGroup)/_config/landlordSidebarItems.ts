import { ISidebarItem } from "@/lib/types";
import { LayoutDashboard, Building, FileText,UserCircle } from "lucide-react";

export const LANDLORD_SIDEBAR_ITEMS: ISidebarItem[] = [
  {
    label: "Dashboard",
    href: "/landlord-dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "My Properties",
    href: "/landlord-dashboard/properties",
    icon: Building,
  },
  {
    label: "Rental Requests",
    href: "/landlord-dashboard/requests",
    icon: FileText,
  },
  {
   label: "Profile",
   href: "/profile",
   icon: UserCircle,
 },
];