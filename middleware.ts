import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {

  const loggedIn = request.cookies.get("loggedIn");

  const protectedRoutes = [
    "/dashboard",
    "/products",
    "/receipts",
    "/deliveries",
    "/adjustments",
    "/transfers",
    "/history"
  ];

  const isProtected = protectedRoutes.some((route) =>
    request.nextUrl.pathname.startsWith(route)
  );

  if (isProtected && !loggedIn) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}