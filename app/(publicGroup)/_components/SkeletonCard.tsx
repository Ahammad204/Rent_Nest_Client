export function SkeletonCard() {
  return (
    <div className="bg-white border border-[#D8DBD3] rounded-lg overflow-hidden animate-pulse">
      {/* Image placeholder */}
      <div className="w-full h-48 bg-gray-200" />

      {/* Content placeholder */}
      <div className="p-4 space-y-3">
        <div className="h-4 bg-gray-200 rounded w-3/4" />
        <div className="h-3 bg-gray-200 rounded w-1/2" />
        <div className="h-3 bg-gray-200 rounded w-1/4" />
        <div className="pt-3 mt-3 border-t border-[#D8DBD3]">
          <div className="h-5 bg-gray-200 rounded w-1/3" />
        </div>
      </div>
    </div>
  );
}
