/**
 * @fileoverview Home “Why DSCA” showcase journey copy + slides.
 * @module features/home/lib/why-content
 */

/** One slide in the ORYZO-style center-focus track. */
export type WhyItem = {
  /** Stable id. */
  id: string;
  /** Short tag in the caption bar. */
  tag: string;
  /** Title overlaid / caption line. */
  title: string;
  /** Supporting caption text. */
  blurb: string;
  /** Portrait image under `/public`. */
  image: string;
};

/**
 * Why DSCA showcase content (centered hero copy → strip → carousel).
 */
export const WHY_CONTENT = {
  eyebrow: "So practical,",
  title: "it's hands-on",
  support: "Real machines. Real cafés. Real certification.",
  cta: { label: "Explore courses", href: "/courses" },
  items: [
    {
      id: "equipment",
      tag: "Hands-on",
      title: "Real commercial equipment",
      blurb: "Train on commercial-grade machines from day one.",
      image: "/assets/why/bar.jpg",
    },
    {
      id: "batch",
      tag: "Small batches",
      title: "Twelve students, never more",
      blurb: "Dedicated instructor time and honest feedback every session.",
      image: "/assets/why/hall.jpg",
    },
    {
      id: "iso",
      tag: "ISO 9001",
      title: "ISO 9001:2015 Certified Training",
      blurb: "A structured curriculum and consistent training you can measure.",
      image: "/assets/why/staff.jpg",
    },
    {
      id: "trainers",
      tag: "Trainers",
      title: "Practicing professionals",
      blurb: "Learn from people who work with coffee every day.",
      image: "/assets/why/staff2.jpg",
    },
    {
      id: "jobs",
      tag: "Careers",
      title: "Job placement support",
      blurb: "CV guidance and referrals across Dhaka's café network.",
      image: "/assets/why/counter.jpg",
    },
    {
      id: "cert",
      tag: "Certificate",
      title: "A certificate you can verify",
      blurb: "Every DSCA completion certificate can be checked online.",
      image: "/assets/why/lounge.jpg",
    },
  ] satisfies readonly WhyItem[],
} as const;
