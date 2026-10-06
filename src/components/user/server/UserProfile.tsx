'use server';

import { Suspense } from 'react';
import { getTranslations } from 'next-intl/server';
import UserData from '@/components/user/server/UserData';
import UserProfileData from '@/components/user/server/UserProfileData';
import UserIdentitiesData from '@/components/user/server/UserIdentitiesData';
import UserPreferencesData from '@/components/user/server/UserPreferencesData';
import SpinnerSvg from '@/components/svgs/SpinnerSvg';
import UserSectionTitle from '@/components/user/server/UserSectionTitle';

export default async function UserProfile() {
  const translate = await getTranslations('APP.PROFILE');

  return (
    <>
      <div className="user-data-table">
        <Suspense fallback={<SpinnerSvg />}>
          <UserData />
        </Suspense>
      </div>

      <div className="user-data-wrapper">
        <UserSectionTitle title={translate('PERSONAL.TITLE')} />

        <div className="user-data-table">
          <Suspense fallback={<SpinnerSvg />}>
            <UserProfileData />
          </Suspense>
        </div>
      </div>

      <div className="user-data-wrapper">
        <UserSectionTitle title={translate('PREFERENCES.TITLE')} />

        <div className="user-data-table">
          <Suspense fallback={<SpinnerSvg />}>
            <UserPreferencesData />
          </Suspense>
        </div>
      </div>

      <div className="user-data-wrapper">
        <UserSectionTitle title={translate('IDENTITIES.TITLE')} />

        <div className="user-data-table user-data-table--identities">
          <Suspense fallback={<SpinnerSvg />}>
            <UserIdentitiesData />
          </Suspense>
        </div>
      </div>
    </>
  );
}
