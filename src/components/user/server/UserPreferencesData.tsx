import { UserPreference } from "@/interfaces/user.interface";
import UserPreferencesForm from "@/components/user/client/UserPreferencesForm";
import { getCurrentUserPreferencesAction } from "@/actions/user.actions";

export default async function UserPreferencesData() {
  const userPreferences: UserPreference = await getCurrentUserPreferencesAction();

  return <UserPreferencesForm initialPreferences={userPreferences} />;
}
