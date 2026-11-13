/**
 * @fileoverview Location Detail View Component
 * @module features/location-detail/components/location-detail-view
 */

"use client";

import { useLocationDetail } from "../hooks";
import styles from "../styles/location-detail-view.module.css";

export function LocationDetailView() {
  const { items, isLoading, error } = useLocationDetail();

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>Location Detail</h1>
        <p className={styles.subtitle}>
          Manage and configure your academy location detail settings and records.
        </p>
      </header>

      <section className={styles.card}>
        {isLoading ? (
          <p>Loading location detail data...</p>
        ) : error ? (
          <p style={{ color: "var(--ams-color-status-error, #f8285a)" }}>{error}</p>
        ) : (
          <div>
            <p>Ready to build atomic components for <strong>Location Detail</strong>.</p>
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
