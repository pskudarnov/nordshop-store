import type { MetadataRoute } from "next";
import { products } from "@/data/products";
import { setupDefinitions } from "@/data/setups";

const base = "https://nordshop.pavel-skudarnov.ru";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRu = ["/", "/products"];
  const staticEn = ["/en", "/en/products"];
  const setupRoutes = setupDefinitions.map((setup) => setup.slug);

  return [
    ...staticRu.map((path, index) => ({ url: `${base}${path}`, changeFrequency: "weekly" as const, priority: index === 0 ? 1 : 0.9 })),
    ...staticEn.map((path, index) => ({ url: `${base}${path}`, changeFrequency: "weekly" as const, priority: index === 0 ? 0.9 : 0.8 })),
    ...setupRoutes.flatMap((slug) => ([
      { url: `${base}/setups/${slug}`, changeFrequency: "weekly" as const, priority: 0.82 },
      { url: `${base}/en/setups/${slug}`, changeFrequency: "weekly" as const, priority: 0.72 }
    ])),
    ...products.flatMap((product) => ([
      { url: `${base}/products/${product.slug}`, changeFrequency: "weekly" as const, priority: 0.8 },
      { url: `${base}/en/products/${product.slug}`, changeFrequency: "weekly" as const, priority: 0.7 }
    ]))
  ];
}
