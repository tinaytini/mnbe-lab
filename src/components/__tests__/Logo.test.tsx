import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Logo from "../Logo";

describe("Logo Component", () => {
  it("renders a link pointing to the home page '/'", () => {
    render(<Logo />);

    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", "/");
  });

  it("applies brightness/invert filter when solid is false", () => {
    render(<Logo solid={false} />);

    const img = screen.getByRole("img");
    expect(img.className).toContain("brightness-0 invert");
  });

  it("does not apply invert filter when solid is true", () => {
    render(<Logo solid={true} />);

    const img = screen.getByRole("img");
    expect(img.className).not.toContain("brightness-0 invert");
  });
});
