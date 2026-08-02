"use server";

import type {
  ApiResponse,
  IProperty,
  ICategory,
  PropertyMeta,
} from "@/lib/types";

export const getProperties = async (params?: {
  page?: string;
  limit?: string;
  location?: string;
  minPrice?: string;
  maxPrice?: string;
  propertyType?: string;
  categoryId?: string;
}) => {
  const searchParams = new URLSearchParams();
  if (params?.page) searchParams.set("page", params.page);
  if (params?.limit) searchParams.set("limit", params.limit);
  if (params?.location) searchParams.set("location", params.location);
  if (params?.minPrice) searchParams.set("minPrice", params.minPrice);
  if (params?.maxPrice) searchParams.set("maxPrice", params.maxPrice);
  if (params?.propertyType)
    searchParams.set("propertyType", params.propertyType);
  if (params?.categoryId) searchParams.set("categoryId", params.categoryId);

  const queryString = searchParams.toString();
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/properties${queryString ? `?${queryString}` : ""}`;

  const res = await fetch(url, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
    cache: "no-store",
  });

  const result: ApiResponse<{ properties: IProperty[] }> & {
    meta: PropertyMeta;
  } = await res.json();
  return result;
};

export const getCategories = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/category`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
    cache: "force-cache",
    next: { revalidate: 60 * 60 * 24 },
  });

  const result: ApiResponse<{ categories: ICategory[] }> = await res.json();
  return result;
};
