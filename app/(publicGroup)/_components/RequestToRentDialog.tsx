"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Key, Clock, CheckCircle } from "lucide-react";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import type { UserProfile } from "@/lib/types";
import {
  rentalRequestSchema,
  type RentalRequestFormData,
} from "@/lib/validations/rental";
import { createRentalRequest } from "../_actions/propertyActions";

interface RequestToRentDialogProps {
  user: UserProfile | null;
  propertyId: string;
  propertyTitle: string;
  rentalStatus: string | null;
}

export function RequestToRentDialog({
  user,
  propertyId,
  propertyTitle,
  rentalStatus,
}: RequestToRentDialogProps) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [rentalError, setRentalError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<RentalRequestFormData>({
    resolver: zodResolver(rentalRequestSchema),
    defaultValues: {
      moveInDate: "",
      message: "",
    },
  });

  const isPending = rentalStatus === "PENDING";
  const isRented = rentalStatus === "APPROVED" || rentalStatus === "ACTIVE";
  const canRequest = !isPending && !isRented;

  const handleTriggerClick = () => {
    if (!user) {
      router.push("/login");
      return;
    }
    if (user.role !== "TENANT") {
      toast.error("Only tenants can request to rent properties.");
      return;
    }
    if (!canRequest) return;
    setRentalError(null);
    setOpen(true);
  };

  const onSubmit = async (data: RentalRequestFormData) => {
    setIsSubmitting(true);
    setRentalError(null);

    try {
      await createRentalRequest({
        propertyId,
        moveInDate: data.moveInDate || undefined,
        message: data.message || undefined,
      });
      toast.success("Rental request submitted successfully!");
      setOpen(false);
      reset();
    } catch (err: unknown) {
      const msg =
        err instanceof Error ? err.message : "Failed to submit request.";

      if (msg.toLowerCase().includes("already have")) {
        setRentalError(msg);
      } else {
        toast.error(msg);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleOpenChange = (nextOpen: boolean) => {
    setOpen(nextOpen);
    if (!nextOpen) {
      setRentalError(null);
      reset();
    }
  };

  if (isPending) {
    return (
      <button
        disabled
        className="w-full py-3 px-4 bg-muted text-muted-foreground font-mono-spec font-bold text-xs rounded-md flex items-center justify-center gap-2 cursor-not-allowed"
      >
        <Clock className="w-4 h-4" />
        <span>REQUEST PENDING</span>
      </button>
    );
  }

  if (isRented) {
    return (
      <button
        disabled
        className="w-full py-3 px-4 bg-muted text-muted-foreground font-mono-spec font-bold text-xs rounded-md flex items-center justify-center gap-2 cursor-not-allowed"
      >
        <CheckCircle className="w-4 h-4" />
        <span>ALREADY RENTED</span>
      </button>
    );
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <button
          onClick={handleTriggerClick}
          className="w-full py-3 px-4 bg-secondary hover:bg-[#AF7623] text-white font-mono-spec font-bold text-xs rounded-md flex items-center justify-center gap-2 transition-colors cursor-pointer"
        >
          <Key className="w-4 h-4" />
          <span>{user ? "REQUEST TO RENT" : "LOGIN TO REQUEST"}</span>
        </button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-md bg-card">
        <DialogHeader>
          <DialogTitle className="font-heading font-bold text-primary">
            REQUEST TO RENT
          </DialogTitle>
          <p className="text-sm text-muted-foreground mt-1">{propertyTitle}</p>
        </DialogHeader>

        {rentalError && (
          <div className="text-amber-800 bg-amber-50 border border-amber-200 px-4 py-3 rounded-lg text-sm dark:text-amber-300 dark:bg-amber-950 dark:border-amber-800">
            {rentalError}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-2">
          <div>
            <label className="block text-xs font-bold text-primary uppercase tracking-wider mb-1">
              Move-in Date (optional)
            </label>
            <input
              type="date"
              {...register("moveInDate")}
              className="w-full px-3 py-2 text-sm bg-card border border-border rounded-md text-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
            />
            {errors.moveInDate && (
              <p className="text-xs text-red-500 mt-1">
                {errors.moveInDate.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-xs font-bold text-primary uppercase tracking-wider mb-1">
              Message (optional)
            </label>
            <textarea
              {...register("message")}
              placeholder="Tell the landlord about yourself..."
              rows={3}
              className="w-full px-3 py-2 text-sm bg-card border border-border rounded-md text-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary resize-none"
            />
            {errors.message && (
              <p className="text-xs text-red-500 mt-1">
                {errors.message.message}
              </p>
            )}
          </div>

          <div className="flex gap-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-4 py-2 bg-primary hover:bg-primary/80 disabled:opacity-60 text-white text-xs font-bold rounded-md transition-colors cursor-pointer"
            >
              {isSubmitting ? "SUBMITTING..." : "SUBMIT REQUEST"}
            </button>
            <button
              type="button"
              onClick={() => handleOpenChange(false)}
              className="px-4 py-2 border border-border hover:bg-muted
               text-muted-foreground text-xs font-bold rounded-md transition-colors cursor-pointer"
            >
              CANCEL
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
