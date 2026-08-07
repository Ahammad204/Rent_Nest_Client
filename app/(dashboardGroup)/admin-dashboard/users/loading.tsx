export default function AdminUsersLoading() {
  return (
    <div className="p-6 space-y-6">
      <div className="h-8 bg-muted rounded w-48 animate-pulse" />

      <div className="bg-card rounded-lg border overflow-hidden">
        <div className="p-4 border-b flex gap-4">
          <div className="h-10 bg-muted rounded flex-1 animate-pulse" />
          <div className="h-10 bg-muted rounded w-32 animate-pulse" />
        </div>
        <div className="divide-y">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="p-4 flex gap-4 animate-pulse">
              <div className="h-4 bg-muted rounded w-1/5" />
              <div className="h-4 bg-muted rounded w-1/4" />
              <div className="h-4 bg-muted rounded w-1/8" />
              <div className="h-4 bg-muted rounded w-1/8" />
              <div className="h-4 bg-muted rounded w-1/6" />
              <div className="h-4 bg-muted rounded w-1/8" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
