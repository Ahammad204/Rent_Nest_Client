import Link from "next/link";
import { getProperties } from "./_actions/propertyActions";
import { PropertyGrid } from "./_components/PropertyGrid";
import { ArrowRight } from "lucide-react";

export default async function Home() {
  const res = await getProperties({ page: "1", limit: "6" });
  const properties = res.data?.properties || [];

  return (
    <div className="min-h-screen bg-[#F4F5F1]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="mb-8">
          <h1 className="font-heading text-3xl font-bold text-[#1B211E]">
            Find Your Perfect Home
          </h1>
          <p className="mt-2 text-gray-600 text-sm">
            Browse verified rental properties across Bangladesh.
          </p>
        </div>

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
