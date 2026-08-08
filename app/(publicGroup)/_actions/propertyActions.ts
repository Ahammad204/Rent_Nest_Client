"use server";

import { IProperty } from "@/lib/types";
import { cookies } from "next/headers";

export const getProperties = async (params?: {
  page?: string;
  limit?: string;
  location?: string;
  minPrice?: string;
  maxPrice?: string;
  propertyType?: string;
  categoryId?: string;
  sortBy?: string;
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
    if (params?.sortBy) searchParams.set("sortBy", params.sortBy);

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

export const getFeaturedLocations = async () => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/properties?limit=1000`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        cache: "no-store",
      },
    );
    const data = await res.json();
    const properties = data.data?.properties || [];

    // Extract unique cities from location field
    const cityMap = new Map<string, { count: number; areas: Set<string> }>();

    for (const p of properties) {
      const parts = p.location.split(",").map((s: string) => s.trim());
      const city = parts[parts.length - 1] || parts[0]; // last part is city
      const area = parts.length > 1 ? parts[0] : "";

      if (!cityMap.has(city)) {
        cityMap.set(city, { count: 0, areas: new Set() });
      }
      const entry = cityMap.get(city)!;
      entry.count++;
      if (area) entry.areas.add(area);
    }

    // Sort by count, take top 5
    const locations = Array.from(cityMap.entries())
      .sort((a, b) => b[1].count - a[1].count)
      .slice(0, 5)
      .map(([city, data]) => ({
        name: city,
        listingsCount: data.count,
        popularAreas: Array.from(data.areas).slice(0, 3).join(", "),
      }));

    return { success: true, data: { locations } };
  } catch {
    return { success: false, data: { locations: [] } };
  }
};

export const getPublicStats = async () => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/stats`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      cache: "no-store",
    });
    return await res.json();
  } catch {
    return {
      success: false,
      data: {
        activeListings: 0,
        verifiedLandlords: 0,
        happyTenants: 0,
        citiesCount: 0,
      },
    };
  }
};

export async function getRelatedProperties(
  propertyId: string,
  location: string,
) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/properties?location=${encodeURIComponent(location)}&limit=4`,
      { cache: "no-store" },
    );
    const data = await res.json();

    if (!data.success) return { success: false, data: { properties: [] } };

    // Filter out the current property and limit to 3
    const related = (data.data?.properties || [])
      .filter((p: IProperty) => p.id !== propertyId)
      .slice(0, 3);

    return { success: true, data: { properties: related } };
  } catch {
    return { success: false, data: { properties: [] } };
  }
}
