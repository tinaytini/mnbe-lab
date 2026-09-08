"use client";

import { useEffect, useMemo, useState } from "react";

type Publication = {
    id: number;
    year: string;
    title: string;
    authors: string;
    journal: string;
    url?: string | null;
    description?: string | null;
};

const DESCRIPTION_LIMIT = 180;

function PublicationCard({ p }: { p: Publication }) {
    const [expanded, setExpanded] = useState(false);
    const isLong = (p.description?.length ?? 0) > DESCRIPTION_LIMIT;
    const shownDescription =
        p.description && isLong && !expanded
            ? p.description.slice(0, DESCRIPTION_LIMIT).trimEnd() + "…"
            : p.description;

    const CardContent = (
        <div
            className={`group flex gap-5 p-6 rounded-2xl border border-slate-200 bg-white hover:border-brand-100 hover:shadow-md transition-all duration-200 ${p.url ? "cursor-pointer" : ""}`}
        >
            <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-brand-50 flex items-center justify-center text-brand-500 font-bold text-sm">
                {p.year}
            </div>
            <div className="flex flex-col gap-1 w-full">
                <h3 className="text-base font-semibold text-slate-800 group-hover:text-brand-600 transition-colors flex items-start justify-between gap-4">
                    <span>{p.title}</span>
                    {p.url && (
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 text-slate-300 group-hover:text-brand-500 flex-shrink-0 mt-0.5 transition-colors">
                            <path fillRule="evenodd" d="M5.22 14.78a.75.75 0 001.06 0l7.22-7.22v5.69a.75.75 0 001.5 0v-7.5a.75.75 0 00-.75-.75h-7.5a.75.75 0 000 1.5h5.69l-7.22 7.22a.75.75 0 000 1.06z" clipRule="evenodd" />
                        </svg>
                    )}
                </h3>
                <p className="text-sm text-slate-500">{p.authors}</p>
                <div className="flex items-center gap-2 mt-1 flex-wrap">
                    <span className="text-xs font-medium text-brand-500 bg-brand-50 px-2.5 py-0.5 rounded-full">
                        {p.journal}
                    </span>
                    <span className="text-xs text-slate-400">Journal Article</span>
                </div>
                {p.description && (
                    <p className="text-sm text-slate-500 mt-2 leading-relaxed">
                        {shownDescription}
                        {isLong && (
                            <button
                                type="button"
                                onClick={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    setExpanded((v) => !v);
                                }}
                                className="ml-1.5 text-brand-500 hover:text-brand-600 font-medium whitespace-nowrap"
                            >
                                {expanded ? "Show less" : "Read more"}
                            </button>
                        )}
                    </p>
                )}
            </div>
        </div>
    );

    return p.url ? (
        <a key={p.id} href={p.url} target="_blank" rel="noopener noreferrer" className="block focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2 rounded-2xl">
            {CardContent}
        </a>
    ) : (
        <div key={p.id}>{CardContent}</div>
    );
}

export default function PublicationsList({ pubs }: { pubs: Publication[] }) {
    const [query, setQuery] = useState("");
    const [debouncedQuery, setDebouncedQuery] = useState("");
    const [year, setYear] = useState<string>("all");

    // Debounce the search input so filtering doesn't recompute on every keystroke
    useEffect(() => {
        const timeout = setTimeout(() => setDebouncedQuery(query), 300);
        return () => clearTimeout(timeout);
    }, [query]);

    const years = useMemo(() => {
        const unique = Array.from(new Set(pubs.map((p) => p.year)));
        return unique.sort((a, b) => Number(b) - Number(a));
    }, [pubs]);

    const filtered = useMemo(() => {
        const q = debouncedQuery.trim().toLowerCase();
        return pubs.filter((p) => {
            const matchesYear = year === "all" || p.year === year;
            if (!matchesYear) return false;
            if (!q) return true;
            return (
                p.title.toLowerCase().includes(q) ||
                p.authors.toLowerCase().includes(q) ||
                p.journal.toLowerCase().includes(q)
            );
        });
    }, [pubs, debouncedQuery, year]);

    return (
        <div className="flex flex-col gap-6">
            {/* Search + year filter */}
            <div className="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
                <div className="relative w-full sm:max-w-xs">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300">
                        <path fillRule="evenodd" d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z" clipRule="evenodd" />
                    </svg>
                    <input
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Search by title, author, or journal…"
                        className="w-full pl-10 pr-9 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-300 focus:border-transparent transition"
                    />
                    {query !== debouncedQuery && (
                        <span className="absolute right-3.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 border-2 border-slate-200 border-t-brand-400 rounded-full animate-spin" />
                    )}
                </div>

                <div className="flex flex-wrap gap-1.5">
                    <button
                        onClick={() => setYear("all")}
                        className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-colors ${year === "all" ? "bg-brand-500 text-white" : "bg-slate-100 text-slate-500 hover:bg-slate-200"
                            }`}
                    >
                        All
                    </button>
                    {years.map((y) => (
                        <button
                            key={y}
                            onClick={() => setYear(y)}
                            className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-colors ${year === y ? "bg-brand-500 text-white" : "bg-slate-100 text-slate-500 hover:bg-slate-200"
                                }`}
                        >
                            {y}
                        </button>
                    ))}
                </div>
            </div>

            {/* Results */}
            {filtered.length === 0 ? (
                <div className="text-center py-16 text-slate-400">
                    <p className="text-4xl mb-3">🔎</p>
                    <p className="text-sm">No publications match your search.</p>
                </div>
            ) : (
                <div className="flex flex-col gap-4">
                    {filtered.map((p) => (
                        <PublicationCard key={p.id} p={p} />
                    ))}
                </div>
            )}
        </div>
    );
}
