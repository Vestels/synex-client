import { getTranslations } from 'next-intl/server';
import isAuthenticated from '@/libs/authenticated.lib';

export default async function Home() {
  await isAuthenticated();

  const translate = await getTranslations('APP');

  return (
    <>
      <section className="overview-page">
        <h1>{translate('MAIN_PAGE.TITLE')}</h1>
        <hr className="divider" />
      </section>
    </>
  );
}
