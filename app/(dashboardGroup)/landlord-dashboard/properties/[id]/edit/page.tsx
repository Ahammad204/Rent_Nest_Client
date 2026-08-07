import { notFound } from "next/navigation";
import { getPropertyById } from "@/app/(publicGroup)/_actions/propertyActions";
import { getCategories } from "@/app/(publicGroup)/_actions/propertyActions";
import { PropertyForm } from "../../../../_components/PropertyForm";
import { DeletePropertyButton } from "@/app/(dashboardGroup)/_components/DeletePropertyButton";


interface EditPropertyPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditPropertyPage({ params }: EditPropertyPageProps) {
  const { id } = await params;

  const [propertyRes, categoriesRes] = await Promise.all([
    getPropertyById(id),
    getCategories(),
  ]);

  if (!propertyRes.success || !propertyRes.data?.property) {
    notFound();
  }

  const property = propertyRes.data.property;
  const categories = categoriesRes.data?.categories || [];

  return (
    <div className="p-6 space-y-6">
      <h1 className="font-heading text-2xl font-bold text-foreground">
        Edit Property
      </h1>
      <div className="bg-card border border-border rounded-lg p-6">
        <PropertyForm
          mode="edit"
          categories={categories}
          initialData={property}
          propertyId={property.id}
        />
      </div>

      <div className="bg-card border border-border rounded-lg p-6">
        <h2 className="font-heading font-bold text-sm text-red-600 uppercase tracking-wider mb-3">
          Danger Zone
        </h2>
        <p className="text-sm text-muted-foreground mb-4">
          Permanently delete this property. This action cannot be undone.
        </p>
        <DeletePropertyButton propertyId={property.id} />
      </div>
    </div>
  );
}