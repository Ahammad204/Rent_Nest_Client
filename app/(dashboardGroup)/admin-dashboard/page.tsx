
import { Users, Building, FileText, CheckCircle } from "lucide-react";
import { getAllPropertiesAdmin, getAllRentalsAdmin, getAllUsers } from "../_actions/dashboardActions";

export default async function AdminDashboardPage() {
  const [usersRes, propertiesRes, rentalsRes] = await Promise.all([
    getAllUsers(),
    getAllPropertiesAdmin(),
    getAllRentalsAdmin(),
  ]);

  const users = usersRes.data?.users || [];
  const properties = propertiesRes.data?.properties || [];
  const rentals = rentalsRes.data?.rentals || [];

  const stats = [
    {
      label: "Total Users",
      value: users.length,
      icon: Users,
      color: "bg-[#1F4D3E]",
    },
    {
      label: "Total Properties",
      value: properties.length,
      icon: Building,
      color: "bg-blue-500",
    },
    {
      label: "Total Rentals",
      value: rentals.length,
      icon: FileText,
      color: "bg-yellow-500",
    },
    {
      label: "Active Rentals",
      value: rentals.filter((r: { status: string }) => r.status === "ACTIVE")
        .length,
      icon: CheckCircle,
      color: "bg-green-500",
    },
  ];

  return (
    <div className="p-6 space-y-6">
      <h1 className="font-heading text-2xl font-bold text-[#1B211E]">
        Admin Dashboard
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="bg-white border border-[#D8DBD3] rounded-lg p-4"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                  {stat.label}
                </p>
                <p className="font-heading text-2xl font-bold text-[#1B211E] mt-1">
                  {stat.value}
                </p>
              </div>
              <div
                className={`${stat.color} w-10 h-10 rounded-lg flex items-center justify-center`}
              >
                <stat.icon className="w-5 h-5 text-white" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
