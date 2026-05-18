"use client";

import { ProductImage } from "@/components/products/ProductImage";
import { Link } from "@/i18n/navigation";
import { Check, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import type { Product } from "@/data/products";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Price } from "@/components/ui/Price";
import { formatCurrency } from "@/lib/currency";
import type { AppLocale } from "@/lib/i18n";
import { hoverLift, motionTiming } from "@/lib/motion";
import { useCartStore } from "@/store/cart-store";
import { useUiStore } from "@/store/ui-store";

export function ProductCard({ product }: { product: Product }) {
  const t = useTranslations("productCard");
  const locale = useLocale() as AppLocale;
  const addToCart = useCartStore((s) => s.addToCart);
  const pushToast = useUiStore((s) => s.pushToast);
  const [added, setAdded] = useState(false);
  const [hovered, setHovered] = useState(false);

  const handleAdd = () => {
    addToCart(product.id);
    pushToast({
      type: "success",
      title: t("toastAddedTitle", { name: product.name }),
      message: t("toastAddedMessage", { sku: product.sku, eta: product.etaDays }),
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 1200);
  };

  return (
    <motion.article
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--card)] p-4 text-[var(--card-foreground)] shadow-[var(--shadow-soft)] transition-shadow duration-300 hover:shadow-[0_12px_30px_rgba(0,0,0,0.05)]"
      whileHover={hoverLift.whileHover}
      transition={hoverLift.transition}
    >
      <div
        className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-[color-mix(in_srgb,var(--border)_70%,transparent)] bg-[radial-gradient(circle_at_50%_18%,color-mix(in_srgb,var(--accent)_18%,transparent),transparent_34%),linear-gradient(145deg,color-mix(in_srgb,var(--background-elevated)_78%,var(--card)),var(--muted))]"
        aria-hidden
      >
        <motion.div
          animate={{ scale: hovered ? 1.04 : 1 }}
          transition={{ duration: motionTiming.base, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-5 sm:inset-6"
        >
          <ProductImage
            src={product.image}
            alt={`${product.name} — ${t("imageAltSuffix")}`}
            fill
            className="object-contain drop-shadow-[0_24px_28px_rgba(0,0,0,0.28)] transition-transform duration-300"
            sizes="(max-width: 640px) 78vw, (max-width: 1024px) 38vw, 24vw"
            loading="lazy"
          />
        </motion.div>
        <div className="pointer-events-none absolute inset-x-8 bottom-4 h-8 rounded-full bg-black/15 blur-2xl" />
        <div className="absolute left-4 top-4 flex flex-wrap gap-1">
          <span className="rounded-full border border-[var(--border)] bg-[color-mix(in_srgb,var(--card)_90%,transparent)] px-2 py-1 text-[11px] font-medium text-[var(--foreground)] shadow-sm backdrop-blur">
            {product.category}
          </span>
          {product.badges[0] ? <Badge label={product.badges[0]} /> : null}
        </div>
        <div className="absolute bottom-4 right-4 rounded-lg border border-[var(--border)] bg-[color-mix(in_srgb,var(--card)_88%,transparent)] px-2 py-1 text-xs text-[var(--foreground)] shadow-sm backdrop-blur">
          ★ {product.rating} ({product.reviewCount})
        </div>
      </div>
      <div className="mt-4 flex flex-1 flex-col">
        <div>
          <div className="flex items-center justify-between gap-2">
            <h3 className="text-[17px] font-medium leading-[1.3] text-[var(--foreground)]">
              {product.name}
            </h3>
            <span className="text-[11px] uppercase tracking-[0.08em] text-[var(--muted-foreground)]">
              {product.sku}
            </span>
          </div>
          <p className="mt-1 line-clamp-2 min-h-11 text-sm text-[var(--muted-foreground)]">
            {product.description}
          </p>
          <div className="mt-2 min-h-6">
            <div className="flex flex-wrap gap-1">
              {product.tags.slice(0, 2).map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-[var(--border)] bg-[var(--muted)] px-2 py-0.5 text-[11px] text-[var(--muted-foreground)]"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
          <div className="mt-3 flex items-center justify-between">
            <div>
              <Price value={product.price} />
              {product.oldPrice ? (
                <p className="text-xs text-[var(--muted-foreground)] line-through">
                  {formatCurrency(product.oldPrice, locale)}
                </p>
              ) : null}
            </div>
            <span className={`text-xs ${product.inStock ? "text-emerald-600" : "text-rose-500"}`}>
              {product.inStock ? t("inStock", { count: product.stockCount }) : t("outOfStock")}
            </span>
          </div>
        </div>
        <div className="mt-auto pt-4">
          <div className="rounded-xl border border-[var(--border)] bg-[var(--muted)] px-3 py-2 text-xs text-[var(--foreground)]">
            <Sparkles className="mr-1 inline h-3.5 w-3.5 text-[var(--accent)]" aria-hidden />
            {t("eta", { days: product.etaDays })}
          </div>
          <div className="mt-3 flex items-end gap-2">
            <Button
              className="flex-1"
              variant={added ? "soft" : "primary"}
              disabled={!product.inStock}
              onClick={handleAdd}
              aria-label={t("addAria", { name: product.name })}
            >
              {added ? (
                <>
                  <Check className="mr-1 h-4 w-4" /> {t("added")}
                </>
              ) : (
                t("addToCart")
              )}
            </Button>
            <Link
              href={`/products/${product.slug}`}
              className="inline-flex h-10 items-center rounded-xl border border-[var(--border)] bg-[var(--card)] px-4 text-sm text-[var(--foreground)] transition-colors duration-200 hover:bg-[var(--muted)] active:brightness-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)]"
            >
              {t("details")}
            </Link>
          </div>
        </div>
      </div>
    </motion.article>
  );
}
