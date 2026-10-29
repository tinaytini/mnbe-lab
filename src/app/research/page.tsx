import type { Metadata } from "next";
import { db } from "@/db";
import { researchAreas } from "@/db/schema";
import { desc } from "drizzle-orm";
import Link from "next/link";

export const metadata: Metadata = {
    title: "Research Areas | YAS Lab",
    description: "Explore the research areas of the YAS Lab: micro and nanoscale bioengineering, biosensing, and drug delivery at NYU Abu Dhabi.",
};

export const revalidate = 60;

// Research areas that have a dedicated detail page under /research/<slug>.
const DETAIL_PAGES = new Set(["biosensing", "biomechanics", "bioinspiration"]);

function detailHref(title: string): string | null {
    const slug = title.trim().toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
    return DETAIL_PAGES.has(slug) ? `/research/${slug}` : null;
}

export default async function ResearchPage() {
    const areas = await db.select().from(researchAreas).orderBy(desc(researchAreas.createdAt));

    return (
        <main className="bg-slate-50 pt-24 pb-20">
            {/* Header */}
            <section className="max-w-6xl mx-auto px-6 lg:px-8 text-center mb-16">
                <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-brand-100 bg-brand-50 text-brand-500 text-sm font-medium mb-6">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-500 animate-pulse" />
                    Our Focus
                </span>
                <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 tracking-tight mb-4">
                    Research Areas
                </h1>
                <p className="text-lg text-slate-500 max-w-2xl mx-auto leading-relaxed">
                    We pursue fundamental and applied research at the frontier of micro and nanoscale bioengineering.
                </p>
            </section>

            {/* Cards grid */}
            <section className="max-w-6xl mx-auto px-6 lg:px-8">
                {areas.length === 0 ? (
                    <div className="text-center py-16 text-slate-400">
                        <p className="text-4xl mb-3">🔬</p>
                        <p className="text-sm">No research areas yet. Add them via the <a href="/admin" className="text-brand-500 underline">admin panel</a>.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 gap-6">
                        {areas.map((area) => {
                            const href = detailHref(area.title);
                            const cardClass = `group relative bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-md hover:border-brand-100 transition-all duration-200 flex flex-col sm:flex-row gap-8 items-center sm:items-start ${href ? "cursor-pointer hover:-translate-y-0.5" : "cursor-default"}`;
                            const content = (
                                <>
                                    <div className="w-full sm:w-64 h-48 sm:h-40 rounded-xl bg-slate-50 flex items-center justify-center text-4xl overflow-hidden shadow-sm border border-slate-100 shrink-0">
                                        {area.photoUrl ? (
                                            <img src={area.photoUrl} alt={area.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                        ) : (
                                            "🔬"
                                        )}
                                    </div>
                                    <div className="flex flex-col justify-center text-center sm:text-left min-w-0 flex-1 py-1">
                                        <h2 className="text-xl font-semibold text-slate-800 mb-3 group-hover:text-brand-500 transition-colors">
                                            {area.title}
                                        </h2>
                                        <p className="text-sm text-slate-500 leading-relaxed max-w-3xl">
                                            {area.description}
                                        </p>
                                        {href && (
                                            <span className="mt-4 inline-flex items-center justify-center sm:justify-start gap-1.5 text-sm font-semibold text-brand-500">
                                                Learn more
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 group-hover:translate-x-1 transition-transform">
                                                    <path fillRule="evenodd" d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z" clipRule="evenodd" />
                                                </svg>
                                            </span>
                                        )}
                                    </div>
                                    <div className="absolute inset-x-0 bottom-0 h-0.5 rounded-b-2xl bg-gradient-to-r from-brand-500 to-brand-400 scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
                                </>
                            );
                            return href ? (
                                <Link key={area.id} href={href} className={cardClass}>
                                    {content}
                                </Link>
                            ) : (
                                <div key={area.id} className={cardClass}>
                                    {content}
                                </div>
                            );
                        })}
                    </div>
                )}
            </section>
        </main>
    );
}
