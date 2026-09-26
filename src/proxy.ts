import { NextRequest, NextResponse } from "next/server";
import { auth0 } from "@/libs/auth0.lib";
import { routing } from "@/i18n/routing";
import { AUTH_ROUTES } from "@/constants/routes";
import createMiddleware from "next-intl/middleware";
import { getCurrentUserAction, getCurrentUserAppBehaviourPreferencesAction } from "./actions/user.actions";
import { UserAppBehaviourPreferences } from "./interfaces/user.interface";

const handleI18nRouting = createMiddleware(routing);

export async function proxy(request: NextRequest) {
  const url = new URL(request.url);

  if (url.pathname === `/${AUTH_ROUTES.LOGOUT}`) {
    const response = await auth0.middleware(request);

    response.cookies.delete("app-preferences");

    return response;
  }

  if (url.pathname.startsWith(`/${AUTH_ROUTES.BASE}`)) {
    return auth0.middleware(request);
  }

  const session = await auth0.getSession();

  if (!session) {
    return NextResponse.redirect(new URL(`/${AUTH_ROUTES.LOGIN}`, request.url));
  }

  const currentUser = await getCurrentUserAction();

  const preferencesCookie = request.cookies.get("app-preferences")?.value;
  let appPreferences: UserAppBehaviourPreferences | null = null;

  if (preferencesCookie) {
    try {
      appPreferences = JSON.parse(preferencesCookie);
    } catch {
      appPreferences = null;
    }
  }

  if (!appPreferences) {
    appPreferences = await getCurrentUserAppBehaviourPreferencesAction();
  }

  const preferredLocale = appPreferences.language.toLocaleLowerCase();
  const pathname = request.nextUrl.pathname;

  const currentLocale = routing.locales.find(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`),
  );

  if (currentLocale !== preferredLocale) {
    const pathnameWithoutLocale = currentLocale ? pathname.replace(`/${currentLocale}`, "") || "/" : pathname;

    return NextResponse.redirect(new URL(`/${preferredLocale}${pathnameWithoutLocale}`, request.url));
  }

  const i18nResponse = handleI18nRouting(request);

  if (currentUser && appPreferences) {
    i18nResponse.cookies.set(
      "app-preferences",
      JSON.stringify({
        language: appPreferences.language.toLocaleLowerCase(),
        theme: appPreferences.theme.toLocaleLowerCase(),
      }),
      {
        httpOnly: true,
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
        path: "/",
      },
    );
  }

  return i18nResponse;
}

export const config = {
  matcher: [
    "/((?!api|_next|assets|fonts|logo|favicon.ico|robots.txt|sitemap.xml|manifest.webmanifest|site.webmanifest).*)",
  ],
};
