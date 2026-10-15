import { roleEmoji, type Member } from "@/lib/members";

/**
 * Profile content shared by the modal (soft navigation) and the
 * standalone /people/[slug] page (direct visits / Google).
 */
export default function MemberProfile({
    member,
    as: Heading = "h2",
}: {
    member: Member;
    /** Use "h1" on the standalone page so the person's name is the main heading. */
    as?: "h1" | "h2";
}) {
    return (
        <article>
            <header className="flex flex-col sm:flex-row gap-6 items-center sm:items-start text-center sm:text-left mb-8">
                <div className="w-32 h-32 rounded-full bg-linear-to-br from-brand-100 to-brand-100 flex items-center justify-center text-5xl overflow-hidden shrink-0 shadow-inner">
                    {member.photoUrl
                        // eslint-disable-next-line @next/next/no-img-element
                        ? <img src={member.photoUrl} alt={`Portrait of ${member.name}`} className="w-full h-full object-cover" />
                        : (roleEmoji[member.role] ?? "🧑‍🔬")
                    }
                </div>
                <div className="flex flex-col justify-center">
                    <Heading className="text-2xl font-bold text-slate-900">{member.name}</Heading>
                    <p className="text-sm font-semibold text-brand-600 uppercase tracking-wider mt-1 mb-2">
                        {member.role}
                        {member.isAlumni && (
                            <span className="ml-2 align-middle inline-block text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full bg-slate-100 text-slate-500">
                                Alumni
                            </span>
                        )}
                    </p>
                    {member.originCountry && <span className="text-sm text-slate-500 mb-2">{member.originCountry}</span>}
                    {member.email && (
                        <a href={`mailto:${member.email}`} className="text-sm font-medium text-brand-500 hover:underline w-max mx-auto sm:mx-0">
                            ✉️ {member.email}
                        </a>
                    )}
                </div>
            </header>

            <section className="border-t border-slate-100 pt-6 mb-6">
                <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wider mb-2">Research Focus</h3>
                <p className="text-slate-600 leading-relaxed whitespace-pre-wrap text-sm">{member.focus}</p>
            </section>

            {member.biography && (
                <section className="border-t border-slate-100 pt-6">
                    <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wider mb-2">Biography</h3>
                    <p className="text-slate-600 leading-relaxed whitespace-pre-wrap text-sm">{member.biography}</p>
                </section>
            )}
        </article>
    );
}
