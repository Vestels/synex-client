"use client";

import { APP_ROUTES, AUTH_ROUTES } from "@/constants/routes";
import { useTranslations } from "next-intl";
import { usePathname } from "@/i18n/navigation";
import { openCookieSettings } from "@/utils/cookie-consent-util";
import Button from "@/components/Button";
import CookieSvg from "@/components/svgs/CookieSvg";

type SideNaviogationProps = {
  ref?: React.Ref<HTMLElement>;
  isOpen: boolean;
  isMobile: boolean;
};

const currentYear = new Intl.DateTimeFormat("hu-HU", {
  year: "numeric",
  timeZone: "Europe/Budapest",
}).format(new Date());

export default function SideNavigation({ ref, isOpen, isMobile }: SideNaviogationProps) {
  const translate = useTranslations("APP");
  const pathname = usePathname();

  return (
    <>
      <aside className={`side-navigation ${isMobile && isOpen ? "side-navigation--open" : ""}`} ref={ref}>
        <nav>
          <ul className="side-navigation__list">
            <li className="side-navigation__list-item">
              <Button
                className={pathname === APP_ROUTES.HOME ? "active" : ""}
                variant={"tertiary"}
                href={`${APP_ROUTES.HOME}`}>
                {translate("ROUTES.HOME")}
              </Button>
            </li>
            <li className="side-navigation__list-item">
              <Button
                className={pathname === `/${APP_ROUTES.PROFILE}` ? "active" : ""}
                variant={"tertiary"}
                href={`/${APP_ROUTES.PROFILE}`}>
                {translate("ROUTES.PROFILE")}
              </Button>
            </li>
          </ul>
          <hr className="divider" />
          <a href={`/${AUTH_ROUTES.BASE}/${AUTH_ROUTES.LOGOUT}`} className="button button--primary button--logout">
            {translate("ACTIONS.LOGOUT")}
          </a>
        </nav>

        <hr className="divider" />
        <div className="side-navigation__footer">
          <Button
            variant={"subtle"}
            className="cookie-consent-settings-button"
            onClick={openCookieSettings}
            type="button">
            <CookieSvg />
            {translate("COOKIE_CONSENT.ACTIONS.OPEN_SETTINGS")}
          </Button>
          {/* TODO */}
          <span>
            &copy; {currentYear} {translate("APP_NAME")}
          </span>
        </div>
      </aside>
    </>
  );
}
