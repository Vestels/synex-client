import '@/styles/styles.scss';
import { NextIntlClientProvider } from 'next-intl';
import { getLocale, getMessages } from 'next-intl/server';
import { Metadata } from 'next';
import { routing } from '@/i18n/routing';
import { cookies } from 'next/headers';
import { UserAppBehaviourPreferences } from '@/interfaces/user.interface';
import { Language, Theme } from '@/enums/user.enum';
import { isMock } from '@/libs/mock.lib';
import { getCurrentUserPreferencesAction } from '@/actions/user.actions';
import NavigationShell from '@/components/navigation/NavigationShell';
import CookieConsentGate from '@/components/CookieConsentGate';

// TODO
export const metadata: Metadata = {
  title: 'Fitness App',
  description: 'Fitness application',
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({
    locale,
  }));
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [messages, locale, cookieStore] = await Promise.all([
    getMessages(),
    getLocale(),
    cookies(),
  ]);

  const storedPreferences: Partial<UserAppBehaviourPreferences> =
    JSON.parse(cookieStore.get('app-preferences')?.value ?? 'null') ?? {};

  let preference: UserAppBehaviourPreferences;

  if (isMock) {
    preference = await getCurrentUserPreferencesAction();
  } else {
    preference = {
      theme: storedPreferences.theme ?? Theme.LIGHT,
      language: storedPreferences.language ?? Language.HU,
    };
  }

  return (
    <html
      lang={locale}
      data-theme={preference.theme.toLocaleLowerCase()}
      data-scroll-behavior="smooth"
    >
      <body>
        <NextIntlClientProvider messages={messages}>
          <NavigationShell>{children}</NavigationShell>
          <CookieConsentGate />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
