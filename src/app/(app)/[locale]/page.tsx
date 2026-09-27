import { getTranslations } from "next-intl/server";

export default async function Home() {
  const translate = await getTranslations("APP");

  return (
    <>
      <section className="overview-page">
        <h1>{translate("MAIN_PAGE.TITLE")}</h1>
        <hr className="divider" />
      </section>
    </>
  );
}
