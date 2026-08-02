import { getMe } from "@/service/getMe";

export default async function TenantReviewsPage() {
  const userRes = await getMe();
  const user = userRes.success ? userRes.data.profile : null;

  return (
    <div className="p-6 space-y-6">
      <h1 className="font-heading text-2xl font-bold text-[#1B211E]">
        My Reviews
      </h1>
      <div className="bg-white border border-[#D8DBD3] rounded-lg p-8 text-center">
        <p className="text-sm text-gray-500">
          Reviews feature coming soon. You`ll be able to see and manage your
          property reviews here.
        </p>
      </div>
    </div>
  );
}