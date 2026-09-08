import { db } from "@/db";
import { facilities } from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";
import { requireAdminAuth } from "@/lib/admin-auth";
import { revalidatePath } from "next/cache";

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
        const unauthorized = await requireAdminAuth(req);
        if (unauthorized) return unauthorized;

        const { id } = await params;
        const body = await req.json();
        const [row] = await db
            .update(facilities)
            .set({
                title: body.title,
                description: body.description,
                specs: body.specs || null,
                ...(body.photoUrl !== undefined && { photoUrl: body.photoUrl }),
            })
            .where(eq(facilities.id, Number(id)))
            .returning();
        if (!row) return NextResponse.json({ error: "Not found" }, { status: 404 });
        revalidatePath("/facilities");
        return NextResponse.json(row);
    } catch (err) {
        console.error(err);
        return NextResponse.json({ error: "Failed to update" }, { status: 500 });
    }
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
        const unauthorized = await requireAdminAuth(_req);
        if (unauthorized) return unauthorized;

        const { id } = await params;
        await db.delete(facilities).where(eq(facilities.id, Number(id)));
        revalidatePath("/facilities");
        return NextResponse.json({ success: true });
    } catch (err) {
        console.error(err);
        return NextResponse.json({ error: "Failed to delete" }, { status: 500 });
    }
}
