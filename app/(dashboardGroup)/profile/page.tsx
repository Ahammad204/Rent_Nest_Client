import { getMe } from "@/service/getMe";
import { redirect } from "next/navigation";
import { ProfileForm } from "../_components/ProfileForm";

export default async function ProfilePage() {
  const userRes = await getMe();

  if (!userRes.success || !userRes.data?.profile) {
    redirect("/login");
  }

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="font-heading text-2xl font-bold text-foreground">My Profile</h1>
        <p className="text-xs text-gray-500 mt-1">Manage your account information</p>
      </div>
      <ProfileForm user={userRes.data.profile} />
    </div>
  );
}