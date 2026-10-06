'use server';

import {
  getCurrentUser,
  getCurrentUserIdentities,
  getCurrentUserPreferences,
  getCurrentUserProfile,
} from '@/dal/user.dal';
import { UserIdentity, UserPreference, UserProfile } from '@/interfaces/user.interface';
import {
  deleteCurrentUser,
  requestClearDeleteForCurrentUser,
  updateCurrentUserPreferences,
  updateCurrentUserProfile,
} from '@/services/user.service';

import { CurrentUser, UserPreferencesUpdate, UserProfileUpdate } from '@/types/user.type';
import { updateTag } from 'next/cache';

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

  updateTag('user-profile');
}

export async function getCurrentUserPreferencesAction(): Promise<UserPreference> {
  return await getCurrentUserPreferences();
}

export async function updateCurrentUserPreferencesAction(
  preferenceData: UserPreferencesUpdate
): Promise<void> {
  await updateCurrentUserPreferences(preferenceData);

  updateTag('user-preferences');
}

export async function getCurrentUserIdentitiesAction(): Promise<UserIdentity[]> {
  return await getCurrentUserIdentities();
}

export async function deleteCurrentUserAction() {
  await deleteCurrentUser();

  updateTag('user');
}

export async function requestClearDeleteForCurrentUserAction() {
  await requestClearDeleteForCurrentUser();

  updateTag('user');
}
