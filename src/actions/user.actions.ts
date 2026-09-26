"use server";

import { User, UserAuth0Info, UserIdentity, UserPreference, UserProfile } from "@/interfaces/user.interface";
import {
  deleteCurrentUser,
  getCurrentUser,
  getCurrentUserIdentities,
  getCurrentUserInfoData,
  getCurrentUserPreference,
  getCurrentUserProfile,
  requestClearDeleteForCurrentUser,
  updateCurrentUserPreference,
  updateCurrentUserProfile,
} from "@/libs/user.lib";
import { UserPreferencesUpdate, UserProfileUpdate } from "@/types/user.type";

export async function getCurrentUserAction(): Promise<User> {
  return await getCurrentUser();
}

export async function getCurrentUserInfoDataAction(): Promise<UserAuth0Info> {
  return await getCurrentUserInfoData();
}

export async function getCurrentUserProfileAction(): Promise<UserProfile> {
  return await getCurrentUserProfile();
}

export async function updateCurrentUserProfileAction(profileData: UserProfileUpdate): Promise<void> {
  await updateCurrentUserProfile(profileData);
}

export async function getCurrentUserPreferencesAction(): Promise<UserPreference> {
  return await getCurrentUserPreference();
}

export async function updateCurrentUserPreferencesAction(preferenceData: UserPreferencesUpdate): Promise<void> {
  await updateCurrentUserPreference(preferenceData);
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
