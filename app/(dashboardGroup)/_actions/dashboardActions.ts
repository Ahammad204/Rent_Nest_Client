"use server";

import { cookies } from "next/headers";

const authFetch = async (url: string) => {
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
};

export const getAllPropertiesAdmin = async () => {
  return authFetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/properties`);
};

export const getAllRentalsAdmin = async () => {
  return authFetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/rentals`);
};

export const getLandlordProperties = async () => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  if (!accessToken) {
    return { success: false, data: {} };
  }

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/properties`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    cache: "no-store",
  });

  return res.json();
};

export const getLandlordRentalRequests = async () => {
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
};

export const updateRentalRequestStatus = async (
  rentalId: string,
  status: "APPROVED" | "REJECTED",
) => {
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
};

export const updateProperty = async (
  propertyId: string,
  payload: Record<string, unknown>,
) => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  if (!accessToken) {
    return { success: false, message: "Not authenticated" };
  }

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/properties/${propertyId}`,
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
};

export const deleteProperty = async (propertyId: string) => {
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
};

export const createPaymentSession = async (rentalRequestId: string) => {
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
};

export const getPaymentBySessionId = async (sessionId: string) => {
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
};

export const createReview = async (payload: {
  rentalRequestId: string;
  rating: number;
  comment?: string;
}) => {
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
};