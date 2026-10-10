import { NextRequest, NextResponse } from 'next/server';
import { auth0 } from '@/libs/auth0.lib';
import { routing } from '@/i18n/routing';
import { AUTH } from '@/constants/constants';
import createMiddleware from 'next-intl/middleware';

const handleI18nRouting = createMiddleware(routing);

export async function proxy(request: NextRequest) {
  const url = new URL(request.url);
  const response = await auth0.middleware(request);

  if (url.pathname.startsWith(`/${AUTH.BASE}`) || url.pathname.startsWith(`/mock`)) {
    if (url.pathname.endsWith(`${AUTH.LOGOUT}`)) {
      response.cookies.delete('app-preferences');
    }

    return response;
  }

  const session = await auth0.getSession(request);

  if (!session) {
    return NextResponse.redirect(new URL(`/${AUTH.BASE}/${AUTH.LOGIN}`, request.url));
  }

  return handleI18nRouting(request);
}

export const config = {
  matcher: [
    '/((?!api|_next|assets|fonts|logo|favicon.ico|robots.txt|sitemap.xml|manifest.webmanifest|site.webmanifest).*)',
  ],
};
