"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { X, Upload, Loader2 } from "lucide-react";
import Image from "next/image";
import {
  propertySchema,
  type PropertyFormData,
} from "@/lib/validations/property";
import { createProperty, updateProperty } from "../_actions/dashboardActions";

interface ImageItem {
  url: string;
  uploading: boolean;
}

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
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [images, setImages] = useState<ImageItem[]>(
    initialData?.images?.length
      ? initialData.images.map((url) => ({ url, uploading: false }))
      : [],
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

  const uploadToCloudinary = async (file: File): Promise<string | null> => {
    const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
    const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

    if (!cloudName || !uploadPreset) {
      toast.error("Cloudinary is not configured");
      return null;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", uploadPreset);

    try {
      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        {
          method: "POST",
          body: formData,
        },
      );

      const data = await res.json();

      if (data.secure_url) {
        return data.secure_url;
      }

      toast.error(data.error?.message || "Upload failed");
      return null;
    } catch {
      toast.error("Upload failed. Please try again.");
      return null;
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const newImages: ImageItem[] = Array.from(files).map(() => ({
      url: "",
      uploading: true,
    }));

    setImages((prev) => [...prev, ...newImages]);

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const tempIndex = images.length + i;

      const url = await uploadToCloudinary(file);

      setImages((prev) =>
        prev.map((img, idx) =>
          idx === tempIndex
            ? { url: url || "", uploading: false }
            : img,
        ),
      );
    }

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const onSubmit = async (data: PropertyFormData) => {
    setIsSubmitting(true);

    const uploadingImages = images.some((img) => img.uploading);
    if (uploadingImages) {
      toast.error("Please wait for all images to finish uploading");
      setIsSubmitting(false);
      return;
    }

    const imageUrls = images
      .filter((img) => img.url && !img.uploading)
      .map((img) => img.url);

    const payload = {
      ...data,
      images: imageUrls,
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
            <p className="text-xs text-red-500 mt-1">
              {errors.title.message}
            </p>
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
            <p className="text-xs text-red-500 mt-1">
              {errors.price.message}
            </p>
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

      {/* Image Upload Section */}
      <div>
        <label className="block text-xs font-bold text-[#1F4D3E] uppercase tracking-wider mb-2">
          Property Images
        </label>

        {/* Image Thumbnails */}
        {images.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-3">
            {images.map((img, index) => (
              <div
                key={index}
                className="relative aspect-square rounded-md overflow-hidden border border-[#D8DBD3] bg-gray-100"
              >
                {img.uploading ? (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Loader2 className="w-6 h-6 text-[#1F4D3E] animate-spin" />
                  </div>
                ) : img.url ? (
                  <>
                    <Image
                      src={img.url}
                      alt={`Property image ${index + 1}`}
                      fill
                      className="object-cover"
                      unoptimized
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute top-1 right-1 w-6 h-6 bg-red-600 hover:bg-red-700 rounded-full flex items-center justify-center cursor-pointer"
                    >
                      <X className="w-3 h-3 text-white" />
                    </button>
                  </>
                ) : null}
              </div>
            ))}
          </div>
        )}

        {/* Upload Button */}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          multiple
          onChange={handleFileChange}
          className="hidden"
        />
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          disabled={images.some((img) => img.uploading)}
          className="flex items-center gap-2 px-4 py-2 border border-[#D8DBD3] hover:bg-[#F4F5F1] text-gray-600 text-xs font-bold rounded-md transition-colors cursor-pointer disabled:opacity-60"
        >
          <Upload className="w-4 h-4" />
          UPLOAD IMAGE
        </button>
      </div>

      <button
        type="submit"
        disabled={isSubmitting || images.some((img) => img.uploading)}
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