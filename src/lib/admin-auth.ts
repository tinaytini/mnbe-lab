import { NextRequest, NextResponse } from "next/server";
import { randomBytes } from "crypto";
import { db } from "@/db";
import { adminSessions } from "@/db/schema";
import { eq, lt } from "drizzle-orm";

export const ADMIN_COOKIE_NAME = "mnbe_admin_session";

const SESSION_TTL_MS = 7 * 24 * 60 * 60 * 1000; // 7 days

function fallback(value: string | undefined, devValue: string) {
    if (value) return value;
    return process.env.NODE_ENV === "production" ? undefined : devValue;
}

export function getAdminPassword() {
    return fallback(process.env.ADMIN_PASSWORD, "admin123");
}

/** Creates a random per-login session, persisted in the DB, and returns its token. */
export async function createAdminSession(): Promise<string> {
    const token = randomBytes(32).toString("hex");
    const expiresAt = new Date(Date.now() + SESSION_TTL_MS);
    await db.insert(adminSessions).values({ token, expiresAt });
    // Best-effort cleanup of expired sessions so the table doesn't grow forever.
    db.delete(adminSessions).where(lt(adminSessions.expiresAt, new Date())).catch(() => { });
    return token;
}

/** Revokes a single session (used on logout) without affecting any other logged-in session. */
export async function revokeAdminSession(token: string | undefined) {
    if (!token) return;
    await db.delete(adminSessions).where(eq(adminSessions.token, token));
}

export async function isAdminRequest(req: NextRequest): Promise<boolean> {
    const token = req.cookies.get(ADMIN_COOKIE_NAME)?.value;
    if (!token) return false;

    const [session] = await db.select().from(adminSessions).where(eq(adminSessions.token, token)).limit(1);
    if (!session) return false;

    if (session.expiresAt.getTime() < Date.now()) {
        await db.delete(adminSessions).where(eq(adminSessions.token, token));
        return false;
    }
    return true;
}

export async function requireAdminAuth(req: NextRequest) {
    if (await isAdminRequest(req)) return null;

    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
}

// ─── Basic login rate limiting ──────────────────────────────────────────────
// In-memory, best-effort: resets on server restart / doesn't share state across
// serverless instances, but still meaningfully slows down naive brute-forcing
// within a single running process.

const LOGIN_WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const MAX_ATTEMPTS = 5;
const attempts = new Map<string, { count: number; windowStart: number }>();

export function getClientIp(req: NextRequest): string {
    const forwarded = req.headers.get("x-forwarded-for");
    if (forwarded) return forwarded.split(",")[0].trim();
    return req.headers.get("x-real-ip") ?? "unknown";
}

/** Returns true if this IP has exceeded the login attempt limit for the current window. */
export function isLoginRateLimited(ip: string): boolean {
    const entry = attempts.get(ip);
    if (!entry) return false;
    if (Date.now() - entry.windowStart > LOGIN_WINDOW_MS) {
        attempts.delete(ip);
        return false;
    }
    return entry.count >= MAX_ATTEMPTS;
}

export function recordFailedLogin(ip: string) {
    const entry = attempts.get(ip);
    if (!entry || Date.now() - entry.windowStart > LOGIN_WINDOW_MS) {
        attempts.set(ip, { count: 1, windowStart: Date.now() });
    } else {
        entry.count += 1;
    }
}

export function clearLoginAttempts(ip: string) {
    attempts.delete(ip);
}
