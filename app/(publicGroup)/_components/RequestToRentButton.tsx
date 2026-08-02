"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Key } from "lucide-react";
import { toast } from "sonner";
import type { UserProfile } from "@/lib/types";
import { createRentalRequest } from "../_actions/propertyActions";

interface RequestToRentButtonProps {
  user: UserProfile | null;
  propertyId: string;
  propertyTitle: string;
}

export function RequestToRentButton({
  user,
  propertyId,
}: RequestToRentButtonProps) {
  const router = useRouter();
  const [showForm, setShowForm] = useState(false);
  const [moveInDate, setMoveInDate] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleClick = () => {
    if (!user) {
      router.push("/login");
      return;
    }
    if (user.role !== "TENANT") {
      toast.error("Only tenants can request to rent properties.");
      return;
    }
    setShowForm(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await createRentalRequest({
        propertyId,
        moveInDate: moveInDate || undefined,
        message: message || undefined,
      });
      toast.success("Rental request submitted successfully!");
      setShowForm(false);
      setMoveInDate("");
      setMessage("");
    } catch (err: any) {
      toast.error(err.message || "Failed to submit request.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (showForm) {
    return (
      <div className="border border-[#D8DBD3] rounded-lg p-4 mt-4">
        <h3 className="font-heading font-bold text-sm text-[#1F4D3E] mb-3">
          REQUEST TO RENT
        </h3>
        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label className="block text-xs font-bold text-[#1F4D3E] uppercase tracking-wider mb-1">
              Move-in Date (optional)
            </label>
            <input
              type="date"
              value={moveInDate}
              onChange={(e) => setMoveInDate(e.target.value)}
              className="w-full px-3 py-2 text-sm bg-white border border-[#D8DBD3] rounded-md text-[#1B211E] focus:outline-none focus:border-[#1F4D3E] focus:ring-1 focus:ring-[#1F4D3E]"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-[#1F4D3E] uppercase tracking-wider mb-1">
              Message (optional)
            </label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Tell the landlord about yourself..."
              rows={3}
              className="w-full px-3 py-2 text-sm bg-white border border-[#D8DBD3] rounded-md text-[#1B211E] focus:outline-none focus:border-[#1F4D3E] focus:ring-1 focus:ring-[#1F4D3E] resize-none"
            />
          </div>
          <div className="flex gap-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-4 py-2 bg-[#1F4D3E] hover:bg-[#173B2F] disabled:opacity-60 text-white text-xs font-bold rounded-md transition-colors cursor-pointer"
            >
              {isSubmitting ? "SUBMITTING..." : "SUBMIT REQUEST"}
            </button>
            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="px-4 py-2 border border-[#D8DBD3] hover:bg-[#F4F5F1] text-gray-600 text-xs font-bold rounded-md transition-colors cursor-pointer"
            >
              CANCEL
            </button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <button
      onClick={handleClick}
      className="w-full py-3 px-4 bg-[#C98A2C] hover:bg-[#AF7623] text-white font-mono-spec font-bold text-xs rounded-md flex items-center justify-center gap-2 transition-colors cursor-pointer"
    >
      <Key className="w-4 h-4" />
      <span>{user ? "REQUEST TO RENT" : "LOGIN TO REQUEST"}</span>
    </button>
  );
}
