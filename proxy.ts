import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getNewAccessToken } from "./service/refreshToken";

export async function proxy(request: NextRequest) {
  let accessToken = request.cookies.get("accessToken")?.value;
  const refreshToken = request.cookies.get("refreshToken")?.value;
  const { pathname } = request.nextUrl;

  const authPages = ["/login", "/register"];
  const publicPages = [
    "/properties",
    "/about",
    "/privacy",
    "/terms",
    "/landlord-guidelines",
    "/tenant-verification",
    "/rental-agreement",
    "/service-charges",
  ];
  const isAuthPage = authPages.some((page) => pathname.startsWith(page));
  const isPublicPage = publicPages.some((page) => pathname.startsWith(page));

  // Decode access token and check expiry
  let decoded = null;
  if (accessToken) {
    try {
      decoded = JSON.parse(atob(accessToken.split(".")[1]));
      if (decoded.exp && decoded.exp < Date.now() / 1000) {
        decoded = null; // expired
      }
    } catch {
      decoded = null; // invalid
    }
  }

  // Access token missing/expired but refresh token exists → try refresh
  if (!decoded && refreshToken) {
    const result = await getNewAccessToken();

    if (result.success && result.data?.accessToken) {
      const newAccessToken = result.data.accessToken;
      accessToken = newAccessToken;

      try {
        decoded = JSON.parse(atob(newAccessToken.split(".")[1]));
      } catch {
        decoded = null;
      }
    }
  }

  const userRole = decoded?.role ?? null;

  // Not logged in + trying to access protected page → redirect to login
  if (!accessToken && !isAuthPage && !isPublicPage && pathname !== "/") {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("redirectTo", pathname + request.nextUrl.search);
    return NextResponse.redirect(loginUrl);
  }

  // Logged in + trying to access auth pages → redirect to dashboard
  if (accessToken && isAuthPage) {
    if (userRole === "LANDLORD")
      return NextResponse.redirect(new URL("/landlord-dashboard", request.url));
    if (userRole === "ADMIN")
      return NextResponse.redirect(new URL("/admin-dashboard", request.url));
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // Role-based access control
  if (pathname.startsWith("/dashboard") && userRole !== "TENANT") {
    return NextResponse.redirect(new URL("/not-found", request.url));
  } else if (
    pathname.startsWith("/landlord-dashboard") &&
    userRole !== "LANDLORD"
  ) {
    return NextResponse.redirect(new URL("/not-found", request.url));
  } else if (pathname.startsWith("/admin-dashboard") && userRole !== "ADMIN") {
    return NextResponse.redirect(new URL("/not-found", request.url));
  }

  // If refresh succeeded, return response with new cookie
  if (
    accessToken &&
    accessToken !== request.cookies.get("accessToken")?.value
  ) {
    const response = NextResponse.next();
    response.cookies.set("accessToken", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24,
    });
    return response;
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|favicon.ico|_next/image|.*\\.png$).*)"],
};
