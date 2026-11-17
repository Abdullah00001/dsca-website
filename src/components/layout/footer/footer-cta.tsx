/**
 * @fileoverview Footer CTA band — port of reference `.ftcta`.
 * @module components/layout/footer/footer-cta
 */

import { Button } from "@/components/ui/button";
import { Eyebrow } from "@/components/ui/eyebrow";
import { FOOTER_CTA } from "@/libs/site";
import styles from "@/components/layout/footer/footer-cta.module.css";

/**
 * Enrolment CTA row at the top of the footer.
 *
 * @returns Reference-matching footer CTA.
 */
export function FooterCta() {
  return (
    <div className={styles.ftcta}>
      <div>
        <Eyebrow onDark>{FOOTER_CTA.eyebrow}</Eyebrow>
        <h2 className={styles.ftt}>
          {FOOTER_CTA.titleBefore}
          <span className={styles.it}>{FOOTER_CTA.titleItalic}</span>
        </h2>
        <p className={styles.ftp}>{FOOTER_CTA.body}</p>
      </div>
      <div className={styles.ftbtns}>
        <Button href={FOOTER_CTA.primary.href}>{FOOTER_CTA.primary.label}</Button>
        <Button href={FOOTER_CTA.whatsapp.href} variant="ghost">
          {FOOTER_CTA.whatsapp.label}
        </Button>
        <Button href={FOOTER_CTA.call.href} variant="ghost">
          {FOOTER_CTA.call.label}
        </Button>
      </div>
    </div>
  );
}
