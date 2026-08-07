import { getMe } from "@/service/getMe";
import { redirect } from "next/navigation";
import { SettingsForm } from "../_components/SettingsForm";


export default async function SettingsPage() {
  const userRes = await getMe();

  if (!userRes.success || !userRes.data?.profile) {
    redirect("/login");
  }

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="font-heading text-2xl font-bold text-foreground">Settings</h1>
        <p className="text-xs text-muted-foreground mt-1">Manage your account preferences</p>
      </div>
      <SettingsForm user={userRes.data.profile} />
    </div>
  );
}