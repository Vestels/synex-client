import {
  User,
  UserAppBehaviourPreferences,
  UserIdentity,
  UserPreference,
  UserProfile,
} from "@/interfaces/user.interface";
import { apiClient, ApiError } from "@/libs/api-client.lib";
import { API_ROUTES } from "@/constants/routes";
import { CurrentUser, UserPreferencesUpdate, UserProfileUpdate } from "@/types/user.type";
import { auth0 } from "@/libs/auth0.lib";

export async function getCurrentUser(): Promise<CurrentUser | null> {
  const session = await auth0.getSession();

  if (!session) {
    return null;
  }

  try {
    const currentUser = await apiClient<User>(`${API_ROUTES.USERS.USERS}/${API_ROUTES.USERS.DATA}`);

    return {
      ...currentUser,
      picture: session.user.picture,
      email_verified: session.user.email_verified,
    };
  } catch (error) {
    //  && [401, 403, 409, 410].includes(error.status)
    if (error instanceof ApiError) {
      return null;
    }
    throw error;
  }
}

export async function getCurrentUserProfile(): Promise<UserProfile> {
  return await apiClient<UserProfile>(`${API_ROUTES.USERS.USERS}/${API_ROUTES.USERS.PROFILE}`);
}

export async function updateCurrentUserProfile(profileData: UserProfileUpdate): Promise<void> {
  await apiClient<void>(`${API_ROUTES.USERS.USERS}/${API_ROUTES.USERS.PROFILE}`, {
    method: "PATCH",
    body: profileData,
  });
}

export async function getCurrentUserPreferences(): Promise<UserPreference> {
  return await apiClient<UserPreference>(`${API_ROUTES.USERS.USERS}/${API_ROUTES.USERS.PREFERENCES}`);
}

export async function getCurrentUserAppBehaviourPreferences(): Promise<UserAppBehaviourPreferences> {
  return await apiClient<UserAppBehaviourPreferences>(
    `${API_ROUTES.USERS.USERS}/${API_ROUTES.USERS.PREFERENCES}/${API_ROUTES.USERS.APP_PREFERENCES}`,
  );
}

export async function updateCurrentUserPreferences(preferenceData: UserPreferencesUpdate): Promise<void> {
  await apiClient<void>(`${API_ROUTES.USERS.USERS}/${API_ROUTES.USERS.PREFERENCES}`, {
    method: "PATCH",
    body: preferenceData,
  });
}

export async function getCurrentUserIdentities(): Promise<UserIdentity[]> {
  return await apiClient<UserIdentity[]>(`${API_ROUTES.USERS.USERS}/${API_ROUTES.USERS.IDENTITIES}`);
}

export async function deleteCurrentUser(): Promise<void> {
  await apiClient<void>(`${API_ROUTES.USERS.USERS}/${API_ROUTES.USERS.DATA}`, { method: "DELETE" });
}

export async function requestClearDeleteForCurrentUser(): Promise<void> {
  await apiClient<void>(`${API_ROUTES.USERS.USERS}/${API_ROUTES.USERS.DATA}/${API_ROUTES.USERS.CANCEL_DELETE}`, {
    method: "POST",
  });
}
