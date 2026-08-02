"use client";

import { useRouter } from "next/navigation";
import { ArrowUpRight, MapPin } from "lucide-react";
import { BlueprintCard } from "@/components/BlueprintCard";

const citiesData = [
  {
    name: "Dhaka",
    subtitle: "Capital & Financial Hub",
    listingsCount: "248 LISTINGS",
    image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80",
    popularAreas: "Gulshan, Banani, Dhanmondi",
  },
  {
    name: "Chattogram",
    subtitle: "Port City & Business Center",
    listingsCount: "134 LISTINGS",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
    popularAreas: "GEC, Nasirabad, Agrabad",
  },
  {
    name: "Sylhet",
    subtitle: "Green Valleys & Tech Hubs",
    listingsCount: "42 LISTINGS",
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80",
    popularAreas: "Zindabazar, Upashahar, Shibganj",
  },
  {
    name: "Cox's Bazar",
    subtitle: "Coastal Living & Tourism",
    listingsCount: "28 LISTINGS",
    image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=800&q=80",
    popularAreas: "Kolatoli, Sugandha Beach",
  },
  {
    name: "Rajshahi",
    subtitle: "Education & Clean City",
    listingsCount: "32 LISTINGS",
    image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=800&q=80",
    popularAreas: "Kazla, Motihar, Padma Par",
  },
];

export function FeaturedLocations() {
  const router = useRouter();

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 border-t border-[#D8DBD3] bg-[#F4F5F1]">
      <div className="max-w-7xl mx-auto space-y-6">

        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-b border-[#D8DBD3] pb-4">
          <div>
            <div className="font-mono-spec text-xs text-[#C98A2C] font-semibold tracking-widest uppercase mb-1 flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-[#1F4D3E]" />
              EXPLORE BANGLADESH
            </div>
            <h2 className="font-heading text-2xl sm:text-3xl font-bold text-[#1B211E]">
              Browse by City
            </h2>
          </div>
          <p className="text-xs text-[#1B211E]/70 max-w-sm">
            Select a key city to view verified neighborhood listings, average rent specs, and available flats.
          </p>
        </div>

        {/* City Cards Grid / Horizontal Scroll on Mobile */}
        <div className="flex overflow-x-auto gap-4 snap-x pb-4 md:grid md:grid-cols-5 md:overflow-visible">
          {citiesData.map((city) => (
            <div
              key={city.name}
              onClick={() => router.push(`/properties?location=${city.name}`)}
              className="min-w-[240px] md:min-w-0 snap-start cursor-pointer group"
            >
              <BlueprintCard className="p-2 h-full" accentTick>
                <div className="relative aspect-[4/3] rounded overflow-hidden mb-3">
                  <img
                    src={city.image}
                    alt={city.name}
                    className="w-full h-full object-cover group-hover/card:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                  <div className="absolute top-2 left-2">
                    <span className="font-mono-spec text-[9px] bg-[#1F4D3E] text-white px-2 py-0.5 rounded border border-[#173B2F] font-semibold">
                      {city.listingsCount}
                    </span>
                  </div>

                  <div className="absolute bottom-2 left-2 right-2 text-white">
                    <div className="font-heading font-bold text-base flex items-center justify-between">
                      <span>{city.name}</span>
                      <ArrowUpRight className="w-4 h-4 text-[#C98A2C] group-hover/card:translate-x-0.5 group-hover/card:-translate-y-0.5 transition-transform" />
                    </div>
                    <div className="text-[10px] text-white/80 truncate">
                      {city.subtitle}
                    </div>
                  </div>
                </div>

                <div className="px-1 pb-1">
                  <div className="font-mono-spec text-[10px] text-[#1F4D3E] font-semibold uppercase">
                    Key Hubs:
                  </div>
                  <div className="text-xs text-[#1B211E]/80 truncate">
                    {city.popularAreas}
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