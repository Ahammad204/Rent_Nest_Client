"use client";

import { Building2, ShieldCheck, Users, MapPin } from "lucide-react";
import { BlueprintCard } from "@/components/BlueprintCard";

interface TrustStatsBarProps {
  activeListingsCount: number;
}

export function TrustStatsBar({ activeListingsCount }: TrustStatsBarProps) {
  const stats = [
    {
      number: `${activeListingsCount}+`,
      label: "Active Listings",
      icon: Building2,
    },
    { number: "480+", label: "Verified Landlords", icon: ShieldCheck },
    { number: "1,240+", label: "Happy Tenants", icon: Users },
    { number: "12", label: "Cities Covered", icon: MapPin },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 sm:-mt-10 lg:-mt-12 relative z-30">
      <BlueprintCard className="p-4 sm:p-6 shadow-md" accentTick>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 divide-y sm:divide-y-0 sm:divide-x divide-[border]">
          {stats.map((stat, idx) => {
            const IconComp = stat.icon;
            return (
              <div
                key={stat.label}
                className={`flex flex-col items-center text-center ${idx > 0 ? "pt-3 sm:pt-0" : ""}`}
              >
                <div className="flex items-center gap-1.5 text-secondary mb-1">
                  <IconComp className="w-4 h-4" />
                </div>
                <div className="font-mono-spec text-2xl sm:text-3xl font-bold text-primary tracking-tight">
                  {stat.number}
                </div>
                <div className="text-xs sm:text-sm text-foreground/80 font-medium mt-0.5">
                  {stat.label}
                </div>
              </div>
            );
          })}
        </div>
      </BlueprintCard>
    </div>
  );
}
