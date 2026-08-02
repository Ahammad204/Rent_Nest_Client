import { getAllUsers } from "../../_actions/dashboardActions";

export default async function AdminUsersPage() {
  const res = await getAllUsers();
  const users = res.data?.users || [];

  return (
    <div className="p-6 space-y-6">
      <h1 className="font-heading text-2xl font-bold text-[#1B211E]">
        Manage Users
      </h1>
      <div className="bg-white border border-[#D8DBD3] rounded-lg overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-[#D8DBD3] bg-[#F4F5F1]">
              <th className="text-left px-4 py-3 font-bold text-xs text-[#1F4D3E] uppercase tracking-wider">
                Name
              </th>
              <th className="text-left px-4 py-3 font-bold text-xs text-[#1F4D3E] uppercase tracking-wider">
                Email
              </th>
              <th className="text-left px-4 py-3 font-bold text-xs text-[#1F4D3E] uppercase tracking-wider">
                Role
              </th>
              <th className="text-left px-4 py-3 font-bold text-xs text-[#1F4D3E] uppercase tracking-wider">
                Status
              </th>
              <th className="text-left px-4 py-3 font-bold text-xs text-[#1F4D3E] uppercase tracking-wider">
                Joined
              </th>
            </tr>
          </thead>
          <tbody>
            {users.map(
              (user: {
                id: string;
                name: string;
                email: string;
                role: string;
                status: string;
                createdAt: string;
              }) => (
                <tr
                  key={user.id}
                  className="border-b border-[#F4F5F1] last:border-0"
                >
                  <td className="px-4 py-3 font-medium text-[#1B211E]">
                    {user.name}
                  </td>
                  <td className="px-4 py-3 text-gray-500">{user.email}</td>
                  <td className="px-4 py-3">
                    <span className="px-2 py-0.5 text-[10px] font-bold uppercase rounded bg-[#1F4D3E]/10 text-[#1F4D3E]">
                      {user.role}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`px-2 py-0.5 text-[10px] font-bold uppercase rounded ${
                        user.status === "ACTIVE"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {user.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-gray-500 text-xs">
                    {new Date(user.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ),
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
