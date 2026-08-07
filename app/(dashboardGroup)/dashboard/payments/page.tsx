import { getMyPayments } from "../../_actions/dashboardActions";

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
        <div className="bg-card border border-border rounded-lg overflow-x-auto">
          <table className="w-full text-sm min-w-150">
            <thead>
              <tr className="border-b border-border bg-[background]">
                <th className="text-left px-4 py-3 font-bold text-xs text-primary uppercase tracking-wider">
                  Property
                </th>
                <th className="text-left px-4 py-3 font-bold text-xs text-primary uppercase tracking-wider">
                  Amount
                </th>
                <th className="text-left px-4 py-3 font-bold text-xs text-primary uppercase tracking-wider">
                  Method
                </th>
                <th className="text-left px-4 py-3 font-bold text-xs text-primary uppercase tracking-wider">
                  Status
                </th>
                <th className="text-left px-4 py-3 font-bold text-xs text-primary uppercase tracking-wider">
                  Date
                </th>
              </tr>
            </thead>
            <tbody>
              {payments.map(
                (payment: {
                  id: string;
                  amount: number;
                  method: string;
                  status: string;
                  createdAt: string;
                  rentalRequest: {
                    property: { title: string };
                  };
                }) => (
                  <tr
                    key={payment.id}
                    className="border-b border-[background] last:border-0"
                  >
                    <td className="px-4 py-3 text-foreground">
                      {payment.rentalRequest.property.title}
                    </td>
                    <td className="px-4 py-3 font-medium text-foreground">
                      ৳{payment.amount.toLocaleString()}
                    </td>
                    <td className="px-4 py-3 text-muted-foreground uppercase text-xs">
                      {payment.method}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`px-2 py-0.5 text-[10px] font-bold uppercase rounded ${
                          payment.status === "COMPLETED"
                            ? "bg-green-100 text-green-700"
                            : payment.status === "PENDING"
                              ? "bg-yellow-100 text-yellow-700"
                              : "bg-red-100 text-red-700"
                        }`}
                      >
                        {payment.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-muted-foreground text-xs">
                      {new Date(payment.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ),
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
