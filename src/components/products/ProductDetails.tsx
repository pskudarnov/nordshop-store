"use client";

import { useLocale, useTranslations } from "next-intl";
import { ShieldCheck, Truck, RotateCcw, CheckCircle2, CreditCard } from "lucide-react";
import { motion } from "framer-motion";
import type { Product } from "@/data/products";
import { Button } from "@/components/ui/Button";
import { Price } from "@/components/ui/Price";
import { QuantityStepper } from "@/components/ui/QuantityStepper";
import { ProductGallery } from "@/components/products/ProductGallery";
import { useCartStore } from "@/store/cart-store";
import { useUiStore } from "@/store/ui-store";
import { useMemo, useState } from "react";

export function ProductDetails({ product }: { product: Product }) {
  const t = useTranslations("productDetails");
  const locale = useLocale();
  const [qty, setQty] = useState(1);
  const [open, setOpen] = useState("specs");
  const addToCart = useCartStore((s) => s.addToCart);
  const pushToast = useUiStore((s) => s.pushToast);

  const etaLabel = useMemo(() => {
    const date = new Date();
    date.setDate(date.getDate() + product.etaDays);
    return date.toLocaleDateString(locale === "ru" ? "ru-RU" : "en-GB", {
      day: "2-digit",
      month: "short",
    });
  }, [product.etaDays, locale]);

  const handleAdd = () => {
    addToCart(product.id, qty);
    pushToast({ type: "success", title: `${qty} × ${product.name}`, message: t("addToCart") });
  };

  return (
    <section className="grid gap-8 lg:grid-cols-[1.05fr_1fr] lg:gap-10">
      <ProductGallery images={product.gallery} name={product.name} />
      <div className="space-y-4 lg:sticky lg:top-24 lg:self-start">
        <div className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-6 text-[var(--card-foreground)] shadow-[var(--shadow-soft)]">
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <span className="rounded-full border border-[var(--border)] bg-[var(--muted)] px-2 py-1 text-[var(--foreground)]">
              {product.inStock ? t("inStock", { count: product.stockCount }) : t("outOfStock")}
            </span>
            <span className="rounded-full border border-[var(--border)] bg-[var(--muted)] px-2 py-1 text-[var(--muted-foreground)]">
              {product.category}
            </span>
            {product.badges.map((badge) => (
              <span
                key={badge}
                className="rounded-full border border-[var(--border)] bg-[color-mix(in_srgb,var(--accent)_16%,var(--muted))] px-2 py-1 text-[var(--foreground)]"
              >
                {badge}
              </span>
            ))}
          </div>
          <h1 className="mt-4 text-3xl font-semibold leading-[1.12] tracking-tight text-[var(--foreground)]">
            {product.name}
          </h1>
          <p className="mt-3 text-[15px] leading-[1.62] text-[var(--muted-foreground)]">
            {product.longDescription}
          </p>

          <div className="mt-5 flex items-end justify-between border-y border-[var(--border)] py-4">
            <div>
              <p className="text-[11px] uppercase tracking-[0.12em] text-[var(--muted-foreground)]">
                {t("price")}
              </p>
              <Price value={product.price} />
            </div>
            <p className="text-xs text-[var(--muted-foreground)]">
              {t("arrivesBy", { date: etaLabel })}
            </p>
          </div>

          <ul className="mt-5 space-y-2 text-sm text-[var(--foreground)]">
            {product.features.map((feature) => (
              <li key={feature} className="flex items-start gap-2">
                <CheckCircle2 className="mt-0.5 h-4 w-4 text-[color:#9a7b3a]" />
                {feature}
              </li>
            ))}
          </ul>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <QuantityStepper
              value={qty}
              onMinus={() => setQty((v) => Math.max(1, v - 1))}
              onPlus={() => setQty((v) => v + 1)}
            />
            <Button disabled={!product.inStock} onClick={handleAdd} className="min-w-44">
              {t("addToCart")}
            </Button>
          </div>

          <div className="mt-6 grid gap-2 text-xs text-[var(--muted-foreground)] sm:grid-cols-3">
            <p className="flex items-center gap-1.5 rounded-lg border border-[var(--border)] bg-[var(--muted)] px-2.5 py-2">
              <Truck className="h-3.5 w-3.5" /> {t("fastShipping")}
            </p>
            <p className="flex items-center gap-1.5 rounded-lg border border-[var(--border)] bg-[var(--muted)] px-2.5 py-2">
              <RotateCcw className="h-3.5 w-3.5" /> {t("returns")}
            </p>
            <p className="flex items-center gap-1.5 rounded-lg border border-[var(--border)] bg-[var(--muted)] px-2.5 py-2">
              <ShieldCheck className="h-3.5 w-3.5" /> {t("warrantyIncluded")}
            </p>
          </div>

          <div className="mt-4 rounded-xl border border-[var(--border)] bg-[color-mix(in_srgb,var(--accent)_12%,var(--muted))] p-3 text-xs text-[var(--foreground)]">
            <CreditCard className="mr-1 inline h-3.5 w-3.5" /> {t("securePayments")}
          </div>
        </div>

        {[
          {
            key: "specs",
            title: t("specs"),
            content: (
              <ul className="space-y-1 text-sm text-[var(--foreground)]">
                {product.specifications.map((s) => (
                  <li key={s.label} className="flex justify-between gap-3">
                    <span className="text-[var(--muted-foreground)]">{s.label}</span>
                    <span>{s.value}</span>
                  </li>
                ))}
              </ul>
            ),
          },
          {
            key: "shipping",
            title: t("shipping"),
            content: (
              <ul className="list-disc pl-5 text-sm text-[var(--foreground)]">
                {product.shippingInfo.map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ul>
            ),
          },
          {
            key: "warranty",
            title: t("warranty"),
            content: (
              <ul className="list-disc pl-5 text-sm text-[var(--foreground)]">
                {product.warrantyInfo.map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ul>
            ),
          },
        ].map((section) => (
          <div
            key={section.key}
            className="overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--card)] text-[var(--card-foreground)] shadow-[var(--shadow-soft)]"
          >
            <button
              type="button"
              id={`pdp-acc-trigger-${section.key}`}
              onClick={() => setOpen(open === section.key ? "" : section.key)}
              className="flex w-full items-center justify-between px-4 py-3 text-left text-[15px] font-medium leading-[1.35] transition-colors duration-200 hover:bg-[var(--muted)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)]"
              aria-expanded={open === section.key}
              aria-controls={`pdp-acc-panel-${section.key}`}
            >
              {section.title}
              <span aria-hidden>{open === section.key ? "−" : "+"}</span>
            </button>
            <motion.div
              id={`pdp-acc-panel-${section.key}`}
              role="region"
              aria-labelledby={`pdp-acc-trigger-${section.key}`}
              initial={false}
              animate={{
                height: open === section.key ? "auto" : 0,
                opacity: open === section.key ? 1 : 0,
              }}
              transition={{ duration: 0.24 }}
              className="overflow-hidden px-4"
            >
              <div className="pb-4">{section.content}</div>
            </motion.div>
          </div>
        ))}
      </div>
    </section>
  );
}
