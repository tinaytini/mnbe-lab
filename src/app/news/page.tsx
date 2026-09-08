import type { Metadata } from "next";
import { db } from "@/db";
import { news as newsTable } from "@/db/schema";
import { desc } from "drizzle-orm";

export const metadata: Metadata = {
    title: "News | YAS Lab",
    description: "Latest updates, awards, and highlights from the YAS Lab (Molecular & Nanoscale Biosystems Engineering) research community at NYU Abu Dhabi.",
};

export const revalidate = 60;

export default async function NewsPage() {
    const items = await db.select().from(newsTable).orderBy(desc(newsTable.createdAt));

    return (
        <main className="bg-slate-50 pt-24 pb-20">
            {/* Header */}
            <section className="max-w-6xl mx-auto px-6 lg:px-8 text-center mb-16">
                <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-brand-100 bg-brand-50 text-brand-500 text-sm font-medium mb-6">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-500 animate-pulse" />
                    Life in the Lab
                </span>
                <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 tracking-tight mb-4">
                    News
                </h1>
                <p className="text-lg text-slate-500 max-w-2xl mx-auto leading-relaxed">
                    Latest updates, collaborative events, and highlights from our research community.
                </p>
            </section>

            <div className="max-w-6xl mx-auto px-6 lg:px-8">
                {items.length === 0 ? (
                    <div className="text-center py-16 text-slate-400">
                        <p className="text-4xl mb-3">📰</p>
                        <p className="text-sm">No news yet. <a href="/admin" className="text-brand-500 underline">Add via admin →</a></p>
                    </div>
                ) : (
                    <div
                        className={
                            items.length === 1
                                ? "max-w-sm mx-auto"
                                : items.length === 2
                                    ? "max-w-2xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-6"
                                    : "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                        }
                    >
                        {items.map((item) => {
                            const isExternal = !!item.url;
                            const Wrapper = isExternal ? "a" : "div";
                            const linkProps = isExternal
                                ? { href: item.url as string, target: "_blank", rel: "noopener noreferrer" }
                                : {};
                            return (
                                <Wrapper
                                    key={item.id}
                                    {...linkProps}
                                    className={`flex flex-col gap-4 p-5 rounded-2xl bg-white border border-slate-200 shadow-sm transition-all duration-200 ${isExternal ? "hover:border-brand-300 hover:shadow-md cursor-pointer" : ""
                                        }`}
                                >
                                    {item.photoUrl && (
                                        <div className="w-full h-40 rounded-xl overflow-hidden border border-slate-100">
                                            {/* eslint-disable-next-line @next/next/no-img-element */}
                                            <img src={item.photoUrl} alt={item.title} className="w-full h-full object-cover" />
                                        </div>
                                    )}
                                    <div>
                                        <span className="text-xs font-semibold text-brand-500 uppercase tracking-widest">
                                            {item.date}
                                        </span>
                                        <h3 className="flex items-start justify-between gap-2 text-sm font-semibold text-slate-800 mt-1 mb-2 leading-snug">
                                            <span>{item.title}</span>
                                            {isExternal && (
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 text-brand-400 shrink-0 mt-0.5">
                                                    <path fillRule="evenodd" d="M4.25 5.5a.75.75 0 00-.75.75v8.5c0 .414.336.75.75.75h8.5a.75.75 0 00.75-.75v-4a.75.75 0 011.5 0v4A2.25 2.25 0 0112.75 17h-8.5A2.25 2.25 0 012 14.75v-8.5A2.25 2.25 0 014.25 4h4a.75.75 0 010 1.5h-4z" clipRule="evenodd" />
                                                    <path fillRule="evenodd" d="M6.194 12.753a.75.75 0 001.06.053L16.5 4.44v2.81a.75.75 0 001.5 0v-4.5a.75.75 0 00-.75-.75h-4.5a.75.75 0 000 1.5h2.553l-9.056 8.198a.75.75 0 00-.053 1.06z" clipRule="evenodd" />
                                                </svg>
                                            )}
                                        </h3>
                                        <p className="text-sm text-slate-500 leading-relaxed line-clamp-3">{item.body}</p>
                                    </div>
                                </Wrapper>
                            );
                        })}
                    </div>
                )}
            </div>
        </main>
    );
}
