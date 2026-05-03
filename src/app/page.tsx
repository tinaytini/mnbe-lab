import Link from "next/link";
import { Activity, Bug, Leaf } from "lucide-react";
import { db } from "@/db";
import { publications as pubsTable, news as newsTable } from "@/db/schema";
import { desc } from "drizzle-orm";
import NewsCarousel from "@/components/NewsCarousel";


// ─── Data ────────────────────────────────────────────────────────────────────

const stats = [
  { value: "40+", label: "Publications" },
  { value: "12", label: "Active Projects" },
  { value: "8", label: "Research Areas" },
  { value: "25+", label: "Team Members" },
];

const researchAreas = [
  { icon: <Activity strokeWidth={1.5} className="w-7 h-7 text-brand-500" />, title: "Biosensing", desc: "Samples containing RNA and DNA lie at the heart of all biopsy techniques. We are determined to develop biosensors that can enhance the concentration of RNA and DNA in these samples, improving the detection sensitivity." },
  { icon: <Bug strokeWidth={1.5} className="w-7 h-7 text-brand-500" />, title: "Biomechanics", desc: "Caenorhabditis elegans (C. elegans) worms are extensively used as model organisms in medicinal and genetic research. We use biomechanical techniques to model neuromuscular diseases like diabetes, alzheimer, etc using C. elegans." },
  { icon: <Leaf strokeWidth={1.5} className="w-7 h-7 text-brand-500" />, title: "Bioinspiration", desc: "Being bioinspired from amazing design strategies of Nature at micro and nano level, we are determined to solve incumbent problems in bioengineering using micro and nano fabrication techniques." },
];






// ─── Section heading helper ───────────────────────────────────────────────────

function SectionHeading({
  badge,
  title,
  subtitle,
  dark = false,
}: {
  badge: string;
  title: string;
  subtitle?: string;
  dark?: boolean;
}) {
  return (
    <div className="text-center mb-14">
      <span
        className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium mb-5 ${dark
          ? "border border-brand-300/30 bg-brand-500/10 text-brand-200"
          : "border border-brand-100 bg-brand-50 text-brand-500"
          }`}
      >
        <span className={`w-1.5 h-1.5 rounded-full animate-pulse ${dark ? "bg-brand-300" : "bg-brand-500"}`} />
        {badge}
      </span>
      <h2
        className={`text-3xl sm:text-4xl font-bold tracking-tight mb-3 ${dark ? "text-white" : "text-slate-900"
          }`}
      >
        {title}
      </h2>
      {subtitle && (
        <p className={`max-w-2xl mx-auto text-base leading-relaxed ${dark ? "text-slate-400" : "text-slate-500"}`}>
          {subtitle}
        </p>
      )}
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export const revalidate = 60;

export default async function Home() {
  let recentPubs: { id: number; year: string; title: string; authors: string; journal: string; url?: string | null }[] = [];
  let recentNews: { id: number; date: string; title: string; body: string; url?: string | null; photoUrl?: string | null }[] = [];
  try {
    recentPubs = await db
      .select({ id: pubsTable.id, year: pubsTable.year, title: pubsTable.title, authors: pubsTable.authors, journal: pubsTable.journal, url: pubsTable.url })
      .from(pubsTable)
      .orderBy(desc(pubsTable.year), desc(pubsTable.createdAt))
      .limit(4);
    recentNews = await db
      .select({ id: newsTable.id, date: newsTable.date, title: newsTable.title, body: newsTable.body, url: newsTable.url, photoUrl: newsTable.photoUrl })
      .from(newsTable)
      .orderBy(desc(newsTable.createdAt))
      .limit(9);
  } catch {
    // DB unavailable — show empty state
  }
  return (
    <>
      {/* ══════════════════════════════════════════════════════
          1. HERO
      ══════════════════════════════════════════════════════ */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        {/* Background */}
        <div className="absolute inset-0 bg-linear-to-br from-slate-900 via-brand-900 to-slate-900" />
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
        <div className="absolute top-0 right-0 w-200 h-150 rounded-full bg-brand-500/20 blur-[100px] pointer-events-none translate-x-1/3 -translate-y-1/4" />
        <div className="absolute bottom-0 left-0 w-125 h-125 rounded-full bg-brand-400/10 blur-[80px] pointer-events-none -translate-x-1/3 translate-y-1/3" />

        {/* Animated Particles */}
        {[...Array(6)].map((_, i) => (
          <span
            key={i}
            className="absolute rounded-full bg-brand-300/20 animate-pulse hidden md:block"
            style={{
              width: `${8 + i * 4}px`,
              height: `${8 + i * 4}px`,
              top: `${15 + i * 13}%`,
              left: `${10 + i * 14}%`,
              animationDelay: `${i * 0.7}s`,
              animationDuration: `${3 + i}s`,
            }}
          />
        ))}

        {/* Content */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-8 items-center">

            {/* Left Column: Text & CTA */}
            <div className="text-left py-12 lg:py-0">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-brand-300/30 bg-brand-500/10 text-brand-200 text-sm font-medium mb-8 backdrop-blur-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-300 animate-pulse" />
                Advancing Nanoscale Biosystems Engineering
              </div>

              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-[1.08] tracking-tight mb-6 mt-4">
                YAS{" "}
                <span className="inline-block bg-linear-to-r from-brand-300 via-brand-200 to-brand-400 bg-clip-text text-transparent">
                  Research
                </span>{" "}
                <br className="hidden sm:block" />Laboratory
              </h1>

              <p className="text-lg sm:text-xl text-slate-400 leading-relaxed mb-10 max-w-xl">
                Our research aims to understand the concepts and mechanisms of complex bioscience challenges lying at the interface of biology, physics, and engineering. We investigate biological processes at the micro- and nanoscale.
              </p>

              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <Link
                  href="/research"
                  className="group inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-linear-to-r from-brand-500 to-brand-400 text-white font-semibold text-sm shadow-xl shadow-brand-500/25 hover:shadow-brand-500/40 hover:-translate-y-0.5 transition-all duration-200 w-full sm:w-auto"
                >
                  Explore Research
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 group-hover:translate-x-0.5 transition-transform">
                    <path fillRule="evenodd" d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z" clipRule="evenodd" />
                  </svg>
                </Link>
                <Link
                  href="/publications"
                  className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full border border-white/20 text-white/80 font-semibold text-sm hover:bg-white/10 hover:text-white transition-all duration-200 backdrop-blur-sm w-full sm:w-auto"
                >
                  View Publications
                </Link>
              </div>
            </div>

            {/* Right Column: Visual Showcase */}
            <div className="relative hidden lg:flex items-center justify-center p-8">
              <img
                src="/uploads/mnbe-lab.png"
                alt="MNBE Lab Logo"
                className="w-full max-w-sm xl:max-w-md h-auto object-contain drop-shadow-2xl hover:scale-105 transition-transform duration-500"
              />
            </div>

          </div>
        </div>

        {/* Scroll cue (bottom left instead of center) */}
        <div className="absolute bottom-8 left-8 hidden lg:flex flex-col items-center gap-2 text-white/30">
          <span className="text-[10px] font-bold tracking-[0.2em] uppercase origin-left rotate-90 translate-x-2 translate-y-8">Scroll</span>
          <div className="w-px h-16 bg-linear-to-b from-white/30 to-transparent mt-16" />
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          2. RESEARCH OVERVIEW
      ══════════════════════════════════════════════════════ */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left – text */}
            <div>
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-brand-100 bg-brand-50 text-brand-500 text-sm font-medium mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-500 animate-pulse" />
                Our Mission
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight mb-5 leading-tight">
                Research at the<br />
                <span className="bg-linear-to-r from-brand-500 to-brand-400 bg-clip-text text-transparent">
                  Nanoscale Frontier
                </span>
              </h2>
              <p className="text-slate-600 text-base leading-relaxed mb-5">
                Our mission is to advance the field of molecular nanoscale biosystems
                engineering through cutting-edge research and innovation. We strive to
                discover and develop new nanotechnologies and bioengineering methods that
                improve human health and the sustainability of biological processes.
              </p>
              <p className="text-slate-600 text-base leading-relaxed mb-8">
                By applying our expertise across catalysis, synthetic biology, and
                nanoscale design, we aim to make a positive impact on medicine and
                society through the development of next-generation therapeutics and
                diagnostic platforms.
              </p>
              <Link
                href="/research"
                className="group inline-flex items-center gap-2 px-6 py-3 rounded-full bg-linear-to-r from-brand-500 to-brand-400 text-white font-semibold text-sm shadow-md shadow-brand-500/20 hover:shadow-brand-500/35 hover:scale-[1.02] transition-all duration-200"
              >
                Learn more
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 group-hover:translate-x-0.5 transition-transform">
                  <path fillRule="evenodd" d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z" clipRule="evenodd" />
                </svg>
              </Link>
            </div>

            {/* Right – area cards */}
            <div className="flex flex-col gap-5">
              {researchAreas.map((area, idx) => (
                <div
                  key={area.title}
                  className="group relative overflow-hidden bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md hover:border-brand-200 transition-all duration-300"
                >
                  {/* Subtle hover gradient background */}
                  <div className="absolute inset-0 bg-linear-to-r from-brand-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                  <div className="relative z-10 flex gap-5 items-start">
                    <div className="shrink-0 w-14 h-14 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center text-3xl group-hover:bg-white group-hover:border-brand-100 group-hover:shadow-sm transition-all duration-300 group-hover:-translate-y-1">
                      {area.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-base font-semibold text-slate-900 mb-2 group-hover:text-brand-600 transition-colors">
                        {area.title}
                      </h3>
                      <p className="text-sm text-slate-500 leading-relaxed">
                        {area.desc}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          3. RECENT PUBLICATIONS
      ══════════════════════════════════════════════════════ */}
      <section className="py-24 bg-white">
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          <SectionHeading
            badge="Latest Work"
            title="Recent Publications"
            subtitle="Selected highlights from our ongoing research — updated regularly."
          />

          <div className="flex flex-col gap-4 mb-10">
            {recentPubs.length === 0 ? (
              <div className="text-center py-10 text-slate-400 text-sm">
                No publications yet. <Link href="/admin" className="text-brand-500 underline">Add via admin →</Link>
              </div>
            ) : (
              recentPubs.map((pub) => {
                const isExternal = !!pub.url;
                const Wrapper = isExternal ? 'a' : Link;
                const props = isExternal
                  ? { href: pub.url as string, target: "_blank", rel: "noopener noreferrer" }
                  : { href: "/publications" };

                return (
                  <Wrapper
                    key={pub.id}
                    {...props}
                    className="group flex gap-5 p-6 rounded-2xl border border-slate-200 bg-white hover:border-brand-100 hover:shadow-md transition-all duration-200"
                  >
                    {/* Year badge */}
                    <div className="shrink-0 w-12 h-12 rounded-xl bg-brand-50 flex items-center justify-center text-brand-500 font-bold text-sm">
                      {pub.year}
                    </div>
                    <div className="flex flex-col gap-1 min-w-0">
                      <h3 className="text-base font-semibold text-slate-800 group-hover:text-brand-600 transition-colors leading-snug">
                        {pub.title}
                      </h3>
                      <p className="text-sm text-slate-500 truncate">{pub.authors}</p>
                      <span className="mt-1 text-xs font-medium text-brand-500 bg-brand-50 px-2.5 py-0.5 rounded-full self-start">
                        {pub.journal}
                      </span>
                    </div>
                    {isExternal ? (
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 text-slate-300 group-hover:text-brand-500 shrink-0 self-center ml-auto transition-colors">
                        <path fillRule="evenodd" d="M5.22 14.78a.75.75 0 001.06 0l7.22-7.22v5.69a.75.75 0 001.5 0v-7.5a.75.75 0 00-.75-.75h-7.5a.75.75 0 000 1.5h5.69l-7.22 7.22a.75.75 0 000 1.06z" clipRule="evenodd" />
                      </svg>
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 text-slate-300 group-hover:text-brand-300 shrink-0 self-center ml-auto transition-colors">
                        <path fillRule="evenodd" d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z" clipRule="evenodd" />
                      </svg>
                    )}
                  </Wrapper>
                );
              })
            )}
          </div>


          <div className="text-center">
            <Link
              href="/publications"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-slate-200 text-slate-600 font-semibold text-sm hover:border-brand-200 hover:text-brand-500 hover:bg-brand-50 transition-all duration-200"
            >
              All publications
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                <path fillRule="evenodd" d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z" clipRule="evenodd" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          4. NEWS
      ══════════════════════════════════════════════════════ */}
      <section className="py-24 bg-linear-to-br from-slate-900 via-brand-900 to-slate-900 relative overflow-hidden">
        {/* Subtle grid */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
        <div className="absolute top-0 right-0 w-150 h-100 rounded-full bg-brand-500/10 blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-5xl mx-auto px-6 lg:px-8">
          <SectionHeading
            badge="Latest Updates"
            title="News"
            subtitle="Recent highlights, awards, and announcements from the MNBE Lab."
            dark
          />

          {recentNews.length === 0 ? (
            <div className="text-center py-10 text-slate-400 text-sm">
              No news yet. <Link href="/admin" className="text-brand-300 underline">Add via admin →</Link>
            </div>
          ) : (
            <NewsCarousel items={recentNews} />
          )}

        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          5. FOOTER CTA
      ══════════════════════════════════════════════════════ */}
      <section className="py-20 bg-white border-t border-slate-100">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-slate-900 tracking-tight mb-4">
            Interested in collaborating?
          </h2>
          <p className="text-slate-500 text-base mb-12 leading-relaxed">
            We welcome inquiries from prospective PhD students, postdoctoral
            researchers, and industry partners.
          </p>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 mb-12 border-t border-b border-slate-100 py-10">
            {[
              { label: "Publications", value: "40+" },
              { label: "Active Projects", value: "12" },
              { label: "Research Areas", value: "8" },
              { label: "Team Members", value: "25+" },
            ].map((s) => (
              <div key={s.label} className="flex flex-col items-around">
                <span className="text-3xl sm:text-4xl font-extrabold bg-linear-to-r from-brand-500 to-brand-400 bg-clip-text text-transparent mb-1">
                  {s.value}
                </span>
                <span className="text-slate-500 text-sm font-semibold uppercase tracking-widest">
                  {s.label}
                </span>
              </div>
            ))}
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-linear-to-r from-brand-500 to-brand-400 text-white font-semibold text-sm shadow-lg shadow-brand-500/20 hover:shadow-brand-500/40 hover:scale-[1.02] transition-all duration-200"
            >
              Get in touch
            </Link>
            <Link
              href="/people"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full border border-slate-200 text-slate-600 font-semibold text-sm hover:border-brand-200 hover:text-brand-500 hover:bg-brand-50 transition-all duration-200"
            >
              Meet the team
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
