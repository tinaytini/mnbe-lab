import type { MetadataRoute } from "next";
import { getAllMembers, memberHref } from "@/lib/members";
import { absoluteUrl } from "@/lib/site";

// Regenerate hourly so newly added members appear without a redeploy.
export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const now = new Date();

    const staticRoutes: MetadataRoute.Sitemap = [
        { path: "/", priority: 1.0, changeFrequency: "weekly" as const },
        { path: "/people", priority: 0.9, changeFrequency: "weekly" as const },
        { path: "/research", priority: 0.8, changeFrequency: "monthly" as const },
        { path: "/research/biosensing", priority: 0.7, changeFrequency: "monthly" as const },
        { path: "/research/biomechanics", priority: 0.7, changeFrequency: "monthly" as const },
        { path: "/research/bioinspiration", priority: 0.7, changeFrequency: "monthly" as const },
        { path: "/publications", priority: 0.8, changeFrequency: "weekly" as const },
        { path: "/facilities", priority: 0.6, changeFrequency: "monthly" as const },
        { path: "/news", priority: 0.7, changeFrequency: "weekly" as const },
        { path: "/contact", priority: 0.5, changeFrequency: "yearly" as const },
    ].map(({ path, priority, changeFrequency }) => ({
        url: absoluteUrl(path),
        lastModified: now,
        changeFrequency,
        priority,
    }));

    let memberRoutes: MetadataRoute.Sitemap = [];
    try {
        const members = await getAllMembers();
        memberRoutes = members.map((m) => ({
            url: absoluteUrl(memberHref(m)),
            lastModified: m.createdAt ?? now,
            changeFrequency: "monthly",
            priority: 0.8,
            ...(m.photoUrl && { images: [absoluteUrl(m.photoUrl)] }),
        }));
    } catch (err) {
        console.error("sitemap: failed to load members", err);
    }

    return [...staticRoutes, ...memberRoutes];
}
