import type { Metadata } from "next";
import { getLocale, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { ChevronRight } from "lucide-react";
import { ProductDetails } from "@/components/products/ProductDetails";
import { ProductGrid } from "@/components/products/ProductGrid";
import { getProductBySlug, getRelatedProducts } from "@/lib/products";
import { notFound } from "next/navigation";
import { localizeProduct, localizeProducts } from "@/lib/product-i18n";
import type { AppLocale } from "@/lib/i18n";

const siteUrl = "https://nordshop.pavel-skudarnov.ru";

function urlFor(locale: AppLocale, path: string) {
  if (locale === "en") return `${siteUrl}/en${path}`;
  return `${siteUrl}${path}`;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const locale = (await getLocale()) as AppLocale;
  const t = await getTranslations("meta");
  const product = getProductBySlug(slug);
  if (!product)
    return { title: t("productFallbackTitle"), description: t("productFallbackDescription") };
  const localized = localizeProduct(product, locale);
  const path = `/products/${slug}`;
  return {
    title: `${localized.name} | NordShop`,
    description: localized.description,
    alternates: {
      canonical: urlFor(locale, path),
      languages: {
        ru: urlFor("ru", path),
        en: urlFor("en", path),
        "x-default": urlFor("ru", path),
      },
    },
    openGraph: {
      title: `${localized.name} | NordShop`,
      description: localized.description,
      url: urlFor(locale, path),
    },
  };
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const locale = (await getLocale()) as AppLocale;
  const t = await getTranslations("productDetails");
  const tc = await getTranslations("common");
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  const localized = localizeProduct(product, locale);
  const related = localizeProducts(getRelatedProducts(product.slug, product.category), locale);

  return (
    <section className="py-10">
      <nav className="mb-5 flex items-center gap-1 text-sm text-[var(--muted-foreground)]">
        <Link href="/" className="hover:text-[var(--foreground)]">
          {tc("home")}
        </Link>
        <ChevronRight className="h-4 w-4" />
        <Link href="/products" className="hover:text-[var(--foreground)]">
          {tc("products")}
        </Link>
        <ChevronRight className="h-4 w-4" />
        <span className="text-[var(--foreground)]">{localized.name}</span>
      </nav>

      <ProductDetails product={localized} />

      <div className="mt-10 rounded-2xl border border-[var(--border)] bg-[var(--card)] p-5">
        <h2 className="text-xl font-semibold text-[var(--foreground)]">{t("reviewsTitle")}</h2>
        <div className="mt-4 grid gap-3 text-sm text-[var(--muted-foreground)] md:grid-cols-2">
          {localized.reviews.map((review) => (
            <article
              key={review.author}
              className="rounded-xl border border-[var(--border)] bg-[var(--muted)] p-3 text-[var(--foreground)]"
            >
              <p>“{review.comment}”</p>
              <p className="mt-2 text-xs text-[var(--muted-foreground)]">
                {t("reviewMeta", {
                  author: review.author,
                  role: review.role,
                  rating: review.rating,
                  date: review.date,
                })}
              </p>
            </article>
          ))}
        </div>
      </div>

      <div className="mt-12">
        <h2 className="mb-4 text-2xl font-semibold text-[var(--foreground)]">
          {t("relatedTitle")}
        </h2>
        <ProductGrid products={related} />
      </div>
      <div className="mt-8">
        <Link className="text-sm text-[var(--accent)] hover:underline" href="/products">
          {t("breadcrumbsBack")}
        </Link>
      </div>
    </section>
  );
}
