/**
 * @fileoverview DSCA footer wordmark — larger letters, full A on the white rule.
 * @module components/layout/footer/footer-wordmark
 */

import styles from "@/components/layout/footer/footer-wordmark.module.css";

/**
 * Oversized “DSCA” filling the footer content column.
 *
 * Capitals are larger than before. The viewBox ends on the baseline so the
 * feet sit on the white rule, and the advance stops inside the box so the
 * right side of “A” is not clipped.
 *
 * @returns Decorative wordmark (aria-hidden).
 */
export function FooterWordmark() {
  return (
    <div className={styles.ftclip} aria-hidden="true">
      <svg
        className={styles.ftsvg}
        viewBox="0 0 100 32"
        preserveAspectRatio="xMidYMax meet"
        focusable="false"
      >
        <defs>
          {/* Reference `.ftword`: white → near-transparent down the letters. */}
          <linearGradient
            id="ftgr"
            gradientUnits="userSpaceOnUse"
            x1="0"
            y1="0"
            x2="0"
            y2="32"
          >
            <stop offset="0%" stopColor="#fff" stopOpacity={0.5} />
            <stop offset="85%" stopColor="#fff" stopOpacity={0.04} />
            <stop offset="100%" stopColor="#fff" stopOpacity={0.02} />
          </linearGradient>
        </defs>
        <text
          x="-2.56"
          y="32"
          textLength="103.6"
          lengthAdjust="spacingAndGlyphs"
          fill="url(#ftgr)"
        >
          DSCA
        </text>
      </svg>
    </div>
  );
}
