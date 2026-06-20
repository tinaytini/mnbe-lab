import { NextRequest, NextResponse } from "next/server";

export const ADMIN_COOKIE_NAME = "mnbe_admin_session";

function fallback(value: string | undefined, devValue: string) {
    if (value) return value;
    return process.env.NODE_ENV === "production" ? undefined : devValue;
}

export function getAdminPassword() {
    return fallback(process.env.ADMIN_PASSWORD, "admin123");
}

export function getAdminSessionToken() {
    return fallback(process.env.ADMIN_SESSION_TOKEN, "dev-admin-session");
}

export function isAdminRequest(req: NextRequest) {
    const sessionToken = getAdminSessionToken();
    if (!sessionToken) return false;

    return req.cookies.get(ADMIN_COOKIE_NAME)?.value === sessionToken;
}

export function requireAdminAuth(req: NextRequest) {
    if (isAdminRequest(req)) return null;

    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
}
