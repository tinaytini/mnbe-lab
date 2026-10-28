import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Logo from "../Logo";

describe("Logo Component", () => {
  it("renders a link pointing to the home page '/'", () => {
    render(<Logo />);

    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", "/");
  });

  it("renders the logo as an inline vector image", () => {
    render(<Logo />);

    const img = screen.getByRole("img", { name: "YAS Lab Logo" });
    expect(img.tagName.toLowerCase()).toBe("svg");
  });

  it("positions the wordmark glyphs with valid translate transforms", () => {
    const { container } = render(<Logo />);

    const transforms = [...container.querySelectorAll("path[transform]")].map(
      (p) => p.getAttribute("transform")!,
    );
    expect(transforms.length).toBeGreaterThan(0);
    transforms.forEach((t) =>
      expect(t).toMatch(/^translate\([-\d.]+, [-\d.]+\)$/),
    );
  });

  it("renders white (without raster filters) when solid is false", () => {
    render(<Logo solid={false} />);

    const link = screen.getByRole("link");
    expect(link.className).toContain("text-white");
    expect(screen.getByRole("img").getAttribute("class")).not.toContain("invert");
  });

  it("renders in brand purple when solid is true", () => {
    render(<Logo solid={true} />);

    const link = screen.getByRole("link");
    expect(link.className).toContain("text-[#56068c]");
    expect(link.className).not.toContain("text-white");
  });
});
