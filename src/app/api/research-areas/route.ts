import { db } from "@/db";
import { researchAreas } from "@/db/schema";
import { NextRequest, NextResponse } from "next/server";
import { desc } from "drizzle-orm";
import { requireAdminAuth } from "@/lib/admin-auth";

export async function GET() {
    try {
        const rows = await db.select().from(researchAreas).orderBy(desc(researchAreas.createdAt));
        return NextResponse.json(rows);
    } catch (err) {
        console.error(err);
        return NextResponse.json({ error: "Failed to fetch research areas" }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    try {
        const unauthorized = requireAdminAuth(req);
        if (unauthorized) return unauthorized;

        const body = await req.json();
        const [row] = await db.insert(researchAreas).values({ photoUrl: body.photoUrl ?? null, title: body.title, description: body.description }).returning();
        return NextResponse.json(row, { status: 201 });
    } catch (err) {
        console.error(err);
        return NextResponse.json({ error: "Failed to create research area" }, { status: 500 });
    }
}
