import { Navbar } from "@/components/shared/navbar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { getMe } from "@/service/getMe";
import React from "react";
import DashboardSidebar from "./_components/DashboardSidebar";
import MobileDashboardNav from "./_components/MobileDashboardNav";

const DashboardGroupLayout = async ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const userRes = await getMe();
  const user = userRes.success ? userRes.data.profile : null;

  return (
    <div>
      <Navbar user={user} />
      <SidebarProvider>
        <div className="flex flex-1">
          {/* Desktop sidebar - always visible */}
          <div className="hidden md:block">
            <DashboardSidebar user={user} />
          </div>
          {/* Mobile hamburger - only on mobile */}
          <MobileDashboardNav user={user} />
          <main className="flex-1 min-w-0">{children}</main>
        </div>
      </SidebarProvider>
    </div>
  );
};

export default DashboardGroupLayout;