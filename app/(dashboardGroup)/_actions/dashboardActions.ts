"use server";

import { cookies } from "next/headers";

const authFetch = async (url: string) => {
  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value;

    if (!accessToken) {
      return { success: false, data: {} };
    }

    const res = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      cache: "no-store",
    });

    return res.json();
  } catch {
    return { success: false, data: {} };
  }
};

export const getMyRentalRequests = async () => {
  return authFetch(`${process.env.NEXT_PUBLIC_API_URL}/api/rentals`);
};

export const getMyPayments = async () => {
  return authFetch(`${process.env.NEXT_PUBLIC_API_URL}/api/payments`);
};

export const getRentalRequestById = async (id: string) => {
  return authFetch(`${process.env.NEXT_PUBLIC_API_URL}/api/rentals/${id}`);
};

export const getAllUsers = async () => {
  return authFetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/users`);
};

export const banUnbanUser = async (
  userId: string,
  status: "ACTIVE" | "BANNED",
) => {
  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value;

    if (!accessToken) {
      return { success: false, message: "Not authenticated" };
    }

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/admin/users/${userId}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ status }),
      },
    );

    return res.json();
  } catch {
    return { success: false, message: "Network error. Please try again." };
  }
};

export const getAllPropertiesAdmin = async () => {
  return authFetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/properties`);
};

export const getAllRentalsAdmin = async () => {
  return authFetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/rentals`);
};

export const getLandlordProperties = async () => {
  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value;

    if (!accessToken) {
      return { success: false, data: {} };
    }

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/properties/landlord`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      cache: "no-store",
    });

    return res.json();
  } catch {
    return { success: false, data: {} };
  }
};

export const getLandlordRentalRequests = async () => {
  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value;

    if (!accessToken) {
      return { success: false, data: {} };
    }

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/rentals/landlord`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        cache: "no-store",
      },
    );

    return res.json();
  } catch {
    return { success: false, data: {} };
  }
};

export const updateRentalRequestStatus = async (
  rentalId: string,
  status: "APPROVED" | "REJECTED",
) => {
  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value;

    if (!accessToken) {
      return { success: false, message: "Not authenticated" };
    }

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/rentals/landlord/${rentalId}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ status }),
      },
    );

    return res.json();
  } catch {
    return { success: false, message: "Network error. Please try again." };
  }
};

export const createProperty = async (payload: {
  title: string;
  description?: string;
  price: number;
  location: string;
  propertyType: string;
  categoryId?: string;
  amenities?: string[];
  images?: string[];
}) => {
  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value;

    if (!accessToken) {
      return { success: false, message: "Not authenticated" };
    }

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/properties`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(payload),
    });

    return res.json();
  } catch {
    return { success: false, message: "Network error. Please try again." };
  }
};

export const updateProperty = async (
  propertyId: string,
  payload: Record<string, unknown>,
) => {
  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value;

    if (!accessToken) {
      return { success: false, message: "Not authenticated" };
    }

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/properties/${propertyId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(payload),
      },
    );

    return res.json();
  } catch {
    return { success: false, message: "Network error. Please try again." };
  }
};

export const deleteProperty = async (propertyId: string) => {
  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value;

    if (!accessToken) {
      return { success: false, message: "Not authenticated" };
    }

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/properties/${propertyId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );

    return res.json();
  } catch {
    return { success: false, message: "Network error. Please try again." };
  }
};

export const createPaymentSession = async (rentalRequestId: string) => {
  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value;

    if (!accessToken) {
      throw new Error("Not authenticated");
    }

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/payments/create`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ rentalRequestId }),
      },
    );

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

export const getPaymentBySessionId = async (sessionId: string) => {
  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value;

    if (!accessToken) {
      return { success: false, data: {} };
    }

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/payments`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      cache: "no-store",
    });

    const result = await res.json();

    if (!result.success || !result.data?.payments) {
      return { success: false, data: {} };
    }

    const payment = result.data.payments.find(
      (p: { transactionId: string }) => p.transactionId === sessionId,
    );

    return {
      success: !!payment,
      data: { payment: payment || null },
    };
  } catch {
    return { success: false, data: {} };
  }
};

export const createReview = async (payload: {
  rentalRequestId: string;
  rating: number;
  comment?: string;
}) => {
  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value;

    if (!accessToken) {
      throw new Error("Not authenticated");
    }

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/reviews`, {
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

export const updateProfile = async (payload: {
  name?: string;
  phone?: string;
  bio?: string;
}) => {
  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value;

    if (!accessToken) {
      throw new Error("Not authenticated");
    }

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users/me`, {
      method: "PUT",
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

// --- Stats ---
export const getAdminStats = async () => {
  return authFetch(`${process.env.NEXT_PUBLIC_API_URL}/api/stats/admin`);
};

// --- Categories ---
export const getAllCategories = async () => {
  return authFetch(`${process.env.NEXT_PUBLIC_API_URL}/api/category`);
};

export const createCategory = async (payload: {
  name: string;
  description?: string;
}) => {
  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value;

    if (!accessToken) {
      return { success: false, message: "Not authenticated" };
    }

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/category`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(payload),
    });

    return res.json();
  } catch {
    return { success: false, message: "Network error. Please try again." };
  }
};

export const updateCategory = async (
  categoryId: string,
  payload: { name?: string; description?: string },
) => {
  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value;

    if (!accessToken) {
      return { success: false, message: "Not authenticated" };
    }

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/category/${categoryId}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(payload),
      },
    );

    return res.json();
  } catch {
    return { success: false, message: "Network error. Please try again." };
  }
};

export const deleteCategory = async (categoryId: string) => {
  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value;

    if (!accessToken) {
      return { success: false, message: "Not authenticated" };
    }

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/category/${categoryId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );

    return res.json();
  } catch {
    return { success: false, message: "Network error. Please try again." };
  }
};