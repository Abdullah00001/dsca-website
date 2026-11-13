/**
 * @fileoverview Blog View Component
 * @module features/blog/components/blog-view
 */

"use client";

import { useBlog } from "../hooks";
import styles from "../styles/blog-view.module.css";

export function BlogView() {
  const { items, isLoading, error } = useBlog();

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>Blog</h1>
        <p className={styles.subtitle}>
          Manage and configure your academy blog settings and records.
        </p>
      </header>

      <section className={styles.card}>
        {isLoading ? (
          <p>Loading blog data...</p>
        ) : error ? (
          <p style={{ color: "var(--ams-color-status-error, #f8285a)" }}>{error}</p>
        ) : (
          <div>
            <p>Ready to build atomic components for <strong>Blog</strong>.</p>
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
