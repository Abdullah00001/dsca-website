/**
 * @fileoverview Contact View Component
 * @module features/contact/components/contact-view
 */

"use client";

import { useContact } from "../hooks";
import styles from "../styles/contact-view.module.css";

export function ContactView() {
  const { items, isLoading, error } = useContact();

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>Contact</h1>
        <p className={styles.subtitle}>
          Manage and configure your academy contact settings and records.
        </p>
      </header>

      <section className={styles.card}>
        {isLoading ? (
          <p>Loading contact data...</p>
        ) : error ? (
          <p style={{ color: "var(--ams-color-status-error, #f8285a)" }}>{error}</p>
        ) : (
          <div>
            <p>Ready to build atomic components for <strong>Contact</strong>.</p>
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
