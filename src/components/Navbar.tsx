"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "./Logo";

const links = [
    { label: "Home", href: "/" },
    { label: "Research Areas", href: "/research" },
    { label: "Publications & Achievements", href: "/publications" },
    { label: "People", href: "/people" },
    { label: "Facilities", href: "/facilities" },
    { label: "Group Activities", href: "/group-activities" },
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
                            <li key={link.href}>
                                <Link
                                    href={link.href}
                                    className={`relative px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 group ${solid
                                        ? active
                                            ? "text-brand-500 bg-brand-50"
                                            : "text-slate-600 hover:text-brand-500 hover:bg-brand-50"
                                        : active
                                            ? "text-white bg-white/15"
                                            : "text-white/80 hover:text-white hover:bg-white/10"
                                        }`}
                                >
                                    {link.label}
                                    {/* Active underline indicator */}
                                    {active && (
                                        <span className="absolute bottom-1 left-4 right-4 h-[2px] rounded-full bg-brand-500" />
                                    )}
                                </Link>
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
                className={`lg:hidden overflow-hidden transition-all duration-300 ${menuOpen ? "max-h-64 opacity-100" : "max-h-0 opacity-0"
                    } bg-white/95 backdrop-blur-md border-b border-slate-200/60`}
            >
                <ul className="flex flex-col px-6 py-3 gap-1">
                    {links.map((link) => {
                        const active =
                            link.href === "/"
                                ? pathname === "/"
                                : pathname.startsWith(link.href);
                        return (
                            <li key={link.href}>
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
                            </li>
                        );
                    })}
                </ul>
            </div>
        </header>
    );
}
