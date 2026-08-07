"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Search,
  MapPin,
  Building2,
  Banknote,
  BedDouble,
  RotateCcw,
  Home,
  ShieldCheck,
} from "lucide-react";
import type { SearchFilters, PropertyType, IProperty } from "@/lib/types";
import { BlueprintCard } from "@/components/BlueprintCard";

const NEIGHBORHOODS_DHAKA = [
  "All Neighborhoods",
  "Gulshan",
  "Dhanmondi",
  "Uttara",
  "Banani",
  "Mirpur",
  "Mohammadpur",
];
const NEIGHBORHOODS_CHATTOGRAM = [
  "All Neighborhoods",
  "Gulshan",
  "Nasirabad",
  "Agrabad",
  "GEC",
];

interface HeroProps {
  totalListingsCount: number;
  featuredProperties?: IProperty[];
}

export function Hero({
  totalListingsCount,
  featuredProperties = [],
}: HeroProps) {
  const router = useRouter();
  const [filters, setFilters] = useState<SearchFilters>({
    city: "All",
    neighborhood: "",
    propertyType: "All",
    minPrice: 0,
    maxPrice: 100000,
    bedrooms: "any",
    searchQuery: "",
  });

  const handleInputChange = (
    field: keyof SearchFilters,
    value: string | number,
  ) => {
    setFilters((prev) => ({ ...prev, [field]: value }));
  };

  const handleSearch = () => {
    const params = new URLSearchParams();

    // Combine city + neighborhood into location
    const locationParts: string[] = [];
    if (filters.searchQuery) locationParts.push(filters.searchQuery);
    if (filters.neighborhood) locationParts.push(filters.neighborhood);
    if (filters.city !== "All") locationParts.push(filters.city);
    if (locationParts.length > 0)
      params.set("location", locationParts.join(", "));

    if (filters.propertyType !== "All")
      params.set("propertyType", filters.propertyType);
    if (filters.maxPrice < 100000)
      params.set("maxPrice", filters.maxPrice.toString());
    if (filters.minPrice > 0)
      params.set("minPrice", filters.minPrice.toString());

    params.set("page", "1");
    router.push(`/properties?${params.toString()}`);
  };

  const handleReset = () => {
    setFilters({
      city: "All",
      neighborhood: "",
      propertyType: "All",
      minPrice: 0,
      maxPrice: 100000,
      bedrooms: "any",
      searchQuery: "",
    });
    router.push("/properties");
  };

  const neighborhoods =
    filters.city === "Dhaka"
      ? NEIGHBORHOODS_DHAKA
      : filters.city === "Chattogram"
        ? NEIGHBORHOODS_CHATTOGRAM
        : [
            ...new Set([
              ...NEIGHBORHOODS_DHAKA.slice(1),
              ...NEIGHBORHOODS_CHATTOGRAM.slice(1),
            ]),
          ];
  return (
   <section className="relative min-h-[60vh] flex items-center pt-6 pb-12 sm:pb-16 px-4 sm:px-6 lg:px-8 border-b border-border bg-[background]">
      {/* Background Dot Grid Pattern */}
      <div
        className="absolute inset-0 opacity-15 pointer-events-none -z-10"
        style={{
          backgroundImage: `radial-gradient(primary 1px, transparent 1px)`,
          backgroundSize: "24px 24px",
        }}
      />

      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column */}
          <div className="lg:col-span-7 space-y-5">
            {/* Spec Badge */}
            <div className="inline-flex items-center gap-2 font-mono-spec text-xs tracking-widest text-primary bg-card border border-border px-3 py-1 rounded-md shadow-xs">
              <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
              <span>RENTAL BLUEPRINT • BD MARKET</span>
              <span className="text-[border]">•</span>
              <span className="font-bold">
                {totalListingsCount} VERIFIED HOMES
              </span>
            </div>

            <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground leading-tight">
              Find your next home in{" "}
              <span className="text-primary underline decoration-[secondary] underline-offset-4">
                {filters.city === "All" ? "Bangladesh" : filters.city}
              </span>
            </h1>

            <p className="text-sm sm:text-base text-foreground/80 max-w-xl font-normal leading-relaxed">
              Direct landlord listings, clear BDT pricing, verified property
              floor plans, and transparent move-in specs across Dhaka,
              Chattogram, and major hubs.
            </p>

            {/* Search Bar Card */}
            <BlueprintCard
              className="p-4 sm:p-5 text-foreground shadow-sm bg-card"
              accentTick
            >
              {/* City Tabs */}
              <div className="flex items-center gap-2 mb-4 pb-3 border-b border-border">
                <span className="font-mono-spec text-xs text-primary font-semibold">
                  LOCATION:
                </span>
                {(["All", "Dhaka", "Chattogram"] as const).map((city) => (
                  <button
                    key={city}
                    type="button"
                    onClick={() => handleInputChange("city", city)}
                    className={`h-7 px-3 text-xs font-semibold rounded-lg border transition-all ${
                      filters.city === city
                        ? "bg-primary text-white border-primary hover:bg-primary/80"
                        : "bg-[background] text-foreground border-border hover:bg-[border]/50"
                    }`}
                  >
                    {city === "All" ? "All Bangladesh" : city}
                  </button>
                ))}
              </div>

              {/* Filter Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                <div className="space-y-1">
                  <label className="font-mono-spec text-[10px] text-primary font-medium flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-secondary" />
                    AREA / NEIGHBORHOOD
                  </label>
                  <select
                    value={filters.neighborhood}
                    onChange={(e) =>
                      handleInputChange("neighborhood", e.target.value)
                    }
                    className="w-full bg-[background] border border-border rounded-md px-3 py-2 text-xs font-medium text-foreground focus:outline-none focus:border-primary"
                  >
                    <option value="">All Areas</option>
                    {neighborhoods.map((n) => (
                      <option
                        key={n}
                        value={n === "All Neighborhoods" ? "" : n}
                      >
                        {n}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="font-mono-spec text-[10px] text-primary font-medium flex items-center gap-1">
                    <Building2 className="w-3 h-3 text-secondary" />
                    PROPERTY TYPE
                  </label>
                  <select
                    value={filters.propertyType}
                    onChange={(e) =>
                      handleInputChange(
                        "propertyType",
                        e.target.value as PropertyType,
                      )
                    }
                    className="w-full bg-[background] border border-border rounded-md px-3 py-2 text-xs font-medium text-foreground focus:outline-none focus:border-primary"
                  >
                    <option value="All">All Types</option>
                    <option value="Apartment">Apartment / Flat</option>
                    <option value="House">Independent House</option>
                    <option value="Studio">Studio Flat</option>
                    <option value="Room">Single Room</option>
                    <option value="Sublet">Sublet / Seat</option>
                    <option value="Duplex">Duplex Unit</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="font-mono-spec text-[10px] text-primary font-medium flex items-center gap-1">
                    <Banknote className="w-3 h-3 text-secondary" />
                    MAX RENT (BDT)
                  </label>
                  <select
                    value={filters.maxPrice}
                    onChange={(e) =>
                      handleInputChange("maxPrice", Number(e.target.value))
                    }
                    className="w-full bg-[background] border border-border rounded-md px-3 py-2 text-xs font-medium text-foreground focus:outline-none focus:border-primary"
                  >
                    <option value={100000}>Any Budget</option>
                    <option value={20000}>Up to 20,000 / mo</option>
                    <option value={30000}>Up to 30,000 / mo</option>
                    <option value={40000}>Up to 40,000 / mo</option>
                    <option value={50000}>Up to 50,000 / mo</option>
                    <option value={65000}>Up to 65,000 / mo</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="font-mono-spec text-[10px] text-primary font-medium flex items-center gap-1">
                    <BedDouble className="w-3 h-3 text-secondary" />
                    BEDROOMS
                  </label>
                  <select
                    value={filters.bedrooms}
                    onChange={(e) =>
                      handleInputChange(
                        "bedrooms",
                        e.target.value === "any"
                          ? "any"
                          : Number(e.target.value),
                      )
                    }
                    className="w-full bg-[background] border border-border rounded-md px-3 py-2 text-xs font-medium text-foreground focus:outline-none focus:border-primary"
                  >
                    <option value="any">Any Beds</option>
                    <option value={1}>1 Bed</option>
                    <option value={2}>2 Beds</option>
                    <option value={3}>3 Beds</option>
                    <option value={4}>4+ Beds</option>
                  </select>
                </div>
              </div>

              {/* Bottom Search & Buttons */}
              <div className="mt-4 pt-3 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="relative w-full sm:w-2/3">
                  <Search className="w-4 h-4 text-muted-foreground/60 absolute left-3 top-2.5 z-10" />
                  <input
                    type="text"
                    value={filters.searchQuery}
                    onChange={(e) =>
                      handleInputChange("searchQuery", e.target.value)
                    }
                    onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                    placeholder="Search area, road, or landlord..."
                    className="w-full h-9 pl-9 pr-3 text-xs bg-[background] border border-border rounded-lg text-foreground focus:outline-none focus:border-primary"
                  />
                </div>
                <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                  <button
                    type="button"
                    onClick={handleReset}
                    className="h-9 px-3 text-xs font-medium border border-border text-foreground hover:bg-muted rounded-lg inline-flex items-center gap-1"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    Reset
                  </button>
                  <button
                    type="button"
                    onClick={handleSearch}
                    className="h-9 px-5 bg-primary hover:bg-primary/80 text-white text-xs font-semibold rounded-lg inline-flex items-center gap-1.5"
                  >
                    <Search className="w-3.5 h-3.5" />
                    Find Properties
                  </button>
                </div>
              </div>
            </BlueprintCard>
          </div>

          {/* Right Column: Photo Collage */}
          <div className="lg:col-span-5 relative min-h-95 sm:min-h-105 flex items-center justify-center pt-4 lg:pt-0">
            <div className="absolute inset-0 bg-primary/5 rounded-xl -rotate-1 border border-primary/10 pointer-events-none" />

            {featuredProperties.length > 0 ? (
              <>
                {/* Card layouts: position, rotation, z-index */}
                {[
                  {
                    pos: "top-0 left-0 w-[72%] sm:w-[68%] z-20 shadow-md transform -rotate-2 hover:rotate-0",
                    aspect: "aspect-[4/3]",
                    badgePos: "top-2 left-2",
                    badgeBg: "bg-primary",
                    badgeIcon: true,
                  },
                  {
                    pos: "top-8 right-0 w-[62%] sm:w-[58%] z-30 shadow-lg transform rotate-3 hover:rotate-1",
                    aspect: "aspect-[4/3]",
                    badgePos: "top-2 right-2",
                    badgeBg: "bg-black/60 border border-white/30",
                    badgeIcon: false,
                  },
                  {
                    pos: "bottom-2 left-8 w-[68%] sm:w-[64%] z-40 shadow-xl transform -rotate-1 hover:rotate-0",
                    aspect: "aspect-video",
                    badgePos: "top-2 left-2",
                    badgeBg: "bg-secondary",
                    badgeIcon: false,
                  },
                ].map((layout, i) => {
                  const p = featuredProperties[i];
                  if (!p) return null;
                  const img = p.images?.[0] || null;
                  return (
                    <div
                      key={p.id}
                      className={`absolute ${layout.pos} transition-transform duration-300`}
                    >
                      <BlueprintCard className="bg-card p-2" accentTick>
                        <div
                          className={`relative ${layout.aspect} rounded overflow-hidden bg-[background]`}
                        >
                          {img ? (
                            <img
                              src={img}
                              alt={p.title}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center">
                              <Home className="w-10 h-10 text-muted-foreground/40" />
                            </div>
                          )}
                          <div className={`absolute ${layout.badgePos}`}>
                            <span
                              className={`inline-flex items-center gap-0.5 ${layout.badgeBg} text-white text-[9px] font-mono-spec px-1.5 py-0.5 rounded`}
                            >
                              {layout.badgeIcon && (
                                <ShieldCheck className="w-3 h-3 mr-0.5 text-secondary" />
                              )}
                              {p.propertyType.toUpperCase()}
                            </span>
                          </div>
                          <div className="absolute bottom-2 left-2 right-2 bg-black/70 backdrop-blur-sm text-white p-2 rounded text-xs flex items-center justify-between">
                            <div className="min-w-0">
                              <div className="font-heading font-bold text-xs truncate">
                                {p.title}
                              </div>
                              <div className="font-mono-spec text-[10px] text-white/80 truncate">
                                {p.location.toUpperCase()}
                              </div>
                            </div>
                            <div className="font-mono-spec font-bold text-secondary text-xs whitespace-nowrap ml-2">
                              ৳{p.price.toLocaleString()}
                              <span className="text-[9px] font-normal text-white/70">
                                /MO
                              </span>
                            </div>
                          </div>
                        </div>
                      </BlueprintCard>
                    </div>
                  );
                })}
              </>
            ) : (
              /* Fallback when no properties exist yet */
              <div className="absolute inset-0 flex items-center justify-center">
                <BlueprintCard className="p-8 bg-card text-center" accentTick>
                  <Home className="w-12 h-12 text-primary mx-auto mb-3" />
                  <p className="font-heading font-bold text-sm text-foreground">
                    Properties Coming Soon
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Browse our listings to find your next home
                  </p>
                </BlueprintCard>
              </div>
            )}

            {/* Floating Badge */}
            <div className="absolute -bottom-3 right-4 z-50 bg-primary text-white px-3 py-1.5 rounded border border-[primary/80] shadow-md flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span className="font-mono-spec text-[10px] uppercase font-bold tracking-wider">
                DIRECT LANDLORD LISTINGS
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
