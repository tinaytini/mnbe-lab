import Link from "next/link";
import Logo from "./Logo";

const navLinks = [
    { label: "Home", href: "/" },
    { label: "Research", href: "/research" },
    { label: "People", href: "/people" },
    { label: "Publications", href: "/publications" },
    { label: "Facilities", href: "/facilities" },
    { label: "News", href: "/news" },
    { label: "Contact", href: "/contact" },
];

export default function Footer() {
    return (
        <footer className="bg-brand-900 text-white">
            {/* ── Top row ───────────────────────────────────────── */}
            <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
                <div className="flex flex-col lg:flex-row items-center lg:items-start justify-between gap-10">
                    {/* Logo + tagline */}
                    <div className="flex flex-col items-center lg:items-start gap-3">
                        <Logo solid={false} />
                        <p className="text-sm text-brand-200 max-w-xs text-center lg:text-left leading-relaxed">
                            Molecular &amp; Nanoscale Biosystems Engineering Laboratory
                        </p>
                    </div>

                    {/* Navigation links */}
                    <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className="text-sm text-brand-200 hover:text-white transition-colors"
                            >
                                {link.label}
                            </Link>
                        ))}
                    </nav>

                    {/* Partner / University branding */}
                    <div className="flex flex-col items-center lg:items-end gap-2 text-brand-200">
                        <span className="text-sm font-medium text-white">NYU Abu Dhabi</span>
                        <span className="text-xs text-brand-300">Division of Engineering</span>
                    </div>
                </div>
            </div>

            {/* ── Divider ───────────────────────────────────────── */}
            <div className="border-t border-brand-700" />

            {/* ── Bottom row ─────────────────────────────────────── */}
            <div className="max-w-7xl mx-auto px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                {/* Copyright */}
                <p className="text-xs text-brand-300">
                    © {new Date().getFullYear()} MNBE Lab — Molecular &amp; Nanoscale Biosystems Engineering. All rights reserved.
                </p>

                {/* Social icons */}
                <div className="flex items-center gap-4">
                    {/* Email */}
                    <a href="mailto:contact@mnbelab.org" aria-label="Email" className="text-brand-300 hover:text-white transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                            <rect x="2" y="4" width="20" height="16" rx="2" />
                            <path d="m22 7-8.97 5.7a1.94 1.94 0 01-2.06 0L2 7" />
                        </svg>
                    </a>
                    {/* Instagram */}
                    <a href="#" aria-label="Instagram" className="text-brand-300 hover:text-white transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                            <rect x="2" y="2" width="20" height="20" rx="5" />
                            <circle cx="12" cy="12" r="5" />
                            <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
                        </svg>
                    </a>
                    {/* X / Twitter */}
                    <a href="#" aria-label="X (Twitter)" className="text-brand-300 hover:text-white transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                        </svg>
                    </a>
                    {/* LinkedIn */}
                    <a href="#" aria-label="LinkedIn" className="text-brand-300 hover:text-white transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                        </svg>
                    </a>
                </div>
            </div>
        </footer>
    );
}
