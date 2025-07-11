import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

const isAllowedRoute = createRouteMatcher([
  '/onboarding(.*)',
  '/sign-in(.*)',
  '/sign-up(.*)',
  '/api/(.*)',
]);


export default clerkMiddleware((auth, req: NextRequest) => {
  // If the route is not an allowed route for the portfolio mode, 
  // redirect to the start of onboarding.
  if (!isAllowedRoute(req)) {
    const onboardingUrl = new URL('/onboarding', req.url);
    return NextResponse.redirect(onboardingUrl);
  }
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
}; 