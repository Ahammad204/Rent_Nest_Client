import { getAllCategories } from "../../_actions/dashboardActions";
import { CategoriesTable } from "./CategoriesTable";

export const metadata = {
  title: "Categories | Thikana Admin",
};
export const dynamic = "force-dynamic";

export default async function CategoriesPage() {
  const res = await getAllCategories();
  const categories = res.data?.categories || res.data || [];

  return (
    <div className="p-6 space-y-6">
      <h1 className="font-heading text-2xl font-bold text-foreground">
        Categories
      </h1>
      <CategoriesTable categories={categories} />
    </div>
  );
}