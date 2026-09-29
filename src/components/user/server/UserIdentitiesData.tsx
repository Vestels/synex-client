 
import React from "react";
import { getLocale, getTranslations } from "next-intl/server";
import { getCurrentUserIdentitiesAction } from "@/actions/user.actions";
import TrashSvg from "@/components/svgs/TrashSvg";
import Button from "@/components/Button";
import { APP_ROUTES, AUTH } from "@/constants/constants";
import { disconnectGoogleAccountAction } from "@/libs/user.auth0.lib";

export default async function UserIdentitiesData() {
  const [translate, userIdentities, locale] = await Promise.all([
    getTranslations("APP"),
    getCurrentUserIdentitiesAction(),
    getLocale(),
  ]);

  return (
    <>
      <div className="user-informations user-informations--identity">
        {userIdentities && userIdentities.length > 0 && (
          <>
            {userIdentities.map((identity) => (
              <React.Fragment key={identity.provider}>
                <div className="user-informations__header">
                  <p>{translate(`ENUMS.IDENTITY_PROVIDER.${identity.provider}`)}</p>
                  <Button variant={"subtle"} iconOnly={true}>
                    <TrashSvg />
                  </Button>
                </div>

                <hr className="divider" />

                <div className="user-informations__data-row">
                  <strong className="property">{translate("PROFILE.IDENTITIES.CREATED_AT")}</strong>
                  {identity.createdAt ? (
                    <p className="value">{new Date(identity.createdAt).toLocaleDateString()}</p>
                  ) : (
                    "-"
                  )}
                </div>

                <div className="user-informations__data-row">
                  <strong className="property">{translate("PROFILE.IDENTITIES.LAST_USED_AT")}</strong>
                  {identity.lastUsedAt ? (
                    <p className="value">{new Date(identity.lastUsedAt).toLocaleDateString()}</p>
                  ) : (
                    "-"
                  )}
                </div>
              </React.Fragment>
            ))}
          </>
        )}
      </div>
      <a
        href={`/${AUTH.BASE}/${AUTH.CONNECT}${AUTH.CONNECTION.PASSWORD}&returnTo=/${locale}/${APP_ROUTES.PROFILE}`}>
        {translate("PROFILE.IDENTITIES.PASSWORD.CONNECT")}
      </a>

      <a
        href={`/${AUTH.BASE}/${AUTH.CONNECT}${AUTH.CONNECTION.GOOGLE}&returnTo=/${locale}/${APP_ROUTES.PROFILE}`}>
        {translate("PROFILE.IDENTITIES.GOOGLE.CONNECT")}
      </a>

      <Button onClick={disconnectGoogleAccountAction}>{translate("PROFILE.IDENTITIES.GOOGLE.DISCONNECT")}</Button>
    </>
  );
}
