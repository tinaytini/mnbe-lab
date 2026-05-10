import React from "react";
import { Activity, Zap, Layers, Microscope } from "lucide-react";

export default function BiomechanicsPage() {
    return (
        <main className="bg-slate-50 pt-20">
            {/* Hero Section */}
            <section className="relative h-[500px] flex items-center justify-center bg-slate-900 overflow-hidden">
                <div className="absolute inset-0 opacity-40">
                    <img 
                        src="https://images.unsplash.com/photo-1530026405186-ed1f139313f8?auto=format&fit=crop&q=80&w=2000" 
                        alt="Biomechanics"
                        className="w-full h-full object-cover"
                    />
                </div>
                <div className="relative z-10 text-center px-6 max-w-4xl">
                    <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-brand-400/30 bg-brand-500/10 text-brand-300 text-sm font-medium mb-6 backdrop-blur-md">
                        Research Area
                    </span>
                    <h1 className="text-5xl sm:text-7xl font-bold text-white tracking-tight mb-6">
                        Biomechanics
                    </h1>
                    <p className="text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
                        Studying the mechanical principles of living organisms at the molecular, cellular, and tissue levels.
                    </p>
                </div>
                <div className="absolute bottom-0 left-0 right-0 h-32 bg-linear-to-t from-slate-50 to-transparent" />
            </section>

            {/* Content Section */}
            <section className="max-w-7xl mx-auto px-6 lg:px-8 py-24">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
                    <div>
                        <h2 className="text-3xl font-bold text-slate-900 mb-6">Understanding Biological Motion</h2>
                        <div className="space-y-6 text-lg text-slate-600 leading-relaxed">
                            <p>
                                At the MNBE Lab, our Biomechanics research focuses on the intersection of physical forces and biological systems. We investigate how mechanical stimuli influence cellular behavior and how organisms adapt to their physical environment.
                            </p>
                            <p>
                                Our work spans from the viscoelastic properties of single DNA molecules to the complex locomotion strategies of microorganisms. By deciphering these mechanical "rules," we can engineer new bio-inspired systems and therapeutic interventions.
                            </p>
                        </div>

                        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <div className="p-6 bg-white rounded-2xl border border-slate-200 shadow-sm">
                                <Activity className="w-8 h-8 text-brand-500 mb-4" />
                                <h3 className="font-bold text-slate-800 mb-2">Cellular Mechanotransduction</h3>
                                <p className="text-sm text-slate-500 text-balance">Investigating how cells convert mechanical signals into biochemical responses.</p>
                            </div>
                            <div className="p-6 bg-white rounded-2xl border border-slate-200 shadow-sm">
                                <Zap className="w-8 h-8 text-brand-500 mb-4" />
                                <h3 className="font-bold text-slate-800 mb-2">Molecular Motors</h3>
                                <p className="text-sm text-slate-500 text-balance">Analysis of force generation and energy conversion in molecular-scale machines.</p>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-8">
                        <div className="aspect-video rounded-3xl overflow-hidden shadow-2xl bg-slate-200">
                             <img 
                                src="https://images.unsplash.com/photo-1576086213369-97a306d36557?auto=format&fit=crop&q=80&w=1000" 
                                alt="Lab Research"
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <div className="bg-brand-600 rounded-3xl p-8 text-white">
                            <h3 className="text-xl font-bold mb-4">Current Focus Areas</h3>
                            <ul className="space-y-4">
                                <li className="flex items-start gap-3">
                                    <Layers className="w-5 h-5 text-brand-200 shrink-0 mt-1" />
                                    <span>High-frequency rheology of biological hydrogels</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <Microscope className="w-5 h-5 text-brand-200 shrink-0 mt-1" />
                                    <span>Mechanical phenotyping of diseased vs. healthy cells</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <Activity className="w-5 h-5 text-brand-200 shrink-0 mt-1" />
                                    <span>Bio-hybrid actuators for microrobotics</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
