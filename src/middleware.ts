import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

import {
  DEFAULT_LOGIN_REDIRECT,
  apiAuthPrefix,
  authRoutes,
  privateRoutes,
} from "@/routes";

export async function middleware(req: NextRequest) {
  const { nextUrl } = req;
  const isLoggedIn = !!(await getToken({
    req: req,
    cookieName: "user_token",
    secret: process.env.AUTH_SECRET,
  }));
  const isApiRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
  const isPublicRoute = !privateRoutes.includes(nextUrl.pathname);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);

  //   If it's an API route, allow access to everyone because API routes are used for auth
  if (isApiRoute) {
    return;
  }

  if (isAuthRoute) {
    if (isLoggedIn) {
      return NextResponse.redirect(new URL("/", nextUrl));
      //   return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
    }

    return;
  }

  if (!isLoggedIn && !isPublicRoute) {
    return NextResponse.redirect(new URL("/", nextUrl));
  }
  return;
}

// const { auth } = NextAuth(authConfig);

// export default auth((req) => {
//   const { nextUrl } = req;
//   const isLoggedIn = !!req.auth;
//   const isApiRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
//   const isPublicRoute = privateRoutes.includes(nextUrl.pathname);
//   const isAuthRoute = authRoutes.includes(nextUrl.pathname);

//   console.log("Pathname: ", nextUrl.pathname);
//   console.log("IsAuthRoute: ", isAuthRoute);
//   console.log("IsLoggedIn: ", isLoggedIn);
//   //   console.log("IsAuth: ",);

//   if (isApiRoute) {
//     // This just means 'Do Nothing!'
//     return;
//   }

//   if (isAuthRoute) {
//     if (isLoggedIn) {
//       return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
//     }

//     return;
//   }

//   if (!isLoggedIn && !isPublicRoute) {
//     // return Response.redirect(new URL("/auth/login", nextUrl));
//     return;
//   }

//   return;
// });

// Optionally, don't invoke middleware on some paths
export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
