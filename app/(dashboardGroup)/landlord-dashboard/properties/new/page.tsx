import { getCategories } from "@/app/(publicGroup)/_actions/propertyActions";
import { PropertyForm } from "../../../_components/PropertyForm";

export default async function NewPropertyPage() {
  const categoriesRes = await getCategories();
  const categories = categoriesRes.data?.categories || [];

  return (
    <div className="p-6 space-y-6">
      <h1 className="font-heading text-2xl font-bold text-[#1B211E]">
        Add New Property
      </h1>
      <div className="bg-white border border-[#D8DBD3] rounded-lg p-6">
        <PropertyForm mode="create" categories={categories} />
      </div>
    </div>
  );
}
