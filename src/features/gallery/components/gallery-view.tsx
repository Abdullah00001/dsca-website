/**
 * @fileoverview Gallery View Component
 * @module features/gallery/components/gallery-view
 */

"use client";

import { useGallery } from "../hooks";
import styles from "../styles/gallery-view.module.css";

export function GalleryView() {
  const { items, isLoading, error } = useGallery();

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>Gallery</h1>
        <p className={styles.subtitle}>
          Manage and configure your academy gallery settings and records.
        </p>
      </header>

      <section className={styles.card}>
        {isLoading ? (
          <p>Loading gallery data...</p>
        ) : error ? (
          <p style={{ color: "var(--ams-color-status-error, #f8285a)" }}>{error}</p>
        ) : (
          <div>
            <p>Ready to build atomic components for <strong>Gallery</strong>.</p>
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
