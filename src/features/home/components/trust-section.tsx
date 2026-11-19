/**
 * @fileoverview Home trust band — four figures after Why DSCA.
 * @module features/home/components/trust-section
 */

import { TRUST_CONTENT } from "@/features/home/lib/trust-content";
import layout from "@/styles/layout.module.css";
import styles from "@/features/home/components/trust-section.module.css";

/**
 * Dark forest band: headline plus the four reference figures.
 *
 * @returns Trust section for the home page.
 */
export function TrustSection() {
  return (
    <section
      className={`${styles.section} ${layout.g}`}
      aria-labelledby="trust-heading"
    >
      <div className={`${styles.inner} ${layout.in}`}>
        <h2 id="trust-heading" className={styles.title}>
          {TRUST_CONTENT.titleBefore}{" "}
          <em className={styles.accent}>{TRUST_CONTENT.titleAccent}</em>
        </h2>
        <ul className={styles.stats}>
          {TRUST_CONTENT.stats.map((stat) => (
            <li key={stat.id} className={styles.stat}>
              <div className={styles.value}>{stat.figure}</div>
              <div className={styles.label}>{stat.label}</div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
