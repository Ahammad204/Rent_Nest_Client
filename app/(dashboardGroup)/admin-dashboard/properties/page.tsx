import { getAllPropertiesAdmin } from "../../_actions/dashboardActions";
import { StatusBadge } from "../../_components/StatusBadge";

export default async function AdminPropertiesPage() {
  const res = await getAllPropertiesAdmin();
  const properties = res.data?.properties || [];

  return (
    <div className="p-6 space-y-6">
      <h1 className="font-heading text-2xl font-bold text-[#1B211E]">
        All Properties
      </h1>
      <div className="bg-white border border-[#D8DBD3] rounded-lg overflow-x-auto">
         <table className="w-full text-sm min-w-150">
          <thead>
            <tr className="border-b border-[#D8DBD3] bg-[#F4F5F1]">
              <th className="text-left px-4 py-3 font-bold text-xs text-[#1F4D3E] uppercase tracking-wider">
                Title
              </th>
              <th className="text-left px-4 py-3 font-bold text-xs text-[#1F4D3E] uppercase tracking-wider">
                Location
              </th>
              <th className="text-left px-4 py-3 font-bold text-xs text-[#1F4D3E] uppercase tracking-wider">
                Price
              </th>
              <th className="text-left px-4 py-3 font-bold text-xs text-[#1F4D3E] uppercase tracking-wider">
                Landlord
              </th>
              <th className="text-left px-4 py-3 font-bold text-xs text-[#1F4D3E] uppercase tracking-wider">
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
                    className="border-b border-[#F4F5F1] last:border-0"
                  >
                    <td className="px-4 py-3 font-medium text-[#1B211E]">
                      {property.title}
                    </td>
                    <td className="px-4 py-3 text-gray-500">
                      {property.location}
                    </td>
                    <td className="px-4 py-3 text-[#1B211E]">
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