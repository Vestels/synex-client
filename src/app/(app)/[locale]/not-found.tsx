"use client";

import { APP_ROUTES } from "@/constants/routes";
import { useTranslations } from "next-intl";
import Button from "@/components/Button";
import Image from "next/image";

export default function NotFound() {
  const translate = useTranslations("APP");

  return (
    <div className="not-found-page">
      <h1 className="not-found-page__label">{translate("STATUS.NOT_FOUND")}</h1>
      <Image
        className="not-found-page__illustration"
        src={"/assets/illustrations/leaves.svg"}
        width={80}
        height={80}
        alt=""
      />
      <Button href={APP_ROUTES.HOME} variant={"secondary"}>
        {translate("ACTIONS.ERROR.BACK_TO_HOME")}
      </Button>
    </div>
  );
}
