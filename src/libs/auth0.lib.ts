import { Auth0Client } from '@auth0/nextjs-auth0/server';
import { NextRequest, NextResponse } from 'next/server';
import { mockSession } from '@/libs/mock-auth0.lib';
import { API_ROUTES, AUTH } from '@/constants/constants';
import { MockAuth0ClientType } from '@/types/auth0.types';
import { isMock } from '@/libs/mock.lib';
import { UserAppBehaviourPreferences, UserPreference } from '@/interfaces/user.interface';
import { Language, Theme } from '@/enums/user.enum';

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
      if (error || !session) {
        console.error(error);
        return NextResponse.redirect(new URL(context.returnTo || '/', context.appBaseUrl));
      }

      let preferences: UserAppBehaviourPreferences = {
        language: Language.HU,
        theme: Theme.LIGHT,
      };

      try {
        const response = await fetch(
          `${process.env.NEXT_API_GATEWAY_URL}/${API_ROUTES.USERS.USERS}/${API_ROUTES.USERS.PREFERENCES}`,
          {
            headers: {
              Authorization: `Bearer ${session.tokenSet.accessToken}`,
              'Content-Type': 'application/json',
            },
            cache: 'no-store',
          }
        );

        if (!response.ok) {
          throw new Error(`Failed to load preferences: ${response.status}`);
        }

        const userPreferences: UserPreference = await response.json();

        preferences = {
          language: userPreferences.language,
          theme: userPreferences.theme,
        };
      } catch (error) {
        console.error('Failed to load user preferences:', error);
      }

      const response = NextResponse.redirect(new URL(context.returnTo || '/', context.appBaseUrl));

      response.cookies.set({
        name: 'app-preferences',
        value: JSON.stringify(preferences),
        path: '/',
        sameSite: 'lax',
        secure: process.env.NODE_ENV === 'production',
        httpOnly: true,
      });

      return response;
    },
  });
}

export const auth0 = auth0Instance;
