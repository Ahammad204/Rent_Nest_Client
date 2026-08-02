"use server";

import { cookies } from "next/headers";

export const getProperties = async (params?: {
  page?: string;
  limit?: string;
  location?: string;
  minPrice?: string;
  maxPrice?: string;
  propertyType?: string;
  categoryId?: string;
}) => {
  try {
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

    return await res.json();
  } catch {
    return {
      success: false,
      statusCode: 500,
      message: "Failed to load properties.",
      data: { properties: [] },
      meta: { page: 1, limit: 9, total: 0 },
    };
  }
};

export const getCategories = async () => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/category`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      cache: "force-cache",
      next: { revalidate: 60 * 60 * 24 },
    });

    return await res.json();
  } catch {
    return {
      success: false,
      statusCode: 500,
      message: "Failed to load categories.",
      data: { categories: [] },
    };
  }
};

export const getPropertyById = async (id: string) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/properties/${id}`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        cache: "no-store",
      },
    );

    return await res.json();
  } catch {
    return {
      success: false,
      statusCode: 500,
      message: "Failed to load property details.",
      data: { property: null },
    };
  }
};

export const getReviewsByProperty = async (propertyId: string) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/reviews/property/${propertyId}`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        cache: "no-store",
      },
    );

    return await res.json();
  } catch {
    return {
      success: false,
      statusCode: 500,
      message: "Failed to load reviews.",
      data: { reviews: [], averageRating: 0, totalReviews: 0 },
    };
  }
};

export const createRentalRequest = async (payload: {
  propertyId: string;
  moveInDate?: string;
  message?: string;
}) => {
  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value;

    if (!accessToken) {
      throw new Error("Not authenticated");
    }

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/rentals`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(payload),
    });

    const result = await res.json();
    if (!result.success) {
      throw new Error(result.message);
    }
    return result;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error("Network error. Please try again.");
  }
};

export const getMyRentalRequests = async () => {
  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value;

    if (!accessToken) {
      return { success: false, data: { requests: [] } };
    }

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/rentals`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      cache: "no-store",
    });

    return await res.json();
  } catch {
    return {
      success: false,
      statusCode: 500,
      message: "Failed to load requests.",
      data: { requests: [] },
    };
  }
};