import { db } from "@/db";
import { groupActivities } from "@/db/schema";
import { desc } from "drizzle-orm";

export const revalidate = 60;

const categoryMeta: Record<string, { color: string; border: string }> = {
    "Lab Meetings": { color: "from-brand-50 to-brand-50", border: "border-brand-100" },
    "Outreach & Events": { color: "from-teal-50 to-emerald-50", border: "border-teal-100" },
    "Social & Wellbeing": { color: "from-violet-50 to-purple-50", border: "border-violet-100" },
    "Conferences & Travel": { color: "from-amber-50 to-orange-50", border: "border-amber-100" },
};

const defaultMeta = { color: "from-slate-50 to-slate-100", border: "border-slate-200" };

export default async function GroupActivitiesPage() {
    const activities = await db.select().from(groupActivities).orderBy(desc(groupActivities.createdAt));

    // Group by category
    const categoryOrder = ["Lab Meetings", "Outreach & Events", "Social & Wellbeing", "Conferences & Travel"];
    const grouped = categoryOrder
        .map((cat) => ({ category: cat, items: activities.filter((a) => a.category === cat) }))
        .filter((g) => g.items.length > 0);

    // Any unknown categories go at the bottom
    const known = new Set(categoryOrder);
    const otherItems = activities.filter((a) => !known.has(a.category));
    if (otherItems.length > 0) grouped.push({ category: "Other", items: otherItems });

    return (
        <main className="bg-slate-50 pt-24 pb-20">
            {/* Header */}
            <section className="max-w-5xl mx-auto px-6 lg:px-8 text-center mb-16">
                <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-brand-100 bg-brand-50 text-brand-500 text-sm font-medium mb-6">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-500 animate-pulse" />
                    Life in the Lab
                </span>
                <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 tracking-tight mb-4">
                    Group Activities
                </h1>
                <p className="text-lg text-slate-500 max-w-2xl mx-auto leading-relaxed">
                    Beyond the bench — how we collaborate, learn, and grow together as a research community.
                </p>
            </section>

            {/* Activities */}
            <div className="max-w-5xl mx-auto px-6 lg:px-8">
                {grouped.length === 0 ? (
                    <div className="text-center py-16 text-slate-400">
                        <p className="text-4xl mb-3">🎉</p>
                        <p className="text-sm">No activities yet. Add them via the <a href="/admin" className="text-brand-500 underline">admin panel</a>.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {grouped.map((cat) => {
                            const meta = categoryMeta[cat.category] ?? defaultMeta;
                            return (
                                <div key={cat.category}>
                                    <div className="flex items-center gap-2.5 mb-4">
                                        <span className="text-xl">{cat.items[0]?.emoji ?? "🎉"}</span>
                                        <h2 className="text-sm font-semibold text-slate-700 uppercase tracking-widest">
                                            {cat.category}
                                        </h2>
                                    </div>
                                    <div className="flex flex-col gap-4">
                                        {cat.items.map((item) => (
                                            <div
                                                key={item.id}
                                                className={`p-5 rounded-2xl bg-gradient-to-br ${meta.color} border ${meta.border}`}
                                            >
                                                <div className="flex items-start justify-between gap-3 mb-3 flex-wrap">
                                                    <h3 className="text-sm font-semibold text-slate-800">{item.title}</h3>
                                                    <span className="text-[11px] font-medium text-slate-500 bg-white/70 px-2.5 py-0.5 rounded-full whitespace-nowrap border border-slate-200/50">
                                                        {item.date}
                                                    </span>
                                                </div>
                                                <p className="text-sm text-slate-600 leading-relaxed mb-4">{item.description}</p>
                                                {item.photoUrl && (
                                                    <div className="w-full h-56 rounded-xl overflow-hidden mt-auto border border-black/5 shadow-sm">
                                                        <img src={item.photoUrl} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                                    </div>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </main>
    );
}
