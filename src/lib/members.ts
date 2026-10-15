import { cache } from "react";
import { asc } from "drizzle-orm";
import { db } from "@/db";
import { members } from "@/db/schema";

export type Member = typeof members.$inferSelect;

/**
 * Converts a name into a URL-friendly slug.
 * "Ajymurat Orozaliev" -> "ajymurat-orozaliev", "José Núñez" -> "jose-nunez"
 */
export function slugify(name: string): string {
    return name
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "") // strip accents
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");
}

export function memberHref(member: Pick<Member, "name">): string {
    return `/people/${slugify(member.name)}`;
}

/** All members, de-duplicated per request via React cache. */
export const getAllMembers = cache(async (): Promise<Member[]> => {
    return db.select().from(members).orderBy(asc(members.createdAt));
});

/** Finds a member by the slug of their name (no DB migration needed). */
export const getMemberBySlug = cache(async (slug: string): Promise<Member | null> => {
    const all = await getAllMembers();
    return all.find((m) => slugify(m.name) === slug) ?? null;
});

export const roleEmoji: Record<string, string> = {
    "Principal Investigator": "👨‍🔬",
    "Senior Researcher": "👩‍🔬",
    "Postdoctoral Fellow": "🧑‍🔬",
    "PhD Candidate": "👩‍🎓",
    "MSc Student": "🧑‍🎓",
};
