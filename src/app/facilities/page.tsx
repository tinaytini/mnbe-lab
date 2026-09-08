import type { Metadata } from "next";
import Image from "next/image";
import { db } from "@/db";
import { facilities } from "@/db/schema";
import { desc } from "drizzle-orm";

export const metadata: Metadata = {
    title: "Facilities | YAS Lab",
    description: "Explore the state-of-the-art micro/nanofabrication, biosensing, and cellular characterization equipment at the YAS Lab, NYU Abu Dhabi.",
};

export const revalidate = 60;

export default async function FacilitiesPage() {
    const items = await db.select().from(facilities).orderBy(desc(facilities.createdAt));

    return (
        <main className="bg-slate-50 pt-24 pb-24">
            {/* Header */}
            <section className="max-w-7xl mx-auto px-6 lg:px-8 text-center mb-20">
                <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-brand-100 bg-brand-50 text-brand-500 text-sm font-medium mb-6">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-500 animate-pulse" />
                    Infrastructure
                </span>
                <h1 className="text-4xl sm:text-6xl font-bold text-slate-900 tracking-tight mb-6">Laboratory Facilities</h1>
                <p className="text-xl text-slate-500 max-w-2xl mx-auto leading-relaxed font-light">
                    Our lab is equipped with state-of-the-art instrumentation for micro/nanofabrication, biosensing, and cellular characterization.
                </p>
            </section>

            {/* Equipment Grid */}
            <section className="max-w-7xl mx-auto px-6 lg:px-8">
                {items.length === 0 ? (
                    <div className="text-center py-16 text-slate-400">
                        <p className="text-4xl mb-3">🔬</p>
                        <p className="text-sm">No facilities yet. Add them via the <a href="/admin" className="text-brand-500 underline">admin panel</a>.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
                        {items.map((item) => (
                            <div
                                key={item.id}
                                className="group bg-white rounded-[2rem] border border-slate-200 overflow-hidden shadow-xs hover:shadow-xl hover:border-brand-200 transition-all duration-500"
                            >
                                <div className="aspect-[4/3] relative bg-slate-100 overflow-hidden">
                                    {item.photoUrl ? (
                                        <Image
                                            src={item.photoUrl}
                                            alt={item.title}
                                            fill
                                            className="object-cover group-hover:scale-110 transition-transform duration-700"
                                        />
                                    ) : (
                                        <div className="absolute inset-0 flex items-center justify-center text-4xl text-slate-300">🔬</div>
                                    )}
                                    <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                    {item.specs && (
                                        <div className="absolute bottom-4 left-6 right-6 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                                            <span className="text-[11px] font-bold text-white uppercase tracking-[0.2em]">{item.specs}</span>
                                        </div>
                                    )}
                                </div>
                                <div className="p-8">
                                    <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-brand-600 transition-colors">
                                        {item.title}
                                    </h3>
                                    <p className="text-slate-500 text-sm leading-relaxed line-clamp-3 group-hover:line-clamp-none transition-all duration-300">
                                        {item.description}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </section>
        </main>
    );
}
