import { getMyRentalRequests } from "../../_actions/dashboardActions";
import Link from "next/link";

export default async function TenantRequestsPage() {
  const res = await getMyRentalRequests();
  const requests = res.data?.requests || [];

  return (
    <div className="p-6 space-y-6">
      <h1 className="font-heading text-2xl font-bold text-foreground">
        My Rental Requests
      </h1>

      {requests.length === 0 ? (
        <div className="bg-card border border-border rounded-lg p-8 text-center">
          <p className="text-sm text-muted-foreground">
            No rental requests yet.{" "}
            <Link href="/properties" className="text-primary underline">
              Browse properties
            </Link>
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {requests.map(
            (request: {
              id: string;
              status: string;
              moveInDate: string | null;
              createdAt: string;
              property: {
                id: string;
                title: string;
                location: string;
                price: number;
              };
            }) => (
              <div
                key={request.id}
                className="bg-card border border-border rounded-lg p-4"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <Link
                      href={`/properties/${request.property.id}`}
                      className="text-sm font-bold text-primary hover:underline"
                    >
                      {request.property.title}
                    </Link>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {request.property.location} — ৳
                      {request.property.price.toLocaleString()}/month
                    </p>
                    {request.moveInDate && (
                      <p className="text-xs text-muted-foreground mt-0.5">
                        Move-in:{" "}
                        {new Date(request.moveInDate).toLocaleDateString()}
                      </p>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <span
                      className={`px-2 py-0.5 text-[10px] font-bold uppercase rounded ${
                        request.status === "ACTIVE"
                          ? "bg-green-100 text-green-700"
                          : request.status === "APPROVED"
                            ? "bg-blue-100 text-blue-700"
                            : request.status === "PENDING"
                              ? "bg-yellow-100 text-yellow-700"
                              : request.status === "REJECTED"
                                ? "bg-red-100 text-red-700"
                                : "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {request.status}
                    </span>
                    {request.status === "APPROVED" && (
                      <Link
                        href={`/dashboard/requests/${request.id}/pay`}
                        className="px-3 py-1 bg-secondary hover:bg-[#AF7623] text-white text-[10px] font-bold uppercase rounded transition-colors"
                      >
                        PAY NOW
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            ),
          )}
        </div>
      )}
    </div>
  );
}