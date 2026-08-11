import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

import { verifyToken, getTokenFromRequest } from "@/lib/auth/jwt";

export async function middleware(request: NextRequest) {
  const response = NextResponse.next();

  const demoCookie = request.cookies.get("bcrm_demo_session");
  const isDemo = !!demoCookie;

  const token = getTokenFromRequest(request);
  let user = null;
  if (token) {
    user = await verifyToken(token);
  }

  if (user) {
    response.headers.set("x-user-id", user.userId);
    response.headers.set("x-user-email", user.email);
    response.headers.set("x-user-name", user.name);
    response.headers.set("x-user-role", user.role);
  }

  const protectedPaths = ["/dashboard", "/chat", "/mail"];
  const isProtected = protectedPaths.some((path) => request.nextUrl.pathname.startsWith(path));

  if (isProtected && !user && !isDemo) {
    const url = request.nextUrl.clone();
    url.pathname = "/auth/v1/login";
    url.searchParams.set("redirect", request.nextUrl.pathname);
    return Response.redirect(url);
  }

  const authPaths = ["/auth"];
  const isAuth = authPaths.some((path) => request.nextUrl.pathname.startsWith(path));

  if (isAuth && (user || isDemo)) {
    const url = request.nextUrl.clone();
    const redirectTo = request.nextUrl.searchParams.get("redirect");
    url.pathname = redirectTo || "/dashboard/default";
    return Response.redirect(url);
  }

  // Allow /activate page without restrictions
  if (request.nextUrl.pathname === "/activate") {
    return response;
  }

  return response;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
