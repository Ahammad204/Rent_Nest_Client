import { Navbar } from "@/components/shared/navbar";
import { getMe } from "@/service/getMe";


export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getMe();
  return (
    <div>
       <Navbar user={user}></Navbar>
      <div className="max-w-7xl mx-auto">
     
      {children}
    </div>
    </div>
  );
};