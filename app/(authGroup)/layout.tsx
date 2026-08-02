import { Navbar } from "@/components/shared/navbar";
import { getMe } from "@/service/getMe";


export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const userRes = await getMe();
  return (
    <div>
       <Navbar user={userRes.success ? userRes.data.profile : null} />
      <div className="max-w-7xl mx-auto">
     
      {children}
    </div>
    </div>
  );
};