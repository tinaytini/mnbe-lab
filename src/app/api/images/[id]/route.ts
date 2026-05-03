import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { images } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function GET(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const imageId = parseInt(id, 10);

        if (isNaN(imageId)) {
            return new NextResponse("Invalid image ID", { status: 400 });
        }

        const [image] = await db
            .select()
            .from(images)
            .where(eq(images.id, imageId))
            .limit(1);

        if (!image) {
            return new NextResponse("Image not found", { status: 404 });
        }

        // Decode Base64 string back into binary buffer
        const buffer = Buffer.from(image.data, "base64");

        // Serve with correct mimetype and long cache headers
        return new NextResponse(buffer, {
            headers: {
                "Content-Type": image.mimeType,
                "Cache-Control": "public, max-age=31536000, immutable",
            },
        });
    } catch (err) {
        console.error("Failed to fetch image:", err);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}
