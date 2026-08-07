"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { CreditCard } from "lucide-react";
import { createPaymentSession } from "../_actions/dashboardActions";

interface PayNowButtonProps {
  rentalRequestId: string;
}

export function PayNowButton({ rentalRequestId }: PayNowButtonProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handlePay = async () => {
    setIsLoading(true);
    try {
      const result = await createPaymentSession(rentalRequestId);
      const sessionUrl = result.data?.sessionUrl;
      if (sessionUrl) {
        window.location.href = sessionUrl;
      } else {
        toast.error("Failed to create payment session");
        setIsLoading(false);
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Payment failed";
      toast.error(msg);
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={handlePay}
      disabled={isLoading}
      className="mt-6 w-full py-3 px-4 bg-secondary hover:bg-[#AF7623] disabled:opacity-60 text-white font-bold text-xs rounded-md flex items-center justify-center gap-2 transition-colors cursor-pointer"
    >
      <CreditCard className="w-4 h-4" />
      {isLoading ? "REDIRECTING TO STRIPE..." : "PAY WITH STRIPE"}
    </button>
  );
}
