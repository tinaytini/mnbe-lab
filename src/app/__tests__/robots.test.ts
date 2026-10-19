import { describe, it, expect } from "vitest";
import robots from "../robots";
import { SITE_URL } from "@/lib/site";

describe("robots.ts route generator", () => {
  it("generates correct robots rules matching site requirements", () => {
    const config = robots();

    expect(config.host).toBe(SITE_URL);
    expect(config.sitemap).toBe(`${SITE_URL}/sitemap.xml`);

    const rules = Array.isArray(config.rules) ? config.rules[0] : config.rules;
    expect(rules.userAgent).toBe("*");
    expect(rules.allow).toContain("/");
    expect(rules.allow).toContain("/api/images/");
    expect(rules.disallow).toContain("/admin");
    expect(rules.disallow).toContain("/api/");
  });
});
