"use client";

import { useState, useEffect } from "react";
import { Star, LogIn } from "lucide-react";
import { toast } from "sonner";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { reviewSchema, type ReviewFormData } from "@/lib/validations/review";
import { BlueprintCard } from "@/components/BlueprintCard";
import type { UserProfile } from "@/lib/types";

interface RentalRequest {
  id: string;
  status: string;
  property: {
    id: string;
    title: string;
    location: string;
  };
}

interface HomeReviewFormProps {
  user: UserProfile | null;
}

export function HomeReviewForm({ user }: HomeReviewFormProps) {
  const [rentalRequests, setRentalRequests] = useState<RentalRequest[]>([]);
  const [selectedRequestId, setSelectedRequestId] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loadingRequests, setLoadingRequests] = useState(false);

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

  // Fetch rental requests when user is logged in
  useEffect(() => {
    if (!user) return;
    setLoadingRequests(true);
    fetch("/api/rentals", { credentials: "include" })
      .then((res) => res.json())
      .then((data) => {
        const requests = data.data?.requests || [];
        // Only show completed/approved requests that haven't been reviewed
        setRentalRequests(
          requests.filter(
            (r: RentalRequest) =>
              r.status === "COMPLETED" || r.status === "ACTIVE"
          )
        );
      })
      .catch(() => {})
      .finally(() => setLoadingRequests(false));
  }, [user]);

  const onSubmit = async (data: ReviewFormData) => {
    if (!selectedRequestId) {
      toast.error("Please select a property to review");
      return;
    }
    try {
      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          rentalRequestId: selectedRequestId,
          rating: data.rating,
          comment: data.comment || undefined,
        }),
      });
      const result = await res.json();
      if (!result.success) throw new Error(result.message);
      toast.success("Review submitted successfully!");
      setSubmitted(true);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Failed to submit review.";
      toast.error(msg);
    }
  };

  // Not logged in state
  if (!user) {
    return (
      <BlueprintCard className="p-6 text-center" accentTick>
        <Star className="w-8 h-8 text-secondary mx-auto mb-3" />
        <h3 className="font-heading font-bold text-sm text-foreground mb-2">
          Share Your Experience
        </h3>
        <p className="text-xs text-muted-foreground mb-4">
          Logged in as a tenant? Leave a review for properties you`ve visited.
        </p>
        <Link
          href="/login"
          className="inline-flex items-center gap-2 px-4 py-2 bg-primary hover:bg-primary/80 text-white text-xs font-bold rounded-md transition-colors"
        >
          <LogIn className="w-3.5 h-3.5" />
          LOGIN TO REVIEW
        </Link>
      </BlueprintCard>
    );
  }

  // Submitted state
  if (submitted) {
    return (
      <BlueprintCard className="p-6 text-center" accentTick>
        <div className="text-green-600 mb-2">✓</div>
        <h3 className="font-heading font-bold text-sm text-foreground mb-1">
          Thank You!
        </h3>
        <p className="text-xs text-muted-foreground">
          Your review has been submitted successfully.
        </p>
      </BlueprintCard>
    );
  }

  // Logged in state — show form
  return (
    <BlueprintCard className="p-6" accentTick>
      <h3 className="font-heading font-bold text-sm text-foreground mb-4">
        Share Your Experience
      </h3>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Property Selector */}
        <div className="space-y-1.5">
          <label className="font-mono-spec text-[10px] text-primary font-semibold uppercase">
            Select Property
          </label>
          {loadingRequests ? (
            <p className="text-xs text-muted-foreground">Loading your rentals...</p>
          ) : rentalRequests.length === 0 ? (
            <p className="text-xs text-muted-foreground">
              You need an active or completed rental to leave a review.
            </p>
          ) : (
            <select
              value={selectedRequestId}
              onChange={(e) => setSelectedRequestId(e.target.value)}
              className="w-full px-3 py-2 text-sm bg-muted border border-border rounded-md text-foreground focus:outline-none focus:border-primary"
            >
              <option value="">Choose a property...</option>
              {rentalRequests.map((req) => (
                <option key={req.id} value={req.id}>
                  {req.property.title} — {req.property.location}
                </option>
              ))}
            </select>
          )}
        </div>

        {/* Rating */}
        <div className="space-y-1.5">
          <label className="font-mono-spec text-[10px] text-primary font-semibold uppercase">
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
                      : "fill-none text-gray-300"
                  }`}
                />
              </button>
            ))}
          </div>
          {errors.rating && (
            <p className="text-xs text-destructive">{errors.rating.message}</p>
          )}
        </div>

        {/* Comment */}
        <div className="space-y-1.5">
          <label className="font-mono-spec text-[10px] text-primary font-semibold uppercase">
            Comment (optional)
          </label>
          <textarea
            {...register("comment")}
            placeholder="Share your experience..."
            rows={3}
            className="w-full px-3 py-2 text-sm bg-muted border border-border rounded-md text-foreground focus:outline-none focus:border-primary resize-none"
          />
          {errors.comment && (
            <p className="text-xs text-destructive">{errors.comment.message}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting || !selectedRequestId}
          className="px-4 py-2 bg-primary hover:bg-primary/80 disabled:opacity-60 text-white text-xs font-bold rounded-md transition-colors cursor-pointer"
        >
          {isSubmitting ? "SUBMITTING..." : "SUBMIT REVIEW"}
        </button>
      </form>
    </BlueprintCard>
  );
}