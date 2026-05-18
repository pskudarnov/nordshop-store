export const locales = ['ru', 'en'] as const;
export type AppLocale = (typeof locales)[number];

export const defaultLocale: AppLocale = 'ru';

export function isLocale(value: string): value is AppLocale {
  return (locales as readonly string[]).includes(value);
}

export function localePrefix(locale: AppLocale) {
  return locale === 'en' ? '/en' : '';
}

export function withLocalePath(locale: AppLocale, path: string) {
  const normalized = path.startsWith('/') ? path : `/${path}`;
  if (locale === 'ru') return normalized;
  return normalized === '/' ? '/en' : `/en${normalized}`;
}
