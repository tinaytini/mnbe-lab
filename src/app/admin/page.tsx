"use client";

import { useState, useEffect, useRef } from "react";
import Logo from "@/components/Logo";

// ─── Types ────────────────────────────────────────────────────────────────────

type Publication = { id: number; year: string; title: string; authors: string; journal: string; url?: string | null; description?: string | null };
type NewsItem = { id: number; date: string; title: string; body: string; url?: string | null; photoUrl?: string | null };
type Member = { id: number; name: string; role: string; focus: string; email?: string | null; originCountry?: string | null; biography?: string | null; photoUrl?: string | null };
type ResearchArea = { id: number; photoUrl: string | null; title: string; description: string };
type Activity = { id: number; title: string; date: string; description: string; category: string; emoji: string; photoUrl?: string | null };

// ─── Seed data ────────────────────────────────────────────────────────────────

const seedPublications: Publication[] = [
    { id: 1, year: "2024", title: "Self-assembling DNA nanostructures for targeted oncology therapy", authors: "Rahman A., Chen L., Patel R., et al.", journal: "Nature Nanotechnology" },
    { id: 2, year: "2024", title: "High-throughput microfluidic screening of nanocarrier formulations", authors: "Müller S., Rahman A., Kim J., et al.", journal: "ACS Nano" },
    { id: 3, year: "2023", title: "Biocomputable logic gates via synthetic DNA circuits", authors: "Patel R., Chen L., Rahman A.", journal: "Science Advances" },
    { id: 4, year: "2023", title: "Green synthesis routes for biocompatible gold nanoparticles", authors: "Kim J., Müller S., et al.", journal: "Nano Letters" },
];

const seedNews: NewsItem[] = [
    { id: 1, date: "February 2026", title: "Prof. Rahman delivers keynote at NanoBio World Congress", body: "Prof. Rahman was invited to present the lab's latest results on DNA nanostructure drug delivery." },
    { id: 2, date: "October 2024", title: "Best Paper Award at IEEE NanoBio 2024 — Tokyo", body: "Our submission on self-assembling nanocarriers received the Best Paper Award." },
    { id: 3, date: "July 2024", title: "ERC Starting Grant awarded — €1.5M for Molecular Machines", body: "The European Research Council awarded the lab a prestigious Starting Grant." },
];

const seedMembers: Member[] = [
    { id: 1, name: "Prof. Ahmed Rahman", role: "Principal Investigator", focus: "Molecular Nanotechnology & Lab Director" },
    { id: 2, name: "Dr. Lei Chen", role: "Senior Researcher", focus: "DNA Nanostructures & Biocomputation" },
    { id: 3, name: "Dr. Ravi Patel", role: "Postdoctoral Fellow", focus: "Biosystems Engineering" },
    { id: 4, name: "Sophie Müller", role: "PhD Candidate", focus: "Drug Delivery Nanocarriers" },
];

const seedResearch: ResearchArea[] = [
    { id: 1, photoUrl: null, title: "Molecular Nanotechnology", description: "Engineering functional nanostructures at the molecular scale." },
    { id: 2, photoUrl: null, title: "Biosystems Engineering", description: "Designing synthetic biological systems and circuits." },
    { id: 3, photoUrl: null, title: "Drug Delivery Systems", description: "Nanocarrier platforms for precision medicine." },
    { id: 4, photoUrl: null, title: "Nanoscale Imaging", description: "Sub-ångström characterisation of biological structures." },
];

// ─── Small UI helpers ─────────────────────────────────────────────────────────

function Badge({ children, color = "blue" }: { children: React.ReactNode; color?: string }) {
    const map: Record<string, string> = {
        blue: "bg-blue-50 text-blue-700 border-blue-200",
        green: "bg-emerald-50 text-emerald-700 border-emerald-200",
        amber: "bg-amber-50 text-amber-700 border-amber-200",
        red: "bg-red-50 text-red-700 border-red-200",
        purple: "bg-purple-50 text-purple-700 border-purple-200",
    };
    return (
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${map[color] ?? map.blue}`}>
            {children}
        </span>
    );
}

function Btn({ children, onClick, variant = "primary", size = "md", className = "", disabled = false }: {
    children: React.ReactNode;
    onClick?: () => void;
    variant?: "primary" | "secondary" | "danger" | "ghost";
    size?: "sm" | "md";
    className?: string;
    disabled?: boolean;
}) {
    const base = "inline-flex items-center gap-1.5 font-semibold rounded-lg transition-all duration-150 cursor-pointer";
    const sizes = { sm: "px-3 py-1.5 text-xs", md: "px-4 py-2 text-sm" };
    const variants = {
        primary: "bg-blue-600 text-white hover:bg-blue-700 shadow-sm",
        secondary: "bg-white text-slate-700 border border-slate-200 hover:bg-slate-50 hover:border-slate-300",
        danger: "bg-red-50 text-red-600 border border-red-200 hover:bg-red-100",
        ghost: "text-slate-500 hover:text-slate-700 hover:bg-slate-100",
    };
    return (
        <button disabled={disabled} onClick={onClick} className={`${base} ${sizes[size]} ${variants[variant]} ${className}`}>
            {children}
        </button>
    );
}


function Input({ label, value, onChange, placeholder = "", type = "text" }: {
    label: string; value: string; onChange: (v: string) => void; placeholder?: string; type?: string;
}) {
    return (
        <label className="flex flex-col gap-1.5">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-widest">{label}</span>
            <input
                type={type}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder}
                className="px-3 py-2 rounded-lg border border-slate-200 text-sm text-slate-800 placeholder:text-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition"
            />
        </label>
    );
}

function Textarea({ label, value, onChange, placeholder = "", rows = 3 }: {
    label: string; value: string; onChange: (v: string) => void; placeholder?: string; rows?: number;
}) {
    return (
        <label className="flex flex-col gap-1.5">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-widest">{label}</span>
            <textarea
                rows={rows}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder}
                className="px-3 py-2 rounded-lg border border-slate-200 text-sm text-slate-800 placeholder:text-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition resize-none"
            />
        </label>
    );
}

// ─── Login Screen ─────────────────────────────────────────────────────────────

function LoginScreen({ onLogin }: { onLogin: () => void }) {
    const [pw, setPw] = useState("");
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);

    const submit = async () => {
        setLoading(true);
        setError(false);

        try {
            const response = await fetch("/api/admin/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ password: pw }),
            });

            if (response.ok) {
                onLogin();
                return;
            }

            setError(true);
            setPw("");
            setLoading(false);
        } catch {
            setError(true);
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-linear-to-br from-slate-900 via-blue-950 to-slate-900 flex items-center justify-center px-4">
            <div className="w-full max-w-sm">
                {/* Logo */}
                <div className="flex flex-col items-center justify-center mb-8 scale-110">
                    <Logo solid={false} />
                </div>

                {/* Card */}
                <div className="bg-white/[0.07] backdrop-blur-md border border-white/10 rounded-2xl p-8">
                    <label className="flex flex-col gap-2 mb-4">
                        <span className="text-xs font-semibold text-slate-400 uppercase tracking-widest">Password</span>
                        <input
                            type="password"
                            value={pw}
                            onChange={(e) => { setPw(e.target.value); setError(false); }}
                            onKeyDown={(e) => e.key === "Enter" && submit()}
                            placeholder="Enter admin password"
                            className={`px-4 py-3 rounded-xl border text-sm text-white bg-white/10 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-400 transition ${error ? "border-red-500/60" : "border-white/10"}`}
                        />
                        {error && (
                            <span className="text-xs text-red-400 flex items-center gap-1">
                                ⚠ Incorrect password. Try again.
                            </span>
                        )}
                    </label>

                    <button
                        onClick={submit}
                        disabled={loading || !pw}
                        className="w-full py-3 rounded-xl bg-linear-to-r from-blue-600 to-cyan-600 text-white font-semibold text-sm shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 hover:opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? "Verifying…" : "Sign In"}
                    </button>

                </div>
            </div>
        </div>
    );
}

// ─── Tab definitions ──────────────────────────────────────────────────────────

type Tab = "overview" | "publications" | "news" | "people" | "research" | "activities";

const tabs: { id: Tab; label: string; icon: string }[] = [
    { id: "overview", label: "Overview", icon: "📊" },
    { id: "publications", label: "Publications", icon: "📄" },
    { id: "news", label: "Announcements", icon: "📰" },
    { id: "people", label: "People", icon: "👥" },
    { id: "research", label: "Research Areas", icon: "🔬" },
    { id: "activities", label: "News", icon: "🎉" },
];

// ─── Publications Tab ─────────────────────────────────────────────────────────

function PublicationsTab() {
    const [items, setItems] = useState<Publication[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [editing, setEditing] = useState<Publication | null>(null);
    const [adding, setAdding] = useState(false);
    const [saving, setSaving] = useState(false);
    const blank: Omit<Publication, "id"> = { year: "", title: "", authors: "", journal: "", url: "", description: "" };
    const [form, setForm] = useState<Omit<Publication, "id">>(blank);

    const load = async () => {
        setLoading(true);
        setError(null);
        try {
            const res = await fetch("/api/publications");
            if (!res.ok) throw new Error("Failed to load");
            setItems(await res.json());
        } catch {
            setError("Could not load publications.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { load(); }, []);

    const save = async () => {
        setSaving(true);
        try {
            if (editing) {
                const res = await fetch(`/api/publications/${editing.id}`, {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(form),
                });
                if (!res.ok) throw new Error();
                const updated = await res.json();
                setItems((prev) => prev.map((p) => (p.id === editing.id ? updated : p)));
                setEditing(null);
            } else {
                const res = await fetch("/api/publications", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(form),
                });
                if (!res.ok) throw new Error();
                const created = await res.json();
                setItems((prev) => [...prev, created]);
                setAdding(false);
            }
            setForm(blank);
        } catch {
            alert("Save failed. Please try again.");
        } finally {
            setSaving(false);
        }
    };

    const del = async (id: number) => {
        if (!confirm("Delete this publication?")) return;
        try {
            const res = await fetch(`/api/publications/${id}`, { method: "DELETE" });
            if (!res.ok) throw new Error();
            setItems((prev) => prev.filter((p) => p.id !== id));
        } catch {
            alert("Delete failed.");
        }
    };

    const edit = (p: Publication) => { setEditing(p); setAdding(false); setForm({ year: p.year, title: p.title, authors: p.authors, journal: p.journal, url: p.url || "", description: p.description || "" }); };
    const cancel = () => { setEditing(null); setAdding(false); setForm(blank); };
    const showForm = editing !== null || adding;

    return (
        <div className="flex flex-col gap-6">
            <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-slate-800">Publications <Badge color="blue">{items.length}</Badge></h2>
                <div className="flex gap-2">
                    <Btn variant="secondary" size="sm" onClick={load}>↻ Refresh</Btn>
                    {!showForm && <Btn onClick={() => { setAdding(true); setEditing(null); }}>+ Add Publication</Btn>}
                </div>
            </div>

            {error && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-sm text-red-600">{error}</div>
            )}

            {showForm && (
                <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6 mb-6">
                    <h3 className="text-sm font-semibold text-slate-700 mb-4">{editing ? "Edit Publication" : "New Publication"}</h3>
                    <div className="grid grid-cols-2 gap-4 mb-4">
                        <Input label="Year" value={form.year} onChange={(v) => setForm((f) => ({ ...f, year: v }))} placeholder="2024" />
                        <Input label="Journal" value={form.journal} onChange={(v) => setForm((f) => ({ ...f, journal: v }))} placeholder="Nature Nanotechnology" />
                    </div>
                    <div className="flex flex-col gap-4 mb-4">
                        <Input label="Title" value={form.title} onChange={(v) => setForm((f) => ({ ...f, title: v }))} placeholder="Paper title…" />
                        <Input label="Authors" value={form.authors} onChange={(v) => setForm((f) => ({ ...f, authors: v }))} placeholder="Smith A., Jones B., et al." />
                    </div>
                    <div className="mb-4">
                        <Input label="External URL (Optional)" value={form.url || ""} onChange={(v) => setForm((f) => ({ ...f, url: v }))} placeholder="https://doi.org/10.1038/..." type="url" />
                    </div>
                    <div className="mb-4">
                        <Textarea label="Description (Optional)" value={form.description || ""} onChange={(v) => setForm((f) => ({ ...f, description: v }))} placeholder="Abstract or brief description of the publication…" rows={4} />
                    </div>
                    <div className="flex gap-2 mt-5">
                        <Btn onClick={save} disabled={saving || !form.title || !form.year || !form.authors || !form.journal} className={(saving || !form.title || !form.year || !form.authors || !form.journal) ? "opacity-50" : ""}>{saving ? "Saving…" : editing ? "Save Changes" : "Add"}</Btn>
                        <Btn variant="secondary" onClick={cancel}>Cancel</Btn>
                    </div>
                </div>
            )}

            {loading ? (
                <div className="flex items-center justify-center py-16 text-slate-400 text-sm">Loading…</div>
            ) : (
                <div className="flex flex-col gap-3">
                    {items.length === 0 && !showForm && (
                        <div className="text-center py-12 text-slate-400 text-sm">No publications yet. Click &quot;+ Add Publication&quot; to get started.</div>
                    )}
                    {items.map((p) => (
                        <div key={p.id} className="flex gap-4 items-start p-5 bg-white border border-slate-200 rounded-2xl hover:border-slate-300 transition-colors">
                            <div className="w-11 h-11 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600 font-bold text-xs shrink-0">{p.year}</div>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-semibold text-slate-800 leading-snug">
                                    {p.title}
                                    {p.url && <a href={p.url} target="_blank" rel="noreferrer" className="text-blue-500 hover:text-blue-700 ml-1.5" title="Has external link">↗</a>}
                                </p>
                                <p className="text-xs text-slate-500 mt-0.5 mb-2 truncate">{p.authors}</p>
                                <Badge color="blue">{p.journal}</Badge>
                                {p.description && (
                                    <p className="text-xs text-slate-500 mt-1.5 leading-relaxed line-clamp-2">{p.description}</p>
                                )}
                            </div>
                            <div className="flex gap-1.5 shrink-0">
                                <Btn variant="ghost" size="sm" onClick={() => edit(p)}>✏️ Edit</Btn>
                                <Btn variant="danger" size="sm" onClick={() => del(p.id)}>🗑 Delete</Btn>
                            </div>
                        </div>
                    ))}
                </div>
            )
            }
        </div >
    );
}


// ─── News Tab ─────────────────────────────────────────────────────────────────

function NewsTab() {
    const [items, setItems] = useState<NewsItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [editing, setEditing] = useState<NewsItem | null>(null);
    const [adding, setAdding] = useState(false);
    const [saving, setSaving] = useState(false);
    const [uploading, setUploading] = useState(false);
    const blank: Omit<NewsItem, "id"> = { date: "", title: "", body: "", url: "", photoUrl: null };
    const [form, setForm] = useState<Omit<NewsItem, "id">>(blank);

    const load = async () => {
        setLoading(true);
        try { setItems(await (await fetch("/api/news")).json()); }
        catch { /* ignore */ }
        finally { setLoading(false); }
    };
    useEffect(() => { load(); }, []);

    const save = async () => {
        setSaving(true);
        try {
            if (editing) {
                const res = await fetch(`/api/news/${editing.id}`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
                const updated = await res.json();
                setItems((prev) => prev.map((n) => (n.id === editing.id ? updated : n)));
                setEditing(null);
            } else {
                const res = await fetch("/api/news", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
                const created = await res.json();
                setItems((prev) => [created, ...prev]);
                setAdding(false);
            }
            setForm(blank);
        } catch { alert("Save failed."); }
        finally { setSaving(false); }
    };

    const del = async (id: number) => {
        if (!confirm("Delete this news item?")) return;
        await fetch(`/api/news/${id}`, { method: "DELETE" });
        setItems((prev) => prev.filter((n) => n.id !== id));
    };

    const edit = (n: NewsItem) => { setEditing(n); setAdding(false); setForm({ date: n.date, title: n.title, body: n.body, url: n.url || "", photoUrl: n.photoUrl || null }); };
    const cancel = () => { setEditing(null); setAdding(false); setForm(blank); };
    const showForm = editing !== null || adding;

    return (
        <div className="flex flex-col gap-6">
            <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-slate-800">Announcements <Badge color="amber">{items.length}</Badge></h2>
                <div className="flex gap-2">
                    <Btn variant="secondary" size="sm" onClick={load}>↻ Refresh</Btn>
                    {!showForm && <Btn onClick={() => { setAdding(true); setEditing(null); }}>+ Add Announcement</Btn>}
                </div>
            </div>

            {showForm && (
                <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6">
                    <h3 className="text-sm font-semibold text-slate-700 mb-4">{editing ? "Edit Announcement" : "New Announcement"}</h3>
                    <div className="flex flex-col gap-4">
                        <Input label="Date" value={form.date} onChange={(v) => setForm((f) => ({ ...f, date: v }))} placeholder="March 2025" />
                        <Input label="Title" value={form.title} onChange={(v) => setForm((f) => ({ ...f, title: v }))} placeholder="Headline…" />
                        <Input label="External URL (Optional)" value={form.url || ""} onChange={(v) => setForm((f) => ({ ...f, url: v }))} placeholder="https://..." type="url" />

                        <label className="flex flex-col gap-1.5">
                            <span className="text-xs font-semibold text-slate-500 uppercase tracking-widest">Image (Optional)</span>
                            <div className="flex items-center gap-3">
                                {form.photoUrl && (
                                    // eslint-disable-next-line @next/next/no-img-element
                                    <img src={form.photoUrl} alt="Preview" className="w-10 h-10 rounded-lg object-cover border border-slate-200" />
                                )}
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={async (e) => {
                                        const file = e.target.files?.[0];
                                        if (!file) return;
                                        setUploading(true);
                                        const formData = new FormData();
                                        formData.append("file", file);
                                        try {
                                            const res = await fetch("/api/upload", { method: "POST", body: formData });
                                            if (!res.ok) throw new Error();
                                            const { url } = await res.json();
                                            setForm((f) => ({ ...f, photoUrl: url }));
                                        } catch {
                                            alert("Upload failed.");
                                        } finally {
                                            setUploading(false);
                                        }
                                    }}
                                    className="text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 transition-colors cursor-pointer"
                                />
                                {form.photoUrl && (
                                    <button type="button" onClick={() => setForm(f => ({ ...f, photoUrl: null }))} className="text-xs text-red-500 hover:underline">Remove</button>
                                )}
                                {uploading && <span className="text-xs text-slate-500 animate-pulse">Uploading…</span>}
                            </div>
                        </label>

                        <Textarea label="Body" value={form.body} onChange={(v) => setForm((f) => ({ ...f, body: v }))} placeholder="News details…" />
                    </div>
                    <div className="flex gap-2 mt-5">
                        <Btn onClick={save} disabled={saving || uploading || !form.title || !form.date} className={(saving || uploading || !form.title || !form.date) ? "opacity-50" : ""}>{saving ? "Saving…" : editing ? "Save Changes" : "Add"}</Btn>
                        <Btn variant="secondary" onClick={cancel}>Cancel</Btn>
                    </div>
                </div>
            )}

            {loading ? (
                <div className="flex items-center justify-center py-16 text-slate-400 text-sm">Loading…</div>
            ) : (
                <div className="flex flex-col gap-3">
                    {items.length === 0 && !showForm && <div className="text-center py-12 text-slate-400 text-sm">No announcements yet. Click &quot;+ Add Announcement&quot; to get started.</div>}
                    {items.map((n) => (
                        <div key={n.id} className="p-5 bg-white border border-slate-200 rounded-2xl hover:border-slate-300 transition-colors">
                            <div className="flex items-start justify-between gap-3">
                                <div>
                                    <span className="text-xs font-semibold text-amber-600 uppercase tracking-widest">{n.date}</span>
                                    <h3 className="text-sm font-semibold text-slate-800 mt-0.5">{n.title}</h3>
                                    <p className="text-xs text-slate-500 mt-1 leading-relaxed">{n.body}</p>
                                </div>
                                <div className="flex gap-1.5 shrink-0">
                                    <Btn variant="ghost" size="sm" onClick={() => edit(n)}>✏️</Btn>
                                    <Btn variant="danger" size="sm" onClick={() => del(n.id)}>🗑</Btn>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

// ─── People Tab ───────────────────────────────────────────────────────────────

function PeopleTab() {
    const [items, setItems] = useState<Member[]>([]);
    const [loading, setLoading] = useState(true);
    const [editing, setEditing] = useState<Member | null>(null);
    const [adding, setAdding] = useState(false);
    const [saving, setSaving] = useState(false);
    const [uploading, setUploading] = useState(false);
    const blank: Omit<Member, "id"> = { name: "", role: "", focus: "", email: "", originCountry: "", biography: "", photoUrl: null };
    const [form, setForm] = useState<Omit<Member, "id">>(blank);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const load = async () => {
        setLoading(true);
        try { setItems(await (await fetch("/api/members")).json()); }
        catch { /* ignore */ }
        finally { setLoading(false); }
    };
    useEffect(() => { load(); }, []);

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        setUploading(true);
        try {
            const fd = new FormData();
            fd.append("file", file);
            const res = await fetch("/api/upload", { method: "POST", body: fd });
            const data = await res.json();
            if (data.url) setForm((f) => ({ ...f, photoUrl: data.url }));
            else alert(data.error ?? "Upload failed");
        } catch { alert("Upload failed."); }
        finally { setUploading(false); }
    };

    const save = async () => {
        setSaving(true);
        try {
            if (editing) {
                const res = await fetch(`/api/members/${editing.id}`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
                const updated = await res.json();
                setItems((prev) => prev.map((m) => (m.id === editing.id ? updated : m)));
                setEditing(null);
            } else {
                const res = await fetch("/api/members", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
                const created = await res.json();
                setItems((prev) => [...prev, created]);
                setAdding(false);
            }
            setForm(blank);
        } catch { alert("Save failed."); }
        finally { setSaving(false); }
    };

    const del = async (id: number) => {
        if (!confirm("Remove this member?")) return;
        await fetch(`/api/members/${id}`, { method: "DELETE" });
        setItems((prev) => prev.filter((m) => m.id !== id));
    };

    const edit = (m: Member) => { setEditing(m); setAdding(false); setForm({ name: m.name, role: m.role, focus: m.focus, email: m.email || "", originCountry: m.originCountry || "", biography: m.biography || "", photoUrl: m.photoUrl }); };
    const cancel = () => { setEditing(null); setAdding(false); setForm(blank); };
    const showForm = editing !== null || adding;

    const roleColor: Record<string, string> = {
        "Principal Investigator": "purple", "Senior Researcher": "blue",
        "Postdoctoral Fellow": "green", "PhD Candidate": "amber", "MSc Student": "red",
    };

    return (
        <div className="flex flex-col gap-6">
            <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-slate-800">People <Badge color="purple">{items.length}</Badge></h2>
                <div className="flex gap-2">
                    <Btn variant="secondary" size="sm" onClick={load}>↻ Refresh</Btn>
                    {!showForm && <Btn onClick={() => { setAdding(true); setEditing(null); }}>+ Add Member</Btn>}
                </div>
            </div>

            {showForm && (
                <div className="bg-purple-50 border border-purple-200 rounded-2xl p-6">
                    <h3 className="text-sm font-semibold text-slate-700 mb-4">{editing ? "Edit Member" : "New Member"}</h3>

                    {/* Photo picker */}
                    <div className="flex items-center gap-4 mb-4">
                        <div
                            onClick={() => fileInputRef.current?.click()}
                            className="relative w-20 h-20 rounded-2xl bg-purple-100 border-2 border-dashed border-purple-300 flex items-center justify-center cursor-pointer hover:border-purple-500 transition-colors overflow-hidden shrink-0"
                        >
                            {form.photoUrl ? (
                                // eslint-disable-next-line @next/next/no-img-element
                                <img src={form.photoUrl} alt="preview" className="w-full h-full object-cover" />
                            ) : uploading ? (
                                <span className="text-purple-400 text-xs text-center">uploading…</span>
                            ) : (
                                <span className="text-purple-400 text-2xl">📷</span>
                            )}
                        </div>
                        <div className="flex flex-col gap-1">
                            <p className="text-xs font-medium text-slate-600">Member Photo</p>
                            <p className="text-xs text-slate-400">Click the box to upload · max 5 MB</p>
                            {form.photoUrl && (
                                <button onClick={() => setForm((f) => ({ ...f, photoUrl: null }))} className="text-xs text-red-500 hover:underline text-left">Remove photo</button>
                            )}
                        </div>
                        <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-4">
                        <Input label="Name" value={form.name} onChange={(v) => setForm((f) => ({ ...f, name: v }))} placeholder="Dr. Jane Smith" />
                        <Input label="Role" value={form.role} onChange={(v) => setForm((f) => ({ ...f, role: v }))} placeholder="PhD Candidate" />
                    </div>
                    <Input label="Research Focus" value={form.focus} onChange={(v) => setForm((f) => ({ ...f, focus: v }))} placeholder="Molecular nanotechnology…" />
                    <div className="grid grid-cols-2 gap-4 mt-4">
                        <Input label="Email (Optional)" type="email" value={form.email || ""} onChange={(v) => setForm((f) => ({ ...f, email: v }))} placeholder="lab@example.com" />
                        <Input label="Origin Country (Optional)" value={form.originCountry || ""} onChange={(v) => setForm((f) => ({ ...f, originCountry: v }))} placeholder="E.g. France, Japan..." />
                    </div>
                    <div className="mt-4">
                        <Textarea label="Biography (Optional)" value={form.biography || ""} onChange={(v) => setForm((f) => ({ ...f, biography: v }))} placeholder="Background, education, current projects..." rows={5} />
                    </div>
                    <div className="flex gap-2 mt-5">
                        <Btn onClick={save} disabled={saving || uploading || !form.name} className={(saving || uploading || !form.name) ? "opacity-50" : ""}>{saving ? "Saving…" : editing ? "Save Changes" : "Add"}</Btn>
                        <Btn variant="secondary" onClick={cancel}>Cancel</Btn>
                    </div>
                </div>
            )}

            {loading ? (
                <div className="flex items-center justify-center py-16 text-slate-400 text-sm">Loading…</div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {items.length === 0 && !showForm && <div className="col-span-2 text-center py-12 text-slate-400 text-sm">No members yet. Click &quot;+ Add Member&quot; to get started.</div>}
                    {items.map((m) => (
                        <div key={m.id} className="p-5 bg-white border border-slate-200 rounded-2xl hover:border-slate-300 transition-colors">
                            <div className="flex items-start gap-3">
                                {/* Photo or emoji avatar */}
                                <div className="w-12 h-12 rounded-xl overflow-hidden shrink-0 bg-purple-50 flex items-center justify-center">
                                    {m.photoUrl
                                        // eslint-disable-next-line @next/next/no-img-element
                                        ? <img src={m.photoUrl} alt={m.name} className="w-full h-full object-cover" />
                                        : <span className="text-xl">{"👤"}</span>
                                    }
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-semibold text-slate-800">{m.name}</p>
                                    <Badge color={roleColor[m.role] ?? "blue"}>{m.role}</Badge>
                                    <p className="text-xs text-slate-500 mt-1.5">{m.focus}</p>
                                    {m.email && <p className="text-xs text-slate-400 mt-1">✉️ {m.email}</p>}
                                </div>
                                <div className="flex gap-1 shrink-0">
                                    <Btn variant="ghost" size="sm" onClick={() => edit(m)}>✏️</Btn>
                                    <Btn variant="danger" size="sm" onClick={() => del(m.id)}>🗑</Btn>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

// ─── Research Areas Tab ───────────────────────────────────────────────────────

function ResearchTab() {
    const [items, setItems] = useState<ResearchArea[]>([]);
    const [loading, setLoading] = useState(true);
    const [editing, setEditing] = useState<ResearchArea | null>(null);
    const [adding, setAdding] = useState(false);
    const [saving, setSaving] = useState(false);
    const [uploading, setUploading] = useState(false);
    const blank: Omit<ResearchArea, "id"> = { photoUrl: null, title: "", description: "" };
    const [form, setForm] = useState<Omit<ResearchArea, "id">>(blank);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const load = async () => {
        setLoading(true);
        try { setItems(await (await fetch("/api/research-areas")).json()); }
        catch { /* ignore */ }
        finally { setLoading(false); }
    };
    useEffect(() => { load(); }, []);

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        setUploading(true);
        try {
            const fd = new FormData();
            fd.append("file", file);
            const res = await fetch("/api/upload", { method: "POST", body: fd });
            const data = await res.json();
            if (data.url) setForm((f) => ({ ...f, photoUrl: data.url }));
            else alert(data.error ?? "Upload failed");
        } catch { alert("Upload failed."); }
        finally { setUploading(false); }
    };

    const save = async () => {
        setSaving(true);
        try {
            if (editing) {
                const res = await fetch(`/api/research-areas/${editing.id}`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
                const updated = await res.json();
                setItems((prev) => prev.map((r) => (r.id === editing.id ? updated : r)));
                setEditing(null);
            } else {
                const res = await fetch("/api/research-areas", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
                const created = await res.json();
                setItems((prev) => [...prev, created]);
                setAdding(false);
            }
            setForm(blank);
        } catch { alert("Save failed."); }
        finally { setSaving(false); }
    };

    const del = async (id: number) => {
        if (!confirm("Delete this research area?")) return;
        await fetch(`/api/research-areas/${id}`, { method: "DELETE" });
        setItems((prev) => prev.filter((r) => r.id !== id));
    };

    const edit = (r: ResearchArea) => { setEditing(r); setAdding(false); setForm({ photoUrl: r.photoUrl, title: r.title, description: r.description }); };
    const cancel = () => { setEditing(null); setAdding(false); setForm(blank); };
    const showForm = editing !== null || adding;

    return (
        <div className="flex flex-col gap-6">
            <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-slate-800">Research Areas <Badge color="green">{items.length}</Badge></h2>
                <div className="flex gap-2">
                    <Btn variant="secondary" size="sm" onClick={load}>↻ Refresh</Btn>
                    {!showForm && <Btn onClick={() => { setAdding(true); setEditing(null); }}>+ Add Area</Btn>}
                </div>
            </div>

            {showForm && (
                <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-6">
                    <h3 className="text-sm font-semibold text-slate-700 mb-4">{editing ? "Edit Area" : "New Research Area"}</h3>
                    <div className="flex flex-col sm:flex-row gap-6 mb-4">
                        <div className="flex flex-col items-center gap-3">
                            <div className="w-24 h-24 rounded-2xl bg-white border-2 border-dashed border-slate-300 flex items-center justify-center overflow-hidden">
                                {form.photoUrl ? (
                                    <img src={form.photoUrl} alt="Cover" className="w-full h-full object-cover" />
                                ) : (
                                    <span className="text-3xl text-slate-300">🖼️</span>
                                )}
                            </div>
                            <div>
                                <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleFileChange} />
                                <Btn variant="secondary" size="sm" onClick={() => fileInputRef.current?.click()} disabled={uploading}>
                                    {uploading ? "Uploading..." : "Upload Image"}
                                </Btn>
                            </div>
                        </div>
                        <div className="flex-1 flex flex-col gap-4 justify-center">
                            <Input label="Title" value={form.title} onChange={(v) => setForm((f) => ({ ...f, title: v }))} placeholder="Research area name…" />
                        </div>
                    </div>
                    <Textarea label="Description" value={form.description} onChange={(v) => setForm((f) => ({ ...f, description: v }))} placeholder="Brief description…" />
                    <div className="flex gap-2 mt-5">
                        <Btn onClick={save} disabled={saving || !form.title} className={(saving || !form.title) ? "opacity-50" : ""}>{saving ? "Saving…" : editing ? "Save Changes" : "Add"}</Btn>
                        <Btn variant="secondary" onClick={cancel}>Cancel</Btn>
                    </div>
                </div>
            )}

            {loading ? (
                <div className="flex items-center justify-center py-16 text-slate-400 text-sm">Loading…</div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {items.length === 0 && !showForm && <div className="col-span-2 text-center py-12 text-slate-400 text-sm">No research areas yet. Click &quot;+ Add Area&quot; to get started.</div>}
                    {items.map((r) => (
                        <div key={r.id} className="flex gap-4 p-5 bg-white border border-slate-200 rounded-2xl hover:border-slate-300 transition-colors items-center">
                            <div className="w-16 h-16 rounded-xl bg-slate-50 flex items-center justify-center text-2xl overflow-hidden shrink-0 border border-slate-100">
                                {r.photoUrl ? (
                                    <img src={r.photoUrl} alt={r.title} className="w-full h-full object-cover" />
                                ) : (
                                    "🔬"
                                )}
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-semibold text-slate-800">{r.title}</p>
                                <p className="text-xs text-slate-500 mt-0.5 leading-relaxed truncate">{r.description}</p>
                            </div>
                            <div className="flex gap-1 shrink-0">
                                <Btn variant="ghost" size="sm" onClick={() => edit(r)}>✏️</Btn>
                                <Btn variant="danger" size="sm" onClick={() => del(r.id)}>🗑</Btn>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

// ─── Activities Tab ───────────────────────────────────────────────────────────

const categoryOptions = ["Lab Meetings", "Outreach & Events", "Social & Wellbeing", "Conferences & Travel"];

function ActivitiesTab() {
    const [items, setItems] = useState<Activity[]>([]);
    const [loading, setLoading] = useState(true);
    const [editing, setEditing] = useState<Activity | null>(null);
    const [adding, setAdding] = useState(false);
    const [saving, setSaving] = useState(false);
    const [uploading, setUploading] = useState(false);
    const blank: Omit<Activity, "id"> = { title: "", date: "", description: "", category: "Lab Meetings", emoji: "🎉", photoUrl: null };
    const [form, setForm] = useState<Omit<Activity, "id">>(blank);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const load = async () => {
        setLoading(true);
        try { setItems(await (await fetch("/api/activities")).json()); }
        catch { /* ignore */ }
        finally { setLoading(false); }
    };
    useEffect(() => { load(); }, []);

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        setUploading(true);
        try {
            const fd = new FormData();
            fd.append("file", file);
            const res = await fetch("/api/upload", { method: "POST", body: fd });
            const data = await res.json();
            if (data.url) setForm((f) => ({ ...f, photoUrl: data.url }));
            else alert(data.error ?? "Upload failed");
        } catch { alert("Upload failed."); }
        finally { setUploading(false); }
    };

    const save = async () => {
        setSaving(true);
        try {
            if (editing) {
                const res = await fetch(`/api/activities/${editing.id}`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
                const updated = await res.json();
                setItems((prev) => prev.map((a) => (a.id === editing.id ? updated : a)));
                setEditing(null);
            } else {
                const res = await fetch("/api/activities", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
                const created = await res.json();
                setItems((prev) => [created, ...prev]);
                setAdding(false);
            }
            setForm(blank);
        } catch { alert("Save failed."); }
        finally { setSaving(false); }
    };

    const del = async (id: number) => {
        if (!confirm("Delete this news item?")) return;
        await fetch(`/api/activities/${id}`, { method: "DELETE" });
        setItems((prev) => prev.filter((a) => a.id !== id));
    };

    const edit = (a: Activity) => { setEditing(a); setAdding(false); setForm({ title: a.title, date: a.date, description: a.description, category: a.category, emoji: a.emoji, photoUrl: a.photoUrl }); };
    const cancel = () => { setEditing(null); setAdding(false); setForm(blank); };
    const showForm = editing !== null || adding;

    const catColor: Record<string, string> = {
        "Lab Meetings": "blue", "Outreach & Events": "green",
        "Social & Wellbeing": "purple", "Conferences & Travel": "amber",
    };

    return (
        <div className="flex flex-col gap-6">
            <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-slate-800">News <Badge color="amber">{items.length}</Badge></h2>
                <div className="flex gap-2">
                    <Btn variant="secondary" size="sm" onClick={load}>↻ Refresh</Btn>
                    {!showForm && <Btn onClick={() => { setAdding(true); setEditing(null); }}>+ Add News Item</Btn>}
                </div>
            </div>

            {showForm && (
                <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6">
                    <h3 className="text-sm font-semibold text-slate-700 mb-4">{editing ? "Edit News Item" : "New News Item"}</h3>
                    <div className="grid grid-cols-2 gap-4 mb-4">
                        <Input label="Title" value={form.title} onChange={(v) => setForm((f) => ({ ...f, title: v }))} placeholder="Weekly Research Seminar" />
                        <Input label="Date" value={form.date} onChange={(v) => setForm((f) => ({ ...f, date: v }))} placeholder="Every Thursday, 10:00 AM" />
                    </div>
                    {/* Photo picker & Category */}
                    <div className="flex items-center gap-4 mb-4">
                        <div
                            onClick={() => fileInputRef.current?.click()}
                            className="w-16 h-16 rounded-xl border-2 border-dashed border-amber-300 bg-amber-50 flex items-center justify-center text-amber-500 cursor-pointer overflow-hidden hover:bg-amber-100 transition-colors shrink-0"
                            title="Upload cover photo"
                        >
                            {form.photoUrl ? (
                                <>
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img src={form.photoUrl} alt="preview" className="w-full h-full object-cover" />
                                </>
                            ) : uploading ? (
                                <span className="text-[10px] font-medium animate-pulse">uploading…</span>
                            ) : (
                                <span className="text-xl">📷</span>
                            )}
                        </div>
                        {form.photoUrl && (
                            <button onClick={() => setForm((f) => ({ ...f, photoUrl: null }))} className="text-xs text-red-500 hover:underline">
                                Remove
                            </button>
                        )}
                        <input
                            ref={fileInputRef}
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={handleFileChange}
                        />

                        <div className="flex flex-col gap-1 ml-auto shrink-0 w-48">
                            <label className="text-xs font-semibold text-slate-600">Category</label>
                            <select
                                value={form.category}
                                onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))}
                                className="px-3 py-2 text-sm border border-slate-200 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-brand-200"
                            >
                                {categoryOptions.map((c) => <option key={c} value={c}>{c}</option>)}
                            </select>
                        </div>
                    </div>
                    <Textarea label="Description" value={form.description} onChange={(v) => setForm((f) => ({ ...f, description: v }))} placeholder="Activity details…" />
                    <div className="flex gap-2 mt-5">
                        <Btn onClick={save} disabled={saving || !form.title} className={(saving || !form.title) ? "opacity-50" : ""}>{saving ? "Saving…" : editing ? "Save Changes" : "Add"}</Btn>
                        <Btn variant="secondary" onClick={cancel}>Cancel</Btn>
                    </div>
                </div>
            )}

            {loading ? (
                <div className="flex items-center justify-center py-16 text-slate-400 text-sm">Loading…</div>
            ) : (
                <div className="flex flex-col gap-3">
                    {items.length === 0 && !showForm && <div className="text-center py-12 text-slate-400 text-sm">No news yet. Click &quot;+ Add News Item&quot; to get started.</div>}
                    {items.map((a) => (
                        <div key={a.id} className="p-5 bg-white border border-slate-200 rounded-2xl hover:border-slate-300 transition-colors">
                            <div className="flex items-start gap-4">
                                <div className="w-16 h-16 rounded-xl bg-amber-50 flex items-center justify-center text-2xl shrink-0 overflow-hidden border border-amber-100">
                                    {a.photoUrl ? (
                                        // eslint-disable-next-line @next/next/no-img-element
                                        <img src={a.photoUrl} alt={a.title} className="w-full h-full object-cover" />
                                    ) : (
                                        a.emoji || "🎉"
                                    )}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-semibold text-slate-800">{a.title}</p>
                                    <div className="flex items-center gap-2 mt-0.5">
                                        <Badge color={catColor[a.category] ?? "blue"}>{a.category}</Badge>
                                        <span className="text-xs text-slate-400">{a.date}</span>
                                    </div>
                                    <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">{a.description}</p>
                                </div>
                                <div className="flex gap-1 shrink-0">
                                    <Btn variant="ghost" size="sm" onClick={() => edit(a)}>✏️</Btn>
                                    <Btn variant="danger" size="sm" onClick={() => del(a.id)}>🗑</Btn>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

// ─── Overview Tab ─────────────────────────────────────────────────────────────

function OverviewTab({ onNav }: { onNav: (tab: Tab) => void }) {
    const cards = [
        { label: "Publications", value: seedPublications.length, color: "blue", tab: "publications" as Tab },
        { label: "Announcements", value: seedNews.length, color: "amber", tab: "news" as Tab },
        { label: "Team Members", value: seedMembers.length, color: "purple", tab: "people" as Tab },
        { label: "Research Areas", value: seedResearch.length, color: "green", tab: "research" as Tab },
    ];
    const colorMap: Record<string, string> = {
        blue: "from-blue-500 to-cyan-500",
        amber: "from-amber-400 to-orange-500",
        purple: "from-purple-500 to-violet-600",
        green: "from-emerald-500 to-teal-500",
    };
    const bgMap: Record<string, string> = {
        blue: "bg-blue-50", amber: "bg-amber-50", purple: "bg-purple-50", green: "bg-emerald-50",
    };

    return (
        <div className="flex flex-col gap-8">
            <div>
                <h2 className="text-lg font-semibold text-slate-800 mb-1">Welcome back 👋</h2>
                <p className="text-sm text-slate-500">Manage all content for the MNBE Lab website from here.</p>
            </div>

            {/* Stat cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {cards.map((c) => (
                    <button
                        key={c.label}
                        onClick={() => onNav(c.tab)}
                        className={`text-left p-5 rounded-2xl ${bgMap[c.color]} border border-transparent hover:border-current hover:scale-[1.01] transition-all duration-150`}
                    >
                        <div className={`w-10 h-10 rounded-xl bg-linear-to-br ${colorMap[c.color]} flex items-center justify-center text-white font-bold text-lg mb-3`}>
                            {c.value}
                        </div>
                        <p className="text-sm font-semibold text-slate-700">{c.label}</p>
                        <p className="text-xs text-slate-400 mt-0.5">Click to manage →</p>
                    </button>
                ))}
            </div>

            {/* Quick tips */}
            <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200">
                <h3 className="text-sm font-semibold text-slate-700 mb-3">Quick Tips</h3>
                <ul className="flex flex-col gap-2 text-xs text-slate-500">
                    <li className="flex gap-2"><span className="text-blue-400">•</span> Use the tabs above to manage each content section.</li>
                    <li className="flex gap-2"><span className="text-blue-400">•</span> Changes are held in-memory for this session. Connect a database to persist them.</li>
                    <li className="flex gap-2"><span className="text-blue-400">•</span> Admin access is controlled server-side. Set <code className="bg-white px-1 py-0.5 rounded border border-slate-200">ADMIN_PASSWORD</code> and <code className="bg-white px-1 py-0.5 rounded border border-slate-200">ADMIN_SESSION_TOKEN</code> in production.</li>
                </ul>
            </div>
        </div>
    );
}

// ─── Dashboard shell ──────────────────────────────────────────────────────────

function Dashboard({ onLogout }: { onLogout: () => Promise<void> | void }) {
    const [activeTab, setActiveTab] = useState<Tab>("publications");

    return (
        <div className="min-h-screen bg-slate-100 flex">
            {/* Sidebar */}
            <aside className="w-56 bg-white border-r border-slate-200 flex flex-col shrink-0">
                {/* Logo */}
                <div className="flex items-center justify-center px-5 py-5 border-b border-slate-100">
                    <Logo solid={true} />
                </div>

                {/* Nav */}
                <nav className="flex-1 p-3 flex flex-col gap-0.5">
                    {tabs.map((t) => (
                        <button
                            key={t.id}
                            onClick={() => setActiveTab(t.id)}
                            className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-medium transition-all text-left w-full ${activeTab === t.id
                                ? "bg-blue-50 text-blue-700"
                                : "text-slate-600 hover:bg-slate-50 hover:text-slate-800"
                                }`}
                        >
                            <span>{t.icon}</span>
                            {t.label}
                        </button>
                    ))}
                </nav>

                {/* Footer */}
                <div className="p-3 border-t border-slate-100">
                    <a href="/" target="_blank" className="flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm font-medium text-slate-500 hover:bg-slate-50 hover:text-slate-700 transition-colors">
                        🌐 View Site
                    </a>
                    <button
                        onClick={onLogout}
                        className="flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm font-medium text-red-500 hover:bg-red-50 w-full text-left transition-colors"
                    >
                        🚪 Sign Out
                    </button>
                </div>
            </aside>

            {/* Main content */}
            <main className="flex-1 overflow-auto">
                {/* Top bar */}
                <div className="sticky top-0 z-10 bg-white/80 backdrop-blur-sm border-b border-slate-200 px-8 py-4 flex items-center justify-between">
                    <div>
                        <h1 className="text-base font-semibold text-slate-800">
                            {tabs.find((t) => t.id === activeTab)?.icon}{" "}
                            {tabs.find((t) => t.id === activeTab)?.label}
                        </h1>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="flex items-center gap-2">
                            <div className="w-7 h-7 rounded-full bg-linear-to-br from-blue-600 to-cyan-500 flex items-center justify-center text-white text-xs font-bold">A</div>
                            <span className="text-xs text-slate-500 font-medium">Admin</span>
                        </div>
                        <button
                            onClick={onLogout}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-red-600 bg-red-50 border border-red-200 hover:bg-red-100 transition-colors"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3.5 h-3.5">
                                <path fillRule="evenodd" d="M3 4.25A2.25 2.25 0 015.25 2h5.5A2.25 2.25 0 0113 4.25v2a.75.75 0 01-1.5 0v-2a.75.75 0 00-.75-.75h-5.5a.75.75 0 00-.75.75v11.5c0 .414.336.75.75.75h5.5a.75.75 0 00.75-.75v-2a.75.75 0 011.5 0v2A2.25 2.25 0 0110.75 18h-5.5A2.25 2.25 0 013 15.75V4.25z" clipRule="evenodd" />
                                <path fillRule="evenodd" d="M19 10a.75.75 0 00-.75-.75H8.704l1.048-.943a.75.75 0 10-1.004-1.114l-2.5 2.25a.75.75 0 000 1.114l2.5 2.25a.75.75 0 101.004-1.114l-1.048-.943h9.546A.75.75 0 0019 10z" clipRule="evenodd" />
                            </svg>
                            Sign Out
                        </button>
                    </div>
                </div>

                {/* Tab content */}
                <div className="p-8 max-w-5xl mx-auto">
                    {activeTab === "overview" && <OverviewTab onNav={setActiveTab} />}
                    {activeTab === "publications" && <PublicationsTab />}
                    {activeTab === "news" && <NewsTab />}
                    {activeTab === "people" && <PeopleTab />}
                    {activeTab === "research" && <ResearchTab />}
                    {activeTab === "activities" && <ActivitiesTab />}
                </div>
            </main>
        </div>
    );
}

// ─── Root ─────────────────────────────────────────────────────────────────────

export default function AdminPage() {
    const [auth, setAuth] = useState<boolean | null>(null);

    useEffect(() => {
        let cancelled = false;

        const checkSession = async () => {
            try {
                const response = await fetch("/api/admin/session", { cache: "no-store" });
                const data = await response.json();

                if (!cancelled) {
                    setAuth(Boolean(data.authenticated));
                }
            } catch {
                if (!cancelled) {
                    setAuth(false);
                }
            }
        };

        checkSession();

        return () => {
            cancelled = true;
        };
    }, []);

    const logout = async () => {
        try {
            await fetch("/api/admin/logout", { method: "POST" });
        } finally {
            setAuth(false);
        }
    };

    // Avoid hydration mismatch
    if (auth === null) return <div className="min-h-screen bg-slate-900" />;

    return auth ? <Dashboard onLogout={logout} /> : <LoginScreen onLogin={() => setAuth(true)} />;
}
