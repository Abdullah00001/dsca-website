/**
 * @fileoverview Locations View Component
 * @module features/locations/components/locations-view
 */

"use client";

import { useLocations } from "../hooks";
import styles from "../styles/locations-view.module.css";

export function LocationsView() {
  const { items, isLoading, error } = useLocations();

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>Locations</h1>
        <p className={styles.subtitle}>
          Manage and configure your academy locations settings and records.
        </p>
      </header>

      <section className={styles.card}>
        {isLoading ? (
          <p>Loading locations data...</p>
        ) : error ? (
          <p style={{ color: "var(--ams-color-status-error, #f8285a)" }}>{error}</p>
        ) : (
          <div>
            <p>Ready to build atomic components for <strong>Locations</strong>.</p>
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
