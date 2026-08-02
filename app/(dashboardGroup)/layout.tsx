import { Navbar } from "@/components/shared/navbar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { getMe } from "@/service/getMe";
import React from "react";
import DashboardSidebar from "./_components/DashboardSidebar";

const DashboardGroupLayout = async ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const userRes = await getMe();

  return (
    <div>
      <Navbar user={userRes.success ? userRes.data.profile : null} />
      <SidebarProvider>
        <div className="flex flex-1">
          <DashboardSidebar
            user={userRes.success ? userRes.data.profile : null}
          />
          <main className="flex-1 min-w-0">{children}</main>
        </div>
      </SidebarProvider>
    </div>
  );
};

export default DashboardGroupLayout;