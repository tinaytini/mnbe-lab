import { db } from "@/db";
import { publications } from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

// GET /api/publications — list all
export async function GET() {
    try {
        const rows = await db.select().from(publications).orderBy(publications.createdAt);
        return NextResponse.json(rows);
    } catch (err) {
        console.error(err);
        return NextResponse.json({ error: "Failed to fetch publications" }, { status: 500 });
    }
}

// POST /api/publications — create
export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const [row] = await db
            .insert(publications)
            .values({
                year: body.year,
                title: body.title,
                authors: body.authors,
                journal: body.journal,
                url: body.url || null,
                description: body.description || null,
            })
            .returning();
        return NextResponse.json(row, { status: 201 });
    } catch (err) {
        console.error(err);
        return NextResponse.json({ error: "Failed to create publication" }, { status: 500 });
    }
}
