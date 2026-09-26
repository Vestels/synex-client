import "@/styles/styles.scss";
import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages } from "next-intl/server";
import { Metadata } from "next";
import { routing } from "@/i18n/routing";
import { getCurrentUserAction } from "@/actions/user.actions";
import NavigationShell from "@/app/components/navigation/NavigationShell";

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
  await getCurrentUserAction();

  const [messages, locale] = await Promise.all([getMessages(), getLocale()]);

  return (
    <html lang={locale} data-theme="light" data-scroll-behavior="smooth">
      <body>
        <NextIntlClientProvider messages={messages}>
          <NavigationShell>{children}</NavigationShell>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
