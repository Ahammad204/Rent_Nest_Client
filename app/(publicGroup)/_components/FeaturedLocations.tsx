"use client";

import { useRouter } from "next/navigation";
import { ArrowUpRight } from "lucide-react";
import { BlueprintCard } from "@/components/BlueprintCard";

interface FeaturedLocationsProps {
  locations: {
    name: string;
    listingsCount: number;
    popularAreas: string;
  }[];
}

export function FeaturedLocations({ locations }: FeaturedLocationsProps) {
  const router = useRouter();

  // City image mapping (fallback to a default)
  const cityImages: Record<string, string> = {
    Dhaka: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80",
    Chattogram: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
    Sylhet: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80",
    "Cox's Bazar": "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=800&q=80",
    Rajshahi: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=800&q=80",
  };
  const defaultImage = "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80";

  if (locations.length === 0) return null;

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 border-t border-border bg-background">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Section Header - same as before */}

        {/* City Cards */}
        <div className="flex overflow-x-auto gap-4 snap-x pb-4 md:grid md:grid-cols-5 md:overflow-visible">
          {locations.map((city) => (
            <div
              key={city.name}
              onClick={() => router.push(`/properties?location=${city.name}`)}
              className="min-w-60 md:min-w-0 snap-start cursor-pointer group"
            >
              <BlueprintCard className="p-2 h-full" accentTick>
                <div className="relative aspect-4/3 rounded overflow-hidden mb-3">
                  <img
                    src={cityImages[city.name] || defaultImage}
                    alt={city.name}
                    className="w-full h-full object-cover group-hover/card:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent" />
                  <div className="absolute bottom-2 left-2 right-2 text-white">
                    <div className="font-heading font-bold text-base flex items-center justify-between">
                      <span>{city.name}</span>
                      <ArrowUpRight className="w-4 h-4 text-secondary group-hover/card:translate-x-0.5 group-hover/card:-translate-y-0.5 transition-transform" />
                    </div>
                    <div className="text-[10px] text-white/80">
                      {city.listingsCount} LISTINGS
                    </div>
                  </div>
                </div>
                <div className="px-1 pb-1">
                  <div className="font-mono-spec text-[10px] text-primary font-semibold uppercase">
                    Key Hubs:
                  </div>
                  <div className="text-xs text-foreground/80 truncate">
                    {city.popularAreas || "Various areas"}
                  </div>
                </div>
              </BlueprintCard>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}