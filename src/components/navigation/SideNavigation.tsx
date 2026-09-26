"use client";

import { APP_ROUTES, AUTH_ROUTES } from "@/constants/routes";
import { useTranslations } from "next-intl";
import { usePathname } from "@/i18n/navigation";
import Button from "@/components/Button";

type SideNaviogationProps = {
  ref?: React.Ref<HTMLElement>;
  isOpen: boolean;
  isMobile: boolean;
};

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
          <a href={`/${AUTH_ROUTES.LOGOUT}`} className="button button--primary">
            {translate("ACTIONS.LOGOUT")}
          </a>
        </nav>
      </aside>
    </>
  );
}
