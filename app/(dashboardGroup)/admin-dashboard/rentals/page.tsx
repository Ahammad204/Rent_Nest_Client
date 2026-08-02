import { getAllRentalsAdmin } from "../../_actions/dashboardActions";

export default async function AdminRentalsPage() {
  const res = await getAllRentalsAdmin();
  const rentals = res.data?.rentals || [];

  return (
    <div className="p-6 space-y-6">
      <h1 className="font-heading text-2xl font-bold text-[#1B211E]">
        All Rentals
      </h1>
      <div className="bg-white border border-[#D8DBD3] rounded-lg overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-[#D8DBD3] bg-[#F4F5F1]">
              <th className="text-left px-4 py-3 font-bold text-xs text-[#1F4D3E] uppercase tracking-wider">
                Property
              </th>
              <th className="text-left px-4 py-3 font-bold text-xs text-[#1F4D3E] uppercase tracking-wider">
                Tenant
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
            {rentals.map(
              (rental: {
                id: string;
                status: string;
                createdAt: string;
                tenant: { name: string; email: string };
                property: { title: string; location: string };
              }) => (
                <tr
                  key={rental.id}
                  className="border-b border-[#F4F5F1] last:border-0"
                >
                  <td className="px-4 py-3">
                    <p className="font-medium text-[#1B211E]">
                      {rental.property.title}
                    </p>
                    <p className="text-xs text-gray-500">
                      {rental.property.location}
                    </p>
                  </td>
                  <td className="px-4 py-3">
                    <p className="text-[#1B211E]">{rental.tenant.name}</p>
                    <p className="text-xs text-gray-500">
                      {rental.tenant.email}
                    </p>
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`px-2 py-0.5 text-[10px] font-bold uppercase rounded ${
                        rental.status === "ACTIVE"
                          ? "bg-green-100 text-green-700"
                          : rental.status === "APPROVED"
                            ? "bg-blue-100 text-blue-700"
                            : rental.status === "PENDING"
                              ? "bg-yellow-100 text-yellow-700"
                              : rental.status === "REJECTED"
                                ? "bg-red-100 text-red-700"
                                : "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {rental.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-gray-500 text-xs">
                    {new Date(rental.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ),
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}