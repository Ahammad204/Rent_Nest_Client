import Link from "next/link";
import { XCircle } from "lucide-react";

export default function PaymentCancelPage() {
  return (
    <div className="min-h-screen bg-[#F4F5F1] flex items-center justify-center px-4">
      <div className="bg-white border border-[#D8DBD3] rounded-lg p-8 max-w-md w-full text-center">
        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
          <XCircle className="w-8 h-8 text-gray-400" />
        </div>
        <h1 className="font-heading text-xl font-bold text-[#1B211E] mb-2">
          Payment Cancelled
        </h1>
        <p className="text-sm text-gray-500 mb-6">
          No worries — you haven`t been charged. You can try again whenever
          you`re ready.
        </p>
        <div className="space-y-2">
          <Link
            href="/dashboard/requests"
            className="block w-full py-3 px-4 bg-[#C98A2C] hover:bg-[#AF7623] text-white text-xs font-bold rounded-md transition-colors"
          >
            TRY AGAIN
          </Link>
          <Link
            href="/"
            className="block w-full py-3 px-4 border border-[#D8DBD3] hover:bg-[#F4F5F1] text-gray-600 text-xs font-bold rounded-md transition-colors"
          >
            BACK TO HOME
          </Link>
        </div>
      </div>
    </div>
  );
}