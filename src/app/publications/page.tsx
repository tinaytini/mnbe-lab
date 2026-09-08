import type { Metadata } from "next";
import { db } from "@/db";
import { publications } from "@/db/schema";
import { asc } from "drizzle-orm";
import PublicationsList from "@/components/PublicationsList";

export const metadata: Metadata = {
    title: "Publications & Achievements | YAS Lab",
    description: "Browse recent peer-reviewed publications and research achievements from the YAS Lab (Molecular & Nanoscale Biosystems Engineering) at NYU Abu Dhabi.",
};

export const revalidate = 60; // ISR — re-fetch from DB every 60 seconds

export default async function PublicationsPage() {
    const pubs = await db
        .select()
        .from(publications)
        .orderBy(asc(publications.createdAt));

    return (
        <main className="bg-white pt-24 pb-20">
            {/* Header */}
            <section className="max-w-6xl mx-auto px-6 lg:px-8 text-center mb-16">
                <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-brand-100 bg-brand-50 text-brand-500 text-sm font-medium mb-6">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-500 animate-pulse" />
                    Our Output
                </span>
                <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 tracking-tight mb-4">
                    Publications &amp; Achievements
                </h1>
                <p className="text-lg text-slate-500 max-w-2xl mx-auto">
                    Selected recent publications and recognition from our research group.
                </p>
            </section>

            {/* Achievements - Temporarily Commented Out
            <section className="max-w-6xl mx-auto px-6 lg:px-8 mb-16">
                <h2 className="text-xl font-semibold text-slate-800 mb-6">Highlights</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {achievements.map((a) => (
                        <div
                            key={a.label}
                            className="flex flex-col gap-2 p-5 rounded-2xl bg-gradient-to-br from-brand-50 to-brand-50 border border-brand-100"
                        >
                            <span className="text-2xl">{a.icon}</span>
                            <span className="text-sm font-semibold text-slate-800">{a.label}</span>
                            <span className="text-xs text-slate-500">{a.body}</span>
                        </div>
                    ))}
                </div>
            </section>
            */}

            {/* Publications list */}
            <section className="max-w-6xl mx-auto px-6 lg:px-8">
                <h2 className="text-xl font-semibold text-slate-800 mb-6">
                    Recent Publications
                    <span className="ml-2 text-sm font-normal text-slate-400">({pubs.length})</span>
                </h2>

                {pubs.length === 0 ? (
                    <div className="text-center py-16 text-slate-400">
                        <p className="text-4xl mb-3">📄</p>
                        <p className="text-sm">No publications yet. Add them via the <a href="/admin" className="text-brand-500 underline">admin panel</a>.</p>
                    </div>
                ) : (
                    <PublicationsList pubs={pubs} />
                )}
            </section>
        </main>
    );
}
