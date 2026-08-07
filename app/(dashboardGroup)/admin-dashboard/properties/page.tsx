import { getAllPropertiesAdmin } from "../../_actions/dashboardActions";
import { StatusBadge } from "../../_components/StatusBadge";

export default async function AdminPropertiesPage() {
  const res = await getAllPropertiesAdmin();
  const properties = res.data?.properties || [];

  return (
    <div className="p-6 space-y-6">
      <h1 className="font-heading text-2xl font-bold text-foreground">
        All Properties
      </h1>
      <div className="bg-card border border-border rounded-lg overflow-x-auto">
         <table className="w-full text-sm min-w-150">
          <thead>
            <tr className="border-b border-border bg-[background]">
              <th className="text-left px-4 py-3 font-bold text-xs text-primary uppercase tracking-wider">
                Title
              </th>
              <th className="text-left px-4 py-3 font-bold text-xs text-primary uppercase tracking-wider">
                Location
              </th>
              <th className="text-left px-4 py-3 font-bold text-xs text-primary uppercase tracking-wider">
                Price
              </th>
              <th className="text-left px-4 py-3 font-bold text-xs text-primary uppercase tracking-wider">
                Landlord
              </th>
              <th className="text-left px-4 py-3 font-bold text-xs text-primary uppercase tracking-wider">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {properties.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-4 py-8 text-center text-gray-500">
                  No properties found.
                </td>
              </tr>
            ) : (
              properties.map(
                (property: {
                  id: string;
                  title: string;
                  location: string;
                  price: number;
                  status: string;
                  landlord: { name: string };
                }) => (
                  <tr
                    key={property.id}
                    className="border-b border-[background] last:border-0"
                  >
                    <td className="px-4 py-3 font-medium text-foreground">
                      {property.title}
                    </td>
                    <td className="px-4 py-3 text-gray-500">
                      {property.location}
                    </td>
                    <td className="px-4 py-3 text-foreground">
                      ৳{property.price.toLocaleString()}
                    </td>
                    <td className="px-4 py-3 text-gray-500">
                      {property.landlord.name}
                    </td>
                    <td className="px-4 py-3">
                      <StatusBadge status={property.status} />
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