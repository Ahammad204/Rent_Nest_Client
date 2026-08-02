import { getMyPayments } from "../../_actions/dashboardActions";

export default async function TenantPaymentsPage() {
  const res = await getMyPayments();
  const payments = res.data?.payments || [];

  return (
    <div className="p-6 space-y-6">
      <h1 className="font-heading text-2xl font-bold text-[#1B211E]">
        My Payments
      </h1>

      {payments.length === 0 ? (
        <div className="bg-white border border-[#D8DBD3] rounded-lg p-8 text-center">
          <p className="text-sm text-gray-500">No payments yet.</p>
        </div>
      ) : (
        <div className="bg-white border border-[#D8DBD3] rounded-lg overflow-x-auto">
          <table className="w-full text-sm min-w-150">
            <thead>
              <tr className="border-b border-[#D8DBD3] bg-[#F4F5F1]">
                <th className="text-left px-4 py-3 font-bold text-xs text-[#1F4D3E] uppercase tracking-wider">
                  Property
                </th>
                <th className="text-left px-4 py-3 font-bold text-xs text-[#1F4D3E] uppercase tracking-wider">
                  Amount
                </th>
                <th className="text-left px-4 py-3 font-bold text-xs text-[#1F4D3E] uppercase tracking-wider">
                  Method
                </th>
                <th className="text-left px-4 py-3 font-bold text-xs text-[#1F4D3E] uppercase tracking-wider">
                  Status
                </th>
                <th className="text-left px-4 py-3 font-bold text-xs text-[#1F4D3E] uppercase tracking-wider">
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
                    className="border-b border-[#F4F5F1] last:border-0"
                  >
                    <td className="px-4 py-3 text-[#1B211E]">
                      {payment.rentalRequest.property.title}
                    </td>
                    <td className="px-4 py-3 font-medium text-[#1B211E]">
                      ৳{payment.amount.toLocaleString()}
                    </td>
                    <td className="px-4 py-3 text-gray-500 uppercase text-xs">
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
                    <td className="px-4 py-3 text-gray-500 text-xs">
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
