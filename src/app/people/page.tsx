import { db } from "@/db";
import { members } from "@/db/schema";
import { asc, desc } from "drizzle-orm";
import PeopleGrid from "./PeopleGrid";

export const revalidate = 60;



export default async function PeoplePage() {
    const allMembers = await db.select().from(members).orderBy(asc(members.createdAt));

    return (
        <main className="bg-slate-50 pt-20 pb-20">
            {/* Hero Section */}
            <section className="relative h-[400px] sm:h-[500px] overflow-hidden mb-20">
                <div className="absolute inset-0 bg-slate-900">
                    {/* The user will replace src with their actual group photo */}
                    <img 
                        src="/uploads/group-photo.jpg" 
                        alt="MNBE Lab Group Photo" 
                        className="w-full h-full object-cover opacity-60"
                        onError={(e) => {
                            // Falls back to a nice gradient if image is missing
                            (e.target as HTMLImageElement).style.display = 'none';
                            (e.target as HTMLImageElement).parentElement!.style.background = 'linear-gradient(to bottom right, #57068c, #1e0231)';
                        }}
                    />
                </div>
                <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
                    <h1 className="text-4xl sm:text-6xl font-bold text-white tracking-tight mb-4">
                        Meet Our Team
                    </h1>
                    <div className="w-20 h-1 bg-brand-400 rounded-full" />
                </div>
                {/* Bottom wave/decoration */}
                <div className="absolute bottom-0 left-0 right-0 h-24 bg-linear-to-t from-slate-50 to-transparent z-10" />
            </section>

            {/* Header (Original) */}
            <section className="max-w-5xl mx-auto px-6 lg:px-8 text-center mb-16">
                <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-brand-100 bg-brand-50 text-brand-500 text-sm font-medium mb-6">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-500 animate-pulse" />
                    The Team
                </span>
                <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 tracking-tight mb-4">People</h1>
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
