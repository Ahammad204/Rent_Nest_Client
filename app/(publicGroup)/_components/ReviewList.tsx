import { Star } from "lucide-react";
import type { IReview } from "@/lib/types";

interface ReviewListProps {
  reviews: IReview[];
  averageRating: number;
  totalReviews: number;
}

export function ReviewList({
  reviews,
  averageRating,
  totalReviews,
}: ReviewListProps) {
  return (
    <div>
      <h2 className="font-heading font-bold text-sm text-[#1F4D3E] uppercase tracking-wider mb-4">
        REVIEWS
      </h2>

      {/* Average Rating */}
      <div className="flex items-center gap-3 mb-6 p-4 bg-[#F4F5F1] border border-[#D8DBD3] rounded-lg">
        <div className="text-center">
          <div className="font-heading text-3xl font-bold text-[#1F4D3E]">
            {averageRating || "—"}
          </div>
          <div className="flex gap-0.5 mt-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                className={`w-4 h-4 ${
                  star <= Math.round(averageRating)
                    ? "fill-[#C98A2C] text-[#C98A2C]"
                    : "text-gray-300"
                }`}
              />
            ))}
          </div>
          <p className="text-xs text-gray-500 mt-1">
            {totalReviews} {totalReviews === 1 ? "review" : "reviews"}
          </p>
        </div>
      </div>

      {/* Review List */}
      {reviews.length === 0 ? (
        <p className="text-sm text-gray-500">No reviews yet.</p>
      ) : (
        <div className="space-y-4">
          {reviews.map((review) => (
            <div
              key={review.id}
              className="border border-[#D8DBD3] rounded-lg p-4"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-[#1F4D3E] flex items-center justify-center text-white text-xs font-bold">
                    {review.tenant.name.charAt(0).toUpperCase()}
                  </div>
                  <span className="text-sm font-medium text-[#1B211E]">
                    {review.tenant.name}
                  </span>
                </div>
                <div className="flex gap-0.5">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`w-3 h-3 ${
                        star <= review.rating
                          ? "fill-[#C98A2C] text-[#C98A2C]"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
              </div>
              {review.comment && (
                <p className="mt-2 text-sm text-gray-600">{review.comment}</p>
              )}
              <p className="mt-2 text-[10px] text-gray-400">
                {new Date(review.createdAt).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
