import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages } from "next-intl/server";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ScrollToTopOnRouteChange } from "@/components/layout/ScrollToTopOnRouteChange";
import { ToastViewport } from "@/components/ui/ToastViewport";
import { isLocale } from "@/lib/i18n";

const siteUrl = "https://nordshop.pavel-skudarnov.ru";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  robots: { index: true, follow: true },
  icons: { icon: "/icon.svg" },
};

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const themeInitScript = `(() => {
    try {
      const key = "nordshop-theme";
      const saved = window.localStorage.getItem(key);
      if (saved === "light" || saved === "dark") {
        document.documentElement.dataset.theme = saved;
      }
    } catch (_) {}
  })();`;

  const messages = await getMessages();
  const requestedLocale = await getLocale();
  const locale = isLocale(requestedLocale) ? requestedLocale : "ru";

  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        <script id="theme-init" dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body>
        <NextIntlClientProvider messages={messages} locale={locale}>
          <ToastViewport />
          <ScrollToTopOnRouteChange />
          <Header />
          <main className="mx-auto min-h-[calc(100vh-160px)] w-full max-w-6xl px-4 sm:px-6">
            {children}
          </main>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
