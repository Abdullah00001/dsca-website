/**
 * @fileoverview Home View Component
 * @module features/home/components/home-view
 */

"use client";

import { useHome } from "../hooks";
import styles from "../styles/home-view.module.css";

export function HomeView() {
  const { data, isLoading, error } = useHome();

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>Pour your craft. Pour it well.</h1>
        <p className={styles.subtitle}>
          Bangladesh&apos;s first ISO 9001:2015 certified barista academy.
        </p>
      </header>

      <section className={styles.card}>
        {isLoading ? (
          <p>Loading academy information...</p>
        ) : error ? (
          <p style={{ color: "var(--color-coral, #ef8a68)" }}>{error}</p>
        ) : data ? (
          <div>
            <p><strong>ISO Rating:</strong> {data.stats.isoStandard} · {data.stats.rating} on Google ({data.stats.totalReviews} reviews)</p>
          </div>
        ) : null}
      </section>
    </div>
  );
}
