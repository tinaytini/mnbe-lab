import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { db } from "@/db";
import { news as newsTable } from "@/db/schema";
import { eq } from "drizzle-orm";
import { SITE_NAME, SITE_URL, absoluteUrl, jsonLd } from "@/lib/site";
import { ArrowLeft, ExternalLink, Calendar } from "lucide-react";

export const revalidate = 60;

type Props = { params: Promise<{ id: string }> };

function truncate(text: string, max = 158): string {
    const clean = text.replace(/\s+/g, " ").trim();
    return clean.length <= max ? clean : `${clean.slice(0, max - 1).replace(/\s+\S*$/, "")}…`;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { id } = await params;
    const numId = parseInt(id, 10);
    if (isNaN(numId)) return { title: `Article not found | ${SITE_NAME}`, robots: { index: false } };

    const [item] = await db.select().from(newsTable).where(eq(newsTable.id, numId)).limit(1);
    if (!item) return { title: `Article not found | ${SITE_NAME}`, robots: { index: false } };

    const title = `${item.title} | ${SITE_NAME} News`;
    const description = truncate(item.body);
    const url = `/news/${item.id}`;

    return {
        title,
        description,
        alternates: { canonical: url },
        openGraph: {
            type: "article",
            url,
            title,
            description,
            siteName: SITE_NAME,
            images: item.photoUrl ? [{ url: absoluteUrl(item.photoUrl), alt: item.title }] : undefined,
        },
        twitter: {
            card: item.photoUrl ? "summary_large_image" : "summary",
            title,
            description,
            images: item.photoUrl ? [absoluteUrl(item.photoUrl)] : undefined,
        },
    };
}

export default async function NewsDetailPage({ params }: Props) {
    const { id } = await params;
    const numId = parseInt(id, 10);
    if (isNaN(numId)) notFound();

    const [item] = await db.select().from(newsTable).where(eq(newsTable.id, numId)).limit(1);
    if (!item) notFound();

    const url = absoluteUrl(`/news/${item.id}`);

    // NewsArticle structured data schema for Google
    const structuredData = [
        {
            "@context": "https://schema.org",
            "@type": "NewsArticle",
            headline: item.title,
            description: truncate(item.body),
            url,
            ...(item.photoUrl && { image: [absoluteUrl(item.photoUrl)] }),
            datePublished: item.createdAt?.toISOString(),
            publisher: {
                "@type": "ResearchOrganization",
                name: SITE_NAME,
                url: SITE_URL,
            },
        },
        {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
                { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
                { "@type": "ListItem", position: 2, name: "News", item: absoluteUrl("/news") },
                { "@type": "ListItem", position: 3, name: item.title, item: url },
            ],
        },
    ];

    let externalHost = "";
    if (item.url) {
        try {
            externalHost = new URL(item.url).hostname.replace(/^www\./, "");
        } catch {
            externalHost = "external source";
        }
    }

    return (
        <main className="bg-slate-50 pt-28 pb-20 min-h-screen">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(structuredData) }} />

            <article className="max-w-4xl mx-auto px-6 lg:px-8">
                {/* Breadcrumb navigation */}
                <nav aria-label="Breadcrumb" className="mb-6 text-sm text-slate-500">
                    <ol className="flex items-center gap-2 flex-wrap">
                        <li><Link href="/" className="hover:text-brand-600 transition-colors">Home</Link></li>
                        <li aria-hidden>/</li>
                        <li><Link href="/news" className="hover:text-brand-600 transition-colors">News</Link></li>
                        <li aria-hidden>/</li>
                        <li className="text-slate-700 font-medium truncate max-w-xs sm:max-w-md">{item.title}</li>
                    </ol>
                </nav>

                <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden p-6 sm:p-12">
                    {/* Header info */}
                    <div className="flex items-center gap-2 text-brand-600 font-semibold text-xs tracking-wider uppercase mb-4">
                        <Calendar className="w-4 h-4" />
                        <span>{item.date}</span>
                    </div>

                    <h1 className="text-2xl sm:text-4xl font-bold text-slate-900 tracking-tight leading-tight mb-8">
                        {item.title}
                    </h1>

                    {/* Featured Image */}
                    {item.photoUrl && (
                        <div className="relative w-full flex justify-center rounded-2xl overflow-hidden mb-8 border border-slate-100 bg-slate-100 shadow-inner">
                            {/* Blurred copy fills the sides around the full, uncropped image */}
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src={item.photoUrl} alt="" aria-hidden className="absolute inset-0 w-full h-full object-cover scale-110 blur-2xl opacity-60" />
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                                src={item.photoUrl}
                                alt={item.title}
                                className="relative block w-auto max-w-full h-auto max-h-[min(75vh,720px)]"
                            />
                        </div>
                    )}

                    {/* Full Story Content */}
                    <div className="prose prose-slate max-w-none">
                        <div className="text-slate-700 text-base sm:text-lg leading-relaxed whitespace-pre-wrap">
                            {item.body}
                        </div>
                    </div>

                    {/* External Link button (if exists) */}
                    {item.url && (
                        <div className="mt-10 pt-8 border-t border-slate-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-brand-50/50 p-6 rounded-2xl border">
                            <div>
                                <h3 className="text-sm font-semibold text-slate-900">Official Publication / Article Source</h3>
                                <p className="text-xs text-slate-500 mt-0.5">Read the full external coverage or paper on {externalHost}.</p>
                            </div>
                            <a
                                href={item.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-brand-600 hover:bg-brand-700 text-white font-medium text-xs sm:text-sm shadow-sm transition-colors shrink-0"
                            >
                                <span>Read original source</span>
                                <ExternalLink className="w-4 h-4" />
                            </a>
                        </div>
                    )}
                </div>

                {/* Back to all news */}
                <div className="mt-8 text-center">
                    <Link
                        href="/news"
                        className="inline-flex items-center gap-2 text-sm font-semibold text-brand-600 hover:text-brand-700 transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        <span>Back to all News</span>
                    </Link>
                </div>
            </article>
        </main>
    );
}
