import type {Metadata} from 'next';
import {getLocale, getTranslations} from 'next-intl/server';
import type {AppLocale} from '@/lib/i18n';
import { Benefits } from "@/components/landing/Benefits";
import { CTA } from "@/components/landing/CTA";
import { ExtraSections } from "@/components/landing/ExtraSections";
import { FeaturedProducts } from "@/components/landing/FeaturedProducts";
import { Hero } from "@/components/landing/Hero";

const siteUrl = 'https://nordshop.pavel-skudarnov.ru';
const urlFor = (locale: AppLocale, path: string) => (locale === 'en' ? `${siteUrl}/en${path}` : `${siteUrl}${path}`);

export async function generateMetadata(): Promise<Metadata> {
  const locale = (await getLocale()) as AppLocale;
  const t = await getTranslations('meta');
  return {title: t('title'), description: t('description'), openGraph: {title: t('title'), description: t('ogDescription'), url: urlFor(locale, '/')}, alternates: {canonical: urlFor(locale, '/'), languages: {ru: urlFor('ru', '/'), en: urlFor('en', '/'), 'x-default': urlFor('ru', '/')}}};
}

export default function HomePage() {
  return <><Hero /><FeaturedProducts /><Benefits /><ExtraSections /><CTA /></>;
}
