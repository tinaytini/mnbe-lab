import { db } from "@/db";
import { members } from "@/db/schema";
import { NextRequest, NextResponse } from "next/server";
import { desc } from "drizzle-orm";

export async function GET() {
    try {
        const rows = await db.select().from(members).orderBy(desc(members.createdAt));
        return NextResponse.json(rows);
    } catch (err) {
        console.error(err);
        return NextResponse.json({ error: "Failed to fetch members" }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const [row] = await db.insert(members).values({ name: body.name, role: body.role, focus: body.focus, email: body.email || null, originCountry: body.originCountry || null, biography: body.biography || null, photoUrl: body.photoUrl ?? null }).returning();
        return NextResponse.json(row, { status: 201 });
    } catch (err) {
        console.error(err);
        return NextResponse.json({ error: "Failed to create member" }, { status: 500 });
    }
}
