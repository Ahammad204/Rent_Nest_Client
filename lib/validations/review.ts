import { z } from "zod";

export const reviewSchema = z.object({
  rating: z
    .number()
    .min(1, "Please select a rating")
    .max(5, "Rating must be between 1 and 5"),
  comment: z
    .string()
    .optional()
    .refine(
      (val) => !val || val.length <= 500,
      "Comment must be less than 500 characters"
    ),
});

export type ReviewFormData = z.infer<typeof reviewSchema>;