import { UserAuth0Info, User, UserPreference, UserProfile } from '@/interfaces/user.interface';

export type CurrentUser = User & Partial<UserAuth0Info>;
export type UserProfileUpdate = Partial<UserProfile>;
export type UserPreferencesUpdate = Partial<UserPreference>;
