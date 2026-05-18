"use client";

import { useMemo, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { ProductFilters } from "@/components/products/ProductFilters";
import { ProductGrid } from "@/components/products/ProductGrid";
import { ProductSort } from "@/components/products/ProductSort";
import { products } from "@/data/products";
import { localizeProducts } from "@/lib/product-i18n";
import type { AppLocale } from "@/lib/i18n";

export default function ProductsPageClient() {
  const t = useTranslations("productsPage");
  const locale = useLocale() as AppLocale;
  const localized = useMemo(() => localizeProducts(products, locale), [locale]);

  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(249);
  const [minRating, setMinRating] = useState(0);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [featuredOnly, setFeaturedOnly] = useState(false);
  const [sort, setSort] = useState("featured");

  const filtered = useMemo(() => {
    const base = localized.filter((p) => {
      const q = query.trim().toLowerCase();
      const matchesQuery =
        !q || [p.name, p.description, ...p.tags].join(" ").toLowerCase().includes(q);
      const matchesCategory = category === "all" || p.category.toLowerCase() === category;
      const matchesPrice = p.price >= minPrice && p.price <= maxPrice;
      const matchesRating = p.rating >= minRating;
      const matchesStock = !inStockOnly || p.inStock;
      const matchesFeatured = !featuredOnly || p.badges.length > 0;

      return (
        matchesQuery &&
        matchesCategory &&
        matchesPrice &&
        matchesRating &&
        matchesStock &&
        matchesFeatured
      );
    });

    const sorted = [...base];
    switch (sort) {
      case "newest":
        sorted.sort((a, b) => Number(b.badges.length > 0) - Number(a.badges.length > 0));
        break;
      case "price_asc":
        sorted.sort((a, b) => a.price - b.price);
        break;
      case "price_desc":
        sorted.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        sorted.sort((a, b) => b.rating - a.rating);
        break;
      case "reviews":
        sorted.sort((a, b) => b.reviewCount - a.reviewCount);
        break;
      default:
        sorted.sort((a, b) => Number(b.featured) - Number(a.featured));
    }

    return sorted;
  }, [localized, query, category, minPrice, maxPrice, minRating, inStockOnly, featuredOnly, sort]);

  const categories = Array.from(new Set(localized.map((p) => p.category.toLowerCase())));

  const resetFilters = () => {
    setQuery("");
    setCategory("all");
    setMinPrice(0);
    setMaxPrice(249);
    setMinRating(0);
    setInStockOnly(false);
    setFeaturedOnly(false);
  };

  return (
    <section className="py-10">
      <h1 className="text-3xl font-semibold text-[var(--foreground)]">{t("title")}</h1>
      <p className="mt-2 text-sm text-[var(--muted-foreground)]">{t("subtitle")}</p>

      <div className="mt-6 space-y-4">
        <ProductFilters
          query={query}
          category={category}
          minPrice={minPrice}
          maxPrice={maxPrice}
          minRating={minRating}
          inStockOnly={inStockOnly}
          featuredOnly={featuredOnly}
          categories={categories}
          onQuery={setQuery}
          onCategory={setCategory}
          onMinPrice={setMinPrice}
          onMaxPrice={setMaxPrice}
          onMinRating={setMinRating}
          onInStock={setInStockOnly}
          onFeatured={setFeaturedOnly}
          onClear={resetFilters}
          mobileOpen={mobileFiltersOpen}
          onMobileOpenChange={setMobileFiltersOpen}
        />

        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm text-[var(--muted-foreground)]">
            {t("count", { count: filtered.length })}
          </p>
          <ProductSort value={sort} onChange={setSort} />
        </div>

        {filtered.length ? (
          <ProductGrid products={filtered} />
        ) : (
          <div className="surface-card p-8 text-center">
            <p className="font-medium text-[var(--foreground)]">{t("emptyTitle")}</p>
            <p className="mt-2 text-sm text-[var(--muted-foreground)]">{t("emptyText")}</p>
          </div>
        )}
      </div>
    </section>
  );
}
