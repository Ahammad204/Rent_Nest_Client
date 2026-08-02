import {
  Home,
  Search,
  LucideIcon,
} from "lucide-react";

export interface NavItem {
  label: string;
  href: string;
  icon: LucideIcon;
  description?: string;
}

export interface UserMenuItem {
  label: string;
  action: string;
  icon: LucideIcon;
  isDangerous?: boolean;
}

export const navItems: NavItem[] = [
  {
    label: "Home",
    href: "/",
    icon: Home,
    description: "Go to homepage",
  },
  {
    label: "Browse Properties",
    href: "/properties",
    icon: Search,
    description: "Find your next home",
  },
];

export const userMenuItems: UserMenuItem[] = [
  {
    label: "My Dashboard",
    action: "dashboard",
    icon: Search,
  },
  {
    label: "Sign Out",
    action: "logout",
    isDangerous: true,
    icon: Search,
  },
];