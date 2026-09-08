import { db } from "@/db";
import { facilities } from "@/db/schema";
import { NextRequest, NextResponse } from "next/server";
import { desc } from "drizzle-orm";
import { requireAdminAuth } from "@/lib/admin-auth";
import { revalidatePath } from "next/cache";

export async function GET() {
    try {
        const rows = await db.select().from(facilities).orderBy(desc(facilities.createdAt));
        return NextResponse.json(rows);
    } catch (err) {
        console.error(err);
        return NextResponse.json({ error: "Failed to fetch facilities" }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    try {
        const unauthorized = await requireAdminAuth(req);
        if (unauthorized) return unauthorized;

        const body = await req.json();
        const [row] = await db
            .insert(facilities)
            .values({
                title: body.title,
                description: body.description,
                specs: body.specs || null,
                photoUrl: body.photoUrl ?? null,
            })
            .returning();
        revalidatePath("/facilities");
        return NextResponse.json(row, { status: 201 });
    } catch (err) {
        console.error(err);
        return NextResponse.json({ error: "Failed to create facility" }, { status: 500 });
    }
}
