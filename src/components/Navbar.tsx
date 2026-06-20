"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "./Logo";

type NavLink = {
    label: string;
    href: string;
    submenu?: { label: string; href: string }[];
};

const links: NavLink[] = [
    { label: "Home", href: "/" },
    // {
    //     label: "Research Areas",
    //     href: "/research",
    //     submenu: [
    //         { label: "Biomechanics", href: "/research/biomechanics" },
    //         { label: "Biosensing", href: "/research/biosensing" },
    //         { label: "Bioinspiration", href: "/research/bioinspiration" },
    //     ]
    // },
    { label: "Publications & Achievements", href: "/publications" },
    { label: "People", href: "/people" },
    { label: "Facilities", href: "/facilities" },
    { label: "News", href: "/news" },
    { label: "Contact", href: "/contact" },
];

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const pathname = usePathname();

    // Treat the hero page as "dark" background; all others are light
    const isHero = pathname === "/";

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    // On non-hero pages, always show the light/solid style
    const solid = scrolled || !isHero;

    return (
        <header
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${solid
                ? "bg-white/90 backdrop-blur-md shadow-sm border-b border-slate-200/60"
                : "bg-transparent"
                }`}
        >
            <nav className="max-w-7xl mx-auto px-6 lg:px-8 flex items-center justify-between py-3">
                {/* Logo */}
                <Logo solid={solid} />

                {/* Desktop Links */}
                <ul className="hidden lg:flex items-center gap-1">
                    {links.map((link) => {
                        const active =
                            link.href === "/"
                                ? pathname === "/"
                                : pathname.startsWith(link.href);

                        return (
                            <li key={link.href} className="relative group/parent">
                                {link.submenu ? (
                                    <div className="relative">
                                        <Link
                                            href={link.href}
                                            className={`relative px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-1 ${solid
                                                ? active
                                                    ? "text-brand-500 bg-brand-50"
                                                    : "text-slate-600 hover:text-brand-500 hover:bg-brand-50"
                                                : active
                                                    ? "text-white bg-white/15"
                                                    : "text-white/80 hover:text-white hover:bg-white/10"
                                                }`}
                                        >
                                            {link.label}
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 opacity-50 group-hover/parent:rotate-180 transition-transform duration-200">
                                                <path fillRule="evenodd" d="M5.22 8.22a.75.75 0 011.06 0L10 11.94l3.72-3.72a.75.75 0 111.06 1.06l-4.25 4.25a.75.75 0 01-1.06 0L5.22 9.28a.75.75 0 010-1.06z" clipRule="evenodd" />
                                            </svg>
                                        </Link>
                                        {/* Dropdown Menu */}
                                        <div className="absolute top-full left-0 pt-2 opacity-0 translate-y-2 invisible group-hover/parent:opacity-100 group-hover/parent:translate-y-0 group-hover/parent:visible transition-all duration-200 z-50">
                                            <div className="bg-white rounded-xl shadow-xl border border-slate-200 py-2 w-48 overflow-hidden">
                                                {link.submenu.map((sub) => (
                                                    <Link
                                                        key={sub.href}
                                                        href={sub.href}
                                                        className="block px-4 py-2 text-sm text-slate-600 hover:text-brand-500 hover:bg-brand-50 transition-colors"
                                                    >
                                                        {sub.label}
                                                    </Link>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <Link
                                        href={link.href}
                                        className={`relative px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${solid
                                            ? active
                                                ? "text-brand-500 bg-brand-50"
                                                : "text-slate-600 hover:text-brand-500 hover:bg-brand-50"
                                            : active
                                                ? "text-white bg-white/15"
                                                : "text-white/80 hover:text-white hover:bg-white/10"
                                            }`}
                                    >
                                        {link.label}
                                        {active && (
                                            <span className="absolute bottom-1 left-4 right-4 h-[2px] rounded-full bg-brand-500" />
                                        )}
                                    </Link>
                                )}
                            </li>
                        );
                    })}
                </ul>

                {/* Mobile Hamburger */}
                <button
                    onClick={() => setMenuOpen((v) => !v)}
                    aria-label="Toggle menu"
                    className={`lg:hidden flex flex-col gap-1.5 p-2 rounded-lg transition-colors ${solid ? "hover:bg-slate-100" : "hover:bg-white/10"
                        }`}
                >
                    {[0, 1, 2].map((i) => (
                        <span
                            key={i}
                            className={`block h-0.5 w-5 rounded-full transition-all duration-300 ${solid ? "bg-slate-700" : "bg-white"
                                } ${menuOpen && i === 0
                                    ? "translate-y-2 rotate-45"
                                    : menuOpen && i === 1
                                        ? "opacity-0 scale-x-0"
                                        : menuOpen && i === 2
                                            ? "-translate-y-2 -rotate-45"
                                            : ""
                                }`}
                        />
                    ))}
                </button>
            </nav>

            {/* Mobile Menu Dropdown */}
            <div
                className={`lg:hidden overflow-hidden transition-all duration-300 ${menuOpen ? "max-h-[80vh] opacity-100" : "max-h-0 opacity-0"
                    } bg-white/95 backdrop-blur-md border-b border-slate-200/60`}
            >
                <ul className="flex flex-col px-6 py-3 gap-1 overflow-y-auto">
                    {links.map((link) => {
                        const active =
                            link.href === "/"
                                ? pathname === "/"
                                : pathname.startsWith(link.href);
                        return (
                            <li key={link.href} className="flex flex-col gap-1">
                                <Link
                                    href={link.href}
                                    onClick={() => setMenuOpen(false)}
                                    className={`block px-4 py-3 rounded-lg text-sm font-medium transition-colors ${active
                                        ? "text-brand-500 bg-brand-50"
                                        : "text-slate-600 hover:text-brand-500 hover:bg-brand-50"
                                        }`}
                                >
                                    {link.label}
                                </Link>
                                {link.submenu && (
                                    <div className="flex flex-col gap-1 ml-4 border-l border-slate-100 mb-2">
                                        {link.submenu.map((sub) => (
                                            <Link
                                                key={sub.href}
                                                href={sub.href}
                                                onClick={() => setMenuOpen(false)}
                                                className="block px-4 py-2 text-sm text-slate-500 hover:text-brand-500 transition-colors"
                                            >
                                                {sub.label}
                                            </Link>
                                        ))}
                                    </div>
                                )}
                            </li>
                        );
                    })}
                </ul>
            </div>
        </header>
    );
}
