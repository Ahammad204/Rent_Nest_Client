import { getAllUsers } from "../../_actions/dashboardActions";
import { UserManagementTable } from "../../_components/UserManagementTable";

export default async function AdminUsersPage() {
  const res = await getAllUsers();
  const users = res.data?.users || [];

  return (
    <div className="p-6 space-y-6">
      <h1 className="font-heading text-2xl font-bold text-foreground">
        Manage Users
      </h1>
      <UserManagementTable users={users} />
    </div>
  );
}
