/**
 * @fileoverview Blog View Component
 * @module features/blog/components/blog-view
 */

"use client";

import { useBlog } from "../hooks";
import styles from "../styles/blog-view.module.css";

export function BlogView() {
  const { posts, isLoading, error } = useBlog();

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>Free Barista Guides</h1>
        <p className={styles.subtitle}>Written by the instructors who train you.</p>
      </header>

      <section className={styles.card}>
        {isLoading ? (
          <p>Loading guides...</p>
        ) : error ? (
          <p style={{ color: "var(--color-coral, #ef8a68)" }}>{error}</p>
        ) : (
          <div>
            <ul>
              {posts.map((post) => (
                <li key={post.id}>
                  <strong>{post.title}</strong> — {post.category} ({post.readTime})
                </li>
              ))}
            </ul>
          </div>
        )}
      </section>
    </div>
  );
}
