import { SkeletonCard } from "./SkeletonCard";

interface SkeletonGridProps {
  count?: number;
}

export function SkeletonGrid({ count = 9 }: SkeletonGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  );
}
