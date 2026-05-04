import { db } from "@/db";
import { publications } from "@/db/schema";
import { asc, desc } from "drizzle-orm";

const achievements = [
    { icon: "🏆", label: "Best Paper Award", body: "IEEE NanoBio Conference 2024" },
    { icon: "🎖️", label: "ERC Starting Grant", body: "€1.5M — Molecular Machines, 2023" },
    { icon: "🌍", label: "Nature Index", body: "Top 50 Nano Research Groups 2023" },
    { icon: "🤝", label: "Industry Partnership", body: "BioNano Therapeutics, 2024" },
];

export const revalidate = 60; // ISR — re-fetch from DB every 60 seconds

export default async function PublicationsPage() {
    const pubs = await db
        .select()
        .from(publications)
        .orderBy(asc(publications.year), asc(publications.createdAt));

    return (
        <main className="min-h-screen bg-white pt-24 pb-20">
            {/* Header */}
            <section className="max-w-5xl mx-auto px-6 lg:px-8 text-center mb-16">
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
            <section className="max-w-5xl mx-auto px-6 lg:px-8 mb-16">
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
            <section className="max-w-5xl mx-auto px-6 lg:px-8">
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
                    <div className="flex flex-col gap-4">
                        {pubs.map((p) => {
                            const CardContent = (
                                <div
                                    className={`group flex gap-5 p-6 rounded-2xl border border-slate-200 bg-white hover:border-brand-100 hover:shadow-md transition-all duration-200 ${p.url ? "cursor-pointer" : ""}`}
                                >
                                    <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-brand-50 flex items-center justify-center text-brand-500 font-bold text-sm">
                                        {p.year}
                                    </div>
                                    <div className="flex flex-col gap-1 w-full">
                                        <h3 className="text-base font-semibold text-slate-800 group-hover:text-brand-600 transition-colors flex items-start justify-between gap-4">
                                            <span>{p.title}</span>
                                            {p.url && (
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 text-slate-300 group-hover:text-brand-500 flex-shrink-0 mt-0.5 transition-colors">
                                                    <path fillRule="evenodd" d="M5.22 14.78a.75.75 0 001.06 0l7.22-7.22v5.69a.75.75 0 001.5 0v-7.5a.75.75 0 00-.75-.75h-7.5a.75.75 0 000 1.5h5.69l-7.22 7.22a.75.75 0 000 1.06z" clipRule="evenodd" />
                                                </svg>
                                            )}
                                        </h3>
                                        <p className="text-sm text-slate-500">{p.authors}</p>
                                        <div className="flex items-center gap-2 mt-1 flex-wrap">
                                            <span className="text-xs font-medium text-brand-500 bg-brand-50 px-2.5 py-0.5 rounded-full">
                                                {p.journal}
                                            </span>
                                            <span className="text-xs text-slate-400">Journal Article</span>
                                        </div>
                                        {p.description && (
                                            <p className="text-sm text-slate-500 mt-2 leading-relaxed">{p.description}</p>
                                        )}
                                    </div>
                                </div>
                            );

                            return p.url ? (
                                <a key={p.id} href={p.url} target="_blank" rel="noopener noreferrer" className="block focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2 rounded-2xl">
                                    {CardContent}
                                </a>
                            ) : (
                                <div key={p.id}>
                                    {CardContent}
                                </div>
                            );
                        })}
                    </div>
                )}
            </section>
        </main>
    );
}
