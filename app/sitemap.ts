import type { MetadataRoute } from "next";
import { navLinks, siteUrl } from "@/lib/kost-data";

export default function sitemap(): MetadataRoute.Sitemap {
  return navLinks.map((link) => ({
    url: link.href === "/" ? siteUrl : `${siteUrl}${link.href}`,
  }));
}