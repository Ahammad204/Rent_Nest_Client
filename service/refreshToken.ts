"use server";

import { cookies } from "next/headers";

export const getNewAccessToken = async () => {
  const cookieStore = await cookies();
  const refreshTokenValue = cookieStore.get("refreshToken")?.value || null;

  if (!refreshTokenValue) {
    return {
      success: false,
      message: "Refresh token not found!",
    };
  }

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/auth/refresh-token`,
    {
      method: "POST",
      headers: {
        Cookie: `refreshToken=${refreshTokenValue}`,
      },
      cache: "no-cache",
    }
  );

  const result = await res.json();

  if (result.success && result.data?.accessToken) {
    const store = await cookies();
    store.set("accessToken", result.data.accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24,
    });
  }

  return result;
};