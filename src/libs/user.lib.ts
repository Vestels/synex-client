import { User, UserIdentity, UserPreference, UserProfile } from '@/interfaces/user.interface';
import { apiClient } from '@/libs/api-client.lib';
import { API_ROUTES } from '@/constants/constants';
import { CurrentUser, UserPreferencesUpdate, UserProfileUpdate } from '@/types/user.type';
import { auth0 } from '@/libs/auth0.lib';

export async function getCurrentUser(): Promise<CurrentUser | null> {
  const session = await auth0.getSession();

  if (!session) return null;

  const user = await apiClient<User>(`${API_ROUTES.USERS.USERS}/${API_ROUTES.USERS.DATA}`);

  if (!user) return null;

  return {
    ...user,
    picture: session.user.picture,
    email_verified: session.user.email_verified,
  };
}

export async function getCurrentUserProfile(): Promise<UserProfile> {
  return await apiClient<UserProfile>(`${API_ROUTES.USERS.USERS}/${API_ROUTES.USERS.PROFILE}`);
}

export async function updateCurrentUserProfile(profileData: UserProfileUpdate): Promise<void> {
  await apiClient<void>(`${API_ROUTES.USERS.USERS}/${API_ROUTES.USERS.PROFILE}`, {
    method: 'PATCH',
    body: profileData,
  });
}

export async function getCurrentUserPreferences(): Promise<UserPreference> {
  return await apiClient<UserPreference>(
    `${API_ROUTES.USERS.USERS}/${API_ROUTES.USERS.PREFERENCES}`
  );
}

export async function updateCurrentUserPreferences(
  preferenceData: UserPreferencesUpdate
): Promise<void> {
  await apiClient<void>(`${API_ROUTES.USERS.USERS}/${API_ROUTES.USERS.PREFERENCES}`, {
    method: 'PATCH',
    body: preferenceData,
  });
}

export async function getCurrentUserIdentities(): Promise<UserIdentity[]> {
  return await apiClient<UserIdentity[]>(
    `${API_ROUTES.USERS.USERS}/${API_ROUTES.USERS.IDENTITIES}`
  );
}

export async function deleteCurrentUser(): Promise<void> {
  await apiClient<void>(`${API_ROUTES.USERS.USERS}/${API_ROUTES.USERS.DATA}`, { method: 'DELETE' });
}

export async function requestClearDeleteForCurrentUser(): Promise<void> {
  await apiClient<void>(
    `${API_ROUTES.USERS.USERS}/${API_ROUTES.USERS.DATA}/${API_ROUTES.USERS.CANCEL_DELETE}`,
    {
      method: 'POST',
    }
  );
}
