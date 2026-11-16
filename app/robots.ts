import type { MetadataRoute } from "next";
import { DATA_MASIH_CONTOH, siteUrl } from "@/lib/kost-data";

export default function robots(): MetadataRoute.Robots {
  if (DATA_MASIH_CONTOH) {
    return { rules: { userAgent: "*", disallow: "/" } };
  }
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}