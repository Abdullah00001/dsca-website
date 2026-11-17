/**
 * @fileoverview Site footer — faithful Next.js port of the DSCA reference footer.
 * @module components/layout/footer
 */

import layout from "@/styles/layout.module.css";
import { FooterBar } from "@/components/layout/footer/footer-bar";
import { FooterCta } from "@/components/layout/footer/footer-cta";
import { FooterGrid } from "@/components/layout/footer/footer-grid";
import { FooterWordmark } from "@/components/layout/footer/footer-wordmark";
import styles from "@/components/layout/footer/footer.module.css";

/**
 * Site footer matching:
 * `footer.ft.g > .in > (.ftcta + .ftgrid + .ftclip + .ftbar)`.
 *
 * @returns Footer landmark.
 */
export function Footer() {
  return (
    <footer className={`${styles.ft} ${layout.g}`}>
      <div className={styles.in}>
        <FooterCta />
        <FooterGrid />
        <FooterWordmark />
        <FooterBar />
      </div>
    </footer>
  );
}
