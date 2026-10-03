import { Auth0Client } from "@auth0/nextjs-auth0/server";
import { NextResponse } from "next/server";

export const auth0 = new Auth0Client({
  enableConnectAccountEndpoint: true,

  authorizationParameters: {
    audience: process.env.AUTH0_AUDIENCE,
    scope: "openid profile email",
  },

  async onCallback(error, context, session) {
    if (error) {
      console.error(error);
    }

    if (!session) {
      console.error("No session found.");
    }

    if (context.connectedAccount) {
    }

    return NextResponse.redirect(new URL("/", process.env.APP_BASE_URL));
  },
});
