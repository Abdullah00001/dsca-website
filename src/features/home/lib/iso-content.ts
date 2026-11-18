/**
 * @fileoverview Home ISO certification band copy (reference post-marquee section).
 * @module features/home/lib/iso-content
 */

/** Content for the Certification & Quality section. */
export const ISO_CONTENT = {
  eyebrow: "Certification & Quality",
  titleBefore: "ISO-Certified Barista Training",
  titleAccent: "You Can Verify",
  lead: "DSCA is ISO 9001:2015 certified, the international standard for quality management. For you, that means a written curriculum, trained instructors, consistent delivery, and results we track batch after batch. A DSCA course in Dhaka is taught to the same standard every time.",
  listTitle: "What ISO 9001:2015 means for your training",
  bullets: [
    "A defined curriculum for every level — Intermediate to Advance Professional",
    "The same teaching standard in every batch, whoever sits next to you",
    "Records of your progress and feedback, so nothing is left to chance",
    "A built-in process for improving the course after every batch",
  ] as const,
  closing:
    "At the end of your course you receive a DSCA completion certificate, issued under our ISO-certified training system.",
  cta: { label: "See Our Courses", href: "/courses" },
  certImage: {
    src: "/assets/cert.jpg",
    alt: "DSCA ISO 9001:2015 quality management certificate",
    caption:
      "ISO 9001:2015 certificate issued to Dhaka Specialty Coffee Academy.",
  },
} as const;
