import { getAllPropertiesAdmin } from "../../_actions/dashboardActions";
import { PropertiesTable } from "./PropertiesTable";

export default async function AdminPropertiesPage() {
  const res = await getAllPropertiesAdmin();
  const properties = res.data?.properties || [];

  return (
    <div className="p-6 space-y-6">
      <h1 className="font-heading text-2xl font-bold text-foreground">
        All Properties
      </h1>
      <PropertiesTable properties={properties} />
    </div>
  );
}