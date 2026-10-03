import { getLocale, getTranslations } from "next-intl/server";
import Link from "next/link";

export default async function Home() {
  const translate = await getTranslations("APP");
  const locale = await getLocale();

  return (
    <>
      <section className="overview-page">
        <h1>{translate("MAIN_PAGE.TITLE")}</h1>
        <hr className="divider" />

        <Link href={`/${locale}/api/auth/link`}>Google fiók csatolása</Link>
      </section>
    </>
  );
}
