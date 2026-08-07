export default function TenantDashboardLoading() {
  return (
    <div className="p-6 space-y-6">
      <div className="h-8 bg-muted rounded w-48 animate-pulse" />

      {/* Stat cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="bg-card rounded-lg border p-6 space-y-3 animate-pulse">
            <div className="h-4 bg-muted rounded w-24" />
            <div className="h-8 bg-muted rounded w-16" />
          </div>
        ))}
      </div>

      {/* Recent requests */}
      <div className="bg-card rounded-lg border p-6 space-y-4">
        <div className="h-5 bg-muted rounded w-40 animate-pulse" />
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="flex items-center gap-4 animate-pulse">
            <div className="h-10 w-10 bg-muted rounded-full" />
            <div className="flex-1 space-y-2">
              <div className="h-4 bg-muted rounded w-1/3" />
              <div className="h-3 bg-muted rounded w-1/4" />
            </div>
            <div className="h-6 bg-muted rounded-full w-20" />
          </div>
        ))}
      </div>
    </div>
  );
}