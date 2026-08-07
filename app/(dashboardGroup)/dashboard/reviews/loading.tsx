export default function ReviewsLoading() {
  return (
    <div className="p-6 space-y-6">
      <div className="h-8 bg-muted rounded w-48 animate-pulse" />

      <div className="space-y-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <div
            key={i}
            className="bg-card rounded-lg border p-6 space-y-4 animate-pulse"
          >
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 bg-muted rounded-full" />
              <div className="space-y-2">
                <div className="h-4 bg-muted rounded w-32" />
                <div className="h-3 bg-muted rounded w-24" />
              </div>
            </div>
            <div className="flex gap-1">
              {Array.from({ length: 5 }).map((_, j) => (
                <div key={j} className="h-5 w-5 bg-muted rounded" />
              ))}
            </div>
            <div className="h-16 bg-muted rounded w-full" />
          </div>
        ))}
      </div>
    </div>
  );
}
