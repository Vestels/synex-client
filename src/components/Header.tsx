"use client";

import { useTranslations } from "next-intl";
import Button from "@/components/Button";

type HeaderProps = {
  isMobile: boolean;
  isSideNavigationOpen: boolean;
  onMenuOpen: () => void;
};

export default function Header({ isMobile, isSideNavigationOpen, onMenuOpen }: HeaderProps) {
  const translate = useTranslations("APP");

  return (
    <header className="header">
      <div className="header__wrapper">
        {isMobile && (
          <Button className="header__menu-button" onClick={onMenuOpen}>
            <div className={`menu-wrapper ${isSideNavigationOpen ? "menu-wrapper--open" : ""}`}>
              <span className="line"></span>
              <span className="line"></span>
              <span className="line"></span>
            </div>
          </Button>
        )}
        <div className="header__logo">
          <h1>{translate("APP_NAME")}</h1>
        </div>
      </div>
    </header>
  );
}
