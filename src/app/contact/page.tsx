import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Contact | YAS Lab",
    description: "Get in touch with the YAS Lab at NYU Abu Dhabi, or view open career opportunities with our research center.",
};

export default function ContactPage() {
    return (
        <main className="bg-slate-50 pt-24 pb-20">
            {/* Header */}
            <section className="max-w-6xl mx-auto px-6 lg:px-8 text-center mb-14">
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

            <div className="max-w-6xl mx-auto px-6 lg:px-8 grid grid-cols-1 md:grid-cols-5 gap-8">
                {/* Contact info */}
                <div className="md:col-span-2 flex flex-col gap-5">
                    {[
                        {
                            icon: "📍",
                            label: "Address",
                            value: "New York University Abu Dhabi\nPO Box 129188, Saadiyat Island, Abu Dhabi, United Arab Emirates",
                        },
                        {
                            icon: "✉️",
                            label: "Email",
                            value: "rafael.song@nyu.edu",
                        },
                        {
                            icon: "📞",
                            label: "Phone",
                            value: "+971-2-628-4000",
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

                {/* Careers callout */}
                <div className="md:col-span-3 bg-white rounded-2xl border border-slate-200 shadow-sm p-10 flex flex-col items-center justify-center text-center gap-4">
                    <h2 className="text-2xl font-bold text-slate-900">Join the MNBE Lab Team</h2>
                    <p className="text-sm text-slate-500 max-w-md leading-relaxed">
                        Looking for career opportunities with the Molecular &amp; Nanoscale
                        Biosystems Engineering Lab at NYU Abu Dhabi? Visit the official NYU Abu
                        Dhabi careers page to view all open positions within our research center.
                    </p>
                    <a
                        href="https://nyuad.nyu.edu/en/about/careers.html"
                        target="_blank"
                        rel="noreferrer"
                        className="mt-2 inline-flex items-center gap-2 px-7 py-3 rounded-full bg-gradient-to-r from-brand-500 to-brand-400 text-white font-semibold text-sm shadow-lg shadow-brand-500/20 hover:shadow-brand-500/40 hover:scale-[1.02] transition-all duration-200"
                    >
                        View Opportunities
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                            <path fillRule="evenodd" d="M4.25 5.5a.75.75 0 00-.75.75v8.5c0 .414.336.75.75.75h8.5a.75.75 0 00.75-.75v-4a.75.75 0 011.5 0v4A2.25 2.25 0 0112.75 17h-8.5A2.25 2.25 0 012 14.75v-8.5A2.25 2.25 0 014.25 4h4a.75.75 0 010 1.5h-4z" clipRule="evenodd" />
                            <path fillRule="evenodd" d="M6.194 12.753a.75.75 0 001.06.053L16.5 4.44v2.81a.75.75 0 001.5 0v-4.5a.75.75 0 00-.75-.75h-4.5a.75.75 0 000 1.5h2.553l-9.056 8.198a.75.75 0 00-.053 1.06z" clipRule="evenodd" />
                        </svg>
                    </a>
                </div>
            </div>
        </main>
    );
}
