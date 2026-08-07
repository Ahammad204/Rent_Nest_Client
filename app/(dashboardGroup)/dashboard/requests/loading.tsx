export default function RequestsLoading() {
  return (
    <div className="p-6 space-y-6">
      <div className="h-8 bg-muted rounded w-48 animate-pulse" />

      <div className="space-y-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="bg-card rounded-lg border p-4 flex items-center justify-between animate-pulse"
          >
            <div className="space-y-2">
              <div className="h-4 bg-muted rounded w-48" />
              <div className="h-3 bg-muted rounded w-32" />
            </div>
            <div className="h-6 bg-muted rounded-full w-24" />
          </div>
        ))}
      </div>
    </div>
  );
}
