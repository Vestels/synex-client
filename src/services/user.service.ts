import 'server-only';

import { apiClient, ApiError } from '@/libs/api-client.lib';
import { API_ROUTES } from '@/constants/constants';
import { UserPreferencesUpdate, UserProfileUpdate } from '@/types/user.type';
import { auth0 } from '@/libs/auth0.lib';

async function requireAuth() {
  const session = await auth0.getSession();
  if (!session) {
    throw new ApiError(401, 'Unauthorized');
  }
  return session;
}

export async function updateCurrentUserProfile(profileData: UserProfileUpdate): Promise<void> {
  await requireAuth();

  await apiClient<void>(`${API_ROUTES.USERS.USERS}/${API_ROUTES.USERS.PROFILE}`, {
    method: 'PATCH',
    body: profileData,
  });
}

export async function updateCurrentUserPreferences(
  preferenceData: UserPreferencesUpdate
): Promise<void> {
  await requireAuth();

  await apiClient<void>(`${API_ROUTES.USERS.USERS}/${API_ROUTES.USERS.PREFERENCES}`, {
    method: 'PATCH',
    body: preferenceData,
  });
}

export async function deleteCurrentUser(): Promise<void> {
  await requireAuth();

  await apiClient<void>(`${API_ROUTES.USERS.USERS}/${API_ROUTES.USERS.DATA}`, { method: 'DELETE' });
}

export async function requestClearDeleteForCurrentUser(): Promise<void> {
  await requireAuth();

  await apiClient<void>(
    `${API_ROUTES.USERS.USERS}/${API_ROUTES.USERS.DATA}/${API_ROUTES.USERS.CANCEL_DELETE}`,
    {
      method: 'POST',
    }
  );
}

export async function deleteLinkedAccount(provider: string): Promise<void> {
  await requireAuth();

  await apiClient<void>(
    `${API_ROUTES.USERS.USERS}/${API_ROUTES.USERS.IDENTITIES}/${API_ROUTES.USERS.LINK_IDENTTIY}`,
    { method: 'DELETE', body: { provider } }
  );
}
