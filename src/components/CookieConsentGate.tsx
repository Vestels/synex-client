"use client";

import {
  COOKIE_CONSENT_OPEN_EVENT_NAME,
  CookieConsentStatus,
  getCookieConsentSnapshot,
  getServerCookieConsentSnapshot,
  setCookieConsent,
  subscribeCookieConsent,
} from "@/utils/cookie-consent-util";
import { useTranslations } from "next-intl";
import { useEffect, useState, useSyncExternalStore } from "react";
import Button from "@/components/Button";

export default function CookieConsentGate() {
  const translate = useTranslations("APP");
  const consentStatus = useSyncExternalStore(
    subscribeCookieConsent,
    getCookieConsentSnapshot,
    getServerCookieConsentSnapshot,
  );

  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const shouldShowConsentPanel = consentStatus !== "pending" && (consentStatus === null || isSettingsOpen);
  const shouldRenderConsentPanel = shouldShowConsentPanel;

  useEffect(() => {
    function handleOpenSettings() {
      setIsSettingsOpen(true);
    }

    window.addEventListener(COOKIE_CONSENT_OPEN_EVENT_NAME, handleOpenSettings);

    return () => {
      window.removeEventListener(COOKIE_CONSENT_OPEN_EVENT_NAME, handleOpenSettings);
    };
  }, []);

  function closeWithConsent(status: CookieConsentStatus) {
    setCookieConsent(status);
    setIsSettingsOpen(false);
  }

  function acceptCookies() {
    closeWithConsent("accepted");
  }

  //   function rejectCookies() {
  //     closeWithConsent("rejected");
  //   }

  if (consentStatus === "pending") {
    return null;
  }

  return (
    <>
      {shouldRenderConsentPanel && (
        <div role="dialog" className="cookie-consent">
          <div className="cookie-consent__wrapper">
            <div className="cookie-consent__content">
              <p className="cookie-consent__sheet">
                {translate.rich("COOKIE_CONSENT.CONTENT.ONE", {
                  strong: (chunk) => <strong>{chunk}</strong>,
                })}
              </p>
              <div className="cookie-consent__actions">
                <Button onClick={acceptCookies}>{translate("COOKIE_CONSENT.ACTIONS.ONLY_ACCEPT")}</Button>
                {/* <Button variant={"secondary"} onClick={rejectCookies}>
                  {translate("COOKIE_CONSENT.ACTIONS.DECLINE")}
                </Button> */}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
