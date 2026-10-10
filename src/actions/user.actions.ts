'use server';

import {
  getCurrentUser,
  getCurrentUserIdentities,
  getCurrentUserPreferences,
  getCurrentUserProfile,
} from '@/dal/user.dal';
import {
  UserAppBehaviourPreferences,
  UserIdentity,
  UserPreference,
  UserProfile,
} from '@/interfaces/user.interface';
import {
  deleteCurrentUser,
  deleteLinkedAccount,
  requestClearDeleteForCurrentUser,
  updateCurrentUserPreferences,
  updateCurrentUserProfile,
} from '@/services/user.service';

import { CurrentUser, UserPreferencesUpdate, UserProfileUpdate } from '@/types/user.type';
import { updateTag } from 'next/cache';
import { cookies } from 'next/headers';

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

  const cookieStore = await cookies();

  const currentPreferences: Partial<UserAppBehaviourPreferences> = JSON.parse(
    cookieStore.get('app-preferences')?.value ?? '{}'
  );

  cookieStore.set({
    name: 'app-preferences',
    value: JSON.stringify({
      ...currentPreferences,
      ...(preferenceData.language != null && {
        language: preferenceData.language,
      }),
      ...(preferenceData.theme != null && {
        theme: preferenceData.theme,
      }),
    } satisfies Partial<UserAppBehaviourPreferences>),
    path: '/',
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
  });

  updateTag('user-preferences');
}

export async function getCurrentUserIdentitiesAction(): Promise<UserIdentity[]> {
  return await getCurrentUserIdentities();
}

export async function deleteCurrentUserAction() {
  await deleteCurrentUser();

  updateTag('user');
}

export async function requestClearDeleteForCurrentUserAction(): Promise<void> {
  await requestClearDeleteForCurrentUser();

  updateTag('user');
}

export async function deleteLinkedAccountAction(provider: string): Promise<void> {
  await deleteLinkedAccount(provider);

  updateTag('user-identities');
}
