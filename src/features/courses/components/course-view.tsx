/**
 * @fileoverview Course detail (reference `pages.course`).
 */

import { Button } from "@/components/ui/button";
import { PageCta } from "@/components/ui/page-cta";
import { CourseCard } from "@/components/page/course-card";
import { FaqList } from "@/components/page/faq-list";
import { PageHero } from "@/components/page/page-hero";
import { PagesShell } from "@/components/page/pages-shell";
import styles from "@/components/page/pages.module.css";
import { PAGE_CTA_POUR } from "@/libs/page-cta";
import {
  COURSE_IMAGE,
  COURSES,
  type CatalogCourse,
} from "../lib";
import layout from "@/styles/layout.module.css";
import Image from "next/image";

const FAQ = [
  ["Do I need prior experience?", "No. We start from the basics, so complete beginners are welcome."],
  ["What is included in the fee?", "All practical sessions on professional equipment, practice coffee and milk, learning material and your DSCA completion certificate."],
  ["Can I pay in installments?", "Ask our team. We can discuss options when you confirm your seat."],
] as const;

/**
 * Splits a course name so the last word is the gold italic accent.
 *
 * @param name - Course title.
 * @returns Title with the last word emphasised.
 */
function accentLast(name: string) {
  const index = name.lastIndexOf(" ");
  if (index < 0) return name;
  return (
    <>
      {name.slice(0, index)} <em className="it">{name.slice(index + 1)}</em>
    </>
  );
}

/**
 * Props for {@link CourseView}.
 */
export type CourseViewProps = { course: CatalogCourse };

/**
 * Course detail with syllabus, fee card, and related courses.
 *
 * @param props - Course record.
 * @returns Course page.
 */
export function CourseView({ course }: CourseViewProps) {
  const others = COURSES.filter((item) => item.id !== course.id).slice(0, 3);

  return (
    <PagesShell>
      <PageHero
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Courses", href: "/courses" },
          { label: course.n },
        ]}
        title={accentLast(course.n)}
        sub={course.t}
        extra={
          <>
            <div className={styles.tags}>
              <span className={styles.tag}>{course.d}</span>
              <span className={styles.tag}>{course.lv}</span>
              <span className={styles.tag}>Max 12 students</span>
            </div>
            <p className={styles.best}>Best for: {course.best}</p>
          </>
        }
      />
      <section className={`${styles.section} ${layout.g}`}>
        <div className={`${layout.in} ${styles.split}`}>
          <div>
            <div className={`${styles.photo} ${styles.photoWide}`} style={{ marginBottom: 56 }}>
              <Image
                src={COURSE_IMAGE[course.id] ?? "/assets/courses/bar.jpg"}
                alt={`${course.n} in session`}
                fill
                sizes="(max-width: 900px) 100vw, 60vw"
              />
              <span>Photo · {course.n} in session</span>
            </div>
            <h2 className={styles.display} style={{ fontSize: "clamp(36px, 5vw, 70px)" }}>
              What you <em className="it">learn</em>
            </h2>
            <div className={`${styles.grid} ${styles.g2}`} style={{ gap: 14, margin: "28px 0 64px" }}>
              {course.learn.map((item) => (
                <div key={item} className={styles.learn}>{item}</div>
              ))}
            </div>
            <h2 className={styles.display} style={{ fontSize: "clamp(36px, 5vw, 70px)", marginBottom: 12 }}>
              The <em className="it">plan</em>
            </h2>
            {course.plan.map(([when, what]) => (
              <div key={when} className={styles.plan}>
                <b>{when}</b>
                <span>{what}</span>
              </div>
            ))}
            <div style={{ marginTop: 64 }}>
              <FaqList items={FAQ} />
            </div>
          </div>
          <aside className={`${styles.aside} ${styles.fee}`}>
            <div className={styles.feeHead}>
              <span className={styles.eyebrow}>Course fee</span>
              {course.off ? <span className={`${styles.tag} ${styles.tagGold}`}>{course.off} off</span> : null}
            </div>
            <div className={styles.feePrice}>{course.p}</div>
            {course.o ? <s>{course.o}</s> : null}
            <div style={{ margin: "24px 0" }}>
              {[
                ["Duration", course.d],
                ["Batch size", "Max 12"],
                ["Next batch", "Confirmed on WhatsApp"],
                ["Certificate", "DSCA, verifiable"],
              ].map(([label, value]) => (
                <div key={label} className={styles.feeRow}>
                  <span>{label}</span>
                  <b>{value}</b>
                </div>
              ))}
            </div>
            <Button href="/contact">Enroll now</Button>
            <p className={styles.note}>Job placement support included.</p>
          </aside>
        </div>
      </section>
      <section className={`${styles.section} ${styles.band} ${layout.g}`}>
        <div className={layout.in}>
          <h2 className={styles.display} style={{ marginBottom: 40 }}>
            Other <em className="it">courses</em>
          </h2>
          <div className={`${styles.grid} ${styles.g3}`}>
            {others.map((item) => (
              <CourseCard key={item.id} course={item} />
            ))}
          </div>
        </div>
      </section>
      <PageCta content={PAGE_CTA_POUR} />
    </PagesShell>
  );
}
