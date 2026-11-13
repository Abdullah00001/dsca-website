/**
 * @fileoverview Locations View Component
 * @module features/locations/components/locations-view
 */

"use client";

import { useLocations } from "../hooks";
import styles from "../styles/locations-view.module.css";

export function LocationsView() {
  const { areas, isLoading, error } = useLocations();

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>Barista Course in Dhaka: Areas We Serve</h1>
        <p className={styles.subtitle}>
          One purpose-built café academy in Farmgate, easily accessible from across Dhaka.
        </p>
      </header>

      <section className={styles.card}>
        {isLoading ? (
          <p>Loading areas...</p>
        ) : error ? (
          <p style={{ color: "var(--color-coral, #ef8a68)" }}>{error}</p>
        ) : (
          <div>
            <ul>
              {areas.map((area) => (
                <li key={area.id}>
                  <strong>{area.name}</strong>
                </li>
              ))}
            </ul>
          </div>
        )}
      </section>
    </div>
  );
}
