import { User, UserAuth0Info, UserIdentity, UserPreference, UserProfile } from "@/interfaces/user.interface";
import { apiClient, ApiError } from "@/libs/api-client.lib";
import { API_ROUTES, AUTH_ROUTES } from "@/app/constants/routes";
import { redirect } from "next/navigation";
import { UserPreferencesUpdate, UserProfileUpdate } from "@/types/user.type";

export async function getCurrentUser(): Promise<User> {
  try {
    return await apiClient<User>(`${API_ROUTES.USERS.USERS}/${API_ROUTES.USERS.DATA}`);
  } catch (error) {
    if (error instanceof ApiError && [401, 410].includes(error.status)) {
      redirect(`/${AUTH_ROUTES.LOGOUT}`);
    }
    throw error;
  }
}

export async function getCurrentUserInfoData(): Promise<UserAuth0Info> {
  return await apiClient<UserAuth0Info>(`${API_ROUTES.USERS.USERS}/${API_ROUTES.USERS.INFO}`);
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

export async function getCurrentUserPreference(): Promise<UserPreference> {
  return await apiClient<UserPreference>(`${API_ROUTES.USERS.USERS}/${API_ROUTES.USERS.PREFERENCES}`);
}

export async function updateCurrentUserPreference(preferenceData: UserPreferencesUpdate): Promise<void> {
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
