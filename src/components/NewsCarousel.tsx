"use client";

import { useState } from "react";
import Link from "next/link";

export type NewsItemData = {
    id: number;
    date: string;
    title: string;
    body: string;
    url?: string | null;
    photoUrl?: string | null;
};

export default function NewsCarousel({ items }: { items: NewsItemData[] }) {
    const [currentSlide, setCurrentSlide] = useState(0);

    // Group items into slides of 3
    const itemsPerSlide = 3;
    const numSlides = Math.ceil(items.length / itemsPerSlide) || 1;

    // Cap at 2 slides (6 items)
    const maxSlides = Math.min(numSlides, 2);

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % maxSlides);
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + maxSlides) % maxSlides);
    };

    // Get current items to show
    const startIndex = currentSlide * itemsPerSlide;
    const slideItems = items.slice(startIndex, startIndex + itemsPerSlide);

    if (items.length === 0) {
        return null;
    }

    return (
        <div className="relative w-full">
            {/* Cards container */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 min-h-[400px]">
                {slideItems.map((item) => (
                    <Link
                        key={item.id}
                        href={`/news/${item.id}`}
                        className="group flex flex-col gap-5 p-6 rounded-2xl bg-white/[0.05] border border-white/10 hover:bg-white/[0.09] hover:border-white/20 transition-all duration-200 backdrop-blur-sm animate-in fade-in slide-in-from-bottom-4 h-full cursor-pointer focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2 focus:ring-offset-slate-900"
                    >
                        {item.photoUrl && (
                            <div className="flex-shrink-0 w-full h-48 rounded-xl overflow-hidden bg-white/5 relative shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-white/5 group-hover:border-brand-500/30 transition-colors duration-300">
                                {/* Blurred copy fills the letterbox around the full, uncropped image */}
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img src={item.photoUrl} alt="" aria-hidden className="absolute inset-0 w-full h-full object-cover scale-110 blur-xl opacity-50" />
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                    src={item.photoUrl}
                                    alt={item.title}
                                    className="relative w-full h-full object-contain transition-transform duration-500 group-hover:scale-[1.02]"
                                />
                            </div>
                        )}
                        <div className="flex flex-col flex-1 min-w-0">
                            <span className="text-xs font-semibold text-brand-300 uppercase tracking-widest mb-2 block">
                                {item.date}
                            </span>
                            <h3 className="flex items-start justify-between gap-3 text-base font-semibold text-white mb-2 leading-snug group-hover:text-brand-100 transition-colors">
                                <span>{item.title}</span>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                    className="w-4 h-4 text-white/30 group-hover:text-brand-300 flex-shrink-0 mt-0.5 transition-colors"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </h3>
                            <p className="text-sm text-slate-400 leading-relaxed line-clamp-3 mb-4">{item.body}</p>
                            <span className="mt-auto text-xs font-semibold text-brand-300 group-hover:text-white transition-colors">
                                Read full update →
                            </span>
                        </div>
                    </Link>
                ))}
            </div>

            {/* Slide Navigation Controls */}
            {maxSlides > 1 && (
                <div className="flex items-center justify-center gap-4 mt-8">
                    <button
                        onClick={prevSlide}
                        className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-brand-300 hover:bg-white/10 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-brand-500"
                        aria-label="Previous slide"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                        </svg>
                    </button>

                    <div className="flex gap-2">
                        {Array.from({ length: maxSlides }).map((_, i) => (
                            <button
                                key={i}
                                onClick={() => setCurrentSlide(i)}
                                className={`w-2 h-2 rounded-full transition-all duration-300 ${i === currentSlide ? "bg-brand-400 w-6" : "bg-white/20 hover:bg-white/40"
                                    }`}
                                aria-label={`Go to slide ${i + 1}`}
                            />
                        ))}
                    </div>

                    <button
                        onClick={nextSlide}
                        className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-brand-300 hover:bg-white/10 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-brand-500"
                        aria-label="Next slide"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                        </svg>
                    </button>
                </div>
            )}
        </div>
    );
}
