"use server";

import {
  UserAppBehaviourPreferences,
  UserIdentity,
  UserPreference,
  UserProfile,
} from "@/interfaces/user.interface";
import {
  deleteCurrentUser,
  getCurrentUser,
  getCurrentUserAppBehaviourPreferences,
  getCurrentUserIdentities,
  getCurrentUserPreferences,
  getCurrentUserProfile,
  requestClearDeleteForCurrentUser,
  updateCurrentUserPreferences,
  updateCurrentUserProfile,
} from "@/libs/user.lib";
import { CurrentUser, UserPreferencesUpdate, UserProfileUpdate } from "@/types/user.type";
import { cookies } from "next/headers";

export async function getCurrentUserAction(): Promise<CurrentUser | null> {
  return await getCurrentUser();
}

export async function getCurrentUserProfileAction(): Promise<UserProfile> {
  return await getCurrentUserProfile();
}

export async function updateCurrentUserProfileAction(profileData: UserProfileUpdate): Promise<void> {
  await updateCurrentUserProfile(profileData);
}

export async function getCurrentUserPreferencesAction(): Promise<UserPreference> {
  return await getCurrentUserPreferences();
}

export async function getCurrentUserAppBehaviourPreferencesAction(): Promise<UserAppBehaviourPreferences> {
  return await getCurrentUserAppBehaviourPreferences();
}

export async function updateCurrentUserPreferencesAction(preferenceData: UserPreferencesUpdate): Promise<void> {
  await updateCurrentUserPreferences(preferenceData);

  const cookieStore = await cookies();
  const existingCookie = cookieStore.get("app-preferences")?.value;

  const currentPreferences = existingCookie ? JSON.parse(existingCookie) : {};

  cookieStore.set(
    "app-preferences",
    JSON.stringify({
      ...currentPreferences,
      ...(preferenceData.language !== undefined && {
        language: preferenceData.language.toLocaleLowerCase(),
      }),
      ...(preferenceData.theme !== undefined && {
        theme: preferenceData.theme.toLocaleLowerCase(),
      }),
    }),
    {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
    },
  );
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
