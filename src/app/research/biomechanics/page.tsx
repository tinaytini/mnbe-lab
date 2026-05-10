import Image from "next/image";
import { Database, Zap } from "lucide-react";

export default function BiomechanicsPage() {
    return (
        <main className="bg-white pt-24 pb-20">
            {/* Header section with Hero Image */}
            <section className="relative max-w-7xl mx-auto px-6 lg:px-8 mb-16 h-[300px] rounded-[2.5rem] overflow-hidden flex items-center justify-center group shadow-xl">
                <Image 
                    src="/uploads/ScienceCoverPage.jpg" 
                    alt="Research Hero" 
                    fill 
                    className="object-cover opacity-90"
                    priority
                />
                <div className="absolute inset-0 bg-linear-to-b from-slate-900/60 to-slate-900/40" />
                <div className="relative z-10 text-center">
                    <span className="inline-flex items-center gap-2 px-4 py-1 rounded-full border border-white/20 bg-white/10 text-white text-xs font-medium mb-4 backdrop-blur-md">
                        <span className="w-1.5 h-1.5 rounded-full bg-brand-400 animate-pulse" />
                        Research Areas
                    </span>
                    <h1 className="text-3xl sm:text-5xl font-bold text-white tracking-tight mb-3 drop-shadow-lg">
                        Biomechanics
                    </h1>
                    <p className="text-base text-slate-200 max-w-xl mx-auto drop-shadow-md">
                        Advanced microfluidic platforms for mechanical analysis of biological systems.
                    </p>
                </div>
            </section>

            {/* Exact Content Sections */}
            <div className="max-w-5xl mx-auto px-6 lg:px-8 space-y-20">
                
                {/* Section 1: Micropillar Screening */}
                <section>
                    <div className="flex items-center gap-3 mb-8">
                        <div className="w-10 h-10 rounded-xl bg-brand-50 flex items-center justify-center text-brand-500">
                            <Database className="w-5 h-5" />
                        </div>
                        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 leading-tight">
                            Micropillar based high throughput drug screening using C. elegans
                        </h2>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                        <div className="rounded-2xl bg-slate-50 border border-slate-200 aspect-[4/3] relative overflow-hidden shadow-xs hover:border-brand-200 transition-all hover:shadow-md group p-4">
                            <Image 
                                src="/uploads/High-Throughput-Drug-Screening-1.jpg" 
                                alt="High Throughput Drug Screening" 
                                fill 
                                className="object-contain p-2"
                            />
                        </div>
                        <div className="rounded-2xl bg-slate-50 border border-slate-200 aspect-[4/3] relative overflow-hidden shadow-xs hover:border-brand-200 transition-all hover:shadow-md group p-4">
                            <Image 
                                src="/uploads/Diabetes-text-1.jpg" 
                                alt="High-resolution microscopy" 
                                fill 
                                className="object-contain p-2"
                            />
                        </div>
                    </div>

                    <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100 flex gap-4 items-start mb-8">
                        <div className="w-1.5 h-1.5 rounded-full bg-brand-500 mt-2 shrink-0" />
                        <p className="text-slate-600 text-base leading-relaxed italic">
                            &quot;The method can be extended to study other muscle impacting disease like ALS, Parkinson disease etc.&quot;
                        </p>
                    </div>
                    
                    <div className="rounded-2xl bg-slate-50 border border-slate-200 aspect-video relative overflow-hidden shadow-xs hover:border-brand-200 transition-all hover:shadow-lg group p-6">
                        <Image 
                            src="/uploads/Neuromuscular-Disease-1.jpg" 
                            alt="Neuromuscular Disease Study" 
                            fill 
                            className="object-contain p-4"
                        />
                    </div>
                </section>

                <hr className="border-slate-100" />

                {/* Section 2: Single Worm Dispensing */}
                <section>
                    <div className="flex items-center gap-3 mb-8">
                        <div className="w-10 h-10 rounded-xl bg-brand-50 flex items-center justify-center text-brand-500">
                            <Zap className="w-5 h-5" />
                        </div>
                        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 leading-tight">
                            Dispensing of single C. elegan worms using microfluidics and pressure boundary condition
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="rounded-2xl bg-slate-50 border border-slate-200 aspect-square relative overflow-hidden shadow-xs hover:border-brand-200 transition-all hover:shadow-md group p-3">
                            <Image 
                                src="/uploads/Dispensing-1.jpg" 
                                alt="Microfluidic dispensing system" 
                                fill 
                                className="object-contain p-2"
                            />
                        </div>
                        <div className="rounded-2xl bg-slate-50 border border-slate-200 aspect-square relative overflow-hidden shadow-xs hover:border-brand-200 transition-all hover:shadow-md group p-3">
                            <Image 
                                src="/uploads/DTIP-1.jpg" 
                                alt="SEM image of dispensing tip" 
                                fill 
                                className="object-contain p-2"
                            />
                        </div>
                        <div className="rounded-2xl bg-slate-50 border border-slate-200 aspect-square relative overflow-hidden shadow-xs hover:border-brand-200 transition-all hover:shadow-md group p-3">
                            <Image 
                                src="/uploads/Comsol-dtip-1.jpg" 
                                alt="Comsol simulation" 
                                fill 
                                className="object-contain p-2"
                            />
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
