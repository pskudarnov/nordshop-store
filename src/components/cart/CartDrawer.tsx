"use client";

import {useLocale, useTranslations} from 'next-intl';
import {Link} from "@/i18n/navigation";
import {usePathname, useRouter} from "@/i18n/navigation";
import { ShoppingBag, X } from "lucide-react";
import { products } from "@/data/products";
import { formatCurrency } from "@/lib/currency";
import { getCartTotals, useCartStore } from "@/store/cart-store";
import {localizeProduct} from '@/lib/product-i18n';
import type {AppLocale} from '@/lib/i18n';

type CartDrawerContentProps = { onClose: () => void; mobile?: boolean };

export function CartDrawerContent({ onClose, mobile = false }: CartDrawerContentProps) {
  const t = useTranslations('cartDrawer');
  const locale = useLocale() as AppLocale;
  const items = useCartStore((s) => s.items);
  const remove = useCartStore((s) => s.remove);
  const totals = getCartTotals(items);
  const router = useRouter();
  const pathname = usePathname();

  const previewItems = items.map((item) => ({ item, product: products.find((p) => p.id === item.productId) })).filter((entry) => entry.product).slice(0, 4);
  const isEmpty = previewItems.length === 0;

  const handleBrowseProducts = () => {
    onClose();
    if (pathname === "/") {
      document.getElementById("products")?.scrollIntoView({ behavior: "smooth" });
      return;
    }
    router.push("/#products");
  };

  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-between border-b border-[var(--border)] px-4 py-3">
        <p className="text-sm font-semibold text-[var(--foreground)]">{t('title', {count: items.length})}</p>
        <button type="button" onClick={onClose} className="rounded-lg p-2 text-[var(--muted-foreground)] transition-colors hover:bg-[var(--muted)] hover:text-[var(--foreground)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)]" aria-label={t('close')}><X className="h-4 w-4" /></button>
      </div>
      <div className="max-h-[50vh] overflow-auto px-4 py-4">
        {isEmpty ? (
          <div className="rounded-2xl border border-dashed border-[var(--border)] bg-[var(--muted)] px-4 py-8 text-center">
            <div className="mx-auto mb-3 inline-flex h-11 w-11 items-center justify-center rounded-full bg-[var(--card)] text-[var(--foreground)] shadow-[var(--shadow-soft)]"><ShoppingBag className="h-5 w-5" aria-hidden="true" /></div>
            <p className="text-sm font-semibold text-[var(--foreground)]">{t('emptyTitle')}</p>
            <p className="mt-1 text-sm text-[var(--muted-foreground)]">{t('emptyText')}</p>
            <button type="button" onClick={handleBrowseProducts} className="mt-4 inline-flex h-11 w-full items-center justify-center rounded-xl bg-[var(--primary)] px-4 text-sm font-semibold text-[var(--primary-foreground)] transition-colors hover:brightness-110 active:brightness-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)]">{t('browse')}</button>
          </div>
        ) : (
          <ul className="space-y-3">
            {previewItems.map(({ item, product }) => {
              if (!product) return null;
              const localized = localizeProduct(product, locale);
              return (
                <li key={item.productId} className="rounded-xl border border-[var(--border)] bg-[var(--muted)] p-3">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0"><p className="truncate text-sm font-medium text-[var(--foreground)]">{localized.name}</p><p className="mt-1 text-xs text-[var(--muted-foreground)]">{item.quantity} × {formatCurrency(localized.price, locale)}</p></div>
                    <button type="button" onClick={() => remove(item.productId)} className="rounded px-1 text-xs text-[var(--muted-foreground)] underline-offset-2 transition hover:text-[var(--foreground)] hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)]">{t('remove')}</button>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </div>
      {!isEmpty ? (
        <div className="border-t border-[var(--border)] px-4 py-4">
          <p className="flex items-center justify-between text-sm"><span className="text-[var(--muted-foreground)]">{t('subtotal')}</span><span className="font-semibold text-[var(--foreground)]">{formatCurrency(totals.subtotal, locale)}</span></p>
          <div className={`mt-3 grid gap-2 ${mobile ? "grid-cols-1" : "grid-cols-2"}`}>
            <Link href="/cart" onClick={onClose} className="inline-flex h-11 items-center justify-center rounded-xl border border-[var(--border)] bg-[var(--card)] px-4 text-sm font-medium text-[var(--foreground)] transition-colors hover:bg-[var(--muted)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)]">{t('viewCart')}</Link>
            <Link href="/checkout" onClick={onClose} className="inline-flex h-11 items-center justify-center rounded-xl border border-[var(--primary)] bg-[var(--primary)] px-4 text-sm font-semibold text-[var(--primary-foreground)] shadow-[var(--shadow-soft)] transition-all duration-200 hover:brightness-110 active:brightness-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)]">{t('checkout')}</Link>
          </div>
        </div>
      ) : null}
    </div>
  );
}
