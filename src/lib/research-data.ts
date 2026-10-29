import { db } from "@/db";
import { researchPages } from "@/db/schema";
import { eq } from "drizzle-orm";

export interface BiosensingData {
    heroTitle: string;
    heroSubtitle: string;
    heroImage: string;
    nanochipImage: string;
    stat1Value: string;
    stat1Label: string;
    stat2Value: string;
    stat2Label: string;
    overviewHeading: string;
    overviewP1: string;
    overviewP2: string;
    feature1Title: string;
    feature1Desc: string;
    feature2Title: string;
    feature2Desc: string;
    feature3Title: string;
    feature3Desc: string;
}

export interface BiomechanicsData {
    heroTitle: string;
    heroSubtitle: string;
    heroImage: string;
    project1Title: string;
    project1Image1: string;
    project1Image2: string;
    project1Quote: string;
    project1WideImage: string;
    project2Title: string;
    project2Image1: string;
    project2Image2: string;
    project2Image3: string;
    closingTitle: string;
    closingText: string;
}

export interface BioinspirationData {
    heroTitle: string;
    heroSubtitle: string;
    heroImage: string;
    blueprintTitle: string;
    blueprintP1: string;
    blueprintP2: string;
    blueprintQuote: string;
    focus1Title: string;
    focus1Desc: string;
    focus2Title: string;
    focus2Desc: string;
    focus3Title: string;
    focus3Desc: string;
    showcaseTitle: string;
    showcaseText: string;
    stat1Value: string;
    stat1Label: string;
    stat2Value: string;
    stat2Label: string;
    showcaseImage: string;
}

export const defaultBiosensingData: BiosensingData = {
    heroTitle: "Biosensing",
    heroSubtitle: "Developing ultra-sensitive detection platforms for point-of-care diagnostics and environmental monitoring.",
    heroImage: "/uploads/biosensing-hero.jpg",
    nanochipImage: "/uploads/biosensing-nanochip.jpg",
    stat1Value: "10⁻¹⁸ M",
    stat1Label: "Detection Limit",
    stat2Value: "< 5 min",
    stat2Label: "Response Time",
    overviewHeading: "Precision Molecular Detection",
    overviewP1: "Biosensing is the cornerstone of modern precision medicine. Our research focuses on leveraging nanostructures—particularly DNA origami and carbon nanotubes—to create transducers that can detect single molecules of DNA, RNA, and protein biomarkers.",
    overviewP2: "By integrating these biological interfaces with advanced electronics, we create portable, high-throughput devices that provide laboratory-grade accuracy in a mobile format.",
    feature1Title: "Nanosurface Engineering",
    feature1Desc: "Atomic-scale modification of sensor surfaces to eliminate non-specific binding.",
    feature2Title: "Point-of-Care Diagnostics",
    feature2Desc: "Developing rapid tests for infectious diseases that can be used in remote settings.",
    feature3Title: "Bio-Silicon Integration",
    feature3Desc: "Fusing biological recognition elements with CMOS-compatible technologies.",
};

export const defaultBiomechanicsData: BiomechanicsData = {
    heroTitle: "Biomechanics",
    heroSubtitle: "Advanced microfluidic platforms for mechanical analysis of biological systems.",
    heroImage: "/uploads/biomechanics-hero.png",
    project1Title: "Micropillar based high throughput drug screening using C. elegans",
    project1Image1: "/uploads/High-Throughput-Drug-Screening-1.jpg",
    project1Image2: "/uploads/Diabetes-text-1.jpg",
    project1Quote: "The method can be extended to study other muscle impacting disease like ALS, Parkinson disease etc.",
    project1WideImage: "/uploads/Neuromuscular-Disease-1.jpg",
    project2Title: "Dispensing of single C. elegan worms using microfluidics and pressure boundary condition",
    project2Image1: "/uploads/Dispensing-1.jpg",
    project2Image2: "/uploads/DTIP-1.jpg",
    project2Image3: "/uploads/Comsol-dtip-1.jpg",
    closingTitle: "Biomechanics Research",
    closingText: "Our work integrates advanced microfluidics with biological modeling to create precise analytical tools for disease study.",
};

export const defaultBioinspirationData: BioinspirationData = {
    heroTitle: "Bioinspiration",
    heroSubtitle: "Learning from 3.8 billion years of nature's R&D to solve complex engineering challenges.",
    heroImage: "/uploads/bioinspiration-hero.jpg",
    blueprintTitle: "Nature as a Blue-Print",
    blueprintP1: "Evolution has solved most of the engineering challenges we face today—from efficient desalination to high-strength, lightweight structures. Our research focuses on identifying these biological strategies and abstracting their underlying principles for synthetic applications.",
    blueprintP2: "Beyond just mimicking form (biomimicry), we focus on Bio-inspiration: understanding the functional logic of life to design materials and systems that are more sustainable, efficient, and resilient.",
    blueprintQuote: "The more our world functions like the natural world, the more likely we are to endure on this home that is ours, but not only ours.",
    focus1Title: "Fluid Dynamics",
    focus1Desc: "Investigation of low-drag surfaces inspired by shark skin and optimized airfoils based on owl feathers.",
    focus2Title: "Surface Wetting",
    focus2Desc: "Designing super-hydrophobic and anti-fouling surfaces based on the lotus effect and pitcher plant structures.",
    focus3Title: "Structural Color",
    focus3Desc: "Developing pigment-free colors and optic sensors inspired by butterfly wings and beetle carapaces.",
    showcaseTitle: "From Biology to Technology",
    showcaseText: "Our laboratory bridges the gap between biological observation and engineering fabrication. We utilize state-of-the-art 3D nanoprinting and molecular assembly to bring bio-inspired designs to life.",
    stat1Value: "15+",
    stat1Label: "Bio-patents",
    stat2Value: "4",
    stat2Label: "Spin-off Prototypes",
    showcaseImage: "/uploads/bioinspiration-nature.jpg",
};

export type ResearchPageSlug = "biosensing" | "biomechanics" | "bioinspiration";

export function getDefaultResearchData(slug: string): BiosensingData | BiomechanicsData | BioinspirationData {
    if (slug === "biosensing") return defaultBiosensingData;
    if (slug === "biomechanics") return defaultBiomechanicsData;
    if (slug === "bioinspiration") return defaultBioinspirationData;
    throw new Error(`Unknown research page slug: ${slug}`);
}

/**
 * Loads page content for a research area from DB.
 * Falls back to default data if table doesn't exist yet or no row is saved.
 */
export async function getResearchPageContent<T>(slug: ResearchPageSlug): Promise<T> {
    const fallback = getDefaultResearchData(slug) as unknown as T;
    try {
        const [row] = await db
            .select()
            .from(researchPages)
            .where(eq(researchPages.slug, slug))
            .limit(1);

        if (!row || !row.data) return fallback;

        const parsed = JSON.parse(row.data);
        return {
            ...fallback,
            ...parsed,
            heroTitle: row.title || (fallback as any).heroTitle,
            heroSubtitle: row.heroSubtitle || (fallback as any).heroSubtitle,
            heroImage: row.heroImage || (fallback as any).heroImage,
        };
    } catch {
        // Table does not exist yet (pending migration) or database error -> use defaults
        return fallback;
    }
}
