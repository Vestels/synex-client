import { getCurrentUserAction } from '@/actions/user.actions';
import { AUTH } from '@/constants/constants';
import { ApiError } from '@/libs/api-client.lib';
import { redirect } from 'next/navigation';

export default async function isAuthenticated() {
  try {
    await getCurrentUserAction();
  } catch (error) {
    if (error instanceof ApiError) {
      if (error.status === 410 || error.status === 409) {
        redirect(`/${AUTH.BASE}/${AUTH.LOGOUT}`);
      }
    }
  }
}
