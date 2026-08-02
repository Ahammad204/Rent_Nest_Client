import { z } from "zod";

export const rentalRequestSchema = z.object({
  moveInDate: z
    .string()
    .optional()
    .refine(
      (val) => {
        if (!val) return true;
        const date = new Date(val);
        return !isNaN(date.getTime());
      },
      { message: "Please enter a valid date" },
    ),
  message: z
    .string()
    .max(500, "Message must be 500 characters or fewer")
    .optional(),
});

export type RentalRequestFormData = z.infer<typeof rentalRequestSchema>;