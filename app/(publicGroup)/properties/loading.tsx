import { SkeletonGrid } from "../_components/SkeletonGrid";

export default function Loading() {
  return (
    <div className="min-h-screen bg-[background]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header skeleton */}
        <div className="mb-6 space-y-2 animate-pulse">
          <div className="h-8 bg-muted rounded w-64" />
          <div className="h-4 bg-muted rounded w-48" />
        </div>

        {/* Filter skeleton */}
        <div className="bg-card border border-border rounded-lg p-4 mb-6 animate-pulse">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            <div className="lg:col-span-2 h-10 bg-muted rounded" />
            <div className="h-10 bg-muted rounded" />
            <div className="h-10 bg-muted rounded" />
            <div className="h-10 bg-muted rounded" />
          </div>
        </div>

        {/* Grid skeleton */}
        <SkeletonGrid count={9} />
      </div>
    </div>
  );
}
