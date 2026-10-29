import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { researchPages } from "@/db/schema";
import { eq } from "drizzle-orm";
import { requireAdminAuth } from "@/lib/admin-auth";
import { getDefaultResearchData, ResearchPageSlug } from "@/lib/research-data";

const VALID_SLUGS = new Set<string>(["biosensing", "biomechanics", "bioinspiration"]);

export async function GET(
    _req: NextRequest,
    context: { params: Promise<{ slug: string }> }
) {
    const { slug } = await context.params;
    if (!VALID_SLUGS.has(slug)) {
        return NextResponse.json({ error: "Invalid research page slug" }, { status: 404 });
    }

    try {
        const [row] = await db
            .select()
            .from(researchPages)
            .where(eq(researchPages.slug, slug))
            .limit(1);

        if (row && row.data) {
            const parsed = JSON.parse(row.data);
            return NextResponse.json({
                ...parsed,
                heroTitle: row.title || parsed.heroTitle,
                heroSubtitle: row.heroSubtitle || parsed.heroSubtitle,
                heroImage: row.heroImage || parsed.heroImage,
            });
        }
    } catch {
        // Table not created yet or DB error -> return default content
    }

    return NextResponse.json(getDefaultResearchData(slug as ResearchPageSlug));
}

export async function PUT(
    req: NextRequest,
    context: { params: Promise<{ slug: string }> }
) {
    const unauthorized = await requireAdminAuth(req);
    if (unauthorized) return unauthorized;

    const { slug } = await context.params;
    if (!VALID_SLUGS.has(slug)) {
        return NextResponse.json({ error: "Invalid research page slug" }, { status: 404 });
    }

    try {
        const body = await req.json();
        const heroTitle = body.heroTitle || slug.charAt(0).toUpperCase() + slug.slice(1);
        const heroSubtitle = body.heroSubtitle ?? "";
        const heroImage = body.heroImage ?? "";

        // Check if row exists
        const [existing] = await db
            .select({ id: researchPages.id })
            .from(researchPages)
            .where(eq(researchPages.slug, slug))
            .limit(1);

        if (existing) {
            const [updated] = await db
                .update(researchPages)
                .set({
                    title: heroTitle,
                    heroSubtitle,
                    heroImage,
                    data: JSON.stringify(body),
                    updatedAt: new Date(),
                })
                .where(eq(researchPages.slug, slug))
                .returning();
            return NextResponse.json({ success: true, page: updated });
        } else {
            const [inserted] = await db
                .insert(researchPages)
                .values({
                    slug,
                    title: heroTitle,
                    heroSubtitle,
                    heroImage,
                    data: JSON.stringify(body),
                    updatedAt: new Date(),
                })
                .returning();
            return NextResponse.json({ success: true, page: inserted });
        }
    } catch (err: any) {
        console.error("Failed to update research page:", err);
        return NextResponse.json(
            { error: err?.message || "Failed to save research page. Ensure database schema is pushed." },
            { status: 500 }
        );
    }
}
