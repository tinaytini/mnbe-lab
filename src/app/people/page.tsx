import type { Metadata } from "next";
import { getAllMembers } from "@/lib/members";
import PeopleGrid from "./PeopleGrid";
import PeopleHero from "./PeopleHero";

export const metadata: Metadata = {
    title: "People | YAS Lab",
    description: "Meet the researchers, postdocs, and students of the YAS Lab (Molecular & Nanoscale Biosystems Engineering) at NYU Abu Dhabi.",
    alternates: { canonical: "/people" },
};

export const revalidate = 60;



export default async function PeoplePage() {
    const allMembers = await getAllMembers();
    const currentMembers = allMembers.filter((m) => !m.isAlumni);
    const alumni = allMembers.filter((m) => m.isAlumni);

    return (
        <main className="bg-slate-50 pt-20 pb-20">
            <PeopleHero />

            {/* Header (Original) */}
            <section className="max-w-6xl mx-auto px-6 lg:px-8 text-center mb-16">

                <p className="text-lg text-slate-500 max-w-2xl mx-auto leading-relaxed">
                    Our diverse, interdisciplinary team brings together expertise from
                    biochemistry, engineering, physics, and computer science.
                </p>
            </section>

            {/* Members by role */}
            <div className="max-w-6xl mx-auto px-6 lg:px-8 flex flex-col gap-20">
                {allMembers.length === 0 ? (
                    <div className="text-center py-16 text-slate-400">
                        <p className="text-4xl mb-3">👥</p>
                        <p className="text-sm">No team members yet. Add them via the <a href="/admin" className="text-brand-500 underline">admin panel</a>.</p>
                    </div>
                ) : (
                    <>
                        {currentMembers.length > 0 && <PeopleGrid allMembers={currentMembers} />}

                        {alumni.length > 0 && (
                            <section id="alumni" aria-labelledby="alumni-heading" className="scroll-mt-28">
                                <div className="text-center mb-10">
                                    <h2 id="alumni-heading" className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
                                        Alumni
                                    </h2>
                                    <div className="w-16 h-1 bg-brand-400 rounded-full mx-auto mt-4 mb-4" />
                                    <p className="text-slate-500 max-w-xl mx-auto">
                                        Former lab members who have moved on to new chapters in academia and industry.
                                    </p>
                                </div>
                                <PeopleGrid allMembers={alumni} />
                            </section>
                        )}
                    </>
                )}
            </div>
        </main>
    );
}
