/**
 * @fileoverview Footer bottom bar — port of reference `.ftbar`.
 * @module components/layout/footer/footer-bar
 */

"use client";

import Link from "next/link";
import { FOOTER_COPYRIGHT, FOOTER_LEGAL_LINKS } from "@/libs/site";
import styles from "@/components/layout/footer/footer-bar.module.css";

/**
 * Scrolls to top of the page.
 */
function scrollToTop(): void {
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
}

/**
 * Copyright / legal / back-to-top strip.
 *
 * @returns Footer bottom bar.
 */
export function FooterBar() {
  return (
    <div className={styles.ftbar}>
      <span>{FOOTER_COPYRIGHT}</span>
      <span className={styles.ftl}>
        {FOOTER_LEGAL_LINKS.map((item) => (
          <Link key={item.href} href={item.href}>
            {item.label}
          </Link>
        ))}
      </span>
      <button type="button" className={styles.totop} onClick={scrollToTop}>
        Back to top ↑
      </button>
    </div>
  );
}
