export default function LandlordPropertiesLoading() {
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div className="h-8 bg-muted rounded w-48 animate-pulse" />
        <div className="h-10 bg-muted rounded w-36 animate-pulse" />
      </div>

      <div className="space-y-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <div
            key={i}
            className="bg-card rounded-lg border p-4 flex items-center gap-4 animate-pulse"
          >
            <div className="h-20 w-28 bg-muted rounded" />
            <div className="flex-1 space-y-2">
              <div className="h-4 bg-muted rounded w-1/3" />
              <div className="h-3 bg-muted rounded w-1/4" />
              <div className="h-3 bg-muted rounded w-1/6" />
            </div>
            <div className="h-6 bg-muted rounded-full w-20" />
          </div>
        ))}
      </div>
    </div>
  );
}
