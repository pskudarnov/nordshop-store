import {useTranslations} from 'next-intl';
import type { Product } from "@/data/products";
import { ProductCard } from "@/components/products/ProductCard";
import { Skeleton } from "@/components/ui/Skeleton";

export function ProductGrid({ products, loading = false }: { products: Product[]; loading?: boolean }) {
  const t = useTranslations('productsPage');
  if (loading) {
    return (
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3" aria-label={t('title')}>
        {Array.from({ length: 6 }).map((_, idx) => (
          <div key={idx} className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-4">
            <Skeleton className="shimmer h-48" />
            <Skeleton className="mt-4 h-5 w-2/3" />
            <Skeleton className="mt-2 h-4 w-5/6" />
            <Skeleton className="mt-4 h-9" />
          </div>
        ))}
      </div>
    );
  }

  return <div className="grid auto-rows-fr gap-4 sm:grid-cols-2 lg:grid-cols-3">{products.map((p) => <ProductCard key={p.id} product={p} />)}</div>;
}
