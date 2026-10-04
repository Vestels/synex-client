export const AUTH = {
  BASE: 'auth',
  LOGIN: 'login',
  LOGOUT: 'logout',
  CONNECT: 'connect?connection=',
  CONNECTION: {
    PASSWORD: 'Username-Password-Authentication',
    GOOGLE: 'google-oauth2',
  },
} as const;

export const APP_ROUTES = {
  HOME: '/',
  PROFILE: 'profile',
} as const;

export const API_ROUTES = {
  USERS: {
    USERS: 'users',
    DATA: 'me',
    INFO: 'info',
    PROFILE: 'profile',
    PREFERENCES: 'preferences',
    APP_PREFERENCES: 'app',
    IDENTITIES: 'identities',
    LINK_IDENTTIY: 'link',
    CANCEL_DELETE: 'deletion/cancel',
  },
} as const;
