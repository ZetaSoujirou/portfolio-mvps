import { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = siteConfig.siteUrl;

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/gracias"],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
