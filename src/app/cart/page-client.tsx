"use client";

import { Link } from "@/i18n/navigation";
import { useEffect, useMemo, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { CartItem } from "@/components/cart/CartItem";
import { CartSummary } from "@/components/cart/CartSummary";
import { ProductGrid } from "@/components/products/ProductGrid";
import { Skeleton } from "@/components/ui/Skeleton";
import { products } from "@/data/products";
import { getCartTotals, useCartStore } from "@/store/cart-store";
import { useUiStore } from "@/store/ui-store";
import { localizeProduct, localizeProducts } from "@/lib/product-i18n";
import type { AppLocale } from "@/lib/i18n";

function CartLoadingSkeleton() {
  return (
    <div className="mt-8 grid gap-5 lg:grid-cols-[1fr_336px]">
      <div className="space-y-4">
        {Array.from({ length: 2 }).map((_, idx) => (
          <div key={idx} className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-4">
            <Skeleton className="h-5 w-1/3" />
            <Skeleton className="mt-2 h-4 w-1/4" />
            <Skeleton className="mt-5 h-10" />
          </div>
        ))}
      </div>
      <div className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-5">
        <Skeleton className="h-6 w-1/2" />
        <Skeleton className="mt-4 h-4" />
        <Skeleton className="mt-2 h-4" />
        <Skeleton className="mt-4 h-10" />
      </div>
    </div>
  );
}

export default function CartPageClient() {
  const t = useTranslations("cartPage");
  const locale = useLocale() as AppLocale;
  const items = useCartStore((s) => s.items);
  const increment = useCartStore((s) => s.increment);
  const decrement = useCartStore((s) => s.decrement);
  const remove = useCartStore((s) => s.remove);
  const pushToast = useUiStore((s) => s.pushToast);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 240);
    return () => clearTimeout(timer);
  }, []);
  const totals = getCartTotals(items);
  const localizedProducts = useMemo(() => localizeProducts(products, locale), [locale]);
  const suggested = useMemo(
    () => localizedProducts.filter((p) => !items.some((i) => i.productId === p.id)).slice(0, 3),
    [items, localizedProducts],
  );
  const handleRemove = (productId: string) => {
    const product = products.find((item) => item.id === productId);
    const localized = product ? localizeProduct(product, locale) : null;
    remove(productId);
    pushToast({
      type: "info",
      title: t("removedTitle", { name: localized?.name ?? t("item") }),
      message: t("removedText"),
    });
  };
  return (
    <section className="py-10 text-[var(--foreground)]">
      <h1 className="text-3xl font-semibold">{t("title")}</h1>
      <p className="mt-2 text-sm text-[var(--muted-foreground)]">{t("subtitle")}</p>
      {loading ? (
        <CartLoadingSkeleton />
      ) : items.length === 0 ? (
        <div className="mt-8 rounded-2xl border border-dashed border-[var(--border)] bg-[var(--card)] p-10 text-center">
          <p className="text-[var(--foreground)]">{t("emptyTitle")}</p>
          <p className="mt-2 text-sm text-[var(--muted-foreground)]">{t("emptyText")}</p>
          <Link
            href="/products"
            className="mt-4 inline-block rounded-xl bg-[var(--primary)] px-4 py-2 text-sm text-[var(--primary-foreground)] transition hover:brightness-110"
          >
            {t("browse")}
          </Link>
        </div>
      ) : (
        <>
          <div className="mt-8 grid gap-5 lg:grid-cols-[1fr_336px]">
            <div className="space-y-4">
              {items.map((item) => {
                const product = products.find((p) => p.id === item.productId);
                if (!product) return null;
                const localized = localizeProduct(product, locale);
                return (
                  <CartItem
                    key={item.productId}
                    product={localized}
                    quantity={item.quantity}
                    onMinus={() => decrement(item.productId)}
                    onPlus={() => increment(item.productId)}
                    onRemove={() => handleRemove(item.productId)}
                  />
                );
              })}
            </div>
            <CartSummary
              subtotal={totals.subtotal}
              shipping={totals.shipping}
              total={totals.total}
            />
          </div>
          <div className="mt-10">
            <h2 className="mb-4 text-xl font-semibold text-[var(--foreground)]">{t("alsoLike")}</h2>
            <ProductGrid products={suggested} />
          </div>
        </>
      )}
    </section>
  );
}
