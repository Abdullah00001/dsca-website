/**
 * @fileoverview Blog Post View Component
 * @module features/blog-post/components/blog-post-view
 */

"use client";

import { useBlogPost } from "../hooks";
import styles from "../styles/blog-post-view.module.css";

export function BlogPostView() {
  const { items, isLoading, error } = useBlogPost();

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>Blog Post</h1>
        <p className={styles.subtitle}>
          Manage and configure your academy blog post settings and records.
        </p>
      </header>

      <section className={styles.card}>
        {isLoading ? (
          <p>Loading blog post data...</p>
        ) : error ? (
          <p style={{ color: "var(--ams-color-status-error, #f8285a)" }}>{error}</p>
        ) : (
          <div>
            <p>Ready to build atomic components for <strong>Blog Post</strong>.</p>
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
