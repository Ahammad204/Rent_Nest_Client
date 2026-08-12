import { getLandlordProperties } from "../../_actions/dashboardActions";
import Link from "next/link";

export default async function LandlordPropertiesPage() {
  const res = await getLandlordProperties();
  const properties = res.data?.properties || [];

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="font-heading text-2xl font-bold text-foreground">
          My Properties
        </h1>
        <Link
          href="/landlord-dashboard/properties/new"
          className="px-4 py-2 bg-primary hover:bg-primary/80 text-white text-xs
           font-bold rounded-md transition-colors"
        >
          + ADD PROPERTY
        </Link>
      </div>

      {properties.length === 0 ? (
        <div className="bg-card border border-border rounded-lg p-8 text-center">
          <p className="text-sm text-muted-foreground">
            No properties yet. Add your first property to get started.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {properties.map(
            (property: {
              id: string;
              title: string;
              location: string;
              price: number;
              status: string;
            }) => (
              <div
                key={property.id}
                className="bg-card border border-border rounded-lg p-4 flex 
                items-center justify-between"
              >
                <div>
                  <p className="text-sm font-bold text-foreground">
                    {property.title}
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {property.location} — ৳{property.price.toLocaleString()}
                    /month
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span
                    className={`px-2 py-0.5 text-[10px] font-bold uppercase rounded ${
                      property.status === "AVAILABLE"
                        ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                        : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                    }`}
                  >
                    {property.status}
                  </span>
                  <Link
                    href={`/landlord-dashboard/properties/${property.id}/edit`}
                    className="px-3 py-1 text-xs font-bold text-primary border border-border rounded hover:bg-muted transition-colors"
                  >
                    EDIT
                  </Link>
                </div>
              </div>
            ),
          )}
        </div>
      )}
    </div>
  );
}
