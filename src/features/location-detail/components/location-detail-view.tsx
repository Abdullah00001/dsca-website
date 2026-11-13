/**
 * @fileoverview Location Detail View Component
 * @module features/location-detail/components/location-detail-view
 */

"use client";

import { useLocationDetail } from "../hooks";
import styles from "../styles/location-detail-view.module.css";

interface LocationDetailViewProps {
  id?: string;
}

export function LocationDetailView({ id = "dhanmondi" }: LocationDetailViewProps) {
  const { area, isLoading, error } = useLocationDetail(id);

  return (
    <div className={styles.container}>
      {isLoading ? (
        <p>Loading location details...</p>
      ) : error ? (
        <p style={{ color: "var(--color-coral, #ef8a68)" }}>{error}</p>
      ) : area ? (
        <>
          <header className={styles.header}>
            <h1 className={styles.title}>{area.h1}</h1>
            <p className={styles.subtitle}>Transit guide to DSCA Farmgate Campus from {area.name}</p>
          </header>
          <section className={styles.card}>
            <p>{area.metaDescription}</p>
          </section>
        </>
      ) : (
        <p>Location not found.</p>
      )}
    </div>
  );
}
