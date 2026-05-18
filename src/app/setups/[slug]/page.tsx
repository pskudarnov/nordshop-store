import type {Metadata} from 'next';
import {getLocale} from 'next-intl/server';
import {notFound} from 'next/navigation';
import {ArrowUpRight, ChevronRight} from 'lucide-react';
import {ProductImage} from '@/components/products/ProductImage';
import {Link} from '@/i18n/navigation';
import {getProductBySlug} from '@/lib/products';
import {localizeProduct} from '@/lib/product-i18n';
import {getSetupBySlug} from '@/data/setups';
import {formatCurrency} from '@/lib/currency';
import type {AppLocale} from '@/lib/i18n';

const siteUrl = 'https://nordshop.pavel-skudarnov.ru';

const routeLabels = {
  en: {
    home: 'Home',
    setups: 'Setups',
    shopSetup: 'Shop this setup',
    setupBreakdown: 'Full setup breakdown',
    atmosphereTitle: 'What this setup feels like',
    metricsTitle: 'Real-world setup metrics',
    galleryTitle: 'Workspace gallery',
    relatedTitle: 'Explore other setups',
    ctaButton: 'Browse all products',
    viewProduct: 'View product'
  },
  ru: {
    home: 'Главная',
    setups: 'Сетапы',
    shopSetup: 'К товарам этого сетапа',
    setupBreakdown: 'Полный разбор сетапа',
    atmosphereTitle: 'Что ощущается в этом сетапе',
    metricsTitle: 'Реалистичные метрики рабочего места',
    galleryTitle: 'Галерея рабочего пространства',
    relatedTitle: 'Исследуйте другие сетапы',
    ctaButton: 'Смотреть все товары',
    viewProduct: 'Открыть товар'
  }
} as const;

function toAbsolute(locale: AppLocale, path: string) {
  return locale === 'en' ? `${siteUrl}/en${path}` : `${siteUrl}${path}`;
}

export async function generateMetadata({params}: {params: Promise<{slug: string}>}): Promise<Metadata> {
  const {slug} = await params;
  const locale = (await getLocale()) as AppLocale;
  const setup = getSetupBySlug(slug);
  if (!setup) {
    return {
      title: locale === 'ru' ? 'Сетап не найден | NordShop' : 'Setup not found | NordShop',
      description: locale === 'ru' ? 'Запрошенный сетап недоступен.' : 'Requested setup is unavailable.'
    };
  }

  const content = setup.translations[locale];
  const path = `/setups/${setup.slug}`;

  return {
    title: `${content.title} | NordShop`,
    description: content.description,
    alternates: {
      canonical: toAbsolute(locale, path),
      languages: {
        ru: toAbsolute('ru', path),
        en: toAbsolute('en', path),
        'x-default': toAbsolute('ru', path)
      }
    },
    openGraph: {
      title: `${content.title} | NordShop`,
      description: content.description,
      url: toAbsolute(locale, path),
      images: [{url: content.heroImage, width: 1200, height: 900, alt: content.heroAlt}]
    },
    twitter: {
      card: 'summary_large_image',
      title: `${content.title} | NordShop`,
      description: content.description,
      images: [content.heroImage]
    }
  };
}

export default async function SetupDetailPage({params}: {params: Promise<{slug: string}>}) {
  const locale = (await getLocale()) as AppLocale;
  const {slug} = await params;
  const setup = getSetupBySlug(slug);
  if (!setup) notFound();

  const content = setup.translations[locale];
  const labels = routeLabels[locale];

  const gear = content.gear
    .map((item) => {
      const product = getProductBySlug(item.productSlug);
      if (!product) return null;
      return {
        role: item.role,
        note: item.note,
        product: localizeProduct(product, locale)
      };
    })
    .filter((item): item is NonNullable<typeof item> => item !== null);

  const relatedSetups = ['developer-station', 'creator-desk', 'minimal-focus', 'audio-corner']
    .filter((itemSlug) => itemSlug !== setup.slug)
    .map((itemSlug) => getSetupBySlug(itemSlug))
    .filter((item): item is NonNullable<typeof item> => item !== null)
    .map((item) => ({slug: item.slug, content: item.translations[locale]}));

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: content.title,
    description: content.description,
    url: toAbsolute(locale, `/setups/${setup.slug}`),
    inLanguage: locale,
    isPartOf: {
      '@type': 'WebSite',
      name: 'NordShop',
      url: siteUrl
    }
  };

  return (
    <section className="py-8 sm:py-10">
      <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify(jsonLd)}} />

      <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-1 text-sm text-[var(--muted-foreground)]">
        <Link href="/" className="hover:text-[var(--foreground)]">{labels.home}</Link>
        <ChevronRight className="h-4 w-4" />
        <span>{labels.setups}</span>
        <ChevronRight className="h-4 w-4" />
        <span className="text-[var(--foreground)]">{content.title}</span>
      </nav>

      <header className="relative overflow-hidden rounded-3xl border border-[var(--border)] bg-[linear-gradient(140deg,color-mix(in_srgb,var(--accent)_15%,transparent),color-mix(in_srgb,var(--card)_85%,var(--muted)))] p-5 sm:p-8">
        <div className="absolute -right-16 -top-12 h-44 w-44 rounded-full bg-[color-mix(in_srgb,var(--accent)_22%,transparent)] blur-3xl" aria-hidden="true" />
        <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div>
            <p className="text-xs uppercase tracking-[0.16em] text-[var(--muted-foreground)]">NordShop Setup</p>
            <h1 className="mt-3 text-3xl font-semibold tracking-tight text-[var(--foreground)] sm:text-4xl">{content.title}</h1>
            <p className="mt-3 max-w-2xl text-base text-[var(--muted-foreground)] sm:text-lg">{content.subtitle}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {content.tags.map((tag) => (
                <span key={tag} className="rounded-full border border-[var(--border)] bg-[color-mix(in_srgb,var(--card)_85%,var(--muted))] px-3 py-1 text-xs font-medium text-[var(--foreground)]">
                  {tag}
                </span>
              ))}
            </div>
            <div className="mt-6">
              <Link
                href="#setup-breakdown"
                className="inline-flex items-center gap-2 rounded-xl border border-[var(--border)] bg-[var(--card)] px-4 py-2.5 text-sm font-medium text-[var(--foreground)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[var(--muted)]"
              >
                {labels.shopSetup}
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--muted)]">
            <ProductImage src={content.heroImage} alt={content.heroAlt} fill className="object-cover transition-transform duration-500 hover:scale-[1.03]" priority sizes="(max-width: 1024px) 100vw, 50vw" />
          </div>
        </div>
      </header>

      <section className="mt-8 grid gap-4 lg:grid-cols-[1.35fr_0.65fr]">
        <article className="surface-card rounded-3xl p-5 sm:p-6">
          <h2 className="text-2xl font-semibold tracking-tight text-[var(--foreground)]">{content.storyTitle}</h2>
          <div className="mt-4 space-y-3 text-[15px] leading-relaxed text-[var(--muted-foreground)]">
            {content.story.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </article>
        <aside className="space-y-4">
          <article className="surface-card rounded-2xl p-5">
            <h3 className="text-lg font-semibold text-[var(--foreground)]">{content.audienceTitle}</h3>
            <p className="mt-2 text-sm text-[var(--muted-foreground)]">{content.audience}</p>
          </article>
          <article className="surface-card rounded-2xl p-5">
            <h3 className="text-lg font-semibold text-[var(--foreground)]">{content.philosophyTitle}</h3>
            <p className="mt-2 text-sm text-[var(--muted-foreground)]">{content.philosophy}</p>
          </article>
        </aside>
      </section>

      <section id="setup-breakdown" className="mt-9">
        <h2 className="text-2xl font-semibold tracking-tight text-[var(--foreground)]">{labels.setupBreakdown}</h2>
        <div className="mt-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {gear.map((item) => (
            <article key={`${item.role}-${item.product.slug}`} className="group flex h-full flex-col overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--card)] shadow-[var(--shadow-soft)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[var(--shadow-soft-lg)]">
              <div className="relative aspect-[4/3] overflow-hidden border-b border-[var(--border)] bg-[var(--muted)]">
                <ProductImage src={item.product.image} alt={`${item.product.name} ${item.role}`} fill className="object-cover transition-transform duration-500 group-hover:scale-[1.04]" sizes="(max-width: 768px) 100vw, 33vw" loading="lazy" />
              </div>
              <div className="flex flex-1 flex-col p-4">
                <p className="text-[11px] uppercase tracking-[0.14em] text-[var(--muted-foreground)]">{item.role}</p>
                <h3 className="mt-2 text-base font-semibold text-[var(--foreground)]">{item.product.name}</h3>
                <p className="mt-2 text-sm text-[var(--muted-foreground)]">{item.note}</p>
                <p className="mt-3 text-sm font-medium text-[var(--foreground)]">{formatCurrency(item.product.price, locale)}</p>
                <Link href={`/products/${item.product.slug}`} className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-[var(--accent)] transition hover:gap-2">
                  {labels.viewProduct}
                  <ChevronRight className="h-4 w-4" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-9 grid gap-4 lg:grid-cols-2">
        <article className="surface-card rounded-2xl p-5 sm:p-6">
          <h2 className="text-2xl font-semibold tracking-tight text-[var(--foreground)]">{labels.atmosphereTitle}</h2>
          <ul className="mt-4 space-y-2 text-sm text-[var(--muted-foreground)]">
            {content.atmosphere.map((line) => (
              <li key={line} className="flex items-start gap-2">
                <span aria-hidden="true" className="mt-1.5 h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />
                <span>{line}</span>
              </li>
            ))}
          </ul>
        </article>

        <article className="surface-card rounded-2xl p-5 sm:p-6">
          <h2 className="text-2xl font-semibold tracking-tight text-[var(--foreground)]">{labels.metricsTitle}</h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {content.metrics.map((metric) => (
              <div key={metric.label} className="rounded-xl border border-[var(--border)] bg-[var(--muted)] p-3">
                <p className="text-xs uppercase tracking-[0.12em] text-[var(--muted-foreground)]">{metric.label}</p>
                <p className="mt-1 text-lg font-semibold text-[var(--foreground)]">{metric.value}</p>
                <p className="mt-1 text-xs text-[var(--muted-foreground)]">{metric.note}</p>
              </div>
            ))}
          </div>
        </article>
      </section>

      <section className="mt-9">
        <h2 className="text-2xl font-semibold tracking-tight text-[var(--foreground)]">{labels.galleryTitle}</h2>
        <div className="mt-5 grid grid-cols-2 gap-3 md:grid-cols-4">
          {content.gallery.map((image) => (
            <figure key={image.src} className="group relative aspect-[4/3] overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--muted)]">
              <ProductImage src={image.src} alt={image.alt} fill className="object-cover transition-transform duration-500 group-hover:scale-[1.05]" sizes="(max-width: 768px) 50vw, 25vw" loading="lazy" />
            </figure>
          ))}
        </div>
      </section>

      <section className="mt-10">
        <h2 className="text-2xl font-semibold tracking-tight text-[var(--foreground)]">{labels.relatedTitle}</h2>
        <div className="mt-5 grid gap-4 md:grid-cols-3">
          {relatedSetups.map((item) => (
            <Link key={item.slug} href={`/setups/${item.slug}`} className="group overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--card)] shadow-[var(--shadow-soft)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[var(--shadow-soft-lg)]">
              <div className="relative aspect-[4/3] border-b border-[var(--border)] bg-[var(--muted)]">
                <ProductImage src={item.content.heroImage} alt={item.content.heroAlt} fill className="object-cover transition-transform duration-500 group-hover:scale-[1.04]" sizes="(max-width: 768px) 100vw, 33vw" loading="lazy" />
              </div>
              <div className="p-4">
                <h3 className="text-base font-semibold text-[var(--foreground)]">{item.content.title}</h3>
                <p className="mt-2 text-sm text-[var(--muted-foreground)]">{item.content.subtitle}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="mt-10 overflow-hidden rounded-3xl border border-[var(--border)] bg-[linear-gradient(145deg,color-mix(in_srgb,var(--muted)_72%,var(--card)),color-mix(in_srgb,var(--accent)_10%,transparent))] px-5 py-8 sm:px-8">
        <h2 className="text-3xl font-semibold tracking-tight text-[var(--foreground)]">{content.ctaTitle}</h2>
        <p className="mt-3 max-w-2xl text-sm text-[var(--muted-foreground)] sm:text-base">{content.ctaText}</p>
        <Link href="/products" className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[var(--primary)] px-4 py-2.5 text-sm font-medium text-[var(--primary-foreground)] shadow-[var(--shadow-soft)] transition-all duration-200 hover:brightness-110 hover:shadow-[var(--shadow-soft-lg)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)] active:brightness-95">
          {labels.ctaButton}
          <ArrowUpRight className="h-4 w-4" />
        </Link>
      </section>
    </section>
  );
}
