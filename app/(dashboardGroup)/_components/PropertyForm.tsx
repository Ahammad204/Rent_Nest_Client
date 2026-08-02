"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Plus, X } from "lucide-react";
import {
  propertySchema,
  type PropertyFormData,
} from "@/lib/validations/property";
import { createProperty, updateProperty } from "../_actions/dashboardActions";

interface PropertyFormProps {
  mode: "create" | "edit";
  categories: { id: string; name: string }[];
  initialData?: {
    id: string;
    title: string;
    description: string | null;
    price: number;
    location: string;
    propertyType: string;
    categoryId: string | null;
    amenities: string[];
    images: string[];
    status: string;
  };
  propertyId?: string;
}

export function PropertyForm({
  mode,
  categories,
  initialData,
  propertyId,
}: PropertyFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imageUrls, setImageUrls] = useState<string[]>(
    initialData?.images?.length ? initialData.images : [""],
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PropertyFormData>({
    resolver: zodResolver(propertySchema),
    defaultValues: {
      title: initialData?.title || "",
      description: initialData?.description || "",
      price: initialData?.price || 0,
      location: initialData?.location || "",
      propertyType: initialData?.propertyType || "",
      categoryId: initialData?.categoryId || "",
      amenities: initialData?.amenities?.join(", ") || "",
      images: initialData?.images || [],
      status: (initialData?.status as "AVAILABLE" | "RENTED") || "AVAILABLE",
    },
  });

  const addImageUrl = () => setImageUrls([...imageUrls, ""]);
  const removeImageUrl = (index: number) => {
    setImageUrls(imageUrls.filter((_, i) => i !== index));
  };
  const updateImageUrl = (index: number, value: string) => {
    const updated = [...imageUrls];
    updated[index] = value;
    setImageUrls(updated);
  };

  const onSubmit = async (data: PropertyFormData) => {
    setIsSubmitting(true);

    const filteredImages = imageUrls.filter((url) => url.trim() !== "");

    const payload = {
      ...data,
      images: filteredImages,
      amenities: data.amenities
        ? data.amenities
            .split(",")
            .map((a) => a.trim())
            .filter(Boolean)
        : [],
      categoryId: data.categoryId || undefined,
    };

    try {
      let result;
      if (mode === "create") {
        result = await createProperty(payload);
      } else {
        result = await updateProperty(propertyId!, payload);
      }

      if (result.success) {
        toast.success(
          mode === "create"
            ? "Property created successfully!"
            : "Property updated successfully!",
        );
        router.push("/landlord-dashboard/properties");
      } else {
        toast.error(result.message || "Something went wrong");
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Something went wrong";
      toast.error(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-bold text-[#1F4D3E] uppercase tracking-wider mb-1">
            Title
          </label>
          <input
            {...register("title")}
            className="w-full px-3 py-2 text-sm bg-white border border-[#D8DBD3] rounded-md text-[#1B211E] focus:outline-none focus:border-[#1F4D3E] focus:ring-1 focus:ring-[#1F4D3E]"
          />
          {errors.title && (
            <p className="text-xs text-red-500 mt-1">{errors.title.message}</p>
          )}
        </div>

        <div>
          <label className="block text-xs font-bold text-[#1F4D3E] uppercase tracking-wider mb-1">
            Location
          </label>
          <input
            {...register("location")}
            className="w-full px-3 py-2 text-sm bg-white border border-[#D8DBD3] rounded-md text-[#1B211E] focus:outline-none focus:border-[#1F4D3E] focus:ring-1 focus:ring-[#1F4D3E]"
          />
          {errors.location && (
            <p className="text-xs text-red-500 mt-1">
              {errors.location.message}
            </p>
          )}
        </div>

        <div>
          <label className="block text-xs font-bold text-[#1F4D3E] uppercase tracking-wider mb-1">
            Price (৳/month)
          </label>
          <input
            type="number"
            step="0.01"
            {...register("price")}
            className="w-full px-3 py-2 text-sm bg-white border border-[#D8DBD3] rounded-md text-[#1B211E] focus:outline-none focus:border-[#1F4D3E] focus:ring-1 focus:ring-[#1F4D3E]"
          />
          {errors.price && (
            <p className="text-xs text-red-500 mt-1">{errors.price.message}</p>
          )}
        </div>

        <div>
          <label className="block text-xs font-bold text-[#1F4D3E] uppercase tracking-wider mb-1">
            Property Type
          </label>
          <select
            {...register("propertyType")}
            className="w-full px-3 py-2 text-sm bg-white border border-[#D8DBD3] rounded-md text-[#1B211E] focus:outline-none focus:border-[#1F4D3E] focus:ring-1 focus:ring-[#1F4D3E]"
          >
            <option value="">Select type</option>
            <option value="APARTMENT">Apartment</option>
            <option value="HOUSE">House</option>
            <option value="STUDIO">Studio</option>
            <option value="ROOM">Room</option>
            <option value="COMMERCIAL">Commercial</option>
          </select>
          {errors.propertyType && (
            <p className="text-xs text-red-500 mt-1">
              {errors.propertyType.message}
            </p>
          )}
        </div>

        <div>
          <label className="block text-xs font-bold text-[#1F4D3E] uppercase tracking-wider mb-1">
            Category
          </label>
          <select
            {...register("categoryId")}
            className="w-full px-3 py-2 text-sm bg-white border border-[#D8DBD3] rounded-md text-[#1B211E] focus:outline-none focus:border-[#1F4D3E] focus:ring-1 focus:ring-[#1F4D3E]"
          >
            <option value="">No category</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        {mode === "edit" && (
          <div>
            <label className="block text-xs font-bold text-[#1F4D3E] uppercase tracking-wider mb-1">
              Status
            </label>
            <select
              {...register("status")}
              className="w-full px-3 py-2 text-sm bg-white border border-[#D8DBD3] rounded-md text-[#1B211E] focus:outline-none focus:border-[#1F4D3E] focus:ring-1 focus:ring-[#1F4D3E]"
            >
              <option value="AVAILABLE">Available</option>
              <option value="RENTED">Rented</option>
            </select>
          </div>
        )}
      </div>

      <div>
        <label className="block text-xs font-bold text-[#1F4D3E] uppercase tracking-wider mb-1">
          Description
        </label>
        <textarea
          {...register("description")}
          rows={3}
          className="w-full px-3 py-2 text-sm bg-white border border-[#D8DBD3] rounded-md text-[#1B211E] focus:outline-none focus:border-[#1F4D3E] focus:ring-1 focus:ring-[#1F4D3E] resize-none"
        />
      </div>

      <div>
        <label className="block text-xs font-bold text-[#1F4D3E] uppercase tracking-wider mb-1">
          Amenities (comma separated)
        </label>
        <input
          {...register("amenities")}
          placeholder="e.g. WiFi, Parking, AC"
          className="w-full px-3 py-2 text-sm bg-white border border-[#D8DBD3] rounded-md text-[#1B211E] focus:outline-none focus:border-[#1F4D3E] focus:ring-1 focus:ring-[#1F4D3E]"
        />
      </div>

      <div>
        <label className="block text-xs font-bold text-[#1F4D3E] uppercase tracking-wider mb-1">
          Image URLs
        </label>
        <div className="space-y-2">
          {imageUrls.map((url, index) => (
            <div key={index} className="flex gap-2">
              <input
                value={url}
                onChange={(e) => updateImageUrl(index, e.target.value)}
                placeholder="https://example.com/image.jpg"
                className="flex-1 px-3 py-2 text-sm bg-white border border-[#D8DBD3] rounded-md text-[#1B211E] focus:outline-none focus:border-[#1F4D3E] focus:ring-1 focus:ring-[#1F4D3E]"
              />
              {imageUrls.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeImageUrl(index)}
                  className="px-2 text-red-500 hover:text-red-700 cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={addImageUrl}
            className="flex items-center gap-1 text-xs font-bold text-[#1F4D3E] hover:underline cursor-pointer"
          >
            <Plus className="w-3 h-3" /> Add Image URL
          </button>
        </div>
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full py-3 px-4 bg-[#1F4D3E] hover:bg-[#173B2F] disabled:opacity-60 text-white text-xs font-bold rounded-md transition-colors cursor-pointer"
      >
        {isSubmitting
          ? "SAVING..."
          : mode === "create"
            ? "CREATE PROPERTY"
            : "UPDATE PROPERTY"}
      </button>
    </form>
  );
}
