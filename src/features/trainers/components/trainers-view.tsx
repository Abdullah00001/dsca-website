/**
 * @fileoverview Trainers View Component
 * @module features/trainers/components/trainers-view
 */

"use client";

import { useTrainers } from "../hooks";
import styles from "../styles/trainers-view.module.css";

export function TrainersView() {
  const { items, isLoading, error } = useTrainers();

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>Trainers</h1>
        <p className={styles.subtitle}>
          Manage and configure your academy trainers settings and records.
        </p>
      </header>

      <section className={styles.card}>
        {isLoading ? (
          <p>Loading trainers data...</p>
        ) : error ? (
          <p style={{ color: "var(--ams-color-status-error, #f8285a)" }}>{error}</p>
        ) : (
          <div>
            <p>Ready to build atomic components for <strong>Trainers</strong>.</p>
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
