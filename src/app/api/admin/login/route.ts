import { NextRequest, NextResponse } from "next/server";
import { ADMIN_COOKIE_NAME, getAdminPassword, getAdminSessionToken } from "@/lib/admin-auth";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const password = String(body?.password ?? "");
        const adminPassword = getAdminPassword();
        const sessionToken = getAdminSessionToken();

        if (!adminPassword || !sessionToken) {
            return NextResponse.json({ error: "Admin auth is not configured" }, { status: 500 });
        }

        if (password !== adminPassword) {
            return NextResponse.json({ error: "Invalid password" }, { status: 401 });
        }

        const response = NextResponse.json({ authenticated: true });
        response.cookies.set({
            name: ADMIN_COOKIE_NAME,
            value: sessionToken,
            httpOnly: true,
            sameSite: "lax",
            secure: process.env.NODE_ENV === "production",
            path: "/",
            maxAge: 60 * 60 * 24 * 7,
        });

        return response;
    } catch (err) {
        console.error(err);
        return NextResponse.json({ error: "Login failed" }, { status: 500 });
    }
}
