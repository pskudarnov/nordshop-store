"use client";

import { useTranslations } from "next-intl";
import { Trash2 } from "lucide-react";
import type { Product } from "@/data/products";
import { Button } from "@/components/ui/Button";
import { Price } from "@/components/ui/Price";
import { QuantityStepper } from "@/components/ui/QuantityStepper";

type Props = {
  product: Product;
  quantity: number;
  onMinus: () => void;
  onPlus: () => void;
  onRemove: () => void;
};

export function CartItem({ product, quantity, onMinus, onPlus, onRemove }: Props) {
  const t = useTranslations("cartItem");
  return (
    <article className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-4 text-[var(--card-foreground)] shadow-[var(--shadow-soft)] transition duration-200 hover:translate-y-[-1px]">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="font-medium text-[var(--foreground)]">{product.name}</h3>
          <p className="text-sm text-[var(--muted-foreground)]">{product.category}</p>
          <p className="mt-1 text-xs text-[var(--muted-foreground)]">
            {t("unitPrice")}:{" "}
            <span className="font-medium text-[var(--foreground)]">
              <Price value={product.price} />
            </span>
          </p>
        </div>
        <div className="text-right">
          <p className="text-xs uppercase tracking-[0.14em] text-[var(--muted-foreground)]">
            {t("lineTotal")}
          </p>
          <Price value={product.price * quantity} />
        </div>
      </div>
      <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-[var(--border)] pt-3">
        <QuantityStepper value={quantity} onMinus={onMinus} onPlus={onPlus} />
        <Button
          variant="ghost"
          onClick={onRemove}
          aria-label={t("removeAria", { name: product.name })}
          className="gap-1.5"
        >
          <Trash2 className="h-4 w-4" /> {t("remove")}
        </Button>
      </div>
    </article>
  );
}
