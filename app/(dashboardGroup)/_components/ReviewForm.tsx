"use client";

import { useState } from "react";
import { Star } from "lucide-react";
import { toast } from "sonner";
import { createReview } from "../_actions/dashboardActions";

interface ReviewFormProps {
  rentalRequestId: string;
  propertyTitle: string;
}

export function ReviewForm({
  rentalRequestId
}: ReviewFormProps) {
  const [rating, setRating] = useState(0);
  const [hoveredStar, setHoveredStar] = useState(0);
  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (rating === 0) {
      setError("Please select a rating.");
      return;
    }

    setIsSubmitting(true);

    try {
      await createReview({
        rentalRequestId,
        rating,
        comment: comment || undefined,
      });
      toast.success("Review submitted successfully!");
      setSubmitted(true);
    } catch (err: unknown) {
      const msg =
        err instanceof Error ? err.message : "Failed to submit review.";
      if (msg.toLowerCase().includes("already reviewed")) {
        setError(msg);
      } else {
        toast.error(msg);
      }
    } finally {
      setIsSubmitting(false);
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
    <form onSubmit={handleSubmit} className="space-y-3">
      {error && (
        <div className="p-3 text-sm text-amber-800 bg-amber-50 border border-amber-200 rounded-md">
          {error}
        </div>
      )}

      <div>
        <label className="block text-xs font-bold text-[#1F4D3E] uppercase tracking-wider mb-1">
          Rating
        </label>
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => setRating(star)}
              onMouseEnter={() => setHoveredStar(star)}
              onMouseLeave={() => setHoveredStar(0)}
              className="cursor-pointer"
            >
              <Star
                className={`w-6 h-6 transition-colors ${
                  star <= (hoveredStar || rating)
                    ? "fill-[#C98A2C] text-[#C98A2C]"
                    : "fill-none text-gray-300"
                }`}
              />
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-xs font-bold text-[#1F4D3E] uppercase tracking-wider mb-1">
          Comment (optional)
        </label>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Share your experience with this property..."
          rows={3}
          className="w-full px-3 py-2 text-sm bg-white border border-[#D8DBD3] rounded-md text-[#1B211E] focus:outline-none focus:border-[#1F4D3E] focus:ring-1
           focus:ring-[#1F4D3E] resize-none"
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="px-4 py-2 bg-[#1F4D3E] hover:bg-[#173B2F] disabled:opacity-60
         text-white text-xs font-bold rounded-md transition-colors cursor-pointer"
      >
        {isSubmitting ? "SUBMITTING..." : "SUBMIT REVIEW"}
      </button>
    </form>
  );
}
