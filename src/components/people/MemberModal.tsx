"use client";

import { useCallback, useEffect } from "react";
import { useRouter } from "next/navigation";

/**
 * Overlay used by the intercepted /people/[slug] route.
 * Closing it navigates back, which restores the /people URL.
 */
export default function MemberModal({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const close = useCallback(() => router.back(), [router]);

    useEffect(() => {
        const onKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") close();
        };
        document.addEventListener("keydown", onKey);
        const prevOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        return () => {
            document.removeEventListener("keydown", onKey);
            document.body.style.overflow = prevOverflow;
        };
    }, [close]);

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4 animate-in fade-in duration-200"
            onClick={close}
        >
            <div
                role="dialog"
                aria-modal="true"
                className="bg-white rounded-3xl max-w-2xl w-full p-8 shadow-2xl overflow-y-auto max-h-[90vh] animate-in zoom-in-95 duration-200 relative"
                onClick={(e) => e.stopPropagation()}
            >
                <button
                    onClick={close}
                    aria-label="Close"
                    className="absolute top-6 right-6 w-8 h-8 flex items-center justify-center rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200 hover:text-slate-700 transition-colors"
                >
                    ✕
                </button>
                {children}
            </div>
        </div>
    );
}
