import { NextRequest, NextResponse } from 'next/server';
import { auth0 } from '@/libs/auth0.lib';
import { routing } from '@/i18n/routing';
import { AUTH } from '@/constants/constants';
import { getCurrentUserAction } from '@/actions/user.actions';
import createMiddleware from 'next-intl/middleware';
import { ApiError } from '@/libs/api-client.lib';

const handleI18nRouting = createMiddleware(routing);

export async function proxy(request: NextRequest) {
  const url = new URL(request.url);
  const response = await auth0.middleware(request);

  if (url.pathname.startsWith(`/${AUTH.BASE}`) || url.pathname.startsWith(`/mock`)) {
    return response;
  }

  try {
    await getCurrentUserAction();
  } catch (error) {
    if (error instanceof ApiError) {
      if (error.status === 410 || error.status === 409) {
        return NextResponse.redirect(new URL(`/${AUTH.BASE}/${AUTH.LOGOUT}`, request.url));
      }
    }
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
