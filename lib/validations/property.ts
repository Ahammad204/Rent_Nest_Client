import { z } from "zod";

export const propertySchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  price: z.coerce.number().min(1, "Price must be greater than 0"),
  location: z.string().min(1, "Location is required"),
  propertyType: z.string().min(1, "Property type is required"),
  categoryId: z.string().optional(),
  amenities: z.string().optional(),
  images: z.array(z.string()).optional(),
  status: z.enum(["AVAILABLE", "RENTED"]).optional(),
});

export type PropertyFormData = z.infer<typeof propertySchema>;