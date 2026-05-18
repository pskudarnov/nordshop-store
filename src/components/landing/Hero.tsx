import {useLocale, useTranslations} from 'next-intl';
import type {AppLocale} from '@/lib/i18n';
import {formatCurrency} from '@/lib/currency';
import {Link} from "@/i18n/navigation";
import { ProductImage } from "@/components/products/ProductImage";
import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";

export function Hero() {
  const t = useTranslations('landing.hero');
  const locale = useLocale() as AppLocale;
  const freeShippingThreshold = 180;
  const stats = [
    { label: t('stats.customers'), value: '24k+' },
    { label: t('stats.rating'), value: '4.9/5' },
    { label: t('stats.curated'), value: '320+' },
    { label: t('stats.delivery'), value: '24h' }
  ] as const;

  return (
    <Section className="grid gap-10 pb-10 pt-11 md:items-start md:grid-cols-[1.1fr_0.9fr] md:gap-11 md:pb-14 md:pt-15">
      <div>
        <p className="inline-flex rounded-full border border-[var(--border)] bg-[color-mix(in_srgb,var(--accent)_16%,var(--muted))] px-3 py-1 text-[11px] font-medium uppercase tracking-[0.12em] text-[var(--foreground)]">{t('badge')}</p>
        <h1 className="mt-5 max-w-3xl text-4xl font-semibold tracking-[-0.02em] text-[var(--foreground)] md:text-6xl md:leading-[1.04]">{t('title')}</h1>
        <p className="mt-5 max-w-2xl text-base text-[var(--muted-foreground)] md:text-lg md:leading-[1.65]">{t('subtitle')}</p>

        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="/products"><Button>{t('shop')}</Button></Link>
          <Link href="/#setups"><Button variant="ghost">{t('explore')}</Button></Link>
        </div>

        <div className="mt-7 flex flex-wrap gap-2 text-xs text-[var(--foreground)]">
          <span className="rounded-full border border-[var(--border)] bg-[var(--card)] px-3 py-1">{t('trust1', {value: formatCurrency(freeShippingThreshold, locale)})}</span>
          <span className="rounded-full border border-[var(--border)] bg-[var(--card)] px-3 py-1">{t('trust2')}</span>
          <span className="rounded-full border border-[var(--border)] bg-[var(--card)] px-3 py-1">{t('trust3')}</span>
        </div>

        <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="surface-card p-3">
              <p className="text-lg font-semibold text-[var(--foreground)]">{s.value}</p>
              <p className="mt-1 text-xs text-[var(--muted-foreground)]">{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      <aside className="premium-panel relative self-start overflow-hidden rounded-3xl p-6 md:p-8">
        <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-[color-mix(in_srgb,var(--accent)_28%,transparent)] blur-3xl" aria-hidden />
        <p className="text-xs font-medium uppercase tracking-[0.14em] text-[var(--muted-foreground)]">{t('popular')}</p>
        <h2 className="mt-2 text-2xl font-semibold text-[var(--foreground)]">{t('bundleTitle')}</h2>
        <p className="mt-3 text-sm text-[var(--muted-foreground)]">{t('bundleText')}</p>
        <div className="mt-5 grid grid-cols-[1.35fr_1fr] gap-2.5">
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--muted)] p-2.5">
            <ProductImage src="/images/products/fjord-mech-keyboard-main.webp" alt={t('bundleAlt1')} fill className="object-contain p-2" sizes="(max-width: 768px) 100vw, 320px" priority />
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--muted)] p-2.5">
            <ProductImage src="/images/products/aura-desk-lamp-main.webp" alt={t('bundleAlt2')} fill className="object-contain p-2" sizes="(max-width: 768px) 100vw, 240px" />
          </div>
        </div>

        <div className="mt-4 rounded-2xl border border-[var(--border)] bg-[var(--card)] px-4 py-3">
          <div className="flex items-center justify-between text-sm">
            <span className="font-medium text-[var(--muted-foreground)]">{t('bundlePrice')}</span>
            <span className="font-semibold text-[var(--foreground)]">{formatCurrency(279, locale)}</span>
          </div>
          <div className="mt-1 text-xs text-[color:#7d6435]">{t('bundleStock')}</div>
        </div>
      </aside>
    </Section>
  );
}
