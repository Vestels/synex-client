import UserProfile from '@/components/user/server/UserProfile';
import isAuthenticated from '@/libs/authenticated.lib';

export default async function Profile() {
  await isAuthenticated();

  return <UserProfile />;
}
