import Image from "next/image";
import { Leaf, Wind, Droplets, Target } from "lucide-react";

export default function BioinspirationPage() {
    return (
        <main className="bg-slate-50 pt-20">
            {/* Hero Section */}
            <section className="relative h-[550px] flex items-center justify-center bg-slate-900 overflow-hidden">
                <Image 
                    src="/uploads/bioinspiration-hero.jpg" 
                    alt="Bioinspiration"
                    fill 
                    className="object-cover opacity-50"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-slate-900/80" />
                <div className="relative z-10 text-center px-6 max-w-4xl">
                    <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-emerald-400/30 bg-emerald-500/10 text-emerald-300 text-sm font-medium mb-6 backdrop-blur-md">
                        Research Area
                    </span>
                    <h1 className="text-5xl sm:text-7xl font-bold text-white tracking-tight mb-6">
                        Bioinspiration
                    </h1>
                    <p className="text-xl text-slate-200 max-w-2xl mx-auto leading-relaxed font-light">
                        Learning from 3.8 billion years of nature's R&D to solve complex engineering challenges.
                    </p>
                </div>
            </section>

            {/* Introduction */}
            <section className="max-w-7xl mx-auto px-6 lg:px-8 -mt-24 relative z-20">
                <div className="bg-white rounded-[2.5rem] shadow-xl border border-slate-200 p-8 sm:p-12">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                        <div className="lg:col-span-2">
                            <h2 className="text-3xl font-bold text-slate-900 mb-6">Nature as a Blue-Print</h2>
                            <p className="text-lg text-slate-600 leading-relaxed mb-6">
                                Evolution has solved most of the engineering challenges we face today—from efficient desalination to high-strength, lightweight structures. Our research focuses on identifying these biological strategies and abstracting their underlying principles for synthetic applications.
                            </p>
                            <p className="text-lg text-slate-600 leading-relaxed">
                                Beyond just mimicking form (biomimicry), we focus on **Bio-inspiration**: understanding the functional logic of life to design materials and systems that are more sustainable, efficient, and resilient.
                            </p>
                        </div>
                        <div className="bg-emerald-50 rounded-3xl p-8 flex flex-col justify-center border border-emerald-100">
                            <Leaf className="w-10 h-10 text-emerald-600 mb-4" />
                            <h3 className="text-xl font-bold text-slate-900 mb-2">Philosophy</h3>
                            <p className="text-sm text-slate-500 italic">"The more our world functions like the natural world, the more likely we are to endure on this home that is ours, but not only ours."</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Focus Sections */}
            <section className="max-w-7xl mx-auto px-6 lg:px-8 py-24">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="group p-8 bg-white border border-slate-200 rounded-3xl hover:border-emerald-300 transition-all duration-300">
                        <div className="w-12 h-12 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-600 mb-6 group-hover:scale-110 transition-transform">
                            <Wind className="w-6 h-6" />
                        </div>
                        <h4 className="text-xl font-bold text-slate-900 mb-3">Fluid Dynamics</h4>
                        <p className="text-slate-500 leading-relaxed">Investigation of low-drag surfaces inspired by shark skin and optimized airfoils based on owl feathers.</p>
                    </div>
                    <div className="group p-8 bg-white border border-slate-200 rounded-3xl hover:border-emerald-300 transition-all duration-300">
                        <div className="w-12 h-12 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-600 mb-6 group-hover:scale-110 transition-transform">
                            <Droplets className="w-6 h-6" />
                        </div>
                        <h4 className="text-xl font-bold text-slate-900 mb-3">Surface Wetting</h4>
                        <p className="text-slate-500 leading-relaxed">Designing super-hydrophobic and anti-fouling surfaces based on the lotus effect and pitcher plant structures.</p>
                    </div>
                    <div className="group p-8 bg-white border border-slate-200 rounded-3xl hover:border-emerald-300 transition-all duration-300">
                        <div className="w-12 h-12 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-600 mb-6 group-hover:scale-110 transition-transform">
                            <Target className="w-6 h-6" />
                        </div>
                        <h4 className="text-xl font-bold text-slate-900 mb-3">Structural Color</h4>
                        <p className="text-slate-500 leading-relaxed">Developing pigment-free colors and optic sensors inspired by butterfly wings and beetle carapaces.</p>
                    </div>
                </div>
            </section>

            {/* Gallery/Showcase */}
            <section className="bg-slate-900 py-24 text-white overflow-hidden">
                <div className="max-w-7xl mx-auto px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <div className="relative">
                        <div className="absolute -top-20 -left-20 w-64 h-64 bg-emerald-500/20 rounded-full blur-3xl" />
                        <h3 className="text-3xl font-bold mb-6">From Biology to Technology</h3>
                        <p className="text-slate-400 text-lg mb-8 leading-relaxed">
                            Our laboratory bridges the gap between biological observation and engineering fabrication. We utilize state-of-the-art 3D nanoprinting and molecular assembly to bring bio-inspired designs to life.
                        </p>
                        <div className="flex gap-4">
                            <div className="flex flex-col">
                                <span className="text-4xl font-bold text-emerald-400">15+</span>
                                <span className="text-sm text-slate-500 uppercase tracking-widest mt-1">Bio-patents</span>
                            </div>
                            <div className="w-px h-12 bg-slate-800" />
                            <div className="flex flex-col">
                                <span className="text-4xl font-bold text-emerald-400">4</span>
                                <span className="text-sm text-slate-500 uppercase tracking-widest mt-1">Spin-off Prototypes</span>
                            </div>
                        </div>
                    </div>
                    <div className="aspect-square rounded-[3rem] overflow-hidden bg-slate-800 border border-slate-700 relative">
                        <Image 
                            src="/uploads/bioinspiration-nature.jpg" 
                            alt="Nature Pattern"
                            fill
                            className="object-cover"
                        />
                    </div>
                </div>
            </section>
        </main>
    );
}
