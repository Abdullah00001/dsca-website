/**
 * @fileoverview Courses View Component
 * @module features/courses/components/courses-view
 */

"use client";

import { useCourses } from "../hooks";
import styles from "../styles/courses-view.module.css";

export function CoursesView() {
  const { courses, isLoading, error } = useCourses();

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>Barista Courses in Dhaka</h1>
        <p className={styles.subtitle}>
          Five programs from a 3-day start to a 22-day advanced track.
        </p>
      </header>

      <section className={styles.card}>
        {isLoading ? (
          <p>Loading courses...</p>
        ) : error ? (
          <p style={{ color: "var(--color-coral, #ef8a68)" }}>{error}</p>
        ) : (
          <div>
            <ul>
              {courses.map((course) => (
                <li key={course.id}>
                  <strong>{course.name}</strong> — {course.duration} ({course.price})
                </li>
              ))}
            </ul>
          </div>
        )}
      </section>
    </div>
  );
}
