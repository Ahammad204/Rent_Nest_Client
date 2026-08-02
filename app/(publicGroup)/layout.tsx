import { Footer } from "@/components/shared/footer";
import { Navbar } from "@/components/shared/navbar";
import { getMe } from "@/service/getMe";
import React from "react";

const PublicGroupLayout = async ({ children }: { children: React.ReactNode }) => {
    const userRes = await getMe();
  return (
    <div>
      <Navbar user={userRes.success ? userRes.data.profile : null} />
      {children}
      <Footer />
    </div>
  );
};

export default PublicGroupLayout;