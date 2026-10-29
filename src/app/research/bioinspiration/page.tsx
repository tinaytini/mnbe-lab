import type { Metadata } from "next";
import Image from "next/image";
import { Leaf, Wind, Droplets, Target } from "lucide-react";
import { getResearchPageContent, BioinspirationData } from "@/lib/research-data";

export const metadata: Metadata = {
    title: "Bioinspiration | YAS Lab",
    description: "How the YAS Lab draws on nature's design strategies to solve engineering challenges in bioengineering and materials science.",
};

export const revalidate = 60;

export default async function BioinspirationPage() {
    const data = await getResearchPageContent<BioinspirationData>("bioinspiration");

    return (
        <main className="bg-slate-50 pt-20">
            {/* Hero Section */}
            <section className="relative h-[550px] flex items-center justify-center bg-brand-900 overflow-hidden">
                <Image 
                    src={data.heroImage || "/uploads/bioinspiration-hero.jpg"} 
                    alt={data.heroTitle}
                    fill 
                    className="object-cover opacity-50"
                    priority
                />
                <div className="absolute inset-0 bg-linear-to-b from-brand-950/40 via-brand-900/40 to-brand-900/90" />
                <div className="absolute top-0 right-0 w-150 h-150 rounded-full bg-brand-500/20 blur-[120px] pointer-events-none translate-x-1/3 -translate-y-1/4" />
                <div className="relative z-10 text-center px-6 max-w-4xl">
                    <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-brand-300/30 bg-brand-500/20 text-brand-200 text-sm font-medium mb-6 backdrop-blur-md">
                        Research Area
                    </span>
                    <h1 className="text-5xl sm:text-7xl font-bold text-white tracking-tight mb-6">
                        {data.heroTitle}
                    </h1>
                    <p className="text-xl text-brand-100/90 max-w-2xl mx-auto leading-relaxed font-light">
                        {data.heroSubtitle}
                    </p>
                </div>
            </section>

            {/* Introduction */}
            <section className="max-w-6xl mx-auto px-6 lg:px-8 -mt-24 relative z-20">
                <div className="bg-white rounded-[2.5rem] shadow-xl border border-slate-200 p-8 sm:p-12">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                        <div className="lg:col-span-2">
                            <h2 className="text-3xl font-bold text-slate-900 mb-6">{data.blueprintTitle}</h2>
                            <p className="text-lg text-slate-600 leading-relaxed mb-6">
                                {data.blueprintP1}
                            </p>
                            <p className="text-lg text-slate-600 leading-relaxed">
                                {data.blueprintP2}
                            </p>
                        </div>
                        <div className="bg-brand-50 rounded-3xl p-8 flex flex-col justify-center border border-brand-100">
                            <Leaf className="w-10 h-10 text-brand-500 mb-4" />
                            <h3 className="text-xl font-bold text-slate-900 mb-2">Philosophy</h3>
                            <p className="text-sm text-slate-500 italic">&quot;{data.blueprintQuote}&quot;</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Focus Sections */}
            <section className="max-w-6xl mx-auto px-6 lg:px-8 py-24">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="group p-8 bg-white border border-slate-200 rounded-3xl hover:border-brand-200 hover:shadow-md transition-all duration-300">
                        <div className="w-12 h-12 rounded-2xl bg-brand-50 flex items-center justify-center text-brand-500 mb-6 group-hover:scale-110 transition-transform">
                            <Wind className="w-6 h-6" />
                        </div>
                        <h4 className="text-xl font-bold text-slate-900 mb-3">{data.focus1Title}</h4>
                        <p className="text-slate-500 leading-relaxed">{data.focus1Desc}</p>
                    </div>
                    <div className="group p-8 bg-white border border-slate-200 rounded-3xl hover:border-brand-200 hover:shadow-md transition-all duration-300">
                        <div className="w-12 h-12 rounded-2xl bg-brand-50 flex items-center justify-center text-brand-500 mb-6 group-hover:scale-110 transition-transform">
                            <Droplets className="w-6 h-6" />
                        </div>
                        <h4 className="text-xl font-bold text-slate-900 mb-3">{data.focus2Title}</h4>
                        <p className="text-slate-500 leading-relaxed">{data.focus2Desc}</p>
                    </div>
                    <div className="group p-8 bg-white border border-slate-200 rounded-3xl hover:border-brand-200 hover:shadow-md transition-all duration-300">
                        <div className="w-12 h-12 rounded-2xl bg-brand-50 flex items-center justify-center text-brand-500 mb-6 group-hover:scale-110 transition-transform">
                            <Target className="w-6 h-6" />
                        </div>
                        <h4 className="text-xl font-bold text-slate-900 mb-3">{data.focus3Title}</h4>
                        <p className="text-slate-500 leading-relaxed">{data.focus3Desc}</p>
                    </div>
                </div>
            </section>

            {/* Gallery/Showcase */}
            <section className="bg-linear-to-br from-slate-900 via-brand-900 to-slate-900 py-24 text-white overflow-hidden">
                <div className="max-w-6xl mx-auto px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <div className="relative">
                        <div className="absolute -top-20 -left-20 w-64 h-64 bg-brand-500/25 rounded-full blur-3xl" />
                        <h3 className="text-3xl font-bold mb-6">{data.showcaseTitle}</h3>
                        <p className="text-brand-100/80 text-lg mb-8 leading-relaxed">
                            {data.showcaseText}
                        </p>
                        <div className="flex gap-4">
                            <div className="flex flex-col">
                                <span className="text-4xl font-bold text-brand-300">{data.stat1Value}</span>
                                <span className="text-sm text-brand-200/70 uppercase tracking-widest mt-1">{data.stat1Label}</span>
                            </div>
                            <div className="w-px h-12 bg-white/15" />
                            <div className="flex flex-col">
                                <span className="text-4xl font-bold text-brand-300">{data.stat2Value}</span>
                                <span className="text-sm text-brand-200/70 uppercase tracking-widest mt-1">{data.stat2Label}</span>
                            </div>
                        </div>
                    </div>
                    <div className="aspect-square rounded-[3rem] overflow-hidden bg-brand-950 border border-white/10 relative">
                        <Image 
                            src={data.showcaseImage || "/uploads/bioinspiration-nature.jpg"} 
                            alt={data.showcaseTitle}
                            fill
                            className="object-cover"
                        />
                    </div>
                </div>
            </section>
        </main>
    );
}
