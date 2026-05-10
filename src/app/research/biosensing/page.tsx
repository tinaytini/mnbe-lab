import React from "react";
import { Radio, Search, ShieldCheck, Cpu } from "lucide-react";

export default function BiosensingPage() {
    return (
        <main className="bg-slate-50 pt-20">
            {/* Hero Section */}
            <section className="relative h-[500px] flex items-center justify-center bg-slate-900 overflow-hidden">
                <div className="absolute inset-0 opacity-40">
                    <img 
                        src="https://images.unsplash.com/photo-1576086213369-97a306d36557?auto=format&fit=crop&q=80&w=2000" 
                        alt="Biosensing"
                        className="w-full h-full object-cover"
                    />
                </div>
                <div className="relative z-10 text-center px-6 max-w-4xl">
                    <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-teal-400/30 bg-teal-500/10 text-teal-300 text-sm font-medium mb-6 backdrop-blur-md">
                        Research Area
                    </span>
                    <h1 className="text-5xl sm:text-7xl font-bold text-white tracking-tight mb-6">
                        Biosensing
                    </h1>
                    <p className="text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
                        Developing ultra-sensitive detection platforms for point-of-care diagnostics and environmental monitoring.
                    </p>
                </div>
                <div className="absolute bottom-0 left-0 right-0 h-32 bg-linear-to-t from-slate-50 to-transparent" />
            </section>

            {/* Content Section */}
            <section className="max-w-7xl mx-auto px-6 lg:px-8 py-24">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
                    <div className="order-2 lg:order-1">
                        <div className="aspect-square rounded-3xl overflow-hidden shadow-2xl bg-slate-200">
                             <img 
                                src="https://images.unsplash.com/photo-1581093588401-fbb62a02f120?auto=format&fit=crop&q=80&w=1000" 
                                alt="Nanochip"
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <div className="mt-8 grid grid-cols-2 gap-4">
                            <div className="h-40 bg-white rounded-2xl border border-slate-200 p-6 flex flex-col justify-center text-center">
                                <span className="text-3xl font-bold text-teal-600">10⁻¹⁸ M</span>
                                <span className="text-sm text-slate-500 mt-1">Detection Limit</span>
                            </div>
                            <div className="h-40 bg-white rounded-2xl border border-slate-200 p-6 flex flex-col justify-center text-center">
                                <span className="text-3xl font-bold text-teal-600">&lt; 5 min</span>
                                <span className="text-sm text-slate-500 mt-1">Response Time</span>
                            </div>
                        </div>
                    </div>

                    <div className="order-1 lg:order-2">
                        <h2 className="text-3xl font-bold text-slate-900 mb-6">Precision Molecular Detection</h2>
                        <div className="space-y-6 text-lg text-slate-600 leading-relaxed">
                            <p>
                                Biosensing is the cornerstone of modern precision medicine. Our research focuses on leveraging nanostructures—particularly DNA origami and carbon nanotubes—to create transducers that can detect single molecules of DNA, RNA, and protein biomarkers.
                            </p>
                            <p>
                                By integrating these biological interfaces with advanced electronics, we create portable, high-throughput devices that provide laboratory-grade accuracy in a mobile format.
                            </p>
                        </div>

                        <div className="mt-12 space-y-4">
                            <div className="p-6 bg-white rounded-2xl border border-slate-200 shadow-sm flex items-start gap-4">
                                <Radio className="w-8 h-8 text-teal-500 shrink-0" />
                                <div>
                                    <h3 className="font-bold text-slate-800 mb-1">Nanosurface Engineering</h3>
                                    <p className="text-sm text-slate-500">Atomic-scale modification of sensor surfaces to eliminate non-specific binding.</p>
                                </div>
                            </div>
                            <div className="p-6 bg-white rounded-2xl border border-slate-200 shadow-sm flex items-start gap-4">
                                <ShieldCheck className="w-8 h-8 text-teal-500 shrink-0" />
                                <div>
                                    <h3 className="font-bold text-slate-800 mb-1">Point-of-Care Diagnostics</h3>
                                    <p className="text-sm text-slate-500">Developing rapid tests for infectious diseases that can be used in remote settings.</p>
                                </div>
                            </div>
                            <div className="p-6 bg-white rounded-2xl border border-slate-200 shadow-sm flex items-start gap-4">
                                <Cpu className="w-8 h-8 text-teal-500 shrink-0" />
                                <div>
                                    <h3 className="font-bold text-slate-800 mb-1">Bio-Silicon Integration</h3>
                                    <p className="text-sm text-slate-500">Fusing biological recognition elements with CMOS-compatible technologies.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
