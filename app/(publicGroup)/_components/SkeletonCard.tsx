export function SkeletonCard() {
  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden animate-pulse">
      {/* Image placeholder */}
      <div className="w-full h-48 bg-muted" />

      {/* Content placeholder */}
      <div className="p-4 space-y-3">
        <div className="h-4 bg-muted rounded w-3/4" />
        <div className="h-3 bg-muted rounded w-1/2" />
        <div className="h-3 bg-muted rounded w-1/4" />
        <div className="pt-3 mt-3 border-t border-border">
          <div className="h-5 bg-muted rounded w-1/3" />
        </div>
      </div>
    </div>
  );
}
