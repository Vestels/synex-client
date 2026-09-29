import { Gender, Language, Theme, UnitSystem, UserStatus } from "@/enums/user.enum";

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
  email_verified: boolean;
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
