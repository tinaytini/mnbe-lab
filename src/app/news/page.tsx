import type { Metadata } from "next";
import Link from "next/link";
import { db } from "@/db";
import { news as newsTable } from "@/db/schema";
import { desc } from "drizzle-orm";

export const metadata: Metadata = {
    title: "News | YAS Lab",
    description: "Latest updates, awards, and highlights from the YAS Lab (Micro and Nanoscale Bioengineering) research community at NYU Abu Dhabi.",
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
                        {items.map((item) => (
                            <Link
                                key={item.id}
                                href={`/news/${item.id}`}
                                className="group flex flex-col gap-4 p-5 rounded-2xl bg-white border border-slate-200 shadow-sm transition-all duration-200 hover:border-brand-300 hover:shadow-md hover:-translate-y-0.5 cursor-pointer"
                            >
                                {item.photoUrl && (
                                    <div className="relative w-full h-56 rounded-xl overflow-hidden border border-slate-100 bg-slate-50">
                                        {/* Blurred copy fills the letterbox around the full, uncropped image */}
                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                        <img src={item.photoUrl} alt="" aria-hidden className="absolute inset-0 w-full h-full object-cover scale-110 blur-xl opacity-60" />
                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                        <img src={item.photoUrl} alt={item.title} className="relative w-full h-full object-contain transition-transform duration-300 group-hover:scale-[1.02]" />
                                    </div>
                                )}
                                <div className="flex flex-col flex-1">
                                    <span className="text-xs font-semibold text-brand-500 uppercase tracking-widest">
                                        {item.date}
                                    </span>
                                    <h3 className="text-base font-semibold text-slate-800 mt-1 mb-2 leading-snug group-hover:text-brand-600 transition-colors line-clamp-2">
                                        {item.title}
                                    </h3>
                                    <p className="text-sm text-slate-500 leading-relaxed line-clamp-3 mb-4">{item.body}</p>
                                    
                                    <div className="mt-auto pt-2 flex items-center justify-between text-xs font-semibold text-brand-600">
                                        <span>Read article →</span>
                                        {item.url && (
                                            <span className="inline-flex items-center gap-1 text-slate-400 font-normal">
                                                <span>Has link</span>
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3.5 h-3.5">
                                                    <path fillRule="evenodd" d="M4.25 5.5a.75.75 0 00-.75.75v8.5c0 .414.336.75.75.75h8.5a.75.75 0 00.75-.75v-4a.75.75 0 011.5 0v4A2.25 2.25 0 0112.75 17h-8.5A2.25 2.25 0 012 14.75v-8.5A2.25 2.25 0 014.25 4h4a.75.75 0 010 1.5h-4z" clipRule="evenodd" />
                                                    <path fillRule="evenodd" d="M6.194 12.753a.75.75 0 001.06.053L16.5 4.44v2.81a.75.75 0 001.5 0v-4.5a.75.75 0 00-.75-.75h-4.5a.75.75 0 000 1.5h2.553l-9.056 8.198a.75.75 0 00-.053 1.06z" clipRule="evenodd" />
                                                </svg>
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </main>
    );
}
