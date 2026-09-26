export const AUTH_ROUTES = {
  BASE: "auth",
  LOGIN: "auth/login",
  LOGOUT: "auth/logout",
} as const;

export const APP_ROUTES = {
  HOME: "/",
  PROFILE: "profile",
} as const;

export const API_ROUTES = {
  USERS: {
    USERS: "users",
    DATA: "me",
    INFO: "info",
    PROFILE: "profile",
    PREFERENCES: "preferences",
    APP_PREFERENCES: "app",
    IDENTITIES: "identities",
    CANCEL_DELETE: "deletion/cancel"
  },
} as const;
