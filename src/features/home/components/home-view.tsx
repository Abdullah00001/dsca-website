/**
 * @fileoverview Home View Component
 * @module features/home/components/home-view
 */

"use client";

import { useHome } from "../hooks";
import styles from "../styles/home-view.module.css";

export function HomeView() {
  const { items, isLoading, error } = useHome();

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>Home</h1>
        <p className={styles.subtitle}>
          Manage and configure your academy home settings and records.
        </p>
      </header>

      <section className={styles.card}>
        {isLoading ? (
          <p>Loading home data...</p>
        ) : error ? (
          <p style={{ color: "var(--ams-color-status-error, #f8285a)" }}>{error}</p>
        ) : (
          <div>
            <p>Ready to build atomic components for <strong>Home</strong>.</p>
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
