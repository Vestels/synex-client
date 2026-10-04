import * as rootParams from 'next/root-params';
import { getRequestConfig } from 'next-intl/server';
import { hasLocale } from 'next-intl';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';

export default getRequestConfig(async () => {
  const paramValue = await rootParams.locale();

  if (!hasLocale(routing.locales, paramValue)) {
    notFound();
  }

  return {
    locale: paramValue,
    messages: (await import(`@/i18n/messages/${paramValue}-${paramValue.toUpperCase()}.json`))
      .default,
  };
});
