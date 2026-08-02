"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { Search, SlidersHorizontal } from "lucide-react";
import type { ICategory } from "@/lib/types";

interface PropertyFiltersProps {
  categories: ICategory[];
}

export function PropertyFilters({ categories }: PropertyFiltersProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [location, setLocation] = useState(searchParams.get("location") || "");
  const [minPrice, setMinPrice] = useState(searchParams.get("minPrice") || "");
  const [maxPrice, setMaxPrice] = useState(searchParams.get("maxPrice") || "");
  const [propertyType, setPropertyType] = useState(
    searchParams.get("propertyType") || "",
  );
  const [categoryId, setCategoryId] = useState(
    searchParams.get("categoryId") || "",
  );

  const applyFilters = () => {
    const params = new URLSearchParams();
    if (location) params.set("location", location);
    if (minPrice) params.set("minPrice", minPrice);
    if (maxPrice) params.set("maxPrice", maxPrice);
    if (propertyType) params.set("propertyType", propertyType);
    if (categoryId) params.set("categoryId", categoryId);
    params.set("page", "1"); // reset to page 1 on filter change
    router.push(`/properties?${params.toString()}`);
  };

  const clearFilters = () => {
    setLocation("");
    setMinPrice("");
    setMaxPrice("");
    setPropertyType("");
    setCategoryId("");
    router.push("/properties");
  };

  const inputClass =
    "w-full px-3 py-2 text-sm bg-white border border-[#D8DBD3] rounded-md text-[#1B211E] focus:outline-none focus:border-[#1F4D3E] focus:ring-1 focus:ring-[#1F4D3E] transition-colors";

  return (
    <div className="bg-white border border-[#D8DBD3] rounded-lg p-4 mb-6">
      <div className="flex items-center gap-2 mb-4">
        <SlidersHorizontal className="w-4 h-4 text-[#1F4D3E]" />
        <h3 className="font-heading font-bold text-sm text-[#1B211E]">
          FILTER PROPERTIES
        </h3>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {/* Location Search */}
        <div className="lg:col-span-2">
          <label className="block text-xs font-bold text-[#1F4D3E] uppercase tracking-wider mb-1.5">
            Location
          </label>
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search by location..."
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && applyFilters()}
              className={`${inputClass} pl-9`}
            />
          </div>
        </div>

        {/* Min Price */}
        <div>
          <label className="block text-xs font-bold text-[#1F4D3E] uppercase tracking-wider mb-1.5">
            Min Price
          </label>
          <input
            type="number"
            placeholder="৳ Min"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            className={inputClass}
          />
        </div>

        {/* Max Price */}
        <div>
          <label className="block text-xs font-bold text-[#1F4D3E] uppercase tracking-wider mb-1.5">
            Max Price
          </label>
          <input
            type="number"
            placeholder="৳ Max"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            className={inputClass}
          />
        </div>

        {/* Property Type */}
        <div>
          <label className="block text-xs font-bold text-[#1F4D3E] uppercase tracking-wider mb-1.5">
            Type
          </label>
          <select
            value={propertyType}
            onChange={(e) => setPropertyType(e.target.value)}
            className={inputClass}
          >
            <option value="">All Types</option>
            <option value="Apartment">Apartment</option>
            <option value="House">House</option>
            <option value="Room">Room</option>
            <option value="Office">Office</option>
          </select>
        </div>
      </div>

      {/* Category + Actions */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mt-4">
        <div>
          <label className="block text-xs font-bold text-[#1F4D3E] uppercase tracking-wider mb-1.5">
            Category
          </label>
          <select
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
            className={inputClass}
          >
            <option value="">All Categories</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-end gap-2 lg:col-span-4">
          <button
            onClick={applyFilters}
            className="px-4 py-2 bg-[#1F4D3E] hover:bg-[#173B2F] text-white text-xs font-bold rounded-md transition-colors cursor-pointer"
          >
            SEARCH
          </button>
          <button
            onClick={clearFilters}
            className="px-4 py-2 border border-[#D8DBD3] hover:bg-[#F4F5F1] text-gray-600 text-xs font-bold rounded-md transition-colors cursor-pointer"
          >
            CLEAR
          </button>
        </div>
      </div>
    </div>
  );
}
