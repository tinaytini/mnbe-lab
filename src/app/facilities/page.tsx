const facilities: any[] = [];

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
                
                <div className="mt-20 py-12 px-6 bg-slate-50 rounded-3xl border border-dashed border-slate-200">
                    <p className="text-slate-400 text-sm font-medium italic">Information about specific lab facilities and instrumentation will be updated soon.</p>
                </div>
            </section>
        </main>
    );
}
