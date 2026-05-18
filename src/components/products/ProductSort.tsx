"use client";

import { useTranslations } from "next-intl";

export function ProductSort({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  const t = useTranslations("productSort");

  return (
    <label className="text-sm text-[var(--muted-foreground)]">
      {t("label")}
      <select
        aria-label={t("aria")}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="ml-2 rounded-xl border border-[var(--border)] bg-[var(--input)] px-3 py-2 text-[var(--foreground)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)]"
      >
        <option value="featured">{t("featured")}</option>
        <option value="newest">{t("newest")}</option>
        <option value="price_asc">{t("priceAsc")}</option>
        <option value="price_desc">{t("priceDesc")}</option>
        <option value="rating">{t("rating")}</option>
        <option value="reviews">{t("reviews")}</option>
      </select>
    </label>
  );
}
