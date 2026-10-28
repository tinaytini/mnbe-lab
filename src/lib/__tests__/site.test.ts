import { describe, it, expect } from "vitest";
import { SITE_URL, SITE_NAME, SITE_FULL_NAME, absoluteUrl, jsonLd } from "../site";

describe("site utils and constants", () => {
  it("defines standard site metadata constants", () => {
    expect(SITE_URL).toBe("https://www.mnbe-lab.ae");
    expect(SITE_NAME).toBe("MNBE Lab");
    expect(SITE_FULL_NAME).toContain("Micro and Nanoscale Bioengineering");
  });

  describe("absoluteUrl", () => {
    it("converts relative paths with leading slash into absolute production URLs", () => {
      expect(absoluteUrl("/people")).toBe("https://www.mnbe-lab.ae/people");
      expect(absoluteUrl("/uploads/photo.jpg")).toBe("https://www.mnbe-lab.ae/uploads/photo.jpg");
    });

    it("converts relative paths without leading slash into absolute production URLs", () => {
      expect(absoluteUrl("research/biosensing")).toBe("https://www.mnbe-lab.ae/research/biosensing");
    });

    it("leaves already-absolute HTTP and HTTPS URLs untouched", () => {
      expect(absoluteUrl("https://nyuad.nyu.edu")).toBe("https://nyuad.nyu.edu");
      expect(absoluteUrl("http://example.com/test")).toBe("http://example.com/test");
    });
  });

  describe("jsonLd", () => {
    it("serializes objects into JSON safely without unescaped script tags", () => {
      const data = {
        name: "Test <script>alert(1)</script>",
        nested: { tag: "</script>" },
      };
      const result = jsonLd(data);
      expect(result).not.toContain("<");
      expect(result).toContain("\\u003cscript>alert(1)\\u003c/script>");
      expect(result).toContain("\\u003c/script>");
    });
  });
});
