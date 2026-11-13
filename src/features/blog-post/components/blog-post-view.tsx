/**
 * @fileoverview Blog Post View Component
 * @module features/blog-post/components/blog-post-view
 */

"use client";

import { useBlogPost } from "../hooks";
import styles from "../styles/blog-post-view.module.css";

interface BlogPostViewProps {
  id?: string;
}

export function BlogPostView({ id = "choose" }: BlogPostViewProps) {
  const { post, isLoading, error } = useBlogPost(id);

  return (
    <div className={styles.container}>
      {isLoading ? (
        <p>Loading article...</p>
      ) : error ? (
        <p style={{ color: "var(--color-coral, #ef8a68)" }}>{error}</p>
      ) : post ? (
        <>
          <header className={styles.header}>
            <h1 className={styles.title}>{post.title}</h1>
            <p className={styles.subtitle}>
              {post.author} · {post.date} · {post.readTime}
            </p>
          </header>
          <section className={styles.card}>
            <p>{post.excerpt}</p>
          </section>
        </>
      ) : (
        <p>Post not found.</p>
      )}
    </div>
  );
}
