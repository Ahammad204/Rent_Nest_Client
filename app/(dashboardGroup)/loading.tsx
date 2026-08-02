export default function DashboardLoading() {
  return (
    <div className="flex min-h-[calc(100svh-4rem)]">
      {/* Sidebar skeleton */}
      <div className="hidden md:block w-64 border-r bg-white p-4 space-y-3 animate-pulse">
        <div className="h-6 bg-gray-200 rounded w-32" />
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="h-8 bg-gray-200 rounded w-full" />
        ))}
      </div>

      {/* Content area */}
      <div className="flex-1 p-6 space-y-6">
        {/* Page title */}
        <div className="h-8 bg-gray-200 rounded w-48 animate-pulse" />

        {/* Stat cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="bg-white rounded-lg border p-6 space-y-3 animate-pulse"
            >
              <div className="h-4 bg-gray-200 rounded w-24" />
              <div className="h-8 bg-gray-200 rounded w-16" />
            </div>
          ))}
        </div>

        {/* Table skeleton */}
        <div className="bg-white rounded-lg border overflow-hidden">
          <div className="p-4 border-b">
            <div className="h-5 bg-gray-200 rounded w-40 animate-pulse" />
          </div>
          <div className="divide-y">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="p-4 flex gap-4 animate-pulse">
                <div className="h-4 bg-gray-200 rounded w-1/4" />
                <div className="h-4 bg-gray-200 rounded w-1/4" />
                <div className="h-4 bg-gray-200 rounded w-1/6" />
                <div className="h-4 bg-gray-200 rounded w-1/6" />
                <div className="h-4 bg-gray-200 rounded w-1/6" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
