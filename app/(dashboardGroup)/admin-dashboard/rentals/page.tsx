import { getAllRentalsAdmin } from "../../_actions/dashboardActions";
import { StatusBadge } from "../../_components/StatusBadge";

export default async function AdminRentalsPage() {
  const res = await getAllRentalsAdmin();
  const rentals = res.data?.rentals || [];

  return (
    <div className="p-6 space-y-6">
      <h1 className="font-heading text-2xl font-bold text-foreground">
        All Rentals
      </h1>
      <div className="bg-card border border-border rounded-lg overflow-x-auto">
        <table className="w-full text-sm min-w-150">
          <thead>
            <tr className="border-b border-border bg-[background]">
              <th className="text-left px-4 py-3 font-bold text-xs text-primary uppercase tracking-wider">
                Property
              </th>
              <th className="text-left px-4 py-3 font-bold text-xs text-primary uppercase tracking-wider">
                Tenant
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
            {rentals.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-4 py-8 text-center text-muted-foreground">
                  No rental requests found.
                </td>
              </tr>
            ) : (
              rentals.map(
                (rental: {
                  id: string;
                  status: string;
                  createdAt: string;
                  tenant: { name: string; email: string };
                  property: { title: string; location: string };
                }) => (
                  <tr
                    key={rental.id}
                    className="border-b border-[background] last:border-0"
                  >
                    <td className="px-4 py-3">
                      <p className="font-medium text-foreground">
                        {rental.property.title}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {rental.property.location}
                      </p>
                    </td>
                    <td className="px-4 py-3">
                      <p className="text-foreground">{rental.tenant.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {rental.tenant.email}
                      </p>
                    </td>
                    <td className="px-4 py-3">
                      <StatusBadge status={rental.status} />
                    </td>
                    <td className="px-4 py-3 text-muted-foreground text-xs">
                      {new Date(rental.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ),
              )
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
