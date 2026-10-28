// Single source of truth for site navigation, shared by the header (Navbar) and Footer
// so the two menus always stay in sync.

export type NavLink = {
    label: string;
    href: string;
    submenu?: { label: string; href: string }[];
};

export const NAV_LINKS: NavLink[] = [
    { label: "Home", href: "/" },
    {
        label: "Research",
        href: "/research",
        // Optional dropdown (header only) — uncomment to enable:
        // submenu: [
        //     { label: "Biomechanics", href: "/research/biomechanics" },
        //     { label: "Biosensing", href: "/research/biosensing" },
        //     { label: "Bioinspiration", href: "/research/bioinspiration" },
        // ],
    },
    { label: "Publications", href: "/publications" },
    { label: "People", href: "/people" },
    { label: "Facilities", href: "/facilities" },
    { label: "News", href: "/news" },
    { label: "Contact", href: "/contact" },
];
