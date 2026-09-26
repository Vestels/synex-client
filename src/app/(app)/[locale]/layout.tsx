import "@/styles/styles.scss";
import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages } from "next-intl/server";
import { Metadata } from "next";
import { routing } from "@/i18n/routing";
import NavigationShell from "@/components/navigation/NavigationShell";
import CookieConsentGate from "@/components/CookieConsentGate";
import { cookies } from "next/headers";

// TODO
export const metadata: Metadata = {
  title: "Fitness App",
  description: "Fitness application",
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
  const [messages, locale, cookieStore] = await Promise.all([getMessages(), getLocale(), cookies()]);
  const appPreferencesCookie = cookieStore.get("app-preferences")?.value;
  const appRreferences = appPreferencesCookie ? JSON.parse(appPreferencesCookie) : null;

  return (
    <html lang={locale} data-theme={appRreferences?.theme ?? "light"} data-scroll-behavior="smooth">
      <body>
        <NextIntlClientProvider messages={messages}>
          <NavigationShell>{children}</NavigationShell>
          <CookieConsentGate />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
