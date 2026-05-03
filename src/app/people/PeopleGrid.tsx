"use client";

import { useState } from "react";

type Member = {
    id: number;
    name: string;
    role: string;
    focus: string;
    email: string | null;
    originCountry: string | null;
    biography: string | null;
    photoUrl: string | null;
};

const roleEmoji: Record<string, string> = {
    "Principal Investigator": "👨‍🔬",
    "Senior Researcher": "👩‍🔬",
    "Postdoctoral Fellow": "🧑‍🔬",
    "PhD Candidate": "👩‍🎓",
    "MSc Student": "🧑‍🎓",
};

export default function PeopleGrid({ allMembers }: { allMembers: Member[] }) {
    const [selected, setSelected] = useState<Member | null>(null);

    return (
        <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {allMembers.map((m) => (
                    <div
                        key={m.id}
                        onClick={() => setSelected(m)}
                        className="flex flex-col items-center text-center p-6 bg-white rounded-2xl border border-slate-200 shadow-sm cursor-pointer hover:shadow-md hover:border-brand-200 hover:-translate-y-1 transition-all duration-200 gap-4 group"
                    >
                        <div className="w-24 h-24 rounded-full bg-linear-to-br from-brand-100 to-brand-100 flex items-center justify-center text-4xl overflow-hidden shrink-0">
                            {m.photoUrl
                                // eslint-disable-next-line @next/next/no-img-element
                                ? <img src={m.photoUrl} alt={m.name} className="w-full h-full object-cover" />
                                : (roleEmoji[m.role] ?? "🧑‍🔬")
                            }
                        </div>
                        <div className="flex flex-col items-center min-w-0 w-full">
                            <h3 className="text-base font-semibold text-slate-800 group-hover:text-brand-600 transition-colors">
                                {m.name}
                            </h3>
                            <p className="text-xs font-semibold text-brand-600 uppercase tracking-wider mt-1 mb-1.5">{m.role}</p>
                            {m.originCountry && <span className="text-xs text-slate-500 capitalize normal-case font-medium">🌍 {m.originCountry}</span>}
                            {m.email && <p className="text-xs text-slate-400 mt-2 truncate w-full" onClick={e => e.stopPropagation()}>✉️ <a href={`mailto:${m.email}`} className="hover:text-brand-500 hover:underline">{m.email}</a></p>}
                        </div>
                    </div>
                ))}
            </div>

            {/* Modal */}
            {selected && (
                <div 
                    className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4 animate-in fade-in duration-200"
                    onClick={() => setSelected(null)}
                >
                    <div 
                        className="bg-white rounded-3xl max-w-2xl w-full p-8 shadow-2xl overflow-y-auto max-h-[90vh] animate-in zoom-in-95 duration-200 relative"
                        onClick={e => e.stopPropagation()}
                    >
                        <button 
                            onClick={() => setSelected(null)}
                            className="absolute top-6 right-6 w-8 h-8 flex items-center justify-center rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200 hover:text-slate-700 transition-colors"
                        >
                            ✕
                        </button>

                        <div className="flex flex-col sm:flex-row gap-6 items-center sm:items-start text-center sm:text-left mb-8">
                            <div className="w-32 h-32 rounded-full bg-linear-to-br from-brand-100 to-brand-100 flex items-center justify-center text-5xl overflow-hidden shrink-0 shadow-inner">
                                {selected.photoUrl
                                    // eslint-disable-next-line @next/next/no-img-element
                                    ? <img src={selected.photoUrl} alt={selected.name} className="w-full h-full object-cover" />
                                    : (roleEmoji[selected.role] ?? "🧑‍🔬")
                                }
                            </div>
                            <div className="flex flex-col justify-center">
                                <h3 className="text-2xl font-bold text-slate-900">{selected.name}</h3>
                                <p className="text-sm font-semibold text-brand-600 uppercase tracking-wider mt-1 mb-2">{selected.role}</p>
                                {selected.originCountry && <span className="text-sm text-slate-500 capitalize normal-case mb-2">🌍 {selected.originCountry}</span>}
                                {selected.email && (
                                    <a href={`mailto:${selected.email}`} className="text-sm font-medium text-brand-500 hover:underline w-max mx-auto sm:mx-0">
                                        ✉️ {selected.email}
                                    </a>
                                )}
                            </div>
                        </div>

                        <div className="border-t border-slate-100 pt-6 mb-6">
                            <h4 className="text-sm font-semibold text-slate-900 uppercase tracking-wider mb-2">Research Focus</h4>
                            <p className="text-slate-600 leading-relaxed whitespace-pre-wrap text-sm">{selected.focus}</p>
                        </div>

                        {selected.biography && (
                            <div className="border-t border-slate-100 pt-6">
                                <h4 className="text-sm font-semibold text-slate-900 uppercase tracking-wider mb-2">Biography</h4>
                                <p className="text-slate-600 leading-relaxed whitespace-pre-wrap text-sm">{selected.biography}</p>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </>
    );
}
