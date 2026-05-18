import { products } from "@/data/products";

export const getFeaturedProducts = () => products.filter((p) => p.featured).slice(0, 4);
export const getProductBySlug = (slug: string) => products.find((p) => p.slug === slug);
export const getRelatedProducts = (slug: string, category: string) =>
  products.filter((p) => p.slug !== slug && p.category === category).slice(0, 3);
