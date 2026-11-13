/**
 * @fileoverview Trainer Detail View Component
 * @module features/trainer-detail/components/trainer-detail-view
 */

"use client";

import { useTrainerDetail } from "../hooks";
import styles from "../styles/trainer-detail-view.module.css";

export function TrainerDetailView() {
  const { items, isLoading, error } = useTrainerDetail();

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>Trainer Detail</h1>
        <p className={styles.subtitle}>
          Manage and configure your academy trainer detail settings and records.
        </p>
      </header>

      <section className={styles.card}>
        {isLoading ? (
          <p>Loading trainer detail data...</p>
        ) : error ? (
          <p style={{ color: "var(--ams-color-status-error, #f8285a)" }}>{error}</p>
        ) : (
          <div>
            <p>Ready to build atomic components for <strong>Trainer Detail</strong>.</p>
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
