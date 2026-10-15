import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import NavbarWrapper from "../components/NavbarWrapper";
import FooterWrapper from "../components/FooterWrapper";
import { SITE_URL, SITE_NAME, SITE_FULL_NAME, SITE_DESCRIPTION, UNIVERSITY, jsonLd } from "@/lib/site";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "YAS Lab — Nanoscale Biosystems Engineering",
  description:
    "Pioneering research at the intersection of molecular nanotechnology, biosystems engineering, and biomedical innovation.",
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    locale: "en_US",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
};

const organizationLd = {
  "@context": "https://schema.org",
  "@type": "ResearchOrganization",
  name: `${SITE_NAME} — ${SITE_FULL_NAME}`,
  alternateName: [SITE_NAME, "YAS Lab"],
  url: SITE_URL,
  description: SITE_DESCRIPTION,
  parentOrganization: { "@type": "CollegeOrUniversity", ...UNIVERSITY },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-screen`}>
        <NavbarWrapper />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(organizationLd) }} />
        <div className="flex-1">
          {children}
        </div>
        <FooterWrapper />
      </body>
    </html>
  );
}

