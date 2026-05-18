import type { AppLocale } from "./i18n";

export const CURRENCY_BY_LOCALE: Record<AppLocale, "USD" | "RUB"> = {
  en: "USD",
  ru: "RUB",
};

const LOCALE_TAG_BY_LOCALE: Record<AppLocale, string> = {
  en: "en-US",
  ru: "ru-RU",
};

// Canonical catalog amounts are stored in USD for predictable business logic
// (filters, totals, thresholds). RU display uses a fixed showcase rate to avoid
// runtime FX drift in UI snapshots: 1 USD = 100 RUB.
const SHOWCASE_RUB_PER_USD = 100;

export function toLocaleAmount(valueUsd: number, locale: AppLocale): number {
  return locale === "ru" ? valueUsd * SHOWCASE_RUB_PER_USD : valueUsd;
}

export function formatCurrency(valueUsd: number, locale: AppLocale): string {
  return new Intl.NumberFormat(LOCALE_TAG_BY_LOCALE[locale], {
    style: "currency",
    currency: CURRENCY_BY_LOCALE[locale],
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(toLocaleAmount(valueUsd, locale));
}
