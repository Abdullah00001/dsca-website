/**
 * @fileoverview Home ISO certification band copy (reference post-marquee section).
 * @module features/home/lib/iso-content
 */

/** Content for the Certification & Quality section. */
export const ISO_CONTENT = {
  eyebrow: "Certification & Quality",
  titleBefore: "ISO-Certified Barista Training",
  titleAccent: "You Can Verify",
  lead: "Being ISO 9001:2015 certified is not a badge we hang on the wall. It is a promise about how we teach. It means every DSCA course follows a structured curriculum, a consistent training method, and outcomes you can measure in your own cups. When you finish, your certificate carries weight with coffee businesses across South Asia, because it is backed by an internationally benchmarked quality standard, not just our word.",
  cta: { label: "Verify Your Certificate", href: "/certificate" },
  certImage: {
    src: "/assets/cert.jpg",
    alt: "DSCA ISO 9001:2015 quality management certificate",
  },
} as const;
