import type {Metadata} from 'next';
import {getLocale, getTranslations} from 'next-intl/server';
import type {AppLocale} from '@/lib/i18n';
import CartPageClient from './page-client';

const siteUrl = 'https://nordshop.pavel-skudarnov.ru';
const urlFor = (locale: AppLocale, path: string) => (locale === 'en' ? `${siteUrl}/en${path}` : `${siteUrl}${path}`);

export async function generateMetadata(): Promise<Metadata> {
  const locale = (await getLocale()) as AppLocale;
  const t = await getTranslations('meta');
  const path = '/cart';
  return {title: t('cartTitle'), description: t('cartDescription'), alternates: {canonical: urlFor(locale, path), languages: {ru: urlFor('ru', path), en: urlFor('en', path), 'x-default': urlFor('ru', path)}}, robots: {index: false, follow: true}};
}

export default function CartPage() { return <CartPageClient />; }
