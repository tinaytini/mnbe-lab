import { db } from "@/db";
import { members } from "@/db/schema";
import { asc, desc } from "drizzle-orm";
import PeopleGrid from "./PeopleGrid";
import PeopleHero from "./PeopleHero";

export const revalidate = 60;



export default async function PeoplePage() {
    const allMembers = await db.select().from(members).orderBy(asc(members.createdAt));

    return (
        <main className="bg-slate-50 pt-20 pb-20">
            <PeopleHero />

            {/* Header (Original) */}
            <section className="max-w-5xl mx-auto px-6 lg:px-8 text-center mb-16">

                <p className="text-lg text-slate-500 max-w-2xl mx-auto leading-relaxed">
                    Our diverse, interdisciplinary team brings together expertise from
                    biochemistry, engineering, physics, and computer science.
                </p>
            </section>

            {/* Members by role */}
            <div className="max-w-5xl mx-auto px-6 lg:px-8 flex flex-col gap-12">
                {allMembers.length === 0 ? (
                    <div className="text-center py-16 text-slate-400">
                        <p className="text-4xl mb-3">👥</p>
                        <p className="text-sm">No team members yet. Add them via the <a href="/admin" className="text-brand-500 underline">admin panel</a>.</p>
                    </div>
                ) : (
                    <PeopleGrid allMembers={allMembers} />
                )}
            </div>
        </main>
    );
}
