import { NextRequest, NextResponse } from "next/server";
import { auth0 } from "@/libs/auth0.lib";
import { routing } from "@/i18n/routing";
import { AUTH_ROUTES } from "@/constants/routes";
import createMiddleware from "next-intl/middleware";

const handleI18nRouting = createMiddleware(routing);

export async function proxy(request: NextRequest) {
  const url = new URL(request.url);

  if (url.pathname.startsWith(`/${AUTH_ROUTES.BASE}`)) {
    return auth0.middleware(request);
  }

  const session = await auth0.getSession();

  if (!session) {
    return NextResponse.redirect(new URL(`/${AUTH_ROUTES.LOGIN}`, request.url));
  }

  const i18nResponse = handleI18nRouting(request);

  if (i18nResponse.status >= 300 && i18nResponse.status < 400) {
    return i18nResponse;
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next|assets|fonts|logo|favicon.ico|robots.txt|sitemap.xml|manifest.webmanifest|site.webmanifest).*)",
  ],
};
