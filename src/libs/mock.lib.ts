// Auth0 environment configuration is the source of truth.
export const isMock =
  !process.env.AUTH0_DOMAIN ||
  !process.env.AUTH0_AUDIENCE ||
  !process.env.AUTH0_CLIENT_ID ||
  !process.env.AUTH0_CLIENT_SECRET ||
  !process.env.AUTH0_SECRET;
