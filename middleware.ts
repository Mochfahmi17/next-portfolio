import { NextRequest, NextResponse } from "next/server";

const dashboardRoutes = "/dashboard";
const authRoutes = ["/login"];

export default function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get("accessToken")?.value;
  console.log({ token });

  if (!token && pathname.startsWith(dashboardRoutes)) {
    return NextResponse.redirect(new URL("/", request.nextUrl));
  }

  if (token && authRoutes.includes(pathname)) {
    return NextResponse.redirect(new URL("/", request.nextUrl));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
