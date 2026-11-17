/**
 * @fileoverview Footer link grid — port of reference `.ftgrid`.
 * @module components/layout/footer/footer-grid
 */

import Image from "next/image";
import Link from "next/link";
import { LOGO_SRC } from "@/components/ui/logo";
import {
  FOOTER_AREA_LINKS,
  FOOTER_QUICK_LINKS,
  SITE_CONTACT,
  SITE_SOCIAL,
} from "@/libs/site";
import styles from "@/components/layout/footer/footer-grid.module.css";

/**
 * Four-column footer grid matching the reference markup.
 *
 * @returns Footer information grid.
 */
export function FooterGrid() {
  return (
    <div className={styles.ftgrid}>
      <div className={styles.ftbrand}>
        <span className={styles.logopill}>
          <Image
            src={LOGO_SRC}
            alt="Dhaka Specialty Coffee Academy"
            width={420}
            height={160}
            unoptimized
            className={styles.logo}
          />
        </span>
        <p>{SITE_CONTACT.blurb}</p>
        <div className={styles.soc}>
          {SITE_SOCIAL.map((item) => (
            <a
              key={item.href}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
            >
              {item.label}
            </a>
          ))}
        </div>
      </div>

      <div>
        <h4>Quick Links</h4>
        {FOOTER_QUICK_LINKS.map((item) => (
          <Link key={item.href} href={item.href}>
            {item.label}
          </Link>
        ))}
      </div>

      <div>
        <h4>Barista Courses by Area</h4>
        <div className={styles.ar2}>
          {FOOTER_AREA_LINKS.map((item) => (
            <Link key={item.href} href={item.href}>
              {item.label}
            </Link>
          ))}
        </div>
      </div>

      <div>
        <h4>Visit DSCA</h4>
        <p>{SITE_CONTACT.address}</p>
        <span className={styles.chipf}>{SITE_CONTACT.hours}</span>
        <a href={SITE_CONTACT.phoneHref} className={styles.chipf}>
          {SITE_CONTACT.phoneDisplay}
        </a>
      </div>
    </div>
  );
}
