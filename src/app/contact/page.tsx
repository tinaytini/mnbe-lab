export default function ContactPage() {
    return (
        <main className="min-h-screen bg-slate-50 pt-24 pb-20">
            {/* Header */}
            <section className="max-w-4xl mx-auto px-6 lg:px-8 text-center mb-14">
                <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-brand-100 bg-brand-50 text-brand-500 text-sm font-medium mb-6">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-500 animate-pulse" />
                    Get in Touch
                </span>
                <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 tracking-tight mb-4">
                    Contact Us
                </h1>
                <p className="text-lg text-slate-500 max-w-xl mx-auto">
                    Interested in collaborating, joining the lab, or learning more about our
                    research? We&apos;d love to hear from you.
                </p>
            </section>

            <div className="max-w-4xl mx-auto px-6 lg:px-8 grid grid-cols-1 md:grid-cols-5 gap-8">
                {/* Contact info */}
                <div className="md:col-span-2 flex flex-col gap-5">
                    {[
                        {
                            icon: "📍",
                            label: "Address",
                            value: "Institute of Nanoscience\nEngineering Building, Room 4.12\nUniversity Campus",
                        },
                        {
                            icon: "✉️",
                            label: "Email",
                            value: "contact@mnbelab.ac",
                        },
                        {
                            icon: "📞",
                            label: "Phone",
                            value: "+1 (555) 000-0000",
                        },
                    ].map((item) => (
                        <div
                            key={item.label}
                            className="flex gap-4 p-5 bg-white rounded-2xl border border-slate-200 shadow-sm"
                        >
                            <span className="text-2xl flex-shrink-0">{item.icon}</span>
                            <div>
                                <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-1">
                                    {item.label}
                                </p>
                                <p className="text-sm text-slate-700 whitespace-pre-line">{item.value}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Contact form */}
                <form className="md:col-span-3 bg-white rounded-2xl border border-slate-200 shadow-sm p-8 flex flex-col gap-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <label className="flex flex-col gap-1.5">
                            <span className="text-xs font-semibold text-slate-500 uppercase tracking-widest">Name</span>
                            <input
                                type="text"
                                placeholder="Jane Smith"
                                className="px-4 py-3 rounded-xl border border-slate-200 text-sm text-slate-800 placeholder:text-slate-300 focus:outline-none focus:ring-2 focus:ring-brand-300 focus:border-transparent transition"
                            />
                        </label>
                        <label className="flex flex-col gap-1.5">
                            <span className="text-xs font-semibold text-slate-500 uppercase tracking-widest">Email</span>
                            <input
                                type="email"
                                placeholder="jane@university.edu"
                                className="px-4 py-3 rounded-xl border border-slate-200 text-sm text-slate-800 placeholder:text-slate-300 focus:outline-none focus:ring-2 focus:ring-brand-300 focus:border-transparent transition"
                            />
                        </label>
                    </div>
                    <label className="flex flex-col gap-1.5">
                        <span className="text-xs font-semibold text-slate-500 uppercase tracking-widest">Subject</span>
                        <input
                            type="text"
                            placeholder="Collaboration Inquiry"
                            className="px-4 py-3 rounded-xl border border-slate-200 text-sm text-slate-800 placeholder:text-slate-300 focus:outline-none focus:ring-2 focus:ring-brand-300 focus:border-transparent transition"
                        />
                    </label>
                    <label className="flex flex-col gap-1.5">
                        <span className="text-xs font-semibold text-slate-500 uppercase tracking-widest">Message</span>
                        <textarea
                            rows={5}
                            placeholder="Tell us about your interest…"
                            className="px-4 py-3 rounded-xl border border-slate-200 text-sm text-slate-800 placeholder:text-slate-300 focus:outline-none focus:ring-2 focus:ring-brand-300 focus:border-transparent transition resize-none"
                        />
                    </label>
                    <button
                        type="submit"
                        className="self-end inline-flex items-center gap-2 px-7 py-3 rounded-full bg-gradient-to-r from-brand-500 to-brand-400 text-white font-semibold text-sm shadow-lg shadow-brand-500/20 hover:shadow-brand-500/40 hover:scale-[1.02] transition-all duration-200"
                    >
                        Send Message
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            className="w-4 h-4"
                        >
                            <path d="M3.105 2.289a.75.75 0 00-.826.95l1.903 6.557H13.5a.75.75 0 010 1.5H4.182l-1.903 6.557a.75.75 0 00.826.95 28.896 28.896 0 0015.293-7.154.75.75 0 000-1.115A28.897 28.897 0 003.105 2.289z" />
                        </svg>
                    </button>
                </form>
            </div>
        </main>
    );
}
