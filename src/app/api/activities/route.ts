import { db } from "@/db";
import { groupActivities } from "@/db/schema";
import { NextRequest, NextResponse } from "next/server";
import { desc } from "drizzle-orm";

export async function GET() {
    try {
        const rows = await db.select().from(groupActivities).orderBy(desc(groupActivities.createdAt));
        return NextResponse.json(rows);
    } catch (err) {
        console.error(err);
        return NextResponse.json({ error: "Failed to fetch activities" }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const [row] = await db.insert(groupActivities).values({
            title: body.title,
            date: body.date,
            description: body.description,
            category: body.category,
            emoji: body.emoji ?? "🎉",
            photoUrl: body.photoUrl ?? null,
        }).returning();
        return NextResponse.json(row, { status: 201 });
    } catch (err) {
        console.error(err);
        return NextResponse.json({ error: "Failed to create activity" }, { status: 500 });
    }
}
