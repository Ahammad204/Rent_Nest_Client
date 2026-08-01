import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  const accessToken = request.cookies.get("accessToken")?.value;
  const { pathname } = request.nextUrl;

  const authPages = ["/login", "/register"];
  const isAuthPage = authPages.some((page) => pathname.startsWith(page));

  // Not logged in + trying to access protected page
  if (!accessToken && !isAuthPage && pathname !== "/") {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Logged in + trying to access auth pages → redirect to dashboard
  if (accessToken && isAuthPage) {
    try {
      const payload = JSON.parse(
        atob(accessToken.split(".")[1])
      );
      if (payload.role === "LANDLORD")
        return NextResponse.redirect(
          new URL("/landlord-dashboard", request.url)
        );
      if (payload.role === "ADMIN")
        return NextResponse.redirect(
          new URL("/admin-dashboard", request.url)
        );
      return NextResponse.redirect(new URL("/dashboard", request.url));
    } catch {
      return NextResponse.next();
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|favicon.ico|_next/image|.*\\.png$).*)",
  ],
};