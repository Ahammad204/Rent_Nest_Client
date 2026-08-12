import {
  Users,
  Building,
  FileText,
  CheckCircle,
  Clock,
  DollarSign,
  TrendingUp,
  Star,
} from "lucide-react";
import {
  getAllPropertiesAdmin,
  getAllRentalsAdmin,
  getAllUsers,
  getMyPayments,
  getAdminStats,
} from "../_actions/dashboardActions";
import { MonthlyRevenueChart, PropertiesByCategoryChart, RentalsByStatusChart, UsersByRoleChart } from "../_components/AnalyticsCharts";


export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  const [usersRes, propertiesRes, rentalsRes, paymentsRes, statsRes] =
    await Promise.all([
      getAllUsers(),
      getAllPropertiesAdmin(),
      getAllRentalsAdmin(),
      getMyPayments(),
      getAdminStats(),
    ]);

  const users = usersRes.data?.users || [];
  const properties = propertiesRes.data?.properties || [];
  const rentals = rentalsRes.data?.rentals || [];
  const payments = paymentsRes.data?.payments || [];
  const stats = statsRes.data;

  const pendingRequests = rentals.filter(
    (r: { status: string }) => r.status === "PENDING",
  ).length;

  const activeRentals = rentals.filter(
    (r: { status: string }) => r.status === "ACTIVE",
  ).length;

  const totalRevenue = payments
    .filter((p: { status: string }) => p.status === "COMPLETED")
    .reduce((sum: number, p: { amount: number }) => sum + p.amount, 0);

  const statCards = [
    {
      label: "Total Users",
      value: users.length,
      icon: Users,
      color: "bg-primary",
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
      color: "bg-purple-500",
    },
    {
      label: "Pending Requests",
      value: pendingRequests,
      icon: Clock,
      color: "bg-yellow-500",
    },
    {
      label: "Active Rentals",
      value: activeRentals,
      icon: CheckCircle,
      color: "bg-green-500",
    },
    {
      label: "Total Revenue",
      value: `৳${totalRevenue.toLocaleString()}`,
      icon: DollarSign,
      color: "bg-emerald-600",
    },
  ];

  return (
    <div className="p-6 space-y-6">
      <h1 className="font-heading text-2xl font-bold text-foreground">
        Admin Dashboard
      </h1>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {statCards.map((stat) => (
          <div
            key={stat.label}
            className="bg-card border border-border rounded-lg p-4"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
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

      {/* Charts */}
      {stats && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-card border border-border rounded-lg p-6">
            <h2 className="font-heading text-lg font-bold text-foreground mb-4 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-primary" />
              Monthly Revenue
            </h2>
            <MonthlyRevenueChart data={stats.monthlyRevenue} />
          </div>

          <div className="bg-card border border-border rounded-lg p-6">
            <h2 className="font-heading text-lg font-bold text-foreground mb-4 flex items-center gap-2">
              <Users className="w-5 h-5 text-primary" />
              Users by Role
            </h2>
            <UsersByRoleChart data={stats.usersByRole} />
          </div>

          <div className="bg-card border border-border rounded-lg p-6">
            <h2 className="font-heading text-lg font-bold text-foreground mb-4 flex items-center gap-2">
              <Building className="w-5 h-5 text-primary" />
              Properties by Category
            </h2>
            <PropertiesByCategoryChart data={stats.propertiesByCategory} />
          </div>

          <div className="bg-card border border-border rounded-lg p-6">
            <h2 className="font-heading text-lg font-bold text-foreground mb-4 flex items-center gap-2">
              <FileText className="w-5 h-5 text-primary" />
              Rentals by Status
            </h2>
            <RentalsByStatusChart data={stats.rentalsByStatus} />
          </div>
        </div>
      )}
    </div>
  );
}
