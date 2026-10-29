import type { Metadata } from "next";
import Image from "next/image";
import { Radio, ShieldCheck, Cpu } from "lucide-react";
import { getResearchPageContent, BiosensingData } from "@/lib/research-data";

export const metadata: Metadata = {
    title: "Biosensing | YAS Lab",
    description: "The YAS Lab's biosensing research developing biosensors to enhance RNA and DNA detection sensitivity for biopsy techniques.",
};

export const revalidate = 60;

export default async function BiosensingPage() {
    const data = await getResearchPageContent<BiosensingData>("biosensing");

    return (
        <main className="bg-slate-50 pt-20">
            {/* Hero Section */}
            <section className="relative h-[550px] flex items-center justify-center bg-brand-900 overflow-hidden">
                <Image 
                    src={data.heroImage || "/uploads/biosensing-hero.jpg"} 
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

            {/* Content Section */}
            <section className="max-w-6xl mx-auto px-6 lg:px-8 -mt-24 relative z-20 pb-24">
                <div className="bg-white rounded-[2.5rem] shadow-xl border border-slate-200 p-8 sm:p-12">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
                        <div className="order-2 lg:order-1">
                            <div className="aspect-square rounded-3xl overflow-hidden shadow-2xl relative bg-slate-100">
                                <Image 
                                    src={data.nanochipImage || "/uploads/biosensing-nanochip.jpg"} 
                                    alt="Nanochip"
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            <div className="mt-8 grid grid-cols-2 gap-4">
                                <div className="h-40 bg-slate-50 rounded-2xl border border-slate-100 p-6 flex flex-col justify-center text-center">
                                    <span className="text-3xl font-bold bg-linear-to-r from-brand-500 to-brand-400 bg-clip-text text-transparent">
                                        {data.stat1Value}
                                    </span>
                                    <span className="text-sm text-slate-500 mt-1 uppercase tracking-wider font-medium">
                                        {data.stat1Label}
                                    </span>
                                </div>
                                <div className="h-40 bg-slate-50 rounded-2xl border border-slate-100 p-6 flex flex-col justify-center text-center">
                                    <span className="text-3xl font-bold bg-linear-to-r from-brand-500 to-brand-400 bg-clip-text text-transparent">
                                        {data.stat2Value}
                                    </span>
                                    <span className="text-sm text-slate-500 mt-1 uppercase tracking-wider font-medium">
                                        {data.stat2Label}
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="order-1 lg:order-2">
                            <h2 className="text-3xl font-bold text-slate-900 mb-6">
                                {data.overviewHeading}
                            </h2>
                            <div className="space-y-6 text-lg text-slate-600 leading-relaxed">
                                <p>{data.overviewP1}</p>
                                <p>{data.overviewP2}</p>
                            </div>

                            <div className="mt-12 space-y-4">
                                <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100 shadow-xs flex items-start gap-4 transition-all hover:bg-white hover:shadow-md hover:border-brand-100">
                                    <div className="w-10 h-10 rounded-xl bg-brand-50 flex items-center justify-center text-brand-500 shrink-0">
                                        <Radio className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-slate-800 mb-1">{data.feature1Title}</h3>
                                        <p className="text-sm text-slate-500">{data.feature1Desc}</p>
                                    </div>
                                </div>
                                <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100 shadow-xs flex items-start gap-4 transition-all hover:bg-white hover:shadow-md hover:border-brand-100">
                                    <div className="w-10 h-10 rounded-xl bg-brand-50 flex items-center justify-center text-brand-500 shrink-0">
                                        <ShieldCheck className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-slate-800 mb-1">{data.feature2Title}</h3>
                                        <p className="text-sm text-slate-500">{data.feature2Desc}</p>
                                    </div>
                                </div>
                                <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100 shadow-xs flex items-start gap-4 transition-all hover:bg-white hover:shadow-md hover:border-brand-100">
                                    <div className="w-10 h-10 rounded-xl bg-brand-50 flex items-center justify-center text-brand-500 shrink-0">
                                        <Cpu className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-slate-800 mb-1">{data.feature3Title}</h3>
                                        <p className="text-sm text-slate-500">{data.feature3Desc}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
