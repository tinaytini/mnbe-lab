import { db } from "@/db";
import { publications } from "@/db/schema";
import { desc, eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";
import { requireAdminAuth } from "@/lib/admin-auth";

// GET /api/publications — list all
export async function GET() {
    try {
        const rows = await db.select().from(publications).orderBy(desc(publications.createdAt));
        return NextResponse.json(rows);
    } catch (err) {
        console.error(err);
        return NextResponse.json({ error: "Failed to fetch publications" }, { status: 500 });
    }
}

// POST /api/publications — create
export async function POST(req: NextRequest) {
    try {
        const unauthorized = requireAdminAuth(req);
        if (unauthorized) return unauthorized;

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
