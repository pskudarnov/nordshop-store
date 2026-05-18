"use client";

import { Link } from "@/i18n/navigation";
import { Lock, ShieldCheck } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import type { AppLocale } from "@/lib/i18n";
import { formatCurrency } from "@/lib/currency";

export function CartSummary({
  subtotal,
  shipping,
  total,
}: {
  subtotal: number;
  shipping: number;
  total: number;
}) {
  const t = useTranslations("cartSummary");
  const locale = useLocale() as AppLocale;
  const freeShippingThreshold = 180;
  const left = Math.max(0, freeShippingThreshold - subtotal);
  const progress = Math.min(100, Math.round((subtotal / freeShippingThreshold) * 100));

  return (
    <aside className="h-max rounded-2xl border border-[var(--border)] bg-[var(--card)] p-5 text-[var(--card-foreground)] shadow-[var(--shadow-soft)] lg:sticky lg:top-24">
      <h2 className="text-lg font-semibold text-[var(--foreground)]">{t("title")}</h2>
      <div className="mt-3 rounded-xl border border-[var(--border)] bg-[var(--muted)] p-3">
        <div className="h-2 overflow-hidden rounded-full bg-[color-mix(in_srgb,var(--muted-foreground)_24%,transparent)]">
          <div className="h-full bg-emerald-500" style={{ width: `${progress}%` }} />
        </div>
        <p className="mt-2 text-xs text-[var(--muted-foreground)]">
          {left > 0 ? t("freeLeft", { value: formatCurrency(left, locale) }) : t("freeUnlocked")}
        </p>
      </div>
      <dl className="mt-4 space-y-3 text-sm text-[var(--muted-foreground)]">
        <div className="flex justify-between">
          <dt>{t("subtotal")}</dt>
          <dd className="text-[var(--foreground)]">{formatCurrency(subtotal, locale)}</dd>
        </div>
        <div className="flex justify-between">
          <dt>{t("delivery")}</dt>
          <dd className="text-[var(--foreground)]">
            {left <= 0 ? t("free") : formatCurrency(shipping, locale)}
          </dd>
        </div>
        <div className="mt-2 flex justify-between border-t border-[var(--border)] pt-3 text-base font-semibold text-[var(--foreground)]">
          <dt>{t("total")}</dt>
          <dd>{formatCurrency(left <= 0 ? subtotal : total, locale)}</dd>
        </div>
      </dl>
      <p className="mt-4 rounded-xl border border-[var(--border)] bg-[color-mix(in_srgb,var(--accent)_16%,var(--muted))] px-3 py-2 text-xs text-[var(--foreground)]">
        <ShieldCheck className="mr-1 inline h-3.5 w-3.5" /> {t("secureNote")}
      </p>
      <Link
        href="/checkout"
        className="mt-4 inline-flex h-10 w-full items-center justify-center gap-1.5 rounded-xl bg-[var(--primary)] px-4 text-sm font-semibold text-[var(--primary-foreground)] transition hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)]"
      >
        <Lock className="h-4 w-4" />
        <span>{t("checkout")}</span>
      </Link>
    </aside>
  );
}
