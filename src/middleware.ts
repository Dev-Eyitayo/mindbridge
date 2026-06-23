import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const token    = req.nextauth.token;
    const isAuth   = !!token;
    const pathname = req.nextUrl.pathname;

    const isPublicPage = pathname === "/" || pathname === "/login";

    if (isAuth && isPublicPage) {
      return NextResponse.redirect(new URL("/chat", req.url));
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        const pathname = req.nextUrl.pathname;
        // Public pages are always accessible
        if (pathname === "/" || pathname === "/login") return true;
        // Everything else requires auth
        return !!token;
      },
    },
    pages: {
      signIn: "/login",
    },
  }
);

export const config = {
  matcher: [
    "/",
    "/login",
    "/chat/:path*",
    "/dashboard/:path*",
    "/mood/:path*",
    "/support/:path*",
  ],
};