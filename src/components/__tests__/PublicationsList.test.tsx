import { describe, it, expect } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import PublicationsList from "../PublicationsList";

describe("PublicationsList Component", () => {
  const samplePubs = [
    {
      id: 1,
      year: "2020",
      title: "Older Nanobio Paper",
      authors: "Song R., et al.",
      journal: "Biosensors & Bioelectronics",
      url: "https://doi.org/10.1016/sample1",
      description: "Short description.",
    },
    {
      id: 2,
      year: "2026",
      title: "Recent Nanoscale Discovery",
      authors: "Song R., Jane D.",
      journal: "Nature Nanotechnology",
      url: "https://doi.org/10.1038/sample2",
      description: "Brief note.",
    },
    {
      id: 3,
      year: "2026",
      title: "Brand New Biosensor",
      authors: "Doe J., Song R.",
      journal: "Lab on a Chip",
      url: null,
      description:
        "This is an intentionally very long description that exceeds the one hundred and eighty characters limit to verify that the expand and collapse functionality works properly when the user clicks read more and show less.",
    },
    {
      id: 4,
      year: "2024",
      title: "Microfluidic Cell Sorter",
      authors: "Smith A., Song R.",
      journal: "ACS Nano",
      url: "https://doi.org/10.1021/sample4",
      description: null,
    },
  ];

  it("renders all publications and year filters", () => {
    render(<PublicationsList pubs={samplePubs} />);

    expect(screen.getByText("Recent Nanoscale Discovery")).toBeInTheDocument();
    expect(screen.getByText("Brand New Biosensor")).toBeInTheDocument();
    expect(screen.getByText("Microfluidic Cell Sorter")).toBeInTheDocument();
    expect(screen.getByText("Older Nanobio Paper")).toBeInTheDocument();

    // Filter buttons
    expect(screen.getByRole("button", { name: "All" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "2026" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "2024" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "2020" })).toBeInTheDocument();
  });

  it("orders publications by year descending and newly added (id desc) first", () => {
    render(<PublicationsList pubs={samplePubs} />);

    const titles = screen.getAllByRole("heading", { level: 3 }).map((h) => h.textContent);

    // 2026 (id: 3) should come before 2026 (id: 2), followed by 2024 (id: 4), then 2020 (id: 1)
    expect(titles[0]).toContain("Brand New Biosensor");
    expect(titles[1]).toContain("Recent Nanoscale Discovery");
    expect(titles[2]).toContain("Microfluidic Cell Sorter");
    expect(titles[3]).toContain("Older Nanobio Paper");
  });

  it("filters publications when clicking a specific year button", () => {
    render(<PublicationsList pubs={samplePubs} />);

    fireEvent.click(screen.getByRole("button", { name: "2024" }));

    expect(screen.getByText("Microfluidic Cell Sorter")).toBeInTheDocument();
    expect(screen.queryByText("Recent Nanoscale Discovery")).not.toBeInTheDocument();
    expect(screen.queryByText("Older Nanobio Paper")).not.toBeInTheDocument();

    // Switching back to All
    fireEvent.click(screen.getByRole("button", { name: "All" }));
    expect(screen.getByText("Recent Nanoscale Discovery")).toBeInTheDocument();
    expect(screen.getByText("Older Nanobio Paper")).toBeInTheDocument();
  });

  it("filters publications by search query across title, author, and journal", async () => {
    render(<PublicationsList pubs={samplePubs} />);

    const searchInput = screen.getByPlaceholderText(/Search by title, author, or journal/i);
    fireEvent.change(searchInput, { target: { value: "Nature" } });

    await waitFor(() => {
      expect(screen.getByText("Recent Nanoscale Discovery")).toBeInTheDocument();
      expect(screen.queryByText("Microfluidic Cell Sorter")).not.toBeInTheDocument();
    });
  });

  it("shows an empty state when no publications match search", async () => {
    render(<PublicationsList pubs={samplePubs} />);

    const searchInput = screen.getByPlaceholderText(/Search by title, author, or journal/i);
    fireEvent.change(searchInput, { target: { value: "nonexistent keyword xyz" } });

    await waitFor(() => {
      expect(screen.getByText("No publications match your search.")).toBeInTheDocument();
    });
  });

  it("supports expanding and collapsing long descriptions with Read more / Show less", () => {
    render(<PublicationsList pubs={samplePubs} />);

    const readMoreBtn = screen.getByRole("button", { name: /Read more/i });
    expect(readMoreBtn).toBeInTheDocument();

    // Click Read more
    fireEvent.click(readMoreBtn);
    expect(screen.getByRole("button", { name: /Show less/i })).toBeInTheDocument();

    // Click Show less
    fireEvent.click(screen.getByRole("button", { name: /Show less/i }));
    expect(screen.getByRole("button", { name: /Read more/i })).toBeInTheDocument();
  });

  it("renders external URL link with target='_blank' and rel='noopener noreferrer'", () => {
    render(<PublicationsList pubs={samplePubs} />);

    const externalLink = screen.getByText("Recent Nanoscale Discovery").closest("a");
    expect(externalLink).toHaveAttribute("href", "https://doi.org/10.1038/sample2");
    expect(externalLink).toHaveAttribute("target", "_blank");
    expect(externalLink).toHaveAttribute("rel", "noopener noreferrer");
  });
});
