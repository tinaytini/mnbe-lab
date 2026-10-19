import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import MemberProfile from "../people/MemberProfile";
import type { Member } from "@/lib/members";

describe("MemberProfile Component", () => {
  const baseMember: Member = {
    id: 1,
    name: "Dr. Rafael Song",
    role: "Principal Investigator",
    focus: "Molecular and nanoscale biosystems engineering.",
    email: "rafael.song@nyu.edu",
    originCountry: "South Korea",
    biography: "Dr. Song is an Associate Professor of Mechanical and Biomedical Engineering.",
    photoUrl: "/uploads/song.jpg",
    isAlumni: false,
    createdAt: new Date(),
  };

  it("renders member details with custom heading level", () => {
    const { rerender } = render(<MemberProfile member={baseMember} as="h1" />);
    expect(screen.getByRole("heading", { level: 1, name: "Dr. Rafael Song" })).toBeInTheDocument();

    rerender(<MemberProfile member={baseMember} as="h2" />);
    expect(screen.getByRole("heading", { level: 2, name: "Dr. Rafael Song" })).toBeInTheDocument();
  });

  it("renders portrait image when photoUrl is present", () => {
    render(<MemberProfile member={baseMember} />);

    const img = screen.getByAltText("Portrait of Dr. Rafael Song");
    expect(img).toHaveAttribute("src", "/uploads/song.jpg");
  });

  it("falls back to role emoji when photoUrl is missing", () => {
    const memberNoPhoto: Member = { ...baseMember, photoUrl: null };
    render(<MemberProfile member={memberNoPhoto} />);

    expect(screen.getByText("👨‍🔬")).toBeInTheDocument();
  });

  it("displays Alumni badge when member is marked as alumni", () => {
    const alumniMember: Member = { ...baseMember, isAlumni: true };
    render(<MemberProfile member={alumniMember} />);

    expect(screen.getByText("Alumni")).toBeInTheDocument();
  });

  it("renders email link with mailto scheme", () => {
    render(<MemberProfile member={baseMember} />);

    const emailLink = screen.getByRole("link", { name: /rafael\.song@nyu\.edu/i });
    expect(emailLink).toHaveAttribute("href", "mailto:rafael.song@nyu.edu");
  });

  it("renders research focus and biography", () => {
    render(<MemberProfile member={baseMember} />);

    expect(screen.getByText("Molecular and nanoscale biosystems engineering.")).toBeInTheDocument();
    expect(
      screen.getByText("Dr. Song is an Associate Professor of Mechanical and Biomedical Engineering.")
    ).toBeInTheDocument();
  });
});
