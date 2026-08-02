import { notFound } from "next/navigation";
import {
  getPropertyById,
  getReviewsByProperty,
  getMyRentalRequests,
} from "../../_actions/propertyActions";
import { getMe } from "@/service/getMe";
import { PropertyGallery } from "../../_components/PropertyGallery";
import { PropertyInfo } from "../../_components/PropertyInfo";
import { ReviewList } from "../../_components/ReviewList";
import { RequestToRentDialog } from "../../_components/RequestToRentDialog";

interface PropertyDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function PropertyDetailPage({
  params,
}: PropertyDetailPageProps) {
  const { id } = await params;

  const [propertyRes, userRes] = await Promise.all([
    getPropertyById(id),
    getMe(),
  ]);

  if (!propertyRes.success || !propertyRes.data?.property) {
    notFound();
  }

  const property = propertyRes.data.property;
  const user = userRes.success ? userRes.data.profile : null;

  const reviewsRes = await getReviewsByProperty(id);
  const reviews = reviewsRes.data?.reviews || [];
  const averageRating = reviewsRes.data?.averageRating || 0;
  const totalReviews = reviewsRes.data?.totalReviews || 0;

  let rentalStatus: string | null = null;
  if (user?.role === "TENANT") {
    const rentalsRes = await getMyRentalRequests();
    const requests = rentalsRes.data?.requests || [];
    const match = requests.find(
      (r: { propertyId: string; status: string }) => r.propertyId === id,
    );
    if (match) {
      rentalStatus = match.status;
    }
  }

  return (
    <div className="min-h-screen bg-[#F4F5F1]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left — Gallery + Info */}
          <div className="lg:col-span-2 space-y-8">
            <PropertyGallery images={property.images} title={property.title} />
            <PropertyInfo property={property} />
          </div>

          {/* Right — CTA + Reviews */}
          <div className="space-y-6">
            {/* Request to Rent */}
            <div className="bg-white border border-[#D8DBD3] rounded-lg p-4 sticky top-20">
              <div className="text-center mb-3">
                <span className="font-heading text-2xl font-bold text-[#1F4D3E]">
                  ৳{property.price.toLocaleString()}
                </span>
                <span className="text-sm text-gray-500 ml-1">/month</span>
              </div>
              <RequestToRentDialog
                user={user}
                propertyId={property.id}
                propertyTitle={property.title}
                rentalStatus={rentalStatus}
              />
            </div>

            {/* Reviews */}
            <div className="bg-white border border-[#D8DBD3] rounded-lg p-4">
              <ReviewList
                reviews={reviews}
                averageRating={averageRating}
                totalReviews={totalReviews}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}