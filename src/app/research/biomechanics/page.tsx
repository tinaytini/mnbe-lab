import React from "react";
import { Activity, Microscope, Zap, Database } from "lucide-react";

export default function BiomechanicsPage() {
    return (
        <main className="bg-white pt-24 pb-20">
            {/* Header section similar to the original */}
            <section className="max-w-5xl mx-auto px-6 lg:px-8 text-center mb-16">
                <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-brand-100 bg-brand-50 text-brand-500 text-sm font-medium mb-6">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-500 animate-pulse" />
                    Research Areas
                </span>
                <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 tracking-tight mb-4">
                    Biomechanics
                </h1>
                <p className="text-lg text-slate-500 max-w-2xl mx-auto">
                    Advanced microfluidic platforms for mechanical analysis of biological systems.
                </p>
            </section>

            {/* Exact Content Sections */}
            <div className="max-w-5xl mx-auto px-6 lg:px-8 space-y-24">
                
                {/* Section 1: Micropillar Screening */}
                <section>
                    <div className="flex items-center gap-3 mb-8">
                        <div className="w-10 h-10 rounded-xl bg-brand-50 flex items-center justify-center text-brand-500">
                            <Database className="w-5 h-5" />
                        </div>
                        <h2 className="text-2xl font-bold text-slate-900 leading-tight">
                            Micropillar based high throughput drug screening using C. elegans
                        </h2>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                        <div className="rounded-3xl bg-slate-50 border border-slate-200 aspect-video flex items-center justify-center text-slate-400 font-medium overflow-hidden shadow-xs hover:border-brand-200 transition-colors cursor-help">
                            <div className="flex flex-col items-center gap-2 text-center px-6">
                                <Activity className="w-8 h-8 opacity-20" />
                                <p className="text-sm">Image Placeholder 1: <br/> Micropillar based high throughput drug screening platform</p>
                            </div>
                        </div>
                        <div className="rounded-3xl bg-slate-50 border border-slate-200 aspect-video flex items-center justify-center text-slate-400 font-medium overflow-hidden shadow-xs hover:border-brand-200 transition-colors cursor-help">
                            <div className="flex flex-col items-center gap-2 text-center px-6">
                                <Microscope className="w-8 h-8 opacity-20" />
                                <p className="text-sm">Image Placeholder 2: <br/> High-resolution microscopy of C. elegans in array</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100 flex gap-4 items-start">
                        <div className="w-1.5 h-1.5 rounded-full bg-brand-500 mt-2 shrink-0" />
                        <p className="text-slate-600 leading-relaxed">
                            The method can be extended to study other muscle impacting disease like ALS, Parkinson disease etc.
                        </p>
                    </div>
                    
                    <div className="mt-6 rounded-3xl bg-slate-50 border border-slate-200 aspect-[21/9] flex items-center justify-center text-slate-400 font-medium overflow-hidden shadow-xs hover:border-brand-200 transition-colors cursor-help">
                        <div className="flex flex-col items-center gap-2 text-center px-6">
                            <Activity className="w-8 h-8 opacity-20" />
                            <p className="text-sm">Image Placeholder 3: <br/> Comparative study of muscle impacting diseases (ALS, Parkinson&apos;s)</p>
                        </div>
                    </div>
                </section>

                <hr className="border-slate-100" />

                {/* Section 2: Single Worm Dispensing */}
                <section>
                    <div className="flex items-center gap-3 mb-8">
                        <div className="w-10 h-10 rounded-xl bg-brand-50 flex items-center justify-center text-brand-500">
                            <Zap className="w-5 h-5" />
                        </div>
                        <h2 className="text-2xl font-bold text-slate-900 leading-tight">
                            Dispensing of single C. elegan worms using microfluidics and pressure boundary condition
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="rounded-3xl bg-slate-50 border border-slate-200 aspect-square flex items-center justify-center text-slate-400 font-medium overflow-hidden shadow-xs hover:border-brand-200 transition-colors cursor-help">
                            <div className="flex flex-col items-center gap-2 text-center px-4">
                                <Activity className="w-6 h-6 opacity-20" />
                                <p className="text-xs">Image Placeholder 4: <br/> Microfluidic dispensing system setup</p>
                            </div>
                        </div>
                        <div className="rounded-3xl bg-slate-50 border border-slate-200 aspect-square flex items-center justify-center text-slate-400 font-medium overflow-hidden shadow-xs hover:border-brand-200 transition-colors cursor-help">
                            <div className="flex flex-col items-center gap-2 text-center px-4">
                                <Microscope className="w-6 h-6 opacity-20" />
                                <p className="text-xs">Image Placeholder 5: <br/> SEM image of the dispensing tip (NanoScribe 3d printer)</p>
                            </div>
                        </div>
                        <div className="rounded-3xl bg-slate-50 border border-slate-200 aspect-square flex items-center justify-center text-slate-400 font-medium overflow-hidden shadow-xs hover:border-brand-200 transition-colors cursor-help">
                            <div className="flex flex-col items-center gap-2 text-center px-4">
                                <Zap className="w-6 h-6 opacity-20" />
                                <p className="text-xs">Image Placeholder 6: <br/> Comsol simulation of flow mechanics inside the tip</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Footer style engagement */}
                <section className="bg-slate-900 rounded-[2.5rem] p-12 text-center relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-brand-500/10 rounded-full blur-3xl -mr-32 -mt-32" />
                    <h3 className="text-2xl font-bold text-white mb-4 relative z-10">Biomechanics Research</h3>
                    <p className="text-slate-400 max-w-xl mx-auto leading-relaxed relative z-10">
                        Our work integrates advanced microfluidics with biological modeling to create precise analytical tools for disease study.
                    </p>
                </section>
            </div>
        </main>
    );
}
