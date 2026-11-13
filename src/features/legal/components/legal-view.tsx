/**
 * @fileoverview Legal View Component
 * @module features/legal/components/legal-view
 */

"use client";

import { useLegal } from "../hooks";
import styles from "../styles/legal-view.module.css";

export function LegalView() {
  const { items, isLoading, error } = useLegal();

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>Legal</h1>
        <p className={styles.subtitle}>
          Manage and configure your academy legal settings and records.
        </p>
      </header>

      <section className={styles.card}>
        {isLoading ? (
          <p>Loading legal data...</p>
        ) : error ? (
          <p style={{ color: "var(--ams-color-status-error, #f8285a)" }}>{error}</p>
        ) : (
          <div>
            <p>Ready to build atomic components for <strong>Legal</strong>.</p>
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
