import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getMemberBySlug, memberHref } from "@/lib/members";
import MemberProfile from "@/components/people/MemberProfile";
import { SITE_NAME, SITE_FULL_NAME, SITE_URL, UNIVERSITY, absoluteUrl, jsonLd } from "@/lib/site";

export const revalidate = 60;

type Props = { params: Promise<{ slug: string }> };

function truncate(text: string, max = 158): string {
    const clean = text.replace(/\s+/g, " ").trim();
    return clean.length <= max ? clean : `${clean.slice(0, max - 1).replace(/\s+\S*$/, "")}…`;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const member = await getMemberBySlug(slug);
    if (!member) return { title: `Person not found | ${SITE_NAME}`, robots: { index: false } };

    const title = `${member.name} — ${member.isAlumni ? "Former " : ""}${member.role} | ${SITE_NAME}, NYU Abu Dhabi`;
    const description = truncate(
        `${member.name} ${member.isAlumni ? "is a former" : "is a"} ${member.role} at the ${SITE_NAME} (${SITE_FULL_NAME}), NYU Abu Dhabi. ${member.biography || member.focus}`
    );
    const url = memberHref(member);
    const [firstName, ...rest] = member.name.split(" ");

    const keywords = [
        member.name,
        `${member.name} NYU`,
        `${member.name} NYU Abu Dhabi`,
        member.role,
        SITE_NAME,
        SITE_FULL_NAME,
        "NYU Abu Dhabi",
        "NYUAD",
        ...(member.focus ? member.focus.split(/[,;·•]+/).map((s) => s.trim()).filter(Boolean) : []),
    ];

    return {
        title,
        description,
        keywords,
        authors: [{ name: member.name, url: absoluteUrl(url) }],
        creator: member.name,
        alternates: { canonical: url },
        openGraph: {
            type: "profile",
            url,
            title,
            description,
            siteName: `${SITE_NAME} — ${SITE_FULL_NAME}`,
            firstName,
            lastName: rest.join(" ") || undefined,
            images: member.photoUrl ? [{ url: absoluteUrl(member.photoUrl), alt: member.name }] : undefined,
        },
        twitter: {
            card: member.photoUrl ? "summary_large_image" : "summary",
            title,
            description,
            images: member.photoUrl ? [absoluteUrl(member.photoUrl)] : undefined,
        },
    };
}

export default async function MemberPage({ params }: Props) {
    const { slug } = await params;
    const member = await getMemberBySlug(slug);
    if (!member) notFound();

    const url = absoluteUrl(memberHref(member));

    // ProfilePage + Person structured data: tells Google explicitly who this page is about.
    const structuredData = [
        {
            "@context": "https://schema.org",
            "@type": "ProfilePage",
            url,
            mainEntity: {
                "@type": "Person",
                "@id": `${url}#person`,
                name: member.name,
                jobTitle: member.role,
                description: member.biography || member.focus,
                knowsAbout: member.focus,
                url,
                ...(member.photoUrl && { image: absoluteUrl(member.photoUrl) }),
                ...(member.email && { email: `mailto:${member.email}` }),
                [member.isAlumni ? "alumniOf" : "worksFor"]: {
                    "@type": "ResearchOrganization",
                    name: `${SITE_NAME} — ${SITE_FULL_NAME}`,
                    url: SITE_URL,
                    parentOrganization: { "@type": "CollegeOrUniversity", ...UNIVERSITY },
                },
                affiliation: { "@type": "CollegeOrUniversity", ...UNIVERSITY },
            },
        },
        {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
                { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
                { "@type": "ListItem", position: 2, name: "People", item: absoluteUrl("/people") },
                { "@type": "ListItem", position: 3, name: member.name, item: url },
            ],
        },
    ];

    return (
        <main className="bg-slate-50 pt-28 pb-20 min-h-screen">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(structuredData) }} />

            <div className="max-w-3xl mx-auto px-6 lg:px-8">
                <nav aria-label="Breadcrumb" className="mb-6 text-sm text-slate-500">
                    <ol className="flex items-center gap-2">
                        <li><Link href="/" className="hover:text-brand-600">Home</Link></li>
                        <li aria-hidden>/</li>
                        <li><Link href="/people" className="hover:text-brand-600">People</Link></li>
                        <li aria-hidden>/</li>
                        <li className="text-slate-700 font-medium truncate">{member.name}</li>
                    </ol>
                </nav>

                <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-8 sm:p-10">
                    <MemberProfile member={member} as="h1" />
                </div>

                <div className="mt-8 text-center">
                    <Link
                        href="/people"
                        className="inline-flex items-center gap-2 text-sm font-semibold text-brand-600 hover:text-brand-700 transition-colors"
                    >
                        ← Meet the rest of the team
                    </Link>
                </div>
            </div>
        </main>
    );
}
