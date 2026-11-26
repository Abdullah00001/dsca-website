/**
 * @fileoverview Enrol / contact page (reference `pages.contact`).
 */

"use client";

import Image from "next/image";
import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import btn from "@/components/ui/button/button.module.css";
import { CourseCard } from "@/components/page/course-card";
import { FaqList } from "@/components/page/faq-list";
import { PageHero } from "@/components/page/page-hero";
import { PagesShell } from "@/components/page/pages-shell";
import styles from "@/components/page/pages.module.css";
import { ADDRESS, COURSES, HOURS, PHONE, PHOTO, TEL, WHATSAPP } from "../lib";
import layout from "@/styles/layout.module.css";

const STEPS = [
  ["1", "Tell us your course", "Pick a course below or ask for advice.", styles.pale],
  ["2", "We call you back", "A real person from the academy, same day.", styles.forest],
  ["3", "Hold your seat", "Confirm and pay to secure one of twelve seats.", styles.gold],
] as const;

const FAQ = [
  ["Do I need experience?", "No. Courses start from the basics. Cafe staff can start at the level that fits."],
  ["How do I pay?", "We confirm the fee and payment options when we call you back."],
  ["Can I visit first?", "Yes. Walk in Saturday to Friday, 9am to 9pm."],
] as const;

/**
 * Enrolment page: steps, visit card, reserve form, and course picks.
 *
 * @returns Contact page.
 */
export function ContactView() {
  const [sent, setSent] = useState(false);

  return (
    <PagesShell>
      <PageHero
        photo={PHOTO.hall}
        crumbs={[{ label: "Home", href: "/" }, { label: "Enroll" }]}
        title={<>Enroll in your <em className="it">first</em> batch</>}
        sub="Twelve seats a batch. Tell us the course and we reply with the next start date and how to hold your seat."
        extra={
          <div className={styles.actions}>
            <Button href={WHATSAPP} variant="dark">WhatsApp us</Button>
            <Button href={TEL} variant="line">{PHONE}</Button>
          </div>
        }
      />
      <section className={`${layout.g} ${styles.lift}`}>
        <div className={`${layout.in} ${styles.grid} ${styles.g3}`} style={{ gap: 16 }}>
          {STEPS.map(([num, title, body, tone]) => (
            <div key={num} className={`${styles.step} ${tone}`}>
              <b>{num}</b>
              <div>
                <strong>{title}</strong>
                <p>{body}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
      <section className={`${styles.section} ${layout.g}`}>
        <div className={`${layout.in} ${styles.grid} ${styles.g2}`} style={{ gap: 20, alignItems: "stretch" }}>
          <div className={styles.visitCard}>
            <div className={styles.photo}>
              <Image src={PHOTO.bar} alt="Our academy, Farmgate" fill sizes="50vw" />
              <span>Our academy · Farmgate</span>
            </div>
            <div className={styles.visitCopy}>
              <div className={styles.addr}>
                <b style={{ font: "800 20px var(--font-display)", textTransform: "uppercase" }}>Visit us</b>
                <p>{ADDRESS}</p>
              </div>
              <p className={styles.hours}>Open {HOURS}</p>
            </div>
          </div>
          <div className={styles.formCard}>
            {sent ? (
              <div className={styles.thanks}>
                <div className={styles.display}>Thank <em className="it">you</em></div>
                <p className={styles.sub}>
                  We received your request. Our team will contact you with the next batch date.
                </p>
              </div>
            ) : (
              <form
                className={styles.form}
                onSubmit={(event: FormEvent) => {
                  event.preventDefault();
                  setSent(true);
                }}
              >
                <h2 className={styles.display} style={{ fontSize: "clamp(34px, 4vw, 56px)" }}>
                  Reserve your <em className="it">seat</em>
                </h2>
                <div className={styles.field}>
                  <label htmlFor="f1">Full Name</label>
                  <input id="f1" name="name" required autoComplete="name" />
                </div>
                <div className={`${styles.grid} ${styles.g2}`} style={{ gap: 16 }}>
                  <div className={styles.field}>
                    <label htmlFor="f2">WhatsApp / Phone Number</label>
                    <input id="f2" name="phone" type="tel" required />
                  </div>
                  <div className={styles.field}>
                    <label htmlFor="f3">Email Address</label>
                    <input id="f3" name="email" type="email" />
                  </div>
                </div>
                <div className={styles.field}>
                  <label htmlFor="f4">Select Your Course</label>
                  <select id="f4" name="course" defaultValue={COURSES[0]?.n}>
                    {COURSES.map((course) => (
                      <option key={course.id}>
                        {course.n} · {course.p}
                      </option>
                    ))}
                    <option>Not sure yet</option>
                  </select>
                </div>
                <div className={styles.field}>
                  <label htmlFor="f5">Anything you&apos;d like us to know? (Optional)</label>
                  <textarea id="f5" name="note" />
                </div>
                <button className={`${btn.btn} ${btn.big}`} type="submit" style={{ justifyContent: "space-between", width: "100%" }}>
                  <span>Confirm My Enrolment</span>
                  <i className={btn.icon}>→</i>
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
      <section className={`${styles.section} ${styles.band} ${layout.g}`}>
        <div className={layout.in}>
          <h2 className={styles.display} style={{ marginBottom: 40 }}>
            Pick a <em className="it">course</em>
          </h2>
          <div className={`${styles.grid} ${styles.g3}`}>
            {COURSES.slice(0, 3).map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        </div>
      </section>
      <section className={`${styles.section} ${layout.g}`}>
        <div className={`${layout.in} ${styles.grid} ${styles.g2}`}>
          <div>
            <p className={styles.eyebrow}>Before you enroll</p>
            <h2 className={styles.display}>Quick <em className="it">answers</em></h2>
          </div>
          <FaqList items={FAQ} />
        </div>
      </section>
    
    </PagesShell>
  );
}
