import { db } from "@/db";
import { news } from "@/db/schema";
import { NextRequest, NextResponse } from "next/server";
import { desc } from "drizzle-orm";

export async function GET() {
    try {
        const rows = await db.select().from(news).orderBy(desc(news.createdAt));
        return NextResponse.json(rows);
    } catch (err) {
        console.error(err);
        return NextResponse.json({ error: "Failed to fetch news" }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const [row] = await db.insert(news).values({ date: body.date, title: body.title, body: body.body, url: body.url || null, photoUrl: body.photoUrl || null }).returning();
        return NextResponse.json(row, { status: 201 });
    } catch (err) {
        console.error(err);
        return NextResponse.json({ error: "Failed to create news item" }, { status: 500 });
    }
}
