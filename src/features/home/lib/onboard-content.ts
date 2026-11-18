/**
 * @fileoverview Home “which barista are you” onboarding band copy.
 * @module features/home/lib/onboard-content
 */

/** One goal chip in the interactive stack. */
export type OnboardGoal = {
  /** Button label. */
  label: string;
  /** Recommended course name. */
  course: string;
  /** Course length in days (animated counter). */
  days: number;
  /** Course price in BDT (animated counter). */
  amount: number;
  /** Short pitch after the price. */
  blurb: string;
};

/** Static content for the onboarding recommendation section. */
export const ONBOARD_CONTENT = {
  eyebrow: "Start here",
  titleBefore: "Which kind of",
  titleAccent: "barista",
  titleAfter: "are you?",
  lead: "Tap the one that sounds like you. We will point you to the right course.",
  recoLabel: "Recommended for you",
  cta: { label: "Reserve", href: "/contact" },
  goals: [
    {
      label: "I just love coffee",
      course: "Barista Intermediate",
      days: 3,
      amount: 4950,
      blurb: "the fastest start",
    },
    {
      label: "I want a café job",
      course: "Barista Professional",
      days: 10,
      amount: 14000,
      blurb: "job-ready skills",
    },
    {
      label: "I want the full journey",
      course: "DSCA Barista Starter Pack",
      days: 15,
      amount: 17000,
      blurb: "best value, zero gaps",
    },
    {
      label: "I'm opening my own shop",
      course: "Barista Advance Professional",
      days: 22,
      amount: 21000,
      blurb: "head-barista track",
    },
    {
      label: "I already work in a café",
      course: "Food Safety Management",
      days: 2,
      amount: 5000,
      blurb: "add it to any course",
    },
  ] as const satisfies readonly OnboardGoal[],
} as const;
