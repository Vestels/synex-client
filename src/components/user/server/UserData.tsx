import { getTranslations } from "next-intl/server";
import { formatDate } from "@/utils/format-date.util";
import { getCurrentUserAction } from "@/actions/user.actions";
import UserActionButton from "@/components/user/client/UserActionButton";
import CheckMarkSvg from "@/components/svgs/CheckMarkSvg";
import XMarkSvg from "@/components/svgs/XMarkSvg";
import NoDataSvg from "@/components/svgs/NoDataSvg";
import Image from "next/image";
import { UserStatus } from "@/enums/user.enum";

export default async function UserData() {
  const [translate, user] = await Promise.all([getTranslations("APP"), getCurrentUserAction()]);

  return (
    <>
      <div className="user-informations">
        {user && (
          <>
            {user.picture && user.picture !== null && (
              <div className="user-informations__data-row">
                <div className="user-header__wrapper">
                  <Image className="pfp" src={user.picture} width={50} height={50} alt="" />
                  {!user.deletionRequestAt && !user.scheduledDeletionAt ? (
                    <UserActionButton onClick="delete">{translate("ACTIONS.PROFILE.DELETE")}</UserActionButton>
                  ) : (
                    <UserActionButton onClick="cleardelete">{translate("ACTIONS.PROFILE.RESTORE")}</UserActionButton>
                  )}
                </div>
              </div>
            )}

            <div className="user-informations__data-row">
              <strong className="property">{translate("PROFILE.ME.EMAIL")}</strong>
              {user.email ? (
                <div className="value value--email">
                  {user.email}
                  {user.email_verified ? (
                    <p className={`status ${user.email_verified ? "status--verified" : "status--not-verified"}`}>
                      {user.email_verified ? <CheckMarkSvg /> : <XMarkSvg />}
                    </p>
                  ) : (
                    <NoDataSvg />
                  )}
                </div>
              ) : (
                "-"
              )}
            </div>

            <div className="user-informations__data-row">
              <strong className="property">{translate("PROFILE.ME.REGISTERED")}</strong>
              {user.createdAt ? <p className="value">{formatDate(user.createdAt)}</p> : "-"}
            </div>

            <div className="user-informations__data-row">
              <strong className="property">{translate("PROFILE.ME.LAST_LOGIN")}</strong>
              {user.lastLoginAt ? <p className="value">{formatDate(user.lastLoginAt)}</p> : "-"}
            </div>

            <div className="user-informations__data-row">
              <strong className="property">{translate("PROFILE.ME.LAST_ACTIVE")}</strong>
              {user.lastActivityAt ? <p className="value">{formatDate(user.lastActivityAt)}</p> : "-"}
            </div>

            <div className="user-informations__data-row">
              <strong className="property">{translate("PROFILE.ME.LAST_UPDATED_AT")}</strong>
              {user.updatedAt ? <p className="value">{formatDate(user.updatedAt)}</p> : "-"}
            </div>

            <div className="user-informations__data-row">
              <strong className="property">{translate("PROFILE.ME.ACCOUNT_STATUS")}</strong>
              {user.userStatus ? (
                <p
                  className={`value value--user-status status status--${user.userStatus.toLocaleLowerCase().replaceAll("_", "-")}`}>
                  {translate(`ENUMS.USER_STATUS.${user.userStatus}`)}
                </p>
              ) : (
                "-"
              )}
            </div>

            {user.deletionRequestAt && user.scheduledDeletionAt ? (
              <>
                <div className="user-deletion-data">
                  <div className="user-informations__data-row">
                    <strong className="property">{translate("PROFILE.ME.DELETION_REQUESTED_AT")}</strong>
                    <p className="value">{formatDate(user.deletionRequestAt!, true)}</p>
                  </div>

                  <div className="user-informations__data-row">
                    <strong className="property">{translate("PROFILE.ME.DELETION_SCHEDULED_AT")}</strong>
                    <p className="value">{formatDate(user.scheduledDeletionAt!, true)}</p>
                  </div>
                </div>
              </>
            ) : null}
          </>
        )}
      </div>
    </>
  );
}
