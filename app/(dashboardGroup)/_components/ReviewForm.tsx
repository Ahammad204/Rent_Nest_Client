"use client";

import { useState } from "react";
import { Star } from "lucide-react";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createReview } from "../_actions/dashboardActions";
import { reviewSchema, type ReviewFormData } from "@/lib/validations/review";

interface ReviewFormProps {
  rentalRequestId: string;
  propertyTitle: string;
}

export function ReviewForm({ rentalRequestId }: ReviewFormProps) {
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<ReviewFormData>({
    resolver: zodResolver(reviewSchema),
    defaultValues: { rating: 0, comment: "" },
  });

  const rating = watch("rating");

  const onSubmit = async (data: ReviewFormData) => {
    try {
      await createReview({
        rentalRequestId,
        rating: data.rating,
        comment: data.comment || undefined,
      });
      toast.success("Review submitted successfully!");
      setSubmitted(true);
    } catch (err: unknown) {
      const msg =
        err instanceof Error ? err.message : "Failed to submit review.";
      if (msg.toLowerCase().includes("already reviewed")) {
        toast.error(msg);
      } else {
        toast.error(msg);
      }
    }
  };

  if (submitted) {
    return (
      <div className="p-3 text-sm text-green-800 bg-green-50 border border-green-200 rounded-md">
        Thank you! Your review has been submitted.
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
      <div>
        <label className="block text-xs font-bold text-primary uppercase tracking-wider mb-1">
          Rating
        </label>
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => setValue("rating", star, { shouldValidate: true })}
              className="cursor-pointer"
            >
              <Star
                className={`w-6 h-6 transition-colors ${
                  star <= rating
                    ? "fill-secondary text-secondary"
                    : "fill-none text-muted-foreground/40"
                }`}
              />
            </button>
          ))}
        </div>
        {errors.rating && (
          <p className="text-xs text-destructive mt-1">{errors.rating.message}</p>
        )}
      </div>

      <div>
        <label className="block text-xs font-bold text-primary uppercase tracking-wider mb-1">
          Comment (optional)
        </label>
        <textarea
          {...register("comment")}
          placeholder="Share your experience with this property..."
          rows={3}
          className="w-full px-3 py-2 text-sm bg-card border border-border rounded-md text-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary resize-none"
        />
        {errors.comment && (
          <p className="text-xs text-destructive mt-1">{errors.comment.message}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="px-4 py-2 bg-primary hover:bg-primary/80 disabled:opacity-60
         text-primary-foreground text-xs font-bold rounded-md transition-colors cursor-pointer"
      >
        {isSubmitting ? "SUBMITTING..." : "SUBMIT REVIEW"}
      </button>
    </form>
  );
}