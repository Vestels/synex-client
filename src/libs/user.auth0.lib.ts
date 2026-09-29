"use server";

import { AUTH_ROUTES } from "@/constants/routes";
import { auth0 } from "./auth0.lib";

export async function disconnectGoogleAccountAction() {
  await auth0.disconnectAccount({
    connection: AUTH_ROUTES.CONNECTION.GOOGLE,
  });
}
