import { Gender, Language, Theme, UnitSystem, UserStatus } from "@/enums/user.enum";

export interface CurrentUser {
  user: User;
  auth0Info: UserAuth0Info;
  profile: UserProfile;
  preferences: UserPreference;
  identity: UserIdentity;
}

export interface User {
  email: string;
  userStatus: UserStatus;
  createdAt: string;
  lastLoginAt: string;
  lastActivityAt: string;
  updatedAt: string;
  deletionRequestAt: string | null;
  scheduledDeletionAt: string | null;
}

export interface UserAuth0Info {
  picture: string;
  emailVerified: boolean;
}

export interface UserProfile {
  birthDate: string;
  nickname: string;
  firstName: string;
  lastName: string;
  gender: Gender;
}

export interface UserPreference extends UserAppBehaviourPreferences {
  unitSystem: UnitSystem;
  emailNotifications: boolean;
  pushNotifications: boolean;
}

export interface UserAppBehaviourPreferences {
  language: Language;
  theme: Theme;
}

export interface UserIdentity {
  provider: string;
  createdAt: string;
  lastUsedAt: string;
}
