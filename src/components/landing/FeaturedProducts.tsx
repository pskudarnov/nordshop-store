import { useLocale, useTranslations } from "next-intl";
import { products } from "@/data/products";
import { ProductGrid } from "@/components/products/ProductGrid";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { localizeProducts } from "@/lib/product-i18n";
import type { AppLocale } from "@/lib/i18n";

export function FeaturedProducts() {
  const t = useTranslations("landing.featured");
  const locale = useLocale() as AppLocale;
  const localized = localizeProducts(products, locale);
  const featured = localized.filter((p) => p.featured).slice(0, 4);
  const trending = [...localized].sort((a, b) => b.reviewCount - a.reviewCount).slice(0, 3);

  return (
    <Section id="products" className="space-y-12 pt-10">
      <div>
        <SectionHeading title={t("title")} subtitle={t("subtitle")} />
        <ProductGrid products={featured} />
      </div>
      <div>
        <SectionHeading title={t("trendingTitle")} subtitle={t("trendingSubtitle")} />
        <ProductGrid products={trending} />
      </div>
    </Section>
  );
}
