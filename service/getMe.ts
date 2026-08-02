"use server";

import { cookies } from "next/headers";
import { getNewAccessToken } from "./refreshToken";

export const getMe = async () => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  if (!accessToken) {
    return {
      success: false,
      message: "User not logged in",
    };
  }

  let res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    cache: "no-store",
  });

  // If 401, try refresh and retry once
  if (res.status === 401) {
    const refreshResult = await getNewAccessToken();
    if (refreshResult.success && refreshResult.data?.accessToken) {
      const newAccessToken = refreshResult.data.accessToken;
      res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users/me`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${newAccessToken}`,
        },
        cache: "no-store",
      });
    }
  }

  const result = await res.json();
  return result;
};
