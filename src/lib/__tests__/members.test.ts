import { describe, it, expect } from "vitest";
import { slugify, memberHref, roleEmoji } from "../members";

describe("members utils", () => {
  describe("slugify", () => {
    it("converts simple names into lowercase hyphenated slugs", () => {
      expect(slugify("Rafael Song")).toBe("rafael-song");
      expect(slugify("Ajymurat Orozaliev")).toBe("ajymurat-orozaliev");
    });

    it("normalizes and strips accents from names", () => {
      expect(slugify("José Núñez")).toBe("jose-nunez");
      expect(slugify("François Müller")).toBe("francois-muller");
      expect(slugify("René")).toBe("rene");
    });

    it("handles multiple spaces and special characters", () => {
      expect(slugify("Dr. John  Doe, Jr.")).toBe("dr-john-doe-jr");
      expect(slugify("Mary-Jane Watson")).toBe("mary-jane-watson");
      expect(slugify("---leading and trailing---")).toBe("leading-and-trailing");
    });

    it("handles single-word names and numbers", () => {
      expect(slugify("Plato")).toBe("plato");
      expect(slugify("Agent 007")).toBe("agent-007");
    });
  });

  describe("memberHref", () => {
    it("generates correct /people/[slug] URL", () => {
      expect(memberHref({ name: "Rafael Song" })).toBe("/people/rafael-song");
      expect(memberHref({ name: "José Núñez" })).toBe("/people/jose-nunez");
    });
  });

  describe("roleEmoji", () => {
    it("maps recognized roles to representative emojis", () => {
      expect(roleEmoji["Principal Investigator"]).toBe("👨‍🔬");
      expect(roleEmoji["Senior Researcher"]).toBe("👩‍🔬");
      expect(roleEmoji["Postdoctoral Fellow"]).toBe("🧑‍🔬");
      expect(roleEmoji["PhD Candidate"]).toBe("👩‍🎓");
      expect(roleEmoji["MSc Student"]).toBe("🧑‍🎓");
    });
  });
});
