import { notFound } from "next/navigation";
import { getRentalRequestById } from "../../../../_actions/dashboardActions";
import { getMe } from "@/service/getMe";
import { PayNowButton } from "../../../../_components/PayNowButton";
import Link from "next/link";

interface PayPageProps {
  params: Promise<{ id: string }>;
}

export default async function PayPage({ params }: PayPageProps) {
  const { id } = await params;
  const userRes = await getMe();
  const user = userRes.success ? userRes.data.profile : null;

  if (user?.role !== "TENANT") {
    notFound();
  }

  const res = await getRentalRequestById(id);

  if (!res.success || !res.data?.rentalRequest) {
    notFound();
  }

  const rentalRequest = res.data.rentalRequest;

  if (rentalRequest.status === "ACTIVE") {
    return (
      <div className="p-6">
        <div className="bg-card border border-border rounded-lg p-8 text-center">
          <p className="text-sm text-muted-foreground mb-4">
            This rental is already active. Payment has been completed.
          </p>
          <Link
            href="/dashboard/requests"
            className="text-sm font-bold text-primary underline"
          >
            Back to Requests
          </Link>
        </div>
      </div>
    );
  }

  if (rentalRequest.status !== "APPROVED") {
    return (
      <div className="p-6">
        <div className="bg-card border border-border rounded-lg p-8 text-center">
          <p className="text-sm text-muted-foreground mb-4">
            Payment can only be made for approved rental requests.
          </p>
          <Link
            href="/dashboard/requests"
            className="text-sm font-bold text-primary underline"
          >
            Back to Requests
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <h1 className="font-heading text-2xl font-bold text-foreground">
        Make Payment
      </h1>
      <div className="bg-card border border-border rounded-lg p-6">
        <h2 className="font-heading font-bold text-sm text-primary uppercase tracking-wider mb-3">
          Rental Details
        </h2>
        <div className="space-y-2">
          <p className="text-sm text-foreground">
            <span className="font-medium">Property:</span>{" "}
            {rentalRequest.property.title}
          </p>
          <p className="text-sm text-foreground">
            <span className="font-medium">Location:</span>{" "}
            {rentalRequest.property.location}
          </p>
          <p className="text-sm text-foreground">
            <span className="font-medium">Amount:</span> ৳
            {rentalRequest.property.price.toLocaleString()}/month
          </p>
          {rentalRequest.moveInDate && (
            <p className="text-sm text-foreground">
              <span className="font-medium">Move-in Date:</span>{" "}
              {new Date(rentalRequest.moveInDate).toLocaleDateString()}
            </p>
          )}
        </div>
        <PayNowButton rentalRequestId={rentalRequest.id} />
      </div>
    </div>
  );
}
