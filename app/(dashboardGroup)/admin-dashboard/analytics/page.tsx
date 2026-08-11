import { getAdminStats } from "../../_actions/dashboardActions";
import {
  UsersByRoleChart,
  PropertiesByCategoryChart,
  RentalsByStatusChart,
  MonthlyRevenueChart,
} from "./AnalyticsCharts";
import {
  Users,
  Building,
  FileText,
  DollarSign,
  Star,
  TrendingUp,
} from "lucide-react";

export const metadata = {
  title: "Analytics | Thikana Admin",
};

export const dynamic = "force-dynamic";

export default async function AnalyticsPage() {
  const res = await getAdminStats();
  const stats = res.data;

  if (!stats) {
    return (
      <div className="p-6">
        <h1 className="font-heading text-2xl font-bold text-foreground">
          Analytics
        </h1>
        <p className="text-muted-foreground mt-4">Failed to load analytics data.</p>
      </div>
    );
  }

  const { overview, usersByRole, propertiesByCategory, rentalsByStatus, monthlyRevenue } = stats;

  const overviewCards = [
    {
      label: "Total Users",
      value: overview.totalUsers,
      icon: Users,
      color: "bg-primary",
    },
    {
      label: "Total Properties",
      value: overview.totalProperties,
      icon: Building,
      color: "bg-blue-500",
    },
    {
      label: "Total Rentals",
      value: overview.totalRentals,
      icon: FileText,
      color: "bg-purple-500",
    },
    {
      label: "Total Reviews",
      value: overview.totalReviews,
      icon: Star,
      color: "bg-yellow-500",
    },
    {
      label: "Total Revenue",
      value: `৳${overview.totalRevenue.toLocaleString()}`,
      icon: DollarSign,
      color: "bg-emerald-600",
    },
  ];

  return (
    <div className="p-6 space-y-6">
      <h1 className="font-heading text-2xl font-bold text-foreground">
        Analytics
      </h1>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
        {overviewCards.map((stat) => (
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

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-card border border-border rounded-lg p-6">
          <h2 className="font-heading text-lg font-bold text-foreground mb-4 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-primary" />
            Monthly Revenue
          </h2>
          <MonthlyRevenueChart data={monthlyRevenue} />
        </div>

        <div className="bg-card border border-border rounded-lg p-6">
          <h2 className="font-heading text-lg font-bold text-foreground mb-4 flex items-center gap-2">
            <Users className="w-5 h-5 text-primary" />
            Users by Role
          </h2>
          <UsersByRoleChart data={usersByRole} />
        </div>

        <div className="bg-card border border-border rounded-lg p-6">
          <h2 className="font-heading text-lg font-bold text-foreground mb-4 flex items-center gap-2">
            <Building className="w-5 h-5 text-primary" />
            Properties by Category
          </h2>
          <PropertiesByCategoryChart data={propertiesByCategory} />
        </div>

        <div className="bg-card border border-border rounded-lg p-6">
          <h2 className="font-heading text-lg font-bold text-foreground mb-4 flex items-center gap-2">
            <FileText className="w-5 h-5 text-primary" />
            Rentals by Status
          </h2>
          <RentalsByStatusChart data={rentalsByStatus} />
        </div>
      </div>
    </div>
  );
}