
import { Building, FileText, CheckCircle } from "lucide-react";
import { getLandlordProperties, getLandlordRentalRequests } from "../_actions/dashboardActions";

export default async function LandlordDashboardPage() {
  const [propertiesRes, requestsRes] = await Promise.all([
    getLandlordProperties(),
    getLandlordRentalRequests(),
  ]);

  const properties = propertiesRes.data?.properties || [];
  const requests = requestsRes.data?.requests || [];

  const stats = [
    {
      label: "My Properties",
      value: properties.length,
      icon: Building,
      color: "bg-[#1F4D3E]",
    },
    {
      label: "Total Requests",
      value: requests.length,
      icon: FileText,
      color: "bg-blue-500",
    },
    {
      label: "Pending",
      value: requests.filter((r: { status: string }) => r.status === "PENDING")
        .length,
      icon: FileText,
      color: "bg-yellow-500",
    },
    {
      label: "Active Rentals",
      value: requests.filter((r: { status: string }) => r.status === "ACTIVE")
        .length,
      icon: CheckCircle,
      color: "bg-green-500",
    },
  ];

  return (
    <div className="p-6 space-y-6">
      <h1 className="font-heading text-2xl font-bold text-[#1B211E]">
        Landlord Dashboard
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
