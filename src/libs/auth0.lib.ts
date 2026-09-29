import { APP_ROUTES } from "@/constants/constants";
import { Auth0Client } from "@auth0/nextjs-auth0/server";
import { NextResponse } from "next/server";

export const auth0 = new Auth0Client({
  authorizationParameters: {
    audience: process.env.AUTH0_AUDIENCE,
    scope: "openid profile email offline_access",
  },

  async onCallback(error, context, session) {
    if (error) {
      throw error;
    }

    if (context) {
    }

    if (session) {
    }

    return NextResponse.redirect(
      new URL(context.returnTo ?? `/${APP_ROUTES.PROFILE}`, process.env.NEXT_PUBLIC_SITE_URL!),
    );
  },
});
