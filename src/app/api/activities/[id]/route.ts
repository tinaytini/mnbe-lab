import { db } from "@/db";
import { groupActivities } from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        const body = await req.json();
        const [row] = await db.update(groupActivities).set({
            title: body.title,
            date: body.date,
            description: body.description,
            category: body.category,
            emoji: body.emoji,
            ...(body.photoUrl !== undefined && { photoUrl: body.photoUrl }),
        }).where(eq(groupActivities.id, Number(id))).returning();
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
        await db.delete(groupActivities).where(eq(groupActivities.id, Number(id)));
        return NextResponse.json({ success: true });
    } catch (err) {
        console.error(err);
        return NextResponse.json({ error: "Failed to delete" }, { status: 500 });
    }
}
