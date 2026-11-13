/**
 * @fileoverview Course Detail View Component
 * @module features/course-detail/components/course-detail-view
 */

"use client";

import { useCourseDetail } from "../hooks";
import styles from "../styles/course-detail-view.module.css";

interface CourseDetailViewProps {
  id?: string;
}

export function CourseDetailView({ id = "professional" }: CourseDetailViewProps) {
  const { course, isLoading, error } = useCourseDetail(id);

  return (
    <div className={styles.container}>
      {isLoading ? (
        <p>Loading course...</p>
      ) : error ? (
        <p style={{ color: "var(--color-coral, #ef8a68)" }}>{error}</p>
      ) : course ? (
        <>
          <header className={styles.header}>
            <h1 className={styles.title}>{course.name}</h1>
            <p className={styles.subtitle}>{course.shortDescription}</p>
          </header>
          <section className={styles.card}>
            <p>{course.fullDescription}</p>
            <p><strong>Duration:</strong> {course.duration}</p>
            <p><strong>Price:</strong> {course.price}</p>
          </section>
        </>
      ) : (
        <p>Course not found.</p>
      )}
    </div>
  );
}
