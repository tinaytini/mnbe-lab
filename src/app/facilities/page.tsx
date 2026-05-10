import Image from "next/image";

const facilities = [
    {
        title: "Mask Writer",
        description: "The Heidelberg DWL 66+ is a high-resolution direct write laser lithography system used for photomask making, maskless lithography, and direct writing applications. It enables the creation of complex micro-scale features with extreme precision.",
        image: "/uploads/facilities/mask-writer.png",
        specs: "High Resolution Laser System"
    },
    {
        title: "Mask Aligner",
        description: "Precision alignment system for UV lithography processes, essential for multi-layer microfabrication and semiconductor research.",
        image: "/uploads/facilities/mask-aligner.png",
        specs: "Sub-micron Alignment"
    },
    {
        title: "Nanoscribe 3D Printer",
        description: "State-of-the-art Two-Photon Polymerization (2PP) system for 3D microprinting. Capable of creating intricate structures at the nano and microscale for bio-scaffolds and micro-optics.",
        image: "/uploads/facilities/nanoscribe.png",
        specs: "Two-Photon Polymerization"
    },
    {
        title: "Bioprinter",
        description: "Advanced biofabrication system for printing 3D tissue-like structures and biocompatible materials. Used in our tissue engineering and regenerative medicine research.",
        image: "/uploads/facilities/bioprinter.jpg",
        specs: "Multi-material Printing"
    },
    {
        title: "Cell Imaging Microscope",
        description: "High-performance fluorescence imaging system for real-time monitoring of cellular responses and molecular interactions within our lab-on-a-chip devices.",
        image: "/uploads/facilities/cell-imaging-microscope.png",
        specs: "Confocal Fluorescence"
    },
    {
        title: "Reactive Ion Etcher (RIE)",
        description: "Dry etching system for high-precision removal of materials at the nanoscale. Essential for silicon and glass-based microfluidic device fabrication.",
        image: "/uploads/facilities/rie.jpg",
        specs: "Plasma Etching"
    },
    {
        title: "Surface Profiler",
        description: "High-resolution metrology tool for measuring surface topography, step heights, and roughness of fabricated microstructures.",
        image: "/uploads/facilities/surface-profiler.jpg",
        specs: "Nanoscale Metrology"
    },
    {
        title: "e-Beam Deposition",
        description: "Physical Vapor Deposition (PVD) system for depositing high-purity thin films of metals and dielectrics for electronic and optical applications.",
        image: "/uploads/facilities/ebeam-deposition.jpg",
        specs: "Thin Film Deposition"
    }
];

export default function FacilitiesPage() {
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
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
                    {facilities.map((item, idx) => (
                        <div 
                            key={idx} 
                            className="group bg-white rounded-[2rem] border border-slate-200 overflow-hidden shadow-xs hover:shadow-xl hover:border-brand-200 transition-all duration-500"
                        >
                            <div className="aspect-[4/3] relative bg-slate-100 overflow-hidden">
                                <Image
                                    src={item.image}
                                    alt={item.title}
                                    fill
                                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                                />
                                <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                <div className="absolute bottom-4 left-6 right-6 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                                    <span className="text-[11px] font-bold text-white uppercase tracking-[0.2em]">{item.specs}</span>
                                </div>
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
            </section>
        </main>
    );
}
