import Link from "next/link";
import { getPaymentBySessionId } from "../../(dashboardGroup)/_actions/dashboardActions";
import { CheckCircle, Clock } from "lucide-react";

interface SuccessPageProps {
  searchParams: Promise<{ session_id?: string }>;
}

export default async function PaymentSuccessPage({
  searchParams,
}: SuccessPageProps) {
  const { session_id } = await searchParams;

  if (!session_id) {
    return (
      <div className="min-h-screen bg-[background] flex items-center justify-center px-4">
        <div className="bg-card border border-border rounded-lg p-8 max-w-md w-full text-center">
          <p className="text-sm text-gray-500 mb-4">
            No session found. The payment link may have expired.
          </p>
          <Link
            href="/dashboard/requests"
            className="inline-block px-4 py-2 bg-primary hover:bg-primary/80 text-white text-xs font-bold rounded-md transition-colors"
          >
            GO TO MY REQUESTS
          </Link>
        </div>
      </div>
    );
  }

  const result = await getPaymentBySessionId(session_id);
  const payment = result.data?.payment;

  const isCompleted = payment?.status === "COMPLETED";
  const isPending = payment?.status === "PENDING";

  return (
    <div className="min-h-screen bg-[background] flex items-center justify-center px-4">
      <div className="bg-card border border-border rounded-lg p-8 max-w-md w-full text-center">
        {isCompleted ? (
          <>
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-100 flex items-center justify-center">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <h1 className="font-heading text-xl font-bold text-foreground mb-2">
              Payment Successful!
            </h1>
            <p className="text-sm text-gray-500 mb-6">
              Your rental request has been confirmed. The property is now yours!
            </p>
            <div className="space-y-2">
              <Link
                href="/dashboard"
                className="block w-full py-3 px-4 bg-primary hover:bg-primary/80 text-white text-xs font-bold rounded-md transition-colors"
              >
                GO TO DASHBOARD
              </Link>
              <Link
                href="/dashboard/requests"
                className="block w-full py-3 px-4 border border-border hover:bg-muted text-gray-600 text-xs font-bold rounded-md transition-colors"
              >
                VIEW MY REQUESTS
              </Link>
            </div>
          </>
        ) : isPending ? (
          <>
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-yellow-100 flex items-center justify-center">
              <Clock className="w-8 h-8 text-yellow-600" />
            </div>
            <h1 className="font-heading text-xl font-bold text-foreground mb-2">
              Confirming Payment...
            </h1>
            <p className="text-sm text-gray-500 mb-6">
              Your payment is being processed. This may take a few moments.
              We`ll update your status shortly.
            </p>
            <Link
              href="/dashboard/requests"
              className="block w-full py-3 px-4 bg-primary hover:bg-primary/80
               text-white text-xs font-bold rounded-md transition-colors"
            >
              CHECK STATUS IN DASHBOARD
            </Link>
          </>
        ) : (
          <>
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-100 flex items-center justify-center">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <h1 className="font-heading text-xl font-bold text-foreground mb-2">
              Payment Received!
            </h1>
            <p className="text-sm text-gray-500 mb-6">
              We received your payment. Your rental will be activated once
              confirmed by our system.
            </p>
            <Link
              href="/dashboard/requests"
              className="block w-full py-3 px-4 bg-primary hover:bg-primary/80
               text-white text-xs font-bold rounded-md transition-colors"
            >
              GO TO MY REQUESTS
            </Link>
          </>
        )}
      </div>
    </div>
  );
}
