"use client";

import Link from "next/link";
import { Eyebrow } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { usePeekStore } from "@/components/layout/cursor-peek";
import type { Course } from "@/features/courses/types";
import styles from "./course-overview-rows.module.css";

export type CourseOverviewRowsProps = {
  courses: Course[];
};

const COURSE_IMAGES = [
  "/assets/course-interior.jpg",
  "/assets/course-bar.jpg",
  "/assets/course-staff.jpg",
  "/assets/course-lounge.jpg",
  "/assets/course-hall.jpg",
];

export function CourseOverviewRows({ courses }: CourseOverviewRowsProps) {
  const { showPeek, hidePeek } = usePeekStore();

  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <Eyebrow style={{ color: "#ffe08a" }}>Five programs</Eyebrow>
        <h2 className={styles.heading}>
          Pick your <em>level.</em>
        </h2>

        <div className={styles.rowsList} data-rows>
          {courses.map((course, idx) => {
            const num = String(idx + 1).padStart(2, "0");
            const previewImage = COURSE_IMAGES[idx % COURSE_IMAGES.length];

            return (
              <Link
                key={course.id}
                href={`/courses/${course.id}`}
                className={styles.rowLink}
                onPointerOver={() => {
                  showPeek({
                    title: course.name,
                    duration: course.duration,
                    image: previewImage,
                  });
                }}
                onPointerLeave={() => {
                  hidePeek();
                }}
              >
                <span className={styles.rowNumber}>{num}</span>
                <div>
                  <h3 className={styles.rowTitle}>{course.name}</h3>
                  {course.bestFor && (
                    <small className={styles.rowSub}>
                      Best for: {course.bestFor}
                    </small>
                  )}
                </div>
                <span className={styles.rowDuration}>{course.duration}</span>
                <span className={styles.rowPrice}>{course.price}</span>
              </Link>
            );
          })}
        </div>

        <div className={styles.buttonWrapper}>
          <Button href="/courses">Compare all courses</Button>
        </div>
      </div>
    </section>
  );
}
