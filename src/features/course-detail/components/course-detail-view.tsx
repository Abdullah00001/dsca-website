/**
 * @fileoverview Course Detail View Component
 * @module features/course-detail/components/course-detail-view
 */

"use client";

import { useCourseDetail } from "../hooks";
import styles from "../styles/course-detail-view.module.css";

export function CourseDetailView() {
  const { items, isLoading, error } = useCourseDetail();

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>Course Detail</h1>
        <p className={styles.subtitle}>
          Manage and configure your academy course detail settings and records.
        </p>
      </header>

      <section className={styles.card}>
        {isLoading ? (
          <p>Loading course detail data...</p>
        ) : error ? (
          <p style={{ color: "var(--ams-color-status-error, #f8285a)" }}>{error}</p>
        ) : (
          <div>
            <p>Ready to build atomic components for <strong>Course Detail</strong>.</p>
            <ul>
              {items.map((item) => (
                <li key={item.id}>{item.name} ({item.status})</li>
              ))}
            </ul>
          </div>
        )}
      </section>
    </div>
  );
}
