import Link from "next/link";
import { getProperties, getReviewsByProperty } from "./_actions/propertyActions";
import { PropertyGrid } from "./_components/PropertyGrid";
import { Hero } from "./_components/Hero";
import { ArrowRight } from "lucide-react";
import { TrustStatsBar } from "./_components/TrustStatsBar";
import { FeaturedLocations } from "./_components/FeaturedLocations";
import { HowItWorks } from "./_components/HowItWorks";
import { IProperty, IReview, Testimonial } from "@/lib/types";
import { Testimonials } from "./_components/Testimonials";
import { FaqSection } from "./_components/FaqSection";
import { NewsletterCta } from "./_components/NewsletterCta";

export default async function Home() {
  const res = await getProperties({ page: "1", limit: "6" });
  const properties = res.data?.properties || [];
  const total = res.meta?.total || 0;

    // Fetch reviews for first 3 properties in parallel
  const topProperties = properties.slice(0, 3);
  const reviewsResults = await Promise.all(
    topProperties.map((p : IProperty) => getReviewsByProperty(p.id))
  );

  // Flatten, filter for comments, sort by rating desc, pick top 3
  const allReviews = reviewsResults
    .flatMap((r, i) =>
      (r.data?.reviews || []).map((review: IReview) => ({
        ...review,
        propertyLocation: topProperties[i].location,
      }))
    )
    .filter((r) => r.comment && r.rating >= 4)
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 3);

  // Map to Testimonial shape
  const testimonials: Testimonial[] = allReviews.map((r) => ({
    id: r.id,
    quote: r.comment,
    rating: r.rating,
    name: r.tenant?.name || "Anonymous Tenant",
    role: `Tenant, ${r.propertyLocation}`,
    avatar: null,
    badge: "TENANT VOICE",
  }));


  return (
    <div className="min-h-screen bg-[background]">
      <Hero
        totalListingsCount={total}
        featuredProperties={properties.slice(0, 3)}
      />
      <TrustStatsBar activeListingsCount={total} />
      <FeaturedLocations />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Property Grid */}
        <PropertyGrid properties={properties} />
        <div className="mt-10 text-center">
          <Link
            href="/properties"
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary hover:bg-primary/80 text-white font-mono-spec font-bold text-xs rounded-md transition-colors"
          >
            <span>BROWSE ALL PROPERTIES</span>
            <ArrowRight className="w-4 h-4 text-secondary" />
          </Link>
        </div>
      </div>
      
      <HowItWorks />
       <Testimonials reviews={testimonials} />
       <FaqSection />
       <NewsletterCta />
    </div>
  );
}
