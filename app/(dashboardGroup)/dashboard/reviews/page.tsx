import { getMyRentalRequests } from "../../_actions/dashboardActions";
import { ReviewForm } from "../../_components/ReviewForm";
import Link from "next/link";

export default async function TenantReviewsPage() {
  const res = await getMyRentalRequests();
  const requests = res.data?.requests || [];

 const reviewableRequests = requests.filter(
   (r: { status: string }) => ["ACTIVE", "COMPLETED"].includes(r.status),
 );

  return (
    <div className="p-6 space-y-6">
      <h1 className="font-heading text-2xl font-bold text-foreground">
        My Reviews
      </h1>

      {reviewableRequests.length === 0 ? (
        <div className="bg-card border border-border rounded-lg p-8 text-center">
          <p className="text-sm text-muted-foreground">
            No completed rentals to review yet. Once a rental is completed, you
            can leave a review here.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {reviewableRequests.map(
            (request: {
              id: string;
              property: { id: string; title: string; location: string };
            }) => (
              <div
                key={request.id}
                className="bg-card border border-border rounded-lg p-4"
              >
                <div className="mb-3">
                  <Link
                    href={`/properties/${request.property.id}`}
                    className="text-sm font-bold text-primary hover:underline"
                  >
                    {request.property.title}
                  </Link>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {request.property.location}
                  </p>
                </div>
                <ReviewForm
                  rentalRequestId={request.id}
                  propertyTitle={request.property.title}
                />
              </div>
            ),
          )}
        </div>
      )}
    </div>
  );
}
