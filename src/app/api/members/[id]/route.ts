import { db } from "@/db";
import { members } from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        const body = await req.json();
        const [row] = await db.update(members).set({ name: body.name, role: body.role, focus: body.focus, email: body.email || null, originCountry: body.originCountry || null, biography: body.biography || null, ...(body.photoUrl !== undefined && { photoUrl: body.photoUrl }) }).where(eq(members.id, Number(id))).returning();
        if (!row) return NextResponse.json({ error: "Not found" }, { status: 404 });
        return NextResponse.json(row);
    } catch (err) {
        console.error(err);
        return NextResponse.json({ error: "Failed to update" }, { status: 500 });
    }
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        await db.delete(members).where(eq(members.id, Number(id)));
        return NextResponse.json({ success: true });
    } catch (err) {
        console.error(err);
        return NextResponse.json({ error: "Failed to delete" }, { status: 500 });
    }
}
