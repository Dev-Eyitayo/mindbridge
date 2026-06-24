import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const token    = req.nextauth.token;
    const isAuth   = !!token;
    const pathname = req.nextUrl.pathname;

    if (isAuth && pathname === "/login") {
      return NextResponse.redirect(new URL("/chat", req.url));
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        const pathname = req.nextUrl.pathname;
        if (pathname === "/" || pathname === "/login") return true;
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