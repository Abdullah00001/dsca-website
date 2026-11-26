/**
 * @fileoverview Certificate verification (reference `pages.certificate`).
 */

"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, type FormEvent } from "react";
import btn from "@/components/ui/button/button.module.css";
import styles from "@/components/page/pages.module.css";
import { PagesShell } from "@/components/page/pages-shell";
import { PageCta } from "@/components/ui/page-cta";
import { PAGE_CTA_ENROLL } from "@/libs/page-cta";
import { PHOTO } from "../lib";
import layout from "@/styles/layout.module.css";

const STEPS = [
  ["01", "Find the number", "It is printed at the bottom of every DSCA certificate.", styles.panel],
  ["02", "Enter it above", "Type it exactly as shown and press Verify.", styles.gold],
  ["03", "See the result", "Name, course and issue date appear instantly.", styles.forest],
] as const;

/**
 * Certificate lookup. Sample number `DSCA-2026-0001` matches the reference.
 *
 * @returns Certificate page.
 */
export function CertificateView() {
  const [result, setResult] = useState<"ok" | "bad" | null>(null);

  return (
    <PagesShell>
      <header className={`${styles.hero} ${styles.heroPhoto} ${layout.g}`}>
        <Image src={PHOTO.lounge} alt="" fill priority sizes="100vw" className={styles.heroBg} />
        <div className={`${styles.heroInner} ${layout.in} ${styles.grid} ${styles.g2}`} style={{ gap: 72 }}>
          <div>
            <ol className={styles.crumbs}>
              <li><Link href="/">Home</Link></li>
              <li>Certificate</li>
            </ol>
            <h1 className={styles.title}>
              Verify a <em className="it">DSCA</em> certificate
            </h1>
            <p className={styles.sub}>
              Enter the certificate number printed on the certificate to confirm it is genuine.
            </p>
            <form
              className={styles.verify}
              onSubmit={(event: FormEvent<HTMLFormElement>) => {
                event.preventDefault();
                const data = new FormData(event.currentTarget);
                const value = String(data.get("cid") ?? "").trim().toUpperCase();
                setResult(value === "DSCA-2026-0001" ? "ok" : "bad");
              }}
            >
              <label htmlFor="cid" style={{ position: "absolute", left: -9999 }}>
                Certificate number
              </label>
              <input id="cid" name="cid" placeholder="e.g. DSCA-2026-0001" />
              <button className={`${btn.btn} ${btn.dark}`} type="submit">
                <span>Verify</span>
                <i className={btn.icon}>→</i>
              </button>
            </form>
            <p style={{ fontSize: 14, margin: "14px 0 0", opacity: 0.75 }}>
              Try the sample number DSCA-2026-0001.
            </p>
            {result === "ok" ? (
              <div className={`${styles.result} ${styles.ok}`} role="status">
                <b style={{ font: "800 22px var(--font-display)", color: "#0a7a4b" }}>Certificate verified</b>
                <p style={{ margin: "8px 0 0", lineHeight: 1.7 }}>
                  Sample Student
                  <br />
                  Barista Professional, 10 days
                  <br />
                  Issued 14 March 2026
                </p>
              </div>
            ) : null}
            {result === "bad" ? (
              <div className={`${styles.result} ${styles.bad}`} role="status">
                <b style={{ font: "800 22px var(--font-display)", color: "#b82105" }}>No certificate found</b>
                <p style={{ margin: "8px 0 0" }}>
                  Check the number and try again, or message us on WhatsApp.
                </p>
              </div>
            ) : null}
          </div>
          <div style={{ display: "flex", justifyContent: "center", padding: 24 }}>
            <div className={styles.paper}>
              <Image src={PHOTO.cert} alt="DSCA ISO 9001:2015 certificate" width={440} height={570} />
              <p>DSCA ISO 9001:2015 certificate</p>
            </div>
          </div>
        </div>
      </header>
      <section className={`${styles.section} ${layout.g}`}>
        <div className={`${layout.in} ${styles.grid} ${styles.g3}`}>
          {STEPS.map(([num, title, body, tone]) => (
            <div key={num} className={tone} style={{ borderRadius: 32, padding: 36 }}>
              <div className={styles.num}>{num}</div>
              <div style={{ font: "800 26px var(--font-display)", textTransform: "uppercase", margin: "20px 0 10px" }}>
                {title}
              </div>
              <p style={{ margin: 0, lineHeight: 1.6, opacity: 0.85 }}>{body}</p>
            </div>
          ))}
        </div>
      </section>
      <PageCta content={PAGE_CTA_ENROLL} />
    </PagesShell>
  );
}
