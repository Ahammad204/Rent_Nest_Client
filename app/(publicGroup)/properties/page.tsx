import { Suspense } from "react";
import { getProperties, getCategories } from "../_actions/propertyActions";
import { PropertyGrid } from "../_components/PropertyGrid";
import { PropertyFilters } from "../_components/PropertyFilters";
import { Pagination } from "../_components/Pagination";
import { SkeletonGrid } from "../_components/SkeletonGrid";

interface PropertiesPageProps {
  searchParams: Promise<{
    page?: string;
    limit?: string;
    location?: string;
    minPrice?: string;
    maxPrice?: string;
    propertyType?: string;
    categoryId?: string;
  }>;
}

export default async function PropertiesPage({
  searchParams,
}: PropertiesPageProps) {
  const params = await searchParams;
  const page = params.page || "1";
  const limit = params.limit || "9";

  const [propertiesRes, categoriesRes] = await Promise.all([
    getProperties({ ...params, page, limit }),
    getCategories(),
  ]);

  const properties = propertiesRes.data?.properties || [];
  const meta = propertiesRes.meta || { page: 1, limit: 9, total: 0 };
  const categories = categoriesRes.data?.categories || [];

  return (
    <div className="min-h-screen bg-[background]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-6">
          <h1 className="font-heading text-3xl font-bold text-foreground">
            Browse Properties
          </h1>
          <p className="mt-2 text-muted-foreground text-sm">
            {meta.total} {meta.total === 1 ? "property" : "properties"} found
          </p>
        </div>

        {/* Filters */}
        <PropertyFilters categories={categories} />

        {/* Grid */}
        <PropertyGrid properties={properties} />

        {/* Pagination */}
        <Pagination page={meta.page} total={meta.total} limit={meta.limit} />
      </div>
    </div>
  );
}
