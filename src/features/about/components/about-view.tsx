/**
 * @fileoverview About View Component
 * @module features/about/components/about-view
 */

"use client";

import { useAbout } from "../hooks";
import styles from "../styles/about-view.module.css";

export function AboutView() {
  const { items, isLoading, error } = useAbout();

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>About</h1>
        <p className={styles.subtitle}>
          Manage and configure your academy about settings and records.
        </p>
      </header>

      <section className={styles.card}>
        {isLoading ? (
          <p>Loading about data...</p>
        ) : error ? (
          <p style={{ color: "var(--ams-color-status-error, #f8285a)" }}>{error}</p>
        ) : (
          <div>
            <p>Ready to build atomic components for <strong>About</strong>.</p>
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
