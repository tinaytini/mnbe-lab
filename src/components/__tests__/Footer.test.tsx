import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Footer from "../Footer";

describe("Footer Component", () => {
  it("renders navigation links and university branding", () => {
    render(<Footer />);

    expect(screen.getByRole("link", { name: "Home" })).toHaveAttribute("href", "/");
    expect(screen.getByRole("link", { name: "Research" })).toHaveAttribute("href", "/research");
    expect(screen.getByRole("link", { name: "People" })).toHaveAttribute("href", "/people");
    expect(screen.getByRole("link", { name: "Publications" })).toHaveAttribute("href", "/publications");
    expect(screen.getByRole("link", { name: "Facilities" })).toHaveAttribute("href", "/facilities");
    expect(screen.getByRole("link", { name: "News" })).toHaveAttribute("href", "/news");
    expect(screen.getByRole("link", { name: "Contact" })).toHaveAttribute("href", "/contact");

    const nyuLogo = screen.getByAltText("NYU Abu Dhabi");
    expect(nyuLogo).toBeInTheDocument();
  });

  it("displays current year in the copyright notice", () => {
    render(<Footer />);

    const currentYear = new Date().getFullYear().toString();
    expect(screen.getByText(new RegExp(`© ${currentYear} MNBE Lab`))).toBeInTheDocument();
  });

  it("renders contact email and LinkedIn links", () => {
    render(<Footer />);

    const emailLink = screen.getByLabelText("Email");
    expect(emailLink).toHaveAttribute("href", "mailto:rafael.song@nyu.edu");

    const linkedinLink = screen.getByLabelText("LinkedIn");
    expect(linkedinLink).toBeInTheDocument();
  });
});
