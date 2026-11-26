/**
 * @fileoverview Privacy and terms pages (reference `legal()`).
 */

import type { ReactNode } from "react";
import { PageHero } from "@/components/page/page-hero";
import { PagesShell } from "@/components/page/pages-shell";
import styles from "@/components/page/pages.module.css";
import { PHOTO } from "../lib";
import layout from "@/styles/layout.module.css";

/**
 * Props for {@link LegalView}.
 */
export type LegalViewProps = {
  crumb: string;
  title: ReactNode;
  sections: readonly (readonly [string, string])[];
};

/**
 * Photo legal page with a sticky section list.
 *
 * @param props - Title and sections.
 * @returns Legal page.
 */
export function LegalView({ crumb, title, sections }: LegalViewProps) {
  return (
    <PagesShell>
      <PageHero
        photo={PHOTO.hall}
        crumbs={[{ label: "Home", href: "/" }, { label: crumb }]}
        title={title}
        sub="Last updated 19 October 2026"
      />
      <section className={`${styles.section} ${layout.g}`}>
        <div className={`${layout.in} ${styles.split}`} style={{ gridTemplateColumns: "240px minmax(0, 1fr)" }}>
          <nav className={styles.legalNav} aria-label="On this page">
            {sections.map(([heading]) => (
              <a key={heading} href={`#${heading.toLowerCase().replace(/[^a-z]+/g, "-")}`}>
                {heading}
              </a>
            ))}
          </nav>
          <div className={styles.prose}>
            {sections.map(([heading, body]) => (
              <section key={heading} id={heading.toLowerCase().replace(/[^a-z]+/g, "-")}>
                <h2>{heading}</h2>
                <p>{body}</p>
              </section>
            ))}
          </div>
        </div>
      </section>
    
    </PagesShell>
  );
}

/** Privacy sections from the reference. */
export const PRIVACY_SECTIONS = [
  ["Information we collect", "When you enroll or send a message we collect your name, phone number, email, the course you are interested in and any message you write. If you visit or join a course we may record attendance and certificate details."],
  ["How we use it", "To respond to your enquiry, confirm your batch, issue and verify your certificate, send updates you asked for and improve our training."],
  ["Sharing", "We do not sell your personal information. We share it only with service providers who help us run the academy, and where the law requires it."],
  ["Cookies", "Our website uses essential cookies and privacy-conscious analytics. You can block cookies in your browser without losing the ability to enroll."],
  ["Your rights", "You may ask to see, correct or delete the personal information we hold about you. Contact us and we will respond within a reasonable time."],
  ["Contact", "Dhaka Specialty Coffee Academy, House 34/A, Indira Road, Farmgate, Dhaka-1215. Phone and WhatsApp (+880) 1810-545545."],
] as const;

/** Terms sections from the reference. */
export const TERMS_SECTIONS = [
  ["Enrollment", "A seat is confirmed once DSCA acknowledges your request and receives the course fee or agreed advance. Batches are limited to 12 students and seats are allocated in order of confirmation."],
  ["Fees and payment", "Fees are listed in Bangladeshi Taka. Promotional prices apply for the period shown. Fees cover practice materials and your completion certificate unless stated otherwise."],
  ["Attendance", "Practical skills are built session by session, so regular attendance is expected. Missed sessions may be made up in a later batch at our discretion."],
  ["Certificates", "A DSCA completion certificate is issued after you complete the course and any practical assessment. Each certificate carries a number that can be verified on our website."],
  ["Cancellations and refunds", "Contact us as early as possible if you cannot attend. Where a refund or transfer is possible we will confirm the terms in writing before the batch begins."],
  ["Conduct and safety", "Students are expected to treat trainers, classmates and equipment with care and follow hygiene and safety instructions."],
  ["Changes", "We may update these terms from time to time. The date at the top shows when they last changed."],
] as const;
