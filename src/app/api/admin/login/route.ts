import { NextRequest, NextResponse } from "next/server";
import {
    ADMIN_COOKIE_NAME,
    clearLoginAttempts,
    createAdminSession,
    getAdminPassword,
    getClientIp,
    isLoginRateLimited,
    recordFailedLogin,
} from "@/lib/admin-auth";

export async function POST(req: NextRequest) {
    try {
        const ip = getClientIp(req);
        if (isLoginRateLimited(ip)) {
            return NextResponse.json(
                { error: "Too many attempts. Try again in a few minutes." },
                { status: 429 }
            );
        }

        const body = await req.json();
        const password = String(body?.password ?? "");
        const adminPassword = getAdminPassword();

        if (!adminPassword) {
            return NextResponse.json({ error: "Admin auth is not configured" }, { status: 500 });
        }

        if (password !== adminPassword) {
            recordFailedLogin(ip);
            return NextResponse.json({ error: "Invalid password" }, { status: 401 });
        }

        clearLoginAttempts(ip);
        const sessionToken = await createAdminSession();

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
