"use client";

import { Eyebrow } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Ticker } from "@/components/ui/ticker";
import styles from "./lead-cta-section.module.css";

const CTA_TICKER_ITEMS = [
  "Enroll now",
  "Intermediate",
  "Professional",
  "Starter Pack",
  "Advance",
];

export function LeadCtaSection() {
  return (
    <>
      <section className={styles.section}>
        <div className={styles.inner}>
          <Eyebrow style={{ color: "#ffd666" }}>Next batch · 12 seats</Eyebrow>
          <h2 className={styles.title} data-big>
            Your first
            <br />
            <em>shot</em> starts here
          </h2>
          <p className={styles.leadText}>
            Tell us the course you want. We reply with the batch date and how to
            hold your seat.
          </p>
          <Button href="/contact" variant="primary" size="md">
            Enroll now
          </Button>
        </div>
      </section>

      <Ticker items={CTA_TICKER_ITEMS} variant="ribbon" reverse />
    </>
  );
}

