import React from 'react';
import { getLocale, getTranslations } from 'next-intl/server';
import { getCurrentUserIdentitiesAction } from '@/actions/user.actions';
import TrashSvg from '@/components/svgs/TrashSvg';
import Button from '@/components/Button';

export default async function UserIdentitiesData() {
  const [locale, translate, userIdentities] = await Promise.all([
    getLocale(),
    getTranslations('APP'),
    getCurrentUserIdentitiesAction(),
  ]);

  return (
    <>
      <div className="user-informations user-informations--identity">
        {/* TODO */}
        <a href={`/${locale}/api/auth/link`}>Google fiók csatolása</a>
        {userIdentities && userIdentities.length > 0 && (
          <>
            {userIdentities.map((identity) => (
              <React.Fragment key={identity.provider}>
                <div className="user-informations__header">
                  <p>{translate(`ENUMS.IDENTITY_PROVIDER.${identity.provider}`)}</p>
                  <Button variant={'subtle'} iconOnly={true}>
                    <TrashSvg />
                  </Button>
                </div>

                <hr className="divider" />

                <div className="user-informations__data-row">
                  <strong className="property">{translate('PROFILE.IDENTITIES.CREATED_AT')}</strong>
                  {identity.createdAt ? (
                    <p className="value" suppressHydrationWarning>
                      {new Date(identity.createdAt).toLocaleDateString()}
                    </p>
                  ) : (
                    '-'
                  )}
                </div>

                <div className="user-informations__data-row">
                  <strong className="property">
                    {translate('PROFILE.IDENTITIES.LAST_USED_AT')}
                  </strong>
                  {identity.lastUsedAt ? (
                    <p className="value" suppressHydrationWarning>
                      {new Date(identity.lastUsedAt).toLocaleDateString()}
                    </p>
                  ) : (
                    '-'
                  )}
                </div>
              </React.Fragment>
            ))}
          </>
        )}
      </div>
    </>
  );
}
