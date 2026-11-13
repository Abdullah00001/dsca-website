"use client";

import { useState } from "react";
import Image from "next/image";
import { PhotoHero } from "@/components/layout/photo-hero";
import { Ticker } from "@/components/ui/ticker";
import { Chip, Eyebrow } from "@/components/ui/badge";
import { Card, CardPhoto, CardContent } from "@/components/ui/card";
import { LeadCtaSection } from "@/features/home/components/lead-cta-section";
import { useCourses } from "../hooks";
import styles from "../styles/courses-view.module.css";

const FILTER_LEVELS = [
  "All",
  "Beginner",
  "Professional",
  "Best value",
  "Flagship",
  "Add-on",
] as const;

const TICKER_ITEMS = [
  "Beginner",
  "Professional",
  "Best value",
  "Flagship",
  "Add-on",
];

const FAQS = [
  {
    q: "Do I need experience?",
    a: "No. Our courses start from the basics. If you already work in a café, start at the level that matches your skills.",
  },
  {
    q: "How much does a barista course cost?",
    a: "Intermediate ৳4,950, Professional ৳14,000, Starter Pack ৳17,000, Advance Professional ৳21,000 and Food Safety Management ৳5,000.",
  },
  {
    q: "Will I get a certificate?",
    a: "Yes. Every course ends with a DSCA completion certificate that can be verified online.",
  },
  {
    q: "Do you help with jobs?",
    a: "Yes. Our career team helps graduates connect with café employers across Dhaka through CV guidance and referrals.",
  },
];

const COURSE_IMAGES = [
  "/assets/course-interior.jpg",
  "/assets/course-bar.jpg",
  "/assets/course-staff.jpg",
  "/assets/course-lounge.jpg",
  "/assets/course-hall.jpg",
];

export function CoursesView() {
  const { courses } = useCourses();
  const [selectedFilter, setSelectedFilter] = useState<string>("All");

  const filteredCourses =
    selectedFilter === "All"
      ? courses
      : courses.filter((c) => c.level === selectedFilter);

  return (
    <div>
      <PhotoHero
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Courses" }]}
        title={
          <>
            Barista <em>courses</em> in Dhaka
          </>
        }
        subtitle="Five programs from a 3‑day start to a 22‑day advanced track. Every one runs on professional equipment in batches of twelve or fewer and ends with a DSCA certificate you can verify online."
      >
        <Ticker items={TICKER_ITEMS} variant="header" className="mt-8" />
      </PhotoHero>

      {/* Courses Filter & Grid */}
      <section className={styles.section}>
        <div className={styles.inner}>
          <div
            className={styles.filters}
            role="group"
            aria-label="Filter courses by level"
          >
            {FILTER_LEVELS.map((level) => (
              <Chip
                key={level}
                active={selectedFilter === level}
                onClick={() => setSelectedFilter(level)}
              >
                {level}
              </Chip>
            ))}
          </div>

          <div className={styles.grid}>
            {filteredCourses.map((course, idx) => {
              const imageSrc = COURSE_IMAGES[idx % COURSE_IMAGES.length];
              return (
                <Card
                  key={course.id}
                  href={`/courses/${course.id}`}
                  className={styles.courseCard}
                >
                  <CardPhoto className={styles.coursePhoto}>
                    <Image
                      src={imageSrc}
                      alt={course.name}
                      fill
                      sizes="(max-width: 900px) 100vw, 33vw"
                      className="object-cover"
                    />
                    <span className="relative z-10">
                      {course.duration} · {course.level}
                    </span>
                  </CardPhoto>
                  <CardContent>
                    <h3 className={styles.courseTitle}>{course.name}</h3>
                    <small className={styles.courseSummary}>
                      {course.shortDescription}
                    </small>
                    <div className={styles.priceWrapper}>
                      <span>{course.price}</span>
                      {course.originalPrice && (
                        <s className={styles.originalPrice}>
                          {course.originalPrice}
                        </s>
                      )}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Compare Table */}
      <section className={styles.compareSection}>
        <div className={styles.inner}>
          <Eyebrow style={{ color: "#ffe08a" }}>Compare</Eyebrow>
          <h2 className={styles.compareHeading}>
            Same academy. <em>Different depth.</em>
          </h2>

          <div className={styles.tableWrapper}>
            <table className={styles.table}>
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
                {courses.map((course) => (
                  <tr key={course.id}>
                    <td>
                      <b>{course.name}</b>
                    </td>
                    <td>{course.duration}</td>
                    <td>{course.level}</td>
                    <td>Max {course.maxStudents}</td>
                    <td>{course.price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className={styles.faqSection}>
        <div className={styles.inner}>
          <div className={styles.faqGrid}>
            <div>
              <Eyebrow>Questions</Eyebrow>
              <h2 className={styles.faqHeading}>
                Before you <em>enroll</em>
              </h2>
            </div>
            <div>
              {FAQS.map((faq, i) => (
                <details
                  key={faq.q}
                  className={styles.faqDetails}
                  open={i === 0}
                >
                  <summary className={styles.faqSummary}>
                    <span>{faq.q}</span>
                    <span className={styles.faqIcon} aria-hidden="true">
                      +
                    </span>
                  </summary>
                  <p className={styles.faqAnswer}>{faq.a}</p>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>

      <LeadCtaSection />
    </div>
  );
}
