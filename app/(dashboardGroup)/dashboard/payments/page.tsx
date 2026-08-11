import { getMyPayments } from "../../_actions/dashboardActions";
import { PaymentsTable } from "./PaymentsTable";

export default async function TenantPaymentsPage() {
  const res = await getMyPayments();
  const payments = res.data?.payments || [];

  return (
    <div className="p-6 space-y-6">
      <h1 className="font-heading text-2xl font-bold text-foreground">
        My Payments
      </h1>

      {payments.length === 0 ? (
        <div className="bg-card border border-border rounded-lg p-8 text-center">
          <p className="text-sm text-muted-foreground">No payments yet.</p>
        </div>
      ) : (
        <PaymentsTable payments={payments} />
      )}
    </div>
  );
}