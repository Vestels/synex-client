import { Auth0Client } from '@auth0/nextjs-auth0/server';
import { NextRequest, NextResponse } from 'next/server';
import { mockSession } from '@/libs/mock-auth0.lib';
import { AUTH } from '@/constants/constants';

/* eslint-disable @typescript-eslint/no-explicit-any */
type MockAuth0ClientType = {
  middleware(req?: any): any;
  getSession(): any | null;
  getAccessToken: (options?: any) => any;
  startInteractiveLogin: (options?: any) => Promise<NextResponse>;
  // methods...
};
/* eslint-enable @typescript-eslint/no-explicit-any */

// Auth0 environment configuration is the source of truth.
const isMock =
  !process.env.AUTH0_DOMAIN ||
  !process.env.AUTH0_AUDIENCE ||
  !process.env.AUTH0_CLIENT_ID ||
  !process.env.AUTH0_CLIENT_SECRET ||
  !process.env.AUTH0_SECRET;

let auth0Instance: MockAuth0ClientType | Auth0Client;

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
        accessToken: 'mock-access-token',
      };
    },

    startInteractiveLogin: async () => {
      return NextResponse.redirect(new URL(`/mock/link-account`, process.env.APP_BASE_URL));
    },
  };
} else {
  auth0Instance = new Auth0Client({
    enableConnectAccountEndpoint: true,

    authorizationParameters: {
      audience: process.env.AUTH0_AUDIENCE,
      scope: 'openid profile email',
    },

    async onCallback(error, context, session) {
      if (error) console.error(error);
      if (!session) console.error('No session found.');
      return NextResponse.redirect(new URL('/', process.env.APP_BASE_URL));
    },
  });
}
export const auth0 = auth0Instance;
