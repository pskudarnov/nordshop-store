import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/" }],
    sitemap: "https://nordshop.pavel-skudarnov.ru/sitemap.xml"
  };
}
