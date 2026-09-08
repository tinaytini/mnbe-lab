import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Admin | YAS Lab",
    description: "Content management dashboard for the YAS Lab website.",
    robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    return children;
}
