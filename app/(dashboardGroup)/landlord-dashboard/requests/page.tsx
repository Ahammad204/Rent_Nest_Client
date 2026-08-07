import { getLandlordRentalRequests } from "../../_actions/dashboardActions";
import { RequestList } from "../../_components/RequestList";

export default async function LandlordRequestsPage() {
  const res = await getLandlordRentalRequests();
  const requests = res.data?.requests || [];

  return (
    <div className="p-6 space-y-6">
      <h1 className="font-heading text-2xl font-bold text-foreground">
        Rental Requests
      </h1>

      {requests.length === 0 ? (
        <div className="bg-card border border-border rounded-lg p-8 text-center">
          <p className="text-sm text-muted-foreground">No rental requests yet.</p>
        </div>
      ) : (
        <RequestList requests={requests} />
      )}
    </div>
  );
}