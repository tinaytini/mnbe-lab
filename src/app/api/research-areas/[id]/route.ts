import { db } from "@/db";
import { researchAreas } from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";
import { requireAdminAuth } from "@/lib/admin-auth";

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
        const unauthorized = requireAdminAuth(req);
        if (unauthorized) return unauthorized;

        const { id } = await params;
        const body = await req.json();
        const [row] = await db.update(researchAreas).set({ ...(body.photoUrl !== undefined && { photoUrl: body.photoUrl }), title: body.title, description: body.description }).where(eq(researchAreas.id, Number(id))).returning();
        if (!row) return NextResponse.json({ error: "Not found" }, { status: 404 });
        return NextResponse.json(row);
    } catch (err) {
        console.error(err);
        return NextResponse.json({ error: "Failed to update" }, { status: 500 });
    }
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
        const unauthorized = requireAdminAuth(_req);
        if (unauthorized) return unauthorized;

        const { id } = await params;
        await db.delete(researchAreas).where(eq(researchAreas.id, Number(id)));
        return NextResponse.json({ success: true });
    } catch (err) {
        console.error(err);
        return NextResponse.json({ error: "Failed to delete" }, { status: 500 });
    }
}
