// Central site constants used for SEO (canonical URLs, sitemap, structured data).

export const SITE_URL = "https://www.mnbe-lab.ae";
export const SITE_NAME = "MNBE Lab";
export const SITE_FULL_NAME = "Molecular & Nanoscale Biosystems Engineering Laboratory";
export const SITE_DESCRIPTION =
    "The MNBE Lab at NYU Abu Dhabi pioneers research at the intersection of molecular nanotechnology, biosystems engineering, and biomedical innovation.";

export const UNIVERSITY = {
    name: "New York University Abu Dhabi",
    alternateName: "NYU Abu Dhabi",
    url: "https://nyuad.nyu.edu",
};

/** Turns a relative path (e.g. "/uploads/x.jpg") into an absolute URL on the production domain. */
export function absoluteUrl(path: string): string {
    if (/^https?:\/\//i.test(path)) return path;
    return `${SITE_URL}${path.startsWith("/") ? "" : "/"}${path}`;
}

/** Serialises JSON-LD safely for embedding in a <script> tag. */
export function jsonLd(data: unknown): string {
    return JSON.stringify(data).replace(/</g, "\\u003c");
}
