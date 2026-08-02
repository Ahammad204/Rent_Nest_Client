import {
  getLandlordRentalRequests,
} from "../../_actions/dashboardActions";

export default async function LandlordRequestsPage() {
  const res = await getLandlordRentalRequests();
  const requests = res.data?.requests || [];

  return (
    <div className="p-6 space-y-6">
      <h1 className="font-heading text-2xl font-bold text-[#1B211E]">
        Rental Requests
      </h1>

      {requests.length === 0 ? (
        <div className="bg-white border border-[#D8DBD3] rounded-lg p-8 text-center">
          <p className="text-sm text-gray-500">No rental requests yet.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {requests.map(
            (request: {
              id: string;
              status: string;
              message: string | null;
              moveInDate: string | null;
              createdAt: string;
              tenant: { id: string; name: string; email: string };
              property: { id: string; title: string; location: string };
            }) => (
              <div
                key={request.id}
                className="bg-white border border-[#D8DBD3] rounded-lg p-4"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm font-bold text-[#1B211E]">
                      {request.property.title}
                    </p>
                    <p className="text-xs text-gray-500 mt-0.5">
                      {request.property.location}
                    </p>
                    <p className="text-xs text-gray-500 mt-0.5">
                      Tenant: {request.tenant.name} ({request.tenant.email})
                    </p>
                    {request.message && (
                      <p className="text-xs text-gray-500 mt-1 italic">
                        `{request.message}`
                      </p>
                    )}
                  </div>
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
                </div>
              </div>
            ),
          )}
        </div>
      )}
    </div>
  );
}
