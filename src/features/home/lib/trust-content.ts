/**
 * @fileoverview Home trust band — figures after Why DSCA (reference stats).
 * @module features/home/lib/trust-content
 */

/** One figure in the trust row. */
export type TrustStat = {
  /** Stable id. */
  id: string;
  /** Display figure, including any suffix. */
  figure: string;
  /** Line under the figure. */
  label: string;
};

/**
 * “Trusted by Barista Students Across Dhaka” copy.
 */
export const TRUST_CONTENT = {
  titleBefore: "Trusted by Barista Students",
  titleAccent: "Across Dhaka",
  stats: [
    { id: "students", figure: "200+", label: "Students Trained" },
    { id: "years", figure: "2+", label: "Years of Specialist Training" },
    { id: "rating", figure: "4.9 ★", label: "from 99 Google Reviews" },
    { id: "iso", figure: "ISO", label: "9001:2015 Certified" },
  ] as const satisfies readonly TrustStat[],
} as const;
