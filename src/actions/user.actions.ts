'use server';

import { UserIdentity, UserPreference, UserProfile } from '@/interfaces/user.interface';
import {
  deleteCurrentUser,
  getCurrentUser,
  getCurrentUserIdentities,
  getCurrentUserPreferences,
  getCurrentUserProfile,
  requestClearDeleteForCurrentUser,
  updateCurrentUserPreferences,
  updateCurrentUserProfile,
} from '@/libs/user.lib';
import { CurrentUser, UserPreferencesUpdate, UserProfileUpdate } from '@/types/user.type';

export async function getCurrentUserAction(): Promise<CurrentUser | null> {
  return await getCurrentUser();
}

export async function getCurrentUserProfileAction(): Promise<UserProfile> {
  return await getCurrentUserProfile();
}

export async function updateCurrentUserProfileAction(
  profileData: UserProfileUpdate
): Promise<void> {
  await updateCurrentUserProfile(profileData);
}

export async function getCurrentUserPreferencesAction(): Promise<UserPreference> {
  return await getCurrentUserPreferences();
}

export async function updateCurrentUserPreferencesAction(
  preferenceData: UserPreferencesUpdate
): Promise<void> {
  await updateCurrentUserPreferences(preferenceData);
}

export async function getCurrentUserIdentitiesAction(): Promise<UserIdentity[]> {
  return await getCurrentUserIdentities();
}

export async function deleteCurrentUserAction() {
  await deleteCurrentUser();
}

export async function requestClearDeleteForCurrentUserAction() {
  await requestClearDeleteForCurrentUser();
}
