import { getTranslations } from "next-intl/server";
import { getCurrentUserInfoDataAction } from "@/actions/user.actions";
import CheckMarkSvg from "@/components/svgs/CheckMarkSvg";
import XMarkSvg from "@/components/svgs/XMarkSvg";
import NoDataSvg from "@/components/svgs/NoDataSvg";

export default async function UserInfoData() {
  const [translate, userInfo] = await Promise.all([getTranslations("APP.PROFILE.ME"), getCurrentUserInfoDataAction()]);
  return (
    <>
      {userInfo && (
        <div className="user-informations__data-row">
          <strong className="property">{translate("EMAIL_VERIFIED")}</strong>
          {userInfo.emailVerified != null ? (
            <p className={`value status ${userInfo.emailVerified ? "status--verified" : "status--not-verified"}`}>
              {userInfo.emailVerified ? <CheckMarkSvg /> : <XMarkSvg />}
            </p>
          ) : (
            <NoDataSvg />
          )}
        </div>
      )}
    </>
  );
}
