const facilities = [
    {
        icon: "🔬",
        name: "Advanced Electron Microscopy Suite",
        description:
            "State-of-the-art TEM and SEM instruments capable of sub-ångström resolution imaging of biological nanostructures.",
        specs: ["FEI Titan Themis TEM", "Zeiss Merlin SEM", "Cryo-EM stage"],
    },
    {
        icon: "🧫",
        name: "Biosafety Level 2 Lab",
        description:
            "Fully equipped BSL-2 cell culture facility for mammalian cell studies, transfection, and live-cell imaging.",
        specs: ["Class II biosafety cabinets", "CO₂ incubators", "TIRF microscopy"],
    },
    {
        icon: "⚗️",
        name: "Nanofabrication Cleanroom",
        description:
            "ISO Class 5 cleanroom for photolithography, soft lithography, and microfluidic device fabrication.",
        specs: ["UV Nanoimprint Lithography", "Plasma etchers", "Spin coaters"],
    },
    {
        icon: "📡",
        name: "Spectroscopy & Analytics",
        description:
            "Comprehensive analytical suite for characterising nanoparticles, DNA assemblies, and biomolecular interactions.",
        specs: ["NMR 600 MHz", "FTIR / Raman", "DLS & Zeta potential"],
    },
    {
        icon: "💻",
        name: "High-Performance Computing Cluster",
        description:
            "In-house HPC cluster for molecular dynamics simulations, AI-assisted nanostructure design, and data analysis.",
        specs: ["128-core CPU nodes", "NVIDIA A100 GPUs", "100 TB NAS storage"],
    },
    {
        icon: "🌡️",
        name: "Calorimetry & Thermodynamics Lab",
        description:
            "Dedicated facility for measuring thermodynamic stability and binding kinetics of molecular assemblies.",
        specs: ["MicroCal PEAQ-ITC", "DSC", "Fluorescence calorimeter"],
    },
];

export default function FacilitiesPage() {
    return (
        <main className="min-h-screen bg-white pt-24 pb-20">
            {/* Header */}
            <section className="max-w-5xl mx-auto px-6 lg:px-8 text-center mb-16">
                <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-brand-100 bg-brand-50 text-brand-500 text-sm font-medium mb-6">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-500 animate-pulse" />
                    Our Infrastructure
                </span>
                <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 tracking-tight mb-4">Facilities</h1>
                <p className="text-lg text-slate-500 max-w-2xl mx-auto leading-relaxed">
                    World-class instrumentation and laboratories supporting cutting-edge research
                    in nanoscale biosystems engineering.
                </p>
            </section>

            {/* Facilities grid */}
            <section className="max-w-6xl mx-auto px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {facilities.map((f) => (
                    <div
                        key={f.name}
                        className="group bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-lg hover:border-brand-100 transition-all duration-200 overflow-hidden"
                    >
                        <div className="p-6">
                            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-brand-50 to-brand-50 flex items-center justify-center text-2xl mb-5 group-hover:scale-105 transition-transform">
                                {f.icon}
                            </div>
                            <h2 className="text-base font-semibold text-slate-800 mb-2 group-hover:text-brand-600 transition-colors">
                                {f.name}
                            </h2>
                            <p className="text-sm text-slate-500 leading-relaxed mb-4">{f.description}</p>
                            <ul className="flex flex-col gap-1.5">
                                {f.specs.map((s) => (
                                    <li key={s} className="flex items-center gap-2 text-xs text-slate-600">
                                        <span className="w-1.5 h-1.5 rounded-full bg-brand-300 flex-shrink-0" />
                                        {s}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="h-1 bg-gradient-to-r from-brand-500 to-brand-400 scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
                    </div>
                ))}
            </section>
        </main>
    );
}
