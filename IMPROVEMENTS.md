# MNBE Lab — Engineering & UX Review

This document is a senior-engineer review of the codebase (Next.js 16 / App Router, Drizzle + Neon Postgres), covering system architecture, security, frontend structure, UX, accessibility, performance, and tooling. Findings from the original review (Critical/High priority tiers, plus the "Suggested sequencing" steps 1–5) have since been fixed — see **Resolved** below for what changed. Remaining findings are in **Open**, ordered by severity.

---

## Resolved

- ✅ **Admin auth hardened.** `src/lib/admin-auth.ts` now issues a random per-login session token stored in a new `admin_sessions` DB table (not a static shared secret), so logout revokes exactly one session instead of every session at once. Added in-memory login rate limiting (5 failed attempts / 10 min per IP → 429).
- ✅ **`pnpm lint` passes with 0 errors** (was 5 errors). Fixed unescaped entities in `research/bioinspiration/page.tsx` and typed the catch blocks in `tmp_migrate.ts`.
- ✅ **Admin Overview stats are real.** Deleted the hardcoded `seedPublications`/`seedNews`/`seedMembers`/`seedResearch` arrays; the Overview tab now fetches live counts from each API route.
- ✅ **Homepage stats are real.** The "Interested in collaborating?" section now computes Publications/Research Areas/Team Members/News counts via `count()` queries instead of hardcoded `"40+"`/`"12"`/`"25+"` strings. Removed "Active Projects" (no backing table existed for it) in favor of a real "News & Updates" count.
- ✅ **"Our Mission" cards now pull from the `research_areas` table** instead of a disconnected hardcoded array. Seeded the table with the 3 existing cards' content so nothing regressed; icons are looked up by title with a generic fallback for any area added later.
- ✅ **Facilities now has full DB + admin CRUD**, matching every other content type. Added a `facilities` table, `/api/facilities` + `/api/facilities/[id]` routes, a "Facilities" admin tab, and seeded the 8 existing equipment entries. `/facilities` now reads from the DB.
- ✅ **Per-page metadata added** to all 10 routes that were sharing the root layout's title/description (`/publications`, `/people`, `/contact`, `/news`, `/facilities`, `/research` + its 3 subpages, `/admin` via a new `admin/layout.tsx` with `noindex`).

---

## Open

### Medium priority

**`admin/page.tsx` is a ~1000-line single file with five near-duplicate CRUD implementations.** Publications/News/People/Research Areas/Facilities tabs each reimplement their own `load`/`save`/`del`/`edit` state machine and form JSX from scratch, and the shared `Btn`/`Input`/`Textarea`/`Badge` primitives are defined inline in this one file rather than in `src/components`.
→ Extract a generic `useCrudResource(endpoint)` hook and a shared list/form shell; move the UI primitives to `src/components/admin/`.

**No pagination on any list endpoint.** `/api/publications`, `/api/news`, `/api/members`, `/api/research-areas`, `/api/facilities` all `db.select().from(x)` with no `.limit()`/`.offset()` — fine at current row counts, but both the admin tabs and public pages fetch and render the entire table every time.
→ Add cursor/offset pagination once any table meaningfully grows (publications is already the largest at ~19 rows).

**No migration history for schema changes.** `drizzle.config.ts:6` points `out` at `./drizzle`, but that folder doesn't exist — all schema changes go through `db:push` (destructive diffing) with no versioned migration files. `tmp_migrate.ts` (repo root) is a leftover ad-hoc one-off ALTER script from before this pattern was established.
→ Switch to `drizzle-kit generate` + `migrate` for tracked, reversible migrations; delete `tmp_migrate.ts` now that its one-off change is confirmed applied.

**`mammoth` is a dead dependency.** Declared in `package.json`, zero references anywhere in `src/`.
→ Remove it; re-add if a docx-import feature is actually built.

**Upload MIME validation trusts the client.** `src/app/api/upload/route.ts` checks `file.type.startsWith("image/")`, which is the browser-supplied `Content-Type` — not verified against actual file bytes. A relabeled non-image file would pass and be stored/served under a spoofed mimetype.
→ Sniff magic bytes server-side (e.g. `file-type` package) before accepting the upload.

**Images are base64 text blobs in Postgres.** `images` table stores `data: text`; upload base64-encodes the whole file into a row, and every view round-trips through Neon to decode it back. ~33% storage overhead versus binary, bloats DB backups, and every cache-miss request costs a full DB query + decode instead of hitting a CDN edge.
→ Move to object storage (Vercel Blob, S3, Cloudinary) and store just the URL in Postgres.

**9 files still use raw `<img>` instead of `next/image`.** `src/app/people/PeopleHero.tsx`, `src/app/research/page.tsx`, `src/components/Footer.tsx`, `src/components/Logo.tsx` emit lint warnings; several admin/public files suppress the same warning via `eslint-disable` instead of fixing it. This means admin-uploaded photos rendered publicly (people, news) skip Next's automatic resizing/lazy-loading/format negotiation.
→ Migrate to `next/image` incrementally, starting with public-facing People/News cards.

**On-demand revalidation is still inconsistent for non-News content types.** Publications/Members/Research Areas/Facilities admin edits rely on the 60s ISR window rather than `revalidatePath` (News already has it).
→ Add the same `revalidatePath` calls to those routes' POST/PUT/DELETE handlers if instant reflection matters as much there as it did for News.

### Low priority / polish

- **Icon-only admin buttons still lack accessible names in the News, People, and Research Areas tabs** (Publications and the new Facilities tab already have them). A screen reader announces only "button" for the bare ✏️/🗑 icons there.
- **`"lint": "eslint"`** has no explicit path — relies on ESLint 9's implicit cwd default. Prefer `eslint .` for clarity of intent.
- **Generic 500-and-`console.error` pattern** repeated in nearly every API route — acceptable for this project's size, but production errors are only visible in server logs with no aggregation (e.g. Sentry) if this ever needs real incident response.
- **No tests, no CI workflow** — `pnpm build`/`pnpm lint` are the only pre-deploy gates today, run manually.
- **`README.md`** is still the unmodified `create-next-app` boilerplate — no mention of the actual project, required env vars (`DATABASE_URL`, `ADMIN_PASSWORD`, `ADMIN_SESSION_TOKEN`), the `db:push` workflow, or the admin panel at `/admin`.
- **No Open Graph/Twitter tags or `sitemap.ts`/`robots.ts`** — per-page `<title>`/description are now in place, but social share previews and search-engine sitemap discovery are still unaddressed.

---

## Suggested next sequencing

1. Fix the icon-only admin buttons in the remaining 3 tabs (News/People/Research Areas) — small, same fix already applied to Facilities.
2. Sniff upload MIME types server-side — self-contained, closes a real (if minor) spoofing gap.
3. Delete `mammoth` and `tmp_migrate.ts` — pure cleanup, zero risk.
4. Everything else (admin file split, pagination, image storage migration, migration history, OG tags/sitemap) can follow as content volume or contributor count actually grows enough to justify the effort.
