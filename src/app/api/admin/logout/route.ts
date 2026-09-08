import { NextRequest, NextResponse } from "next/server";
import { ADMIN_COOKIE_NAME, revokeAdminSession } from "@/lib/admin-auth";

export async function POST(req: NextRequest) {
    await revokeAdminSession(req.cookies.get(ADMIN_COOKIE_NAME)?.value);

    const response = NextResponse.json({ authenticated: false });
    response.cookies.set({
        name: ADMIN_COOKIE_NAME,
        value: "",
        httpOnly: true,
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
        path: "/",
        maxAge: 0,
    });

    return response;
}
