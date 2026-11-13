/**
 * @fileoverview Courses View Component
 * @module features/courses/components/courses-view
 */

"use client";

import { useCourses } from "../hooks";
import styles from "../styles/courses-view.module.css";

export function CoursesView() {
  const { items, isLoading, error } = useCourses();

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>Courses</h1>
        <p className={styles.subtitle}>
          Manage and configure your academy courses settings and records.
        </p>
      </header>

      <section className={styles.card}>
        {isLoading ? (
          <p>Loading courses data...</p>
        ) : error ? (
          <p style={{ color: "var(--ams-color-status-error, #f8285a)" }}>{error}</p>
        ) : (
          <div>
            <p>Ready to build atomic components for <strong>Courses</strong>.</p>
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
