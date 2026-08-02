import Link from "next/link";
import { getProperties } from "./_actions/propertyActions";
import { PropertyGrid } from "./_components/PropertyGrid";
import { Hero } from "./_components/Hero";
import { ArrowRight } from "lucide-react";
import { TrustStatsBar } from "./_components/TrustStatsBar";

export default async function Home() {
  const res = await getProperties({ page: "1", limit: "6" });
  const properties = res.data?.properties || [];
  const total = res.meta?.total || 0;

  return (
    <div className="min-h-screen bg-[#F4F5F1]">
      <Hero totalListingsCount={total} featuredProperties={properties.slice(0, 3)} />
      <TrustStatsBar activeListingsCount={total} />


      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Property Grid */}
        <PropertyGrid properties={properties} />
        <div className="mt-10 text-center">
          <Link
            href="/properties"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#1F4D3E] hover:bg-[#173B2F] text-white font-mono-spec font-bold text-xs rounded-md transition-colors"
          >
            <span>BROWSE ALL PROPERTIES</span>
            <ArrowRight className="w-4 h-4 text-[#C98A2C]" />
          </Link>
        </div>
      </div>
    </div>
  );
}