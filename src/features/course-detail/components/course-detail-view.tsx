"use client";

import Image from "next/image";
import { PhotoHero } from "@/components/layout/photo-hero";
import { Tag } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { LeadCtaSection } from "@/features/home/components/lead-cta-section";
import { useCourseDetail } from "../hooks";
import styles from "../styles/course-detail-view.module.css";

export type CourseDetailViewProps = {
  courseId: string;
};

const COURSE_IMAGES = [
  "/assets/course-interior.jpg",
  "/assets/course-bar.jpg",
  "/assets/course-staff.jpg",
  "/assets/course-lounge.jpg",
  "/assets/course-hall.jpg",
];

const FAQS = [
  {
    q: "Do I need prior experience?",
    a: "No. We start from the basics, so complete beginners are welcome.",
  },
  {
    q: "What is included in the fee?",
    a: "All practical sessions on professional equipment, practice coffee and milk, learning material and your DSCA completion certificate.",
  },
  {
    q: "Can I pay in installments?",
    a: "Ask our team. We can discuss options when you confirm your seat.",
  },
];

export function CourseDetailView({ courseId }: CourseDetailViewProps) {
  const { course, isLoading, error } = useCourseDetail(courseId);

  if (isLoading) {
    return (
      <div className="p-20 text-center font-display text-2xl font-bold">
        Loading course curriculum...
      </div>
    );
  }

  if (error || !course) {
    return (
      <div className="p-20 text-center text-coral font-display text-2xl font-bold">
        {error || "Course not found"}
      </div>
    );
  }

  const bannerImg = COURSE_IMAGES[0];

  return (
    <div>
      <PhotoHero
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Courses", href: "/courses" },
          { label: course.name },
        ]}
        title={
          <>
            {course.name.replace(/(\w+)$/, "")}
            <em>{course.name.split(" ").slice(-1)[0]}</em>
          </>
        }
        subtitle={course.fullDescription}
      >
        <div className="flex gap-3 flex-wrap mt-6">
          <Tag variant="mint">{course.duration}</Tag>
          <Tag variant="gold">{course.level}</Tag>
          <Tag variant="ghost">Max {course.maxStudents} students</Tag>
        </div>
        {course.bestFor && (
          <p className="mt-4 font-bold text-gold">
            Best for: {course.bestFor}
          </p>
        )}
      </PhotoHero>

      <section className={styles.section}>
        <div className={styles.inner}>
          <div className={styles.split}>
            <div>
              {/* Photo Banner */}
              <div className={styles.bannerPhoto}>
                <Image
                  src={bannerImg}
                  alt={`${course.name} in session at DSCA`}
                  fill
                  priority
                  className="object-cover"
                />
              </div>

              {/* What you learn */}
              <h2 className={styles.heading2}>
                What you <em>learn</em>
              </h2>
              <div className={styles.learningGrid}>
                {course.learningOutcomes.map((outcome, idx) => (
                  <div key={idx} className={styles.learningCard}>
                    <span className={styles.learningCheck}>✓</span>
                    <span>{outcome}</span>
                  </div>
                ))}
              </div>

              {/* The Plan / Curriculum */}
              <h2 className={styles.heading2}>
                The <em>plan</em>
              </h2>
              <div>
                {course.curriculumPlan.map((step, idx) => (
                  <div key={idx} className={styles.planRow}>
                    <b className={styles.planPeriod}>{step.period}</b>
                    <span className={styles.planDetails}>{step.details}</span>
                  </div>
                ))}
              </div>

              {/* FAQs */}
              <div className="mt-16">
                <h2 className={styles.heading2}>
                  Common <em>questions</em>
                </h2>
                {FAQS.map((faq) => (
                  <details
                    key={faq.q}
                    className="border-b border-line py-5 cursor-pointer"
                  >
                    <summary className="font-bold text-lg list-none flex justify-between items-center">
                      <span>{faq.q}</span>
                      <span className="text-forest text-2xl font-light">
                        +
                      </span>
                    </summary>
                    <p className="mt-3 text-muted text-base leading-relaxed">
                      {faq.a}
                    </p>
                  </details>
                ))}
              </div>
            </div>

            {/* Sticky Reservation Sidebar */}
            <aside className={styles.sidebarCard}>
              <div className={styles.sidebarPrice}>{course.price}</div>
              {course.originalPrice && (
                <span className={styles.sidebarDiscount}>
                  Original fee: {course.originalPrice}
                </span>
              )}

              <ul className={styles.sidebarList}>
                <li>
                  <b>✦</b> {course.duration} practical training
                </li>
                <li>
                  <b>✦</b> Commercial espresso machine access
                </li>
                <li>
                  <b>✦</b> Maximum {course.maxStudents} students per batch
                </li>
                <li>
                  <b>✦</b> DSCA verifiable certificate
                </li>
                <li>
                  <b>✦</b> Job placement support network
                </li>
              </ul>

              <div className={styles.sidebarButtons}>
                <Button href={`/contact?course=${course.id}`} variant="primary">
                  Reserve your seat
                </Button>
                <Button
                  href="https://wa.me/8801810545545"
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="ghost"
                  className="!text-ink !border-forest"
                >
                  Ask on WhatsApp
                </Button>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <LeadCtaSection />
    </div>
  );
}
