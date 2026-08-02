"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  page: number;
  total: number;
  limit: number;
}

export function Pagination({ page, total, limit }: PaginationProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const totalPages = Math.ceil(total / limit);

  if (totalPages <= 1) return null;

  const goToPage = (newPage: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", newPage.toString());
    router.push(`/properties?${params.toString()}`);
  };

  const getPages = () => {
    const pages: (number | "...")[] = [];
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      if (page > 3) pages.push("...");
      for (
        let i = Math.max(2, page - 1);
        i <= Math.min(totalPages - 1, page + 1);
        i++
      ) {
        pages.push(i);
      }
      if (page < totalPages - 2) pages.push("...");
      pages.push(totalPages);
    }
    return pages;
  };

  return (
    <div className="mt-8 flex items-center justify-center gap-1 flex-wrap">
      <button
        onClick={() => goToPage(page - 1)}
        disabled={page <= 1}
        className="p-2 rounded-md border border-[#D8DBD3] hover:bg-[#F4F5F1] disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
      >
        <ChevronLeft className="w-4 h-4" />
      </button>

      {getPages().map((p, i) =>
        p === "..." ? (
          <span key={`dots-${i}`} className="px-2 text-gray-400 text-sm">
            ...
          </span>
        ) : (
          <button
            key={p}
            onClick={() => goToPage(p)}
            className={`w-8 h-8 rounded-md text-sm font-medium transition-colors cursor-pointer ${
              p === page
                ? "bg-[#1F4D3E] text-white"
                : "border border-[#D8DBD3] text-gray-600 hover:bg-[#F4F5F1]"
            }`}
          >
            {p}
          </button>
        ),
      )}

      <button
        onClick={() => goToPage(page + 1)}
        disabled={page >= totalPages}
        className="p-2 rounded-md border border-[#D8DBD3] hover:bg-[#F4F5F1] disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
      >
        <ChevronRight className="w-4 h-4" />
      </button>
    </div>
  );
}
