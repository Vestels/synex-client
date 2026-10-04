import { UserPreference } from '@/interfaces/user.interface';
import { getCurrentUserPreferencesAction } from '@/actions/user.actions';
import UserPreferencesForm from '@/components/user/client/UserPreferencesForm';

export default async function UserPreferencesData() {
  const userPreferences: UserPreference = await getCurrentUserPreferencesAction();

  return <UserPreferencesForm initialPreferences={userPreferences} />;
}
