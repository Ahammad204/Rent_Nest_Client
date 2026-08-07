import { getMe } from "@/service/getMe";
import { Home, FileText, CreditCard, Star } from "lucide-react";
import { getMyPayments, getMyRentalRequests } from "../_actions/dashboardActions";

export default async function TenantDashboardPage() {
  const userRes = await getMe();
  const user = userRes.success ? userRes.data.profile : null;

  const [rentalsRes, paymentsRes] = await Promise.all([
    getMyRentalRequests(),
    getMyPayments(),
  ]);

  const rentals = rentalsRes.data?.requests || [];
  const payments = paymentsRes.data?.payments || [];

  const stats = [
    {
      label: "Total Requests",
      value: rentals.length,
      icon: FileText,
      color: "bg-blue-500",
    },
    {
      label: "Active Rentals",
      value: rentals.filter(
        (r: { status: string }) => r.status === "ACTIVE",
      ).length,
      icon: Home,
      color: "bg-green-500",
    },
    {
      label: "Pending Requests",
      value: rentals.filter(
        (r: { status: string }) => r.status === "PENDING",
      ).length,
      icon: FileText,
      color: "bg-yellow-500",
    },
    {
      label: "Payments Made",
      value: payments.length,
      icon: CreditCard,
      color: "bg-purple-500",
    },
  ];

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="font-heading text-2xl font-bold text-foreground">
          Welcome back, {user?.name}
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          Here`s an overview of your rental activity.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="bg-card border border-border rounded-lg p-4"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                  {stat.label}
                </p>
                <p className="font-heading text-2xl font-bold text-foreground mt-1">
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

      <div className="bg-card border border-border rounded-lg p-4">
        <h2 className="font-heading font-bold text-sm text-primary uppercase tracking-wider mb-3">
          Recent Requests
        </h2>
        {rentals.length === 0 ? (
          <p className="text-sm text-gray-500">
            No rental requests yet. Browse properties to get started.
          </p>
        ) : (
          <div className="space-y-2">
            {rentals.slice(0, 5).map(
              (rental: {
                id: string;
                status: string;
                property: { title: string; location: string };
              }) => (
                <div
                  key={rental.id}
                  className="flex items-center justify-between py-2 border-b border-[background] last:border-0"
                >
                  <div>
                    <p className="text-sm font-medium text-foreground">
                      {rental.property.title}
                    </p>
                    <p className="text-xs text-gray-500">
                      {rental.property.location}
                    </p>
                  </div>
                  <span
                    className={`px-2 py-0.5 text-[10px] font-bold uppercase rounded ${
                      rental.status === "ACTIVE"
                        ? "bg-green-100 text-green-700"
                        : rental.status === "PENDING"
                          ? "bg-yellow-100 text-yellow-700"
                          : rental.status === "REJECTED"
                            ? "bg-red-100 text-red-700"
                            : "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {rental.status}
                  </span>
                </div>
              ),
            )}
          </div>
        )}
      </div>
    </div>
  );
}