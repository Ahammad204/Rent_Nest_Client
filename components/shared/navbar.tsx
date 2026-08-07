"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuGroup,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ChevronDown, User, Home, Menu } from "lucide-react";
import { logout } from "@/service/logout";
import { navItems, userMenuItems } from "@/lib/nav-config";
import type { UserProfile } from "@/lib/types";
import { useRouter } from "next/navigation";
import { useState } from "react";

type NavbarProps = {
  user: UserProfile | null;
};

export function Navbar({ user }: NavbarProps) {
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleUserAction = async (action: string) => {
    if (action === "logout") {
      await logout();
    } else if (action === "dashboard") {
      if (user?.role === "LANDLORD") {
        router.push("/landlord-dashboard");
      } else if (user?.role === "ADMIN") {
        router.push("/admin-dashboard");
      } else {
        router.push("/dashboard");
      }
    }
    setMobileOpen(false);
  };

  return (
    <nav className="border-b border-[#D8DBD3] bg-[#FAFAF8] sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo/Brand */}
          <div className="shrink-0">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded bg-[#1F4D3E] flex items-center justify-center">
                <Home className="w-4 h-4 text-[#C98A2C]" />
              </div>
              <span className="font-heading font-bold text-xl tracking-tight text-[#1B211E]">
                Thik<span className="text-[#1F4D3E]">ana</span>
              </span>
            </Link>
          </div>

          {/* Mobile Menu */}
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild>
              <button className="md:hidden p-2 rounded-md hover:bg-[#F4F5F1] transition-colors">
                <Menu className="w-5 h-5 text-[#1B211E]" />
              </button>
            </SheetTrigger>
            <SheetContent side="left" className="w-64 bg-white">
              <SheetHeader>
                <SheetTitle className="font-heading text-[#1B211E]">
                  Menu
                </SheetTitle>
              </SheetHeader>
              <div className="flex flex-col gap-1 px-4">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setMobileOpen(false)}
                      className="flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium text-gray-600 hover:text-[#1B211E] hover:bg-[#F4F5F1] transition-colors"
                    >
                      <Icon className="w-4 h-4" />
                      {item.label}
                    </Link>
                  );
                })}
              </div>
            </SheetContent>
          </Sheet>
          {/* Navigation Links - Hidden on mobile */}
          <div className="hidden md:flex md:gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="inline-flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium text-gray-600 hover:text-[#1B211E] hover:bg-[#F4F5F1] transition-colors"
                  title={item.description}
                >
                  <Icon className="size-4" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </div>

          {/* Right Side */}
          <div className="shrink-0">
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="flex items-center gap-2 px-3 py-2 rounded-md border border-[#D8DBD3] hover:bg-[#F4F5F1] transition-colors text-sm font-medium text-[#1B211E] cursor-pointer">
                    <div className="w-8 h-8 rounded-full bg-[#1F4D3E] flex items-center justify-center">
                      <User className="w-4 h-4 text-white" />
                    </div>
                    <ChevronDown className="size-4 text-gray-500 transition-transform" />
                  </button>
                </DropdownMenuTrigger>

                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuGroup>
                    <div className="px-2 py-1.5">
                      <p className="text-sm font-medium text-[#1B211E]">
                        {user.name}
                      </p>
                      <p className="text-xs text-gray-500 mt-0.5">
                        {user.email}
                      </p>
                      <span className="inline-block mt-1 px-2 py-0.5 text-[10px] font-bold uppercase rounded bg-[#1F4D3E]/10 text-[#1F4D3E]">
                        {user.role}
                      </span>
                    </div>
                  </DropdownMenuGroup>

                  <DropdownMenuSeparator />

                  <DropdownMenuGroup>
                    {userMenuItems.map((item) => {
                      const Icon = item.icon;
                      return (
                        <DropdownMenuItem
                          key={item.action}
                          onClick={() => handleUserAction(item.action)}
                          variant={item.isDangerous ? "destructive" : "default"}
                          className="cursor-pointer"
                        >
                          <Icon className="size-4" />
                          {item.label}
                        </DropdownMenuItem>
                      );
                    })}
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link href="/login">
                <Button className="bg-[#1F4D3E] hover:bg-[#173B2F] text-white font-mono-spec font-bold text-xs cursor-pointer">
                  LOGIN
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}