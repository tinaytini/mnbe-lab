import React from "react";
import { Activity, Zap, Layers, Microscope, Target, Cpu } from "lucide-react";

export default function BiomechanicsPage() {
    return (
        <main className="bg-slate-50 pt-20">
            {/* Hero Section */}
            <section className="relative h-[500px] flex items-center justify-center bg-slate-900 overflow-hidden">
                <div className="absolute inset-0 opacity-40">
                    <div className="w-full h-full bg-linear-to-br from-brand-900 to-slate-900 flex items-center justify-center text-slate-700">
                        {/* Placeholder for Hero Image */}
                        [Research Hero Image: Worms-on-a-chip Visualization]
                    </div>
                </div>
                <div className="relative z-10 text-center px-6 max-w-4xl">
                    <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-brand-400/30 bg-brand-500/10 text-brand-300 text-sm font-medium mb-6 backdrop-blur-md">
                        Research Area
                    </span>
                    <h1 className="text-4xl sm:text-6xl font-bold text-white tracking-tight mb-6">
                        Biomechanics & <br className="hidden sm:block" /> Worms-on-a-chip
                    </h1>
                    <p className="text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
                        High-throughput platforms for drug screening and physiological studies using microfluidic systems.
                    </p>
                </div>
                <div className="absolute bottom-0 left-0 right-0 h-32 bg-linear-to-t from-slate-50 to-transparent" />
            </section>

            {/* Main Project: Micropillar-based Screening */}
            <section className="max-w-7xl mx-auto px-6 lg:px-8 py-20">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <div>
                        <h2 className="text-3xl font-bold text-slate-900 mb-6">High-Throughput Drug Screening</h2>
                        <div className="space-y-6 text-lg text-slate-600 leading-relaxed">
                            <p>
                                We have developed a <strong>micropillar-based high-throughput platform</strong> for screening drugs that impact muscle function. Using <em>C. elegans</em> as a model organism, we can rapidly assess the efficacy of therapeutic compounds in a controlled microenvironment.
                            </p>
                            <p>
                                This method is being extended to study a variety of muscle-impacting diseases, providing critical insights into neurological and muscular disorders.
                            </p>
                        </div>

                        <div className="mt-10 flex flex-wrap gap-3">
                            <span className="px-4 py-2 bg-white border border-slate-200 rounded-full text-sm font-medium text-slate-700 shadow-sm">ALS Research</span>
                            <span className="px-4 py-2 bg-white border border-slate-200 rounded-full text-sm font-medium text-slate-700 shadow-sm">Parkinson&apos;s Disease</span>
                            <span className="px-4 py-2 bg-white border border-slate-200 rounded-full text-sm font-medium text-slate-700 shadow-sm">Muscle Degeneration</span>
                        </div>
                    </div>

                    <div className="aspect-video rounded-3xl bg-slate-200 flex items-center justify-center text-slate-400 border-2 border-dashed border-slate-300 relative overflow-hidden group">
                        <div className="absolute inset-0 bg-slate-100 opacity-50 group-hover:opacity-70 transition-opacity" />
                        <span className="relative z-10 font-medium">[Image Placeholder: Micropillar Device Diagram]</span>
                    </div>
                </div>
            </section>

            {/* Secondary Project: Single Worm Dispensing */}
            <section className="bg-white py-24 border-y border-slate-100">
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold text-slate-900 mb-4">Precision Microfluidic Dispensing</h2>
                        <p className="text-lg text-slate-500 max-w-2xl mx-auto">
                            Automated handling of individual organisms through advanced 3D-printed micro-interfaces.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="p-8 bg-slate-50 rounded-3xl border border-slate-100">
                            <Cpu className="w-10 h-10 text-brand-500 mb-6" />
                            <h3 className="text-xl font-bold text-slate-900 mb-3">Pressure Control</h3>
                            <p className="text-slate-600">
                                Utilizing specific pressure boundary conditions to dispense single <em>C. elegans</em> worms with high reliability.
                            </p>
                        </div>
                        <div className="p-8 bg-slate-50 rounded-3xl border border-slate-100">
                            <Microscope className="w-10 h-10 text-brand-500 mb-6" />
                            <h3 className="text-xl font-bold text-slate-900 mb-3">3D Printed Tips</h3>
                            <p className="text-slate-600">
                                Fabrication of custom dispensing tips using <strong>NanoScribe 3D printing</strong> technology for sub-micron precision.
                            </p>
                        </div>
                        <div className="p-8 bg-slate-50 rounded-3xl border border-slate-100">
                            <Zap className="w-10 h-10 text-brand-500 mb-6" />
                            <h3 className="text-xl font-bold text-slate-900 mb-3">Flow Mechanics</h3>
                            <p className="text-slate-600">
                                Integration of <strong>COMSOL simulations</strong> to optimize flow profiles and minimize shear stress on biological samples.
                            </p>
                        </div>
                    </div>

                    <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 gap-8">
                        <div className="aspect-[4/3] rounded-3xl bg-slate-100 flex items-center justify-center text-slate-400 border-2 border-dashed border-slate-200">
                            <span className="font-medium px-6 text-center">[SEM Image: 3D Printed Dispensing Tip]</span>
                        </div>
                        <div className="aspect-[4/3] rounded-3xl bg-slate-100 flex items-center justify-center text-slate-400 border-2 border-dashed border-slate-200">
                            <span className="font-medium px-6 text-center">[Simulation Result: Flow Mechanics inside the Tip]</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Call to Action/Summary */}
            <section className="max-w-5xl mx-auto px-6 lg:px-8 py-24 text-center">
                <div className="p-12 rounded-[3rem] bg-brand-600 text-white relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-brand-400/20 rounded-full blur-3xl -mr-32 -mt-32" />
                    <h3 className="text-3xl font-bold mb-6 relative z-10">Advancing Biological Analysis</h3>
                    <p className="text-brand-100 text-lg mb-8 max-w-2xl mx-auto relative z-10 leading-relaxed font-light">
                        Our biomechanics research bridges the gap between engineering and biology, providing new tools for researchers to study disease progression and treatment effectiveness.
                    </p>
                    <div className="flex justify-center gap-4 relative z-10">
                        <Activity className="w-8 h-8 opacity-50" />
                        <Layers className="w-8 h-8 opacity-50" />
                        <Microscope className="w-8 h-8 opacity-50" />
                    </div>
                </div>
            </section>
        </main>
    );
}
