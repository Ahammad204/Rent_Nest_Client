import { notFound } from "next/navigation";
import { getRentalRequestById } from "../../../../_actions/dashboardActions";
import { getMe } from "@/service/getMe";

interface PayPageProps {
  params: Promise<{ id: string }>;
}

export default async function PayPage({ params }: PayPageProps) {
  const { id } = await params;
  const userRes = await getMe();
  const user = userRes.success ? userRes.data.profile : null;

  if (user?.role !== "TENANT") {
    notFound();
  }

  const res = await getRentalRequestById(id);

  if (!res.success || !res.data?.rentalRequest) {
    notFound();
  }

  const rentalRequest = res.data.rentalRequest;

  if (rentalRequest.status !== "APPROVED") {
    return (
      <div className="p-6">
        <div className="bg-white border border-[#D8DBD3] rounded-lg p-8 text-center">
          <p className="text-sm text-gray-500">
            Payment can only be made for approved rental requests.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <h1 className="font-heading text-2xl font-bold text-[#1B211E]">
        Make Payment
      </h1>
      <div className="bg-white border border-[#D8DBD3] rounded-lg p-6">
        <h2 className="font-heading font-bold text-sm text-[#1F4D3E] uppercase tracking-wider mb-3">
          Rental Details
        </h2>
        <div className="space-y-2">
          <p className="text-sm text-[#1B211E]">
            <span className="font-medium">Property:</span>{" "}
            {rentalRequest.property.title}
          </p>
          <p className="text-sm text-[#1B211E]">
            <span className="font-medium">Location:</span>{" "}
            {rentalRequest.property.location}
          </p>
          <p className="text-sm text-[#1B211E]">
            <span className="font-medium">Amount:</span> ৳
            {rentalRequest.property.price.toLocaleString()}/month
          </p>
        </div>
        <button className="mt-6 w-full py-3 px-4 bg-[#1F4D3E] hover:bg-[#173B2F]
         text-white font-bold text-xs rounded-md transition-colors cursor-pointer">
          PAY WITH STRIPE
        </button>
      </div>
    </div>
  );
}
