import { z } from "zod";

export const profileSchema = z.object({
  name: z
    .string()
    .min(1, "Full name is required")
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name must be less than 100 characters"),
  phone: z
    .string()
    .optional()
    .refine(
      (val) => !val || /^(\+880|880|0)?1[3-9]\d{8}$/.test(val),
      "Please enter a valid Bangladeshi phone number"
    ),
  bio: z
    .string()
    .optional()
    .refine(
      (val) => !val || val.length <= 500,
      "Bio must be less than 500 characters"
    ),
});

export type ProfileFormData = z.infer<typeof profileSchema>;