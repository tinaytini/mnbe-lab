import { db } from "@/db";
import { publications } from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";
import { requireAdminAuth } from "@/lib/admin-auth";

// PUT /api/publications/[id] — update
export async function PUT(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const unauthorized = requireAdminAuth(req);
        if (unauthorized) return unauthorized;

        const { id } = await params;
        const body = await req.json();
        const [row] = await db
            .update(publications)
            .set({
                year: body.year,
                title: body.title,
                authors: body.authors,
                journal: body.journal,
                url: body.url || null,
                description: body.description || null,
            })
            .where(eq(publications.id, Number(id)))
            .returning();
        if (!row) return NextResponse.json({ error: "Not found" }, { status: 404 });
        return NextResponse.json(row);
    } catch (err) {
        console.error(err);
        return NextResponse.json({ error: "Failed to update publication" }, { status: 500 });
    }
}

// DELETE /api/publications/[id] — delete
export async function DELETE(
    _req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const unauthorized = requireAdminAuth(_req);
        if (unauthorized) return unauthorized;

        const { id } = await params;
        await db.delete(publications).where(eq(publications.id, Number(id)));
        return NextResponse.json({ success: true });
    } catch (err) {
        console.error(err);
        return NextResponse.json({ error: "Failed to delete publication" }, { status: 500 });
    }
}
