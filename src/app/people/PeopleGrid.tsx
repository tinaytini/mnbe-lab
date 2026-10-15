import Link from "next/link";
import { memberHref, roleEmoji, slugify, type Member } from "@/lib/members";

/**
 * Each card links to /people/[slug]. From this page the link is intercepted
 * and opens as a modal (see ./@modal); opened directly, it's a full page.
 */
export default function PeopleGrid({ allMembers }: { allMembers: Member[] }) {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {allMembers.map((m) => (
                <div
                    key={m.id}
                    id={slugify(m.name)}
                    className="relative flex flex-col items-center text-center p-6 bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md hover:border-brand-200 hover:-translate-y-1 transition-all duration-200 gap-4 group scroll-mt-28"
                >
                    <div className="w-24 h-24 rounded-full bg-linear-to-br from-brand-100 to-brand-100 flex items-center justify-center text-4xl overflow-hidden shrink-0">
                        {m.photoUrl
                            // eslint-disable-next-line @next/next/no-img-element
                            ? <img src={m.photoUrl} alt={m.name} className="w-full h-full object-cover" />
                            : (roleEmoji[m.role] ?? "🧑‍🔬")
                        }
                    </div>
                    <div className="flex flex-col items-center min-w-0 w-full">
                        <h3 className="text-base font-semibold text-slate-800 group-hover:text-brand-600 transition-colors">
                            {/* Stretched link: the ::after covers the whole card, making it clickable */}
                            <Link
                                href={memberHref(m)}
                                scroll={false}
                                className="after:absolute after:inset-0 after:rounded-2xl after:content-[''] focus:outline-none focus-visible:after:ring-2 focus-visible:after:ring-brand-400"
                            >
                                {m.name}
                            </Link>
                        </h3>
                        <p className="text-xs font-semibold text-brand-600 uppercase tracking-wider mt-1 mb-1.5">{m.role}</p>
                        {m.originCountry && <span className="text-xs text-slate-500 font-medium">{m.originCountry}</span>}
                        {m.email && (
                            <p className="relative z-10 text-xs text-slate-400 mt-2 truncate w-full">
                                ✉️ <a href={`mailto:${m.email}`} className="hover:text-brand-500 hover:underline">{m.email}</a>
                            </p>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
}
