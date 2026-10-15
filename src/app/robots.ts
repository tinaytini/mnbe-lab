import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
    return {
        rules: {
            userAgent: "*",
            // Uploaded member photos are served from /api/images, so keep that crawlable.
            allow: ["/", "/api/images/"],
            disallow: ["/admin", "/api/"],
        },
        sitemap: `${SITE_URL}/sitemap.xml`,
        host: SITE_URL,
    };
}
