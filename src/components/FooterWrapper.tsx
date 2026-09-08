"use client";

import { usePathname } from "next/navigation";
import Footer from "./Footer";

export default function FooterWrapper() {
    const pathname = usePathname();
    // Hide the public footer on the admin route
    if (pathname.startsWith("/admin")) return null;
    return <Footer />;
}
