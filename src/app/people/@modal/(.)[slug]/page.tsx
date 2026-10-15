import { notFound } from "next/navigation";
import { getMemberBySlug } from "@/lib/members";
import MemberModal from "@/components/people/MemberModal";
import MemberProfile from "@/components/people/MemberProfile";

/**
 * Intercepted version of /people/[slug]: shown as a modal when navigating
 * from the /people grid. Direct visits render ../../[slug]/page.tsx instead.
 */
export default async function MemberModalPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const member = await getMemberBySlug(slug);
    if (!member) notFound();

    return (
        <MemberModal>
            <MemberProfile member={member} />
        </MemberModal>
    );
}
