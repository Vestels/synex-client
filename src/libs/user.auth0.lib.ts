"use server";

import { AUTH } from "@/constants/constants";
import { auth0 } from "./auth0.lib";

export async function disconnectGoogleAccountAction() {
  await auth0.disconnectAccount({
    connection: AUTH.CONNECTION.GOOGLE,
  });
}
