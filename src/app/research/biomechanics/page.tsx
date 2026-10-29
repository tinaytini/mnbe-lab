import type { Metadata } from "next";
import Image from "next/image";
import { Database, Zap } from "lucide-react";
import { getResearchPageContent, BiomechanicsData } from "@/lib/research-data";

export const metadata: Metadata = {
    title: "Biomechanics | YAS Lab",
    description: "The YAS Lab's biomechanics research using C. elegans as a model organism for neuromuscular disease and genetic research.",
};

export const revalidate = 60;

export default async function BiomechanicsPage() {
    const data = await getResearchPageContent<BiomechanicsData>("biomechanics");

    return (
        <main className="bg-slate-50 pt-20">
            {/* Hero Section */}
            <section className="relative h-[550px] flex items-center justify-center bg-brand-900 overflow-hidden">
                <Image 
                    src={data.heroImage || "/uploads/biomechanics-hero.png"} 
                    alt={data.heroTitle}
                    fill 
                    className="object-cover opacity-60"
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

            {/* Content Sections */}
            <div className="max-w-6xl mx-auto px-6 lg:px-8 -mt-24 relative z-20 space-y-12 pb-24">
                
                {/* Introduction/First Project Card */}
                <section className="bg-white rounded-[2.5rem] shadow-xl border border-slate-200 p-8 sm:p-12">
                    <div className="flex items-center gap-3 mb-8">
                        <div className="w-10 h-10 rounded-xl bg-brand-50 flex items-center justify-center text-brand-500">
                            <Database className="w-5 h-5" />
                        </div>
                        <h2 className="text-2xl font-bold text-slate-900 leading-tight">
                            {data.project1Title}
                        </h2>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                        <div className="rounded-2xl aspect-[4/3] relative overflow-hidden group">
                            <Image 
                                src={data.project1Image1 || "/uploads/High-Throughput-Drug-Screening-1.jpg"} 
                                alt={data.project1Title} 
                                fill 
                                className="object-contain"
                            />
                        </div>
                        <div className="rounded-2xl aspect-[4/3] relative overflow-hidden group">
                            <Image 
                                src={data.project1Image2 || "/uploads/Diabetes-text-1.jpg"} 
                                alt={data.project1Title} 
                                fill 
                                className="object-contain"
                            />
                        </div>
                    </div>

                    {data.project1Quote && (
                        <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100 flex gap-4 items-start mb-8">
                            <div className="w-1.5 h-1.5 rounded-full bg-brand-500 mt-2 shrink-0" />
                            <p className="text-slate-600 text-base leading-relaxed italic">
                                &quot;{data.project1Quote}&quot;
                            </p>
                        </div>
                    )}
                    
                    {data.project1WideImage && (
                        <div className="rounded-2xl aspect-video relative overflow-hidden group">
                            <Image 
                                src={data.project1WideImage} 
                                alt={data.project1Title} 
                                fill 
                                className="object-contain"
                            />
                        </div>
                    )}
                </section>

                {/* Section 2: Single Worm Dispensing */}
                <section className="bg-white rounded-[2.5rem] shadow-xl border border-slate-200 p-8 sm:p-12">
                    <div className="flex items-center gap-3 mb-8">
                        <div className="w-10 h-10 rounded-xl bg-brand-50 flex items-center justify-center text-brand-500">
                            <Zap className="w-5 h-5" />
                        </div>
                        <h2 className="text-2xl font-bold text-slate-900 leading-tight">
                            {data.project2Title}
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="rounded-2xl aspect-square relative overflow-hidden group">
                            <Image 
                                src={data.project2Image1 || "/uploads/Dispensing-1.jpg"} 
                                alt={data.project2Title} 
                                fill 
                                className="object-contain"
                            />
                        </div>
                        <div className="rounded-2xl aspect-square relative overflow-hidden group">
                            <Image 
                                src={data.project2Image2 || "/uploads/DTIP-1.jpg"} 
                                alt={data.project2Title} 
                                fill 
                                className="object-contain"
                            />
                        </div>
                        <div className="rounded-2xl aspect-square relative overflow-hidden group">
                            <Image 
                                src={data.project2Image3 || "/uploads/Comsol-dtip-1.jpg"} 
                                alt={data.project2Title} 
                                fill 
                                className="object-contain"
                            />
                        </div>
                    </div>
                </section>

                {/* Footer style engagement */}
                <section className="bg-linear-to-br from-slate-900 via-brand-900 to-slate-900 rounded-[2.5rem] p-12 text-center relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-brand-500/20 rounded-full blur-3xl -mr-32 -mt-32" />
                    <h3 className="text-2xl font-bold text-white mb-4 relative z-10">{data.closingTitle}</h3>
                    <p className="text-brand-100/80 max-w-xl mx-auto leading-relaxed relative z-10">
                        {data.closingText}
                    </p>
                </section>
            </div>
        </main>
    );
}
