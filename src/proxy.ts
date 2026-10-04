import { NextRequest, NextResponse } from 'next/server';
import { auth0 } from '@/libs/auth0.lib';
import { routing } from '@/i18n/routing';
import { APP_ROUTES, AUTH } from '@/constants/constants';
import {
  getCurrentUserAction,
  getCurrentUserAppBehaviourPreferencesAction,
} from '@/actions/user.actions';
import { UserAppBehaviourPreferences } from '@/interfaces/user.interface';
import createMiddleware from 'next-intl/middleware';

const handleI18nRouting = createMiddleware(routing);

export async function proxy(request: NextRequest) {
  const url = new URL(request.url);
  const response = await auth0.middleware(request);

  if (url.pathname.startsWith(`/${AUTH.BASE}`)) {
    if (url.pathname === `/${AUTH.BASE}/${AUTH.LOGOUT}`) {
      response.cookies.delete('app-preferences');

      // Mock middleware returns simple NextResponse
      if (response.ok) {
        return NextResponse.redirect(new URL(`${APP_ROUTES.HOME}`, request.url));
      }
    }

    return response;
  }

  const session = await auth0.getSession(request);

  if (!session) {
    return NextResponse.redirect(new URL(`/${AUTH.BASE}/${AUTH.LOGIN}`, request.url));
  }

  const currentUser = await getCurrentUserAction();

  if (!currentUser) {
    return NextResponse.redirect(new URL(`/${AUTH.BASE}/${AUTH.LOGOUT}`, request.url));
  }

  const preferencesCookie = request.cookies.get('app-preferences')?.value;
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
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`)
  );

  if (currentLocale !== preferredLocale) {
    const pathnameWithoutLocale = currentLocale
      ? pathname.replace(`/${currentLocale}`, '') || '/'
      : pathname;

    return NextResponse.redirect(
      new URL(`/${preferredLocale}${pathnameWithoutLocale}`, request.url)
    );
  }

  const i18nResponse = handleI18nRouting(request);

  i18nResponse.cookies.set(
    'app-preferences',
    JSON.stringify({
      language: appPreferences.language.toLocaleLowerCase(),
      theme: appPreferences.theme.toLocaleLowerCase(),
    }),
    {
      httpOnly: true,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
      path: '/',
    }
  );

  return i18nResponse;
}

export const config = {
  matcher: [
    '/((?!api|_next|assets|fonts|logo|favicon.ico|robots.txt|sitemap.xml|manifest.webmanifest|site.webmanifest).*)',
  ],
};
