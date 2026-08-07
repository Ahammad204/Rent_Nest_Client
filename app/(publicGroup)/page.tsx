import Link from "next/link";
import {
  getFeaturedLocations,
  getProperties,
  getReviewsByProperty,
} from "./_actions/propertyActions";
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
import { getMe } from "@/service/getMe";
import { HomeReviewForm } from "./_components/HomeReviewForm";

export default async function Home() {
  const res = await getProperties({ page: "1", limit: "6" });
  const properties = res.data?.properties || [];
  const total = res.meta?.total || 0;

  // Fetch reviews for first 3 properties in parallel
  const topProperties = properties.slice(0, 3);
  const reviewsResults = await Promise.all(
    topProperties.map((p: IProperty) => getReviewsByProperty(p.id)),
  );

  // Flatten, filter for comments, sort by rating desc, pick top 3
  const allReviews = reviewsResults
    .flatMap((r, i) =>
      (r.data?.reviews || []).map((review: IReview) => ({
        ...review,
        propertyLocation: topProperties[i].location,
      })),
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

  const locationsRes = await getFeaturedLocations();
  const locations = locationsRes.data?.locations || [];
  const userRes = await getMe();
  const user = userRes.success ? userRes.data.profile : null;

  return (
    <div className="min-h-screen bg-[background]">
      <Hero
        totalListingsCount={total}
        featuredProperties={properties.slice(0, 3)}
      />
      <TrustStatsBar activeListingsCount={total} />
      <FeaturedLocations locations={locations} />

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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center max-w-2xl mx-auto space-y-2 mb-8">
          <div className="font-mono-spec text-xs text-secondary font-semibold tracking-widest uppercase">
            YOUR FEEDBACK
          </div>
          <h2 className="font-heading text-2xl sm:text-3xl font-bold text-foreground">
            Leave a Review
          </h2>
        </div>
        <div className="max-w-lg mx-auto">
          <HomeReviewForm user={user} />
        </div>
      </div>
      <FaqSection />
      <NewsletterCta />
    </div>
  );
}
