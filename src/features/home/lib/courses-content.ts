/**
 * @fileoverview Home popular-courses band copy (reference `.rows` / dkband).
 * @module features/home/lib/courses-content
 */

/** One course row in the home “Pick your level” list. */
export type HomeCourse = {
  /** Stable id for keys / future detail routes. */
  id: string;
  /** Display name. */
  name: string;
  /** Duration label, e.g. `3 days`. */
  duration: string;
  /** Formatted fee, e.g. `৳4,950`. */
  price: string;
  /** Level chip / peek label. */
  level: string;
  /** One-line “best for” under the title. */
  bestFor: string;
  /** Hover peek card image. */
  image: string;
  /** Row destination. */
  href: string;
};

/** Static content for the home courses band. */
export const COURSES_CONTENT = {
  eyebrow: "Popular Courses",
  titleBefore: "Barista Courses in Dhaka for",
  titleAccent: "Every Skill Level",
  lead: "Pick the barista program that fits your experience and your career goal. Every course includes hands-on practice, instruction from working coffee professionals, and a DSCA completion certificate.",
  cta: { label: "See all courses", href: "/courses" },
  courses: [
    {
      id: "intermediate",
      name: "Barista Intermediate",
      duration: "3 days",
      price: "৳4,950",
      level: "Beginner",
      bestFor: "Coffee lovers taking their first step behind the bar",
      image: "/assets/courses/int1.jpg",
      href: "/courses",
    },
    {
      id: "professional",
      name: "Barista Professional",
      duration: "10 days",
      price: "৳14,000",
      level: "Professional",
      bestFor: "Job seekers who want café-ready skills",
      image: "/assets/courses/bar.jpg",
      href: "/courses",
    },
    {
      id: "starter",
      name: "DSCA Barista Starter Pack",
      duration: "15 days",
      price: "৳17,000",
      level: "Best value",
      bestFor: "Learners who want Intermediate + Professional without a gap",
      image: "/assets/courses/staff.jpg",
      href: "/courses",
    },
    {
      id: "advance",
      name: "Barista Advance Professional",
      duration: "22 days",
      price: "৳21,000",
      level: "Flagship",
      bestFor: "Future head baristas and café operators",
      image: "/assets/courses/lounge.jpg",
      href: "/courses",
    },
    {
      id: "food",
      name: "Food Safety Management",
      duration: "2 days",
      price: "৳5,000",
      level: "Add-on",
      bestFor: "Anyone who handles food and drink in a café",
      image: "/assets/courses/hall.jpg",
      href: "/courses",
    },
  ] as const satisfies readonly HomeCourse[],
} as const;
