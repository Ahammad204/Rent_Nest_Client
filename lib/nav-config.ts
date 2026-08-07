import {
  Home,
  Search,
  Info,
  LayoutDashboard,
  User,
  FileText,
  LogOut,
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

// Logged out: 4 routes
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
  {
    label: "About",
    href: "/about",
    icon: Info,
    description: "Learn about Thikana",
  },

];

// Logged in: 6 routes (4 nav + 2 dropdown)
export const loggedInNavItems: NavItem[] = [
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
  {
    label: "About",
    href: "/about",
    icon: Info,
    description: "Learn about Thikana",
  },
];

export const userMenuItems: UserMenuItem[] = [
  {
    label: "My Dashboard",
    action: "dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "My Profile",
    action: "profile",
    icon: User,
  },
  {
    label: "My Requests",
    action: "requests",
    icon: FileText,
  },
  {
    label: "Sign Out",
    action: "logout",
    isDangerous: true,
    icon: LogOut,
  },
];