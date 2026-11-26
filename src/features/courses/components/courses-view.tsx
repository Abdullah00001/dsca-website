/**
 * @fileoverview Courses index (reference `pages.courses`).
 */

"use client";

import { PageCta } from "@/components/ui/page-cta";
import { CourseCard } from "@/components/page/course-card";
import { FaqList } from "@/components/page/faq-list";
import { FilterBar, FilterItem } from "@/components/page/filter-bar";
import { PageHero } from "@/components/page/page-hero";
import { PagesShell } from "@/components/page/pages-shell";
import { PAGE_CTA_POUR } from "@/libs/page-cta";
import { COURSES, PHOTO } from "../lib";

const FILTERS = ["All", "Beginner", "Professional", "Best value", "Flagship", "Add-on"] as const;

const FAQ = [
  ["Do I need experience?", "No. Our courses start from the basics. If you already work in a café, start at the level that matches your skills."],
  ["How much does a barista course cost?", "Intermediate ৳4,950, Professional ৳14,000, Starter Pack ৳17,000, Advance Professional ৳21,000 and Food Safety Management ৳5,000."],
  ["Will I get a certificate?", "Yes. Every course ends with a DSCA completion certificate that can be verified online."],
  ["Do you help with jobs?", "Yes. Our career team helps graduates connect with café employers across Dhaka through CV guidance and referrals."],
] as const;

/**
 * Courses listing, comparison table, and FAQ.
 *
 * @returns Courses page.
 */
export function CoursesView() {
  return (
    <PagesShell>
      <PageHero
        crumbs={[{ label: "Home", href: "/" }, { label: "Courses" }]}
        photo={PHOTO.hall}
        title={
          <>
            Barista <em className="it">courses</em> in Dhaka
          </>
        }
        sub="Five programs from a 3‑day start to a 22‑day advanced track. Every one runs on professional equipment in batches of twelve or fewer and ends with a DSCA certificate you can verify online."
        ticker={FILTERS.slice(1)}
      />
      <section className="sec g">
        <div className="in">
          <FilterBar label="Filter courses" filters={FILTERS} style={{ marginBottom: 40 }}>
            <div className="grid g3">
              {COURSES.map((course) => (
                <FilterItem key={course.id} value={course.lv}>
                  <CourseCard course={course} />
                </FilterItem>
              ))}
            </div>
          </FilterBar>
        </div>
      </section>
      <section className="sec g dkband dk">
        <div className="in">
          <p className="eyebrow">Compare</p>
          <h2 style={{ margin: "18px 0 48px", fontSize: "clamp(44px, 7vw, 110px)" }}>
            Same academy. <span className="it" style={{ color: "var(--gold)" }}>Different depth.</span>
          </h2>
          <div className="scroll">
            <table className="table" style={{ color: "#fff" }}>
              <thead>
                <tr>
                  <th>Course</th>
                  <th>Duration</th>
                  <th>Level</th>
                  <th>Batch</th>
                  <th>Fee</th>
                </tr>
              </thead>
              <tbody>
                {COURSES.map((course) => (
                  <tr key={course.id}>
                    <td><b>{course.n}</b></td>
                    <td>{course.d}</td>
                    <td>{course.lv}</td>
                    <td>Max 12</td>
                    <td>{course.p}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
      <section className="sec g">
        <div className="in g2" style={{ alignItems: "start" }}>
          <div>
            <p className="eyebrow">Questions</p>
            <h2 style={{ marginTop: 18, fontSize: "clamp(40px, 6vw, 92px)" }}>
              Before you <span className="it">enroll</span>
            </h2>
          </div>
          <FaqList items={FAQ} />
        </div>
      </section>
      <PageCta content={PAGE_CTA_POUR} />
    </PagesShell>
  );
}
