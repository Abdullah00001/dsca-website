/**
 * @fileoverview Home hero copy and CTA destinations.
 * @module features/home/lib/hero-content
 */

/** Static content for the home hero composition. */
export const HERO_CONTENT = {
  location: {
    lines: [
      "House 34/A, Indira Road, Farmgate",
      "Open Sat to Fri, 9am to 9pm",
      "Kazi & Chitra Square, Lift 5",
    ] as const,
    href: "/locations/farmgate",
  },
  eyebrow: "Dhaka Specialty Coffee Academy (DSCA)",
  title: {
    line1: "Professional",
    line2Lead: "Barista",
    line2Accent: "course",
    line3Lead: "In",
    line3Accent: "Dhaka",
  },
  subhead: "— ISO-Certified Training at DSCA",
  description:
    "Learn Espresso, Latte Art and Café Operations — From First Cup to Advanced Barista",
  primary: { label: "Explore barista courses", href: "/courses" },
  secondary: { label: "Get a free callback", href: "/contact" },
  scrollHint: "Scroll to continue",
} as const;

/** Public path to the looping hero timelapse. */
export const HERO_VIDEO_SRC = "/assets/hero-section-timelapse.mp4";

/** Large hero mark used for the flying logo (docks into the header). */
export const HERO_LOGO_SRC = "/assets/hero-logo.png";

/** Intrinsic size of {@link HERO_LOGO_SRC}. */
export const HERO_LOGO_SIZE = { width: 583, height: 279 } as const;

/** Scroll progress at which the flying logo docks into the header. */
export const HERO_LOGO_DOCK_AT = 0.8;
