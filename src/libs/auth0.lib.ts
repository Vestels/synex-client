import { Auth0Client } from '@auth0/nextjs-auth0/server';
import { NextRequest, NextResponse } from 'next/server';
import { mockSession } from '@/libs/mock-auth0.lib';
import { AUTH } from '@/constants/constants';
import { MockAuth0ClientType } from '@/types/auth0.types';
import { isMock } from '@/libs/mock.lib';

let auth0Instance: Auth0Client | MockAuth0ClientType;

if (isMock) {
  auth0Instance = {
    middleware: async (request: NextRequest) => {
      const url = new URL(request.url);

      if (url.pathname === `/${AUTH.BASE}/${AUTH.LOGOUT}`) {
        return NextResponse.redirect(new URL(`/mock/logout`, request.url));
      }

      return NextResponse.next();
    },

    getSession: async () => {
      return mockSession;
    },

    getAccessToken: async () => {
      return {
        token: 'mock-access-token',
        expiresAt: Math.floor(Date.now() / 1000) + 86400,
      };
    },

    startInteractiveLogin: async () => {
      return NextResponse.redirect(new URL(`/mock/link-account`, process.env.APP_BASE_URL));
    },
  };
} else {
  auth0Instance = new Auth0Client({
    authorizationParameters: {
      audience: process.env.AUTH0_AUDIENCE,
      scope: 'openid profile email',
    },

    async onCallback(error, context, session) {
      if (error) console.error(error);
      if (!session) console.error('No session found.');
      return NextResponse.redirect(new URL(context.returnTo || '/', context.appBaseUrl));
    },
  });
}
export const auth0 = auth0Instance;
