import { Metadata } from "next";
import { BlueprintCard } from "@/components/BlueprintCard";
import { TrustStatsBar } from "../_components/TrustStatsBar";
import { getPublicStats } from "../_actions/propertyActions";

export const metadata: Metadata = {
  title: "About | Thikana",
  description:
    "Learn about Thikana — Bangladesh's premier rental property marketplace.",
};

const statsRes = await getPublicStats();
const stats = statsRes.data || {
  activeListings: 0,
  verifiedLandlords: 0,
  happyTenants: 0,
  citiesCount: 0,
};
export default function AboutPage() {
  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Hero */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <h1 className="font-heading text-3xl sm:text-4xl font-bold text-foreground">
            About Thikana
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
            Bangladesh`s premier rental property marketplace connecting tenants
            directly with verified landlords across Dhaka, Chattogram, and
            Sylhet.
          </p>
        </div>

        {/* Mission */}
        <BlueprintCard className="p-8 max-w-4xl mb-10 mx-auto" accentTick>
          <div className="space-y-4">
            <h2 className="font-heading text-xl font-bold text-foreground">
              Our Mission
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Thikana was built to eliminate the confusion and extra fees
              charged by media brokers in Bangladesh`s rental market. We provide
              a transparent platform where tenants can browse verified listings
              with clear BDT pricing, inspect floor plans online, and submit
              rental requests directly to landlords.
            </p>
          </div>
        </BlueprintCard>

        {/* Stats */}
        <TrustStatsBar
          activeListingsCount={stats.activeListings}
          verifiedLandlordsCount={stats.verifiedLandlords}
          happyTenantsCount={stats.happyTenants}
          citiesCount={stats.citiesCount}
        />

        {/* Values */}
        <div className="max-w-4xl mx-auto space-y-6">
          <h2 className="font-heading text-xl font-bold text-foreground text-center">
            Why Thikana?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: "Direct Landlord Access",
                desc: "No media brokers. Connect directly with verified property owners.",
              },
              {
                title: "Transparent BDT Pricing",
                desc: "Clear monthly rent, service charges, and utility specs in Bangladeshi Taka.",
              },
              {
                title: "Secure Payments",
                desc: "Pay deposits and rent securely through Stripe with digital invoices.",
              },
            ].map((item) => (
              <BlueprintCard key={item.title} className="p-5" accentTick>
                <h3 className="font-heading font-bold text-sm text-foreground mb-2">
                  {item.title}
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {item.desc}
                </p>
              </BlueprintCard>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
