"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { SlidersHorizontal, X } from "lucide-react";
import {useTranslations} from 'next-intl';

type Props = {
  query: string; category: string; minPrice: number; maxPrice: number; minRating: number; inStockOnly: boolean; featuredOnly: boolean;
  mobileOpen: boolean; onMobileOpenChange: (open: boolean) => void; onClear: () => void; onQuery: (v: string) => void; onCategory: (v: string) => void;
  onMinPrice: (v: number) => void; onMaxPrice: (v: number) => void; onMinRating: (v: number) => void; onFeatured: (v: boolean) => void; onInStock: (v: boolean) => void; categories: readonly string[];
};

const inputClassName = "mt-1.5 w-full rounded-xl border border-[var(--border)] bg-[var(--input)] px-3 py-2 text-sm text-[var(--foreground)] placeholder:text-[var(--muted-foreground)] transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)]";

export function ProductFilters(props: Props) {
  const t = useTranslations('productFilters');

  const controls = (
    <div className="space-y-3">
      <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
      <label className="text-[13px] font-medium text-[var(--foreground)]">
        {t('search')}
        <input aria-label={t('searchAria')} value={props.query} onChange={(e) => props.onQuery(e.target.value)} className={inputClassName} placeholder={t('searchPlaceholder')} />
      </label>

      <label className="text-[13px] font-medium text-[var(--foreground)]">
        {t('category')}
        <select aria-label={t('categoryAria')} value={props.category} onChange={(e) => props.onCategory(e.target.value)} className={inputClassName}>
          <option value="all">{t('all')}</option>
          {props.categories.map((c) => <option key={c} value={c}>{c}</option>)}
        </select>
      </label>

      <label className="text-[13px] font-medium text-[var(--foreground)]">{t('minPrice')}<input type="number" min={0} value={props.minPrice} onChange={(e) => props.onMinPrice(Number(e.target.value) || 0)} className={inputClassName} /></label>
      <label className="text-[13px] font-medium text-[var(--foreground)]">{t('maxPrice')}<input type="number" min={0} value={props.maxPrice} onChange={(e) => props.onMaxPrice(Number(e.target.value) || 0)} className={inputClassName} /></label>
      <label className="text-[13px] font-medium text-[var(--foreground)]">{t('rating')}
        <select value={props.minRating} onChange={(e) => props.onMinRating(Number(e.target.value))} className={inputClassName}>
          <option value={0}>{t('any')}</option><option value={4}>4.0+</option><option value={4.5}>4.5+</option><option value={4.8}>4.8+</option>
        </select>
      </label>
      <div className="flex items-end"><button type="button" onClick={props.onClear} className="h-10 w-full rounded-xl border border-[var(--border)] bg-[var(--card)] px-3 text-sm font-medium text-[var(--foreground)] transition-all duration-200 hover:bg-[var(--muted)] active:brightness-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)]">{t('clear')}</button></div>
      </div>
      <div className="flex flex-wrap items-center gap-4 pt-1">
        <label className="inline-flex items-center gap-2 text-sm text-[var(--muted-foreground)]"><input type="checkbox" checked={props.featuredOnly} onChange={(e) => props.onFeatured(e.target.checked)} className="h-4 w-4 rounded border-[var(--border)] bg-[var(--input)] accent-[var(--accent)]" />{t('featuredOnly')}</label>
        <label className="inline-flex items-center gap-2 text-sm text-[var(--muted-foreground)]"><input type="checkbox" checked={props.inStockOnly} onChange={(e) => props.onInStock(e.target.checked)} className="h-4 w-4 rounded border-[var(--border)] bg-[var(--input)] accent-[var(--accent)]" />{t('inStockOnly')}</label>
      </div>
    </div>
  );

  return (
    <>
      <div className="hidden rounded-2xl border border-[var(--border)] bg-[var(--card)] p-4 shadow-[var(--shadow-soft)] md:block">{controls}</div>
      <Dialog.Root open={props.mobileOpen} onOpenChange={props.onMobileOpenChange}>
        <div className="md:hidden">
          <Dialog.Trigger asChild>
            <button type="button" aria-expanded={props.mobileOpen} aria-controls="mobile-filters-drawer" className="inline-flex h-10 items-center gap-2 rounded-xl border border-[var(--border)] bg-[var(--card)] px-3 text-sm font-medium text-[var(--foreground)] transition-all duration-200 hover:bg-[var(--muted)] active:brightness-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)]"><SlidersHorizontal className="h-4 w-4 transition-transform duration-200" />{t('filters')}</button>
          </Dialog.Trigger>
          <Dialog.Portal>
            <Dialog.Overlay className="fixed inset-0 z-40 bg-black/45 p-4 md:hidden" />
            <Dialog.Content id="mobile-filters-drawer" aria-label={t('filters')} className="fixed inset-x-4 top-16 z-50 rounded-2xl border border-[var(--border)] bg-[var(--card)] p-4 text-[var(--card-foreground)] shadow-[var(--shadow-soft-lg)] focus:outline-none md:hidden">
              <Dialog.Title className="mb-3 text-base font-medium text-[var(--foreground)]">{t('filters')}</Dialog.Title>
              <Dialog.Close asChild>
                <button type="button" aria-label={t('close')} className="absolute right-3 top-3 rounded-lg p-2 text-[var(--muted-foreground)] transition-colors duration-200 hover:bg-[var(--muted)] hover:text-[var(--foreground)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)]"><X className="h-4 w-4" /></button>
              </Dialog.Close>
              {controls}
            </Dialog.Content>
          </Dialog.Portal>
        </div>
      </Dialog.Root>
    </>
  );
}
