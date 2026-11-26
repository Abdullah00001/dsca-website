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
  /**
   * Second scroll beat — fills the pin after intro content clears
   * so the hero never lands on an empty frame.
   */
  journey: {
    lines: [
      { text: "Hands-on", accent: "training." },
      { text: "World-class", accent: "trainers." },
      { text: "Careers", accent: "in Bangladesh & abroad." },
    ],
  },
} as const;

/** Public path to the looping hero timelapse. */
export const HERO_VIDEO_SRC = "/assets/hero-section-timelapse.mp4";

/** Large hero mark used for the flying logo (docks into the header). */
export const HERO_LOGO_SRC = "/assets/hero-logo.svg";

/** Intrinsic size of {@link HERO_LOGO_SRC}. */
export const HERO_LOGO_SIZE = { width: 1000, height: 440 } as const;

/**
 * Timeline time (and approx. scroll progress on a ~1.0-long tl) when the
 * flying logo finishes docking into the header.
 */
export const HERO_LOGO_DOCK_AT = 0.52;
