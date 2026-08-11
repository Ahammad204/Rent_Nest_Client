import { getAllRentalsAdmin } from "../../_actions/dashboardActions";
import { RentalsTable } from "./RentalsTable";

export default async function AdminRentalsPage() {
  const res = await getAllRentalsAdmin();
  const rentals = res.data?.rentals || [];

  return (
    <div className="p-6 space-y-6">
      <h1 className="font-heading text-2xl font-bold text-foreground">
        All Rentals
      </h1>
      <RentalsTable rentals={rentals} />
    </div>
  );
}