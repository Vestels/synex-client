import 'server-only';

import { cache } from 'react';
import { User, UserIdentity, UserPreference, UserProfile } from '@/interfaces/user.interface';
import { apiClient, ApiError } from '@/libs/api-client.lib';
import { API_ROUTES } from '@/constants/constants';
import { CurrentUser } from '@/types/user.type';
import { auth0 } from '@/libs/auth0.lib';

async function requireAuth() {
  const session = await auth0.getSession();
  if (!session) {
    throw new ApiError(401, 'Unauthorized');
  }
  return session;
}

export const getCurrentUser = cache(async (): Promise<CurrentUser | null> => {
  const session = await requireAuth();

  const user = await apiClient<User>(`${API_ROUTES.USERS.USERS}/${API_ROUTES.USERS.DATA}`);

  return {
    ...user,
    picture: session.user.picture,
    email_verified: session.user.email_verified,
  };
});

export const getCurrentUserProfile = cache(async (): Promise<UserProfile> => {
  await requireAuth();

  return await apiClient<UserProfile>(`${API_ROUTES.USERS.USERS}/${API_ROUTES.USERS.PROFILE}`);
});

export const getCurrentUserPreferences = cache(async (): Promise<UserPreference> => {
  await requireAuth();

  return await apiClient<UserPreference>(
    `${API_ROUTES.USERS.USERS}/${API_ROUTES.USERS.PREFERENCES}`
  );
});

export const getCurrentUserIdentities = cache(async (): Promise<UserIdentity[]> => {
  await requireAuth();

  return await apiClient<UserIdentity[]>(
    `${API_ROUTES.USERS.USERS}/${API_ROUTES.USERS.IDENTITIES}`
  );
});
