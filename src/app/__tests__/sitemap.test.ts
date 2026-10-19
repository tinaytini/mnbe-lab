import { describe, it, expect, vi } from "vitest";

vi.mock("@/lib/members", () => ({
  getAllMembers: vi.fn().mockResolvedValue([
    {
      id: 1,
      name: "Rafael Song",
      role: "Principal Investigator",
      createdAt: new Date("2026-01-01"),
      photoUrl: "/uploads/song.jpg",
    },
  ]),
  memberHref: (m: { name: string }) => `/people/${m.name.toLowerCase().replace(/\s+/g, "-")}`,
}));

vi.mock("@/db", () => ({
  db: {
    select: () => ({
      from: () =>
        Promise.resolve([
          {
            id: 42,
            title: "Lab Award",
            createdAt: new Date("2026-02-01"),
            photoUrl: "/uploads/award.jpg",
          },
        ]),
    }),
  },
}));

vi.mock("@/db/schema", () => ({
  news: {},
}));

describe("sitemap generator", () => {
  it("includes all static routes, member routes, and news article routes", async () => {
    const sitemap = (await import("../sitemap")).default;
    const entries = await sitemap();

    const urls = entries.map((e) => e.url);

    // Static pages
    expect(urls).toContain("https://www.mnbe-lab.ae/");
    expect(urls).toContain("https://www.mnbe-lab.ae/people");
    expect(urls).toContain("https://www.mnbe-lab.ae/research");
    expect(urls).toContain("https://www.mnbe-lab.ae/publications");
    expect(urls).toContain("https://www.mnbe-lab.ae/facilities");
    expect(urls).toContain("https://www.mnbe-lab.ae/news");
    expect(urls).toContain("https://www.mnbe-lab.ae/contact");

    // Dynamic member page
    expect(urls).toContain("https://www.mnbe-lab.ae/people/rafael-song");
    const memberEntry = entries.find((e) => e.url.includes("rafael-song"));
    expect(memberEntry?.images).toContain("https://www.mnbe-lab.ae/uploads/song.jpg");

    // Dynamic news article page
    expect(urls).toContain("https://www.mnbe-lab.ae/news/42");
    const newsEntry = entries.find((e) => e.url.includes("news/42"));
    expect(newsEntry?.images).toContain("https://www.mnbe-lab.ae/uploads/award.jpg");
  });
});
