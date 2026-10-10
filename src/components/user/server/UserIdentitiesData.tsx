'use server';

import { getTranslations } from 'next-intl/server';
import { getCurrentUserIdentitiesAction } from '@/actions/user.actions';
import { IdentityProvider } from '@/enums/user.enum';
import { AUTH } from '@/constants/constants';
import LinkAccountButton from '@/components/user/client/LinkAccountButton';
import DeleteLinkedAccountButton from '@/components/user/client/DeleteLinkedAccountButton';
import LockSvg from '@/components/svgs/LockSvg';

export default async function UserIdentitiesData() {
  const [translate, userIdentities] = await Promise.all([
    getTranslations('APP'),
    getCurrentUserIdentitiesAction(),
  ]);

  const sortedUserIdentities = userIdentities?.toSorted((a, b) => {
    if (a.isPrimary !== b.isPrimary) {
      return a.isPrimary ? -1 : 1;
    }

    return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
  });

  const hasGoogleIdentity = userIdentities?.some(
    (identity) => identity.provider === IdentityProvider.GOOGLE
  );

  const hasPasswordIdentity = userIdentities?.some(
    (identity) => identity.provider === IdentityProvider.PASSWORD
  );

  const missingProvider = !hasGoogleIdentity
    ? {
        provider: IdentityProvider.GOOGLE,
        connection: AUTH.CONNECTIONS.GOOGLE,
        translate: translate('PROFILE.IDENTITIES.GOOGLE.CONNECT'),
      }
    : !hasPasswordIdentity
      ? {
          provider: IdentityProvider.PASSWORD,
          connection: AUTH.CONNECTIONS.PASSWORD,
          translate: translate('PROFILE.IDENTITIES.PASSWORD.CONNECT'),
        }
      : null;

  return (
    <>
      <div className="user-identities">
        {sortedUserIdentities && sortedUserIdentities.length > 0 && (
          <>
            {sortedUserIdentities.map((identity) => (
              <div
                className={`user-informations user-informations--identity  ${identity.isPrimary ? 'primary' : ''}`}
                key={identity.provider}
              >
                <div className="user-informations__header">
                  <p>{translate(`ENUMS.IDENTITY_PROVIDER.${identity.provider}`)}</p>
                  {!identity.isPrimary ? (
                    <DeleteLinkedAccountButton provider={identity.provider} />
                  ) : (
                    <LockSvg />
                  )}
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
              </div>
            ))}

            {missingProvider && (
              <>
                <hr className="divider" />

                <LinkAccountButton
                  provider={missingProvider.provider}
                  connection={missingProvider.connection}
                  translate={missingProvider.translate}
                />
              </>
            )}
          </>
        )}
      </div>
    </>
  );
}
